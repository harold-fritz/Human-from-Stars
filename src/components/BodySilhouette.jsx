import { useMemo } from 'react';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { REGIONS } from '../data/bodyElements.js';

/**
 * Silueta humana en SVG con regiones anatómicas que se iluminan.
 *
 * El cuerpo está relleno de estrellas: literalmente, un cielo recortado con
 * la forma de una persona. Cuando se resalta un elemento, sus regiones
 * (huesos, sangre, tiroides…) se encienden con el color de su origen cósmico.
 */

/* Piezas del cuerpo. Se reutilizan para el relleno, el recorte y el contorno. */
const BODY_PARTS = [
  { type: 'circle', cx: 110, cy: 44, r: 26 },
  { type: 'rect', x: 100, y: 64, width: 20, height: 18, rx: 6 },
  {
    type: 'path',
    d: 'M76,88 C92,79 128,79 144,88 L148,150 C148,190 146,220 142,248 L78,248 C74,220 72,190 72,150 Z'
  },
  {
    type: 'path',
    d: 'M74,90 C62,96 58,112 56,136 L50,196 C48,214 46,228 47,240 L60,240 C60,226 62,212 64,198 L72,140 Z'
  },
  {
    type: 'path',
    d: 'M146,90 C158,96 162,112 164,136 L170,196 C172,214 174,228 173,240 L160,240 C160,226 158,212 156,198 L148,140 Z'
  },
  { type: 'ellipse', cx: 53, cy: 247, rx: 8, ry: 11 },
  { type: 'ellipse', cx: 167, cy: 247, rx: 8, ry: 11 },
  { type: 'path', d: 'M76,244 L106,244 L104,330 L100,420 L102,462 L82,462 L80,420 L76,330 Z' },
  { type: 'path', d: 'M144,244 L114,244 L116,330 L120,420 L118,462 L138,462 L140,420 L144,330 Z' },
  { type: 'ellipse', cx: 92, cy: 466, rx: 14, ry: 7 },
  { type: 'ellipse', cx: 128, cy: 466, rx: 14, ry: 7 }
];

function renderPart(part, index, props) {
  const key = `part-${index}`;
  switch (part.type) {
    case 'circle':
      return <circle key={key} cx={part.cx} cy={part.cy} r={part.r} {...props} />;
    case 'ellipse':
      return <ellipse key={key} cx={part.cx} cy={part.cy} rx={part.rx} ry={part.ry} {...props} />;
    case 'rect':
      return (
        <rect key={key} x={part.x} y={part.y} width={part.width} height={part.height} rx={part.rx} {...props} />
      );
    default:
      return <path key={key} d={part.d} {...props} />;
  }
}

/* Estrellas interiores: el cuerpo relleno de cielo. Posiciones fijas para que
   no bailen en cada render. */
const INNER_STARS = Array.from({ length: 90 }, (_, i) => {
  // Secuencia pseudoaleatoria determinista (no queremos Math.random en render).
  const a = Math.sin(i * 12.9898) * 43758.5453;
  const b = Math.sin(i * 78.233) * 12345.6789;
  return {
    x: 40 + (a - Math.floor(a)) * 140,
    y: 20 + (b - Math.floor(b)) * 460,
    r: 0.5 + (a - Math.floor(a)) * 1.5,
    delay: ((b - Math.floor(b)) * 4).toFixed(2)
  };
});

export default function BodySilhouette({ activeRegions, color, elementSymbol }) {
  const { t, lang } = useI18n();
  const active = useMemo(() => new Set(activeRegions || []), [activeRegions]);
  const is = (region) => active.has(region);
  const accent = color || 'var(--accent)';

  const regionNames = useMemo(
    () =>
      [...active]
        .map((key) => REGIONS[key] && REGIONS[key][lang])
        .filter(Boolean)
        .join(' · '),
    [active, lang]
  );

  return (
    <figure className="silhouette">
      <svg
        className="silhouette__svg"
        viewBox="0 0 220 500"
        role="img"
        aria-label={t('body.silhouetteAlt')}
        style={{ '--region-color': accent }}
      >
        <defs>
          <clipPath id="bodyClip">{BODY_PARTS.map((p, i) => renderPart(p, i, {}))}</clipPath>

          <radialGradient id="bodyFill" cx="50%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#1b2450" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#111634" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#070a1c" stopOpacity="0.98" />
          </radialGradient>

          <linearGradient id="auraGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.55" />
            <stop offset="100%" stopColor={accent} stopOpacity="0.05" />
          </linearGradient>

          <filter id="bodyGlow" x="-40%" y="-20%" width="180%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Aura exterior que late suavemente */}
        <g className="silhouette__aura" filter="url(#bodyGlow)">
          {BODY_PARTS.map((p, i) => renderPart(p, i, { fill: 'url(#auraGradient)' }))}
        </g>

        {/* Cuerpo */}
        <g className="silhouette__body">
          {BODY_PARTS.map((p, i) => renderPart(p, i, { fill: 'url(#bodyFill)' }))}
        </g>

        {/* Cielo interior: eres literalmente estrellas */}
        <g clipPath="url(#bodyClip)" className="silhouette__stars">
          {INNER_STARS.map((s, i) => (
            <circle
              key={`inner-${i}`}
              cx={s.x}
              cy={s.y}
              r={s.r}
              style={{ animationDelay: `${s.delay}s` }}
            />
          ))}
        </g>

        {/* ---------------------------------------------------- regiones */}

        {/* Piel, pelo y uñas: contorno luminoso */}
        <g className={`region region--skin ${is('skin') ? 'is-active' : ''}`}>
          {BODY_PARTS.map((p, i) => renderPart(p, i, { fill: 'none' }))}
        </g>

        {/* Líquidos corporales y células: baño completo */}
        <g clipPath="url(#bodyClip)" className={`region region--wash ${is('cells') || is('fluids') ? 'is-active' : ''}`}>
          <rect x="0" y="0" width="220" height="500" />
        </g>

        {/* Esqueleto */}
        <g clipPath="url(#bodyClip)" className={`region region--skeleton ${is('skeleton') ? 'is-active' : ''}`}>
          <path d="M110,70 L110,250" />
          <path d="M90,246 L130,246" />
          {[104, 118, 132, 146, 160].map((y, i) => (
            <g key={`rib-${i}`}>
              <path d={`M110,${y} C98,${y + 2} 88,${y + 6} 84,${y + 14}`} />
              <path d={`M110,${y} C122,${y + 2} 132,${y + 6} 136,${y + 14}`} />
            </g>
          ))}
          <path d="M90,250 L88,420" />
          <path d="M130,250 L132,420" />
          <path d="M62,110 L54,200" />
          <path d="M158,110 L166,200" />
          <circle cx="110" cy="44" r="20" />
        </g>

        {/* Dientes */}
        <g className={`region region--teeth ${is('teeth') ? 'is-active' : ''}`}>
          <path d="M99,54 L121,54" />
          {[100, 105, 110, 115, 120].map((x) => (
            <path key={`tooth-${x}`} d={`M${x},52 L${x},57`} />
          ))}
        </g>

        {/* Sangre: red circulatoria que fluye */}
        <g clipPath="url(#bodyClip)" className={`region region--blood ${is('blood') ? 'is-active' : ''}`}>
          <path d="M110,100 C108,130 106,160 108,200 C110,230 108,250 106,300 C104,360 104,420 102,455" />
          <path d="M110,100 C112,130 114,160 112,200 C110,230 112,250 114,300 C116,360 116,420 118,455" />
          <path d="M104,104 C92,112 78,130 68,160 C60,186 54,214 52,242" />
          <path d="M116,104 C128,112 142,130 152,160 C160,186 166,214 168,242" />
          <path d="M110,86 C106,74 106,62 108,52" />
        </g>

        {/* Corazón */}
        <g className={`region region--heart ${is('heart') ? 'is-active' : ''}`}>
          <path d="M105,118 C100,111 90,113 90,122 C90,132 103,141 105,143 C107,141 120,132 120,122 C120,113 110,111 105,118 Z" />
        </g>

        {/* Pulmones */}
        <g className={`region region--lungs ${is('lungs') ? 'is-active' : ''}`}>
          <path d="M104,102 C92,104 84,118 84,140 C84,158 90,168 100,166 C106,164 106,140 106,120 Z" />
          <path d="M116,102 C128,104 136,118 136,140 C136,158 130,168 120,166 C114,164 114,140 114,120 Z" />
        </g>

        {/* Hígado y riñones */}
        <g className={`region region--liver ${is('liver') ? 'is-active' : ''}`}>
          <path d="M84,172 C96,168 116,170 126,176 C130,184 126,192 116,194 C102,196 88,190 84,182 Z" />
          <ellipse cx="90" cy="204" rx="7" ry="10" />
          <ellipse cx="130" cy="204" rx="7" ry="10" />
        </g>

        {/* Músculos */}
        <g clipPath="url(#bodyClip)" className={`region region--muscles ${is('muscles') ? 'is-active' : ''}`}>
          <ellipse cx="63" cy="128" rx="10" ry="26" />
          <ellipse cx="157" cy="128" rx="10" ry="26" />
          <ellipse cx="92" cy="300" rx="14" ry="46" />
          <ellipse cx="128" cy="300" rx="14" ry="46" />
          <ellipse cx="92" cy="392" rx="10" ry="30" />
          <ellipse cx="128" cy="392" rx="10" ry="30" />
          <path d="M84,100 C96,94 124,94 136,100 C138,118 136,140 132,156 C120,162 100,162 88,156 C84,140 82,118 84,100 Z" />
        </g>

        {/* Cerebro */}
        <g className={`region region--brain ${is('brain') ? 'is-active' : ''}`}>
          <path d="M96,36 C96,26 104,20 110,20 C116,20 124,26 124,36 C124,46 118,52 110,52 C102,52 96,46 96,36 Z" />
          <path d="M110,22 L110,50" />
          <path d="M100,30 C106,34 106,42 101,46" />
          <path d="M120,30 C114,34 114,42 119,46" />
        </g>

        {/* Sistema nervioso */}
        <g clipPath="url(#bodyClip)" className={`region region--nerves ${is('nerves') ? 'is-active' : ''}`}>
          <path d="M110,52 L110,248" />
          <path d="M110,110 L66,130" />
          <path d="M110,110 L154,130" />
          <path d="M110,150 L60,180" />
          <path d="M110,150 L160,180" />
          <path d="M110,246 L90,340 L88,440" />
          <path d="M110,246 L130,340 L132,440" />
        </g>

        {/* Tiroides */}
        <g className={`region region--thyroid ${is('thyroid') ? 'is-active' : ''}`}>
          <path d="M104,68 C100,68 98,74 100,79 C103,82 106,79 107,74 Z" />
          <path d="M116,68 C120,68 122,74 120,79 C117,82 114,79 113,74 Z" />
          <path d="M107,74 L113,74" />
        </g>

        {/* Etiqueta del elemento resaltado, flotando junto al cuerpo */}
        {elementSymbol ? (
          <g className="silhouette__tag">
            <circle cx="186" cy="60" r="17" />
            <text x="186" y="66" textAnchor="middle">
              {elementSymbol}
            </text>
          </g>
        ) : null}
      </svg>

      <figcaption className="silhouette__caption">
        {regionNames ? (
          <>
            <span className="silhouette__caption-label">{t('body.regionLabel')}</span>
            <span className="silhouette__caption-value">{regionNames}</span>
          </>
        ) : (
          <span className="silhouette__caption-hint">{t('body.hint')}</span>
        )}
      </figcaption>
    </figure>
  );
}
