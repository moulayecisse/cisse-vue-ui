<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { InputWrapperSize } from './InputWrapper.vue'

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Maximum number of tags */
    max?: number
    /** Allow duplicates */
    allowDuplicates?: boolean
    /** Input name */
    name?: string
    /** Input id */
    id?: string
    /** Required field */
    required?: boolean
  }>(),
  {
    placeholder: 'Add tag...',
    size: 'md',
    allowDuplicates: false,
  }
)

const modelValue = defineModel<string[]>({ default: () => [] })

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const canAddMore = computed(() => {
  if (props.max !== undefined) return modelValue.value.length < props.max
  return true
})

const sizeClasses = computed(() => ({
  wrapper: {
    sm: 'min-h-9 py-1.5 px-2 gap-1',
    md: 'min-h-11 py-2 px-3 gap-1.5',
    lg: 'min-h-13 py-2.5 px-4 gap-2',
  }[props.size],
  tag: {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  }[props.size],
  input: {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }[props.size],
  icon: {
    sm: 'size-3',
    md: 'size-3.5',
    lg: 'size-4',
  }[props.size],
}))

function addTag(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return
  if (!canAddMore.value) return
  if (!props.allowDuplicates && modelValue.value.includes(trimmed)) return

  modelValue.value = [...modelValue.value, trimmed]
  inputValue.value = ''
}

function removeTag(index: number) {
  if (props.disabled) return
  modelValue.value = modelValue.value.filter((_, i) => i !== index)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addTag(inputValue.value)
  } else if (event.key === 'Backspace' && !inputValue.value && modelValue.value.length > 0) {
    removeTag(modelValue.value.length - 1)
  }
}

function handleBlur() {
  if (inputValue.value) {
    addTag(inputValue.value)
  }
}

function focusInput() {
  inputRef.value?.focus()
}

defineExpose({ focus: focusInput })
</script>

<template>
  <div
    :class="[
      'flex flex-wrap items-center rounded-xl border transition-all cursor-text',
      'bg-gray-50 dark:bg-slate-700',
      'border-gray-200 dark:border-slate-600',
      'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500 focus-within:bg-white dark:focus-within:bg-slate-600',
      disabled && 'opacity-50 cursor-not-allowed',
      sizeClasses.wrapper,
    ]"
    @click="focusInput"
  >
    <!-- Tags -->
    <TransitionGroup
      name="tag"
      tag="div"
      class="flex flex-wrap gap-1.5"
    >
      <span
        v-for="(tag, index) in modelValue"
        :key="tag + index"
        :class="[
          'inline-flex items-center gap-1 rounded-lg font-medium',
          'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300',
          sizeClasses.tag,
        ]"
      >
        {{ tag }}
        <button
          v-if="!disabled"
          type="button"
          class="rounded-full hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors p-0.5"
          @click.stop="removeTag(index)"
        >
          <Icon icon="lucide:x" :class="['text-primary-500', sizeClasses.icon]" />
        </button>
      </span>
    </TransitionGroup>

    <!-- Input -->
    <input
      v-if="canAddMore"
      :id="id ?? name"
      ref="inputRef"
      v-model="inputValue"
      type="text"
      :name="name"
      :placeholder="modelValue.length === 0 ? placeholder : ''"
      :disabled="disabled"
      :required="required && modelValue.length === 0"
      :class="[
        'flex-1 min-w-20 bg-transparent border-none focus:outline-none',
        'text-gray-900 dark:text-white placeholder-gray-400',
        sizeClasses.input,
      ]"
      v-bind="$attrs"
      @keydown="handleKeydown"
      @blur="handleBlur"
    />
  </div>
</template>

<style scoped>
.tag-enter-active,
.tag-leave-active {
  transition: all 0.2s ease;
}

.tag-enter-from,
.tag-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
