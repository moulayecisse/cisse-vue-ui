<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

export type RatingSize = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    /** Current rating value */
    modelValue?: number
    /** Maximum rating */
    max?: number
    /** Allow half stars */
    allowHalf?: boolean
    /** Read only mode */
    readonly?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Size of stars */
    size?: RatingSize
    /** Icon for filled star */
    filledIcon?: string
    /** Icon for empty star */
    emptyIcon?: string
    /** Icon for half star */
    halfIcon?: string
    /** Color of filled stars */
    color?: string
    /** Show rating value */
    showValue?: boolean
  }>(),
  {
    modelValue: 0,
    max: 5,
    allowHalf: false,
    readonly: false,
    disabled: false,
    size: 'md',
    filledIcon: 'heroicons:star-solid',
    emptyIcon: 'heroicons:star',
    halfIcon: 'heroicons:star-solid',
    color: 'text-yellow-400',
    showValue: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const hoverValue = ref<number | null>(null)

const displayValue = computed(() => {
  return hoverValue.value !== null ? hoverValue.value : props.modelValue
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'lg':
      return 'w-8 h-8'
    default:
      return 'w-6 h-6'
  }
})

const getStarState = (index: number): 'full' | 'half' | 'empty' => {
  const value = displayValue.value
  if (value >= index) return 'full'
  if (props.allowHalf && value >= index - 0.5) return 'half'
  return 'empty'
}

const handleClick = (index: number, event: MouseEvent) => {
  if (props.readonly || props.disabled) return

  let value = index
  if (props.allowHalf) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const isLeftHalf = event.clientX - rect.left < rect.width / 2
    value = isLeftHalf ? index - 0.5 : index
  }

  emit('update:modelValue', value)
}

const handleMouseMove = (index: number, event: MouseEvent) => {
  if (props.readonly || props.disabled) return

  let value = index
  if (props.allowHalf) {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    const isLeftHalf = event.clientX - rect.left < rect.width / 2
    value = isLeftHalf ? index - 0.5 : index
  }

  hoverValue.value = value
}

const handleMouseLeave = () => {
  hoverValue.value = null
}
</script>

<template>
  <div class="flex items-center gap-1">
    <div
      class="flex items-center"
      @mouseleave="handleMouseLeave"
    >
      <button
        v-for="index in max"
        :key="index"
        type="button"
        class="relative focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded"
        :class="[
          readonly || disabled ? 'cursor-default' : 'cursor-pointer',
          disabled && 'opacity-50',
        ]"
        :disabled="readonly || disabled"
        @click="handleClick(index, $event)"
        @mousemove="handleMouseMove(index, $event)"
      >
        <!-- Empty star (background) -->
        <Icon
          :icon="emptyIcon"
          :class="[sizeClasses, 'text-gray-300 dark:text-gray-600']"
        />

        <!-- Filled star (overlay) -->
        <div
          class="absolute inset-0 overflow-hidden"
          :style="{
            width:
              getStarState(index) === 'full'
                ? '100%'
                : getStarState(index) === 'half'
                  ? '50%'
                  : '0%',
          }"
        >
          <Icon
            :icon="filledIcon"
            :class="[sizeClasses, color]"
          />
        </div>
      </button>
    </div>

    <span
      v-if="showValue"
      class="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      {{ modelValue.toFixed(allowHalf ? 1 : 0) }}
    </span>
  </div>
</template>
