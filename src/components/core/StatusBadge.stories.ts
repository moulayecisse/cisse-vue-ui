import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatusBadge from './StatusBadge.vue'

const meta: Meta<typeof StatusBadge> = {
  title: 'Core/StatusBadge',
  component: StatusBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'success',
        'error',
        'warning',
        'info',
        'blue',
        'orange',
        'green',
        'red',
        'yellow',
        'purple',
        'pink',
        'gray',
      ],
    },
  },
  args: {
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => ({
    components: { StatusBadge },
    setup: () => ({ args }),
    template: '<StatusBadge v-bind="args">Default</StatusBadge>',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    components: { StatusBadge },
    setup: () => ({ args }),
    template: '<StatusBadge v-bind="args">Active</StatusBadge>',
  }),
}

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: (args) => ({
    components: { StatusBadge },
    setup: () => ({ args }),
    template: '<StatusBadge v-bind="args">Failed</StatusBadge>',
  }),
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    components: { StatusBadge },
    setup: () => ({ args }),
    template: '<StatusBadge v-bind="args">Pending</StatusBadge>',
  }),
}

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    components: { StatusBadge },
    setup: () => ({ args }),
    template: '<StatusBadge v-bind="args">Info</StatusBadge>',
  }),
}

export const SemanticVariants: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <StatusBadge variant="default">Default</StatusBadge>
        <StatusBadge variant="success">Success</StatusBadge>
        <StatusBadge variant="error">Error</StatusBadge>
        <StatusBadge variant="warning">Warning</StatusBadge>
        <StatusBadge variant="info">Info</StatusBadge>
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="flex flex-wrap gap-2">
        <StatusBadge variant="blue">Blue</StatusBadge>
        <StatusBadge variant="orange">Orange</StatusBadge>
        <StatusBadge variant="green">Green</StatusBadge>
        <StatusBadge variant="red">Red</StatusBadge>
        <StatusBadge variant="yellow">Yellow</StatusBadge>
        <StatusBadge variant="purple">Purple</StatusBadge>
        <StatusBadge variant="pink">Pink</StatusBadge>
        <StatusBadge variant="gray">Gray</StatusBadge>
      </div>
    `,
  }),
}

export const UseCases: Story = {
  render: () => ({
    components: { StatusBadge },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">Order Status:</span>
          <StatusBadge variant="success">Delivered</StatusBadge>
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">Payment:</span>
          <StatusBadge variant="warning">Pending</StatusBadge>
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">Account:</span>
          <StatusBadge variant="error">Suspended</StatusBadge>
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">Plan:</span>
          <StatusBadge variant="purple">Premium</StatusBadge>
        </div>
      </div>
    `,
  }),
}
