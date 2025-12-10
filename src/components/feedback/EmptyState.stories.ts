import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EmptyState from './EmptyState.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    icon: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: '<EmptyState v-bind="args" />',
  }),
}

export const WithTitle: Story = {
  args: {
    title: 'No items found',
    message: 'Try adjusting your search or filter to find what you\'re looking for.',
  },
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: '<EmptyState v-bind="args" />',
  }),
}

export const CustomIcon: Story = {
  args: {
    title: 'No notifications',
    message: 'You\'re all caught up!',
    icon: 'lucide:bell-off',
  },
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: '<EmptyState v-bind="args" />',
  }),
}

export const WithAction: Story = {
  args: {
    title: 'No projects yet',
    message: 'Get started by creating your first project.',
    icon: 'lucide:folder-plus',
  },
  render: (args) => ({
    components: { EmptyState, Button },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <template #action>
          <Button icon="lucide:plus">Create Project</Button>
        </template>
      </EmptyState>
    `,
  }),
}

export const SearchResults: Story = {
  args: {
    title: 'No results found',
    message: 'We couldn\'t find anything matching your search. Try different keywords.',
    icon: 'lucide:search-x',
  },
  render: (args) => ({
    components: { EmptyState, Button },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <template #action>
          <Button variant="outline">Clear Search</Button>
        </template>
      </EmptyState>
    `,
  }),
}

export const ErrorState: Story = {
  args: {
    title: 'Something went wrong',
    message: 'We encountered an error while loading the data.',
    icon: 'lucide:alert-circle',
  },
  render: (args) => ({
    components: { EmptyState, Button },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <template #action>
          <Button variant="outline" icon="lucide:refresh-cw">Try Again</Button>
        </template>
      </EmptyState>
    `,
  }),
}

export const InCard: Story = {
  args: {
    title: 'No messages',
    message: 'Your inbox is empty.',
    icon: 'lucide:mail',
  },
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args }),
    template: `
      <div class="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <EmptyState v-bind="args" />
      </div>
    `,
  }),
}

export const CustomSlotContent: Story = {
  args: {
    title: 'Welcome!',
    icon: 'lucide:rocket',
  },
  render: (args) => ({
    components: { EmptyState, Button },
    setup: () => ({ args }),
    template: `
      <EmptyState v-bind="args">
        <span>This is custom content passed through the default slot. You can add any content here.</span>
        <template #action>
          <div class="flex gap-2">
            <Button variant="outline">Learn More</Button>
            <Button>Get Started</Button>
          </div>
        </template>
      </EmptyState>
    `,
  }),
}
