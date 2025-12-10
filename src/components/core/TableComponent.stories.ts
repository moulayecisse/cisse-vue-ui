import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TableComponent from './TableComponent.vue'
import Button from './Button.vue'

const meta: Meta<typeof TableComponent> = {
  title: 'Core/TableComponent',
  component: TableComponent,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: true, createdAt: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: true, createdAt: '2024-02-20' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer', status: false, createdAt: '2024-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: true, createdAt: '2024-04-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: false, createdAt: '2024-05-12' },
]

const basicProperties = [
  { name: 'name', label: 'Name', main: true },
  { name: 'email', label: 'Email' },
  { name: 'role', label: 'Role' },
]

export const Default: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: basicProperties,
    }),
    template: '<TableComponent :items="items" :properties="properties" />',
  }),
}

export const WithTypes: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: [
        { name: 'name', label: 'Name', main: true, type: 'text' },
        { name: 'email', label: 'Email', type: 'text' },
        { name: 'status', label: 'Active', type: 'boolean' },
        { name: 'createdAt', label: 'Created', type: 'date' },
      ],
    }),
    template: '<TableComponent :items="items" :properties="properties" />',
  }),
}

export const WithBadge: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: [
        { name: 'name', label: 'Name', main: true },
        { name: 'email', label: 'Email' },
        { name: 'role', label: 'Role', type: 'badge' },
      ],
    }),
    template: '<TableComponent :items="items" :properties="properties" />',
  }),
}

export const WithAlignment: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: [
        { id: 1, product: 'Widget A', quantity: 150, price: 29.99 },
        { id: 2, product: 'Widget B', quantity: 75, price: 49.99 },
        { id: 3, product: 'Widget C', quantity: 200, price: 19.99 },
      ],
      properties: [
        { name: 'product', label: 'Product', main: true, align: 'left' as const },
        { name: 'quantity', label: 'Quantity', type: 'number', align: 'center' as const },
        { name: 'price', label: 'Price', type: 'number', align: 'right' as const },
      ],
    }),
    template: '<TableComponent :items="items" :properties="properties" />',
  }),
}

export const Selectable: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const selectedItems = ref<Set<string>>(new Set())

      const handleSelect = (id: string) => {
        if (selectedItems.value.has(id)) {
          selectedItems.value.delete(id)
        } else {
          selectedItems.value.add(id)
        }
        selectedItems.value = new Set(selectedItems.value)
      }

      const handleSelectAll = () => {
        if (selectedItems.value.size === sampleUsers.length) {
          selectedItems.value.clear()
        } else {
          selectedItems.value = new Set(sampleUsers.map((u) => String(u.id)))
        }
        selectedItems.value = new Set(selectedItems.value)
      }

      return {
        items: sampleUsers,
        properties: basicProperties,
        selectedItems,
        handleSelect,
        handleSelectAll,
      }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Selected: {{ selectedItems.size }} items
        </p>
        <TableComponent
          :items="items"
          :properties="properties"
          selectable
          :selected-items="selectedItems"
          @select="handleSelect"
          @select-all="handleSelectAll"
        />
      </div>
    `,
  }),
}

export const WithActions: Story = {
  render: () => ({
    components: { TableComponent, Button },
    setup: () => ({
      items: sampleUsers,
      properties: basicProperties,
    }),
    template: `
      <TableComponent :items="items" :properties="properties">
        <template #action="{ item }">
          <Button variant="ghost" size="sm" icon="lucide:edit" />
          <Button variant="ghost" size="sm" icon="lucide:trash" />
        </template>
      </TableComponent>
    `,
  }),
}

export const WithCustomSlot: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: [
        { name: 'name', label: 'Name', main: true },
        { name: 'email', label: 'Email' },
        { name: 'status', label: 'Status' },
      ],
    }),
    template: `
      <TableComponent :items="items" :properties="properties">
        <template #item-status="{ value }">
          <span
            :class="[
              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
              value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            ]"
          >
            {{ value ? 'Active' : 'Inactive' }}
          </span>
        </template>
      </TableComponent>
    `,
  }),
}

export const EmptyState: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: [],
      properties: basicProperties,
    }),
    template: `
      <TableComponent :items="items" :properties="properties">
        <template #empty>
          <div class="py-12 text-center text-gray-500">
            <p class="text-lg font-medium">No data available</p>
            <p class="text-sm">Try adjusting your filters</p>
          </div>
        </template>
      </TableComponent>
    `,
  }),
}

export const NestedProperties: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: [
        { id: 1, user: { name: 'John', email: 'john@test.com' }, company: { name: 'Acme Inc' } },
        { id: 2, user: { name: 'Jane', email: 'jane@test.com' }, company: { name: 'Tech Corp' } },
      ],
      properties: [
        { name: 'user.name', label: 'Name', main: true },
        { name: 'user.email', label: 'Email' },
        { name: 'company.name', label: 'Company' },
      ],
    }),
    template: '<TableComponent :items="items" :properties="properties" />',
  }),
}
