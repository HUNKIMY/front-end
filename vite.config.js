import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apis': {
        target: 'https://apis.data.go.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
        secure: false,
        ws: true
      }
    }
  },
  build: {
    css: {
      sourcemap: false,
    },
  },
});
