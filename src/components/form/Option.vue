<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Option value */
    value?: string | number
    /** Whether the option is disabled */
    disabled?: boolean
    /** Whether the option is selected (for uncontrolled usage) */
    selected?: boolean
    /** Custom class */
    class?: string
  }>(),
  {}
)
</script>

<template>
  <option
    :value="value"
    :disabled="disabled"
    :selected="selected"
    :class="[
      'appearance-none py-1.5 pr-8 pl-3 bg-white dark:bg-gray-900',
      'text-base text-gray-900 dark:text-gray-100 sm:text-sm/6',
      'hover:bg-gray-100 dark:hover:bg-gray-800',
      $props.class,
    ]"
  >
    <slot />
  </option>
</template>
