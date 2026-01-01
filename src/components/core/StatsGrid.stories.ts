import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatsGrid from './StatsGrid.vue'

const meta: Meta<typeof StatsGrid> = {
  title: 'Core/StatsGrid',
  component: StatsGrid,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [2, 3, 4],
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'solid', 'outline'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const ThreeColumns: Story = {
  args: {
    stats: [
      { label: 'Users', value: '1,234', icon: 'heroicons:users' },
      { label: 'Revenue', value: '$45K', icon: 'heroicons:banknotes' },
      { label: 'Orders', value: 567, icon: 'heroicons:shopping-cart' },
    ],
  },
}

export const FourColumns: Story = {
  args: {
    stats: [
      { label: 'Users', value: '1,234', icon: 'heroicons:users' },
      { label: 'Revenue', value: '$45K', icon: 'heroicons:banknotes' },
      { label: 'Orders', value: 567, icon: 'heroicons:shopping-cart' },
      { label: 'Growth', value: '+12%', icon: 'heroicons:arrow-trending-up' },
    ],
  },
}

export const TwoColumns: Story = {
  args: {
    stats: [
      { label: 'Active', value: 892, icon: 'heroicons:check-circle' },
      { label: 'Pending', value: 45, icon: 'heroicons:clock' },
    ],
  },
}

export const WithChanges: Story = {
  args: {
    stats: [
      { label: 'Users', value: '1,234', icon: 'heroicons:users', change: 12 },
      { label: 'Revenue', value: '$45K', icon: 'heroicons:banknotes', change: 8 },
      { label: 'Orders', value: 567, icon: 'heroicons:shopping-cart', change: -3 },
    ],
  },
}

export const GlassVariant: Story = {
  args: {
    stats: [
      { label: 'Upcoming', value: 5, icon: 'heroicons:clock' },
      { label: 'Completed', value: 12, icon: 'heroicons:check-badge' },
      { label: 'Cancelled', value: 2, icon: 'heroicons:x-circle' },
    ],
    variant: 'glass',
  },
  decorators: [
    () => ({
      template: '<div class="bg-gradient-to-br from-primary-600 to-primary-400 p-8"><story /></div>',
    }),
  ],
}

export const SolidVariant: Story = {
  args: {
    stats: [
      { label: 'Total', value: 100 },
      { label: 'Active', value: 85 },
      { label: 'Inactive', value: 15 },
    ],
    variant: 'solid',
    color: 'primary',
  },
}

export const ForcedCols: Story = {
  args: {
    stats: [
      { label: 'A', value: 1 },
      { label: 'B', value: 2 },
      { label: 'C', value: 3 },
      { label: 'D', value: 4 },
      { label: 'E', value: 5 },
      { label: 'F', value: 6 },
    ],
    cols: 3,
  },
}
