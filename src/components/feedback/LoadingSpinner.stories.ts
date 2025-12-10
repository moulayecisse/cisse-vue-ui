import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LoadingSpinner from './LoadingSpinner.vue'

const meta: Meta<typeof LoadingSpinner> = {
  title: 'Feedback/LoadingSpinner',
  component: LoadingSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    text: { control: 'text' },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { LoadingSpinner },
    setup: () => ({ args }),
    template: '<LoadingSpinner v-bind="args" />',
  }),
}

export const WithText: Story = {
  args: {
    text: 'Loading...',
  },
  render: (args) => ({
    components: { LoadingSpinner },
    setup: () => ({ args }),
    template: '<LoadingSpinner v-bind="args" />',
  }),
}

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Loading...',
  },
  render: (args) => ({
    components: { LoadingSpinner },
    setup: () => ({ args }),
    template: '<LoadingSpinner v-bind="args" />',
  }),
}

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Please wait...',
  },
  render: (args) => ({
    components: { LoadingSpinner },
    setup: () => ({ args }),
    template: '<LoadingSpinner v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { LoadingSpinner },
    template: `
      <div class="flex items-start gap-8">
        <div class="text-center">
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Small</p>
          <LoadingSpinner size="sm" />
        </div>
        <div class="text-center">
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium</p>
          <LoadingSpinner size="md" />
        </div>
        <div class="text-center">
          <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Large</p>
          <LoadingSpinner size="lg" />
        </div>
      </div>
    `,
  }),
}

export const InCard: Story = {
  render: () => ({
    components: { LoadingSpinner },
    template: `
      <div class="rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-700 dark:bg-gray-800">
        <LoadingSpinner text="Fetching data..." />
      </div>
    `,
  }),
}
