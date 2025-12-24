<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Show avatar/icon placeholder */
    showAvatar?: boolean
    /** Number of text lines */
    lines?: number
    /** Show action buttons */
    showActions?: boolean
  }>(),
  {
    showAvatar: false,
    lines: 3,
    showActions: false,
  },
)
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 space-y-4">
    <!-- Header with avatar -->
    <div v-if="showAvatar" class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3" />
      </div>
    </div>

    <!-- Content lines -->
    <div class="space-y-2">
      <div
        v-for="line in lines"
        :key="line"
        class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        :style="{ width: line === lines ? '60%' : '100%' }"
      />
    </div>

    <!-- Actions -->
    <div v-if="showActions" class="flex justify-end gap-2 pt-2">
      <div class="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div class="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    </div>
  </div>
</template>
