import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import ColorPicker from './ColorPicker.vue'

const meta: Meta<typeof ColorPicker> = {
  title: 'Form/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    teleport: {
      control: 'text',
      description: 'Teleport target (e.g., "body", "#app"). Leave empty to disable.',
    },
  },
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  render: (args) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#3b82f6')
      return { args, color }
    },
    template: '<ColorPicker v-bind="args" v-model="color" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="color" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#10b981')
      return { args, color }
    },
    template: '<ColorPicker v-bind="args" v-model="color" label="Brand Color" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="color" label="Brand Color" />`,
      },
    },
  },
}

export const CustomSwatches: Story = {
  render: (args) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#1e3a8a')
      const swatches = [
        '#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6',
        '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#eff6ff',
      ]
      return { args, color, swatches }
    },
    template: '<ColorPicker v-bind="args" v-model="color" :swatches="swatches" label="Blue Palette" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="color" :swatches="swatches" label="Blue Palette" />`,
      },
    },
  },
}

export const WithoutInput: Story = {
  render: (args) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#ef4444')
      return { args, color }
    },
    template: '<ColorPicker v-bind="args" v-model="color" :show-input="false" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="color" :show-input="false" />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    modelValue: '#6366f1',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="color" disabled />`,
      },
    },
  },
}

export const BrandColors: Story = {
  render: (args) => ({
    components: { ColorPicker },
    setup() {
      const primaryColor = ref('#3b82f6')
      const secondaryColor = ref('#10b981')
      const accentColor = ref('#f59e0b')
      return { args, primaryColor, secondaryColor, accentColor }
    },
    template: `
      <div class="space-y-4">
        <ColorPicker v-model="primaryColor" label="Primary Color" />
        <ColorPicker v-model="secondaryColor" label="Secondary Color" />
        <ColorPicker v-model="accentColor" label="Accent Color" />

        <div class="mt-6 p-4 border rounded-lg">
          <h3 class="font-medium mb-2">Preview</h3>
          <div class="flex gap-2">
            <div class="size-20 rounded" :style="{ backgroundColor: primaryColor }"></div>
            <div class="size-20 rounded" :style="{ backgroundColor: secondaryColor }"></div>
            <div class="size-20 rounded" :style="{ backgroundColor: accentColor }"></div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="primaryColor" label="Primary Color" />
<ColorPicker v-model="secondaryColor" label="Secondary Color" />
<ColorPicker v-model="accentColor" label="Accent Color" />`,
      },
    },
  },
}

export const GrayscalePalette: Story = {
  render: (args) => ({
    components: { ColorPicker },
    setup() {
      const color = ref('#6b7280')
      const swatches = [
        '#000000', '#1f2937', '#374151', '#4b5563', '#6b7280',
        '#9ca3af', '#d1d5db', '#e5e7eb', '#f3f4f6', '#ffffff',
      ]
      return { args, color, swatches }
    },
    template: '<ColorPicker v-bind="args" v-model="color" :swatches="swatches" label="Gray Color" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker v-model="color" :swatches="swatches" label="Gray Color" />`,
      },
    },
  },
}
