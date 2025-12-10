<script lang="ts" setup>
import { computed } from 'vue'

export type ProgressSize = 'sm' | 'md' | 'lg'
export type ProgressVariant = 'default' | 'success' | 'warning' | 'error'

const props = withDefaults(
  defineProps<{
    /** Current value (0-100) */
    value: number
    /** Maximum value */
    max?: number
    /** Size variant */
    size?: ProgressSize
    /** Color variant */
    variant?: ProgressVariant
    /** Show percentage label */
    showLabel?: boolean
    /** Striped animation */
    striped?: boolean
    /** Animated stripes */
    animated?: boolean
    /** Indeterminate state (loading) */
    indeterminate?: boolean
  }>(),
  {
    max: 100,
    size: 'md',
    variant: 'default',
    showLabel: false,
    striped: false,
    animated: false,
    indeterminate: false,
  },
)

const percentage = computed(() => {
  if (props.indeterminate) return 100
  return Math.min(Math.max((props.value / props.max) * 100, 0), 100)
})

const sizeClasses: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-4',
}

const variantClasses: Record<ProgressVariant, string> = {
  default: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
}
</script>

<template>
  <div class="w-full">
    <div v-if="showLabel && !indeterminate" class="mb-1 flex justify-between text-sm">
      <span class="text-gray-600 dark:text-gray-400">Progress</span>
      <span class="font-medium text-gray-900 dark:text-white">{{ Math.round(percentage) }}%</span>
    </div>
    <div
      :class="[
        'w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
        sizeClasses[size],
      ]"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : value"
      :aria-valuemin="0"
      :aria-valuemax="max"
    >
      <div
        :class="[
          'h-full rounded-full transition-all duration-300',
          variantClasses[variant],
          striped && 'bg-stripes',
          animated && 'animate-stripes',
          indeterminate && 'animate-indeterminate',
        ]"
        :style="{ width: indeterminate ? '30%' : `${percentage}%` }"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-stripes {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.animate-stripes {
  animation: stripes 1s linear infinite;
}

@keyframes stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}

.animate-indeterminate {
  animation: indeterminate 1.5s ease-in-out infinite;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}
</style>
