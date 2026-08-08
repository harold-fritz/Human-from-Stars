import { useMemo } from 'react';
import { ELEMENTS, FBLOCK_PLACEHOLDERS } from '../data/elements.js';
import { BODY_SYMBOLS } from '../data/bodyElements.js';
import { ORIGINS } from '../data/origins.js';
import { useI18n } from '../i18n/LanguageContext.jsx';

/**
 * Tabla periódica completa. Los elementos presentes en el cuerpo humano se
 * iluminan con el color del evento astronómico que los fabricó; el resto
 * queda en penumbra.
 */

function ElementTile({ el, inBody, dimmed, selected, highlighted, onHover, onLeave, onSelect, lang }) {
  const origin = ORIGINS[el.o];
  const classes = [
    'el',
    inBody ? 'el--body' : 'el--trace',
    dimmed ? 'is-dimmed' : '',
    selected ? 'is-selected' : '',
    highlighted ? 'is-highlighted' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      style={{
        gridColumn: el.x,
        gridRow: el.y,
        '--el-color': origin.color,
        '--el-glow': origin.glow,
        // Escalona la animación de entrada siguiendo el número atómico.
        '--el-delay': `${Math.min(el.z * 6, 700)}ms`
      }}
      onMouseEnter={() => onHover(el)}
      onFocus={() => onHover(el)}
      onMouseLeave={onLeave}
      onBlur={onLeave}
      onClick={() => onSelect(el)}
      aria-pressed={selected}
      title={`${el.z} · ${el[lang]} · ${origin[lang].name}`}
    >
      <span className="el__z">{el.z}</span>
      <span className="el__symbol">{el.s}</span>
      {/* El nombre completo va en el `title` y en la ficha: en una casilla de
          34 px no cabría ni "Rutherfordio" ni "Praseodimio". */}
      {inBody ? <span className="el__pulse" aria-hidden="true" /> : null}
    </button>
  );
}

export default function PeriodicTable({
  selected,
  hovered,
  activeOrigin,
  onlyBody,
  onHover,
  onLeave,
  onSelect,
  onToggleOnlyBody
}) {
  const { t, lang } = useI18n();

  const tiles = useMemo(
    () =>
      ELEMENTS.map((el) => {
        const inBody = BODY_SYMBOLS.has(el.s);
        // Un elemento se apaga si el filtro lo excluye o si hay un origen activo distinto.
        const dimmed =
          (onlyBody && !inBody) || (activeOrigin && el.o !== activeOrigin) || (!inBody && !activeOrigin);
        return { el, inBody, dimmed };
      }),
    [onlyBody, activeOrigin]
  );

  return (
    <div className="ptable">
      <div className="ptable__head">
        <h3 className="ptable__title">{t('table.title')}</h3>
        <div className="ptable__filters" role="group" aria-label={t('table.title')}>
          <button
            type="button"
            className={`chip ${!onlyBody ? 'is-on' : ''}`}
            onClick={() => onToggleOnlyBody(false)}
            aria-pressed={!onlyBody}
          >
            {t('table.filterAll')}
          </button>
          <button
            type="button"
            className={`chip ${onlyBody ? 'is-on' : ''}`}
            onClick={() => onToggleOnlyBody(true)}
            aria-pressed={onlyBody}
          >
            {t('table.filterBody')}
          </button>
        </div>
      </div>

      <div className="ptable__scroll">
        <div className="ptable__grid">
          {FBLOCK_PLACEHOLDERS.map((p) => (
            <div key={p.id} className="el el--placeholder" style={{ gridColumn: p.x, gridRow: p.y }}>
              <span className="el__symbol el__symbol--range">{p.label}</span>
            </div>
          ))}

          {tiles.map(({ el, inBody, dimmed }) => (
            <ElementTile
              key={el.z}
              el={el}
              lang={lang}
              inBody={inBody}
              dimmed={dimmed}
              selected={selected === el.s}
              highlighted={hovered === el.s}
              onHover={onHover}
              onLeave={onLeave}
              onSelect={onSelect}
            />
          ))}

          <div className="ptable__fblock-label ptable__fblock-label--lan">{t('table.lanthanides')}</div>
          <div className="ptable__fblock-label ptable__fblock-label--act">{t('table.actinides')}</div>
        </div>
      </div>

      <p className="ptable__foot">
        <span className="ptable__key ptable__key--body" /> {t('table.legendBody')}
        <span className="ptable__key ptable__key--other" /> {t('table.legendOther')}
      </p>
    </div>
  );
}
