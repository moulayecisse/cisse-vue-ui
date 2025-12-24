import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const baseConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}

export default defineConfig({
  test: {
    globals: true,
    projects: [
      // Unit tests
      {
        ...baseConfig,
        test: {
          name: 'unit',
          include: ['src/**/*.test.ts'],
          environment: 'happy-dom',
        },
      },
      // Storybook component tests
      {
        ...baseConfig,
        plugins: [...baseConfig.plugins, storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
})