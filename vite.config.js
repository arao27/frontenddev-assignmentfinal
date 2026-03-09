import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',
  base: '/',          // <- change this from './' to '/'
  publicDir: 'public',
  build: {
    outDir: 'dist',    // production output for Vercel
  },
});