<script lang="ts" setup>
import { computed, resolveComponent, ref, useSlots } from 'vue'
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
    /** Nesting depth level (used internally for indentation) */
    depth?: number
  }>(),
  {
    expanded: true,
    active: undefined,
    currentPath: undefined,
    depth: 0,
  },
)

const slots = useSlots()
const submenuOpen = ref(false)

const hasSlotContent = computed(() => !!slots.submenu)

const hasChildren = computed(() => {
  return props.menuItem.children && props.menuItem.children.length > 0
})

const hasSubmenu = computed(() => hasChildren.value || hasSlotContent.value)

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

// Check if any child is active (to highlight parent)
const isChildActive = computed(() => {
  if (!hasChildren.value) return false

  const path = props.currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')

  const checkActive = (items: MenuItemProps[]): boolean => {
    return items.some((item) => {
      if (item.link === path || path.startsWith(item.link + '/')) {
        return true
      }
      if (item.children) {
        return checkActive(item.children)
      }
      return false
    })
  }

  return checkActive(props.menuItem.children!)
})

// Try to resolve RouterLink, fallback to 'a' tag
const linkComponent = computed(() => {
  if (hasSubmenu.value) {
    return 'button'
  }
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
  if (hasSubmenu.value) {
    return { type: 'button' as const }
  }
  if (linkComponent.value === 'a') {
    return { href: props.menuItem.link }
  }
  return { to: props.menuItem.link }
})

const toggleSubmenu = () => {
  if (hasSubmenu.value) {
    submenuOpen.value = !submenuOpen.value
  }
}

const paddingLeft = computed(() => {
  if (!props.expanded) return undefined
  const basePadding = 20 // px-5 = 20px
  const indentPerLevel = 16 // 16px per nesting level
  return `${basePadding + props.depth * indentPerLevel}px`
})
</script>

<template>
  <div class="w-full">
    <component
      :is="linkComponent"
      v-bind="linkProps"
      :class="expanded ? 'flex-row' : 'flex-col'"
      :style="expanded ? { paddingLeft } : undefined"
      class="group relative flex w-full items-center justify-center gap-2 pr-5 py-2"
      @click="toggleSubmenu"
    >
      <div class="relative">
        <Icon
          :class="[
            isRouteActive || isChildActive
              ? 'text-white'
              : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500',
            expanded ? 'size-5' : 'size-8',
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
            isRouteActive || isChildActive
              ? 'text-white'
              : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500'
          "
          class="flex-1 text-left text-sm font-semibold whitespace-nowrap"
        >{{ menuItem.label }}</span>
      </Transition>

      <!-- Chevron for submenu -->
      <Icon
        v-if="hasSubmenu && expanded"
        :class="[
          submenuOpen ? 'rotate-90' : '',
          isRouteActive || isChildActive
            ? 'text-white'
            : 'text-white/50 group-hover:text-white/80 dark:text-gray-700 dark:group-hover:text-gray-500',
        ]"
        class="size-4 transition-transform duration-200"
        icon="lucide:chevron-right"
      />
    </component>

    <!-- Submenu content -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-96"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-96"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-if="hasSubmenu && submenuOpen && expanded"
        class="overflow-hidden"
      >
        <!-- Slot for custom submenu content -->
        <slot
          name="submenu"
          :depth="depth + 1"
          :expanded="expanded"
          :current-path="currentPath"
        />

        <!-- Default children from prop -->
        <MenuItem
          v-for="(child, index) in menuItem.children"
          :key="index"
          :menu-item="child"
          :expanded="expanded"
          :current-path="currentPath"
          :depth="depth + 1"
        />
      </div>
    </Transition>
  </div>
</template>
