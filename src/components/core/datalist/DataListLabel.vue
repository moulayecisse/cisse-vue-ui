<script lang="ts" setup>
export type DataListLabelSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Size variant */
    size?: DataListLabelSize
    /** Custom class */
    class?: string
  }>(),
  {
    size: 'md',
  }
)

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}
</script>

<template>
  <dt
    :class="[
      'font-medium text-gray-900 dark:text-gray-100',
      sizeClasses[size],
      props.class,
    ]"
  >
    <slot />
  </dt>
</template>
