<script lang="ts" setup>
import { computed, resolveComponent } from 'vue'
import { Icon } from '@iconify/vue'
import type { MenuItemProps } from '@/types'

const { menuItem } = defineProps<{ menuItem: MenuItemProps }>()

// Try to use useRoute if available
const isRouteActive = computed(() => {
  if (typeof window === 'undefined') return false
  const currentPath = window.location.pathname
  if (menuItem.link === '/') {
    return currentPath === '/'
  }
  return currentPath === menuItem.link || currentPath.startsWith(menuItem.link + '/')
})

// Try to resolve RouterLink, fallback to 'a' tag
const linkComponent = computed(() => {
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
  if (linkComponent.value === 'a') {
    return { href: menuItem.link }
  }
  return { to: menuItem.link }
})
</script>

<template>
  <component
    :is="linkComponent"
    v-bind="linkProps"
    class="group relative flex flex-col items-center justify-center gap-2 px-5 @min-[7rem]:flex-row"
  >
    <div class="relative">
      <Icon
        :class="
          isRouteActive
            ? 'text-white'
            : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500'
        "
        :icon="menuItem.icon"
        class="size-8 @min-[7rem]:size-6"
      />

      <span
        v-if="menuItem.notification"
        class="absolute top-0.25 right-0.25 size-1.5 rounded-full bg-red-600"
      ></span>
    </div>

    <span
      :class="
        isRouteActive
          ? 'text-white'
          : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500'
      "
      class="hidden text-[10px] font-semibold @min-[7rem]:block @min-[7rem]:text-sm"
      >{{ menuItem.label }}</span
    >
  </component>
</template>
