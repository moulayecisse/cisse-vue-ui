<script lang="ts" setup>
import { computed, useSlots } from 'vue'

export type InputGroupSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Size variant */
    size?: InputGroupSize
    /** Prefix text (e.g., "$", "https://") */
    prefix?: string
    /** Suffix text (e.g., ".com", "%") */
    suffix?: string
    /** Custom class for the group container */
    class?: string
  }>(),
  {
    size: 'md',
  }
)

const slots = useSlots() as {
  prefix?: () => unknown
  suffix?: () => unknown
  default?: () => unknown
}

const hasPrefix = computed(() => !!props.prefix || !!slots.prefix)
const hasSuffix = computed(() => !!props.suffix || !!slots.suffix)

const sizeClasses: Record<InputGroupSize, { addon: string; text: string }> = {
  sm: { addon: 'px-2.5 py-1.5', text: 'text-sm' },
  md: { addon: 'px-3 py-2', text: 'text-sm' },
  lg: { addon: 'px-4 py-3', text: 'text-base' },
}

const addonClasses = computed(() => [
  sizeClasses[props.size].addon,
  sizeClasses[props.size].text,
  'inline-flex items-center text-gray-500 dark:text-gray-400',
  'bg-gray-50 dark:bg-gray-800',
  'border border-gray-300 dark:border-gray-600',
])

const prefixClasses = computed(() => [
  ...addonClasses.value,
  'rounded-l-md border-r-0',
])

const suffixClasses = computed(() => [
  ...addonClasses.value,
  'rounded-r-md border-l-0',
])
</script>

<template>
  <div :class="['flex', props.class]">
    <!-- Prefix addon -->
    <span v-if="hasPrefix" :class="prefixClasses">
      <slot name="prefix">{{ prefix }}</slot>
    </span>

    <!-- Input slot -->
    <div
      :class="[
        'flex-1 min-w-0',
        hasPrefix && '[&>*]:rounded-l-none [&>*]:border-l-0',
        hasSuffix && '[&>*]:rounded-r-none [&>*]:border-r-0',
      ]"
    >
      <slot />
    </div>

    <!-- Suffix addon -->
    <span v-if="hasSuffix" :class="suffixClasses">
      <slot name="suffix">{{ suffix }}</slot>
    </span>
  </div>
</template>
