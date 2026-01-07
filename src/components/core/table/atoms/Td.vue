<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { TableContextKey, type TableContext } from './Table.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Text alignment */
    align?: 'left' | 'center' | 'right'
    /** Whether this is the main/primary column */
    main?: boolean
    /** Additional CSS classes */
    className?: string
    /** Truncate text with ellipsis */
    truncate?: boolean
    /** Fixed width (e.g., '200px', '20%') */
    width?: string
    /** Make this column sticky (for horizontal scroll) */
    sticky?: boolean
    /** Sticky position from left (for multiple sticky columns) */
    stickyLeft?: string
    /** Column span */
    colspan?: number | string
    /** Row span */
    rowspan?: number | string
  }>(),
  {
    align: 'left',
    main: false,
    truncate: false,
    sticky: false,
    stickyLeft: '0',
  }
)

const attrs = useAttrs()

const context = inject<TableContext>(TableContextKey)

const tdClasses = computed(() => [
  // Padding
  context?.compact ? 'px-2 py-2' : 'px-3 py-4',
  // Alignment
  props.align === 'center' ? 'text-center' : props.align === 'right' ? 'text-right' : 'text-left',
  // Main column styling
  props.main
    ? 'text-sm font-semibold text-gray-900 dark:text-gray-100'
    : 'text-xs font-medium text-gray-600 dark:text-gray-400',
  // Truncate
  props.truncate ? 'truncate' : '',
  // Border for bordered tables
  context?.bordered ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : '',
  // Sticky column
  props.sticky ? 'sticky bg-white dark:bg-gray-900 z-10' : '',
  // Custom className
  props.className || '',
])

const tdStyles = computed(() => ({
  width: props.width,
  maxWidth: props.truncate ? props.width || '200px' : undefined,
  left: props.sticky ? props.stickyLeft : undefined,
}))
</script>

<template>
  <td
    v-bind="attrs"
    :class="tdClasses"
    :style="tdStyles"
    :colspan="colspan"
    :rowspan="rowspan"
  >
    <slot />
  </td>
</template>
