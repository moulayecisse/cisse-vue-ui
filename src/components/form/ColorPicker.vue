<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    /** Current color value (hex) */
    modelValue?: string
    /** Predefined color swatches */
    swatches?: string[]
    /** Show custom color input */
    showInput?: boolean
    /** Disabled state */
    disabled?: boolean
    /** Label */
    label?: string
    /** Teleport target (e.g., 'body', '#app'). Set to false to disable teleport. */
    teleport?: string | false
  }>(),
  {
    modelValue: '#3b82f6',
    swatches: () => [
      '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
      '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
      '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
      '#ec4899', '#f43f5e', '#78716c', '#737373', '#000000',
    ],
    showInput: true,
    disabled: false,
    teleport: false,
  },
)

const teleportDisabled = computed(() => props.teleport === false)
const teleportTarget = computed(() => props.teleport === false ? 'body' : props.teleport)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  },
)

const selectColor = (color: string) => {
  emit('update:modelValue', color)
  inputValue.value = color
}

const handleInputChange = () => {
  const color = inputValue.value
  // Validate hex color
  if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color)) {
    emit('update:modelValue', color)
  }
}

const handleNativeInput = (event: Event) => {
  const color = (event.target as HTMLInputElement).value
  emit('update:modelValue', color)
  inputValue.value = color
}

const togglePicker = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const closePicker = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="relative inline-block">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {{ label }}
    </label>

    <!-- Trigger -->
    <button
      type="button"
      class="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      :disabled="disabled"
      @click="togglePicker"
    >
      <span
        class="w-6 h-6 rounded border border-gray-200 dark:border-gray-600"
        :style="{ backgroundColor: modelValue }"
      />
      <span class="text-sm font-mono text-gray-700 dark:text-gray-300">
        {{ modelValue }}
      </span>
      <Icon
        icon="heroicons:chevron-down"
        class="w-4 h-4 text-gray-400"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown -->
    <Teleport :to="teleportTarget" :disabled="teleportDisabled">
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
          class="absolute z-50 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          @click.stop
        >
          <!-- Swatches -->
          <div class="grid grid-cols-5 gap-2 mb-3">
            <button
              v-for="color in swatches"
              :key="color"
              type="button"
              class="w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
              :class="[
                modelValue === color
                  ? 'border-primary-500 ring-2 ring-primary-500 ring-offset-1'
                  : 'border-transparent',
              ]"
              :style="{ backgroundColor: color }"
              :title="color"
              @click="selectColor(color)"
            >
              <Icon
                v-if="modelValue === color"
                icon="heroicons:check"
                class="w-4 h-4 mx-auto"
                :class="[
                  ['#ffffff', '#f9fafb', '#f3f4f6', '#e5e7eb', '#eab308', '#f59e0b'].includes(color)
                    ? 'text-gray-800'
                    : 'text-white',
                ]"
              />
            </button>
          </div>

          <!-- Custom input -->
          <div v-if="showInput" class="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <input
              type="color"
              :value="modelValue"
              class="w-8 h-8 rounded cursor-pointer border-0 p-0"
              @input="handleNativeInput"
            />
            <input
              v-model="inputValue"
              type="text"
              class="flex-1 px-2 py-1 text-sm font-mono border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="#000000"
              @change="handleInputChange"
              @keyup.enter="handleInputChange"
            />
          </div>
        </div>
      </Transition>

      <!-- Click outside to close -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40"
        @click="closePicker"
      />
    </Teleport>
  </div>
</template>
