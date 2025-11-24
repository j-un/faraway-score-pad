/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist', // Output to 'dist' folder outside 'src'
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'html', 'clover', 'json'],
      reportsDirectory: '../coverage', // Use 'reportsDirectory' instead of 'dir'
    },
  },
});
