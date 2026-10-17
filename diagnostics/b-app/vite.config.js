import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// MINIFY=0 builds without minification; OUT selects the output directory.
export default defineConfig({
  plugins: [react()],
  build: {
    minify: process.env.MINIFY !== '0',
    outDir: process.env.OUT || 'dist',
    rollupOptions: { input: { sdk: 'index.html', nosdk: 'nosdk.html' } },
  },
});
