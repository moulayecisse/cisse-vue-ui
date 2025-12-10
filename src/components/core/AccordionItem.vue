<script lang="ts" setup>
import { inject, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  /** Unique key for this item */
  itemKey: string
  /** Title shown in header */
  title: string
  /** Optional icon */
  icon?: string
  /** Disable this item */
  disabled?: boolean
}>()

const accordion = inject<{
  toggle: (key: string) => void
  isOpen: (key: string) => boolean
}>('accordion')

const isOpen = computed(() => accordion?.isOpen(props.itemKey) ?? false)

const toggle = () => {
  if (!props.disabled) {
    accordion?.toggle(props.itemKey)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <button
      type="button"
      class="flex items-center justify-between w-full px-4 py-3 text-left transition-colors"
      :class="[
        disabled
          ? 'bg-gray-50 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
          : 'bg-white hover:bg-gray-50 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white',
      ]"
      :disabled="disabled"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <span class="flex items-center gap-2 font-medium">
        <Icon v-if="icon" :icon="icon" class="w-5 h-5" />
        {{ title }}
      </span>
      <Icon
        icon="heroicons:chevron-down"
        class="w-5 h-5 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Content -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-show="isOpen"
        class="overflow-hidden"
      >
        <div class="px-4 py-3 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
