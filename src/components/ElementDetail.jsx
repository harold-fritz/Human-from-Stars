import { ORIGINS } from '../data/origins.js';
import { BODY_BY_SYMBOL, REGIONS, formatPct } from '../data/bodyElements.js';
import { ELEMENT_BY_SYMBOL } from '../data/elements.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { useAudio } from '../audio/useAudio.js';
import OriginAnimation from './OriginAnimation.jsx';

/**
 * Ficha del elemento seleccionado: qué es, dónde vive en tu cuerpo y en qué
 * catástrofe cósmica se fabricó.
 */
export default function ElementDetail({ symbol, onClose }) {
  const { t, lang } = useI18n();
  const audio = useAudio();

  const el = symbol ? ELEMENT_BY_SYMBOL[symbol] : null;

  if (!el) {
    return (
      <aside className="detail detail--empty">
        <p className="detail__placeholder">{t('detail.empty')}</p>
      </aside>
    );
  }

  const origin = ORIGINS[el.o];
  const body = BODY_BY_SYMBOL[el.s];

  return (
    <aside
      className="detail"
      style={{ '--origin-color': origin.color, '--origin-glow': origin.glow }}
      aria-live="polite"
    >
      <button type="button" className="detail__close" onClick={onClose} aria-label={t('detail.close')}>
        ×
      </button>

      <header className="detail__header">
        <span className="detail__symbol">{el.s}</span>
        <div>
          <span className="detail__z">{el.z}</span>
          <h3 className="detail__name">{el[lang]}</h3>
        </div>
      </header>

      {body ? (
        <>
          <div className="detail__stats">
            <div>
              <span className="detail__stat-label">{t('detail.abundance')}</span>
              <span className="detail__stat-value">{formatPct(body.pct, lang)}</span>
            </div>
            <div>
              <span className="detail__stat-label">{t('detail.amount')}</span>
              <span className="detail__stat-value">{body.amount[lang]}</span>
            </div>
          </div>

          <section className="detail__section">
            <h4 className="detail__section-title">{t('detail.inBody')}</h4>
            <p className="detail__where">{body[lang].where}</p>
            <p className="detail__role">{body[lang].role}</p>
            <ul className="detail__regions">
              {body.regions.map((r) => (
                <li key={r}>{REGIONS[r][lang]}</li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <p className="detail__notbody">{t('detail.notInBody')}</p>
      )}

      <section className="detail__section detail__section--origin">
        <h4 className="detail__section-title">{t('detail.origin')}</h4>

        <button
          type="button"
          className="detail__origin"
          onClick={() => audio.playOrigin(origin.key)}
          aria-label={`${origin[lang].name} — ${t('detail.play')}`}
        >
          <OriginAnimation originKey={origin.key} color={origin.color} size="sm" />
          <span className="detail__origin-text">
            <strong>{origin[lang].name}</strong>
            <em>{origin[lang].short}</em>
            <span className="detail__origin-play">{t('detail.play')}</span>
          </span>
        </button>

        <dl className="detail__meta">
          <div>
            <dt>{t('detail.when')}</dt>
            <dd>{origin.when[lang]}</dd>
          </div>
          <div>
            <dt>{t('detail.duration')}</dt>
            <dd>{origin.duration[lang]}</dd>
          </div>
        </dl>
      </section>
    </aside>
  );
}
