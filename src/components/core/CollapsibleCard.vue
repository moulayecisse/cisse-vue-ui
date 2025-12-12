<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref, useSlots } from 'vue'
import CardComponent from './CardComponent.vue'

const props = withDefaults(
  defineProps<{
    /** Card title */
    title?: string
    /** Card description */
    description?: string
    /** Whether the card is initially expanded */
    defaultExpanded?: boolean
    /** Custom class for the header button (custom header mode) */
    headerClass?: string
    /** Custom class for the content wrapper */
    contentClass?: string
  }>(),
  {
    defaultExpanded: true,
    headerClass: 'w-full text-left',
    contentClass: '',
  },
)

const slots = useSlots()
const isExpanded = ref(props.defaultExpanded)

const toggle = () => {
  isExpanded.value = !isExpanded.value
}

const hasCustomHeader = () => !!slots.header
</script>

<template>
  <!-- Always use CardComponent for consistent styling -->
  <CardComponent>
    <!-- Custom header mode -->
    <template
      v-if="hasCustomHeader()"
      #header
    >
      <button
        type="button"
        :class="headerClass"
        @click="toggle"
      >
        <slot
          name="header"
          :expanded="isExpanded"
          :toggle="toggle"
        />
      </button>
    </template>

    <!-- Standard mode: title/description -->
    <template
      v-else-if="title || description"
      #title
    >
      {{ title }}
    </template>
    <template
      v-if="!hasCustomHeader() && description"
      #description
    >
      {{ description }}
    </template>

    <!-- Actions slot with toggle button (standard mode only) -->
    <template
      v-if="!hasCustomHeader()"
      #actions
    >
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

    <!-- Collapsible content -->
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
        :class="['overflow-hidden', contentClass]"
      >
        <div :class="hasCustomHeader() ? '' : 'space-y-4 p-6'">
          <slot />
        </div>
      </div>
    </Transition>
  </CardComponent>
</template>
