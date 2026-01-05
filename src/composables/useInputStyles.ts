import { computed, type Ref, type ComputedRef } from 'vue'

export type InputSize = 'sm' | 'md' | 'lg'

export interface UseInputStylesOptions {
  /** Disabled state */
  disabled?: Ref<boolean> | boolean
  /** Invalid/error state */
  invalid?: Ref<boolean> | boolean
  /** Focused state (for trigger buttons like select) */
  focused?: Ref<boolean> | boolean
  /** Input size */
  size?: Ref<InputSize> | InputSize
  /** Has left icon/content */
  hasLeftIcon?: Ref<boolean> | boolean
  /** Has right icon/content */
  hasRightIcon?: Ref<boolean> | boolean
  /** Has value selected (for placeholder color) */
  hasValue?: Ref<boolean> | boolean
}

export interface UseInputStylesReturn {
  /** Base input classes (for <input>, <textarea>) */
  inputClass: ComputedRef<string[]>
  /** Trigger button classes (for select, datepicker, combobox triggers) */
  triggerClass: ComputedRef<string[]>
  /** Container/wrapper classes */
  wrapperClass: ComputedRef<string[]>
  /** Icon classes */
  iconClass: ComputedRef<string[]>
}

// Helper to unwrap ref or return value directly
const unwrap = <T>(value: Ref<T> | T): T => {
  return typeof value === 'object' && value !== null && 'value' in value
    ? (value as Ref<T>).value
    : value as T
}

/**
 * Composable for consistent input styling across all form components
 */
export function useInputStyles(options: UseInputStylesOptions = {}): UseInputStylesReturn {
  const {
    disabled = false,
    invalid = false,
    focused = false,
    size = 'md',
    hasLeftIcon = false,
    hasRightIcon = false,
    hasValue = true,
  } = options

  // Base classes shared by inputs and triggers
  const baseClasses = [
    'w-full rounded-md border text-sm transition-all',
    'focus:outline-none',
  ]

  // State classes
  const stateClasses = computed(() => {
    const isDisabled = unwrap(disabled)
    const isInvalid = unwrap(invalid)
    const isFocused = unwrap(focused)

    if (isDisabled) {
      return [
        'cursor-not-allowed',
        'border-gray-200 bg-gray-50 text-gray-500',
        'dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500',
      ]
    }

    if (isInvalid) {
      return [
        'border-red-500 bg-white text-gray-800',
        'focus:border-red-500 focus:ring-2 focus:ring-red-500/20',
        'dark:border-red-500 dark:bg-gray-900 dark:text-gray-200',
      ]
    }

    if (isFocused) {
      return [
        'border-primary ring-2 ring-primary/20 bg-white text-gray-800',
        'dark:bg-gray-900 dark:text-gray-200',
      ]
    }

    return [
      'border-gray-300 bg-white text-gray-800',
      'hover:border-gray-400',
      'focus:border-primary focus:ring-2 focus:ring-primary/20',
      'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-gray-600',
    ]
  })

  // Size classes
  const sizeClasses = computed(() => {
    const currentSize = unwrap(size)
    switch (currentSize) {
      case 'sm':
        return ['py-1.5', 'text-xs']
      case 'lg':
        return ['py-3', 'text-base']
      default:
        return ['py-2', 'text-sm']
    }
  })

  // Padding classes based on icons
  const paddingClasses = computed(() => {
    const hasLeft = unwrap(hasLeftIcon)
    const hasRight = unwrap(hasRightIcon)

    return [
      hasLeft ? 'pl-10' : 'px-3',
      hasRight ? 'pr-10' : 'px-3',
    ]
  })

  // Text color for placeholder state (select, datepicker)
  const textColorClass = computed(() => {
    const hasVal = unwrap(hasValue)
    if (!hasVal) {
      return ['text-gray-400', 'dark:text-gray-500']
    }
    return ['text-gray-800', 'dark:text-gray-200']
  })

  // Full input classes (for <input>, <textarea>)
  const inputClass = computed(() => [
    ...baseClasses,
    ...stateClasses.value,
    ...sizeClasses.value,
    ...paddingClasses.value,
    'placeholder-gray-400 dark:placeholder-gray-500',
  ])

  // Trigger button classes (for select, datepicker, combobox)
  const triggerClass = computed(() => [
    'flex items-center justify-between gap-2 text-left',
    ...baseClasses,
    ...stateClasses.value,
    ...sizeClasses.value,
    'px-3', // triggers always have px-3
    ...textColorClass.value,
  ])

  // Wrapper/container classes (for TagsInput, etc.)
  const wrapperClass = computed(() => {
    const isDisabled = unwrap(disabled)
    const currentSize = unwrap(size)

    const sizeWrapperClasses = {
      sm: 'min-h-9 py-1.5 px-2 gap-1',
      md: 'min-h-11 py-2 px-3 gap-1.5',
      lg: 'min-h-13 py-2.5 px-4 gap-2',
    }[currentSize]

    if (isDisabled) {
      return [
        'flex flex-wrap items-center rounded-md border transition-all cursor-not-allowed',
        'border-gray-200 bg-gray-50',
        'dark:border-gray-800 dark:bg-gray-950',
        sizeWrapperClasses,
      ]
    }

    return [
      'flex flex-wrap items-center rounded-md border transition-all cursor-text',
      'border-gray-300 bg-white hover:border-gray-400',
      'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
      'dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600',
      sizeWrapperClasses,
    ]
  })

  // Icon classes
  const iconClass = computed(() => ['size-4', 'text-gray-400'])

  return {
    inputClass,
    triggerClass,
    wrapperClass,
    iconClass,
  }
}
