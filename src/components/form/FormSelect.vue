<script lang="ts" setup>
import { computed, ref, watch, nextTick, toRef } from 'vue'
import { Icon } from '@iconify/vue'
import type { SelectProps, SelectOption } from '@/types'
import { useDropdown } from '@/composables/useDropdown'
import { useId } from '@/composables/useId'
import { useInputStyles, type InputSize } from '@/composables/useInputStyles'

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
      /** Input size */
      size?: InputSize
    }
  >(),
  {
    teleport: true,
    searchable: false,
    noResultsText: 'No results found',
    size: 'md',
  },
)

// Generate unique IDs for accessibility
const { id: generatedId, related } = useId({ prefix: 'select', id: props.id })
const triggerId = computed(() => props.id ?? props.name ?? generatedId.value)
const listboxId = computed(() => related('listbox'))

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

const hasValue = computed(() => !!selectedOption.value)

const { triggerClass } = useInputStyles({
  disabled: computed(() => props.disabled),
  focused: isOpen,
  hasValue,
  size: toRef(props, 'size'),
})

const triggerClasses = computed(() => [
  ...triggerClass.value,
  props.triggerClass,
])
</script>

<template>
  <div class="relative">
    <!-- Trigger -->
    <button
      :id="triggerId"
      ref="triggerRef"
      type="button"
      :disabled="disabled"
      :class="triggerClasses"
      :aria-haspopup="'listbox'"
      :aria-expanded="isOpen"
      :aria-controls="listboxId"
      :aria-invalid="invalid || undefined"
      :aria-describedby="describedBy || undefined"
      @click="toggle"
      @keydown="handleKeydown"
    >
      <slot
        name="selected"
        :option="selectedOption"
        :placeholder="placeholder"
      >
        <span class="flex-1 truncate">{{ displayValue }}</span>
      </slot>
      <Icon
        icon="lucide:chevron-down"
        :class="['size-4 shrink-0 text-gray-400 transition-transform', isOpen && 'rotate-180']"
        aria-hidden="true"
      />
    </button>

    <!-- Dropdown -->
    <Teleport
      to="body"
      :disabled="!teleport"
    >
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
          :id="listboxId"
          ref="dropdownRef"
          role="listbox"
          :aria-label="placeholder || 'Select an option'"
          :style="dropdownStyle"
          :class="[
            'z-9999 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800',
            !teleport && 'absolute mt-1 w-full',
          ]"
        >
          <!-- Search input -->
          <div
            v-if="searchable"
            class="sticky top-0 border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
          >
            <div class="flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-2 py-1.5 dark:border-gray-600 dark:bg-gray-900">
              <Icon
                icon="lucide:search"
                class="size-4 text-gray-400"
                aria-hidden="true"
              />
              <input
                ref="searchInputRef"
                v-model="searchQuery"
                type="text"
                class="flex-1 bg-transparent text-sm outline-hidden dark:text-white"
                placeholder="Search..."
                aria-label="Search options"
                @keydown="handleKeydown"
              >
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="filteredOptions.length === 0"
            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
            role="status"
          >
            {{ noResultsText }}
          </div>

          <!-- Options -->
          <div class="py-1">
            <button
              v-for="(option, index) in filteredOptions"
              :key="String(option.value)"
              type="button"
              role="option"
              :aria-selected="modelValue === option.value"
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
              <slot
                name="option"
                :option="option"
                :selected="modelValue === option.value"
                :index="index"
              >
                <Icon
                  v-if="modelValue === option.value"
                  icon="lucide:check"
                  class="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span
                  v-else
                  class="size-4 shrink-0"
                  aria-hidden="true"
                />
                <span class="flex-1">{{ option.label }}</span>
              </slot>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
