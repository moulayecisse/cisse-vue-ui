<script lang="ts" setup>
import { computed, resolveComponent } from 'vue'
import { Icon } from '@iconify/vue'
import type { TableActionColor } from '@/types'

const { color, icon, link } = defineProps<{
  link?: string
  icon: string
  color?: TableActionColor
}>()

const colorClass = computed(() => {
  switch (color) {
    case 'info':
      return 'border-blue-200 hover:bg-blue-100 dark:border-blue-800 dark:hover:bg-blue-900'
    case 'warning':
      return 'border-yellow-200 hover:bg-yellow-100 dark:border-yellow-800 dark:hover:bg-yellow-900'
    case 'success':
      return 'border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900'
    case 'error':
      return 'border-red-200 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-900'
    default:
      return 'border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800'
  }
})

const iconColorClass = computed(() => {
  switch (color) {
    case 'info':
      return 'text-blue-600 group-hover:text-blue-900 dark:text-blue-400 dark:group-hover:text-blue-100'
    case 'warning':
      return 'text-yellow-600 group-hover:text-yellow-900 dark:text-yellow-400 dark:group-hover:text-yellow-100'
    case 'success':
      return 'text-green-600 group-hover:text-green-900 dark:text-green-400 dark:group-hover:text-green-100'
    case 'error':
      return 'text-red-600 group-hover:text-red-900 dark:text-red-400 dark:group-hover:text-red-100'
    default:
      return 'text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100'
  }
})

// Try to resolve RouterLink, fallback to 'a' tag
const linkComponent = computed(() => {
  if (!link) return 'button'
  try {
    const RouterLink = resolveComponent('RouterLink')
    if (typeof RouterLink !== 'string') {
      return RouterLink
    }
  } catch {
    // RouterLink not available
  }
  return 'a'
})

const linkProps = computed(() => {
  if (!link) return {}
  if (linkComponent.value === 'a') {
    return { href: link }
  }
  return { to: link }
})
</script>

<template>
  <component
    :is="linkComponent"
    v-bind="linkProps"
    :class="colorClass"
    class="group flex size-8 items-center justify-center rounded-lg border"
  >
    <Icon :class="iconColorClass" :icon class="size-4" />
  </component>
</template>
