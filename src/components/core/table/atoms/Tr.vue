<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { TableContextKey, type TableContext } from './Table.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Whether the row is selected */
    selected?: boolean
    /** Make the row clickable with hover cursor */
    clickable?: boolean
    /** Disable the row */
    disabled?: boolean
    /** Whether this is an even row (for striped tables, auto-detected if not provided) */
    even?: boolean
  }>(),
  {
    selected: false,
    clickable: false,
    disabled: false,
  }
)

const attrs = useAttrs()

const emit = defineEmits<{
  /** Emitted when the row is clicked (if clickable) */
  click: [event: MouseEvent]
}>()

const context = inject<TableContext>(TableContextKey)

const rowClasses = computed(() => [
  'transition-colors',
  // Hover effect
  context?.hover && !props.disabled ? 'hover:bg-black/5 dark:hover:bg-white/5' : '',
  // Selected state
  props.selected ? 'bg-primary-50 dark:bg-primary-900/20' : '',
  // Striped (only apply if not selected)
  context?.striped && props.even && !props.selected ? 'bg-black/[0.02] dark:bg-white/[0.02]' : '',
  // Clickable
  props.clickable && !props.disabled ? 'cursor-pointer' : '',
  // Disabled
  props.disabled ? 'opacity-50 cursor-not-allowed' : '',
])

const handleClick = (event: MouseEvent) => {
  if (props.clickable && !props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <tr
    v-bind="attrs"
    :class="rowClasses"
    @click="handleClick"
  >
    <slot />
  </tr>
</template>
