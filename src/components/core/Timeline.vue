<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export type TimelineItemStatus = 'completed' | 'current' | 'upcoming' | 'error'

export interface TimelineItem {
  key: string
  title: string
  description?: string
  date?: string
  icon?: string
  status?: TimelineItemStatus
}

withDefaults(
  defineProps<{
    /** Array of timeline items */
    items: TimelineItem[]
    /** Orientation of the timeline */
    orientation?: 'vertical' | 'horizontal'
  }>(),
  {
    orientation: 'vertical',
  },
)

const getStatusClasses = (status?: TimelineItemStatus) => {
  switch (status) {
    case 'completed':
      return {
        dot: 'bg-green-500',
        line: 'bg-green-500',
        icon: 'text-white',
      }
    case 'current':
      return {
        dot: 'bg-primary-500 ring-4 ring-primary-100 dark:ring-primary-900',
        line: 'bg-gray-200 dark:bg-gray-700',
        icon: 'text-white',
      }
    case 'error':
      return {
        dot: 'bg-red-500',
        line: 'bg-red-500',
        icon: 'text-white',
      }
    default:
      return {
        dot: 'bg-gray-300 dark:bg-gray-600',
        line: 'bg-gray-200 dark:bg-gray-700',
        icon: 'text-gray-500 dark:text-gray-400',
      }
  }
}

const getDefaultIcon = (status?: TimelineItemStatus) => {
  switch (status) {
    case 'completed':
      return 'heroicons:check'
    case 'error':
      return 'heroicons:x-mark'
    default:
      return ''
  }
}
</script>

<template>
  <!-- Vertical Timeline -->
  <div v-if="orientation === 'vertical'" class="relative">
    <div
      v-for="(item, index) in items"
      :key="item.key"
      class="relative pb-8 last:pb-0"
    >
      <!-- Connecting line -->
      <div
        v-if="index < items.length - 1"
        class="absolute left-4 top-8 w-0.5 h-full -ml-px"
        :class="getStatusClasses(item.status).line"
      />

      <div class="flex items-start gap-4">
        <!-- Dot/Icon -->
        <div
          class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
          :class="getStatusClasses(item.status).dot"
        >
          <Icon
            v-if="item.icon || getDefaultIcon(item.status)"
            :icon="item.icon || getDefaultIcon(item.status)"
            class="w-4 h-4"
            :class="getStatusClasses(item.status).icon"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0 pt-0.5">
          <div class="flex items-center justify-between gap-2">
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ item.title }}
            </h3>
            <time
              v-if="item.date"
              class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap"
            >
              {{ item.date }}
            </time>
          </div>
          <p
            v-if="item.description"
            class="mt-1 text-sm text-gray-600 dark:text-gray-400"
          >
            {{ item.description }}
          </p>
          <slot :name="item.key" :item="item" />
        </div>
      </div>
    </div>
  </div>

  <!-- Horizontal Timeline -->
  <div v-else class="flex items-start overflow-x-auto pb-4">
    <div
      v-for="(item, index) in items"
      :key="item.key"
      class="flex flex-col items-center flex-shrink-0"
      :class="{ 'flex-1': index < items.length - 1 }"
    >
      <div class="flex items-center w-full">
        <!-- Dot/Icon -->
        <div
          class="relative z-10 flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
          :class="getStatusClasses(item.status).dot"
        >
          <Icon
            v-if="item.icon || getDefaultIcon(item.status)"
            :icon="item.icon || getDefaultIcon(item.status)"
            class="w-4 h-4"
            :class="getStatusClasses(item.status).icon"
          />
        </div>

        <!-- Connecting line -->
        <div
          v-if="index < items.length - 1"
          class="flex-1 h-0.5 mx-2"
          :class="getStatusClasses(item.status).line"
        />
      </div>

      <!-- Content -->
      <div class="mt-2 text-center max-w-[120px]">
        <h3 class="text-xs font-medium text-gray-900 dark:text-white">
          {{ item.title }}
        </h3>
        <time
          v-if="item.date"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          {{ item.date }}
        </time>
      </div>
    </div>
  </div>
</template>
