<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const {
  placeholder = 'Search...',
  icon = 'lucide:search',
  disabled = false,
} = defineProps<{
  modelValue?: string
  placeholder?: string
  icon?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative">
    <Icon
      :icon="icon"
      class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
    />
    <input
      :disabled="disabled"
      :placeholder="placeholder"
      :value="modelValue"
      class="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 placeholder-gray-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
      type="text"
      @input="handleInput"
    >
  </div>
</template>
