/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  base: './',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          mathjs: ['mathjs'],
          motion: ['framer-motion'],
          react: ['react', 'react-dom', 'react-router'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
