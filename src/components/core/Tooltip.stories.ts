import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from './Tooltip.vue'
import Button from './Button.vue'

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  args: {
    content: 'This is a tooltip',
    position: 'top',
    delay: 0,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip v-bind="args">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const Positions: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div class="flex flex-wrap items-center justify-center gap-8 p-20">
        <Tooltip content="Top tooltip" position="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Bottom tooltip" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Left tooltip" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const WithDelay: Story = {
  args: {
    content: 'This tooltip has a 500ms delay',
    delay: 500,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip v-bind="args">
          <Button>Hover me (500ms delay)</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    content: 'You should not see this',
    disabled: true,
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip v-bind="args">
          <Button>Tooltip disabled</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const OnIcons: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div class="flex items-center justify-center gap-4 p-20">
        <Tooltip content="Edit item">
          <Button variant="ghost" icon="lucide:edit" size="sm" />
        </Tooltip>
        <Tooltip content="Delete item">
          <Button variant="ghost" icon="lucide:trash" size="sm" />
        </Tooltip>
        <Tooltip content="Share item">
          <Button variant="ghost" icon="lucide:share" size="sm" />
        </Tooltip>
      </div>
    `,
  }),
}
