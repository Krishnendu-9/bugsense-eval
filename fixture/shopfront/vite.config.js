import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mock backend (fixture/mock-backend) runs in a container published on 7103.
const backend = 'http://localhost:7103';

export default defineConfig({
  plugins: [react()],
  server: { port: 7120, strictPort: true, proxy: { '/api': backend } },
  preview: { port: 7110, strictPort: true, proxy: { '/api': backend } },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-dev-runtime', 'axios'],
  },
});
