<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export interface StatItem {
  label: string
  value: string | number
  icon?: string
  change?: number
  changeLabel?: string
}

withDefaults(
  defineProps<{
    /** Stat label */
    label: string
    /** Stat value */
    value: string | number
    /** Icon name (iconify format) */
    icon?: string
    /** Percentage change (positive or negative) */
    change?: number
    /** Change label (e.g., "vs last month") */
    changeLabel?: string
    /** Visual variant */
    variant?: 'default' | 'glass' | 'solid' | 'outline'
    /** Color scheme for solid variant */
    color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  }>(),
  {
    variant: 'default',
    color: 'primary',
  }
)
</script>

<template>
  <div
    :class="[
      'rounded-2xl p-4 text-center transition-all',
      variant === 'default' && 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm',
      variant === 'glass' && 'bg-white/15 backdrop-blur-sm border border-white/20',
      variant === 'outline' && 'border-2 border-gray-200 dark:border-slate-600',
      variant === 'solid' && color === 'primary' && 'bg-primary-500 text-white',
      variant === 'solid' && color === 'success' && 'bg-emerald-500 text-white',
      variant === 'solid' && color === 'warning' && 'bg-amber-500 text-white',
      variant === 'solid' && color === 'danger' && 'bg-red-500 text-white',
      variant === 'solid' && color === 'info' && 'bg-blue-500 text-white',
    ]"
  >
    <!-- Icon -->
    <div
      v-if="icon"
      :class="[
        'size-10 mx-auto mb-2 rounded-xl flex items-center justify-center',
        variant === 'glass' && 'bg-white/20',
        variant === 'solid' && 'bg-white/20',
        variant === 'default' && color === 'primary' && 'bg-primary-100 dark:bg-primary-900/30',
        variant === 'default' && color === 'success' && 'bg-emerald-100 dark:bg-emerald-900/30',
        variant === 'default' && color === 'warning' && 'bg-amber-100 dark:bg-amber-900/30',
        variant === 'default' && color === 'danger' && 'bg-red-100 dark:bg-red-900/30',
        variant === 'default' && color === 'info' && 'bg-blue-100 dark:bg-blue-900/30',
        variant === 'outline' && 'bg-gray-100 dark:bg-slate-700',
      ]"
    >
      <Icon
        :icon="icon"
        :class="[
          'size-5',
          (variant === 'glass' || variant === 'solid') && 'text-white',
          variant === 'default' && color === 'primary' && 'text-primary-600 dark:text-primary-400',
          variant === 'default' && color === 'success' && 'text-emerald-600 dark:text-emerald-400',
          variant === 'default' && color === 'warning' && 'text-amber-600 dark:text-amber-400',
          variant === 'default' && color === 'danger' && 'text-red-600 dark:text-red-400',
          variant === 'default' && color === 'info' && 'text-blue-600 dark:text-blue-400',
          variant === 'outline' && 'text-gray-600 dark:text-gray-400',
        ]"
      />
    </div>

    <!-- Value -->
    <div
      :class="[
        'text-2xl sm:text-3xl font-bold',
        (variant === 'glass' || variant === 'solid') && 'text-white',
        (variant === 'default' || variant === 'outline') && 'text-gray-900 dark:text-white',
      ]"
    >
      <slot name="value">{{ value }}</slot>
    </div>

    <!-- Label -->
    <div
      :class="[
        'text-xs sm:text-sm',
        variant === 'glass' && 'text-white/80',
        variant === 'solid' && 'text-white/90',
        (variant === 'default' || variant === 'outline') && 'text-gray-500 dark:text-gray-400',
      ]"
    >
      <slot name="label">{{ label }}</slot>
    </div>

    <!-- Change indicator -->
    <div
      v-if="change !== undefined"
      :class="[
        'mt-2 text-xs font-medium inline-flex items-center gap-1',
        change >= 0 ? 'text-emerald-500' : 'text-red-500',
      ]"
    >
      <Icon
        :icon="change >= 0 ? 'heroicons:arrow-trending-up' : 'heroicons:arrow-trending-down'"
        class="size-3.5"
      />
      <span>{{ change >= 0 ? '+' : '' }}{{ change }}%</span>
      <span v-if="changeLabel" class="text-gray-400">{{ changeLabel }}</span>
    </div>
  </div>
</template>
