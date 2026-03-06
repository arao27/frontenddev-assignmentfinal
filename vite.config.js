import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  base: './',          // ensures relative paths for assets
  publicDir: 'public',
  build: {
    outDir: 'dist',    // production output for Vercel
  },
});