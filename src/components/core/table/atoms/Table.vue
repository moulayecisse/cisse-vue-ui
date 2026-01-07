<script lang="ts">
import type { InjectionKey } from 'vue'

export interface TableContext {
  striped: boolean
  bordered: boolean
  hover: boolean
  compact: boolean
  stickyHeader: boolean
}

export const TableContextKey: InjectionKey<TableContext> = Symbol('TableContext')
</script>

<script lang="ts" setup>
import { computed, provide, reactive, toRefs, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    striped: false,
    bordered: false,
    hover: true,
    compact: false,
    stickyHeader: false,
  }
)

const tableClasses = computed(() => [
  'w-full text-left',
  props.bordered ? 'border border-gray-200 dark:border-gray-700' : '',
])

const wrapperClasses = computed(() => [
  'overflow-hidden',
  props.stickyHeader ? 'max-h-[600px] overflow-y-auto' : '',
])

// Provide reactive context to child components
const { striped, bordered, hover, compact, stickyHeader } = toRefs(props)
provide(TableContextKey, reactive({
  striped,
  bordered,
  hover,
  compact,
  stickyHeader,
}) as TableContext)
</script>

<template>
  <div :class="wrapperClasses">
    <div class="overflow-x-auto">
      <table
        v-bind="attrs"
        :class="tableClasses"
      >
        <slot />
      </table>
    </div>
  </div>
</template>
