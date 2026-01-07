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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" show-value />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" allow-half show-value />`,
      },
    },
  },
}

export const ReadOnly: Story = {
  args: {
    modelValue: 4,
    readonly: true,
    showValue: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Rating :model-value="4" readonly show-value />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    modelValue: 3,
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Rating :model-value="3" disabled />`,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" size="sm" />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" size="lg" />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" color="text-red-500" />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" :max="10" show-value />`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" allow-half readonly />
<span>{{ rating }} out of 5 (128 reviews)</span>`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `<Rating v-model="rating" size="sm" />
<Rating v-model="rating" size="md" />
<Rating v-model="rating" size="lg" />`,
      },
    },
  },
}
