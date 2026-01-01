import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import EmailInput from './EmailInput.vue'

const meta: Meta<typeof EmailInput> = {
  title: 'Form/EmailInput',
  component: EmailInput,
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
    components: { EmailInput },
    setup: () => {
      const email = ref('')
      return { args, email }
    },
    template: '<EmailInput v-bind="args" v-model="email" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { EmailInput },
    setup: () => {
      const email = ref('user@example.com')
      return { email }
    },
    template: '<EmailInput v-model="email" />',
  }),
}

export const ValidEmail: Story = {
  render: () => ({
    components: { EmailInput },
    setup: () => {
      const email = ref('valid@email.com')
      return { email }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">Click outside the input to see validation</p>
        <EmailInput v-model="email" />
      </div>
    `,
  }),
}

export const InvalidEmail: Story = {
  render: () => ({
    components: { EmailInput },
    setup: () => {
      const email = ref('not-an-email')
      return { email }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">Click outside the input to see validation</p>
        <EmailInput v-model="email" />
      </div>
    `,
  }),
}

export const WithoutValidation: Story = {
  args: {
    showValidation: false,
  },
  render: (args) => ({
    components: { EmailInput },
    setup: () => {
      const email = ref('user@example.com')
      return { args, email }
    },
    template: '<EmailInput v-bind="args" v-model="email" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { EmailInput },
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
          <EmailInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <EmailInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <EmailInput v-model="large" size="lg" />
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
    components: { EmailInput },
    setup: () => {
      const email = ref('disabled@example.com')
      return { args, email }
    },
    template: '<EmailInput v-bind="args" v-model="email" />',
  }),
}

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => ({
    components: { EmailInput },
    setup: () => {
      const email = ref('')
      return { args, email }
    },
    template: `
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email <span class="text-red-500">*</span>
        </label>
        <EmailInput v-bind="args" v-model="email" />
      </div>
    `,
  }),
}
