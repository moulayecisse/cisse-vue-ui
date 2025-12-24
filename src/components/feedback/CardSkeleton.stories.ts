import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CardSkeleton from './CardSkeleton.vue'

const meta: Meta<typeof CardSkeleton> = {
  title: 'Feedback/CardSkeleton',
  component: CardSkeleton,
  tags: ['autodocs'],
  argTypes: {
    showAvatar: { control: 'boolean' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
    showActions: { control: 'boolean' },
  },
  args: {
    showAvatar: false,
    lines: 3,
    showActions: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { CardSkeleton },
    setup: () => ({ args }),
    template: '<CardSkeleton v-bind="args" />',
  }),
}

export const WithAvatar: Story = {
  args: {
    showAvatar: true,
  },
  render: (args) => ({
    components: { CardSkeleton },
    setup: () => ({ args }),
    template: '<CardSkeleton v-bind="args" />',
  }),
}

export const WithActions: Story = {
  args: {
    showActions: true,
  },
  render: (args) => ({
    components: { CardSkeleton },
    setup: () => ({ args }),
    template: '<CardSkeleton v-bind="args" />',
  }),
}

export const Full: Story = {
  args: {
    showAvatar: true,
    lines: 4,
    showActions: true,
  },
  render: (args) => ({
    components: { CardSkeleton },
    setup: () => ({ args }),
    template: '<CardSkeleton v-bind="args" />',
  }),
}

export const SingleLine: Story = {
  args: {
    lines: 1,
  },
  render: (args) => ({
    components: { CardSkeleton },
    setup: () => ({ args }),
    template: '<CardSkeleton v-bind="args" />',
  }),
}

export const Grid: Story = {
  args: {
    showAvatar: true,
    showActions: true,
  },
  render: (args) => ({
    components: { CardSkeleton },
    setup: () => ({ args }),
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardSkeleton v-bind="args" />
        <CardSkeleton v-bind="args" />
        <CardSkeleton v-bind="args" />
      </div>
    `,
  }),
}
