<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useId } from '@/composables/useId'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

const props = withDefaults(
  defineProps<{
    /** Tooltip content text */
    content: string
    /** Position of the tooltip */
    position?: TooltipPosition
    /** Delay before showing (ms) */
    delay?: number
    /** Disable the tooltip */
    disabled?: boolean
    /** Custom ID for accessibility */
    id?: string
  }>(),
  {
    position: 'top',
    delay: 0,
    disabled: false,
  },
)

// Generate unique ID for accessibility
const { id: tooltipId } = useId({ prefix: 'tooltip', id: props.id })

const isVisible = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const show = () => {
  if (props.disabled) return
  if (props.delay > 0) {
    timeoutId = setTimeout(() => {
      isVisible.value = true
    }, props.delay)
  } else {
    isVisible.value = true
  }
}

const hide = () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  isVisible.value = false
}

const positionClasses = computed(() => {
  const base = 'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg whitespace-nowrap dark:bg-gray-700'
  const arrow = 'after:absolute after:border-4 after:border-transparent'

  switch (props.position) {
    case 'top':
      return `${base} ${arrow} bottom-full left-1/2 -translate-x-1/2 mb-2 after:top-full after:left-1/2 after:-translate-x-1/2 after:border-t-gray-900 dark:after:border-t-gray-700`
    case 'bottom':
      return `${base} ${arrow} top-full left-1/2 -translate-x-1/2 mt-2 after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-b-gray-900 dark:after:border-b-gray-700`
    case 'left':
      return `${base} ${arrow} right-full top-1/2 -translate-y-1/2 mr-2 after:left-full after:top-1/2 after:-translate-y-1/2 after:border-l-gray-900 dark:after:border-l-gray-700`
    case 'right':
      return `${base} ${arrow} left-full top-1/2 -translate-y-1/2 ml-2 after:right-full after:top-1/2 after:-translate-y-1/2 after:border-r-gray-900 dark:after:border-r-gray-700`
    default:
      return base
  }
})
</script>

<template>
  <div
    class="relative inline-block"
    :aria-describedby="content && !disabled ? tooltipId : undefined"
    @mouseenter="show"
    @mouseleave="hide"
    @focus="show"
    @blur="hide"
  >
    <slot />
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible && content"
        :id="tooltipId"
        :class="positionClasses"
        role="tooltip"
      >
        {{ content }}
      </div>
    </Transition>
  </div>
</template>
