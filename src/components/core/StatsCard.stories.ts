import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatsCard from './StatsCard.vue'

const meta: Meta<typeof StatsCard> = {
  title: 'Core/StatsCard',
  component: StatsCard,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    change: { control: 'number' },
    changeLabel: { control: 'text' },
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

export const Default: Story = {
  args: {
    label: 'Total Users',
    value: '1,234',
    icon: 'heroicons:users',
  },
}

export const WithChange: Story = {
  args: {
    label: 'Revenue',
    value: '$45,678',
    icon: 'heroicons:banknotes',
    change: 12,
    changeLabel: 'vs last month',
  },
}

export const NegativeChange: Story = {
  args: {
    label: 'Orders',
    value: '567',
    icon: 'heroicons:shopping-cart',
    change: -3,
    changeLabel: 'vs last month',
  },
}

export const GlassVariant: Story = {
  args: {
    label: 'Appointments',
    value: '24',
    icon: 'heroicons:calendar',
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
    label: 'Active Users',
    value: '892',
    icon: 'heroicons:user-group',
    variant: 'solid',
    color: 'primary',
  },
}

export const OutlineVariant: Story = {
  args: {
    label: 'Pending',
    value: '15',
    icon: 'heroicons:clock',
    variant: 'outline',
  },
}

export const SuccessColor: Story = {
  args: {
    label: 'Completed',
    value: '456',
    icon: 'heroicons:check-circle',
    color: 'success',
  },
}

export const WarningColor: Story = {
  args: {
    label: 'Warnings',
    value: '23',
    icon: 'heroicons:exclamation-triangle',
    color: 'warning',
  },
}

export const DangerColor: Story = {
  args: {
    label: 'Errors',
    value: '7',
    icon: 'heroicons:x-circle',
    color: 'danger',
  },
}

export const NoIcon: Story = {
  args: {
    label: 'Simple Stat',
    value: '100',
  },
}
