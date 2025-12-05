<script lang="ts" setup>
import StatusBadge from '@/components/core/StatusBadge.vue'
import type { StatusBadgeVariant } from '@/types'

/**
 * Badge type component - displays value as a badge
 */
const { value, variant = 'default', formatter } = defineProps<{
  value: unknown
  variant?: StatusBadgeVariant
  formatter?: (value: unknown) => string
}>()

const displayValue = formatter ? formatter(value) : String(value ?? '')
</script>

<template>
  <StatusBadge :variant="variant">
    {{ displayValue }}
  </StatusBadge>
</template>
