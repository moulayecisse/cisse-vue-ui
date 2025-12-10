<script lang="ts" setup>
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

withDefaults(
  defineProps<{
    /** Variant style */
    variant?: SkeletonVariant
    /** Width (CSS value) */
    width?: string
    /** Height (CSS value) */
    height?: string
    /** Number of lines (for text variant) */
    lines?: number
    /** Animate the skeleton */
    animate?: boolean
  }>(),
  {
    variant: 'text',
    animate: true,
    lines: 1,
  },
)

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded',
  circular: 'rounded-full',
  rectangular: '',
  rounded: 'rounded-lg',
}
</script>

<template>
  <div
    v-if="variant === 'text' && lines > 1"
    class="space-y-2"
  >
    <div
      v-for="i in lines"
      :key="i"
      :class="[
        'bg-gray-200 dark:bg-gray-700',
        variantClasses[variant],
        animate && 'animate-pulse',
      ]"
      :style="{
        width: i === lines ? '75%' : width || '100%',
        height: height,
      }"
    />
  </div>
  <div
    v-else
    :class="[
      'bg-gray-200 dark:bg-gray-700',
      variantClasses[variant],
      animate && 'animate-pulse',
    ]"
    :style="{
      width: width || (variant === 'circular' ? '3rem' : '100%'),
      height: height || (variant === 'circular' ? '3rem' : variant === 'text' ? '1rem' : '6rem'),
    }"
  />
</template>
