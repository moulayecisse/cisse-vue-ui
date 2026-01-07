<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { TableContextKey, type TableContext } from './Table.vue'

defineOptions({
  inheritAttrs: false,
})

const context = inject<TableContext>(TableContextKey)
const attrs = useAttrs()

const theadClasses = computed(() => [
  'text-sm font-semibold text-gray-600 uppercase dark:text-gray-400',
  context?.bordered
    ? 'border-b border-gray-200 dark:border-gray-700'
    : 'border-b border-black/10 dark:border-white/10',
  context?.stickyHeader ? 'sticky top-0 z-10' : '',
])
</script>

<template>
  <thead
    v-bind="attrs"
    :class="theadClasses"
    class="bg-black/5 dark:bg-white/5"
  >
    <slot />
  </thead>
</template>
