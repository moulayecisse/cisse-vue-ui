import type { Meta, StoryObj } from '@storybook/vue3-vite'
import PageLayout from './PageLayout.vue'
import Button from '../core/Button.vue'
import CardComponent from '../core/CardComponent.vue'

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Page Title',
    description: 'A brief description of what this page contains.',
  },
  render: (args) => ({
    components: { PageLayout, CardComponent },
    setup: () => ({ args }),
    template: `
      <PageLayout v-bind="args">
        <CardComponent title="Content">
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">Page content goes here.</p>
          </div>
        </CardComponent>
      </PageLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PageLayout title="Page Title" description="A brief description of what this page contains.">
  <CardComponent title="Content">
    <p>Page content goes here.</p>
  </CardComponent>
</PageLayout>`,
      },
    },
  },
}

export const WithBreadcrumbs: Story = {
  args: {
    title: 'User Details',
    description: 'View and manage user information.',
    breadcrumbs: [
      { label: 'Home', link: '/' },
      { label: 'Users', link: '/users' },
      { label: 'John Doe', link: '/users/1' },
    ],
  },
  render: (args) => ({
    components: { PageLayout, CardComponent },
    setup: () => ({ args }),
    template: `
      <PageLayout v-bind="args">
        <CardComponent title="User Information">
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">User details would be displayed here.</p>
          </div>
        </CardComponent>
      </PageLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PageLayout
  title="User Details"
  description="View and manage user information."
  :breadcrumbs="[
    { label: 'Home', link: '/' },
    { label: 'Users', link: '/users' },
    { label: 'John Doe', link: '/users/1' },
  ]"
>
  <CardComponent title="User Information">
    <p>User details would be displayed here.</p>
  </CardComponent>
</PageLayout>`,
      },
    },
  },
}

export const WithActions: Story = {
  args: {
    title: 'Products',
    description: 'Manage your product catalog.',
    breadcrumbs: [
      { label: 'Dashboard', link: '/' },
      { label: 'Products', link: '/products' },
    ],
  },
  render: (args) => ({
    components: { PageLayout, Button, CardComponent },
    setup: () => ({ args }),
    template: `
      <PageLayout v-bind="args">
        <template #actions>
          <Button variant="outline" icon="lucide:download">Export</Button>
          <Button icon="lucide:plus">Add Product</Button>
        </template>
        <CardComponent>
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">Product list would be displayed here.</p>
          </div>
        </CardComponent>
      </PageLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PageLayout
  title="Products"
  description="Manage your product catalog."
  :breadcrumbs="[
    { label: 'Dashboard', link: '/' },
    { label: 'Products', link: '/products' },
  ]"
>
  <template #actions>
    <Button variant="outline" icon="lucide:download">Export</Button>
    <Button icon="lucide:plus">Add Product</Button>
  </template>

  <CardComponent>
    <p>Product list would be displayed here.</p>
  </CardComponent>
</PageLayout>`,
      },
    },
  },
}

export const TitleOnly: Story = {
  args: {
    title: 'Settings',
  },
  render: (args) => ({
    components: { PageLayout, CardComponent },
    setup: () => ({ args }),
    template: `
      <PageLayout v-bind="args">
        <CardComponent title="General Settings">
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">Settings content here.</p>
          </div>
        </CardComponent>
      </PageLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PageLayout title="Settings">
  <CardComponent title="General Settings">
    <p>Settings content here.</p>
  </CardComponent>
</PageLayout>`,
      },
    },
  },
}

export const Dashboard: Story = {
  args: {
    title: 'Dashboard',
    description: 'Welcome back! Here\'s what\'s happening today.',
  },
  render: (args) => ({
    components: { PageLayout, CardComponent },
    setup: () => ({ args }),
    template: `
      <PageLayout v-bind="args">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardComponent title="Total Users">
            <div class="p-5">
              <p class="text-3xl font-bold text-gray-900 dark:text-white">1,234</p>
              <p class="text-sm text-green-600">+12% from last month</p>
            </div>
          </CardComponent>
          <CardComponent title="Revenue">
            <div class="p-5">
              <p class="text-3xl font-bold text-gray-900 dark:text-white">$45,678</p>
              <p class="text-sm text-green-600">+8% from last month</p>
            </div>
          </CardComponent>
          <CardComponent title="Orders">
            <div class="p-5">
              <p class="text-3xl font-bold text-gray-900 dark:text-white">567</p>
              <p class="text-sm text-red-600">-3% from last month</p>
            </div>
          </CardComponent>
        </div>
      </PageLayout>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PageLayout title="Dashboard" description="Welcome back! Here's what's happening today.">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <CardComponent title="Total Users">
      <p class="text-3xl font-bold">1,234</p>
      <p class="text-sm text-green-600">+12% from last month</p>
    </CardComponent>
    <CardComponent title="Revenue">
      <p class="text-3xl font-bold">$45,678</p>
      <p class="text-sm text-green-600">+8% from last month</p>
    </CardComponent>
    <CardComponent title="Orders">
      <p class="text-3xl font-bold">567</p>
      <p class="text-sm text-red-600">-3% from last month</p>
    </CardComponent>
  </div>
</PageLayout>`,
      },
    },
  },
}
