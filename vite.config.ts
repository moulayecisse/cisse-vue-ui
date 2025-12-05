import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
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
        'types/index': resolve(__dirname, 'src/types/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs'
        return `${entryName}.${ext}`
      },
    },
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia', '@iconify/vue', 'tailwindcss'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          pinia: 'Pinia',
          '@iconify/vue': 'IconifyVue',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
})
