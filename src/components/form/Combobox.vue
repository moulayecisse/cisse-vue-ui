<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { useId } from '@/composables/useId'

export interface ComboboxOption {
  value: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    /** Selected value(s) */
    modelValue?: string | number | (string | number)[] | null
    /** Available options */
    options: ComboboxOption[]
    /** Placeholder text */
    placeholder?: string
    /** Search placeholder */
    searchPlaceholder?: string
    /** Allow multiple selection */
    multiple?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Allow clearing selection */
    clearable?: boolean
    /** No results message */
    noResultsText?: string
    /** Input name attribute */
    name?: string
    /** Input id attribute */
    id?: string
    /** Teleport target (e.g., 'body', '#app'). Set to false to disable teleport. */
    teleport?: string | false
  }>(),
  {
    placeholder: 'Select...',
    searchPlaceholder: 'Search...',
    multiple: false,
    disabled: false,
    clearable: false,
    noResultsText: 'No results found',
    teleport: false,
  },
)

// Generate unique IDs for accessibility
const { id: generatedId, related } = useId({ prefix: 'combobox', id: props.id })
const inputId = computed(() => props.id ?? generatedId.value)
const listboxId = computed(() => related('listbox'))

const teleportDisabled = computed(() => props.teleport === false)
const teleportTarget = computed(() => props.teleport === false ? 'body' : props.teleport)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[] | null]
}>()

const containerRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()
const isOpen = ref(false)
const search = ref('')

onClickOutside(containerRef, () => {
  isOpen.value = false
})

const filteredOptions = computed(() => {
  if (!search.value) return props.options
  const query = search.value.toLowerCase()
  return props.options.filter((opt) =>
    opt.label.toLowerCase().includes(query)
  )
})

const selectedOptions = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) return []
  const values = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
  return props.options.filter((opt) => values.includes(opt.value))
})

const displayValue = computed(() => {
  if (selectedOptions.value.length === 0) return ''
  if (props.multiple) {
    return selectedOptions.value.map((o) => o.label).join(', ')
  }
  return selectedOptions.value[0]?.label || ''
})

const isSelected = (option: ComboboxOption): boolean => {
  if (props.modelValue === null || props.modelValue === undefined) return false
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(option.value)
  }
  return props.modelValue === option.value
}

const toggleOption = (option: ComboboxOption) => {
  if (option.disabled) return

  if (props.multiple) {
    const currentValues = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = currentValues.indexOf(option.value)
    if (index === -1) {
      currentValues.push(option.value)
    } else {
      currentValues.splice(index, 1)
    }
    emit('update:modelValue', currentValues)
  } else {
    emit('update:modelValue', option.value)
    isOpen.value = false
    search.value = ''
  }
}

const clear = () => {
  emit('update:modelValue', props.multiple ? [] : null)
  search.value = ''
}

const openDropdown = () => {
  if (props.disabled) return
  isOpen.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

watch(isOpen, (open) => {
  if (!open) {
    search.value = ''
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative"
  >
    <!-- Trigger -->
    <div
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'"
      :aria-controls="listboxId"
      :class="[
        'flex min-h-[42px] w-full cursor-pointer items-center rounded-lg border bg-white px-3 py-2 transition-colors',
        'dark:bg-gray-900',
        disabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
          : isOpen
            ? 'border-primary ring-2 ring-primary/20'
            : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500',
      ]"
      @click="openDropdown"
    >
      <!-- Selected value or placeholder -->
      <span
        v-if="!isOpen"
        :class="[
          'flex-1 truncate text-sm',
          selectedOptions.length ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500',
        ]"
      >
        {{ displayValue || placeholder }}
      </span>

      <!-- Search input (when open) -->
      <input
        v-else
        :id="inputId"
        ref="inputRef"
        v-model="search"
        type="text"
        :name="name"
        :placeholder="searchPlaceholder"
        :disabled="disabled"
        aria-autocomplete="list"
        :aria-controls="listboxId"
        class="flex-1 border-none bg-transparent text-sm text-gray-900 outline-hidden placeholder:text-gray-400 dark:text-gray-100 dark:placeholder:text-gray-500"
        @click.stop
      />

      <!-- Actions -->
      <div class="flex items-center gap-1">
        <!-- Clear button -->
        <button
          v-if="clearable && selectedOptions.length > 0 && !disabled"
          type="button"
          class="rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          aria-label="Clear selection"
          @click.stop="clear"
        >
          <Icon icon="lucide:x" class="size-4" aria-hidden="true" />
        </button>

        <!-- Chevron -->
        <Icon
          icon="lucide:chevron-down"
          :class="[
            'size-4 text-gray-400 transition-transform',
            isOpen && 'rotate-180',
          ]"
          aria-hidden="true"
        />
      </div>
    </div>

    <!-- Dropdown -->
    <Teleport :to="teleportTarget" :disabled="teleportDisabled">
      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div
          v-if="isOpen"
          :id="listboxId"
          role="listbox"
          :aria-label="placeholder"
          :aria-multiselectable="multiple || undefined"
          class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
        >
          <!-- Options -->
          <template v-if="filteredOptions.length">
            <button
              v-for="option in filteredOptions"
              :key="option.value"
              type="button"
              role="option"
              :aria-selected="isSelected(option)"
              :aria-disabled="option.disabled || undefined"
              :disabled="option.disabled"
              :class="[
                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                option.disabled
                  ? 'cursor-not-allowed text-gray-400 dark:text-gray-500'
                  : isSelected(option)
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800',
              ]"
              @click="toggleOption(option)"
            >
              <!-- Checkbox for multiple -->
              <span
                v-if="multiple"
                :class="[
                  'flex size-4 items-center justify-center rounded border',
                  isSelected(option)
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 dark:border-gray-600',
                ]"
                aria-hidden="true"
              >
                <Icon v-if="isSelected(option)" icon="lucide:check" class="size-3" />
              </span>

              <!-- Label -->
              <span class="flex-1">{{ option.label }}</span>

              <!-- Check for single -->
              <Icon
                v-if="!multiple && isSelected(option)"
                icon="lucide:check"
                class="size-4 text-primary"
                aria-hidden="true"
              />
            </button>
          </template>

          <!-- No results -->
          <div
            v-else
            class="px-3 py-2 text-center text-sm text-gray-500 dark:text-gray-400"
            role="status"
          >
            {{ noResultsText }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
