import type { Meta, StoryObj } from '@storybook/vue3-vite'
import MenuItem from './MenuItem.vue'

const meta: Meta<typeof MenuItem> = {
  title: 'Core/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    expanded: { control: 'boolean' },
    active: { control: 'boolean' },
    depth: { control: 'number' },
  },
  decorators: [
    () => ({
      template: '<div class="bg-primary p-4 rounded-lg w-64"><story /></div>',
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

export const WithSubmenu: Story = {
  args: {
    menuItem: {
      label: 'Settings',
      icon: 'lucide:settings',
      link: '/settings',
      children: [
        { label: 'Profile', icon: 'lucide:user', link: '/settings/profile' },
        { label: 'Security', icon: 'lucide:shield', link: '/settings/security' },
        { label: 'Notifications', icon: 'lucide:bell', link: '/settings/notifications' },
      ],
    },
    expanded: true,
  },
}

export const NestedMenu: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItems = [
        { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/' },
        {
          label: 'Users',
          icon: 'lucide:users',
          link: '/users',
          children: [
            { label: 'All Users', icon: 'lucide:list', link: '/users/all' },
            { label: 'Add User', icon: 'lucide:user-plus', link: '/users/add' },
            { label: 'Roles', icon: 'lucide:shield', link: '/users/roles' },
          ],
        },
        {
          label: 'Products',
          icon: 'lucide:package',
          link: '/products',
          children: [
            { label: 'Inventory', icon: 'lucide:warehouse', link: '/products/inventory' },
            { label: 'Categories', icon: 'lucide:tags', link: '/products/categories' },
          ],
        },
        { label: 'Reports', icon: 'lucide:bar-chart-2', link: '/reports' },
        {
          label: 'Settings',
          icon: 'lucide:settings',
          link: '/settings',
          children: [
            { label: 'General', icon: 'lucide:sliders', link: '/settings/general' },
            { label: 'Security', icon: 'lucide:lock', link: '/settings/security' },
          ],
        },
      ]
      return { menuItems }
    },
    template: `
      <div class="space-y-1">
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

export const DeepNesting: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItem = {
        label: 'Administration',
        icon: 'lucide:settings-2',
        link: '/admin',
        children: [
          {
            label: 'User Management',
            icon: 'lucide:users',
            link: '/admin/users',
            children: [
              { label: 'Active Users', icon: 'lucide:user-check', link: '/admin/users/active' },
              { label: 'Pending', icon: 'lucide:user-clock', link: '/admin/users/pending' },
              { label: 'Archived', icon: 'lucide:archive', link: '/admin/users/archived' },
            ],
          },
          {
            label: 'System',
            icon: 'lucide:server',
            link: '/admin/system',
            children: [
              { label: 'Logs', icon: 'lucide:file-text', link: '/admin/system/logs' },
              { label: 'Backups', icon: 'lucide:database', link: '/admin/system/backups' },
            ],
          },
        ],
      }
      return { menuItem }
    },
    template: `
      <MenuItem
        :menu-item="menuItem"
        expanded
      />
    `,
  }),
}

export const SubmenuWithActiveChild: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItem = {
        label: 'Settings',
        icon: 'lucide:settings',
        link: '/settings',
        children: [
          { label: 'Profile', icon: 'lucide:user', link: '/settings/profile' },
          { label: 'Security', icon: 'lucide:shield', link: '/settings/security' },
          { label: 'Notifications', icon: 'lucide:bell', link: '/settings/notifications' },
        ],
      }
      return { menuItem }
    },
    template: `
      <MenuItem
        :menu-item="menuItem"
        expanded
        current-path="/settings/security"
      />
    `,
  }),
}

export const WithSubmenuSlot: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItem = {
        label: 'More Options',
        icon: 'lucide:more-horizontal',
        link: '/more',
      }
      return { menuItem }
    },
    template: `
      <MenuItem
        :menu-item="menuItem"
        expanded
      >
        <template #submenu="{ depth }">
          <MenuItem
            :menu-item="{ label: 'Custom Item 1', icon: 'lucide:star', link: '/more/custom1' }"
            :depth="depth"
            expanded
          />
          <MenuItem
            :menu-item="{ label: 'Custom Item 2', icon: 'lucide:heart', link: '/more/custom2' }"
            :depth="depth"
            expanded
          />
          <div class="px-9 py-2 text-xs text-white/30 uppercase tracking-wider">Section</div>
          <MenuItem
            :menu-item="{ label: 'Custom Item 3', icon: 'lucide:bookmark', link: '/more/custom3' }"
            :depth="depth"
            expanded
          />
        </template>
      </MenuItem>
    `,
  }),
}

export const MixedSlotAndChildren: Story = {
  render: () => ({
    components: { MenuItem },
    setup: () => {
      const menuItem = {
        label: 'Products',
        icon: 'lucide:package',
        link: '/products',
        children: [
          { label: 'All Products', icon: 'lucide:list', link: '/products/all' },
          { label: 'Categories', icon: 'lucide:tags', link: '/products/categories' },
        ],
      }
      return { menuItem }
    },
    template: `
      <MenuItem
        :menu-item="menuItem"
        expanded
      >
        <template #submenu="{ depth }">
          <div class="px-9 py-2 text-xs text-white/30 uppercase tracking-wider">Quick Actions</div>
          <MenuItem
            :menu-item="{ label: 'Add Product', icon: 'lucide:plus', link: '/products/add' }"
            :depth="depth"
            expanded
          />
        </template>
      </MenuItem>
    `,
  }),
}
