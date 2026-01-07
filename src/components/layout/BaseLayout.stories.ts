import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import BaseLayout from './BaseLayout.vue'
import PageLayout from './PageLayout.vue'
import CardComponent from '../core/CardComponent.vue'

const meta: Meta<typeof BaseLayout> = {
  title: 'Layout/BaseLayout',
  component: BaseLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    appName: { control: 'text' },
    appIcon: { control: 'text' },
    showDarkToggle: { control: 'boolean' },
    userName: { control: 'text' },
    userAvatar: { control: 'text' },
    menuPosition: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
  },
  args: {
    appName: 'My App',
    appIcon: 'lucide:box',
    showDarkToggle: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

const menuItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/dashboard' },
  { label: 'Users', icon: 'lucide:users', link: '/users' },
  { label: 'Products', icon: 'lucide:package', link: '/products' },
  { label: 'Orders', icon: 'lucide:shopping-cart', link: '/orders' },
  { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
]

const nestedMenuItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/dashboard' },
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
      { label: 'Add Product', icon: 'lucide:plus', link: '/products/add' },
    ],
  },
  { label: 'Orders', icon: 'lucide:shopping-cart', link: '/orders' },
  {
    label: 'Settings',
    icon: 'lucide:settings',
    link: '/settings',
    children: [
      { label: 'General', icon: 'lucide:sliders', link: '/settings/general' },
      { label: 'Security', icon: 'lucide:lock', link: '/settings/security' },
      { label: 'Notifications', icon: 'lucide:bell', link: '/settings/notifications' },
    ],
  },
]

const userMenuItems = [
  { label: 'Profile', icon: 'lucide:user', link: '/profile' },
  { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
  { label: 'Logout', icon: 'lucide:log-out', action: () => console.log('Logout') },
]

export const Default: Story = {
  args: {
    menuItems,
    currentPath: '/dashboard',
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(true)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="Dashboard" description="Welcome to your dashboard">
          <CardComponent title="Overview">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">Dashboard content goes here.</p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(true)
const dark = ref(false)
const menuItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/dashboard' },
  { label: 'Users', icon: 'lucide:users', link: '/users' },
  { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
]
</script>

<template>
  <BaseLayout
    app-name="My App"
    app-icon="lucide:box"
    :menu-items="menuItems"
    current-path="/dashboard"
    :show-dark-toggle="true"
    v-model:sidebar-open="sidebarOpen"
    v-model:dark="dark"
  >
    <PageLayout title="Dashboard" description="Welcome to your dashboard">
      <CardComponent title="Overview">
        <p>Dashboard content goes here.</p>
      </CardComponent>
    </PageLayout>
  </BaseLayout>
</template>`,
      },
    },
  },
}

export const WithUser: Story = {
  args: {
    menuItems,
    currentPath: '/dashboard',
    userName: 'John Doe',
    userAvatar: 'JD',
    userMenuItems,
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(true)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="Dashboard" description="Welcome back, John!">
          <CardComponent title="Your Activity">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">Recent activity would be shown here.</p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<BaseLayout
  app-name="My App"
  :menu-items="menuItems"
  current-path="/dashboard"
  user-name="John Doe"
  user-avatar="JD"
  :user-menu-items="userMenuItems"
  v-model:sidebar-open="sidebarOpen"
  v-model:dark="dark"
>
  <PageLayout title="Dashboard" description="Welcome back, John!">
    <CardComponent title="Your Activity">
      <p>Recent activity would be shown here.</p>
    </CardComponent>
  </PageLayout>
</BaseLayout>`,
      },
    },
  },
}

export const CollapsedSidebar: Story = {
  args: {
    menuItems,
    currentPath: '/users',
    sidebarOpen: false,
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(false)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="Users" description="Manage your users">
          <CardComponent title="User List">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">User management content.</p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<script setup>
const sidebarOpen = ref(false) // Start collapsed
</script>

<template>
  <BaseLayout
    :menu-items="menuItems"
    current-path="/users"
    v-model:sidebar-open="sidebarOpen"
  >
    <PageLayout title="Users" description="Manage your users">
      <CardComponent title="User List">
        <p>User management content.</p>
      </CardComponent>
    </PageLayout>
  </BaseLayout>
</template>`,
      },
    },
  },
}

export const CustomBranding: Story = {
  args: {
    menuItems,
    currentPath: '/dashboard',
    appName: 'Acme Inc',
    appIcon: 'lucide:rocket',
    sidebarClass: 'bg-indigo-900 dark:bg-indigo-950',
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(true)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="Dashboard">
          <CardComponent title="Welcome to Acme">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">Custom branded layout.</p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<BaseLayout
  app-name="Acme Inc"
  app-icon="lucide:rocket"
  sidebar-class="bg-indigo-900 dark:bg-indigo-950"
  :menu-items="menuItems"
  current-path="/dashboard"
>
  <PageLayout title="Dashboard">
    <CardComponent title="Welcome to Acme">
      <p>Custom branded layout.</p>
    </CardComponent>
  </PageLayout>
</BaseLayout>`,
      },
    },
  },
}

export const MenuPositionCenter: Story = {
  args: {
    menuItems,
    currentPath: '/dashboard',
    menuPosition: 'center',
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(true)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="Dashboard" description="Menu is vertically centered in sidebar">
          <CardComponent title="Center Menu Position">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">The menu items are vertically centered in the sidebar.</p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<BaseLayout
  :menu-items="menuItems"
  current-path="/dashboard"
  menu-position="center"
>
  <PageLayout title="Dashboard">
    <p>Content here...</p>
  </PageLayout>
</BaseLayout>`,
      },
    },
  },
}

export const MenuPositionBottom: Story = {
  args: {
    menuItems,
    currentPath: '/dashboard',
    menuPosition: 'bottom',
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(true)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="Dashboard" description="Menu is aligned to the bottom of sidebar">
          <CardComponent title="Bottom Menu Position">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">The menu items are aligned to the bottom of the sidebar.</p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<BaseLayout
  :menu-items="menuItems"
  current-path="/dashboard"
  menu-position="bottom"
>
  <PageLayout title="Dashboard">
    <p>Content here...</p>
  </PageLayout>
</BaseLayout>`,
      },
    },
  },
}

export const WithNestedMenu: Story = {
  args: {
    menuItems: nestedMenuItems,
    currentPath: '/users/all',
    userName: 'John Doe',
    userAvatar: 'JD',
    userMenuItems,
  },
  render: (args) => ({
    components: { BaseLayout, PageLayout, CardComponent },
    setup: () => {
      const sidebarOpen = ref(true)
      const dark = ref(false)
      return { args, sidebarOpen, dark }
    },
    template: `
      <BaseLayout
        v-bind="args"
        v-model:sidebar-open="sidebarOpen"
        v-model:dark="dark"
      >
        <PageLayout title="All Users" description="Click on menu items with arrows to expand submenus">
          <CardComponent title="Nested Menu Navigation">
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">
                This layout demonstrates nested menu items. Click on Users, Products, or Settings
                to expand their submenus. The parent item is highlighted when any child is active.
              </p>
            </div>
          </CardComponent>
        </PageLayout>
      </BaseLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<script setup>
const menuItems = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', link: '/dashboard' },
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
  { label: 'Settings', icon: 'lucide:settings', link: '/settings' },
]
</script>

<template>
  <BaseLayout
    :menu-items="menuItems"
    current-path="/users/all"
    user-name="John Doe"
    user-avatar="JD"
  >
    <PageLayout title="All Users">
      <p>Content here...</p>
    </PageLayout>
  </BaseLayout>
</template>`,
      },
    },
  },
}
