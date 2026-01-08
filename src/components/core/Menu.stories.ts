import type { Meta, StoryObj } from '@storybook/vue3'
import Menu from './Menu.vue'
import MenuItem from './MenuItem.vue'

const meta: Meta<typeof Menu> = {
  title: 'Core/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'pills'],
      description: 'Visual style variant',
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Gap between menu items',
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether menu is in collapsed/icon-only mode',
    },
  },
}

export default meta
type Story = StoryObj<typeof Menu>

const sampleMenuItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/' },
  { label: 'Users', icon: 'lucide:users', link: '/users' },
  { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
  {
    label: 'Reports',
    icon: 'lucide:bar-chart',
    link: '/reports',
    children: [
      { label: 'Sales', icon: 'lucide:dollar-sign', link: '/reports/sales' },
      { label: 'Analytics', icon: 'lucide:activity', link: '/reports/analytics' },
    ],
  },
]

export const Default: Story = {
  render: (args) => ({
    components: { Menu, MenuItem },
    setup() {
      return { args, sampleMenuItems }
    },
    template: `
      <div class="w-64 bg-slate-800 p-4 rounded-lg">
        <Menu v-bind="args">
          <MenuItem
            v-for="(item, index) in sampleMenuItems"
            :key="index"
            :menu-item="item"
            :expanded="true"
          />
        </Menu>
      </div>
    `,
  }),
}

export const WithGapSm: Story = {
  args: {
    gap: 'sm',
  },
  render: (args) => ({
    components: { Menu, MenuItem },
    setup() {
      return { args, sampleMenuItems }
    },
    template: `
      <div class="w-64 bg-slate-800 p-4 rounded-lg">
        <Menu v-bind="args">
          <MenuItem
            v-for="(item, index) in sampleMenuItems"
            :key="index"
            :menu-item="item"
            :expanded="true"
          />
        </Menu>
      </div>
    `,
  }),
}

export const WithGapMd: Story = {
  args: {
    gap: 'md',
  },
  render: (args) => ({
    components: { Menu, MenuItem },
    setup() {
      return { args, sampleMenuItems }
    },
    template: `
      <div class="w-64 bg-slate-800 p-4 rounded-lg">
        <Menu v-bind="args">
          <MenuItem
            v-for="(item, index) in sampleMenuItems"
            :key="index"
            :menu-item="item"
            :expanded="true"
          />
        </Menu>
      </div>
    `,
  }),
}

export const WithGapLg: Story = {
  args: {
    gap: 'lg',
  },
  render: (args) => ({
    components: { Menu, MenuItem },
    setup() {
      return { args, sampleMenuItems }
    },
    template: `
      <div class="w-64 bg-slate-800 p-4 rounded-lg">
        <Menu v-bind="args">
          <MenuItem
            v-for="(item, index) in sampleMenuItems"
            :key="index"
            :menu-item="item"
            :expanded="true"
          />
        </Menu>
      </div>
    `,
  }),
}

export const CollapsedMode: Story = {
  args: {
    collapsed: true,
  },
  render: (args) => ({
    components: { Menu, MenuItem },
    setup() {
      return { args, sampleMenuItems }
    },
    template: `
      <div class="w-20 bg-slate-800 p-4 rounded-lg">
        <Menu v-bind="args">
          <MenuItem
            v-for="(item, index) in sampleMenuItems"
            :key="index"
            :menu-item="item"
            :expanded="false"
          />
        </Menu>
      </div>
    `,
  }),
}

export const WithSubmenus: Story = {
  render: () => ({
    components: { Menu, MenuItem },
    setup() {
      const menuItems = [
        { label: 'Home', icon: 'lucide:home', link: '/' },
        {
          label: 'Products',
          icon: 'lucide:package',
          link: '/products',
          children: [
            { label: 'All Products', icon: 'lucide:list', link: '/products/all' },
            { label: 'Categories', icon: 'lucide:folder', link: '/products/categories' },
            { label: 'Inventory', icon: 'lucide:archive', link: '/products/inventory' },
          ],
        },
        {
          label: 'Orders',
          icon: 'lucide:shopping-cart',
          link: '/orders',
          children: [
            { label: 'Pending', icon: 'lucide:clock', link: '/orders/pending' },
            { label: 'Completed', icon: 'lucide:check-circle', link: '/orders/completed' },
          ],
        },
        { label: 'Customers', icon: 'lucide:users', link: '/customers' },
      ]
      return { menuItems }
    },
    template: `
      <div class="w-64 bg-slate-800 p-4 rounded-lg">
        <Menu gap="sm">
          <MenuItem
            v-for="(item, index) in menuItems"
            :key="index"
            :menu-item="item"
            :expanded="true"
          />
        </Menu>
      </div>
    `,
  }),
}
