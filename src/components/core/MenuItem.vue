<script lang="ts" setup>
import { computed, resolveComponent } from 'vue'
import { Icon } from '@iconify/vue'
import type { MenuItemProps } from '@/types'

const props = withDefaults(
  defineProps<{
    menuItem: MenuItemProps
    /** Whether sidebar is expanded (shows labels) */
    expanded?: boolean
    /** Override active state directly */
    active?: boolean
    /** Current route path (pass from parent using useRoute().path) */
    currentPath?: string
  }>(),
  {
    expanded: true,
    active: undefined,
    currentPath: undefined,
  },
)

const isRouteActive = computed(() => {
  // If active prop is explicitly set, use it
  if (props.active !== undefined) {
    return props.active
  }

  // Use currentPath prop if provided, otherwise fall back to window.location
  const path = props.currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')

  if (props.menuItem.link === '/') {
    return path === '/'
  }
  return path === props.menuItem.link || path.startsWith(props.menuItem.link + '/')
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
    return { href: props.menuItem.link }
  }
  return { to: props.menuItem.link }
})
</script>

<template>
  <component
    :is="linkComponent"
    v-bind="linkProps"
    :class="expanded ? 'flex-row' : 'flex-col'"
    class="group relative flex items-center justify-center gap-2 px-5"
  >
    <div class="relative">
      <Icon
        :class="[
          isRouteActive
            ? 'text-white'
            : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500',
          expanded ? 'size-6' : 'size-8',
        ]"
        class="transition-all duration-300"
        :icon="menuItem.icon"
      />

      <span
        v-if="menuItem.notification"
        class="absolute top-0.25 right-0.25 size-1.5 rounded-full bg-red-600"
      />
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-2"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-2"
    >
      <span
        v-if="expanded"
        :class="
          isRouteActive
            ? 'text-white'
            : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500'
        "
        class="text-sm font-semibold whitespace-nowrap"
      >{{ menuItem.label }}</span>
    </Transition>
  </component>
</template>
