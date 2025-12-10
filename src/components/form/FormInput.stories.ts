import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FormInput from './FormInput.vue'

const meta: Meta<typeof FormInput> = {
  title: 'Form/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    name: { control: 'text' },
    id: { control: 'text' },
  },
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { FormInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<FormInput v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { FormInput },
    setup: () => {
      const value = ref('Hello World')
      return { value }
    },
    template: '<FormInput v-model="value" placeholder="Enter text..." />',
  }),
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
  render: (args) => ({
    components: { FormInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<FormInput v-bind="args" v-model="value" />',
  }),
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
  render: (args) => ({
    components: { FormInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<FormInput v-bind="args" v-model="value" />',
  }),
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
  render: (args) => ({
    components: { FormInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<FormInput v-bind="args" v-model="value" />',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
  render: (args) => ({
    components: { FormInput },
    setup: () => {
      const value = ref('Cannot edit')
      return { args, value }
    },
    template: '<FormInput v-bind="args" v-model="value" />',
  }),
}

export const AllTypes: Story = {
  render: () => ({
    components: { FormInput },
    setup: () => {
      const text = ref('')
      const email = ref('')
      const password = ref('')
      const number = ref('')
      return { text, email, password, number }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Text</label>
          <FormInput v-model="text" type="text" placeholder="Enter text..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <FormInput v-model="email" type="email" placeholder="Enter email..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <FormInput v-model="password" type="password" placeholder="Enter password..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Number</label>
          <FormInput v-model="number" type="number" placeholder="0" />
        </div>
      </div>
    `,
  }),
}
