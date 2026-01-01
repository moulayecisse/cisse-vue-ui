<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import InputWrapper from './InputWrapper.vue'
import type { InputWrapperSize } from './InputWrapper.vue'

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Minimum value */
    min?: number
    /** Maximum value */
    max?: number
    /** Step value */
    step?: number
    /** Input name */
    name?: string
    /** Input id */
    id?: string
    /** Required field */
    required?: boolean
    /** Aria describedby */
    describedBy?: string
    /** Show stepper buttons */
    showStepper?: boolean
  }>(),
  {
    placeholder: '0',
    size: 'md',
    step: 1,
    showStepper: true,
  }
)

const modelValue = defineModel<number | null>({ default: null })

const canDecrement = computed(() => {
  if (props.disabled) return false
  if (modelValue.value === null) return true
  if (props.min !== undefined) return modelValue.value > props.min
  return true
})

const canIncrement = computed(() => {
  if (props.disabled) return false
  if (modelValue.value === null) return true
  if (props.max !== undefined) return modelValue.value < props.max
  return true
})

function increment() {
  if (!canIncrement.value) return
  const current = modelValue.value ?? 0
  const newValue = current + props.step
  modelValue.value = props.max !== undefined ? Math.min(newValue, props.max) : newValue
}

function decrement() {
  if (!canDecrement.value) return
  const current = modelValue.value ?? 0
  const newValue = current - props.step
  modelValue.value = props.min !== undefined ? Math.max(newValue, props.min) : newValue
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = target.value === '' ? null : parseFloat(target.value)

  if (value !== null && !isNaN(value)) {
    let clampedValue = value
    if (props.min !== undefined) clampedValue = Math.max(clampedValue, props.min)
    if (props.max !== undefined) clampedValue = Math.min(clampedValue, props.max)
    modelValue.value = clampedValue
  } else {
    modelValue.value = null
  }
}
</script>

<template>
  <InputWrapper
    :size="size"
    :disabled="disabled"
  >
    <template v-if="showStepper" #icon>
      <button
        type="button"
        :disabled="!canDecrement"
        class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        @click="decrement"
      >
        <Icon icon="lucide:minus" class="size-4 text-gray-500" />
      </button>
    </template>
    <template #default="{ inputClass }">
      <input
        :id="id ?? name"
        :value="modelValue"
        type="number"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :aria-required="required || undefined"
        :aria-describedby="describedBy"
        :class="[inputClass, 'text-center', showStepper && 'pl-12 pr-12']"
        v-bind="$attrs"
        @input="handleInput"
      />
    </template>
    <template v-if="showStepper" #actions>
      <button
        type="button"
        :disabled="!canIncrement"
        class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        @click="increment"
      >
        <Icon icon="lucide:plus" class="size-4 text-gray-500" />
      </button>
    </template>
  </InputWrapper>
</template>
