<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { useDarkMode } from '@/composables/useDarkMode'

export type DarkModeToggleSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Toggle size */
    size?: DarkModeToggleSize
    /** Light mode icon */
    lightIcon?: string
    /** Dark mode icon */
    darkIcon?: string
    /** Show label */
    showLabel?: boolean
    /** Storage key for persistence */
    storageKey?: string
  }>(),
  {
    size: 'md',
    lightIcon: 'lucide:sun',
    darkIcon: 'lucide:moon',
    showLabel: false,
    storageKey: 'dark-mode',
  },
)

const { isDark, toggle } = useDarkMode({ storageKey: props.storageKey })

const sizeClasses: Record<DarkModeToggleSize, { button: string; icon: string }> = {
  sm: { button: 'p-1.5', icon: 'h-4 w-4' },
  md: { button: 'p-2', icon: 'h-5 w-5' },
  lg: { button: 'p-2.5', icon: 'h-6 w-6' },
}
</script>

<template>
  <button
    type="button"
    :class="[
      sizeClasses[size].button,
      'inline-flex items-center gap-2 rounded-lg transition-colors',
      'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      'dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    ]"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <Icon
      :icon="isDark ? darkIcon : lightIcon"
      :class="sizeClasses[size].icon"
    />
    <span v-if="showLabel" class="text-sm font-medium">
      {{ isDark ? 'Dark' : 'Light' }}
    </span>
  </button>
</template>
