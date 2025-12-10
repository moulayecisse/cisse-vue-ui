import type { Preview } from '@storybook/vue3-vite'
import '../src/styles/components.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light'
      document.documentElement.classList.toggle('dark', theme === 'dark')
      document.body.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#ffffff'
      return {
        template: `<div :class="theme === 'dark' ? 'dark' : ''"><story /></div>`,
        data: () => ({ theme }),
      }
    },
  ],
}

export default preview