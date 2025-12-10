import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CollapsibleCard from './CollapsibleCard.vue'
import Button from './Button.vue'

const meta: Meta<typeof CollapsibleCard> = {
  title: 'Core/CollapsibleCard',
  component: CollapsibleCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    defaultExpanded: { control: 'boolean' },
  },
  args: {
    defaultExpanded: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Collapsible Section',
    description: 'Click the chevron to toggle',
  },
  render: (args) => ({
    components: { CollapsibleCard },
    setup: () => ({ args }),
    template: `
      <CollapsibleCard v-bind="args">
        <p class="text-gray-600 dark:text-gray-400">
          This content can be collapsed or expanded by clicking the chevron icon in the header.
          It's useful for organizing content that doesn't need to be visible all the time.
        </p>
      </CollapsibleCard>
    `,
  }),
}

export const InitiallyCollapsed: Story = {
  args: {
    title: 'Initially Collapsed',
    description: 'This section starts collapsed',
    defaultExpanded: false,
  },
  render: (args) => ({
    components: { CollapsibleCard },
    setup: () => ({ args }),
    template: `
      <CollapsibleCard v-bind="args">
        <p class="text-gray-600 dark:text-gray-400">
          This content was hidden initially. Click the chevron to reveal it.
        </p>
      </CollapsibleCard>
    `,
  }),
}

export const WithActions: Story = {
  args: {
    title: 'Settings',
    description: 'Application settings',
  },
  render: (args) => ({
    components: { CollapsibleCard, Button },
    setup: () => ({ args }),
    template: `
      <CollapsibleCard v-bind="args">
        <template #actions>
          <Button size="sm" variant="outline">Reset</Button>
        </template>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Enable notifications</span>
            <input type="checkbox" class="rounded" />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-gray-700 dark:text-gray-300">Dark mode</span>
            <input type="checkbox" class="rounded" />
          </div>
        </div>
      </CollapsibleCard>
    `,
  }),
}

export const MultipleCards: Story = {
  render: () => ({
    components: { CollapsibleCard },
    template: `
      <div class="space-y-4">
        <CollapsibleCard title="Section 1" description="First section">
          <p class="text-gray-600 dark:text-gray-400">Content for section 1</p>
        </CollapsibleCard>
        <CollapsibleCard title="Section 2" description="Second section" :default-expanded="false">
          <p class="text-gray-600 dark:text-gray-400">Content for section 2</p>
        </CollapsibleCard>
        <CollapsibleCard title="Section 3" description="Third section" :default-expanded="false">
          <p class="text-gray-600 dark:text-gray-400">Content for section 3</p>
        </CollapsibleCard>
      </div>
    `,
  }),
}

export const LongContent: Story = {
  args: {
    title: 'Long Content Section',
  },
  render: (args) => ({
    components: { CollapsibleCard },
    setup: () => ({ args }),
    template: `
      <CollapsibleCard v-bind="args">
        <div class="space-y-4 text-gray-600 dark:text-gray-400">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </CollapsibleCard>
    `,
  }),
}
