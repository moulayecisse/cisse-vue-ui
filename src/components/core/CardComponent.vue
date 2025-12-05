<script lang="ts" setup>
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-900">
    <div
      v-if="title || description || $slots.title || $slots.description || $slots.actions"
      class="flex items-center justify-between border-b border-gray-200 px-5 py-3 dark:border-gray-700"
    >
      <div class="flex flex-col gap-0.5">
        <span
          v-if="title || $slots.title"
          class="text-md font-semibold text-gray-800 dark:text-gray-200"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </span>

        <span
          v-if="description || $slots.description"
          class="text-sm font-normal text-gray-600 dark:text-gray-400"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </span>
      </div>

      <div class="flex gap-2">
        <slot name="actions" />
      </div>
    </div>

    <slot />
  </div>
</template>
