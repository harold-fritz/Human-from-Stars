import { useEffect, useRef } from 'react';

/**
 * Cielo estrellado en canvas: tres capas con parallax, parpadeo suave y
 * estrellas fugaces ocasionales. Se dibuja detrás de todo el contenido.
 *
 * Respeta `prefers-reduced-motion`: si el usuario lo pide, el cielo se
 * queda quieto en lugar de moverse.
 */

const LAYERS = [
  { count: 130, speed: 0.006, size: [0.4, 1.0], alpha: [0.25, 0.6] },
  { count: 80, speed: 0.014, size: [0.8, 1.6], alpha: [0.4, 0.85] },
  { count: 34, speed: 0.026, size: [1.3, 2.4], alpha: [0.6, 1] }
];

// Las estrellas no son blancas: tienen temperatura.
const STAR_TINTS = ['#ffffff', '#dfe9ff', '#cfe0ff', '#fff2d6', '#ffd9c0', '#e8d5ff'];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let shooting = null;
    let nextShootingAt = performance.now() + rand(4000, 11000);
    let pointer = { x: 0, y: 0 };
    let frame = 0;

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densidad proporcional al área, para que un móvil no quede vacío
      // ni un monitor grande quede saturado.
      const density = Math.sqrt((width * height) / (1440 * 900));
      stars = [];
      LAYERS.forEach((layer, li) => {
        const count = Math.round(layer.count * density);
        for (let i = 0; i < count; i += 1) {
          stars.push({
            layer: li,
            x: Math.random() * width,
            y: Math.random() * height,
            r: rand(layer.size[0], layer.size[1]),
            baseAlpha: rand(layer.alpha[0], layer.alpha[1]),
            twinkleSpeed: rand(0.0006, 0.0028),
            twinklePhase: Math.random() * Math.PI * 2,
            tint: STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)]
          });
        }
      });
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() > 0.5;
      shooting = {
        x: fromLeft ? -60 : width + 60,
        y: rand(0, height * 0.55),
        vx: (fromLeft ? 1 : -1) * rand(7, 12),
        vy: rand(2.5, 5),
        life: 0,
        maxLife: rand(55, 90)
      };
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i += 1) {
        const s = stars[i];
        const layer = LAYERS[s.layer];

        if (!reduced) {
          // Deriva lentísima hacia la izquierda: el cielo respira.
          s.x -= layer.speed;
          if (s.x < -4) s.x = width + 4;
        }

        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(now * s.twinkleSpeed + s.twinklePhase);
        // Parallax con el ratón, muy sutil.
        const px = s.x + pointer.x * layer.speed * 260;
        const py = s.y + pointer.y * layer.speed * 260;

        ctx.globalAlpha = s.baseAlpha * twinkle;
        ctx.fillStyle = s.tint;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Las estrellas grandes tienen un halo.
        if (s.r > 1.6) {
          ctx.globalAlpha = s.baseAlpha * twinkle * 0.14;
          ctx.beginPath();
          ctx.arc(px, py, s.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduced) {
        if (!shooting && now > nextShootingAt) {
          spawnShootingStar();
          nextShootingAt = now + rand(6000, 16000);
        }

        if (shooting) {
          shooting.life += 1;
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          const progress = shooting.life / shooting.maxLife;
          const alpha = Math.sin(progress * Math.PI);

          const tailX = shooting.x - shooting.vx * 9;
          const tailY = shooting.y - shooting.vy * 9;
          const grad = ctx.createLinearGradient(shooting.x, shooting.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, 'rgba(255,255,255,0)');

          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.8;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(shooting.x, shooting.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          if (shooting.life > shooting.maxLife) shooting = null;
        }
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    function onPointerMove(e) {
      pointer = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      };
    }

    build();
    frame = requestAnimationFrame(draw);

    const onResize = () => build();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="starfield" aria-hidden="true">
      <canvas ref={canvasRef} className="starfield__canvas" />
      <div className="starfield__nebula starfield__nebula--one" />
      <div className="starfield__nebula starfield__nebula--two" />
      <div className="starfield__nebula starfield__nebula--three" />
      <div className="starfield__vignette" />
    </div>
  );
}
