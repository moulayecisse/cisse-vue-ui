import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Popover from './Popover.vue'
import Button from './Button.vue'

const meta: Meta<typeof Popover> = {
  title: 'Core/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    hover: { control: 'boolean' },
    width: {
      control: 'select',
      options: ['auto', 'sm', 'md', 'lg'],
    },
  },
  args: {
    position: 'bottom',
    hover: false,
    width: 'auto',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover v-bind="args">
          <template #trigger>
            <Button>Click me</Button>
          </template>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Popover Title</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">This is some popover content. You can put anything here.</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const OnHover: Story = {
  args: {
    hover: true,
  },
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args }),
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover v-bind="args">
          <template #trigger>
            <Button variant="outline">Hover me</Button>
          </template>
          <p class="text-sm text-gray-600 dark:text-gray-400">This popover appears on hover.</p>
        </Popover>
      </div>
    `,
  }),
}

export const Widths: Story = {
  render: () => ({
    components: { Popover, Button },
    template: `
      <div class="flex flex-wrap items-center justify-center gap-4 p-20">
        <Popover width="sm">
          <template #trigger>
            <Button variant="outline" size="sm">Small</Button>
          </template>
          <p class="text-sm">Small width popover</p>
        </Popover>
        <Popover width="md">
          <template #trigger>
            <Button variant="outline" size="sm">Medium</Button>
          </template>
          <p class="text-sm">Medium width popover with more content</p>
        </Popover>
        <Popover width="lg">
          <template #trigger>
            <Button variant="outline" size="sm">Large</Button>
          </template>
          <p class="text-sm">Large width popover with even more content to display</p>
        </Popover>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  render: () => ({
    components: { Popover, Button },
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover width="md">
          <template #trigger>
            <Button>Edit Settings</Button>
          </template>
          <template #default="{ close }">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Quick Settings</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input type="text" class="w-full rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700" placeholder="Enter name" />
              </div>
              <div class="flex justify-end gap-2">
                <Button variant="ghost" size="sm" @click="close">Cancel</Button>
                <Button size="sm" @click="close">Save</Button>
              </div>
            </div>
          </template>
        </Popover>
      </div>
    `,
  }),
}

export const UserCard: Story = {
  render: () => ({
    components: { Popover, Button },
    template: `
      <div class="flex items-center justify-center p-20">
        <Popover hover width="sm">
          <template #trigger>
            <div class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white font-medium">
              JD
            </div>
          </template>
          <div class="text-center">
            <div class="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-medium">
              JD
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">John Doe</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
            <p class="mt-2 text-xs text-gray-400">Last seen 2 hours ago</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}
