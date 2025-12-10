import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
    icon: { control: 'text' },
    iconRight: { control: 'text' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Outline Button</Button>',
  }),
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Ghost Button</Button>',
  }),
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Danger Button</Button>',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Success Button</Button>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    icon: 'lucide:plus',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Add Item</Button>',
  }),
}

export const WithIconRight: Story = {
  args: {
    iconRight: 'lucide:arrow-right',
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Continue</Button>',
  }),
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Loading...</Button>',
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Disabled</Button>',
  }),
}

export const FullWidth: Story = {
  args: {
    block: true,
  },
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Full Width Button</Button>',
  }),
}
