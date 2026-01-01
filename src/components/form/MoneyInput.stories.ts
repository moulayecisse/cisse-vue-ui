import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MoneyInput from './MoneyInput.vue'

const meta: Meta<typeof MoneyInput> = {
  title: 'Form/MoneyInput',
  component: MoneyInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    currency: {
      control: 'select',
      options: ['EUR', 'USD', 'GBP', 'XOF', 'MAD', 'CHF', 'CAD'],
    },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    decimals: { control: 'number' },
    required: { control: 'boolean' },
  },
  args: {
    size: 'md',
    currency: 'EUR',
    decimals: 2,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref<number | null>(null)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(1234.56)
      return { amount }
    },
    template: '<MoneyInput v-model="amount" />',
  }),
}

export const Euro: Story = {
  args: {
    currency: 'EUR',
  },
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(99.99)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const USD: Story = {
  args: {
    currency: 'USD',
  },
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(1250.00)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const CFA: Story = {
  args: {
    currency: 'XOF',
    decimals: 0,
  },
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(50000)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const GBP: Story = {
  args: {
    currency: 'GBP',
  },
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(750.50)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 1000,
  },
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(500)
      return { args, amount }
    },
    template: `
      <div>
        <MoneyInput v-bind="args" v-model="amount" />
        <p class="mt-2 text-sm text-gray-500">Min: €0, Max: €1000</p>
      </div>
    `,
  }),
}

export const NoDecimals: Story = {
  args: {
    decimals: 0,
  },
  render: (args) => ({
    components: { MoneyInput },
    setup: () => {
      const amount = ref(100)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { MoneyInput },
    setup: () => {
      const small = ref(100)
      const medium = ref(100)
      const large = ref(100)
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <MoneyInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <MoneyInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <MoneyInput v-model="large" size="lg" />
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
    components: { MoneyInput },
    setup: () => {
      const amount = ref(500)
      return { args, amount }
    },
    template: '<MoneyInput v-bind="args" v-model="amount" />',
  }),
}

export const AllCurrencies: Story = {
  render: () => ({
    components: { MoneyInput },
    setup: () => {
      const eur = ref(100)
      const usd = ref(100)
      const gbp = ref(100)
      const xof = ref(50000)
      const mad = ref(1000)
      return { eur, usd, gbp, xof, mad }
    },
    template: `
      <div class="space-y-4 max-w-xs">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Euro (EUR)</label>
          <MoneyInput v-model="eur" currency="EUR" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">US Dollar (USD)</label>
          <MoneyInput v-model="usd" currency="USD" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">British Pound (GBP)</label>
          <MoneyInput v-model="gbp" currency="GBP" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">CFA Franc (XOF)</label>
          <MoneyInput v-model="xof" currency="XOF" :decimals="0" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Moroccan Dirham (MAD)</label>
          <MoneyInput v-model="mad" currency="MAD" />
        </div>
      </div>
    `,
  }),
}
