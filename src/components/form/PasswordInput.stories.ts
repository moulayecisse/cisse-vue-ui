import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PasswordInput from './PasswordInput.vue'

const meta: Meta<typeof PasswordInput> = {
  title: 'Form/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    showStrength: { control: 'boolean' },
    required: { control: 'boolean' },
    minLength: { control: 'number' },
  },
  args: {
    size: 'md',
    showStrength: false,
    minLength: 8,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('mysecretpassword')
      return { password }
    },
    template: '<PasswordInput v-model="password" />',
  }),
}

export const WithStrengthIndicator: Story = {
  args: {
    showStrength: true,
  },
  render: (args) => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('')
      return { args, password }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">Type to see password strength</p>
        <PasswordInput v-bind="args" v-model="password" />
      </div>
    `,
  }),
}

export const WeakPassword: Story = {
  args: {
    showStrength: true,
  },
  render: (args) => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('abc')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

export const FairPassword: Story = {
  args: {
    showStrength: true,
  },
  render: (args) => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('password1')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

export const GoodPassword: Story = {
  args: {
    showStrength: true,
  },
  render: (args) => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('Password1!')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

export const StrongPassword: Story = {
  args: {
    showStrength: true,
  },
  render: (args) => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('MyStr0ng!Pass@123')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { PasswordInput },
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
          <PasswordInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <PasswordInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <PasswordInput v-model="large" size="lg" />
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
    components: { PasswordInput },
    setup: () => {
      const password = ref('cannotchange')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

export const SignUpForm: Story = {
  render: () => ({
    components: { PasswordInput },
    setup: () => {
      const password = ref('')
      const confirmPassword = ref('')
      return { password, confirmPassword }
    },
    template: `
      <div class="space-y-4 max-w-sm">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Password <span class="text-red-500">*</span>
          </label>
          <PasswordInput v-model="password" showStrength required />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password <span class="text-red-500">*</span>
          </label>
          <PasswordInput v-model="confirmPassword" required />
          <p v-if="confirmPassword && password !== confirmPassword" class="mt-1 text-sm text-red-500">
            Passwords do not match
          </p>
        </div>
      </div>
    `,
  }),
}
