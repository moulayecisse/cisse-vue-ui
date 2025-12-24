<script lang="ts" setup>
import { computed } from 'vue'
import { useId } from '@/composables/useId'

const props = withDefaults(
  defineProps<{
    /** v-model value */
    modelValue?: boolean
    /** Label text */
    label?: string
    /** Description text */
    description?: string
    /** Disabled state */
    disabled?: boolean
    /** Indeterminate state */
    indeterminate?: boolean
    /** Custom ID for the checkbox */
    id?: string
  }>(),
  {
    modelValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Generate unique ID for accessibility
const { id: generatedId, related } = useId({ prefix: 'checkbox', id: props.id })
const inputId = computed(() => props.id ?? generatedId.value)
const descriptionId = computed(() => related('description'))

const toggle = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <label
    class="inline-flex items-start gap-3"
    :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
  >
    <input
      :id="inputId"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :aria-describedby="description ? descriptionId : undefined"
      class="mt-0.5 size-4 rounded border-gray-300 text-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
      @change="toggle"
    >
    <div
      v-if="label || description"
      class="flex flex-col"
    >
      <span
        v-if="label"
        class="text-sm font-medium text-gray-900 dark:text-white"
      >
        {{ label }}
      </span>
      <span
        v-if="description"
        :id="descriptionId"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        {{ description }}
      </span>
    </div>
  </label>
</template>
