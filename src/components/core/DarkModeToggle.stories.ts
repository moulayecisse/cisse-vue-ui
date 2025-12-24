import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DarkModeToggle from './DarkModeToggle.vue'

const meta: Meta<typeof DarkModeToggle> = {
  title: 'Core/DarkModeToggle',
  component: DarkModeToggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  decorators: [
    () => ({
      template: '<div class="p-4"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof DarkModeToggle>

export const Default: Story = {
  args: {},
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const WithLabel: Story = {
  args: {
    showLabel: true,
  },
}

export const WithLabelSmall: Story = {
  args: {
    size: 'sm',
    showLabel: true,
  },
}

export const WithLabelLarge: Story = {
  args: {
    size: 'lg',
    showLabel: true,
  },
}

export const CustomIcons: Story = {
  args: {
    lightIcon: 'lucide:sunrise',
    darkIcon: 'lucide:sunset',
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { DarkModeToggle },
    template: `
      <div class="flex items-center gap-4">
        <DarkModeToggle size="sm" />
        <DarkModeToggle size="md" />
        <DarkModeToggle size="lg" />
      </div>
    `,
  }),
}

export const AllSizesWithLabel: Story = {
  render: () => ({
    components: { DarkModeToggle },
    template: `
      <div class="flex items-center gap-4">
        <DarkModeToggle size="sm" showLabel />
        <DarkModeToggle size="md" showLabel />
        <DarkModeToggle size="lg" showLabel />
      </div>
    `,
  }),
}
