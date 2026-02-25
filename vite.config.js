import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: './',           // project root
  base: './',           // relative paths
  publicDir: 'public',  // static assets
  build: {
    outDir: 'public/assets',   // compiled JS will go into public/assets
    rollupOptions: {
      input: resolve(__dirname, 'public/index.html'),
    },
  },
});