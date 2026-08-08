import { useEffect, useRef, useState } from 'react';
import { ORIGINS, TIMELINE } from '../data/origins.js';
import { useI18n } from '../i18n/LanguageContext.jsx';

/**
 * Línea del tiempo cósmica. Cada hito aparece al entrar en pantalla, de modo
 * que recorrer la página es literalmente recorrer 13 800 millones de años.
 */
export default function Timeline() {
  const { t, lang } = useI18n();
  const [visible, setVisible] = useState(() => new Set());
  const refs = useRef(new Map());

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(new Set(TIMELINE.map((e) => e.id)));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { id } = entry.target.dataset;
            setVisible((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.25 }
    );

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="timeline">
      <span className="timeline__spine" aria-hidden="true" />
      {TIMELINE.map((event, index) => {
        const origin = ORIGINS[event.origin];
        const copy = event[lang];
        return (
          <li
            key={event.id}
            data-id={event.id}
            ref={(node) => {
              if (node) refs.current.set(event.id, node);
            }}
            className={`timeline__item ${visible.has(event.id) ? 'is-visible' : ''}`}
            style={{ '--origin-color': origin.color, '--origin-glow': origin.glow, '--i': index }}
          >
            <span className="timeline__dot" aria-hidden="true" />
            <div className="timeline__content">
              <span className="timeline__time">{copy.time}</span>
              <h3 className="timeline__title">{copy.title}</h3>
              <p className="timeline__text">{copy.text}</p>
              <span className="timeline__origin">{origin[lang].name}</span>
            </div>
          </li>
        );
      })}
      {/* El final de la línea: aquí es donde estás tú, ahora mismo. */}
      <li className="timeline__item timeline__item--now is-visible">
        <span className="timeline__dot timeline__dot--now" aria-hidden="true" />
        <span className="timeline__now">{t('timeline.now')}</span>
      </li>
    </ol>
  );
}
