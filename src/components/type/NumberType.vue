<script lang="ts" setup>
/**
 * Number type component - formatted number display
 */
const { value, locale = 'en-US' } = defineProps<{
  value: unknown
  locale?: string
}>()

const formattedValue = () => {
  if (value === null || value === undefined) return ''
  const num = Number(value)
  return isNaN(num) ? String(value) : num.toLocaleString(locale)
}
</script>

<template>
  <span>{{ formattedValue() }}</span>
</template>
