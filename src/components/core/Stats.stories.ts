import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stats from './Stats.vue'
import StatItem from './StatItem.vue'

const meta: Meta<typeof Stats> = {
  title: 'Core/Stats',
  component: Stats,
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
    },
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'outline', 'flat'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['top', 'left', 'right'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleStats = [
  { label: 'Total Users', value: '1,234', icon: 'heroicons:users', change: 12, changeLabel: 'vs last month' },
  { label: 'Revenue', value: '$45,678', icon: 'heroicons:banknotes', change: 8.5, changeLabel: 'vs last month' },
  { label: 'Orders', value: '567', icon: 'heroicons:shopping-cart', change: -3, changeLabel: 'vs last month' },
  { label: 'Growth', value: '23%', icon: 'heroicons:arrow-trending-up', change: 5, changeLabel: 'vs last month' },
]

export const Default: Story = {
  args: {
    stats: sampleStats,
  },
}

export const TwoColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 2),
    cols: 2,
  },
}

export const ThreeColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 3),
    cols: 3,
  },
}

export const FourColumns: Story = {
  args: {
    stats: sampleStats,
    cols: 4,
  },
}

export const SmallSize: Story = {
  args: {
    stats: sampleStats,
    size: 'sm',
  },
}

export const LargeSize: Story = {
  args: {
    stats: sampleStats,
    size: 'lg',
  },
}

export const IconLeft: Story = {
  args: {
    stats: sampleStats,
    iconPosition: 'left',
    cols: 2,
  },
}

export const IconRight: Story = {
  args: {
    stats: sampleStats,
    iconPosition: 'right',
    cols: 2,
  },
}

export const GlassVariant: Story = {
  args: {
    stats: sampleStats,
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
    stats: sampleStats,
    variant: 'outline',
  },
}

export const FlatVariant: Story = {
  args: {
    stats: sampleStats,
    variant: 'flat',
  },
}

export const MixedColors: Story = {
  args: {
    stats: [
      { label: 'Users', value: '1,234', icon: 'heroicons:users', color: 'primary' as const },
      { label: 'Success', value: '456', icon: 'heroicons:check-circle', color: 'success' as const },
      { label: 'Warnings', value: '23', icon: 'heroicons:exclamation-triangle', color: 'warning' as const },
      { label: 'Errors', value: '7', icon: 'heroicons:x-circle', color: 'danger' as const },
    ],
  },
}

export const WithTrends: Story = {
  args: {
    stats: [
      { label: 'Active Users', value: '892', icon: 'heroicons:users', trend: 'up' as const },
      { label: 'Revenue', value: '$12,345', icon: 'heroicons:banknotes', trend: 'up' as const },
      { label: 'Churn', value: '2.3%', icon: 'heroicons:arrow-trending-down', trend: 'down' as const },
      { label: 'Stability', value: '99.9%', icon: 'heroicons:shield-check', trend: 'neutral' as const },
    ],
  },
}

export const SmallGap: Story = {
  args: {
    stats: sampleStats,
    gap: 'sm',
  },
}

export const LargeGap: Story = {
  args: {
    stats: sampleStats,
    gap: 'lg',
  },
}

export const WithSlotContent: Story = {
  render: () => ({
    components: { Stats, StatItem },
    template: `
      <Stats>
        <StatItem label="Custom 1" value="100" icon="heroicons:star" color="primary" />
        <StatItem label="Custom 2" value="200" icon="heroicons:heart" color="danger" />
        <StatItem label="Custom 3" value="300" icon="heroicons:bolt" color="warning" />
        <StatItem label="Custom 4" value="400" icon="heroicons:sparkles" color="info" />
      </Stats>
    `,
  }),
}

export const MixedSlotAndProps: Story = {
  render: () => ({
    components: { Stats, StatItem },
    template: `
      <Stats :stats="[
        { label: 'From Props', value: '123', icon: 'heroicons:cube' },
        { label: 'Also Props', value: '456', icon: 'heroicons:squares-2x2' },
      ]">
        <StatItem label="From Slot" value="789" icon="heroicons:star" color="success" />
        <StatItem label="Also Slot" value="012" icon="heroicons:heart" color="danger" />
      </Stats>
    `,
  }),
}

export const DashboardExample: Story = {
  render: () => ({
    components: { Stats },
    template: `
      <div class="space-y-8">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h2>
        <Stats
          :stats="[
            { label: 'Total Revenue', value: '$284,567', icon: 'heroicons:banknotes', change: 12.5, changeLabel: 'vs last month', color: 'success' },
            { label: 'Active Users', value: '12,847', icon: 'heroicons:users', change: 8.2, changeLabel: 'vs last month', color: 'primary' },
            { label: 'Pending Orders', value: '284', icon: 'heroicons:clock', change: -5.1, changeLabel: 'vs last month', color: 'warning' },
            { label: 'Conversion Rate', value: '3.24%', icon: 'heroicons:arrow-trending-up', change: 2.4, changeLabel: 'vs last month', color: 'info' },
          ]"
          size="md"
        />
      </div>
    `,
  }),
}

export const CompactStats: Story = {
  render: () => ({
    components: { Stats },
    template: `
      <Stats
        :stats="[
          { label: 'CPU', value: '45%', icon: 'heroicons:cpu-chip' },
          { label: 'RAM', value: '68%', icon: 'heroicons:circle-stack' },
          { label: 'Disk', value: '32%', icon: 'heroicons:server' },
          { label: 'Network', value: '12ms', icon: 'heroicons:signal' },
        ]"
        size="sm"
        iconPosition="left"
        variant="flat"
        :cols="4"
      />
    `,
  }),
}
