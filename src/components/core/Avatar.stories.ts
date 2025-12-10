import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Avatar from './Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
    },
    rounded: {
      control: 'select',
      options: ['full', 'lg', 'md'],
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
  },
  args: {
    size: 'md',
    rounded: 'full',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
}

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-end gap-4">
        <Avatar size="xs" name="XS" />
        <Avatar size="sm" name="SM" />
        <Avatar size="md" name="MD" />
        <Avatar size="lg" name="LG" />
        <Avatar size="xl" name="XL" />
        <Avatar size="2xl" name="2X" />
      </div>
    `,
  }),
}

export const WithStatus: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Online" status="online" />
        <Avatar name="Offline" status="offline" />
        <Avatar name="Away" status="away" />
        <Avatar name="Busy" status="busy" />
      </div>
    `,
  }),
}

export const RoundedVariants: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Full" rounded="full" />
        <Avatar name="Large" rounded="lg" />
        <Avatar name="Medium" rounded="md" />
      </div>
    `,
  }),
}

export const ImageWithStatus: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    status: 'online',
    size: 'lg',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
}
