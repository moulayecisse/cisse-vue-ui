import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RangeSlider from './RangeSlider.vue'

const meta: Meta<typeof RangeSlider> = {
  title: 'Form/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const range = ref<[number, number]>([25, 75])
      return { args, range }
    },
    template: '<RangeSlider v-bind="args" v-model="range" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="range" />`,
      },
    },
  },
}

export const PriceRange: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const range = ref<[number, number]>([100, 500])
      const formatPrice = (v: number) => `$${v}`
      return { args, range, formatPrice }
    },
    template: `
      <div class="space-y-2">
        <label class="block text-sm font-medium">Price Range</label>
        <RangeSlider v-bind="args" v-model="range" :min="0" :max="1000" :step="10" :format-label="formatPrice" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="priceRange" :min="0" :max="1000" :step="10" :format-label="(v) => \`$\${v}\`" />`,
      },
    },
  },
}

export const WithoutLabels: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const range = ref<[number, number]>([30, 70])
      return { args, range }
    },
    template: '<RangeSlider v-bind="args" v-model="range" :show-labels="false" :show-min-max="false" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="range" :show-labels="false" :show-min-max="false" />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    modelValue: [20, 80],
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider :model-value="[20, 80]" disabled />`,
      },
    },
  },
}

export const CustomRange: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const range = ref<[number, number]>([2020, 2023])
      return { args, range }
    },
    template: `
      <div class="space-y-2">
        <label class="block text-sm font-medium">Year Range</label>
        <RangeSlider v-bind="args" v-model="range" :min="2000" :max="2024" :step="1" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="yearRange" :min="2000" :max="2024" :step="1" />`,
      },
    },
  },
}

export const PercentageRange: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const range = ref<[number, number]>([10, 90])
      const formatPercent = (v: number) => `${v}%`
      return { args, range, formatPercent }
    },
    template: `
      <div class="space-y-2">
        <label class="block text-sm font-medium">Progress Range</label>
        <RangeSlider v-bind="args" v-model="range" :min="0" :max="100" :format-label="formatPercent" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="range" :min="0" :max="100" :format-label="(v) => \`\${v}%\`" />`,
      },
    },
  },
}

export const FilterExample: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const priceRange = ref<[number, number]>([50, 200])
      const ratingRange = ref<[number, number]>([3, 5])
      const formatPrice = (v: number) => `$${v}`
      const formatRating = (v: number) => `${v}`
      return { args, priceRange, ratingRange, formatPrice, formatRating }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <h3 class="font-semibold">Filter Products</h3>

        <div class="space-y-2">
          <label class="block text-sm font-medium">Price</label>
          <RangeSlider v-model="priceRange" :min="0" :max="500" :step="10" :format-label="formatPrice" />
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium">Rating</label>
          <RangeSlider v-model="ratingRange" :min="1" :max="5" :step="0.5" :format-label="formatRating" />
        </div>

        <div class="pt-4 border-t">
          <p class="text-sm text-gray-600">
            Showing products from {{ formatPrice(priceRange[0]) }} to {{ formatPrice(priceRange[1]) }}
            with {{ formatRating(ratingRange[0]) }} to {{ formatRating(ratingRange[1]) }} rating
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="priceRange" :min="0" :max="500" :step="10" :format-label="formatPrice" />
<RangeSlider v-model="ratingRange" :min="1" :max="5" :step="0.5" :format-label="formatRating" />`,
      },
    },
  },
}

export const SmallStep: Story = {
  render: (args) => ({
    components: { RangeSlider },
    setup() {
      const range = ref<[number, number]>([0.2, 0.8])
      const formatDecimal = (v: number) => v.toFixed(1)
      return { args, range, formatDecimal }
    },
    template: `
      <div class="space-y-2">
        <label class="block text-sm font-medium">Opacity Range</label>
        <RangeSlider v-bind="args" v-model="range" :min="0" :max="1" :step="0.1" :format-label="formatDecimal" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<RangeSlider v-model="opacityRange" :min="0" :max="1" :step="0.1" :format-label="(v) => v.toFixed(1)" />`,
      },
    },
  },
}
