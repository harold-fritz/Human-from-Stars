/**
 * Motor de audio original de "Humano de Estrellas".
 * Original audio engine for "Human from Stars".
 *
 * Todo el sonido —el ambiente, la melodía y los efectos de cada evento cósmico—
 * se sintetiza en tiempo real con la Web Audio API. No se carga ningún archivo
 * de audio: no hay samples, no hay librerías, no hay descargas.
 *
 * All sound — the ambience, the melody and every cosmic event effect — is
 * synthesized in real time with the Web Audio API. No audio file is ever
 * loaded: no samples, no libraries, no downloads.
 */

/* Escala original de la pieza: re menor pentatónica extendida.
   Original scale of the piece: extended D minor pentatonic. */
const SCALE = [
  146.83, // D3
  174.61, // F3
  196.0, // G3
  220.0, // A3
  261.63, // C4
  293.66, // D4
  349.23, // F4
  392.0, // G4
  440.0, // A4
  523.25 // C5
];

/* Motivo melódico original, en grados de la escala. Se repite con variación
   para que nunca suene exactamente igual dos veces. */
const MOTIF = [5, 7, 4, 8, 6, 4, 2, 5, 9, 6, 4, 3, 5, 7, 8, 4];

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.ready = false;
    this.muted = true;
    this.ambientOn = false;
    this._nodes = {};
    this._motifIndex = 0;
    this._motifTimer = null;
    this._lastHover = 0;
  }

  /* ---------------------------------------------------------------- núcleo */

  /** Crea el contexto de audio. Debe llamarse desde un gesto del usuario. */
  init() {
    if (this.ready) return;
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    this.ctx = ctx;

    // Cadena maestra: mezcla -> compresor -> salida.
    const master = ctx.createGain();
    master.gain.value = 0;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.knee.value = 24;
    comp.ratio.value = 5;
    comp.attack.value = 0.004;
    comp.release.value = 0.25;

    master.connect(comp);
    comp.connect(ctx.destination);

    // Reverberación de "espacio profundo": respuesta al impulso generada por
    // procedimiento, no muestreada de ninguna sala real.
    const reverb = ctx.createConvolver();
    reverb.buffer = this._makeImpulse(4.2, 2.6);
    const reverbSend = ctx.createGain();
    reverbSend.gain.value = 0.42;
    reverbSend.connect(reverb);
    reverb.connect(master);

    this._nodes = { master, reverb, reverbSend };
    this._noiseBuffer = this._makeNoise(3);
    this.ready = true;
  }

  /** Reanuda el contexto si el navegador lo suspendió. */
  async resume() {
    if (!this.ready) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // El navegador aún no lo permite; se reintentará en el siguiente gesto.
      }
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (!this.ready) return;
    const { master } = this._nodes;
    const now = this.ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setTargetAtTime(muted ? 0 : 0.85, now, 0.35);
  }

  dispose() {
    this.stopAmbient();
    if (this.ctx) this.ctx.close().catch(() => {});
    this.ctx = null;
    this.ready = false;
  }

  /* ------------------------------------------------------------- ayudantes */

  /** Impulso de reverberación sintético con caída exponencial. */
  _makeImpulse(seconds, decay) {
    const { ctx } = this;
    const rate = ctx.sampleRate;
    const length = Math.floor(rate * seconds);
    const buffer = ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch += 1) {
      const data = buffer.getChannelData(ch);
      for (let i = 0; i < length; i += 1) {
        const t = i / length;
        // Ruido con envolvente exponencial y un ligero retardo inicial.
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, decay) * (t < 0.02 ? t / 0.02 : 1);
      }
    }
    return buffer;
  }

  /** Ruido blanco reutilizable para explosiones y crepitaciones. */
  _makeNoise(seconds) {
    const { ctx } = this;
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  _noiseSource() {
    const src = this.ctx.createBufferSource();
    src.buffer = this._noiseBuffer;
    src.loop = true;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    return src;
  }

  /** Conecta una voz a la mezcla seca y al envío de reverberación. */
  _out(node, wet = 0.5) {
    const { master, reverbSend } = this._nodes;
    const dry = this.ctx.createGain();
    dry.gain.value = 1 - wet * 0.5;
    node.connect(dry);
    dry.connect(master);

    const send = this.ctx.createGain();
    send.gain.value = wet;
    node.connect(send);
    send.connect(reverbSend);
  }

  _canPlay() {
    return this.ready && !this.muted && this.ctx && this.ctx.state === 'running';
  }

  /* -------------------------------------------------------------- ambiente */

  /** Colchón armónico continuo: el "zumbido" del universo. */
  startAmbient() {
    if (!this.ready || this.ambientOn) return;
    const { ctx } = this;
    const now = ctx.currentTime;

    const bus = ctx.createGain();
    bus.gain.value = 0;
    bus.gain.setTargetAtTime(0.2, now, 2.5);
    this._out(bus, 0.7);

    // Filtro que respira lentamente, como una marea.
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 420;
    filter.Q.value = 1.2;
    filter.connect(bus);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start(now);

    // Sub grave (D1) + dos sierras desafinadas: la base del drone.
    const voices = [];
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 36.71;
    const subGain = ctx.createGain();
    subGain.gain.value = 0.5;
    sub.connect(subGain);
    subGain.connect(filter);
    sub.start(now);
    voices.push(sub);

    [73.42, 110.0, 146.83].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 2 ? 'triangle' : 'sawtooth';
      osc.frequency.value = freq;
      osc.detune.value = (i - 1) * 7;
      const g = ctx.createGain();
      g.gain.value = 0.12 / (i + 1);
      osc.connect(g);
      g.connect(filter);
      osc.start(now);
      voices.push(osc);
    });

    this._nodes.ambient = { bus, filter, lfo, voices };
    this.ambientOn = true;
    this._scheduleMotif();
  }

  stopAmbient() {
    if (this._motifTimer) {
      clearTimeout(this._motifTimer);
      this._motifTimer = null;
    }
    const amb = this._nodes.ambient;
    if (!amb || !this.ctx) {
      this.ambientOn = false;
      return;
    }
    const now = this.ctx.currentTime;
    amb.bus.gain.setTargetAtTime(0, now, 1.2);
    const stopAt = now + 4;
    amb.voices.forEach((v) => v.stop(stopAt));
    amb.lfo.stop(stopAt);
    this._nodes.ambient = null;
    this.ambientOn = false;
  }

  /** Melodía original: campanas lentas que dibujan el motivo con variación. */
  _scheduleMotif() {
    if (!this.ambientOn) return;
    const step = 2400 + Math.random() * 1600;
    this._motifTimer = setTimeout(() => {
      if (this._canPlay() && this.ambientOn) {
        const degree = MOTIF[this._motifIndex % MOTIF.length];
        this._motifIndex += 1;
        // De vez en cuando salta una octava para que el motivo respire.
        const octave = Math.random() < 0.22 ? 2 : 1;
        this._bell(SCALE[degree] * octave, 0.09, 4.5);
      }
      this._scheduleMotif();
    }, step);
  }

  /** Campana suave con dos parciales, base de toda la melodía. */
  _bell(freq, gain = 0.1, dur = 3.5, when = 0) {
    const { ctx } = this;
    const t = ctx.currentTime + when;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(gain, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    this._out(g, 0.8);

    [1, 2.01, 3.02].forEach((mult, i) => {
      const osc = ctx.createOscillator();
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq * mult;
      const pg = ctx.createGain();
      pg.gain.value = 1 / (i * 3 + 1);
      osc.connect(pg);
      pg.connect(g);
      osc.start(t);
      osc.stop(t + dur + 0.1);
    });
  }

  /* ----------------------------------------------------------- interacción */

  /**
   * Tono al pasar por un elemento: la altura sube con el número atómico,
   * así que la tabla periódica se puede "tocar" como un instrumento.
   */
  playHover(z = 1) {
    if (!this._canPlay()) return;
    const now = performance.now();
    if (now - this._lastHover < 55) return; // evita ametrallar el oído
    this._lastHover = now;

    const { ctx } = this;
    const t = ctx.currentTime;
    // Mapea Z (1..118) a poco más de dos octavas dentro de la escala.
    const degree = Math.round(((z - 1) / 117) * (SCALE.length - 1));
    const octave = z > 59 ? 2 : 1;
    const freq = SCALE[degree] * octave;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.055, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    osc.connect(g);
    this._out(g, 0.5);
    osc.start(t);
    osc.stop(t + 0.55);
  }

  /** Doble campana ascendente al seleccionar un elemento. */
  playSelect(z = 1) {
    if (!this._canPlay()) return;
    const degree = Math.round(((z - 1) / 117) * (SCALE.length - 1));
    this._bell(SCALE[degree], 0.09, 2.4, 0);
    this._bell(SCALE[Math.min(SCALE.length - 1, degree + 2)] * 2, 0.05, 3, 0.11);
  }

  /** Clic seco y breve para los controles de la interfaz. */
  playUi(up = true) {
    if (!this._canPlay()) return;
    const { ctx } = this;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(up ? 660 : 880, t);
    osc.frequency.exponentialRampToValueAtTime(up ? 990 : 620, t + 0.08);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(g);
    this._out(g, 0.3);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  /* ------------------------------------------------- efectos de cada evento */

  /** Dispara el diseño sonoro del evento cósmico indicado. */
  playOrigin(key) {
    if (!this._canPlay()) return;
    const fn = {
      big_bang: () => this._sfxBigBang(),
      cosmic_rays: () => this._sfxCosmicRays(),
      low_mass_stars: () => this._sfxCnoCycle(),
      massive_stars: () => this._sfxSupernova(),
      white_dwarfs: () => this._sfxTypeIa(),
      neutron_star_merger: () => this._sfxKilonova(),
      human_made: () => this._sfxHumanMade()
    }[key];
    if (fn) fn();
  }

  /** Big Bang: silencio, rumor creciente, estallido y acorde que se abre. */
  _sfxBigBang() {
    const { ctx } = this;
    const t = ctx.currentTime;

    // Rumor que crece desde la nada durante un segundo y medio.
    const noise = this._noiseSource();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(60, t);
    bp.frequency.exponentialRampToValueAtTime(2400, t + 1.5);
    bp.Q.value = 0.7;

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(0.5, t + 1.5);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);

    noise.connect(bp);
    bp.connect(ng);
    this._out(ng, 0.6);
    noise.start(t);
    noise.stop(t + 2.8);

    // Golpe grave en el instante de la expansión.
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(120, t + 1.45);
    sub.frequency.exponentialRampToValueAtTime(28, t + 2.8);
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.0001, t + 1.4);
    sg.gain.linearRampToValueAtTime(0.6, t + 1.5);
    sg.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
    sub.connect(sg);
    this._out(sg, 0.35);
    sub.start(t + 1.4);
    sub.stop(t + 3.5);

    // El acorde de la materia recién creada.
    [0, 4, 7, 9].forEach((deg, i) => {
      this._bell(SCALE[deg] * 2, 0.07, 4, 1.55 + i * 0.09);
    });
  }

  /** Rayos cósmicos: metralla de partículas rompiendo núcleos. */
  _sfxCosmicRays() {
    const { ctx } = this;
    const t0 = ctx.currentTime;
    const hits = 26;

    for (let i = 0; i < hits; i += 1) {
      const t = t0 + Math.pow(Math.random(), 0.7) * 1.5;
      const noise = this._noiseSource();
      const hp = ctx.createBiquadFilter();
      hp.type = 'bandpass';
      hp.frequency.value = 1800 + Math.random() * 5200;
      hp.Q.value = 6 + Math.random() * 10;

      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.3 + Math.random() * 0.18, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07 + Math.random() * 0.1);

      noise.connect(hp);
      hp.connect(g);
      this._out(g, 0.75);
      noise.start(t);
      noise.stop(t + 0.25);
    }

    // Núcleo que se parte en dos: dos campanas separándose.
    this._bell(SCALE[8] * 2, 0.05, 2.2, 0.9);
    this._bell(SCALE[3] * 2, 0.05, 2.6, 1.05);
  }

  /** Ciclo CNO: el latido cálido y paciente del corazón de una estrella. */
  _sfxCnoCycle() {
    const { ctx } = this;
    const t = ctx.currentTime;

    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0.0001, t);
    bus.gain.exponentialRampToValueAtTime(0.3, t + 0.6);
    bus.gain.setValueAtTime(0.3, t + 2.2);
    bus.gain.exponentialRampToValueAtTime(0.0001, t + 3.8);
    this._out(bus, 0.65);

    // Trémolo: los seis pasos del ciclo CNO, latiendo.
    const trem = ctx.createGain();
    trem.gain.value = 0.9;
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2.6, t);
    lfo.frequency.linearRampToValueAtTime(5.2, t + 3.5);
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.4;
    lfo.connect(lfoGain);
    lfoGain.connect(trem.gain);
    lfo.start(t);
    lfo.stop(t + 4);
    trem.connect(bus);

    // Acorde mayor cálido: carbono, nitrógeno y oxígeno pasándose el protón.
    [110, 165, 220, 330].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = (i - 1.5) * 5;
      const g = ctx.createGain();
      g.gain.value = 0.3 / (i + 1);
      osc.connect(g);
      g.connect(trem);
      osc.start(t);
      osc.stop(t + 4);
    });
  }

  /** Supernova de colapso: implosión, silencio y onda expansiva. */
  _sfxSupernova() {
    const { ctx } = this;
    const t = ctx.currentTime;

    // El núcleo cayendo hacia dentro: barrido descendente rapidísimo.
    const fall = ctx.createOscillator();
    fall.type = 'sawtooth';
    fall.frequency.setValueAtTime(900, t);
    fall.frequency.exponentialRampToValueAtTime(45, t + 0.55);
    const fg = ctx.createGain();
    fg.gain.setValueAtTime(0.22, t);
    fg.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    fall.connect(fg);
    this._out(fg, 0.4);
    fall.start(t);
    fall.stop(t + 0.65);

    // El rebote: pared de ruido con el filtro abriéndose y cerrándose.
    const boom = t + 0.62;
    const noise = this._noiseSource();
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(7000, boom);
    lp.frequency.exponentialRampToValueAtTime(180, boom + 2.8);
    lp.Q.value = 2;

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, boom);
    ng.gain.linearRampToValueAtTime(0.65, boom + 0.03);
    ng.gain.exponentialRampToValueAtTime(0.0001, boom + 3);

    noise.connect(lp);
    lp.connect(ng);
    this._out(ng, 0.7);
    noise.start(boom);
    noise.stop(boom + 3.2);

    // Infragrave de la onda de choque.
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(90, boom);
    sub.frequency.exponentialRampToValueAtTime(24, boom + 2.4);
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.0001, boom);
    sg.gain.linearRampToValueAtTime(0.75, boom + 0.05);
    sg.gain.exponentialRampToValueAtTime(0.0001, boom + 3);
    sub.connect(sg);
    this._out(sg, 0.25);
    sub.start(boom);
    sub.stop(boom + 3.1);
  }

  /** Tipo Ia: una chispa seca y un destello metálico. Dos segundos y nada más. */
  _sfxTypeIa() {
    const { ctx } = this;
    const t = ctx.currentTime;

    // Chispa de ignición.
    const noise = this._noiseSource();
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(1200, t);
    hp.frequency.exponentialRampToValueAtTime(9000, t + 0.4);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.45, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    noise.connect(hp);
    hp.connect(ng);
    this._out(ng, 0.6);
    noise.start(t);
    noise.stop(t + 0.5);

    // Destello: modulación de frecuencia brillante que se apaga en seco.
    const carrier = ctx.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.value = 880;
    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = 1319;
    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(1400, t);
    modGain.gain.exponentialRampToValueAtTime(1, t + 1.4);
    mod.connect(modGain);
    modGain.connect(carrier.frequency);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.2, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2);
    carrier.connect(g);
    this._out(g, 0.7);

    carrier.start(t);
    mod.start(t);
    carrier.stop(t + 2.1);
    mod.stop(t + 2.1);

    // Golpe grave corto: la enana blanca desaparece entera.
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(140, t);
    sub.frequency.exponentialRampToValueAtTime(38, t + 1.2);
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.5, t);
    sg.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    sub.connect(sg);
    this._out(sg, 0.2);
    sub.start(t);
    sub.stop(t + 1.5);
  }

  /**
   * Kilonova: el "chirp" real de dos estrellas de neutrones en espiral
   * —la frecuencia sube igual que en la señal gravitacional GW170817—
   * seguido del estallido que fabricó todo el oro del universo.
   */
  _sfxKilonova() {
    const { ctx } = this;
    const t = ctx.currentTime;
    const mergeAt = t + 1.9;

    // Espiral: la frecuencia y el volumen crecen hasta el choque.
    const chirp = ctx.createOscillator();
    chirp.type = 'sine';
    chirp.frequency.setValueAtTime(55, t);
    chirp.frequency.exponentialRampToValueAtTime(760, mergeAt);
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.03, t);
    cg.gain.exponentialRampToValueAtTime(0.4, mergeAt);
    cg.gain.exponentialRampToValueAtTime(0.0001, mergeAt + 0.12);
    chirp.connect(cg);
    this._out(cg, 0.45);
    chirp.start(t);
    chirp.stop(mergeAt + 0.2);

    // Segunda voz una quinta arriba: las dos estrellas.
    const chirp2 = ctx.createOscillator();
    chirp2.type = 'triangle';
    chirp2.frequency.setValueAtTime(82, t);
    chirp2.frequency.exponentialRampToValueAtTime(1140, mergeAt);
    const cg2 = ctx.createGain();
    cg2.gain.setValueAtTime(0.015, t);
    cg2.gain.exponentialRampToValueAtTime(0.16, mergeAt);
    cg2.gain.exponentialRampToValueAtTime(0.0001, mergeAt + 0.12);
    chirp2.connect(cg2);
    this._out(cg2, 0.45);
    chirp2.start(t);
    chirp2.stop(mergeAt + 0.2);

    // El impacto.
    const noise = this._noiseSource();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(5200, mergeAt);
    bp.frequency.exponentialRampToValueAtTime(320, mergeAt + 2.6);
    bp.Q.value = 1.1;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, mergeAt);
    ng.gain.linearRampToValueAtTime(0.62, mergeAt + 0.02);
    ng.gain.exponentialRampToValueAtTime(0.0001, mergeAt + 3);
    noise.connect(bp);
    bp.connect(ng);
    this._out(ng, 0.8);
    noise.start(mergeAt);
    noise.stop(mergeAt + 3.2);

    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(110, mergeAt);
    sub.frequency.exponentialRampToValueAtTime(26, mergeAt + 2.6);
    const sg = ctx.createGain();
    sg.gain.setValueAtTime(0.0001, mergeAt);
    sg.gain.linearRampToValueAtTime(0.8, mergeAt + 0.04);
    sg.gain.exponentialRampToValueAtTime(0.0001, mergeAt + 3.2);
    sub.connect(sg);
    this._out(sg, 0.2);
    sub.start(mergeAt);
    sub.stop(mergeAt + 3.3);

    // La lluvia de metales pesados que queda flotando: oro, platino, yodo.
    [9, 7, 5, 8, 6].forEach((deg, i) => {
      this._bell(SCALE[deg] * 2, 0.055, 5, 1.95 + i * 0.16);
    });
  }

  /** Fabricados por humanos: pulsos digitales, deliberadamente artificiales. */
  _sfxHumanMade() {
    const { ctx } = this;
    const t0 = ctx.currentTime;
    [0, 0.11, 0.22, 0.33, 0.5].forEach((offset, i) => {
      const t = t0 + offset;
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = SCALE[2 + i] * 2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.13, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      osc.connect(g);
      this._out(g, 0.35);
      osc.start(t);
      osc.stop(t + 0.2);
    });

    // Decaimiento radiactivo: el eco se apaga y desaparece.
    const noise = this._noiseSource();
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 3200;
    bp.Q.value = 3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0 + 0.6);
    g.gain.linearRampToValueAtTime(0.1, t0 + 0.64);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);
    noise.connect(bp);
    bp.connect(g);
    this._out(g, 0.7);
    noise.start(t0 + 0.6);
    noise.stop(t0 + 2.4);
  }
}

export const audioEngine = new AudioEngine();
