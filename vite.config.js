import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Ruta base configurable para poder publicar en GitHub Pages
// (BASE_PATH=/human-from-stars/ npm run build).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
