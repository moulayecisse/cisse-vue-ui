import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageHero, { type PageHeroStat } from './PageHero.vue'

const meta: Meta<typeof PageHero> = {
  title: 'Layout/PageHero',
  component: PageHero,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    badge: { control: 'text' },
    badgeIcon: { control: 'text' },
    showBlobs: { control: 'boolean' },
    showWave: { control: 'boolean' },
    gradientDirection: {
      control: 'select',
      options: ['br', 'r', 'b'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Page Title',
    subtitle: 'A brief description of what this page contains.',
    badge: 'Dashboard',
    badgeIcon: 'heroicons:home',
  },
  parameters: {
    docs: {
      source: {
        code: `<PageHero
  title="Page Title"
  subtitle="A brief description of what this page contains."
  badge="Dashboard"
  badge-icon="heroicons:home"
/>`,
      },
    },
  },
}

export const WithStats: Story = {
  args: {
    title: 'My Appointments',
    subtitle: 'View and manage all your medical appointments',
    badge: 'Appointments',
    badgeIcon: 'heroicons:calendar-days',
    // @ts-expect-error Storybook type inference conflicts with Vue slots
    stats: [
      { label: 'Upcoming', value: 5, icon: 'heroicons:clock' },
      { label: 'Completed', value: 12, icon: 'heroicons:check-badge' },
      { label: 'Cancelled', value: 2, icon: 'heroicons:x-circle' },
    ] as PageHeroStat[],
  },
  parameters: {
    docs: {
      source: {
        code: `<PageHero
  title="My Appointments"
  subtitle="View and manage all your medical appointments"
  badge="Appointments"
  badge-icon="heroicons:calendar-days"
  :stats="[
    { label: 'Upcoming', value: 5, icon: 'heroicons:clock' },
    { label: 'Completed', value: 12, icon: 'heroicons:check-badge' },
    { label: 'Cancelled', value: 2, icon: 'heroicons:x-circle' },
  ]"
/>`,
      },
    },
  },
}

export const FourStats: Story = {
  args: {
    title: 'Dashboard Overview',
    subtitle: 'Your platform statistics at a glance',
    badge: 'Analytics',
    badgeIcon: 'heroicons:chart-bar',
    // @ts-expect-error Storybook type inference conflicts with Vue slots
    stats: [
      { label: 'Users', value: '1,234', icon: 'heroicons:users' },
      { label: 'Revenue', value: '$45K', icon: 'heroicons:banknotes' },
      { label: 'Orders', value: 567, icon: 'heroicons:shopping-cart' },
      { label: 'Growth', value: '+12%', icon: 'heroicons:arrow-trending-up' },
    ] as PageHeroStat[],
  },
  parameters: {
    docs: {
      source: {
        code: `<PageHero
  title="Dashboard Overview"
  subtitle="Your platform statistics at a glance"
  badge="Analytics"
  badge-icon="heroicons:chart-bar"
  :stats="[
    { label: 'Users', value: '1,234', icon: 'heroicons:users' },
    { label: 'Revenue', value: '$45K', icon: 'heroicons:banknotes' },
    { label: 'Orders', value: 567, icon: 'heroicons:shopping-cart' },
    { label: 'Growth', value: '+12%', icon: 'heroicons:arrow-trending-up' },
  ]"
/>`,
      },
    },
  },
}

export const WithDecorativeIcons: Story = {
  args: {
    title: 'Medical Records',
    subtitle: 'Access your complete medical history',
    badge: 'Health',
    badgeIcon: 'heroicons:heart',
    decorativeIcons: ['heroicons:document-text', 'heroicons:clipboard-document-list'],
  },
  parameters: {
    docs: {
      source: {
        code: `<PageHero
  title="Medical Records"
  subtitle="Access your complete medical history"
  badge="Health"
  badge-icon="heroicons:heart"
  :decorative-icons="['heroicons:document-text', 'heroicons:clipboard-document-list']"
/>`,
      },
    },
  },
}

export const MinimalNoBlobs: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Configure your preferences',
    showBlobs: false,
    showWave: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<PageHero
  title="Settings"
  subtitle="Configure your preferences"
  :show-blobs="false"
  :show-wave="false"
/>`,
      },
    },
  },
}

export const NoBadge: Story = {
  args: {
    title: 'Welcome Back!',
    subtitle: 'Here is what is happening with your account today.',
    // @ts-expect-error Storybook type inference conflicts with Vue slots
    stats: [
      { label: 'Messages', value: 3, icon: 'heroicons:envelope' },
      { label: 'Notifications', value: 7, icon: 'heroicons:bell' },
    ] as PageHeroStat[],
  },
  parameters: {
    docs: {
      source: {
        code: `<PageHero
  title="Welcome Back!"
  subtitle="Here is what is happening with your account today."
  :stats="[
    { label: 'Messages', value: 3, icon: 'heroicons:envelope' },
    { label: 'Notifications', value: 7, icon: 'heroicons:bell' },
  ]"
/>`,
      },
    },
  },
}
