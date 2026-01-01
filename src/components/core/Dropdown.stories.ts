import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Dropdown from './Dropdown.vue'
import Button from './Button.vue'

const meta: Meta<typeof Dropdown> = {
  title: 'Core/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
    width: {
      control: 'select',
      options: ['auto', 'full', 'sm', 'md', 'lg'],
    },
    teleport: { control: 'boolean' },
  },
  args: {
    align: 'left',
    width: 'auto',
    teleport: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultItems = [
  { key: 'edit', label: 'Edit', icon: 'lucide:edit' },
  { key: 'duplicate', label: 'Duplicate', icon: 'lucide:copy' },
  { key: 'divider1', label: '', divider: true },
  { key: 'archive', label: 'Archive', icon: 'lucide:archive' },
  { key: 'delete', label: 'Delete', icon: 'lucide:trash', danger: true },
]

export const Default: Story = {
  args: {
    items: defaultItems,
  },
  render: (args) => ({
    components: { Dropdown },
    setup: () => ({ args }),
    template: '<Dropdown v-bind="args" />',
  }),
}

export const WithCustomTrigger: Story = {
  args: {
    items: defaultItems,
  },
  render: (args) => ({
    components: { Dropdown, Button },
    setup: () => ({ args }),
    template: `
      <Dropdown v-bind="args">
        <template #trigger>
          <Button icon="lucide:more-vertical" variant="ghost" size="sm" />
        </template>
      </Dropdown>
    `,
  }),
}

export const AlignRight: Story = {
  args: {
    items: defaultItems,
    align: 'right',
  },
  render: (args) => ({
    components: { Dropdown },
    setup: () => ({ args }),
    template: `
      <div class="flex justify-end">
        <Dropdown v-bind="args" />
      </div>
    `,
  }),
}

export const WithDisabledItems: Story = {
  args: {
    items: [
      { key: 'edit', label: 'Edit', icon: 'lucide:edit' },
      { key: 'share', label: 'Share', icon: 'lucide:share', disabled: true },
      { key: 'delete', label: 'Delete', icon: 'lucide:trash', danger: true },
    ],
  },
  render: (args) => ({
    components: { Dropdown },
    setup: () => ({ args }),
    template: '<Dropdown v-bind="args" />',
  }),
}

export const DifferentWidths: Story = {
  render: () => ({
    components: { Dropdown },
    setup: () => ({
      items: [
        { key: 'item1', label: 'Item 1' },
        { key: 'item2', label: 'Item 2' },
      ],
    }),
    template: `
      <div class="flex gap-4">
        <Dropdown :items="items" width="sm">
          <template #trigger-label>Small</template>
        </Dropdown>
        <Dropdown :items="items" width="md">
          <template #trigger-label>Medium</template>
        </Dropdown>
        <Dropdown :items="items" width="lg">
          <template #trigger-label>Large</template>
        </Dropdown>
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: () => ({
    components: { Dropdown, Button },
    template: `
      <Dropdown>
        <template #trigger>
          <Button>User Menu</Button>
        </template>
        <template #default="{ close }">
          <div class="p-4">
            <div class="mb-3 text-center">
              <div class="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">JD</div>
              <p class="font-medium text-gray-900 dark:text-gray-100">John Doe</p>
              <p class="text-sm text-gray-500">john@example.com</p>
            </div>
            <div class="border-t border-gray-200 pt-3 dark:border-gray-700">
              <Button variant="outline" size="sm" block @click="close">Sign Out</Button>
            </div>
          </div>
        </template>
      </Dropdown>
    `,
  }),
}
