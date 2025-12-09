<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useBreakpoints } from '@vueuse/core'
import type { Property } from '@/types'
import MobileList from './MobileList.vue'
import TableComponent from './TableComponent.vue'

export interface ResponsiveListColumn {
  /** Column key - corresponds to the data field name (alias for 'name' for backward compatibility) */
  key?: string
  /** Column name - corresponds to the data field name */
  name?: string
  /** Display label for the column header */
  label?: string
  /** Column type for automatic rendering */
  type?: 'text' | 'number' | 'date' | 'badge' | 'boolean' | string
  /** Text alignment in the column */
  align?: 'left' | 'center' | 'right'
  /** Header CSS class */
  headerClass?: string
  /** Cell CSS class */
  className?: string
  /** Whether the column is sortable */
  sortable?: boolean
  /** Whether to hide the column */
  hidden?: boolean
  /** Whether the column is the main/primary column */
  main?: boolean
  /** Hide this column on mobile view */
  hideOnMobile?: boolean
}

type ItemType = { id: number | string; [key: string]: unknown }

const props = withDefaults(
  defineProps<{
    /** Array of items to display */
    items: ItemType[]
    /** Column definitions (extends Property with mobile options) */
    columns: ResponsiveListColumn[]
    /** Key field for unique identification */
    keyField?: string
    /** Enable selection mode */
    selectable?: boolean
    /** Set of selected item keys */
    selectedItems?: Set<string>
    /** Filter function to determine if an item is selectable */
    selectableFilter?: (item: ItemType) => boolean
    /** Breakpoint for switching between mobile and desktop views (default: 'lg' = 1024px) */
    breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  }>(),
  {
    keyField: 'id',
    selectable: false,
    breakpoint: 'lg',
  },
)

const emit = defineEmits<{
  /** Emitted when an item is selected/deselected */
  select: [id: string]
  /** Emitted when select all is toggled */
  selectAll: []
}>()

defineSlots<{
  // Mobile slots
  /** Avatar/icon slot for mobile view */
  avatar?: (props: { item: ItemType }) => unknown
  /** Main content for mobile view */
  mobileContent?: (props: { item: ItemType }) => unknown
  /** Actions for mobile view */
  mobileActions?: (props: { item: ItemType }) => unknown

  // Table cell slots - dynamic based on column key
  /** Custom cell rendering for table view */
  [key: `cell-${string}`]: (props: { item: ItemType; value: unknown }) => unknown

  // Shared slots
  /** Actions column for table view, also used as fallback for mobile */
  actions?: (props: { item: ItemType }) => unknown
  /** Empty state slot */
  empty?: () => unknown
}>()

const slots = useSlots()

// Helper to get column key (supports both 'key' and 'name' for backward compatibility)
const getColumnKey = (col: ResponsiveListColumn): string => col.key || col.name || ''

// Convert columns to Property format for TableComponent
const tableProperties = computed<Property[]>(() =>
  props.columns.map((col) => ({
    name: getColumnKey(col),
    label: col.label,
    type: col.type,
    sortable: col.sortable,
    hidden: col.hidden,
    align: col.align,
    className: col.className,
    main: col.main,
  })),
)

// Get cell value for table slots
const getCellValue = (item: ItemType, key: string): unknown => {
  const keys = key.split('.')
  let value: unknown = item
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return undefined
    }
  }
  return value
}

// Check if a cell slot exists
const hasCellSlot = (key: string): boolean => {
  return !!slots[`cell-${key}`]
}

const hasActionsSlot = computed(() => !!slots.actions)

// Tailwind breakpoints
const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
})

// Reactive desktop detection based on selected breakpoint
const isDesktop = computed(() => breakpoints.greaterOrEqual(props.breakpoint).value)
</script>

<template>
  <div>
    <!-- Mobile View -->
    <MobileList
      v-if="!isDesktop"
      :items="items"
      :key-field="keyField"
      :selectable="selectable"
      :selected-items="selectedItems"
      :selectable-filter="selectableFilter"
      @select="emit('select', $event)"
      @select-all="emit('selectAll')"
    >
      <template #avatar="{ item }">
        <slot name="avatar" :item="item" />
      </template>

      <template #content="{ item }">
        <slot name="mobileContent" :item="item" />
      </template>

      <template #actions="{ item }">
        <slot name="mobileActions" :item="item">
          <slot name="actions" :item="item" />
        </slot>
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </MobileList>

    <!-- Desktop View -->
    <TableComponent
      v-else
      :items="items"
      :properties="tableProperties"
      :key-field="keyField"
      :selectable="selectable"
      :selected-items="selectedItems"
      :selectable-filter="selectableFilter"
      @select="emit('select', $event)"
      @select-all="emit('selectAll')"
    >
      <!-- Forward cell slots -->
      <template v-for="col in columns" :key="getColumnKey(col)" #[`item-${getColumnKey(col)}`]="{ item, value }">
        <slot
          v-if="hasCellSlot(getColumnKey(col))"
          :name="`cell-${getColumnKey(col)}`"
          :item="item"
          :value="getCellValue(item, getColumnKey(col))"
        />
        <template v-else>{{ value }}</template>
      </template>

      <!-- Actions slot -->
      <template v-if="hasActionsSlot" #action="{ item }">
        <slot name="actions" :item="item" />
      </template>

      <template #empty>
        <slot name="empty" />
      </template>
    </TableComponent>
  </div>
</template>

