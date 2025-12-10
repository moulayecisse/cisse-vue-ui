<script lang="ts" setup>
import type { SpinnerSize } from '@/types'

const { text, size = 'md' } = defineProps<{
  text?: string
  size?: SpinnerSize
}>()

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
}
</script>

<template>
  <div class="flex items-center justify-center py-12">
    <div class="text-center">
      <div
        :class="sizeClasses[size]"
        class="border-primary inline-block animate-spin rounded-full border-4 border-solid border-r-transparent"
      />
      <p
        v-if="text"
        class="mt-4 text-gray-600 dark:text-gray-400"
      >
        {{ text }}
      </p>
    </div>
  </div>
</template>
