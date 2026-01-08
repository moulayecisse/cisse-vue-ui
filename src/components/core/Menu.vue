<script lang="ts" setup>
/**
 * Menu - Container component for navigation menu items
 *
 * Provides consistent styling and layout for MenuItem components.
 * Typically used in sidebar navigation.
 *
 * @example
 * <Menu>
 *   <MenuItem :menuItem="{ label: 'Dashboard', icon: 'lucide:home', link: '/' }" />
 *   <MenuItem :menuItem="{ label: 'Users', icon: 'lucide:users', link: '/users' }" />
 * </Menu>
 */
import { provide, computed } from 'vue'

export type MenuVariant = 'default' | 'compact' | 'pills'

const props = withDefaults(
  defineProps<{
    /** Visual style variant */
    variant?: MenuVariant
    /** Gap between menu items */
    gap?: 'none' | 'sm' | 'md' | 'lg'
    /** Whether the menu is in collapsed/compact mode (icons only) */
    collapsed?: boolean
  }>(),
  {
    variant: 'default',
    gap: 'sm',
    collapsed: false,
  },
)

// Provide collapsed state to children
provide('menuCollapsed', computed(() => props.collapsed))

const gapClasses: Record<string, string> = {
  none: 'gap-0',
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-4',
}
</script>

<template>
  <nav
    :class="[
      'flex flex-col',
      gapClasses[gap],
    ]"
    role="navigation"
  >
    <slot />
  </nav>
</template>
