<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export interface Step {
  key: string | number
  title: string
  description?: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    /** Array of step definitions */
    steps: Step[]
    /** Current step (key or index) */
    modelValue?: string | number
    /** Orientation */
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    orientation: 'horizontal',
  },
)

defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const getCurrentStepIndex = () => {
  if (props.modelValue === undefined) return 0
  const index = props.steps.findIndex((s) => s.key === props.modelValue)
  return index >= 0 ? index : 0
}

const isStepComplete = (index: number) => index < getCurrentStepIndex()
const isStepActive = (index: number) => index === getCurrentStepIndex()
const isStepPending = (index: number) => index > getCurrentStepIndex()
</script>

<template>
  <div
    :class="[
      'w-full',
      orientation === 'vertical' ? 'flex flex-col' : '',
    ]"
  >
    <div
      :class="[
        orientation === 'horizontal'
          ? 'relative flex items-start justify-between'
          : 'relative flex flex-col gap-4',
      ]"
    >
      <!-- Horizontal Progress Line -->
      <template v-if="orientation === 'horizontal'">
        <div
          class="absolute left-0 top-6 h-0.5 w-full bg-gray-200 dark:bg-gray-700"
          aria-hidden="true"
        />
        <div
          class="absolute left-0 top-6 h-0.5 bg-primary transition-all duration-500 ease-in-out"
          :style="{
            width: `${(getCurrentStepIndex() / (steps.length - 1)) * 100}%`,
          }"
          aria-hidden="true"
        />
      </template>

      <!-- Steps -->
      <div
        v-for="(step, index) in steps"
        :key="step.key"
        :class="[
          'relative',
          orientation === 'horizontal'
            ? 'flex flex-1 flex-col items-center'
            : 'flex items-start gap-4',
        ]"
      >
        <!-- Vertical Line -->
        <div
          v-if="orientation === 'vertical' && index < steps.length - 1"
          class="absolute left-6 top-12 h-full w-0.5 -translate-x-1/2"
          :class="isStepComplete(index) ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'"
        />

        <!-- Step Circle -->
        <div
          class="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300"
          :class="{
            'border-primary bg-primary text-white shadow-lg': isStepActive(index) || isStepComplete(index),
            'border-gray-300 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500':
              isStepPending(index),
          }"
        >
          <Icon
            v-if="isStepComplete(index)"
            icon="lucide:check"
            class="size-6"
          />
          <Icon
            v-else-if="step.icon"
            :icon="step.icon"
            class="size-6"
          />
          <span
            v-else
            class="text-sm font-semibold"
          >{{ index + 1 }}</span>
        </div>

        <!-- Step Content -->
        <div
          :class="[
            orientation === 'horizontal'
              ? 'mt-4 flex flex-col items-center text-center'
              : 'flex flex-col pt-2',
          ]"
        >
          <p
            class="text-sm font-semibold transition-colors"
            :class="{
              'text-primary dark:text-primary': isStepActive(index) || isStepComplete(index),
              'text-gray-500 dark:text-gray-400': isStepPending(index),
            }"
          >
            {{ step.title }}
          </p>
          <p
            v-if="step.description"
            class="mt-1 text-xs"
            :class="{
              'text-gray-600 dark:text-gray-300': isStepActive(index),
              'text-gray-500 dark:text-gray-400': !isStepActive(index),
            }"
          >
            {{ step.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
