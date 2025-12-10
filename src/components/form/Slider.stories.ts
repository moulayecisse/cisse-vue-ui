import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Slider from './Slider.vue'

const meta: Meta<typeof Slider> = {
  title: 'Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(50)
      return { args, value }
    },
    template: '<Slider v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  args: {
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(50)
      return { args, value }
    },
    template: '<Slider v-bind="args" v-model="value" />',
  }),
}

export const CustomRange: Story = {
  args: {
    min: 0,
    max: 1000,
    step: 50,
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(500)
      return { args, value }
    },
    template: '<Slider v-bind="args" v-model="value" />',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(30)
      return { args, value }
    },
    template: '<Slider v-bind="args" v-model="value" />',
  }),
}

export const WithFormatter: Story = {
  args: {
    min: 0,
    max: 100,
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(50)
      const formatValue = (v: number) => `${v}%`
      return { args, value, formatValue }
    },
    template: '<Slider v-bind="args" v-model="value" :format-value="formatValue" />',
  }),
}

export const PriceRange: Story = {
  args: {
    min: 0,
    max: 500,
    step: 10,
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(150)
      const formatValue = (v: number) => `$${v}`
      return { args, value, formatValue }
    },
    template: `
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Max Price</label>
        <Slider v-bind="args" v-model="value" :format-value="formatValue" />
      </div>
    `,
  }),
}

export const Volume: Story = {
  args: {
    min: 0,
    max: 100,
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(70)
      const formatValue = (v: number) => {
        if (v === 0) return 'Muted'
        if (v < 30) return 'Low'
        if (v < 70) return 'Medium'
        return 'High'
      }
      return { args, value, formatValue }
    },
    template: `
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Volume</label>
        <Slider v-bind="args" v-model="value" :format-value="formatValue" />
      </div>
    `,
  }),
}

export const Temperature: Story = {
  args: {
    min: 16,
    max: 30,
    step: 0.5,
    showValue: true,
  },
  render: (args) => ({
    components: { Slider },
    setup: () => {
      const value = ref(22)
      const formatValue = (v: number) => `${v}°C`
      return { args, value, formatValue }
    },
    template: `
      <div>
        <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Temperature</label>
        <Slider v-bind="args" v-model="value" :format-value="formatValue" />
      </div>
    `,
  }),
}
