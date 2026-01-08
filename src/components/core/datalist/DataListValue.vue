<script lang="ts" setup>
export type DataListValueSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Size variant */
    size?: DataListValueSize
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
  <dd
    :class="[
      'mt-1 text-gray-700 dark:text-gray-300 col-span-2 sm:mt-0',
      sizeClasses[size],
      props.class,
    ]"
  >
    <slot />
  </dd>
</template>
