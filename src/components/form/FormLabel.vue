<script lang="ts" setup>
defineProps<{
  error?: string | boolean
  htmlFor?: string
}>()
</script>

<template>
  <label
    :data-error="!!error"
    :for="htmlFor ?? ''"
    class="block text-sm font-medium text-gray-700 data-[error=true]:text-red-500 dark:text-gray-300"
  >
    <slot />
  </label>
</template>
