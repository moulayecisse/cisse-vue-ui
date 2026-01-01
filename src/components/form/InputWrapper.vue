<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { Icon } from '@iconify/vue'

export type InputWrapperSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Icon on the left (Iconify format) */
    icon?: string
    /** Icon on the right (Iconify format) */
    iconRight?: string
    /** Input size */
    size?: InputWrapperSize
    /** Invalid/error state */
    invalid?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Custom wrapper classes */
    wrapperClass?: string
  }>(),
  {
    size: 'md',
  }
)

const slots = useSlots()

const hasLeftIcon = computed(() => props.icon || slots.icon)
const hasRightContent = computed(() => props.iconRight || slots.actions)

const inputClass = computed(() => [
  // Base styles
  'block w-full rounded-xl border text-sm transition-all',
  'border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400',
  'focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:bg-white focus:outline-hidden',
  'disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
  // Dark mode
  'dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500',
  'dark:focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:bg-slate-600',
  'dark:disabled:bg-slate-800 dark:disabled:text-gray-500',
  // Padding based on icons/actions
  hasLeftIcon.value ? 'pl-10' : 'pl-4',
  hasRightContent.value ? 'pr-10' : 'pr-4',
  // Size
  props.size === 'sm' && 'py-2 text-xs',
  props.size === 'md' && 'py-3 text-sm',
  props.size === 'lg' && 'py-4 text-base',
  // Invalid state
  props.invalid && 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500',
])

defineExpose({ inputClass })
</script>

<template>
  <div :class="['relative', wrapperClass]">
    <!-- Left icon -->
    <div
      v-if="hasLeftIcon"
      class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
    >
      <slot name="icon">
        <Icon v-if="icon" :icon="icon" class="size-5" />
      </slot>
    </div>

    <!-- Input slot with inputClass passed via scoped slot -->
    <slot :input-class="inputClass" />

    <!-- Right side: actions or icon -->
    <div
      v-if="hasRightContent"
      class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1"
    >
      <slot name="actions">
        <Icon
          v-if="iconRight"
          :icon="iconRight"
          class="size-5 text-gray-400 pointer-events-none"
        />
      </slot>
    </div>
  </div>
</template>
