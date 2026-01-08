<script lang="ts" setup>
import DataListLabel from './DataListLabel.vue'
import DataListValue from './DataListValue.vue'

export type DataListItemSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Label text */
    label?: string
    /** Value text */
    value?: string
    /** Size variant */
    size?: DataListItemSize
    /** Apply striped background */
    striped?: boolean
    /** Custom class */
    class?: string
  }>(),
  {
    size: 'md',
    striped: false,
  }
)

const sizeClasses = {
  sm: 'px-3 py-3 sm:gap-3',
  md: 'px-4 py-4 sm:gap-4',
  lg: 'px-6 py-6 sm:gap-6',
}
</script>

<template>
  <div
    :class="[
      'sm:grid sm:grid-cols-3',
      sizeClasses[size],
      striped && 'even:bg-gray-50 dark:even:bg-gray-900',
      props.class,
    ]"
  >
    <slot>
      <DataListLabel v-if="label" :size="size">{{ label }}</DataListLabel>
      <DataListValue v-if="value" :size="size">{{ value }}</DataListValue>
    </slot>
  </div>
</template>
