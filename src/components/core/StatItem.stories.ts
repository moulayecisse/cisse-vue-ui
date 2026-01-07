import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatItem from './StatItem.vue'

const meta: Meta<typeof StatItem> = {
  title: 'Core/StatItem',
  component: StatItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    iconPosition: {
      control: 'select',
      options: ['top', 'left', 'right'],
    },
    change: { control: 'number' },
    changeLabel: { control: 'text' },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
    trendOnly: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'outline', 'flat'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    clickable: { control: 'boolean' },
    centered: { control: 'boolean' },
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

export const IconLeft: Story = {
  args: {
    label: 'Active Sessions',
    value: '892',
    icon: 'heroicons:signal',
    iconPosition: 'left',
    change: 5,
  },
}

export const IconRight: Story = {
  args: {
    label: 'Pending Tasks',
    value: '23',
    icon: 'heroicons:clock',
    iconPosition: 'right',
    change: -2,
  },
}

export const SmallSize: Story = {
  args: {
    label: 'Quick Stat',
    value: '42',
    icon: 'heroicons:bolt',
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    label: 'Big Number',
    value: '99,999',
    icon: 'heroicons:chart-bar',
    size: 'lg',
  },
}

export const TrendOnly: Story = {
  args: {
    label: 'Growth',
    value: '89%',
    icon: 'heroicons:arrow-trending-up',
    trend: 'up',
    trendOnly: true,
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

export const OutlineVariant: Story = {
  args: {
    label: 'Pending',
    value: '15',
    icon: 'heroicons:clock',
    variant: 'outline',
  },
}

export const FlatVariant: Story = {
  args: {
    label: 'Completed',
    value: '128',
    icon: 'heroicons:check-circle',
    variant: 'flat',
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

export const InfoColor: Story = {
  args: {
    label: 'Info',
    value: '42',
    icon: 'heroicons:information-circle',
    color: 'info',
  },
}

export const NoIcon: Story = {
  args: {
    label: 'Simple Stat',
    value: '100',
  },
}

export const Clickable: Story = {
  args: {
    label: 'Click Me',
    value: '42',
    icon: 'heroicons:cursor-arrow-rays',
    clickable: true,
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="flex flex-col gap-4">
        <StatItem label="Small" value="123" icon="heroicons:star" size="sm" />
        <StatItem label="Medium" value="456" icon="heroicons:star" size="md" />
        <StatItem label="Large" value="789" icon="heroicons:star" size="lg" />
      </div>
    `,
  }),
}

export const AllIconPositions: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="flex flex-col gap-4">
        <StatItem label="Icon Top" value="123" icon="heroicons:star" iconPosition="top" />
        <StatItem label="Icon Left" value="456" icon="heroicons:star" iconPosition="left" />
        <StatItem label="Icon Right" value="789" icon="heroicons:star" iconPosition="right" />
      </div>
    `,
  }),
}

export const AllColors: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <StatItem label="Primary" value="1" icon="heroicons:star" color="primary" />
        <StatItem label="Secondary" value="2" icon="heroicons:star" color="secondary" />
        <StatItem label="Success" value="3" icon="heroicons:star" color="success" />
        <StatItem label="Warning" value="4" icon="heroicons:star" color="warning" />
        <StatItem label="Danger" value="5" icon="heroicons:star" color="danger" />
        <StatItem label="Info" value="6" icon="heroicons:star" color="info" />
      </div>
    `,
  }),
}
