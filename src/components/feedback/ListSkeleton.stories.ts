import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ListSkeleton from './ListSkeleton.vue'

const meta: Meta<typeof ListSkeleton> = {
  title: 'Feedback/ListSkeleton',
  component: ListSkeleton,
  tags: ['autodocs'],
  argTypes: {
    items: { control: { type: 'number', min: 1, max: 20 } },
    showAvatar: { control: 'boolean' },
    showSecondary: { control: 'boolean' },
    showAction: { control: 'boolean' },
  },
  args: {
    items: 5,
    showAvatar: true,
    showSecondary: true,
    showAction: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: '<ListSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ListSkeleton />`,
      },
    },
  },
}

export const WithActions: Story = {
  args: {
    showAction: true,
  },
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: '<ListSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ListSkeleton show-action />`,
      },
    },
  },
}

export const NoAvatar: Story = {
  args: {
    showAvatar: false,
  },
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: '<ListSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ListSkeleton :show-avatar="false" />`,
      },
    },
  },
}

export const SimpleList: Story = {
  args: {
    showAvatar: false,
    showSecondary: false,
  },
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: '<ListSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ListSkeleton :show-avatar="false" :show-secondary="false" />`,
      },
    },
  },
}

export const ThreeItems: Story = {
  args: {
    items: 3,
  },
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: '<ListSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ListSkeleton :items="3" />`,
      },
    },
  },
}

export const FullFeatured: Story = {
  args: {
    items: 5,
    showAvatar: true,
    showSecondary: true,
    showAction: true,
  },
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: '<ListSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ListSkeleton
  :items="5"
  show-avatar
  show-secondary
  show-action
/>`,
      },
    },
  },
}

export const InCard: Story = {
  args: {
    items: 4,
    showAvatar: true,
  },
  render: (args) => ({
    components: { ListSkeleton },
    setup: () => ({ args }),
    template: `
      <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <ListSkeleton v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <ListSkeleton :items="4" show-avatar />
</Card>`,
      },
    },
  },
}
