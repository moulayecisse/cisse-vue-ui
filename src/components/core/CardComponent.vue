<script lang="ts" setup>
import { computed } from 'vue'
import CardSkeleton from '@/components/feedback/CardSkeleton.vue'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    titleClass?: string
    dividerClass?: string
    /** Show loading skeleton */
    loading?: boolean
    /** Number of skeleton lines */
    loadingLines?: number
    /** Show avatar in skeleton */
    loadingAvatar?: boolean
    /** Show actions in skeleton */
    loadingActions?: boolean
  }>(),
  {
    loading: false,
    loadingLines: 3,
    loadingAvatar: false,
    loadingActions: false,
  },
)

const titleClasses = computed(() =>
  props.titleClass || 'text-gray-800 dark:text-gray-200'
)

const dividerClasses = computed(() =>
  props.dividerClass || 'border-gray-200 dark:border-gray-700'
)
</script>

<template>
  <!-- Loading State -->
  <CardSkeleton
    v-if="loading"
    :lines="loadingLines"
    :show-avatar="loadingAvatar"
    :show-actions="loadingActions"
  />

  <!-- Content -->
  <div v-else class="flex flex-col overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-950">
    <!-- Custom header slot (replaces standard header) -->
    <div
      v-if="$slots.header"
      class="border-b"
      :class="dividerClasses"
    >
      <slot name="header" />
    </div>

    <!-- Standard header with title/description/actions -->
    <div
      v-else-if="title || description || $slots.title || $slots.description || $slots.actions"
      class="flex items-center justify-between border-b px-5 py-3"
      :class="dividerClasses"
    >
      <div class="flex flex-col gap-0.5">
        <span
          v-if="title || $slots.title"
          class="text-md font-semibold"
          :class="titleClasses"
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
