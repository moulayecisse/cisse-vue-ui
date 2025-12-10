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
}
