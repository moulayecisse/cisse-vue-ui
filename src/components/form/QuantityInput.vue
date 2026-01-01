<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { InputWrapperSize } from './InputWrapper.vue'

const props = withDefaults(
  defineProps<{
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
  }>(),
  {
    size: 'md',
    min: 1,
    step: 1,
  }
)

const modelValue = defineModel<number>({ default: 1 })

const canDecrement = computed(() => {
  if (props.disabled) return false
  if (props.min !== undefined) return modelValue.value > props.min
  return true
})

const canIncrement = computed(() => {
  if (props.disabled) return false
  if (props.max !== undefined) return modelValue.value < props.max
  return true
})

function increment() {
  if (!canIncrement.value) return
  const newValue = modelValue.value + props.step
  modelValue.value = props.max !== undefined ? Math.min(newValue, props.max) : newValue
}

function decrement() {
  if (!canDecrement.value) return
  const newValue = modelValue.value - props.step
  modelValue.value = props.min !== undefined ? Math.max(newValue, props.min) : newValue
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value, 10)

  if (!isNaN(value)) {
    let clampedValue = value
    if (props.min !== undefined) clampedValue = Math.max(clampedValue, props.min)
    if (props.max !== undefined) clampedValue = Math.min(clampedValue, props.max)
    modelValue.value = clampedValue
  }
}

const sizeClasses = computed(() => ({
  button: {
    sm: 'size-7',
    md: 'size-9',
    lg: 'size-11',
  }[props.size],
  icon: {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5',
  }[props.size],
  input: {
    sm: 'text-sm w-10',
    md: 'text-base w-12',
    lg: 'text-lg w-14',
  }[props.size],
}))
</script>

<template>
  <div class="inline-flex items-center gap-2 bg-gray-50 dark:bg-slate-700 rounded-xl p-1 border border-gray-200 dark:border-slate-600">
    <!-- Decrement button -->
    <button
      type="button"
      :disabled="!canDecrement"
      :class="[
        'flex items-center justify-center rounded-lg bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 transition-all',
        'hover:bg-gray-50 dark:hover:bg-slate-500 hover:border-gray-300 dark:hover:border-slate-400',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-600',
        'shadow-sm',
        sizeClasses.button,
      ]"
      @click="decrement"
    >
      <Icon icon="lucide:minus" :class="['text-gray-600 dark:text-gray-300', sizeClasses.icon]" />
    </button>

    <!-- Value display -->
    <input
      :id="id ?? name"
      :value="modelValue"
      type="number"
      :name="name"
      :disabled="disabled"
      :required="required"
      :min="min"
      :max="max"
      :class="[
        'bg-transparent text-center font-semibold text-gray-900 dark:text-white',
        'focus:outline-none appearance-none',
        '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        'disabled:opacity-50',
        sizeClasses.input,
      ]"
      @input="handleInput"
    />

    <!-- Increment button -->
    <button
      type="button"
      :disabled="!canIncrement"
      :class="[
        'flex items-center justify-center rounded-lg bg-white dark:bg-slate-600 border border-gray-200 dark:border-slate-500 transition-all',
        'hover:bg-gray-50 dark:hover:bg-slate-500 hover:border-gray-300 dark:hover:border-slate-400',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-slate-600',
        'shadow-sm',
        sizeClasses.button,
      ]"
      @click="increment"
    >
      <Icon icon="lucide:plus" :class="['text-gray-600 dark:text-gray-300', sizeClasses.icon]" />
    </button>
  </div>
</template>
