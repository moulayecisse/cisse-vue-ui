<script lang="ts" setup>
defineProps<{
  error?: boolean
  text?: string
}>()
</script>

<template>
  <p
    :data-error="error"
    class="mt-2 text-sm text-gray-400 peer-user-invalid:visible data-[error=true]:text-red-500 dark:text-gray-500"
  >
    <slot>{{ text ?? '' }}</slot>
  </p>
</template>
