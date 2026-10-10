import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animation: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true,
  },
  server: {
    port: 5173,
    host: true,
  },
});
