<script lang="ts" setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { AutocompleteOption } from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue: string | null
    options: AutocompleteOption[]
    placeholder?: string
    disabled?: boolean
    label?: string
    error?: string
    noResultsText?: string
    /** Use teleport to body to avoid overflow clipping */
    teleport?: boolean
  }>(),
  {
    teleport: true,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const searchQuery = ref('')
const isOpen = ref(false)
const highlightedIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)
const dropdownRef = ref<HTMLDivElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const inputWrapperRef = ref<HTMLDivElement | null>(null)
const dropdownPosition = ref({ top: 0, left: 0, width: 0 })

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(
    (option) =>
      option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query),
  )
})

const selectedLabel = computed(() => {
  if (!props.modelValue) return ''
  const option = props.options.find((opt) => opt.value === props.modelValue)
  return option?.label || ''
})

watch(
  () => props.modelValue,
  () => {
    if (!isOpen.value) {
      searchQuery.value = selectedLabel.value
    }
  },
  { immediate: true },
)

const updatePosition = () => {
  if (!inputWrapperRef.value || !props.teleport) return
  const rect = inputWrapperRef.value.getBoundingClientRect()
  dropdownPosition.value = {
    top: rect.bottom + window.scrollY + 8,
    left: rect.left + window.scrollX,
    width: rect.width,
  }
}

const openDropdown = () => {
  if (props.disabled) return
  isOpen.value = true
  searchQuery.value = ''
  highlightedIndex.value = -1
  nextTick(() => {
    inputRef.value?.focus()
    updatePosition()
  })
}

const closeDropdown = () => {
  isOpen.value = false
  searchQuery.value = selectedLabel.value
  highlightedIndex.value = -1
}

const selectOption = (option: AutocompleteOption) => {
  emit('update:modelValue', option.value)
  searchQuery.value = option.label
  closeDropdown()
}

const clearSelection = () => {
  emit('update:modelValue', null)
  searchQuery.value = ''
  highlightedIndex.value = -1
  nextTick(() => {
    inputRef.value?.focus()
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(
        highlightedIndex.value + 1,
        filteredOptions.value.length - 1,
      )
      scrollToHighlighted()
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      scrollToHighlighted()
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
        selectOption(filteredOptions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      closeDropdown()
      break
  }
}

const scrollToHighlighted = () => {
  nextTick(() => {
    if (dropdownRef.value) {
      const highlightedElement = dropdownRef.value.querySelector(
        `[data-index="${highlightedIndex.value}"]`,
      ) as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  })
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const isInsideContainer = containerRef.value?.contains(target)
  const isInsideDropdown = dropdownRef.value?.contains(target)
  if (!isInsideContainer && !isInsideDropdown) {
    closeDropdown()
  }
}

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
  } else {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})

const dropdownStyle = computed(() => {
  if (!props.teleport) return {}
  return {
    position: 'absolute' as const,
    top: `${dropdownPosition.value.top}px`,
    left: `${dropdownPosition.value.left}px`,
    width: `${dropdownPosition.value.width}px`,
  }
})
</script>

<template>
  <div ref="containerRef" class="autocomplete-container">
    <label v-if="label" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ label }}
    </label>

    <div class="relative">
      <div
        ref="inputWrapperRef"
        :class="{
          'border-red-500': error,
          'border-gray-300 dark:border-gray-600': !error && !isOpen,
          'border-primary ring-2 ring-primary/20': isOpen,
          'cursor-not-allowed opacity-50': disabled,
        }"
        class="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 transition dark:bg-gray-800"
      >
        <Icon class="size-5 text-gray-400" icon="lucide:search" />

        <input
          ref="inputRef"
          v-model="searchQuery"
          :disabled="disabled"
          :placeholder="placeholder || 'Search...'"
          class="flex-1 bg-transparent text-sm outline-none dark:text-white"
          type="text"
          @focus="openDropdown"
          @keydown="handleKeydown"
        />

        <button
          v-if="modelValue && !disabled"
          class="rounded p-1 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          type="button"
          @click.stop="clearSelection"
        >
          <Icon class="size-4 text-gray-400" icon="lucide:x" />
        </button>

        <button
          :disabled="disabled"
          class="rounded p-1 transition hover:bg-gray-100 dark:hover:bg-gray-700"
          type="button"
          @click.stop="isOpen ? closeDropdown() : openDropdown()"
        >
          <Icon
            :class="{ 'rotate-180': isOpen }"
            class="size-4 text-gray-400 transition"
            icon="lucide:chevron-down"
          />
        </button>
      </div>

      <!-- Dropdown -->
      <Teleport to="body" :disabled="!teleport">
        <Transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="isOpen"
            ref="dropdownRef"
            :style="dropdownStyle"
            :class="[
              'autocomplete-dropdown z-[9999] max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800',
              !teleport && 'absolute mt-2 w-full',
            ]"
          >
            <div v-if="filteredOptions.length === 0" class="px-4 py-3 text-sm text-gray-500">
              {{ noResultsText || 'No results found' }}
            </div>

            <button
              v-for="(option, index) in filteredOptions"
              :key="option.value"
              :class="{
                'bg-gray-100 dark:bg-gray-700': highlightedIndex === index,
                'bg-primary/10': modelValue === option.value,
              }"
              :data-index="index"
              class="flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-gray-700"
              type="button"
              @click="selectOption(option)"
            >
              <Icon
                v-if="modelValue === option.value"
                class="size-4 text-primary"
                icon="lucide:check"
              />
              <span class="flex-1 dark:text-white">{{ option.label }}</span>
              <span class="text-xs text-gray-400">({{ option.value }})</span>
            </button>
          </div>
        </Transition>
      </Teleport>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
