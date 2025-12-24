import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ResponsiveList from './ResponsiveList.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import StatusBadge from './StatusBadge.vue'

const meta: Meta<typeof ResponsiveList> = {
  title: 'Core/ResponsiveList',
  component: ResponsiveList,
  tags: ['autodocs'],
  argTypes: {
    keyField: { control: 'text' },
    selectable: { control: 'boolean' },
    breakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
  args: {
    keyField: 'id',
    selectable: false,
    breakpoint: 'lg',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'active', joinDate: '2024-02-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'inactive', joinDate: '2024-03-10' },
  { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'active', joinDate: '2024-04-05' },
]

const defaultColumns = [
  { key: 'name', label: 'Name', main: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
    columns: defaultColumns,
  },
  render: (args) => ({
    components: { ResponsiveList },
    setup: () => ({ args }),
    template: `
      <ResponsiveList v-bind="args">
        <template #mobileContent="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
      </ResponsiveList>
    `,
  }),
}

export const WithAvatar: Story = {
  args: {
    items: sampleItems,
    columns: defaultColumns,
  },
  render: (args) => ({
    components: { ResponsiveList, Avatar },
    setup: () => ({ args }),
    template: `
      <ResponsiveList v-bind="args">
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #mobileContent="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
        <template #cell-name="{ item }">
          <div class="flex items-center gap-3">
            <Avatar :name="item.name" size="sm" />
            <span>{{ item.name }}</span>
          </div>
        </template>
      </ResponsiveList>
    `,
  }),
}

export const WithStatusBadge: Story = {
  args: {
    items: sampleItems,
    columns: defaultColumns,
  },
  render: (args) => ({
    components: { ResponsiveList, Avatar, StatusBadge },
    setup: () => ({ args }),
    template: `
      <ResponsiveList v-bind="args">
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #mobileContent="{ item }">
          <div class="flex items-center gap-2">
            <span class="font-medium text-gray-900 dark:text-white">{{ item.name }}</span>
            <StatusBadge :status="item.status" />
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.role }}</div>
        </template>
        <template #cell-status="{ item }">
          <StatusBadge :status="item.status" />
        </template>
      </ResponsiveList>
    `,
  }),
}

export const WithActions: Story = {
  args: {
    items: sampleItems,
    columns: defaultColumns,
  },
  render: (args) => ({
    components: { ResponsiveList, Avatar, Button },
    setup: () => ({ args }),
    template: `
      <ResponsiveList v-bind="args">
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #mobileContent="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
        <template #actions="{ item }">
          <div class="flex gap-1">
            <Button size="sm" variant="ghost" icon="heroicons:pencil" />
            <Button size="sm" variant="ghost" icon="heroicons:trash" />
          </div>
        </template>
      </ResponsiveList>
    `,
  }),
}

export const Selectable: Story = {
  args: {
    items: sampleItems,
    columns: defaultColumns,
    selectable: true,
  },
  render: (args) => ({
    components: { ResponsiveList, Avatar },
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
      <ResponsiveList
        v-bind="args"
        :selected-items="selectedItems"
        @select="handleSelect"
        @select-all="handleSelectAll"
      >
        <template #avatar="{ item }">
          <Avatar :name="item.name" size="md" />
        </template>
        <template #mobileContent="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
      </ResponsiveList>
    `,
  }),
}

export const SortableColumns: Story = {
  args: {
    items: sampleItems,
    columns: [
      { key: 'name', label: 'Name', main: true, sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'status', label: 'Status' },
    ],
  },
  render: (args) => ({
    components: { ResponsiveList },
    setup: () => {
      const sortBy = ref('name')
      const sortDirection = ref<'asc' | 'desc'>('asc')
      const handleSort = (column: string, direction: 'asc' | 'desc') => {
        sortBy.value = column
        sortDirection.value = direction
      }
      return { args, sortBy, sortDirection, handleSort }
    },
    template: `
      <ResponsiveList
        v-bind="args"
        :sort-by="sortBy"
        :sort-direction="sortDirection"
        @sort="handleSort"
      >
        <template #mobileContent="{ item }">
          <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
        </template>
      </ResponsiveList>
    `,
  }),
}

export const CustomBreakpoint: Story = {
  args: {
    items: sampleItems,
    columns: defaultColumns,
    breakpoint: 'md',
  },
  render: (args) => ({
    components: { ResponsiveList },
    setup: () => ({ args }),
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-500">Breakpoint set to 'md' (768px). Resize the viewport to see the responsive behavior.</p>
        <ResponsiveList v-bind="args">
          <template #mobileContent="{ item }">
            <div class="font-medium text-gray-900 dark:text-white">{{ item.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.email }}</div>
          </template>
        </ResponsiveList>
      </div>
    `,
  }),
}

export const Empty: Story = {
  args: {
    items: [],
    columns: defaultColumns,
  },
  render: (args) => ({
    components: { ResponsiveList },
    setup: () => ({ args }),
    template: `
      <ResponsiveList v-bind="args">
        <template #mobileContent="{ item }">
          <div>{{ item.name }}</div>
        </template>
        <template #empty>
          <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            No items to display
          </div>
        </template>
      </ResponsiveList>
    `,
  }),
}
