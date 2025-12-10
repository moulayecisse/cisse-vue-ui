<script lang="ts" setup>
import { ref, provide } from 'vue'

export type AccordionMode = 'single' | 'multiple'

const props = withDefaults(
  defineProps<{
    /** Allow single or multiple items open */
    mode?: AccordionMode
    /** Default open items (array of keys) */
    defaultOpen?: string[]
  }>(),
  {
    mode: 'single',
    defaultOpen: () => [],
  },
)

const openItems = ref<Set<string>>(new Set(props.defaultOpen))

const toggle = (key: string) => {
  if (openItems.value.has(key)) {
    openItems.value.delete(key)
  } else {
    if (props.mode === 'single') {
      openItems.value.clear()
    }
    openItems.value.add(key)
  }
  // Force reactivity
  openItems.value = new Set(openItems.value)
}

const isOpen = (key: string) => openItems.value.has(key)

provide('accordion', {
  toggle,
  isOpen,
})
</script>

<template>
  <div class="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
    <slot />
  </div>
</template>
