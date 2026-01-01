import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PercentInput from './PercentInput.vue'

const meta: Meta<typeof PercentInput> = {
  title: 'Form/PercentInput',
  component: PercentInput,
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
    decimals: { control: 'number' },
    required: { control: 'boolean' },
  },
  args: {
    size: 'md',
    min: 0,
    max: 100,
    decimals: 0,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { PercentInput },
    setup: () => {
      const value = ref<number | null>(null)
      return { args, value }
    },
    template: '<PercentInput v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { PercentInput },
    setup: () => {
      const value = ref(75)
      return { value }
    },
    template: '<PercentInput v-model="value" />',
  }),
}

export const WithDecimals: Story = {
  args: {
    decimals: 2,
  },
  render: (args) => ({
    components: { PercentInput },
    setup: () => {
      const value = ref(33.33)
      return { args, value }
    },
    template: '<PercentInput v-bind="args" v-model="value" />',
  }),
}

export const CustomRange: Story = {
  args: {
    min: 10,
    max: 50,
  },
  render: (args) => ({
    components: { PercentInput },
    setup: () => {
      const value = ref(25)
      return { args, value }
    },
    template: `
      <div>
        <PercentInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Range: 10% - 50%</p>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { PercentInput },
    setup: () => {
      const small = ref(25)
      const medium = ref(50)
      const large = ref(75)
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <PercentInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <PercentInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <PercentInput v-model="large" size="lg" />
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
    components: { PercentInput },
    setup: () => {
      const value = ref(50)
      return { args, value }
    },
    template: '<PercentInput v-bind="args" v-model="value" />',
  }),
}

export const DiscountForm: Story = {
  render: () => ({
    components: { PercentInput },
    setup: () => {
      const discount = ref<number | null>(null)
      return { discount }
    },
    template: `
      <div class="max-w-xs">
        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Discount
        </label>
        <PercentInput v-model="discount" placeholder="0" />
        <p class="mt-1 text-xs text-gray-500">Enter a discount percentage (0-100)</p>
      </div>
    `,
  }),
}
