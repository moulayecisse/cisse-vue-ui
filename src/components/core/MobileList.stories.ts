import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import MobileList from './MobileList.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import StatusBadge from './StatusBadge.vue'

const meta: Meta<typeof MobileList> = {
  title: 'Core/MobileList',
  component: MobileList,
  tags: ['autodocs'],
  argTypes: {
    keyField: { control: 'text' },
    selectable: { control: 'boolean' },
  },
  args: {
    keyField: 'id',
    selectable: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'active' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { MobileList },
    setup: () => ({ args }),
    template: `
      <MobileList v-bind="args">
        <template #content="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
      </MobileList>
    `,
  }),
}

export const WithAvatar: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { MobileList, Avatar },
    setup: () => ({ args }),
    template: `
      <MobileList v-bind="args">
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #content="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
      </MobileList>
    `,
  }),
}

export const WithActions: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { MobileList, Avatar, Button },
    setup: () => ({ args }),
    template: `
      <MobileList v-bind="args">
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #content="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.role }}</div>
        </template>
        <template #actions="{ item }">
          <Button size="sm" variant="ghost" icon="heroicons:pencil" />
        </template>
      </MobileList>
    `,
  }),
}

export const Selectable: Story = {
  args: {
    items: sampleItems,
    selectable: true,
  },
  render: (args) => ({
    components: { MobileList, Avatar },
    setup: () => {
      const selectedItems = ref(new Set<string>())
      const handleSelect = (id: string) => {
        if (selectedItems.value.has(id)) {
          selectedItems.value.delete(id)
        } else {
          selectedItems.value.add(id)
        }
        selectedItems.value = new Set(selectedItems.value)
      }
      const handleSelectAll = () => {
        if (selectedItems.value.size === args.items.length) {
          selectedItems.value.clear()
        } else {
          selectedItems.value = new Set(args.items.map((i: { id: number | string }) => String(i.id)))
        }
        selectedItems.value = new Set(selectedItems.value)
      }
      return { args, selectedItems, handleSelect, handleSelectAll }
    },
    template: `
      <MobileList
        v-bind="args"
        :selected-items="selectedItems"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #content="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
      </MobileList>
    `,
  }),
}

export const WithStatusBadge: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { MobileList, Avatar, StatusBadge },
    setup: () => ({ args }),
    template: `
      <MobileList v-bind="args">
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #content="{ item }">
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-900 dark:text-white">{{ item.name }}</span>
            <StatusBadge :status="item.status" />
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.role }}</div>
        </template>
      </MobileList>
    `,
  }),
}

export const Empty: Story = {
  args: {
    items: [],
  },
  render: (args) => ({
    components: { MobileList },
    setup: () => ({ args }),
    template: `
      <MobileList v-bind="args">
        <template #content="{ item }">
          <div>{{ item.name }}</div>
        </template>
        <template #empty>
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            No items to display
          </div>
        </template>
      </MobileList>
    `,
  }),
}
