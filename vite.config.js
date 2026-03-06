// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',            // use root-relative paths for deployed site
  build: {
    outDir: 'dist',      // default, Vercel expects 'dist'
    sourcemap: true,     // optional, helps debug if blank
  },
});