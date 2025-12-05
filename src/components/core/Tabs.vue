<script lang="ts" setup>
import { computed, provide } from 'vue'

export interface Tab {
  key: string
  label: string
  icon?: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** Array of tab definitions */
    tabs: Tab[]
    /** Currently active tab key */
    modelValue?: string
    /** Tab style variant */
    variant?: 'underline' | 'pills' | 'boxed'
  }>(),
  {
    variant: 'underline',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const activeTab = computed({
  get: () => props.modelValue || props.tabs[0]?.key,
  set: (value: string) => emit('update:modelValue', value),
})

const selectTab = (tab: Tab) => {
  if (tab.disabled) return
  activeTab.value = tab.key
}

const variantClasses = {
  underline: {
    container: 'border-b border-gray-200 dark:border-gray-700',
    tab: 'border-b-2 -mb-px px-4 py-2',
    active: 'border-primary text-primary/90 dark:text-primary-foreground/90',
    inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
  },
  pills: {
    container: 'gap-2',
    tab: 'px-4 py-2 rounded-lg',
    active: 'bg-primary text-white',
    inactive: 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
  },
  boxed: {
    container: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg gap-1',
    tab: 'px-4 py-2 rounded-md',
    active: 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm',
    inactive: 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
  },
}

provide('activeTab', activeTab)
</script>

<template>
  <div>
    <div
      :class="[
        'flex',
        variantClasses[variant].container,
      ]"
      role="tablist"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        role="tab"
        :aria-selected="activeTab === tab.key"
        :disabled="tab.disabled"
        :class="[
          'text-sm font-medium transition-colors focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          variantClasses[variant].tab,
          activeTab === tab.key
            ? variantClasses[variant].active
            : variantClasses[variant].inactive,
        ]"
        @click="selectTab(tab)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="mt-4">
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>
