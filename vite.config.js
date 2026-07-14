import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['../tests/**/*.test.js'],
    setupFiles: ['../tests/setup.js']
  }
});
