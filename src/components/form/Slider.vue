<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Minimum value */
    min?: number
    /** Maximum value */
    max?: number
    /** Step increment */
    step?: number
    /** Disabled state */
    disabled?: boolean
    /** Show value label */
    showValue?: boolean
    /** Format value for display */
    formatValue?: (value: number) => string
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showValue: false,
  },
)

const modelValue = defineModel<number>({ default: 0 })

const percentage = computed(() => {
  return ((modelValue.value - props.min) / (props.max - props.min)) * 100
})

const displayValue = computed(() => {
  if (props.formatValue) {
    return props.formatValue(modelValue.value)
  }
  return modelValue.value.toString()
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  modelValue.value = Number(target.value)
}
</script>

<template>
  <div class="w-full">
    <div
      v-if="showValue"
      class="mb-2 flex justify-between text-sm"
    >
      <span class="text-gray-600 dark:text-gray-400">{{ min }}</span>
      <span class="font-medium text-gray-900 dark:text-white">{{ displayValue }}</span>
      <span class="text-gray-600 dark:text-gray-400">{{ max }}</span>
    </div>
    <div class="relative">
      <input
        type="range"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="slider-input w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
        @input="handleInput"
      >
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
        <div
          class="h-2 rounded-full bg-primary"
          :style="{ width: `${percentage}%` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.slider-input {
  height: 0.5rem;
}

.slider-input::-webkit-slider-runnable-track {
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
}

.dark .slider-input::-webkit-slider-runnable-track {
  background-color: #374151;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background-color: var(--color-primary, #3b82f6);
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-top: -0.375rem;
  cursor: pointer;
}

.slider-input::-moz-range-track {
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
}

.dark .slider-input::-moz-range-track {
  background-color: #374151;
}

.slider-input::-moz-range-thumb {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  background-color: var(--color-primary, #3b82f6);
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.slider-input:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.slider-input:focus::-moz-range-thumb {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
</style>
