<script lang="ts" setup>
defineProps<{
  /** ID for aria-describedby linking */
  id?: string
  error?: boolean
  text?: string
}>()
</script>

<template>
  <p
    :id="id"
    :data-error="error"
    :role="error ? 'alert' : undefined"
    :aria-live="error ? 'polite' : undefined"
    class="mt-2 text-sm text-gray-400 peer-user-invalid:visible data-[error=true]:text-red-500 dark:text-gray-500"
  >
    <slot>{{ text ?? '' }}</slot>
  </p>
</template>
