// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' }),
    viteStaticCopy({
      targets: [
        { src: 'public/serviceWorker.js', dest: '' }
      ]
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: true, // Enable source maps
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
