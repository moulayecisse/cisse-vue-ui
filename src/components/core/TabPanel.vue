<script lang="ts" setup>
import { inject, computed, type Ref } from 'vue'

const props = defineProps<{
  /** Tab key this panel belongs to */
  value: string
}>()

const activeTab = inject<Ref<string>>('activeTab')

const isActive = computed(() => activeTab?.value === props.value)
</script>

<template>
  <div
    v-show="isActive"
    role="tabpanel"
  >
    <slot />
  </div>
</template>
