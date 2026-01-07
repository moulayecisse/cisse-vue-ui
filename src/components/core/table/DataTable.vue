<script lang="ts" setup>
import type { Property } from '@/types'
import { computed, useSlots, type Slots } from 'vue'
import Table from './atoms/Table.vue'
import Thead from './atoms/Thead.vue'
import Tbody from './atoms/Tbody.vue'
import TableHeader from './molecules/TableHeader.vue'
import TableRow from './molecules/TableRow.vue'
import TableSkeleton from '@/components/feedback/TableSkeleton.vue'
import PaginationControls from '@/components/feedback/PaginationControls.vue'
import { usePagination } from '@/composables'
import type { SortDirection } from './atoms/Th.vue'

type ItemType = { id: number | string; [key: string]: unknown }

const slots: Slots = useSlots()

const props = withDefaults(
  defineProps<{
    /** Column definitions */
    properties: Property[]
    /** Array of items to display */
    items: ItemType[]
    /** Enable selection mode */
    selectable?: boolean
    /** Set of selected item keys */
    selectedItems?: Set<string>
    /** Filter function to determine if an item is selectable */
    selectableFilter?: (item: ItemType) => boolean
    /** Key field for unique identification */
    keyField?: string
    /** Current sort column */
    sortBy?: string
    /** Current sort direction */
    sortDirection?: SortDirection
    /** Show loading skeleton */
    loading?: boolean
    /** Number of skeleton rows to show when loading */
    loadingRows?: number
    /** Whether there is an error to display */
    error?: boolean
    /** Error message to display (if error slot not provided) */
    errorMessage?: string
    /** Enable alternating row colors */
    striped?: boolean
    /** Show cell borders */
    bordered?: boolean
    /** Enable row hover effect */
    hover?: boolean
    /** Use compact padding */
    compact?: boolean
    /** Make header sticky on scroll */
    stickyHeader?: boolean
    /** Make rows clickable */
    clickableRows?: boolean
    /** Enable client-side pagination */
    paginated?: boolean
    /** Number of items per page */
    pageSize?: number
    /** Available page size options */
    pageSizeOptions?: number[]
    /** Show page size selector */
    showPageSize?: boolean
    /** Current page (1-indexed, for controlled pagination) */
    currentPage?: number
    /** Total items (for server-side pagination) */
    totalItems?: number
  }>(),
  {
    selectable: false,
    keyField: 'id',
    loading: false,
    loadingRows: 5,
    error: false,
    errorMessage: 'An error occurred while loading data.',
    striped: false,
    bordered: false,
    hover: true,
    compact: false,
    stickyHeader: false,
    clickableRows: false,
    paginated: false,
    pageSize: 10,
    pageSizeOptions: () => [10, 20, 50, 100],
    showPageSize: true,
  }
)

const emit = defineEmits<{
  /** Emitted when an item is selected/deselected */
  select: [id: string]
  /** Emitted when select all is toggled */
  selectAll: []
  /** Emitted when a sortable column is clicked */
  sort: [column: string, direction: SortDirection]
  /** Emitted when a row is clicked (if clickableRows is true) */
  rowClick: [item: ItemType, event: MouseEvent]
  /** Emitted when page changes */
  'update:currentPage': [page: number]
  /** Emitted when page size changes */
  'update:pageSize': [size: number]
}>()

// Filter out hidden properties
const visibleProperties = computed(() => props.properties.filter((p) => !p.hidden))

// Pagination
const {
  currentPage: internalPage,
  pageSize: internalPageSize,
  totalPages,
  paginatedItems,
  setPageSize: setInternalPageSize,
  goToPage,
} = usePagination({
  items: computed(() => props.items),
  pageSize: props.pageSize,
  initialPage: props.currentPage ?? 1,
})

// Support controlled or uncontrolled pagination
const effectivePage = computed(() => props.currentPage ?? internalPage.value)
const effectivePageSize = computed(() => props.pageSize ?? internalPageSize.value)

// For server-side pagination, use totalItems prop if provided
const effectiveTotalPages = computed(() => {
  if (props.totalItems !== undefined) {
    return Math.ceil(props.totalItems / effectivePageSize.value)
  }
  return totalPages.value
})

// Items to display (paginated or all)
const displayItems = computed(() => {
  if (!props.paginated) return props.items
  // For server-side pagination (when totalItems is provided), use items directly
  if (props.totalItems !== undefined) return props.items
  return paginatedItems.value
})

const handlePageChange = (page: number) => {
  goToPage(page)
  emit('update:currentPage', page)
}

const handlePageSizeChange = (size: number) => {
  setInternalPageSize(size)
  emit('update:pageSize', size)
}

// Get item key
const getKey = (item: ItemType): string => {
  const keyValue = item[props.keyField]
  return String(keyValue ?? Math.random())
}

// Selection logic
const selectableItems = computed(() => {
  if (!props.selectableFilter) return props.items
  return props.items.filter(props.selectableFilter)
})

const allSelected = computed(() => {
  if (selectableItems.value.length === 0) return false
  return selectableItems.value.every((item) => props.selectedItems?.has(getKey(item)))
})

const someSelected = computed(() => {
  return (props.selectedItems?.size || 0) > 0 && !allSelected.value
})

const isSelected = (item: ItemType): boolean => {
  return props.selectedItems?.has(getKey(item)) || false
}

const isSelectable = (item: ItemType): boolean => {
  if (!props.selectable) return false
  if (!props.selectableFilter) return true
  return props.selectableFilter(item)
}

const handleSelect = (item: ItemType) => {
  emit('select', getKey(item))
}

const handleRowClick = (item: ItemType, event: MouseEvent) => {
  if (props.clickableRows) {
    emit('rowClick', item, event)
  }
}

const hasActionSlot = computed((): boolean => !!slots.action)
</script>

<template>
  <div class="overflow-hidden">
    <!-- Loading State -->
    <TableSkeleton
      v-if="loading"
      :rows="loadingRows"
      :columns="visibleProperties.length"
    />

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <slot name="error">
        <div class="flex flex-col items-center gap-3">
          <svg
            class="size-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ errorMessage }}</p>
        </div>
      </slot>
    </div>

    <!-- Content -->
    <Table
      v-else-if="items && items.length > 0"
      :striped="striped"
      :bordered="bordered"
      :hover="hover"
      :compact="compact"
      :sticky-header="stickyHeader"
    >
      <Thead>
        <TableHeader
          :columns="visibleProperties"
          :selectable="selectable"
          :all-selected="allSelected"
          :some-selected="someSelected"
          :selectable-count="selectableItems.length"
          :sort-by="sortBy"
          :sort-direction="sortDirection"
          :show-actions="hasActionSlot"
          @select-all="emit('selectAll')"
          @sort="(col, dir) => emit('sort', col, dir)"
        >
          <!-- Forward header slots -->
          <template
            v-for="column in visibleProperties"
            :key="'header-' + column.name"
            #[`header-${column.name}`]="slotProps"
          >
            <slot
              :name="'header-' + column.name"
              v-bind="slotProps"
            />
          </template>
        </TableHeader>
      </Thead>

      <Tbody>
        <TableRow
          v-for="(item, index) in displayItems"
          :key="getKey(item)"
          :item="item"
          :columns="visibleProperties"
          :selectable="selectable"
          :selected="isSelected(item)"
          :can-select="isSelectable(item)"
          :clickable="clickableRows"
          :even="index % 2 === 1"
          :show-actions="hasActionSlot"
          @select="handleSelect(item)"
          @click="(e) => handleRowClick(item, e)"
        >
          <!-- Forward cell slots -->
          <template
            v-for="column in visibleProperties"
            :key="'cell-' + column.name"
            #[`cell-${column.name}`]="slotProps"
          >
            <slot
              :name="'item-' + column.name"
              v-bind="slotProps"
            />
          </template>

          <!-- Forward action slot -->
          <template #actions="{ item: rowItem }">
            <slot
              name="action"
              :item="rowItem"
            />
          </template>
        </TableRow>
      </Tbody>
    </Table>

    <!-- Empty state -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <slot name="empty">
        <div class="flex flex-col items-center gap-3">
          <svg
            class="size-12 text-gray-300 dark:text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <p class="text-sm text-gray-500 dark:text-gray-400">No data available</p>
        </div>
      </slot>
    </div>

    <!-- Pagination (outside v-if/v-else chain) -->
    <PaginationControls
      v-if="paginated && items && items.length > 0 && !loading && !error"
      :current-page="effectivePage"
      :total-pages="effectiveTotalPages"
      :page-size="effectivePageSize"
      :page-size-options="pageSizeOptions"
      :show-page-size="showPageSize"
      class="mt-4"
      @update:current-page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
  </div>
</template>
