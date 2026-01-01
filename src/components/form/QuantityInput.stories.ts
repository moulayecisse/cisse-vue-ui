import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import QuantityInput from './QuantityInput.vue'

const meta: Meta<typeof QuantityInput> = {
  title: 'Form/QuantityInput',
  component: QuantityInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
  args: {
    size: 'md',
    min: 1,
    step: 1,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { QuantityInput },
    setup: () => {
      const value = ref(1)
      return { args, value }
    },
    template: '<QuantityInput v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { QuantityInput },
    setup: () => {
      const value = ref(5)
      return { value }
    },
    template: '<QuantityInput v-model="value" />',
  }),
}

export const WithMinMax: Story = {
  args: {
    min: 1,
    max: 10,
  },
  render: (args) => ({
    components: { QuantityInput },
    setup: () => {
      const value = ref(5)
      return { args, value }
    },
    template: `
      <div>
        <QuantityInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Min: 1, Max: 10</p>
      </div>
    `,
  }),
}

export const CustomStep: Story = {
  args: {
    step: 5,
    min: 0,
  },
  render: (args) => ({
    components: { QuantityInput },
    setup: () => {
      const value = ref(10)
      return { args, value }
    },
    template: `
      <div>
        <QuantityInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Step: 5</p>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { QuantityInput },
    setup: () => {
      const small = ref(1)
      const medium = ref(1)
      const large = ref(1)
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <QuantityInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <QuantityInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <QuantityInput v-model="large" size="lg" />
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
    components: { QuantityInput },
    setup: () => {
      const value = ref(3)
      return { args, value }
    },
    template: '<QuantityInput v-bind="args" v-model="value" />',
  }),
}

export const ProductQuantity: Story = {
  args: {
    min: 1,
    max: 99,
  },
  render: (args) => ({
    components: { QuantityInput },
    setup: () => {
      const quantity = ref(1)
      const price = 29.99
      return { args, quantity, price }
    },
    template: `
      <div class="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        <div class="size-16 bg-gray-100 dark:bg-slate-700 rounded-lg"></div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-900 dark:text-white">Product Name</h3>
          <p class="text-sm text-gray-500">{{ price.toFixed(2) }} €</p>
        </div>
        <QuantityInput v-bind="args" v-model="quantity" />
        <div class="text-right">
          <p class="font-semibold text-gray-900 dark:text-white">{{ (price * quantity).toFixed(2) }} €</p>
        </div>
      </div>
    `,
  }),
}
