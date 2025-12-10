/// <reference types="vitest/config" />
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue(), dts({
    insertTypesEntry: true,
    tsconfigPath: './tsconfig.json'
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/index': resolve(__dirname, 'src/components/index.ts'),
        'components/core/index': resolve(__dirname, 'src/components/core/index.ts'),
        'components/form/index': resolve(__dirname, 'src/components/form/index.ts'),
        'components/feedback/index': resolve(__dirname, 'src/components/feedback/index.ts'),
        'components/layout/index': resolve(__dirname, 'src/components/layout/index.ts'),
        'components/type/index': resolve(__dirname, 'src/components/type/index.ts'),
        'composables/index': resolve(__dirname, 'src/composables/index.ts'),
        'types/index': resolve(__dirname, 'src/types/index.ts')
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${ext}`;
      }
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', '@iconify/vue', 'tailwindcss'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          '@iconify/vue': 'IconifyVue'
        }
      }
    },
    sourcemap: true,
    minify: false
  },
  test: {
    projects: [
      // Unit tests
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          environment: 'happy-dom',
          globals: true,
        }
      },
      // Storybook tests
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{
              browser: 'chromium'
            }]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  }
});