<script lang="ts" setup>
import { Icon } from '@iconify/vue'

export interface FilterTab {
  key: string
  label: string
  icon?: string
  count?: number
  disabled?: boolean
}

withDefaults(
  defineProps<{
    /** Available filter options */
    options: FilterTab[]
    /** Visual variant */
    variant?: 'pills' | 'underline' | 'boxed'
    /** Size */
    size?: 'sm' | 'md' | 'lg'
    /** Full width tabs */
    fullWidth?: boolean
  }>(),
  {
    variant: 'pills',
    size: 'md',
  }
)

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <!-- Pills variant -->
  <div
    v-if="variant === 'pills'"
    :class="[
      'inline-flex p-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 gap-1',
      fullWidth && 'w-full',
    ]"
  >
    <button
      v-for="option in options"
      :key="option.key"
      type="button"
      :disabled="option.disabled"
      :class="[
        'flex items-center justify-center gap-2 rounded-xl font-medium transition-all',
        fullWidth && 'flex-1',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2.5 text-sm',
        size === 'lg' && 'px-5 py-3 text-base',
        modelValue === option.key
          ? 'bg-primary-500 text-white shadow-md'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700',
        option.disabled && 'opacity-50 cursor-not-allowed',
      ]"
      @click="!option.disabled && (modelValue = option.key)"
    >
      <Icon v-if="option.icon" :icon="option.icon" class="size-4" />
      <span>{{ option.label }}</span>
      <span
        v-if="option.count !== undefined"
        :class="[
          'px-1.5 py-0.5 rounded-full text-xs font-medium',
          modelValue === option.key
            ? 'bg-white/20 text-white'
            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400',
        ]"
      >
        {{ option.count }}
      </span>
    </button>
  </div>

  <!-- Underline variant -->
  <div
    v-else-if="variant === 'underline'"
    :class="[
      'flex border-b border-gray-200 dark:border-slate-700',
      fullWidth && 'w-full',
    ]"
  >
    <button
      v-for="option in options"
      :key="option.key"
      type="button"
      :disabled="option.disabled"
      :class="[
        'flex items-center justify-center gap-2 font-medium transition-all border-b-2 -mb-px',
        fullWidth && 'flex-1',
        size === 'sm' && 'px-3 py-2 text-xs',
        size === 'md' && 'px-4 py-3 text-sm',
        size === 'lg' && 'px-5 py-4 text-base',
        modelValue === option.key
          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300',
        option.disabled && 'opacity-50 cursor-not-allowed',
      ]"
      @click="!option.disabled && (modelValue = option.key)"
    >
      <Icon v-if="option.icon" :icon="option.icon" class="size-4" />
      <span>{{ option.label }}</span>
      <span
        v-if="option.count !== undefined"
        :class="[
          'px-1.5 py-0.5 rounded-full text-xs font-medium',
          modelValue === option.key
            ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
            : 'bg-gray-100 dark:bg-slate-700 text-gray-500',
        ]"
      >
        {{ option.count }}
      </span>
    </button>
  </div>

  <!-- Boxed variant -->
  <div
    v-else-if="variant === 'boxed'"
    :class="[
      'inline-flex bg-gray-100 dark:bg-slate-800 rounded-xl p-1 gap-1',
      fullWidth && 'w-full',
    ]"
  >
    <button
      v-for="option in options"
      :key="option.key"
      type="button"
      :disabled="option.disabled"
      :class="[
        'flex items-center justify-center gap-2 rounded-lg font-medium transition-all',
        fullWidth && 'flex-1',
        size === 'sm' && 'px-3 py-1.5 text-xs',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-5 py-2.5 text-base',
        modelValue === option.key
          ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
        option.disabled && 'opacity-50 cursor-not-allowed',
      ]"
      @click="!option.disabled && (modelValue = option.key)"
    >
      <Icon v-if="option.icon" :icon="option.icon" class="size-4" />
      <span>{{ option.label }}</span>
      <span
        v-if="option.count !== undefined"
        :class="[
          'px-1.5 py-0.5 rounded-full text-xs font-medium',
          modelValue === option.key
            ? 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300'
            : 'bg-gray-200 dark:bg-slate-700 text-gray-500 dark:text-gray-400',
        ]"
      >
        {{ option.count }}
      </span>
    </button>
  </div>
</template>
