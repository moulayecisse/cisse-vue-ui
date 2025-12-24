<script lang="ts" setup>
import { computed } from 'vue'
import type { SpinnerSize } from '@/types'

const props = withDefaults(
  defineProps<{
    text?: string
    size?: SpinnerSize
    /** Accessible label for screen readers (defaults to 'Loading' or text prop) */
    ariaLabel?: string
  }>(),
  {
    size: 'md',
    ariaLabel: 'Loading',
  },
)

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
}

const accessibleLabel = computed(() => props.text || props.ariaLabel)
</script>

<template>
  <div
    class="flex items-center justify-center py-12"
    role="status"
    aria-live="polite"
    :aria-label="accessibleLabel"
  >
    <div class="text-center">
      <div
        :class="sizeClasses[size]"
        class="border-primary inline-block animate-spin rounded-full border-4 border-solid border-r-transparent"
        aria-hidden="true"
      />
      <p
        v-if="text"
        class="mt-4 text-gray-600 dark:text-gray-400"
      >
        {{ text }}
      </p>
      <span v-else class="sr-only">{{ accessibleLabel }}</span>
    </div>
  </div>
</template>
