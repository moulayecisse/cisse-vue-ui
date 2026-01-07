<script lang="ts" setup>
import { inject, computed, useAttrs } from 'vue'
import { TableContextKey, type TableContext } from './Table.vue'

defineOptions({
  inheritAttrs: false,
})

const context = inject<TableContext>(TableContextKey)
const attrs = useAttrs()

const tbodyClasses = computed(() => [
  'font-medium',
  context?.bordered
    ? 'divide-y divide-gray-200 dark:divide-gray-700'
    : 'divide-y divide-black/10 dark:divide-white/10',
])
</script>

<template>
  <tbody
    v-bind="attrs"
    :class="tbodyClasses"
  >
    <slot />
  </tbody>
</template>
