<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { TableContextKey, type TableContext } from './Table.vue'

defineOptions({
  inheritAttrs: false,
})

const context = inject<TableContext>(TableContextKey)
const attrs = useAttrs()

const tfootClasses = computed(() => [
  'text-sm font-medium text-gray-600 dark:text-gray-400',
  context?.bordered
    ? 'border-t border-gray-200 dark:border-gray-700'
    : 'border-t border-black/10 dark:border-white/10',
])
</script>

<template>
  <tfoot
    v-bind="attrs"
    :class="tfootClasses"
    class="bg-black/5 dark:bg-white/5"
  >
    <slot />
  </tfoot>
</template>
