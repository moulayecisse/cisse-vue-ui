import type { Preview } from '@storybook/vue3-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import { MINIMAL_VIEWPORTS } from 'storybook/viewport'
import '../src/styles/components.css'

const customViewports = {
  xs: {
    name: 'XS (320px)',
    styles: { width: '320px', height: '568px' },
  },
  sm: {
    name: 'SM (640px)',
    styles: { width: '640px', height: '800px' },
  },
  md: {
    name: 'MD (768px)',
    styles: { width: '768px', height: '1024px' },
  },
  lg: {
    name: 'LG (1024px)',
    styles: { width: '1024px', height: '768px' },
  },
  xl: {
    name: 'XL (1280px)',
    styles: { width: '1280px', height: '800px' },
  },
  '2xl': {
    name: '2XL (1536px)',
    styles: { width: '1536px', height: '864px' },
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#ffffff' },
        dark: { name: 'dark', value: '#0f172a' },
      },
    },
    viewport: {
      options: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: '#ffffff' },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview