<script lang="ts" setup>
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

withDefaults(
  defineProps<{
    /** Position of the caption */
    position?: 'top' | 'bottom'
    /** Visually hide caption but keep for screen readers */
    srOnly?: boolean
  }>(),
  {
    position: 'top',
    srOnly: false,
  }
)

const attrs = useAttrs()
</script>

<template>
  <caption
    v-bind="attrs"
    :class="[
      position === 'bottom' ? 'caption-bottom' : 'caption-top',
      srOnly ? 'sr-only' : 'py-2 text-sm text-gray-600 dark:text-gray-400',
    ]"
  >
    <slot />
  </caption>
</template>
