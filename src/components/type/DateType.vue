<script lang="ts" setup>
/**
 * Date type component - formatted date display
 */
const { value, format = 'date', locale = 'en-US' } = defineProps<{
  value: unknown
  format?: 'date' | 'datetime' | 'time'
  locale?: string
}>()

const formattedValue = () => {
  if (!value) return ''

  try {
    const date = new Date(String(value))
    if (isNaN(date.getTime())) return String(value)

    switch (format) {
      case 'datetime':
        return date.toLocaleString(locale)
      case 'time':
        return date.toLocaleTimeString(locale)
      default:
        return date.toLocaleDateString(locale)
    }
  } catch {
    return ''
  }
}
</script>

<template>
  <span>{{ formattedValue() }}</span>
</template>
