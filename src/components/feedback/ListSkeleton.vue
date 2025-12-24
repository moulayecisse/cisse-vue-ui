<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Number of items */
    items?: number
    /** Show avatar/icon placeholder */
    showAvatar?: boolean
    /** Show secondary text */
    showSecondary?: boolean
    /** Show action button */
    showAction?: boolean
  }>(),
  {
    items: 5,
    showAvatar: true,
    showSecondary: true,
    showAction: false,
  },
)
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700" aria-hidden="true">
    <div
      v-for="item in items"
      :key="item"
      class="flex items-center gap-4 py-4 px-4"
    >
      <!-- Avatar -->
      <div
        v-if="showAvatar"
        class="shrink-0 size-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"
      />

      <!-- Content -->
      <div class="flex-1 min-w-0 space-y-2">
        <div
          class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          :style="{ width: `${60 + Math.random() * 30}%` }"
        />
        <div
          v-if="showSecondary"
          class="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          :style="{ width: `${40 + Math.random() * 20}%` }"
        />
      </div>

      <!-- Action -->
      <div
        v-if="showAction"
        class="shrink-0 size-8 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
      />
    </div>
  </div>
</template>
