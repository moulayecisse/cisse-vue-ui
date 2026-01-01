<script lang="ts">
export interface PhoneCountry {
  code: string
  name: string
  dialCode: string
  flag: string
}

export const defaultCountries: PhoneCountry[] = [
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'ML', name: 'Mali', dialCode: '+223', flag: '🇲🇱' },
  { code: 'SN', name: 'Senegal', dialCode: '+221', flag: '🇸🇳' },
  { code: 'CI', name: 'Côte d\'Ivoire', dialCode: '+225', flag: '🇨🇮' },
  { code: 'MA', name: 'Morocco', dialCode: '+212', flag: '🇲🇦' },
  { code: 'TN', name: 'Tunisia', dialCode: '+216', flag: '🇹🇳' },
  { code: 'DZ', name: 'Algeria', dialCode: '+213', flag: '🇩🇿' },
]
</script>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import InputWrapper from './InputWrapper.vue'
import type { InputWrapperSize } from './InputWrapper.vue'

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Input name */
    name?: string
    /** Input id */
    id?: string
    /** Required field */
    required?: boolean
    /** Aria describedby */
    describedBy?: string
    /** Default country code */
    defaultCountry?: string
    /** Available countries */
    countries?: PhoneCountry[]
  }>(),
  {
    placeholder: 'Phone number',
    size: 'md',
    defaultCountry: 'FR',
    countries: () => defaultCountries,
  }
)

const modelValue = defineModel<string>({ default: '' })

const selectedCountry = ref<PhoneCountry>(
  props.countries.find((c) => c.code === props.defaultCountry) || props.countries[0]
)

const showDropdown = ref(false)
const searchQuery = ref('')
const dropdownRef = ref<HTMLDivElement | null>(null)

const filteredCountries = computed(() => {
  if (!searchQuery.value) return props.countries
  const query = searchQuery.value.toLowerCase()
  return props.countries.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.dialCode.includes(query) ||
      c.code.toLowerCase().includes(query)
  )
})

const fullNumber = computed(() => {
  if (!modelValue.value) return ''
  return `${selectedCountry.value.dialCode}${modelValue.value}`
})

function selectCountry(country: PhoneCountry) {
  selectedCountry.value = country
  showDropdown.value = false
  searchQuery.value = ''
}

function formatPhoneNumber(value: string): string {
  // Remove non-numeric characters
  const cleaned = value.replace(/\D/g, '')
  return cleaned
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  const formatted = formatPhoneNumber(target.value)
  modelValue.value = formatted
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showDropdown.value = false
    searchQuery.value = ''
  }
}

watch(showDropdown, (isOpen) => {
  if (isOpen) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

defineExpose({ selectedCountry, fullNumber })
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <InputWrapper
      :size="size"
      :disabled="disabled"
    >
      <template #icon>
        <button
          type="button"
          :disabled="disabled"
          class="flex items-center gap-1 pr-2 border-r border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 -ml-1 pl-1 py-1 rounded-l transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click.stop="showDropdown = !showDropdown"
        >
          <span class="text-lg leading-none">{{ selectedCountry.flag }}</span>
          <Icon
            icon="lucide:chevron-down"
            :class="[
              'size-3 text-gray-400 transition-transform',
              showDropdown && 'rotate-180',
            ]"
          />
        </button>
      </template>
      <template #default="{ inputClass }">
        <input
          :id="id ?? name"
          :value="modelValue"
          type="tel"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          :aria-required="required || undefined"
          :aria-describedby="describedBy"
          :class="[inputClass, 'pl-20']"
          @input="handleInput"
        />
      </template>
      <template #actions>
        <span class="text-xs text-gray-400 font-medium">
          {{ selectedCountry.dialCode }}
        </span>
      </template>
    </InputWrapper>

    <!-- Country dropdown -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showDropdown"
        class="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden"
      >
        <!-- Search -->
        <div class="p-2 border-b border-gray-100 dark:border-slate-700">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search countries..."
            class="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <!-- Country list -->
        <ul class="max-h-48 overflow-y-auto">
          <li
            v-for="country in filteredCountries"
            :key="country.code"
            class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            :class="selectedCountry.code === country.code && 'bg-primary-50 dark:bg-primary-900/20'"
            @click="selectCountry(country)"
          >
            <span class="text-lg">{{ country.flag }}</span>
            <span class="flex-1 text-sm text-gray-700 dark:text-gray-300">{{ country.name }}</span>
            <span class="text-sm text-gray-400">{{ country.dialCode }}</span>
          </li>
          <li v-if="filteredCountries.length === 0" class="px-3 py-4 text-center text-sm text-gray-500">
            No countries found
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
