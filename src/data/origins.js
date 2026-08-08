/**
 * Eventos astronómicos que fabrican los elementos (nucleosíntesis).
 * Astronomical events that forge the elements (nucleosynthesis).
 *
 * La asignación de un origen dominante por elemento sigue de forma aproximada
 * el trabajo divulgativo de Jennifer A. Johnson (Ohio State University, 2017),
 * "Origin of the Elements in the Solar System".
 */

export const ORIGINS = {
  big_bang: {
    key: 'big_bang',
    color: '#7ee8fa',
    glow: 'rgba(126, 232, 250, 0.55)',
    // Momento del evento y duración característica
    when: { es: 'Hace 13 800 millones de años', en: '13.8 billion years ago' },
    duration: { es: 'Los primeros 20 minutos', en: 'The first 20 minutes' },
    es: {
      name: 'Big Bang',
      short: 'Nucleosíntesis primordial',
      description:
        'Cuando el universo tenía apenas tres minutos de vida y se enfrió por debajo de mil millones de grados, los protones y neutrones libres pudieron unirse. En unos veinte minutos el cosmos fabricó todo el hidrógeno que existe, casi todo el helio y una pizca de litio. Después se enfrió demasiado y la fábrica cerró para siempre.',
      body:
        'Cada molécula de agua de tu cuerpo lleva dos átomos de hidrógeno nacidos en ese instante: la parte más antigua de ti tiene la edad del universo.'
    },
    en: {
      name: 'Big Bang',
      short: 'Primordial nucleosynthesis',
      description:
        'When the universe was barely three minutes old and cooled below a billion degrees, free protons and neutrons could finally stick together. In about twenty minutes the cosmos made every hydrogen atom that exists, nearly all the helium and a trace of lithium. Then it cooled too much and the factory closed forever.',
      body:
        'Every water molecule in your body carries two hydrogen atoms born in that instant: the oldest part of you is as old as the universe itself.'
    }
  },

  cosmic_rays: {
    key: 'cosmic_rays',
    color: '#b9a6ff',
    glow: 'rgba(185, 166, 255, 0.55)',
    when: { es: 'Desde hace 13 600 millones de años', en: 'From 13.6 billion years ago' },
    duration: { es: 'Continuamente, aún hoy', en: 'Continuously, still today' },
    es: {
      name: 'Rayos cósmicos',
      short: 'Espalación cósmica',
      description:
        'Núcleos atómicos acelerados casi a la velocidad de la luz por las ondas de choque de las supernovas viajan durante millones de años hasta chocar contra átomos de carbono, nitrógeno u oxígeno del gas interestelar y los rompen en pedazos. Es la única forma de fabricar litio, berilio y boro: no se cocinan, se astillan.',
      body:
        'El boro que da flexibilidad a tus huesos y el litio presente en trazas en tu cerebro son esquirlas de colisiones ocurridas en el vacío.'
    },
    en: {
      name: 'Cosmic rays',
      short: 'Cosmic ray spallation',
      description:
        'Atomic nuclei accelerated to nearly light speed by supernova shock waves travel for millions of years until they smash into carbon, nitrogen or oxygen atoms in interstellar gas and shatter them. It is the only way to make lithium, beryllium and boron: they are not cooked, they are chipped off.',
      body:
        'The boron that keeps your bones flexible and the trace lithium in your brain are splinters from collisions that happened in the void.'
    }
  },

  low_mass_stars: {
    key: 'low_mass_stars',
    color: '#ffd166',
    glow: 'rgba(255, 209, 102, 0.55)',
    when: { es: 'Desde hace 13 000 millones de años', en: 'From 13 billion years ago' },
    duration: { es: 'De 1000 a 10 000 millones de años por estrella', en: '1 to 10 billion years per star' },
    es: {
      name: 'Estrellas moribundas de baja masa',
      short: 'Ciclo CNO y proceso-s',
      description:
        'Estrellas como el Sol pasan miles de millones de años fusionando hidrógeno mediante el ciclo CNO, en el que el carbono actúa de catalizador. Al final de su vida se hinchan como gigantes rojas, capturan neutrones lentamente (proceso-s) y expulsan sus capas exteriores en una nebulosa planetaria, sembrando la galaxia con carbono y nitrógeno.',
      body:
        'El carbono de tu ADN, de tus músculos y de cada proteína salió flotando del cadáver tibio de estrellas parecidas al Sol.'
    },
    en: {
      name: 'Dying low-mass stars',
      short: 'CNO cycle and s-process',
      description:
        'Stars like the Sun spend billions of years fusing hydrogen through the CNO cycle, where carbon acts as a catalyst. At the end of their lives they swell into red giants, capture neutrons slowly (the s-process) and blow off their outer layers as a planetary nebula, seeding the galaxy with carbon and nitrogen.',
      body:
        'The carbon in your DNA, your muscles and every protein drifted out of the warm corpse of Sun-like stars.'
    }
  },

  massive_stars: {
    key: 'massive_stars',
    color: '#ff6b6b',
    glow: 'rgba(255, 107, 107, 0.55)',
    when: { es: 'Desde hace 13 500 millones de años', en: 'From 13.5 billion years ago' },
    duration: { es: 'Vida de 10 millones de años, colapso en 1 segundo', en: '10 million year life, 1 second collapse' },
    es: {
      name: 'Estrellas masivas que explotan',
      short: 'Supernova de colapso de núcleo',
      description:
        'Una estrella de más de ocho soles quema su combustible en capas de cebolla hasta llegar al hierro, que ya no da energía. Sin presión que la sostenga, el núcleo colapsa en menos de un segundo y rebota en una supernova que brilla más que su galaxia entera y esparce oxígeno, magnesio y silicio por el espacio.',
      body:
        'El oxígeno que respiras ahora mismo —el 65 % de tu masa— fue expulsado por estrellas que murieron con una violencia inimaginable.'
    },
    en: {
      name: 'Exploding massive stars',
      short: 'Core-collapse supernova',
      description:
        'A star heavier than eight Suns burns its fuel in onion-like shells until it reaches iron, which yields no more energy. With nothing holding it up, the core collapses in under a second and rebounds as a supernova that outshines its entire galaxy, scattering oxygen, magnesium and silicon across space.',
      body:
        'The oxygen you are breathing right now — 65% of your mass — was blown out by stars that died with unimaginable violence.'
    }
  },

  white_dwarfs: {
    key: 'white_dwarfs',
    color: '#f7f5ff',
    glow: 'rgba(247, 245, 255, 0.6)',
    when: { es: 'Desde hace 12 000 millones de años', en: 'From 12 billion years ago' },
    duration: { es: 'Robo de materia durante millones de años, detonación en 2 segundos', en: 'Millions of years of theft, 2 second detonation' },
    es: {
      name: 'Enanas blancas que explotan',
      short: 'Supernova de tipo Ia',
      description:
        'El rescoldo muerto de una estrella roba materia a su compañera hasta superar el límite de Chandrasekhar, 1,44 masas solares. Entonces la fusión del carbono se descontrola en dos segundos y la enana blanca se desintegra por completo, forjando en ese destello la mayor parte del hierro del universo.',
      body:
        'El hierro que transporta el oxígeno en tu sangre y hace que sea roja nació en una detonación termonuclear del tamaño de la Tierra.'
    },
    en: {
      name: 'Exploding white dwarfs',
      short: 'Type Ia supernova',
      description:
        'The dead ember of a star steals matter from its companion until it crosses the Chandrasekhar limit of 1.44 solar masses. Carbon fusion then runs away in two seconds and the white dwarf is completely destroyed, forging in that flash most of the iron in the universe.',
      body:
        'The iron that carries oxygen in your blood and makes it red was born in a thermonuclear detonation the size of the Earth.'
    }
  },

  neutron_star_merger: {
    key: 'neutron_star_merger',
    color: '#ff9ff3',
    glow: 'rgba(255, 159, 243, 0.6)',
    when: { es: 'Desde hace 13 000 millones de años', en: 'From 13 billion years ago' },
    duration: { es: 'Espiral de millones de años, fusión en 100 milisegundos', en: 'Million-year inspiral, 100 millisecond merger' },
    es: {
      name: 'Fusión de estrellas de neutrones',
      short: 'Kilonova y proceso-r',
      description:
        'Dos cadáveres estelares del tamaño de una ciudad, cada uno más denso que un núcleo atómico, giran en espiral durante millones de años perdiendo energía en ondas gravitacionales. Al chocar liberan una nube de neutrones libres que se pegan a los núcleos en menos de un segundo: el proceso-r, la única forja capaz de crear oro, platino y uranio.',
      body:
        'El yodo de tu tiroides y el selenio que protege tus células vienen de la colisión más extrema que conoce la física.'
    },
    en: {
      name: 'Merging neutron stars',
      short: 'Kilonova and r-process',
      description:
        'Two city-sized stellar corpses, each denser than an atomic nucleus, spiral together for millions of years bleeding energy as gravitational waves. When they collide they release a cloud of free neutrons that glue themselves onto nuclei in under a second: the r-process, the only forge capable of making gold, platinum and uranium.',
      body:
        'The iodine in your thyroid and the selenium that protects your cells come from the most extreme collision physics knows.'
    }
  },

  human_made: {
    key: 'human_made',
    color: '#6ee7a8',
    glow: 'rgba(110, 231, 168, 0.5)',
    when: { es: 'Desde 1937', en: 'Since 1937' },
    duration: { es: 'Microsegundos en un acelerador', en: 'Microseconds inside an accelerator' },
    es: {
      name: 'Fabricados por humanos',
      short: 'Aceleradores y reactores',
      description:
        'Trece mil ochocientos millones de años después del Big Bang, una especie hecha de restos estelares aprendió a hacer lo mismo que las estrellas. En aceleradores de partículas chocamos núcleos para crear átomos que el universo nunca produjo de forma natural; muchos sobreviven apenas unos milisegundos.',
      body:
        'Ninguno forma parte de tu cuerpo, pero son la prueba de que el polvo de estrellas aprendió a encender sus propias hogueras.'
    },
    en: {
      name: 'Human-made',
      short: 'Accelerators and reactors',
      description:
        'Thirteen point eight billion years after the Big Bang, a species made of stellar debris learned to do what stars do. In particle accelerators we smash nuclei together to create atoms the universe never produced naturally; many survive only a few milliseconds.',
      body:
        'None of them are part of your body, but they prove that star dust learned to light its own fires.'
    }
  }
};

export const ORIGIN_ORDER = [
  'big_bang',
  'cosmic_rays',
  'low_mass_stars',
  'massive_stars',
  'white_dwarfs',
  'neutron_star_merger',
  'human_made'
];

/**
 * Línea de tiempo cósmica: todo lo que tuvo que ocurrir para que existas.
 * Cosmic timeline: everything that had to happen for you to exist.
 */
export const TIMELINE = [
  {
    id: 'bigbang',
    origin: 'big_bang',
    ago: 13.8e9,
    es: { time: 'T + 0 s', title: 'El Big Bang', text: 'El espacio, el tiempo y la energía empiezan a existir.' },
    en: { time: 'T + 0 s', title: 'The Big Bang', text: 'Space, time and energy begin to exist.' }
  },
  {
    id: 'nucleosynthesis',
    origin: 'big_bang',
    ago: 13.8e9,
    es: { time: 'T + 3 min', title: 'Nace el hidrógeno', text: 'Se forma el 90 % de los átomos que hoy existen. Tu agua ya está escrita.' },
    en: { time: 'T + 3 min', title: 'Hydrogen is born', text: '90% of all atoms that exist today are formed. Your water is already written.' }
  },
  {
    id: 'firststars',
    origin: 'massive_stars',
    ago: 13.6e9,
    es: { time: '200 millones de años', title: 'Las primeras estrellas', text: 'La oscuridad termina. Las primeras estrellas encienden la fusión nuclear.' },
    en: { time: '200 million years', title: 'The first stars', text: 'Darkness ends. The first stars ignite nuclear fusion.' }
  },
  {
    id: 'firstsn',
    origin: 'massive_stars',
    ago: 13.5e9,
    es: { time: '300 millones de años', title: 'La primera supernova', text: 'La primera estrella masiva muere y regala oxígeno al universo.' },
    en: { time: '300 million years', title: 'The first supernova', text: 'The first massive star dies and gifts oxygen to the universe.' }
  },
  {
    id: 'kilonova',
    origin: 'neutron_star_merger',
    ago: 13.0e9,
    es: { time: '800 millones de años', title: 'La primera kilonova', text: 'Dos estrellas de neutrones chocan. Aparecen el oro, el yodo y el uranio.' },
    en: { time: '800 million years', title: 'The first kilonova', text: 'Two neutron stars collide. Gold, iodine and uranium appear.' }
  },
  {
    id: 'agb',
    origin: 'low_mass_stars',
    ago: 12.0e9,
    es: { time: '2000 millones de años', title: 'Mueren las primeras estrellas como el Sol', text: 'Nebulosas planetarias siembran carbono y nitrógeno por la galaxia.' },
    en: { time: '2 billion years', title: 'The first Sun-like stars die', text: 'Planetary nebulae seed carbon and nitrogen across the galaxy.' }
  },
  {
    id: 'ia',
    origin: 'white_dwarfs',
    ago: 12.0e9,
    es: { time: '2000 millones de años', title: 'Las enanas blancas detonan', text: 'El hierro inunda el medio interestelar. Tu sangre será roja gracias a esto.' },
    en: { time: '2 billion years', title: 'White dwarfs detonate', text: 'Iron floods the interstellar medium. Your blood will be red because of this.' }
  },
  {
    id: 'cloud',
    origin: 'massive_stars',
    ago: 4.6e9,
    es: { time: 'Hace 4600 millones de años', title: 'Colapsa nuestra nube', text: 'Una onda de choque comprime una nube de gas enriquecido con todos esos restos.' },
    en: { time: '4.6 billion years ago', title: 'Our cloud collapses', text: 'A shock wave squeezes a gas cloud enriched with all that debris.' }
  },
  {
    id: 'sun',
    origin: 'low_mass_stars',
    ago: 4.57e9,
    es: { time: 'Hace 4570 millones de años', title: 'Se enciende el Sol', text: 'Comienza el ciclo protón-protón y el ciclo CNO en su núcleo.' },
    en: { time: '4.57 billion years ago', title: 'The Sun ignites', text: 'The proton-proton chain and the CNO cycle begin in its core.' }
  },
  {
    id: 'earth',
    origin: 'massive_stars',
    ago: 4.54e9,
    es: { time: 'Hace 4540 millones de años', title: 'Se forma la Tierra', text: 'El polvo de estrellas se compacta en un planeta rocoso.' },
    en: { time: '4.54 billion years ago', title: 'Earth forms', text: 'Star dust compacts into a rocky planet.' }
  },
  {
    id: 'life',
    origin: 'low_mass_stars',
    ago: 3.8e9,
    es: { time: 'Hace 3800 millones de años', title: 'La primera célula', text: 'Carbono, hidrógeno, oxígeno y nitrógeno aprenden a copiarse a sí mismos.' },
    en: { time: '3.8 billion years ago', title: 'The first cell', text: 'Carbon, hydrogen, oxygen and nitrogen learn to copy themselves.' }
  },
  {
    id: 'oxygen',
    origin: 'massive_stars',
    ago: 2.4e9,
    es: { time: 'Hace 2400 millones de años', title: 'La atmósfera se llena de oxígeno', text: 'La fotosíntesis libera el gas que un día llenará tus pulmones.' },
    en: { time: '2.4 billion years ago', title: 'The air fills with oxygen', text: 'Photosynthesis releases the gas that will one day fill your lungs.' }
  },
  {
    id: 'bones',
    origin: 'neutron_star_merger',
    ago: 5.4e8,
    es: { time: 'Hace 540 millones de años', title: 'Aparecen los huesos', text: 'La vida aprende a usar calcio y fósforo para construir esqueletos.' },
    en: { time: '540 million years ago', title: 'Bones appear', text: 'Life learns to use calcium and phosphorus to build skeletons.' }
  },
  {
    id: 'human',
    origin: 'human_made',
    ago: 3.0e5,
    es: { time: 'Hace 300 000 años', title: 'Naces tú', text: 'Por primera vez, el universo tiene ojos para mirarse a sí mismo.' },
    en: { time: '300,000 years ago', title: 'You appear', text: 'For the first time, the universe has eyes to look at itself.' }
  }
];
