<script lang="ts" setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  /** Number of columns to span */
  span?: number | string
  /** Column width */
  width?: string
}>()

const attrs = useAttrs()

const colStyles = computed(() => ({
  width: props.width,
}))
</script>

<template>
  <col
    v-bind="attrs"
    :span="span"
    :style="colStyles"
  />
</template>
