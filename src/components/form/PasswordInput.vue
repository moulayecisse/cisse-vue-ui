<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import InputWrapper from './InputWrapper.vue'
import type { InputWrapperSize } from './InputWrapper.vue'

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

const props = withDefaults(
  defineProps<{
    /** Placeholder text */
    placeholder?: string
    /** Input size */
    size?: InputWrapperSize
    /** Disabled state */
    disabled?: boolean
    /** Show strength indicator */
    showStrength?: boolean
    /** Input name */
    name?: string
    /** Input id */
    id?: string
    /** Required field */
    required?: boolean
    /** Aria describedby */
    describedBy?: string
    /** Minimum length for strength calculation */
    minLength?: number
  }>(),
  {
    placeholder: 'Enter password...',
    size: 'md',
    showStrength: false,
    minLength: 8,
  }
)

const modelValue = defineModel<string>({ default: '' })

const showPassword = ref(false)

const strength = computed<PasswordStrength | null>(() => {
  const password = modelValue.value
  if (!password) return null

  let score = 0

  // Length check
  if (password.length >= props.minLength) score++
  if (password.length >= 12) score++

  // Character variety checks
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score <= 2) return 'weak'
  if (score <= 3) return 'fair'
  if (score <= 4) return 'good'
  return 'strong'
})

const strengthConfig = computed(() => {
  const configs = {
    weak: { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' },
    fair: { label: 'Fair', color: 'bg-orange-500', width: 'w-2/4' },
    good: { label: 'Good', color: 'bg-yellow-500', width: 'w-3/4' },
    strong: { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' },
  }
  return strength.value ? configs[strength.value] : null
})

function toggleVisibility() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div>
    <InputWrapper
      icon="lucide:lock"
      :size="size"
      :disabled="disabled"
    >
      <template #default="{ inputClass }">
        <input
          :id="id ?? name"
          v-model="modelValue"
          :type="showPassword ? 'text' : 'password'"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :required="required"
          :aria-required="required || undefined"
          :aria-describedby="describedBy"
          :class="inputClass"
          v-bind="$attrs"
          autocomplete="new-password"
        />
      </template>
      <template #actions>
        <button
          type="button"
          :disabled="disabled"
          class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="toggleVisibility"
        >
          <Icon
            :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
            class="size-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          />
        </button>
      </template>
    </InputWrapper>

    <!-- Strength indicator -->
    <div v-if="showStrength && modelValue" class="mt-2">
      <div class="h-1.5 w-full rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
        <div
          :class="[
            'h-full rounded-full transition-all duration-300',
            strengthConfig?.color,
            strengthConfig?.width,
          ]"
        />
      </div>
      <p
        v-if="strengthConfig"
        :class="[
          'mt-1 text-xs font-medium',
          strength === 'weak' && 'text-red-500',
          strength === 'fair' && 'text-orange-500',
          strength === 'good' && 'text-yellow-600 dark:text-yellow-500',
          strength === 'strong' && 'text-emerald-500',
        ]"
      >
        {{ strengthConfig.label }}
      </p>
    </div>
  </div>
</template>
