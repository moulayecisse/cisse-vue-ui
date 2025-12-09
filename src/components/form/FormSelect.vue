<script lang="ts" setup>
import { computed, ref, watch, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import type { SelectProps, SelectOption } from '@/types'
import { useDropdown } from '@/composables/useDropdown'

const props = withDefaults(
  defineProps<
    SelectProps & {
      /** Use teleport to body to avoid overflow clipping */
      teleport?: boolean
      /** Show search input in dropdown */
      searchable?: boolean
      /** Text shown when no results match search */
      noResultsText?: string
      /** Custom class for the trigger button */
      triggerClass?: string
    }
  >(),
  {
    teleport: true,
    searchable: false,
    noResultsText: 'No results found',
  },
)

const modelValue = defineModel<string | number | boolean | null>()

const searchQuery = ref('')
const triggerRef = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
const searchInputRef = ref<HTMLInputElement>()

const {
  isOpen,
  highlightedIndex,
  dropdownStyle,
  open: openDropdown,
  close,
  handleKeydown: baseHandleKeydown,
  scrollToHighlighted,
} = useDropdown(triggerRef, dropdownRef, {
  teleport: props.teleport,
  gap: 4,
  onClose: () => {
    searchQuery.value = ''
  },
})

const visibleOptions = computed(() => {
  return (props.options ?? []).filter((opt) => !opt.hidden)
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return visibleOptions.value
  }
  const query = searchQuery.value.toLowerCase()
  return visibleOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(query) ||
    String(opt.value).toLowerCase().includes(query)
  )
})

const selectedOption = computed(() => {
  return visibleOptions.value.find((opt) => opt.value === modelValue.value)
})

const displayValue = computed(() => {
  if (selectedOption.value) {
    return selectedOption.value.label
  }
  return props.placeholder || 'Select...'
})

const open = () => {
  if (props.disabled) return
  searchQuery.value = ''
  highlightedIndex.value = filteredOptions.value.findIndex(
    (opt) => opt.value === modelValue.value
  )
  openDropdown()
  nextTick(() => {
    if (props.searchable) {
      searchInputRef.value?.focus()
    }
  })
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const selectOption = (option: SelectOption) => {
  modelValue.value = option.value
  close()
}

const handleKeydown = (event: KeyboardEvent) => {
  baseHandleKeydown(event, {
    itemCount: filteredOptions.value.length,
    onSelect: (index) => {
      if (filteredOptions.value[index]) {
        selectOption(filteredOptions.value[index])
      }
    },
    onOpen: open,
    handleOpenKeys: true,
  })
  if (isOpen.value) {
    scrollToHighlighted(dropdownRef.value ?? null)
  }
}

watch(searchQuery, () => {
  highlightedIndex.value = 0
})

const triggerClasses = computed(() => {
  const base = 'flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm text-left transition'
  const state = props.disabled
    ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-500'
    : isOpen.value
      ? 'border-primary ring-2 ring-primary/20 bg-white dark:bg-gray-900'
      : 'border-gray-300 bg-white hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600'
  const text = selectedOption.value
    ? 'text-gray-800 dark:text-gray-200'
    : 'text-gray-400 dark:text-gray-500'
  return [base, state, text, props.triggerClass]
})
</script>

<template>
  <div class="relative">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      type="button"
      :id="id ?? name ?? undefined"
      :disabled="disabled"
      :class="triggerClasses"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <slot name="selected" :option="selectedOption" :placeholder="placeholder">
        <span class="flex-1 truncate">{{ displayValue }}</span>
      </slot>
      <Icon
        icon="lucide:chevron-down"
        :class="['size-4 shrink-0 text-gray-400 transition-transform', isOpen && 'rotate-180']"
      />
    </button>

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
            'z-[9999] max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800',
            !teleport && 'absolute mt-1 w-full',
          ]"
        >
          <!-- Search input -->
          <div v-if="searchable" class="sticky top-0 border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800">
            <div class="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 dark:border-gray-600 dark:bg-gray-900">
              <Icon icon="lucide:search" class="size-4 text-gray-400" />
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                class="flex-1 bg-transparent text-sm outline-none dark:text-white"
                placeholder="Search..."
                @keydown="handleKeydown"
              />
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="filteredOptions.length === 0"
            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
          >
            {{ noResultsText }}
          </div>

          <!-- Options -->
          <div class="py-1">
            <button
              v-for="(option, index) in filteredOptions"
              :key="String(option.value)"
              type="button"
              :data-index="index"
              :class="[
                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                highlightedIndex === index && 'bg-gray-100 dark:bg-gray-700',
                modelValue === option.value && 'bg-primary/10 text-primary',
                modelValue !== option.value && 'text-gray-700 dark:text-gray-200',
              ]"
              @click="selectOption(option)"
              @mouseenter="highlightedIndex = index"
            >
              <slot name="option" :option="option" :selected="modelValue === option.value" :index="index">
                <Icon
                  v-if="modelValue === option.value"
                  icon="lucide:check"
                  class="size-4 shrink-0 text-primary"
                />
                <span v-else class="size-4 shrink-0" />
                <span class="flex-1">{{ option.label }}</span>
              </slot>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
