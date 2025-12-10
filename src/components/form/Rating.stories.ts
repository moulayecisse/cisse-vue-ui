import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Rating from './Rating.vue'

const meta: Meta<typeof Rating> = {
  title: 'Form/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(3)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" />',
  }),
}

export const WithValue: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(4)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" show-value />',
  }),
}

export const HalfStars: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(3.5)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" allow-half show-value />',
  }),
}

export const ReadOnly: Story = {
  args: {
    modelValue: 4,
    readonly: true,
    showValue: true,
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 3,
    disabled: true,
  },
}

export const SmallSize: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(4)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" size="sm" />',
  }),
}

export const LargeSize: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(4)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" size="lg" />',
  }),
}

export const CustomColor: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(4)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" color="text-red-500" />',
  }),
}

export const TenStars: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(7)
      return { args, value }
    },
    template: '<Rating v-bind="args" v-model="value" :max="10" show-value />',
  }),
}

export const ProductRating: Story = {
  render: (args) => ({
    components: { Rating },
    setup() {
      const value = ref(4.5)
      return { args, value }
    },
    template: `
      <div class="flex items-center gap-4">
        <Rating v-bind="args" v-model="value" allow-half readonly />
        <span class="text-sm text-gray-600">{{ value }} out of 5 (128 reviews)</span>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const value = ref(4)
      return { value }
    },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm">Small:</span>
          <Rating v-model="value" size="sm" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm">Medium:</span>
          <Rating v-model="value" size="md" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-20 text-sm">Large:</span>
          <Rating v-model="value" size="lg" />
        </div>
      </div>
    `,
  }),
}
