<script lang="ts" setup>
import type { Property } from '@/types'
import Tr from '../atoms/Tr.vue'
import Th from '../atoms/Th.vue'
import Checkbox from '@/components/form/Checkbox.vue'
import type { SortDirection } from '../atoms/Th.vue'

const props = withDefaults(
  defineProps<{
    /** Column definitions */
    columns: Property[]
    /** Enable selection column */
    selectable?: boolean
    /** Whether all items are selected */
    allSelected?: boolean
    /** Whether some items are selected (indeterminate state) */
    someSelected?: boolean
    /** Number of selectable items (for disabling checkbox when 0) */
    selectableCount?: number
    /** Current sort column */
    sortBy?: string
    /** Current sort direction */
    sortDirection?: SortDirection
    /** Show action column */
    showActions?: boolean
  }>(),
  {
    selectable: false,
    allSelected: false,
    someSelected: false,
    selectableCount: 0,
    showActions: false,
  }
)

const emit = defineEmits<{
  /** Emitted when select all checkbox is toggled */
  selectAll: []
  /** Emitted when a sortable column header is clicked */
  sort: [column: string, direction: SortDirection]
}>()

const handleSort = (property: Property) => {
  if (!property.sortable) return

  const newDirection: SortDirection =
    props.sortBy === property.name && props.sortDirection === 'asc' ? 'desc' : 'asc'

  emit('sort', property.name, newDirection)
}
</script>

<template>
  <Tr>
    <!-- Selection column -->
    <Th
      v-if="selectable"
      width="48px"
    >
      <Checkbox
        :model-value="allSelected"
        :indeterminate="someSelected"
        :disabled="selectableCount === 0"
        @update:model-value="emit('selectAll')"
      />
    </Th>

    <!-- Data columns -->
    <Th
      v-for="column in columns"
      :key="column.name"
      :sortable="column.sortable"
      :sorted="sortBy === column.name"
      :sort-direction="sortDirection"
      :align="column.align"
      :width="column.width"
      :min-width="column.minWidth"
      :max-width="column.maxWidth"
      @sort="handleSort(column)"
    >
      <slot
        :name="'header-' + column.name"
        :column="column"
      >
        {{ column.label ?? column.name }}
      </slot>
    </Th>

    <!-- Actions column -->
    <Th
      v-if="showActions"
      align="right"
      width="100px"
    />
  </Tr>
</template>
