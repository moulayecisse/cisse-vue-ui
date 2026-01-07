import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatItem from './StatItem.vue'

const meta: Meta<typeof StatItem> = {
  title: 'Core/StatItem',
  component: StatItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    description: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    icon: { control: 'text' },
    iconPosition: {
      control: 'select',
      options: ['top', 'left', 'right', 'bottom'],
    },
    iconRounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    hideIconBg: { control: 'boolean' },
    change: { control: 'number' },
    changeLabel: { control: 'text' },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
    trendOnly: { control: 'boolean' },
    hideTrendIcon: { control: 'boolean' },
    invertTrendColors: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'outline', 'flat', 'solid'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    clickable: { control: 'boolean' },
    centered: { control: 'boolean' },
    labelFirst: { control: 'boolean' },
    compact: { control: 'boolean' },
    loading: { control: 'boolean' },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    accent: {
      control: 'select',
      options: ['none', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
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

export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Revenue',
    value: '45,678',
    prefix: '$',
    suffix: 'USD',
    icon: 'heroicons:banknotes',
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Active Users',
    value: '892',
    description: 'Currently online right now',
    icon: 'heroicons:users',
    change: 5,
    changeLabel: 'vs last hour',
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

export const InvertedTrendColors: Story = {
  args: {
    label: 'Bounce Rate',
    value: '23%',
    icon: 'heroicons:arrow-trending-down',
    change: -5,
    changeLabel: 'vs last month',
    invertTrendColors: true,
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

export const IconBottom: Story = {
  args: {
    label: 'Downloads',
    value: '12,456',
    icon: 'heroicons:arrow-down-tray',
    iconPosition: 'bottom',
    change: 8,
  },
}

export const RoundIcon: Story = {
  args: {
    label: 'Team Members',
    value: '24',
    icon: 'heroicons:user-group',
    iconRounded: 'full',
  },
}

export const NoIconBackground: Story = {
  args: {
    label: 'Quick Stat',
    value: '42',
    icon: 'heroicons:bolt',
    hideIconBg: true,
  },
}

export const LabelFirst: Story = {
  args: {
    label: 'Total Orders',
    value: '1,234',
    icon: 'heroicons:shopping-bag',
    labelFirst: true,
  },
}

export const XSmallSize: Story = {
  args: {
    label: 'Tiny',
    value: '12',
    icon: 'heroicons:star',
    size: 'xs',
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

export const XLargeSize: Story = {
  args: {
    label: 'Huge Number',
    value: '1.2M',
    icon: 'heroicons:globe-alt',
    size: 'xl',
  },
}

export const CompactMode: Story = {
  args: {
    label: 'Compact',
    value: '256',
    icon: 'heroicons:cube',
    compact: true,
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

export const HideTrendIcon: Story = {
  args: {
    label: 'Performance',
    value: '95%',
    icon: 'heroicons:chart-bar',
    change: 12,
    hideTrendIcon: true,
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

export const SolidVariant: Story = {
  args: {
    label: 'Active Users',
    value: '892',
    icon: 'heroicons:user-group',
    variant: 'solid',
    color: 'primary',
  },
}

export const SolidSuccess: Story = {
  args: {
    label: 'Completed',
    value: '456',
    icon: 'heroicons:check-circle',
    variant: 'solid',
    color: 'success',
  },
}

export const SolidDanger: Story = {
  args: {
    label: 'Errors',
    value: '7',
    icon: 'heroicons:x-circle',
    variant: 'solid',
    color: 'danger',
  },
}

export const WithAccent: Story = {
  args: {
    label: 'Featured',
    value: '100',
    icon: 'heroicons:star',
    accent: 'primary',
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

export const Loading: Story = {
  args: {
    label: 'Loading...',
    value: '0',
    icon: 'heroicons:users',
    loading: true,
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="flex flex-col gap-4">
        <StatItem label="XS Size" value="12" icon="heroicons:star" size="xs" />
        <StatItem label="Small" value="123" icon="heroicons:star" size="sm" />
        <StatItem label="Medium" value="456" icon="heroicons:star" size="md" />
        <StatItem label="Large" value="789" icon="heroicons:star" size="lg" />
        <StatItem label="XL Size" value="1,234" icon="heroicons:star" size="xl" />
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
        <StatItem label="Icon Bottom" value="012" icon="heroicons:star" iconPosition="bottom" />
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

export const AllVariants: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <StatItem label="Default" value="100" icon="heroicons:star" variant="default" />
        <StatItem label="Flat" value="200" icon="heroicons:star" variant="flat" />
        <StatItem label="Outline" value="300" icon="heroicons:star" variant="outline" />
        <StatItem label="Solid Primary" value="400" icon="heroicons:star" variant="solid" color="primary" />
        <StatItem label="Solid Success" value="500" icon="heroicons:star" variant="solid" color="success" />
        <StatItem label="Solid Danger" value="600" icon="heroicons:star" variant="solid" color="danger" />
      </div>
    `,
  }),
}

export const AllIconRounded: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <StatItem label="None" value="1" icon="heroicons:star" iconRounded="none" />
        <StatItem label="Small" value="2" icon="heroicons:star" iconRounded="sm" />
        <StatItem label="Medium" value="3" icon="heroicons:star" iconRounded="md" />
        <StatItem label="Large" value="4" icon="heroicons:star" iconRounded="lg" />
        <StatItem label="XL" value="5" icon="heroicons:star" iconRounded="xl" />
        <StatItem label="Full" value="6" icon="heroicons:star" iconRounded="full" />
      </div>
    `,
  }),
}

export const DashboardMetrics: Story = {
  render: () => ({
    components: { StatItem },
    template: `
      <div class="grid grid-cols-4 gap-4">
        <StatItem
          label="Total Revenue"
          value="284,567"
          prefix="$"
          icon="heroicons:banknotes"
          color="success"
          change="12.5"
          changeLabel="vs last month"
        />
        <StatItem
          label="Active Users"
          value="12,847"
          icon="heroicons:users"
          color="primary"
          change="8.2"
          changeLabel="vs last month"
        />
        <StatItem
          label="Bounce Rate"
          value="23.4"
          suffix="%"
          icon="heroicons:arrow-trending-down"
          color="warning"
          change="-5.1"
          invertTrendColors
          changeLabel="vs last month"
        />
        <StatItem
          label="Response Time"
          value="1.2"
          suffix="s"
          icon="heroicons:clock"
          color="info"
          change="-15"
          invertTrendColors
          changeLabel="vs last month"
        />
      </div>
    `,
  }),
}
