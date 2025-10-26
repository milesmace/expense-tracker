/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';

import type { UserConfig } from 'vite';

/* Common Config for both PROD and DEV mode */
const commonConfig: UserConfig = {
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: 'gzip',
      deleteOriginFile: false,
    }),
    visualizer({
      brotliSize: true,
      gzipSize: true,
      open: true,
      sourcemap: false,
      filename: 'dist/stats.html',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.setup.ts'],
    css: true,
    testTimeout: 5000,
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      'src/{types,utils,store}/*',
      'src/vitest.setup.ts',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};

export default defineConfig(({ mode }): UserConfig => {
  /* Load environment variables based on the mode */
  const env = loadEnv(mode, process.cwd(), '');
  const PORT = parseInt(env.PORT) || undefined;

  /* Production-specific configuration */
  if (mode === 'production') {
    return {
      ...commonConfig,
      plugins: [commonConfig.plugins],
      build: {
        ...commonConfig.build,
        sourcemap: 'hidden', // Do not expose sourcemaps
        minify: 'esbuild',
      },
      server: {
        strictPort: true,
        port: PORT,
      },
    };
    /* Development-specific configuration */
  } else if (mode === 'development') {
    return {
      ...commonConfig,
      build: {
        ...commonConfig.build,
        sourcemap: 'inline',
      },
      server: {
        strictPort: true,
        port: PORT,
      },
    };
  } else return commonConfig;
});
