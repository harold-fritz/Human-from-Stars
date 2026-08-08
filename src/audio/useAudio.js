import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createElement } from 'react';
import { audioEngine } from './AudioEngine.js';

const AudioContextReact = createContext(null);

/**
 * Expone el motor de audio a toda la aplicación y recuerda la preferencia
 * del usuario. El sonido empieza apagado: sólo se enciende con un gesto
 * explícito, como exigen los navegadores y el buen gusto.
 */
export function AudioProvider({ children }) {
  const [enabled, setEnabled] = useState(false);

  const enable = useCallback(async () => {
    audioEngine.init();
    await audioEngine.resume();
    audioEngine.setMuted(false);
    audioEngine.startAmbient();
    setEnabled(true);
  }, []);

  const disable = useCallback(() => {
    audioEngine.setMuted(true);
    setEnabled(false);
  }, []);

  const toggle = useCallback(() => {
    if (enabled) disable();
    else enable();
  }, [enabled, enable, disable]);

  // Algunos navegadores suspenden el contexto al cambiar de pestaña.
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && enabled) audioEngine.resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [enabled]);

  const value = useMemo(
    () => ({
      enabled,
      enable,
      disable,
      toggle,
      hover: (z) => audioEngine.playHover(z),
      select: (z) => audioEngine.playSelect(z),
      ui: (up) => audioEngine.playUi(up),
      playOrigin: (key) => audioEngine.playOrigin(key)
    }),
    [enabled, enable, disable, toggle]
  );

  return createElement(AudioContextReact.Provider, { value }, children);
}

export function useAudio() {
  const ctx = useContext(AudioContextReact);
  if (!ctx) throw new Error('useAudio debe usarse dentro de <AudioProvider>');
  return ctx;
}
