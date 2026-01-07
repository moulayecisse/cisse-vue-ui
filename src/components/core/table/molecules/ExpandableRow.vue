<script lang="ts" setup>
import { ref, computed, useAttrs } from 'vue'
import Tr from '../atoms/Tr.vue'
import Td from '../atoms/Td.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    /** Number of columns in the table (for colspan on expanded content) */
    colspan: number
    /** Whether the row is initially expanded */
    defaultExpanded?: boolean
    /** Control expanded state externally (use undefined for uncontrolled) */
    expanded?: boolean | undefined
    /** Whether the row is selected */
    selected?: boolean
    /** Whether the row is disabled */
    disabled?: boolean
    /** Whether clicking the row toggles expansion */
    expandOnRowClick?: boolean
  }>(),
  {
    defaultExpanded: false,
    expanded: undefined,
    expandOnRowClick: false,
    selected: false,
    disabled: false,
  }
)

const emit = defineEmits<{
  /** Emitted when expanded state changes */
  'update:expanded': [value: boolean]
  /** Emitted when the row is clicked */
  click: [event: MouseEvent]
}>()

const attrs = useAttrs()

// Internal expanded state (used when not controlled externally)
const internalExpanded = ref(props.defaultExpanded)

// Use external expanded if provided (not undefined), otherwise use internal
const isExpanded = computed({
  get: () => props.expanded !== undefined ? props.expanded : internalExpanded.value,
  set: (value) => {
    internalExpanded.value = value
    emit('update:expanded', value)
  },
})

const toggle = () => {
  if (!props.disabled) {
    isExpanded.value = !isExpanded.value
  }
}

const handleRowClick = (event: MouseEvent) => {
  emit('click', event)
  if (props.expandOnRowClick) {
    toggle()
  }
}

// Expose toggle method for external use
defineExpose({ toggle, isExpanded })
</script>

<template>
  <Tr
    v-bind="attrs"
    :selected="selected"
    :disabled="disabled"
    clickable
    @click="handleRowClick"
  >
    <!-- Expand toggle cell -->
    <Td
      width="40px"
      class="!p-2"
    >
      <button
        type="button"
        :disabled="disabled"
        class="flex size-6 items-center justify-center rounded transition-colors hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        :aria-expanded="isExpanded"
        aria-label="Toggle row details"
        @click.stop="toggle"
      >
        <svg
          class="size-4 transition-transform"
          :class="{ 'rotate-90': isExpanded }"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
        </svg>
      </button>
    </Td>
    <!-- Row content -->
    <slot name="row" />
  </Tr>

  <!-- Expanded content row -->
  <Tr
    v-if="isExpanded"
    class="bg-gray-50 dark:bg-gray-800/50"
  >
    <Td
      :colspan="colspan + 1"
      class="!p-0"
    >
      <div class="p-4">
        <slot name="expanded" />
      </div>
    </Td>
  </Tr>
</template>
