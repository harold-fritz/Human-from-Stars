import { useMemo } from 'react';
import { ORIGINS, ORIGIN_ORDER } from '../data/origins.js';
import { ELEMENTS } from '../data/elements.js';
import { BODY_SYMBOLS } from '../data/bodyElements.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { useAudio } from '../audio/useAudio.js';
import OriginAnimation from './OriginAnimation.jsx';

/**
 * Leyenda de colores: los siete eventos que fabrican los elementos, cada uno
 * con su animación, su momento en la historia del universo y la lista de
 * elementos tuyos que salieron de ahí.
 */
export default function Legend({ activeOrigin, onSelectOrigin, onSelectElement }) {
  const { t, lang } = useI18n();
  const audio = useAudio();

  const byOrigin = useMemo(() => {
    const map = {};
    ORIGIN_ORDER.forEach((key) => {
      map[key] = ELEMENTS.filter((el) => el.o === key && BODY_SYMBOLS.has(el.s));
    });
    return map;
  }, []);

  return (
    <div className="legend">
      {ORIGIN_ORDER.map((key) => {
        const origin = ORIGINS[key];
        const copy = origin[lang];
        const bodyEls = byOrigin[key];
        const isActive = activeOrigin === key;

        return (
          <article
            key={key}
            className={`legend__card ${isActive ? 'is-active' : ''}`}
            style={{ '--origin-color': origin.color, '--origin-glow': origin.glow }}
          >
            <button
              type="button"
              className="legend__stage"
              onClick={() => {
                audio.playOrigin(key);
                onSelectOrigin(isActive ? null : key);
              }}
              aria-pressed={isActive}
              aria-label={`${copy.name} — ${t('legend.hear')}`}
            >
              <OriginAnimation originKey={key} color={origin.color} />
              <span className="legend__play">
                <span className="legend__play-icon" aria-hidden="true" />
                {t('legend.hear')}
              </span>
            </button>

            <div className="legend__body">
              <header className="legend__header">
                <span className="legend__swatch" aria-hidden="true" />
                <div>
                  <h3 className="legend__name">{copy.name}</h3>
                  <p className="legend__short">{copy.short}</p>
                </div>
              </header>

              <dl className="legend__meta">
                <div>
                  <dt>{t('detail.when')}</dt>
                  <dd>{origin.when[lang]}</dd>
                </div>
                <div>
                  <dt>{t('detail.duration')}</dt>
                  <dd>{origin.duration[lang]}</dd>
                </div>
              </dl>

              <p className="legend__description">{copy.description}</p>
              <p className="legend__inbody">{copy.body}</p>

              <div className="legend__elements">
                <span className="legend__count">
                  {bodyEls.length === 0
                    ? t('legend.noneInBody')
                    : `${bodyEls.length} ${t(
                        bodyEls.length === 1 ? 'legend.elementInBody' : 'legend.elementsInBody'
                      )}`}
                </span>
                <div className="legend__chips">
                  {bodyEls.map((el) => (
                    <button
                      key={el.s}
                      type="button"
                      className="legend__chip"
                      onClick={() => {
                        audio.select(el.z);
                        onSelectElement(el.s);
                      }}
                      title={el[lang]}
                    >
                      {el.s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
