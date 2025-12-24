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
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
    /** Custom ID for the switch */
    id?: string
  }>(),
  {
    modelValue: false,
    size: 'md',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Generate unique IDs for accessibility
const { id: generatedId, related } = useId({ prefix: 'switch', id: props.id })
const switchId = computed(() => props.id ?? generatedId.value)
const labelId = computed(() => related('label'))
const descriptionId = computed(() => related('description'))

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

const switchSizes = {
  sm: 'h-5 w-9',
  md: 'h-6 w-11',
  lg: 'h-7 w-14',
}

const dotSizes = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
}

const translateSizes = {
  sm: 'translate-x-5',
  md: 'translate-x-6',
  lg: 'translate-x-8',
}
</script>

<template>
  <label
    class="inline-flex items-start gap-3"
    :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
  >
    <button
      :id="switchId"
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :aria-labelledby="label ? labelId : undefined"
      :aria-describedby="description ? descriptionId : undefined"
      :disabled="disabled"
      :class="[
        'relative inline-flex shrink-0 items-center rounded-full transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2',
        switchSizes[size],
        modelValue ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600',
      ]"
      @click="toggle"
    >
      <span
        :class="[
          'inline-block transform rounded-full bg-white shadow-sm transition-transform',
          dotSizes[size],
          modelValue ? translateSizes[size] : 'translate-x-1',
        ]"
        aria-hidden="true"
      />
    </button>
    <div
      v-if="label || description"
      class="flex flex-col"
    >
      <span
        v-if="label"
        :id="labelId"
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
