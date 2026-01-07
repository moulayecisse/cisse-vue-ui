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

export const AllPositions: Story = {
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div class="flex flex-wrap items-center justify-center gap-12 p-20">
        <Tooltip content="Top position" position="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Bottom position" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Left position" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Right position" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tooltip content="Top" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip content="Bottom" position="bottom">
  <Button>Bottom</Button>
</Tooltip>
<Tooltip content="Left" position="left">
  <Button>Left</Button>
</Tooltip>
<Tooltip content="Right" position="right">
  <Button>Right</Button>
</Tooltip>`,
      },
    },
  },
}

export const LongContent: Story = {
  args: {
    content: 'This is a longer tooltip content that explains something in more detail.',
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip v-bind="args">
          <Button>Hover for details</Button>
        </Tooltip>
      </div>
    `,
  }),
}

export const OnText: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex items-center justify-center p-20">
        <Tooltip content="Quickly access your settings" position="bottom">
          <span class="cursor-help text-blue-600 underline">Click here for help</span>
        </Tooltip>
      </div>
    `,
  }),
}

