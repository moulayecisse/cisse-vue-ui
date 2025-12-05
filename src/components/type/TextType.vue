<script lang="ts" setup>
/**
 * Text type component - default text rendering
 */
defineProps<{
  value: unknown
}>()
</script>

<template>
  <span>{{ value ?? '' }}</span>
</template>
