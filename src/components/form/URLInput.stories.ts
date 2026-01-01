import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import URLInput from './URLInput.vue'

const meta: Meta<typeof URLInput> = {
  title: 'Form/URLInput',
  component: URLInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    showValidation: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    size: 'md',
    showValidation: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { URLInput },
    setup: () => {
      const url = ref('')
      return { args, url }
    },
    template: '<URLInput v-bind="args" v-model="url" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { URLInput },
    setup: () => {
      const url = ref('https://example.com')
      return { url }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">Click outside the input to see the open link button</p>
        <URLInput v-model="url" />
      </div>
    `,
  }),
}

export const InvalidURL: Story = {
  render: () => ({
    components: { URLInput },
    setup: () => {
      const url = ref('not-a-valid-url')
      return { url }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">Click outside the input to see validation</p>
        <URLInput v-model="url" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { URLInput },
    setup: () => {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <URLInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <URLInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <URLInput v-model="large" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { URLInput },
    setup: () => {
      const url = ref('https://example.com')
      return { args, url }
    },
    template: '<URLInput v-bind="args" v-model="url" />',
  }),
}

export const WebsiteForm: Story = {
  render: () => ({
    components: { URLInput },
    setup: () => {
      const website = ref('')
      return { website }
    },
    template: `
      <div class="max-w-md">
        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Website URL
        </label>
        <URLInput v-model="website" placeholder="https://your-website.com" />
        <p class="mt-1 text-xs text-gray-500">Enter your company's website URL</p>
      </div>
    `,
  }),
}
