import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, onMounted, onUnmounted } from 'vue'
import Progress from './Progress.vue'

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    max: { control: 'number' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    showLabel: { control: 'boolean' },
    striped: { control: 'boolean' },
    animated: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
  args: {
    value: 60,
    max: 100,
    size: 'md',
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" />',
  }),
}

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <div>
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Small</p>
          <Progress :value="60" size="sm" />
        </div>
        <div>
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium</p>
          <Progress :value="60" size="md" />
        </div>
        <div>
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Large</p>
          <Progress :value="60" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="space-y-4">
        <Progress :value="80" variant="default" showLabel />
        <Progress :value="100" variant="success" showLabel />
        <Progress :value="60" variant="warning" showLabel />
        <Progress :value="30" variant="error" showLabel />
      </div>
    `,
  }),
}

export const Striped: Story = {
  args: {
    value: 70,
    striped: true,
    size: 'lg',
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" />',
  }),
}

export const Animated: Story = {
  args: {
    value: 70,
    striped: true,
    animated: true,
    size: 'lg',
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" />',
  }),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    size: 'md',
  },
  render: (args) => ({
    components: { Progress },
    setup: () => ({ args }),
    template: '<Progress v-bind="args" />',
  }),
}

export const AnimatedProgress: Story = {
  render: () => ({
    components: { Progress },
    setup: () => {
      const value = ref(0)
      let interval: ReturnType<typeof setInterval>

      onMounted(() => {
        interval = setInterval(() => {
          value.value = (value.value + 1) % 101
        }, 50)
      })

      onUnmounted(() => {
        clearInterval(interval)
      })

      return { value }
    },
    template: '<Progress :value="value" showLabel />',
  }),
}

export const FileUpload: Story = {
  render: () => ({
    components: { Progress },
    template: `
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-sm font-medium text-gray-900 dark:text-white">Uploading file.zip</span>
          <span class="text-sm text-gray-500">2.4 MB / 4.0 MB</span>
        </div>
        <Progress :value="60" size="sm" />
      </div>
    `,
  }),
}
