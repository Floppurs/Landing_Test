import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        player: 'player.html',
      },
    },
  },
  resolve: {
    alias: {
      '@': '/',
    },
  },
});