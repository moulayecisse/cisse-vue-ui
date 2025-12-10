<script lang="ts" setup>
import { Icon } from '@iconify/vue'

/**
 * Boolean type component - displays boolean as Yes/No with icons
 */
const {
  value,
  display = 'text',
  trueLabel = 'Yes',
  falseLabel = 'No',
} = defineProps<{
  value: unknown
  display?: 'text' | 'icon' | 'both'
  trueLabel?: string
  falseLabel?: string
}>()

const boolValue = Boolean(value)
const label = boolValue ? trueLabel : falseLabel
const icon = boolValue ? 'lucide:check-circle' : 'lucide:x-circle'
const colorClass = boolValue
  ? 'text-green-600 dark:text-green-400'
  : 'text-red-600 dark:text-red-400'
</script>

<template>
  <span
    :class="colorClass"
    class="inline-flex items-center gap-1"
  >
    <Icon
      v-if="display === 'icon' || display === 'both'"
      :icon="icon"
      class="h-4 w-4"
    />
    <span v-if="display === 'text' || display === 'both'">{{ label }}</span>
  </span>
</template>
