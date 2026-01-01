import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NumberInput from './NumberInput.vue'

const meta: Meta<typeof NumberInput> = {
  title: 'Form/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showStepper: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    size: 'md',
    step: 1,
    showStepper: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { NumberInput },
    setup: () => {
      const value = ref<number | null>(0)
      return { args, value }
    },
    template: '<NumberInput v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { NumberInput },
    setup: () => {
      const value = ref(42)
      return { value }
    },
    template: '<NumberInput v-model="value" />',
  }),
}

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 10,
  },
  render: (args) => ({
    components: { NumberInput },
    setup: () => {
      const value = ref(5)
      return { args, value }
    },
    template: `
      <div>
        <NumberInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Min: 0, Max: 10</p>
      </div>
    `,
  }),
}

export const CustomStep: Story = {
  args: {
    step: 5,
  },
  render: (args) => ({
    components: { NumberInput },
    setup: () => {
      const value = ref(0)
      return { args, value }
    },
    template: `
      <div>
        <NumberInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Step: 5</p>
      </div>
    `,
  }),
}

export const DecimalStep: Story = {
  args: {
    step: 0.5,
    min: 0,
  },
  render: (args) => ({
    components: { NumberInput },
    setup: () => {
      const value = ref(0)
      return { args, value }
    },
    template: `
      <div>
        <NumberInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Step: 0.5</p>
      </div>
    `,
  }),
}

export const WithoutStepper: Story = {
  args: {
    showStepper: false,
  },
  render: (args) => ({
    components: { NumberInput },
    setup: () => {
      const value = ref(0)
      return { args, value }
    },
    template: '<NumberInput v-bind="args" v-model="value" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { NumberInput },
    setup: () => {
      const small = ref(0)
      const medium = ref(0)
      const large = ref(0)
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <NumberInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <NumberInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <NumberInput v-model="large" size="lg" />
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
    components: { NumberInput },
    setup: () => {
      const value = ref(5)
      return { args, value }
    },
    template: '<NumberInput v-bind="args" v-model="value" />',
  }),
}

export const AgeInput: Story = {
  args: {
    min: 0,
    max: 120,
    placeholder: 'Age',
  },
  render: (args) => ({
    components: { NumberInput },
    setup: () => {
      const age = ref<number | null>(null)
      return { args, age }
    },
    template: `
      <div class="max-w-xs">
        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
        <NumberInput v-bind="args" v-model="age" />
      </div>
    `,
  }),
}
