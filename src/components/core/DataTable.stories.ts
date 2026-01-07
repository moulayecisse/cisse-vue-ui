import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { DataTable as TableComponent } from './table'
import Button from './Button.vue'

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

const meta: Meta<typeof TableComponent> = {
  title: 'Core/DataTable',
  component: TableComponent,
  tags: ['autodocs'],
  args: {
    items: sampleUsers,
    properties: basicProperties,
  },
}

export default meta
type Story = StoryObj<typeof meta>

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

export const EmptyStateBasic: Story = {
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

export const Loading: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      properties: basicProperties,
    }),
    template: '<TableComponent :items="[]" :properties="properties" loading />',
  }),
}

export const LoadingCustomRows: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      properties: [
        { name: 'name', label: 'Name', main: true },
        { name: 'email', label: 'Email' },
        { name: 'role', label: 'Role' },
        { name: 'status', label: 'Status' },
        { name: 'date', label: 'Date' },
      ],
    }),
    template: '<TableComponent :items="[]" :properties="properties" loading :loading-rows="10" />',
  }),
}

// New features in atomic redesign

export const Striped: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: basicProperties,
    }),
    template: '<TableComponent :items="items" :properties="properties" striped />',
  }),
}

export const Bordered: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: basicProperties,
    }),
    template: '<TableComponent :items="items" :properties="properties" bordered />',
  }),
}

export const Compact: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: basicProperties,
    }),
    template: '<TableComponent :items="items" :properties="properties" compact />',
  }),
}

export const NoHover: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: sampleUsers,
      properties: basicProperties,
    }),
    template: '<TableComponent :items="items" :properties="properties" :hover="false" />',
  }),
}

export const StickyHeader: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: [
        ...sampleUsers,
        ...sampleUsers.map((u, i) => ({ ...u, id: u.id + 10 + i })),
        ...sampleUsers.map((u, i) => ({ ...u, id: u.id + 20 + i })),
      ],
      properties: basicProperties,
    }),
    template: `
      <div style="height: 300px; overflow: auto;">
        <TableComponent :items="items" :properties="properties" sticky-header />
      </div>
    `,
  }),
}

export const ClickableRows: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const handleRowClick = (item: Record<string, unknown>) => {
        alert(`Clicked: ${item.name}`)
      }

      return {
        items: sampleUsers,
        properties: basicProperties,
        handleRowClick,
      }
    },
    template: `
      <TableComponent
        :items="items"
        :properties="properties"
        clickable-rows
        @row-click="handleRowClick"
      />
    `,
  }),
}

export const AllFeatures: Story = {
  render: () => ({
    components: { TableComponent, Button },
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
        properties: [
          { name: 'name', label: 'Name', main: true, sortable: true },
          { name: 'email', label: 'Email', sortable: true },
          { name: 'role', label: 'Role', type: 'badge' },
          { name: 'status', label: 'Active', type: 'boolean' },
        ],
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
          striped
          bordered
          @select="handleSelect"
          @select-all="handleSelectAll"
        >
          <template #action="{ item }">
            <Button variant="ghost" size="sm" icon="lucide:edit" />
            <Button variant="ghost" size="sm" icon="lucide:trash" />
          </template>
        </TableComponent>
      </div>
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
    template: '<TableComponent :items="items" :properties="properties" />',
  }),
}

export const CustomEmptyState: Story = {
  render: () => ({
    components: { TableComponent, Button },
    setup: () => ({
      items: [],
      properties: basicProperties,
    }),
    template: `
      <TableComponent :items="items" :properties="properties">
        <template #empty>
          <div class="flex flex-col items-center gap-4 py-8">
            <svg class="size-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div class="text-center">
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">No users found</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Get started by creating a new user.</p>
            </div>
            <Button variant="primary">Add User</Button>
          </div>
        </template>
      </TableComponent>
    `,
  }),
}

export const ErrorState: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => ({
      items: [],
      properties: basicProperties,
    }),
    template: `
      <TableComponent
        :items="items"
        :properties="properties"
        error
        error-message="Failed to load users. Please try again later."
      />
    `,
  }),
}

export const CustomErrorState: Story = {
  render: () => ({
    components: { TableComponent, Button },
    setup: () => ({
      items: [],
      properties: basicProperties,
      handleRetry: () => alert('Retrying...'),
    }),
    template: `
      <TableComponent :items="items" :properties="properties" error>
        <template #error>
          <div class="flex flex-col items-center gap-4 py-8">
            <svg class="size-16 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="text-center">
              <h3 class="text-lg font-medium text-red-600 dark:text-red-400">Connection Error</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Unable to connect to the server.</p>
            </div>
            <Button variant="primary" @click="handleRetry">Retry</Button>
          </div>
        </template>
      </TableComponent>
    `,
  }),
}

export const WithColumnVisibility: Story = {
  render: () => ({
    components: { TableComponent, Button },
    setup: () => {
      const { useColumnVisibility } = require('@/composables')
      const allProperties = [
        { name: 'name', label: 'Name', main: true },
        { name: 'email', label: 'Email' },
        { name: 'role', label: 'Role' },
        { name: 'status', label: 'Status', type: 'boolean' },
        { name: 'createdAt', label: 'Created', type: 'date' },
      ]

      const {
        visibleColumns,
        columns,
        toggle,
        showAll,
        reset,
        isVisible,
      } = useColumnVisibility({
        columns: allProperties,
        initialHidden: ['createdAt'],
        minVisible: 1,
      })

      return {
        items: sampleUsers,
        visibleColumns,
        columns,
        toggle,
        showAll,
        reset,
        isVisible,
      }
    },
    template: `
      <div>
        <div class="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Toggle Columns:</span>
            <div class="flex gap-2">
              <Button variant="ghost" size="sm" @click="showAll">Show All</Button>
              <Button variant="ghost" size="sm" @click="reset">Reset</Button>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="col in columns"
              :key="col.name"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm cursor-pointer transition-colors"
              :class="isVisible(col.name)
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'"
            >
              <input
                type="checkbox"
                :checked="isVisible(col.name)"
                class="sr-only"
                @change="toggle(col.name)"
              />
              <span>{{ col.label }}</span>
            </label>
          </div>
        </div>
        <TableComponent :items="items" :properties="visibleColumns" />
      </div>
    `,
  }),
}

// Generate many items for pagination demos
const generateManyUsers = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    status: i % 3 !== 0,
    createdAt: new Date(2024, 0, (i % 28) + 1).toISOString().split('T')[0],
  }))

export const WithPagination: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const items = generateManyUsers(50)
      return {
        items,
        properties: basicProperties,
      }
    },
    template: `
      <TableComponent
        :items="items"
        :properties="properties"
        paginated
        :page-size="10"
      />
    `,
  }),
}

export const PaginationCustomPageSize: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const items = generateManyUsers(100)
      return {
        items,
        properties: basicProperties,
      }
    },
    template: `
      <TableComponent
        :items="items"
        :properties="properties"
        paginated
        :page-size="20"
        :page-size-options="[10, 20, 50, 100]"
      />
    `,
  }),
}

export const PaginationControlled: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const items = generateManyUsers(50)
      const currentPage = ref(1)
      const pageSize = ref(10)

      const handlePageChange = (page: number) => {
        currentPage.value = page
      }

      const handlePageSizeChange = (size: number) => {
        pageSize.value = size
        currentPage.value = 1
      }

      return {
        items,
        properties: basicProperties,
        currentPage,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
      }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Current Page: {{ currentPage }} | Page Size: {{ pageSize }}
        </p>
        <TableComponent
          :items="items"
          :properties="properties"
          paginated
          :current-page="currentPage"
          :page-size="pageSize"
          @update:current-page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    `,
  }),
}

export const PaginationServerSide: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      // Simulate server-side pagination
      const allItems = generateManyUsers(247)
      const currentPage = ref(1)
      const pageSize = ref(10)
      const loading = ref(false)

      // Simulated server response - only returns current page data
      const items = ref(allItems.slice(0, pageSize.value))

      const fetchPage = async (page: number, size: number) => {
        loading.value = true
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 300))
        const start = (page - 1) * size
        items.value = allItems.slice(start, start + size)
        loading.value = false
      }

      const handlePageChange = async (page: number) => {
        currentPage.value = page
        await fetchPage(page, pageSize.value)
      }

      const handlePageSizeChange = async (size: number) => {
        pageSize.value = size
        currentPage.value = 1
        await fetchPage(1, size)
      }

      return {
        items,
        properties: basicProperties,
        currentPage,
        pageSize,
        loading,
        totalItems: allItems.length,
        handlePageChange,
        handlePageSizeChange,
      }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Server-side pagination example (247 total items, simulated API delay)
        </p>
        <TableComponent
          :items="items"
          :properties="properties"
          paginated
          :current-page="currentPage"
          :page-size="pageSize"
          :total-items="totalItems"
          :loading="loading"
          @update:current-page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    `,
  }),
}

export const PaginationWithSelection: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const items = generateManyUsers(50)
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
        if (selectedItems.value.size === items.length) {
          selectedItems.value.clear()
        } else {
          selectedItems.value = new Set(items.map((u) => String(u.id)))
        }
        selectedItems.value = new Set(selectedItems.value)
      }

      return {
        items,
        properties: basicProperties,
        selectedItems,
        handleSelect,
        handleSelectAll,
      }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Selected: {{ selectedItems.size }} items (selection persists across pages)
        </p>
        <TableComponent
          :items="items"
          :properties="properties"
          selectable
          :selected-items="selectedItems"
          paginated
          :page-size="10"
          @select="handleSelect"
          @select-all="handleSelectAll"
        />
      </div>
    `,
  }),
}

export const PaginationNoPageSizeSelector: Story = {
  render: () => ({
    components: { TableComponent },
    setup: () => {
      const items = generateManyUsers(50)
      return {
        items,
        properties: basicProperties,
      }
    },
    template: `
      <TableComponent
        :items="items"
        :properties="properties"
        paginated
        :page-size="10"
        :show-page-size="false"
      />
    `,
  }),
}

export const WithPinnedRows: Story = {
  render: () => ({
    components: { Table: require('./table').Table, Thead: require('./table').Thead, Tbody: require('./table').Tbody, Tr: require('./table').Tr, Th: require('./table').Th, Td: require('./table').Td, Button },
    setup: () => {
      const { usePinnedRows } = require('@/composables')
      const allItems = generateManyUsers(20)

      const {
        pinnedTop,
        pinnedBottom,
        isPinned,
        getPinPosition,
        togglePin,
        clearAll,
      } = usePinnedRows({
        keyField: 'id',
        maxPinnedTop: 3,
        maxPinnedBottom: 2,
      })

      // Items that are not pinned
      const unpinnedItems = ref(allItems.filter(item => !isPinned(item)))

      // Watch for changes and update unpinned items
      const updateUnpinned = () => {
        unpinnedItems.value = allItems.filter(item => !isPinned(item))
      }

      return {
        allItems,
        unpinnedItems,
        pinnedTop,
        pinnedBottom,
        isPinned,
        getPinPosition,
        togglePin: (item: typeof allItems[0], position: 'top' | 'bottom') => {
          togglePin(item, position)
          updateUnpinned()
        },
        clearAll: () => {
          clearAll()
          updateUnpinned()
        },
        properties: basicProperties,
      }
    },
    template: `
      <div>
        <div class="mb-4 flex items-center justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Click pin icons to pin rows to top (max 3) or bottom (max 2).
            Pinned top: {{ pinnedTop.length }}, Pinned bottom: {{ pinnedBottom.length }}
          </p>
          <Button variant="ghost" size="sm" @click="clearAll">Clear All Pins</Button>
        </div>
        <div style="height: 400px; overflow: auto;">
          <Table hover sticky-header>
            <Thead>
              <Tr>
                <Th width="80px">Pin</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <!-- Pinned top rows -->
            <Tbody v-if="pinnedTop.length > 0">
              <Tr
                v-for="item in pinnedTop"
                :key="'pinned-top-' + item.id"
                class="bg-blue-50 dark:bg-blue-900/20"
              >
                <Td>
                  <button
                    class="text-blue-500 hover:text-blue-700"
                    @click="togglePin(item, 'top')"
                  >
                    <svg class="size-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                    </svg>
                  </button>
                </Td>
                <Td main>{{ item.name }}</Td>
                <Td>{{ item.email }}</Td>
                <Td>{{ item.role }}</Td>
              </Tr>
            </Tbody>
            <!-- Regular rows -->
            <Tbody>
              <Tr
                v-for="item in unpinnedItems"
                :key="item.id"
              >
                <Td>
                  <div class="flex gap-1">
                    <button
                      class="text-gray-400 hover:text-blue-500"
                      title="Pin to top"
                      @click="togglePin(item, 'top')"
                    >
                      <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <button
                      class="text-gray-400 hover:text-blue-500"
                      title="Pin to bottom"
                      @click="togglePin(item, 'bottom')"
                    >
                      <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </Td>
                <Td main>{{ item.name }}</Td>
                <Td>{{ item.email }}</Td>
                <Td>{{ item.role }}</Td>
              </Tr>
            </Tbody>
            <!-- Pinned bottom rows -->
            <Tbody v-if="pinnedBottom.length > 0">
              <Tr
                v-for="item in pinnedBottom"
                :key="'pinned-bottom-' + item.id"
                class="bg-green-50 dark:bg-green-900/20"
              >
                <Td>
                  <button
                    class="text-green-500 hover:text-green-700"
                    @click="togglePin(item, 'bottom')"
                  >
                    <svg class="size-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146z"/>
                    </svg>
                  </button>
                </Td>
                <Td main>{{ item.name }}</Td>
                <Td>{{ item.email }}</Td>
                <Td>{{ item.role }}</Td>
              </Tr>
            </Tbody>
          </Table>
        </div>
      </div>
    `,
  }),
}

export const WithEditableCells: Story = {
  render: () => ({
    components: { Table: require('./table').Table, Thead: require('./table').Thead, Tbody: require('./table').Tbody, Tr: require('./table').Tr, Th: require('./table').Th, Td: require('./table').Td, Button },
    setup: () => {
      const { useEditableCell } = require('@/composables')
      const items = ref([...sampleUsers])

      const {
        isEditing,
        editValue,
        error,
        saving,
        startEdit,
        confirmEdit,
        cancelEdit,
        updateValue,
      } = useEditableCell({
        keyField: 'id',
        onSave: async ({ item, field, newValue }: { item: unknown; field: string; newValue: unknown }) => {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500))
          // Update item in our local state
          const index = items.value.findIndex(i => i.id === (item as typeof sampleUsers[0]).id)
          if (index !== -1) {
            items.value[index] = { ...items.value[index], [field]: newValue }
          }
        },
        validate: ({ field, newValue }: { field: string; newValue: unknown }) => {
          if (field === 'name' && (!newValue || String(newValue).trim() === '')) {
            return 'Name is required'
          }
          if (field === 'email' && (!newValue || !String(newValue).includes('@'))) {
            return 'Valid email is required'
          }
          return null
        },
      })

      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          confirmEdit()
        } else if (event.key === 'Escape') {
          cancelEdit()
        }
      }

      return {
        items,
        isEditing,
        editValue,
        error,
        saving,
        startEdit,
        confirmEdit,
        cancelEdit,
        updateValue,
        handleKeydown,
      }
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Double-click a cell to edit. Press Enter to save, Escape to cancel.
          {{ error ? 'Error: ' + error : '' }}
        </p>
        <Table hover>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr v-for="item in items" :key="item.id">
              <Td main>
                <div
                  v-if="isEditing(String(item.id), 'name')"
                  class="flex items-center gap-2"
                >
                  <input
                    :value="editValue"
                    class="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    :class="error ? 'border-red-500' : 'border-gray-300'"
                    @input="updateValue(($event.target as HTMLInputElement).value)"
                    @keydown="handleKeydown"
                    autofocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    :disabled="saving"
                    @click="confirmEdit"
                  >
                    {{ saving ? '...' : 'Save' }}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    :disabled="saving"
                    @click="cancelEdit"
                  >
                    Cancel
                  </Button>
                </div>
                <span
                  v-else
                  class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded -mx-2 -my-1 block"
                  @dblclick="startEdit(item, 'name', item.name)"
                >
                  {{ item.name }}
                </span>
              </Td>
              <Td>
                <div
                  v-if="isEditing(String(item.id), 'email')"
                  class="flex items-center gap-2"
                >
                  <input
                    :value="editValue"
                    class="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    :class="error ? 'border-red-500' : 'border-gray-300'"
                    @input="updateValue(($event.target as HTMLInputElement).value)"
                    @keydown="handleKeydown"
                    autofocus
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    :disabled="saving"
                    @click="confirmEdit"
                  >
                    {{ saving ? '...' : 'Save' }}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    :disabled="saving"
                    @click="cancelEdit"
                  >
                    Cancel
                  </Button>
                </div>
                <span
                  v-else
                  class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded -mx-2 -my-1 block"
                  @dblclick="startEdit(item, 'email', item.email)"
                >
                  {{ item.email }}
                </span>
              </Td>
              <Td>{{ item.role }}</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    `,
  }),
}

export const WithVirtualScroll: Story = {
  render: () => ({
    components: { Table: require('./table').Table, Thead: require('./table').Thead, Tbody: require('./table').Tbody, Tr: require('./table').Tr, Th: require('./table').Th, Td: require('./table').Td, Button },
    setup: () => {
      const { useVirtualScroll } = require('@/composables')
      // Generate 10,000 items
      const allItems = Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        role: ['Admin', 'Editor', 'Viewer'][i % 3],
      }))

      const rowHeight = 44 // px
      const containerHeight = 400 // px

      const {
        visibleItems,
        totalHeight,
        offsetY,
        startIndex,
        endIndex,
        scrollToIndex,
        onScroll,
      } = useVirtualScroll({
        items: allItems,
        rowHeight,
        containerHeight,
        overscan: 5,
      })

      const jumpTo = (index: number) => {
        scrollToIndex(index)
      }

      return {
        allItems,
        visibleItems,
        totalHeight,
        offsetY,
        startIndex,
        endIndex,
        onScroll,
        jumpTo,
        rowHeight,
        containerHeight,
      }
    },
    template: `
      <div>
        <div class="mb-4 flex items-center justify-between">
          <div class="text-sm text-gray-600 dark:text-gray-400">
            <p>Rendering {{ visibleItems.length }} of {{ allItems.length }} rows</p>
            <p>Visible range: {{ startIndex }} - {{ endIndex }}</p>
          </div>
          <div class="flex gap-2">
            <Button variant="ghost" size="sm" @click="jumpTo(0)">Jump to Top</Button>
            <Button variant="ghost" size="sm" @click="jumpTo(5000)">Jump to Middle</Button>
            <Button variant="ghost" size="sm" @click="jumpTo(9990)">Jump to Bottom</Button>
          </div>
        </div>
        <div
          class="border rounded-lg overflow-hidden"
          :style="{ height: containerHeight + 'px' }"
        >
          <div
            class="overflow-auto"
            :style="{ height: '100%' }"
            @scroll="onScroll"
          >
            <Table hover>
              <Thead class="sticky top-0 z-10 bg-white dark:bg-gray-900">
                <Tr>
                  <Th width="80px">#</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                </Tr>
              </Thead>
              <Tbody>
                <!-- Spacer to position rows correctly -->
                <tr :style="{ height: totalHeight + 'px', position: 'absolute', width: '1px' }" />
                <Tr
                  v-for="(item, idx) in visibleItems"
                  :key="item.id"
                  :style="{ height: rowHeight + 'px', transform: 'translateY(' + offsetY + 'px)' }"
                >
                  <Td>{{ startIndex + idx + 1 }}</Td>
                  <Td main>{{ item.name }}</Td>
                  <Td>{{ item.email }}</Td>
                  <Td>{{ item.role }}</Td>
                </Tr>
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithResizableColumns: Story = {
  render: () => ({
    components: { Table: require('./table').Table, Thead: require('./table').Thead, Tbody: require('./table').Tbody, Tr: require('./table').Tr, Th: require('./table').Th, Td: require('./table').Td },
    setup: () => {
      const { useColumnResize } = require('@/composables')
      const columns = [
        { name: 'name', width: 200, minWidth: 100, maxWidth: 400 },
        { name: 'email', width: 250, minWidth: 150, maxWidth: 500 },
        { name: 'role', width: 150, minWidth: 80, maxWidth: 300 },
      ]

      const {
        getWidth,
        startResize,
        isResizing,
        resizingColumn,
        reset,
      } = useColumnResize({
        columns,
        persist: true,
        storageKey: 'storybook-column-widths',
      })

      return {
        items: sampleUsers,
        columns,
        getWidth,
        startResize,
        isResizing,
        resizingColumn,
        reset,
      }
    },
    template: `
      <div>
        <div class="mb-4 flex items-center justify-between">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Drag column edges to resize. {{ isResizing ? 'Resizing: ' + resizingColumn : '' }}
          </p>
          <button
            class="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            @click="reset"
          >
            Reset Widths
          </button>
        </div>
        <Table hover>
          <Thead>
            <Tr>
              <Th
                v-for="col in columns"
                :key="col.name"
                :width="getWidth(col.name) + 'px'"
                resizable
                :resizing="resizingColumn === col.name"
                @resize-start="startResize(col.name, $event)"
              >
                {{ col.name.charAt(0).toUpperCase() + col.name.slice(1) }} ({{ getWidth(col.name) }}px)
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr v-for="item in items" :key="item.id">
              <Td>{{ item.name }}</Td>
              <Td>{{ item.email }}</Td>
              <Td>{{ item.role }}</Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    `,
  }),
}
