import { useCallback, useMemo, useState } from 'react';
import Starfield from './components/Starfield.jsx';
import Header from './components/Header.jsx';
import PeriodicTable from './components/PeriodicTable.jsx';
import BodySilhouette from './components/BodySilhouette.jsx';
import ElementDetail from './components/ElementDetail.jsx';
import Legend from './components/Legend.jsx';
import Timeline from './components/Timeline.jsx';
import { useI18n } from './i18n/LanguageContext.jsx';
import { useAudio } from './audio/useAudio.js';
import { BODY_BY_SYMBOL, BODY_ELEMENTS } from './data/bodyElements.js';
import { ELEMENT_BY_SYMBOL } from './data/elements.js';
import { ORIGINS, ORIGIN_ORDER } from './data/origins.js';

export default function App() {
  const { t } = useI18n();
  const audio = useAudio();

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [activeOrigin, setActiveOrigin] = useState(null);
  const [onlyBody, setOnlyBody] = useState(false);

  // Lo que se resalta en la silueta: lo que el cursor toca ahora manda,
  // y si no hay nada bajo el cursor, lo último seleccionado.
  const focusSymbol = hovered || selected;

  const { regions, color } = useMemo(() => {
    if (!focusSymbol) return { regions: [], color: null };
    const el = ELEMENT_BY_SYMBOL[focusSymbol];
    const body = BODY_BY_SYMBOL[focusSymbol];
    return {
      regions: body ? body.regions : [],
      color: el ? ORIGINS[el.o].color : null
    };
  }, [focusSymbol]);

  const handleHover = useCallback(
    (el) => {
      setHovered(el.s);
      audio.hover(el.z);
    },
    [audio]
  );

  const handleLeave = useCallback(() => setHovered(null), []);

  const handleSelect = useCallback(
    (el) => {
      const symbol = typeof el === 'string' ? el : el.s;
      const full = ELEMENT_BY_SYMBOL[symbol];
      setSelected((prev) => (prev === symbol ? null : symbol));
      if (selected !== symbol && full) audio.select(full.z);
    },
    [audio, selected]
  );

  const handleSelectFromLegend = useCallback(
    (symbol) => {
      setSelected(symbol);
      setActiveOrigin(null);
      document.getElementById('body')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    []
  );

  const startJourney = useCallback(async () => {
    await audio.enable();
    document.getElementById('body')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [audio]);

  return (
    <>
      <Starfield />
      <a className="skip-link" href="#body">
        {t('a11y.skip')}
      </a>
      <Header />

      <main id="top">
        {/* ------------------------------------------------------------ hero */}
        <section className="hero">
          <div className="hero__inner">
            <p className="hero__eyebrow">{t('hero.eyebrow')}</p>
            <h1 className="hero__title">
              {t('hero.title')
                .split(' ')
                .map((word, i) => (
                  <span key={`${word}-${i}`} style={{ '--w': i }}>
                    {word}
                  </span>
                ))}
            </h1>
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            <p className="hero__lead">{t('hero.lead')}</p>

            <div className="hero__actions">
              <button type="button" className="btn btn--primary" onClick={startJourney}>
                <span className="btn__pulse" aria-hidden="true" />
                {t('hero.enter')}
              </button>
              <span className="hero__sound-note">{t('hero.sound')}</span>
            </div>
          </div>

          <div className="hero__scroll" aria-hidden="true">
            <span className="hero__scroll-line" />
            {t('hero.scroll')}
          </div>
        </section>

        {/* ------------------------------------------------------------ cuerpo */}
        <section className="section" id="body">
          <div className="section__head">
            <h2 className="section__title">{t('body.title')}</h2>
            <p className="section__lead">{t('body.lead')}</p>
          </div>

          <div className="stats">
            <div className="stats__item">
              <span className="stats__value">{BODY_ELEMENTS.length}</span>
              <span className="stats__label">{t('body.stats.elements')}</span>
            </div>
            <div className="stats__item">
              <span className="stats__value">{ORIGIN_ORDER.length - 1}</span>
              <span className="stats__label">{t('body.stats.events')}</span>
            </div>
            <div className="stats__item">
              <span className="stats__value stats__value--small">{t('body.stats.ageValue')}</span>
              <span className="stats__label">{t('body.stats.age')}</span>
            </div>
          </div>

          <div className="explorer">
            <div className="explorer__body">
              <BodySilhouette activeRegions={regions} color={color} elementSymbol={focusSymbol} />
            </div>

            <div className="explorer__table">
              <PeriodicTable
                selected={selected}
                hovered={hovered}
                activeOrigin={activeOrigin}
                onlyBody={onlyBody}
                onHover={handleHover}
                onLeave={handleLeave}
                onSelect={handleSelect}
                onToggleOnlyBody={(value) => {
                  audio.ui(value);
                  setOnlyBody(value);
                }}
              />
            </div>

            <div className="explorer__detail">
              <ElementDetail symbol={selected} onClose={() => setSelected(null)} />
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------------- leyenda */}
        <section className="section" id="legend">
          <div className="section__head">
            <h2 className="section__title">{t('legend.title')}</h2>
            <p className="section__lead">{t('legend.lead')}</p>
          </div>
          <Legend
            activeOrigin={activeOrigin}
            onSelectOrigin={setActiveOrigin}
            onSelectElement={handleSelectFromLegend}
          />
        </section>

        {/* ------------------------------------------------------- línea de tiempo */}
        <section className="section" id="timeline">
          <div className="section__head">
            <h2 className="section__title">{t('timeline.title')}</h2>
            <p className="section__lead">{t('timeline.lead')}</p>
          </div>
          <Timeline />
        </section>

        {/* ------------------------------------------------------------ cierre */}
        <section className="closing">
          <blockquote className="closing__quote">
            <p>{t('closing.quote')}</p>
            <footer>{t('closing.author')}</footer>
          </blockquote>
          <p className="closing__credit">{t('closing.credit')}</p>
        </section>
      </main>

      <footer className="footer">
        <p>{t('footer.data')}</p>
        <p>{t('footer.audioNote')}</p>
      </footer>
    </>
  );
}
