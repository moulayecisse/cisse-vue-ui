import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MenuItem from './MenuItem.vue'

const meta: Meta<typeof MenuItem> = {
  title: 'Core/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    expanded: { control: 'boolean' },
    active: { control: 'boolean' },
  },
  decorators: [
    () => ({
      template: '<div class="bg-primary p-4 rounded-lg"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menuItem: {
      label: 'Dashboard',
      icon: 'lucide:layout-dashboard',
      link: '/dashboard',
    },
    expanded: true,
  },
}

export const Active: Story = {
  args: {
    menuItem: {
      label: 'Dashboard',
      icon: 'lucide:layout-dashboard',
      link: '/dashboard',
    },
    expanded: true,
    active: true,
  },
}

export const WithNotification: Story = {
  args: {
    menuItem: {
      label: 'Messages',
      icon: 'lucide:mail',
      link: '/messages',
      notification: true,
    },
    expanded: true,
  },
}

export const Collapsed: Story = {
  args: {
    menuItem: {
      label: 'Settings',
      icon: 'lucide:settings',
      link: '/settings',
    },
    expanded: false,
  },
}

export const CollapsedActive: Story = {
  args: {
    menuItem: {
      label: 'Users',
      icon: 'lucide:users',
      link: '/users',
    },
    expanded: false,
    active: true,
  },
}

export const NavigationMenu: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItems = [
        { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/' },
        { label: 'Users', icon: 'lucide:users', link: '/users' },
        { label: 'Projects', icon: 'lucide:folder', link: '/projects' },
        { label: 'Messages', icon: 'lucide:mail', link: '/messages', notification: true },
        { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
      ]
      return { menuItems }
    },
    template: `
      <div class="space-y-2">
        <MenuItem
          v-for="item in menuItems"
          :key="item.link"
          :menu-item="item"
          :active="item.link === '/'"
          expanded
        />
      </div>
    `,
  }),
}

export const CollapsedMenu: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItems = [
        { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/' },
        { label: 'Users', icon: 'lucide:users', link: '/users' },
        { label: 'Projects', icon: 'lucide:folder', link: '/projects' },
        { label: 'Messages', icon: 'lucide:mail', link: '/messages', notification: true },
        { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
      ]
      return { menuItems }
    },
    template: `
      <div class="space-y-4">
        <MenuItem
          v-for="item in menuItems"
          :key="item.link"
          :menu-item="item"
          :active="item.link === '/'"
          :expanded="false"
        />
      </div>
    `,
  }),
}

export const DifferentIcons: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItems = [
        { label: 'Home', icon: 'lucide:home', link: '/home' },
        { label: 'Analytics', icon: 'lucide:bar-chart-2', link: '/analytics' },
        { label: 'Calendar', icon: 'lucide:calendar', link: '/calendar' },
        { label: 'Files', icon: 'lucide:file-text', link: '/files' },
        { label: 'Support', icon: 'lucide:help-circle', link: '/support' },
      ]
      return { menuItems }
    },
    template: `
      <div class="space-y-2">
        <MenuItem
          v-for="item in menuItems"
          :key="item.link"
          :menu-item="item"
          expanded
        />
      </div>
    `,
  }),
}
