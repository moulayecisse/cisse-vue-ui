<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Number of rows */
    rows?: number
    /** Number of columns */
    columns?: number
    /** Show header */
    showHeader?: boolean
  }>(),
  {
    rows: 5,
    columns: 4,
    showHeader: true,
  },
)
</script>

<template>
  <div class="w-full" aria-hidden="true">
    <!-- Header -->
    <div
      v-if="showHeader"
      class="flex gap-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700"
    >
      <div
        v-for="col in columns"
        :key="`header-${col}`"
        class="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        :style="{ maxWidth: col === 1 ? '30%' : '20%' }"
      />
    </div>
    <!-- Rows -->
    <div
      v-for="row in rows"
      :key="`row-${row}`"
      class="flex items-center gap-4 px-4 py-4 border-b border-gray-100 dark:border-gray-800"
    >
      <div
        v-for="col in columns"
        :key="`cell-${row}-${col}`"
        class="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
        :style="{
          maxWidth: col === 1 ? '40%' : col === columns ? '15%' : '25%',
          opacity: 1 - (row * 0.1)
        }"
      />
    </div>
  </div>
</template>
