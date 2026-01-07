<script lang="ts" setup>
import Tr from '../atoms/Tr.vue'
import Td from '../atoms/Td.vue'

defineProps<{
  /** Number of columns to span */
  colSpan?: number
}>()
</script>

<template>
  <Tr>
    <Td
      :colspan="colSpan"
      class="text-center"
    >
      <slot />
    </Td>
  </Tr>
</template>
