<script lang="ts" setup>
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    /** Message to display */
    message?: string
    /** Icon name (iconify format) */
    icon?: string
    /** Title text */
    title?: string
  }>(),
  {
    message: 'No results found',
    icon: 'lucide:inbox',
  },
)
</script>

<template>
  <div class="py-12 text-center">
    <Icon
      v-if="icon"
      :icon="icon"
      class="mx-auto mb-4 size-12 text-gray-400 dark:text-gray-500"
    />
    <h3 v-if="title" class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
      {{ title }}
    </h3>
    <p class="text-gray-500 dark:text-gray-400">
      <slot>{{ message }}</slot>
    </p>
    <div v-if="$slots.action" class="mt-4">
      <slot name="action" />
    </div>
  </div>
</template>
