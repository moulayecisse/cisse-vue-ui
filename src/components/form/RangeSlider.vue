<script lang="ts" setup>
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** Current range value [min, max] */
    modelValue?: [number, number]
    /** Minimum value */
    min?: number
    /** Maximum value */
    max?: number
    /** Step increment */
    step?: number
    /** Disabled state */
    disabled?: boolean
    /** Show value labels */
    showLabels?: boolean
    /** Show min/max labels */
    showMinMax?: boolean
    /** Format function for labels */
    formatLabel?: (value: number) => string
  }>(),
  {
    modelValue: () => [25, 75],
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    showLabels: true,
    showMinMax: true,
    formatLabel: (v: number) => v.toString(),
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
}>()

const sliderRef = ref<HTMLDivElement>()
const dragging = ref<'min' | 'max' | null>(null)

const minValue = computed(() => props.modelValue[0])
const maxValue = computed(() => props.modelValue[1])

const minPercent = computed(() => {
  return ((minValue.value - props.min) / (props.max - props.min)) * 100
})

const maxPercent = computed(() => {
  return ((maxValue.value - props.min) / (props.max - props.min)) * 100
})

const rangeStyle = computed(() => ({
  left: `${minPercent.value}%`,
  width: `${maxPercent.value - minPercent.value}%`,
}))

const getValueFromPosition = (clientX: number): number => {
  if (!sliderRef.value) return props.min

  const rect = sliderRef.value.getBoundingClientRect()
  const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  const rawValue = props.min + percent * (props.max - props.min)

  // Snap to step
  const steppedValue = Math.round(rawValue / props.step) * props.step
  return Math.max(props.min, Math.min(props.max, steppedValue))
}

const updateValue = (handle: 'min' | 'max', newValue: number) => {
  const [currentMin, currentMax] = props.modelValue

  if (handle === 'min') {
    // Don't let min exceed max
    const clampedValue = Math.min(newValue, currentMax)
    emit('update:modelValue', [clampedValue, currentMax])
  } else {
    // Don't let max go below min
    const clampedValue = Math.max(newValue, currentMin)
    emit('update:modelValue', [currentMin, clampedValue])
  }
}

const handleMouseDown = (handle: 'min' | 'max') => (event: MouseEvent) => {
  if (props.disabled) return
  event.preventDefault()
  dragging.value = handle

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.value) {
      const value = getValueFromPosition(e.clientX)
      updateValue(dragging.value, value)
    }
  }

  const handleMouseUp = () => {
    dragging.value = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleTrackClick = (event: MouseEvent) => {
  if (props.disabled) return

  const value = getValueFromPosition(event.clientX)

  // Determine which handle to move based on proximity
  const distToMin = Math.abs(value - minValue.value)
  const distToMax = Math.abs(value - maxValue.value)

  if (distToMin <= distToMax) {
    updateValue('min', value)
  } else {
    updateValue('max', value)
  }
}
</script>

<template>
  <div class="space-y-2">
    <!-- Labels row -->
    <div v-if="showLabels" class="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
      <span>{{ formatLabel(minValue) }}</span>
      <span>{{ formatLabel(maxValue) }}</span>
    </div>

    <!-- Slider track -->
    <div
      ref="sliderRef"
      class="relative h-2 rounded-full cursor-pointer"
      :class="[
        disabled
          ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
          : 'bg-gray-200 dark:bg-gray-700',
      ]"
      @click="handleTrackClick"
    >
      <!-- Active range -->
      <div
        class="absolute h-full rounded-full"
        :class="[disabled ? 'bg-gray-400' : 'bg-primary-500']"
        :style="rangeStyle"
      />

      <!-- Min handle -->
      <div
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 shadow transition-shadow"
        :class="[
          disabled
            ? 'bg-gray-300 border-gray-400 cursor-not-allowed'
            : 'bg-white border-primary-500 cursor-grab hover:shadow-md active:cursor-grabbing',
          dragging === 'min' && 'ring-4 ring-primary-200 dark:ring-primary-800',
        ]"
        :style="{ left: `${minPercent}%` }"
        @mousedown="handleMouseDown('min')"
      />

      <!-- Max handle -->
      <div
        class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 shadow transition-shadow"
        :class="[
          disabled
            ? 'bg-gray-300 border-gray-400 cursor-not-allowed'
            : 'bg-white border-primary-500 cursor-grab hover:shadow-md active:cursor-grabbing',
          dragging === 'max' && 'ring-4 ring-primary-200 dark:ring-primary-800',
        ]"
        :style="{ left: `${maxPercent}%` }"
        @mousedown="handleMouseDown('max')"
      />
    </div>

    <!-- Min/Max labels -->
    <div v-if="showMinMax" class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
      <span>{{ formatLabel(min) }}</span>
      <span>{{ formatLabel(max) }}</span>
    </div>
  </div>
</template>
