<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { TableContextKey, type TableContext } from './Table.vue'

export type SortDirection = 'asc' | 'desc'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Enable sorting for this column */
    sortable?: boolean
    /** Whether this column is currently sorted */
    sorted?: boolean
    /** Current sort direction */
    sortDirection?: SortDirection
    /** Text alignment */
    align?: 'left' | 'center' | 'right'
    /** Fixed width (e.g., '200px', '20%') */
    width?: string
    /** Minimum width */
    minWidth?: string
    /** Maximum width */
    maxWidth?: string
    /** Make this column sticky (for horizontal scroll) */
    sticky?: boolean
    /** Sticky position from left (for multiple sticky columns) */
    stickyLeft?: string
    /** Column span */
    colspan?: number | string
    /** Row span */
    rowspan?: number | string
    /** Scope attribute for accessibility (col, row, colgroup, rowgroup) */
    scope?: 'col' | 'row' | 'colgroup' | 'rowgroup'
    /** Enable column resizing */
    resizable?: boolean
    /** Whether this column is currently being resized */
    resizing?: boolean
  }>(),
  {
    sortable: false,
    sorted: false,
    sortDirection: 'asc',
    align: 'left',
    sticky: false,
    stickyLeft: '0',
    scope: 'col',
    resizable: false,
    resizing: false,
  }
)

const attrs = useAttrs()

const emit = defineEmits<{
  /** Emitted when sortable header is clicked */
  sort: []
  /** Emitted when resize handle is dragged */
  resizeStart: [event: MouseEvent | TouchEvent]
}>()

const context = inject<TableContext>(TableContextKey)

const thClasses = computed(() => [
  // Padding
  context?.compact ? 'px-2 py-2' : 'px-3 py-3',
  // Alignment
  props.align === 'center' ? 'text-center' : props.align === 'right' ? 'text-right' : 'text-left',
  // Sortable hover
  props.sortable ? 'cursor-pointer select-none hover:bg-black/5 dark:hover:bg-white/5' : '',
  // Border for bordered tables
  context?.bordered ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : '',
  // Sticky column
  props.sticky ? 'sticky bg-black/5 dark:bg-white/5 z-20' : '',
  // Resizable
  props.resizable ? 'relative' : '',
])

const thStyles = computed(() => ({
  width: props.width,
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  left: props.sticky ? props.stickyLeft : undefined,
}))

const handleSort = () => {
  if (props.sortable) {
    emit('sort')
  }
}
</script>

<template>
  <th
    v-bind="attrs"
    :class="thClasses"
    :style="thStyles"
    :colspan="colspan"
    :rowspan="rowspan"
    :scope="scope"
    :aria-sort="sortable ? (sorted ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none') : undefined"
    @click="handleSort"
  >
    <div
      class="flex items-center gap-1"
      :class="{
        'justify-center': align === 'center',
        'justify-end': align === 'right',
      }"
    >
      <slot />
      <!-- Sort indicator -->
      <svg
        v-if="sortable"
        :class="[
          'size-4 transition-colors flex-shrink-0',
          sorted ? 'text-primary-500' : 'text-gray-400',
        ]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <!-- Up arrow (shows when sorted asc) -->
        <path
          v-if="sorted && sortDirection === 'asc'"
          d="M7 14l5-5 5 5H7z"
        />
        <!-- Down arrow (shows when sorted desc) -->
        <path
          v-else-if="sorted && sortDirection === 'desc'"
          d="M7 10l5 5 5-5H7z"
        />
        <!-- Both arrows (shows when not sorted) -->
        <template v-else>
          <path
            d="M7 14l5-5 5 5H7z"
            class="opacity-40"
          />
          <path
            d="M7 10l5 5 5-5H7z"
            class="opacity-40"
          />
        </template>
      </svg>
    </div>
    <!-- Resize handle -->
    <div
      v-if="resizable"
      :class="[
        'absolute top-0 right-0 bottom-0 w-1 cursor-col-resize select-none',
        'hover:bg-primary-400 dark:hover:bg-primary-500',
        'transition-colors',
        resizing ? 'bg-primary-500' : 'bg-transparent',
      ]"
      role="separator"
      aria-orientation="vertical"
      tabindex="-1"
      @mousedown.stop="emit('resizeStart', $event)"
      @touchstart.stop="emit('resizeStart', $event)"
    />
  </th>
</template>
