import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { useAudio } from '../audio/useAudio.js';

/** Barra superior: navegación, selector de idioma y control de sonido. */
export default function Header() {
  const { t, lang, setLang, languages } = useI18n();
  const audio = useAudio();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => (event) => {
    event.preventDefault();
    audio.ui(true);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="header__brand" href="#top" onClick={go('top')}>
        <span className="header__mark" aria-hidden="true" />
        <span className="header__brand-text">{t('hero.title')}</span>
      </a>

      <nav className="header__nav" aria-label={t('hero.title')}>
        <a href="#body" onClick={go('body')}>
          {t('nav.body')}
        </a>
        <a href="#legend" onClick={go('legend')}>
          {t('nav.legend')}
        </a>
        <a href="#timeline" onClick={go('timeline')}>
          {t('nav.timeline')}
        </a>
      </nav>

      <div className="header__tools">
        <button
          type="button"
          className={`sound-toggle ${audio.enabled ? 'is-on' : ''}`}
          onClick={() => {
            audio.toggle();
          }}
          aria-pressed={audio.enabled}
          title={audio.enabled ? t('sound.on') : t('sound.off')}
        >
          <span className="sound-toggle__bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="sound-toggle__label">{t('sound.label')}</span>
        </button>

        <div className="lang" role="group" aria-label={t('a11y.langSwitch')}>
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`lang__btn ${lang === l.code ? 'is-on' : ''}`}
              onClick={() => {
                audio.ui(l.code === 'en');
                setLang(l.code);
              }}
              aria-pressed={lang === l.code}
              lang={l.code}
            >
              {l.flag}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
