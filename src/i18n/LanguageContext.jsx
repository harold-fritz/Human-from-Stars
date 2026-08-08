import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, LANGUAGES, T } from './translations.js';

const STORAGE_KEY = 'hfs.lang';
const SUPPORTED = LANGUAGES.map((l) => l.code);

const LanguageContext = createContext(null);

/**
 * Resuelve el idioma inicial: ?lang= > preferencia guardada > español.
 * Resolves the initial language: ?lang= > saved preference > Spanish.
 *
 * El español es el idioma principal del proyecto: no se deduce del navegador,
 * sólo se cambia si la persona lo pide explícitamente (por URL o pulsando EN).
 */
function resolveInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (fromQuery && SUPPORTED.includes(fromQuery)) return fromQuery;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) return saved;
  } catch {
    // localStorage bloqueado (modo privado): seguimos con el idioma por omisión.
  }

  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(resolveInitialLang);

  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Sin persistencia: el idioma sigue funcionando durante la sesión.
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'es' ? 'en' : 'es');
  }, [lang, setLang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = T[lang].htmlTitle;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', T[lang].htmlDescription);

    const url = new URL(window.location.href);
    if (url.searchParams.get('lang') !== lang) {
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url);
    }
  }, [lang]);

  const value = useMemo(() => {
    /** Traduce una clave; devuelve la clave si falta, para detectar huecos rápido. */
    const t = (key) => T[lang][key] ?? key;
    /** Extrae el campo del idioma actual de un objeto {es, en} o {es:{...},en:{...}}. */
    const pick = (obj) => (obj ? obj[lang] : undefined);
    return { lang, setLang, toggleLang, t, pick, languages: LANGUAGES };
  }, [lang, setLang, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n debe usarse dentro de <LanguageProvider>');
  return ctx;
}
