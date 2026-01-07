<script lang="ts" setup>
import { useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
</script>

<template>
  <colgroup v-bind="attrs">
    <slot />
  </colgroup>
</template>
