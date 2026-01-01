<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import type { InputWrapperSize } from './InputWrapper.vue'

const props = withDefaults(
  defineProps<{
    /** Number of digits */
    length?: number
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Auto focus first input */
    autoFocus?: boolean
    /** Input name prefix */
    name?: string
    /** Mask input (show dots instead of numbers) */
    masked?: boolean
  }>(),
  {
    length: 6,
    size: 'md',
    autoFocus: true,
    masked: false,
  }
)

const emit = defineEmits<{
  complete: [code: string]
}>()

const modelValue = defineModel<string>({ default: '' })

const inputRefs = ref<HTMLInputElement[]>([])

const digits = computed(() => {
  const arr = modelValue.value.split('')
  while (arr.length < props.length) {
    arr.push('')
  }
  return arr.slice(0, props.length)
})

const sizeClasses = computed(() => ({
  input: {
    sm: 'size-10 text-lg',
    md: 'size-12 text-xl',
    lg: 'size-14 text-2xl',
  }[props.size],
  gap: {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  }[props.size],
}))

function updateValue(index: number, value: string) {
  const newDigits = [...digits.value]
  newDigits[index] = value.slice(-1)
  modelValue.value = newDigits.join('')

  // Check if complete
  if (modelValue.value.length === props.length && !modelValue.value.includes('')) {
    emit('complete', modelValue.value)
  }
}

function handleInput(event: Event, index: number) {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/\D/g, '')

  if (value) {
    updateValue(index, value)

    // Move to next input
    if (index < props.length - 1) {
      nextTick(() => {
        inputRefs.value[index + 1]?.focus()
      })
    }
  }
}

function handleKeydown(event: KeyboardEvent, index: number) {
  const target = event.target as HTMLInputElement

  if (event.key === 'Backspace') {
    if (!target.value && index > 0) {
      // Move to previous input
      inputRefs.value[index - 1]?.focus()
    }
    updateValue(index, '')
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, props.length)
  if (pastedData) {
    modelValue.value = pastedData
    // Focus last filled input or next empty
    const focusIndex = Math.min(pastedData.length, props.length - 1)
    nextTick(() => {
      inputRefs.value[focusIndex]?.focus()
    })
  }
}

function handleFocus(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  target.select()
}

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue.length === props.length) {
      emit('complete', newValue)
    }
  }
)

onMounted(() => {
  if (props.autoFocus) {
    inputRefs.value[0]?.focus()
  }
})

function setInputRef(el: HTMLInputElement | null, index: number) {
  if (el) {
    inputRefs.value[index] = el
  }
}

defineExpose({ focus: () => inputRefs.value[0]?.focus() })
</script>

<template>
  <div :class="['inline-flex', sizeClasses.gap]">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      :ref="(el) => setInputRef(el as HTMLInputElement, index)"
      :value="digit"
      :type="masked ? 'password' : 'text'"
      inputmode="numeric"
      :name="name ? `${name}-${index}` : undefined"
      :disabled="disabled"
      maxlength="1"
      autocomplete="one-time-code"
      :class="[
        'text-center font-semibold rounded-xl border-2 transition-all',
        'bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white',
        'border-gray-200 dark:border-slate-600',
        'focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        digit ? 'border-primary-300 dark:border-primary-500/50' : '',
        sizeClasses.input,
      ]"
      @input="handleInput($event, index)"
      @keydown="handleKeydown($event, index)"
      @paste="handlePaste"
      @focus="handleFocus"
    />
  </div>
</template>
