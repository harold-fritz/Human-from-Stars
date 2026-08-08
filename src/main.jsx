import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { AudioProvider } from './audio/useAudio.js';
import './styles/base.css';
import './styles/layout.css';
import './styles/table.css';
import './styles/body.css';
import './styles/animations.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </LanguageProvider>
  </StrictMode>
);
