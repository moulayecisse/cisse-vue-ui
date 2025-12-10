<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import CardComponent from './CardComponent.vue'

const props = withDefaults(
  defineProps<{
    /** Card title */
    title?: string
    /** Card description */
    description?: string
    /** Whether the card is initially expanded */
    defaultExpanded?: boolean
  }>(),
  {
    defaultExpanded: true,
  },
)

const isExpanded = ref(props.defaultExpanded)

const toggle = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <CardComponent
    :title="title"
    :description="description"
  >
    <template #actions>
      <slot name="actions" />
      <button
        type="button"
        class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        @click="toggle"
      >
        <Icon
          :icon="isExpanded ? 'lucide:chevron-up' : 'lucide:chevron-down'"
          class="size-5"
        />
      </button>
    </template>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[2000px]"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 max-h-[2000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div
        v-show="isExpanded"
        class="overflow-hidden"
      >
        <div class="space-y-4 p-6">
          <slot />
        </div>
      </div>
    </Transition>
  </CardComponent>
</template>
