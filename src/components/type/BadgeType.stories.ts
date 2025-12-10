import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BadgeType from './BadgeType.vue'

const meta: Meta<typeof BadgeType> = {
  title: 'Type/BadgeType',
  component: BadgeType,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
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
    value: 'Status',
  },
  render: (args) => ({
    components: { BadgeType },
    setup: () => ({ args }),
    template: '<BadgeType v-bind="args" />',
  }),
}

export const Success: Story = {
  args: {
    value: 'Active',
    variant: 'success',
  },
  render: (args) => ({
    components: { BadgeType },
    setup: () => ({ args }),
    template: '<BadgeType v-bind="args" />',
  }),
}

export const Error: Story = {
  args: {
    value: 'Failed',
    variant: 'error',
  },
  render: (args) => ({
    components: { BadgeType },
    setup: () => ({ args }),
    template: '<BadgeType v-bind="args" />',
  }),
}

export const Warning: Story = {
  args: {
    value: 'Pending',
    variant: 'warning',
  },
  render: (args) => ({
    components: { BadgeType },
    setup: () => ({ args }),
    template: '<BadgeType v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { BadgeType },
    template: `
      <div class="flex flex-wrap gap-2">
        <BadgeType value="Default" variant="default" />
        <BadgeType value="Success" variant="success" />
        <BadgeType value="Error" variant="error" />
        <BadgeType value="Warning" variant="warning" />
        <BadgeType value="Info" variant="info" />
        <BadgeType value="Blue" variant="blue" />
        <BadgeType value="Orange" variant="orange" />
        <BadgeType value="Green" variant="green" />
        <BadgeType value="Red" variant="red" />
        <BadgeType value="Yellow" variant="yellow" />
        <BadgeType value="Purple" variant="purple" />
        <BadgeType value="Pink" variant="pink" />
        <BadgeType value="Gray" variant="gray" />
      </div>
    `,
  }),
}

export const WithFormatter: Story = {
  render: () => ({
    components: { BadgeType },
    setup: () => ({
      formatter: (value: unknown) => String(value).toUpperCase(),
    }),
    template: '<BadgeType value="active" variant="success" :formatter="formatter" />',
  }),
}

export const StatusMapping: Story = {
  render: () => ({
    components: { BadgeType },
    setup: () => ({
      statuses: [
        { value: 'active', variant: 'success' },
        { value: 'pending', variant: 'warning' },
        { value: 'inactive', variant: 'gray' },
        { value: 'error', variant: 'error' },
        { value: 'processing', variant: 'info' },
      ],
    }),
    template: `
      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">Common status use cases:</p>
        <div class="flex flex-wrap gap-2">
          <BadgeType
            v-for="status in statuses"
            :key="status.value"
            :value="status.value"
            :variant="status.variant"
          />
        </div>
      </div>
    `,
  }),
}

export const InTable: Story = {
  render: () => ({
    components: { BadgeType },
    setup: () => ({
      orders: [
        { id: 1, customer: 'John Doe', status: 'delivered', statusVariant: 'success' },
        { id: 2, customer: 'Jane Smith', status: 'processing', statusVariant: 'info' },
        { id: 3, customer: 'Bob Wilson', status: 'pending', statusVariant: 'warning' },
        { id: 4, customer: 'Alice Brown', status: 'cancelled', statusVariant: 'error' },
      ],
    }),
    template: `
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Order ID</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Customer</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">#{{ order.id }}</td>
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">{{ order.customer }}</td>
            <td class="px-4 py-2 text-sm"><BadgeType :value="order.status" :variant="order.statusVariant" /></td>
          </tr>
        </tbody>
      </table>
    `,
  }),
}
