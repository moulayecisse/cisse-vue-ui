<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useDebounceFn } from '@vueuse/core'
import FormLabel from './FormLabel.vue'
import FormHelp from './FormHelp.vue'
import { useId } from '@/composables/useId'

const props = withDefaults(
  defineProps<{
    /** Field label */
    label?: string
    /** Placeholder text */
    placeholder?: string
    /** Help text */
    help?: string
    /** Error message */
    error?: string
    /** Whether the field is required */
    required?: boolean
    /** Whether the field is disabled */
    disabled?: boolean
    /** Custom ID */
    id?: string
    /** Icon collections to search (default: mdi, heroicons, lucide) */
    collections?: string[]
    /** Number of results to show */
    limit?: number
  }>(),
  {
    placeholder: 'Rechercher une icône...',
    collections: () => ['mdi', 'heroicons', 'lucide'],
    limit: 48,
  }
)

const modelValue = defineModel<string>({ default: '' })

const { id: generatedId, related } = useId({ prefix: 'iconpicker', id: props.id })
const inputId = computed(() => props.id ?? generatedId.value)
const helpId = computed(() => related('help'))

const searchQuery = ref('')
const isOpen = ref(false)
const isLoading = ref(false)
const searchResults = ref<string[]>([])

// Popular icons to show by default
const popularIcons = [
  'mdi:heart', 'mdi:star', 'mdi:home', 'mdi:account', 'mdi:email', 'mdi:phone',
  'mdi:calendar', 'mdi:clock', 'mdi:check', 'mdi:close', 'mdi:plus', 'mdi:minus',
  'mdi:stethoscope', 'mdi:hospital', 'mdi:medical-bag', 'mdi:pill', 'mdi:heart-pulse',
  'mdi:tooth', 'mdi:eye', 'mdi:brain', 'mdi:lungs', 'mdi:bone',
  'heroicons:heart', 'heroicons:star', 'heroicons:home', 'heroicons:user',
  'heroicons:envelope', 'heroicons:phone', 'heroicons:calendar', 'heroicons:clock',
  'heroicons:check', 'heroicons:x-mark', 'heroicons:plus', 'heroicons:minus',
  'lucide:heart', 'lucide:star', 'lucide:home', 'lucide:user',
  'lucide:mail', 'lucide:phone', 'lucide:calendar', 'lucide:clock',
  'lucide:check', 'lucide:x', 'lucide:plus', 'lucide:minus',
]

const displayedIcons = computed(() => {
  if (searchQuery.value && searchResults.value.length > 0) {
    return searchResults.value
  }
  return popularIcons
})

const hasError = computed(() => props.error && typeof props.error === 'string')

async function searchIcons(query: string): Promise<void> {
  if (!query || query.length < 2) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  try {
    const collectionsParam = props.collections.join(',')
    const response = await fetch(
      `https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=${props.limit}&prefixes=${collectionsParam}`
    )
    const data = await response.json()
    searchResults.value = data.icons || []
  } catch (error) {
    console.error('Failed to search icons:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const debouncedSearch = useDebounceFn(searchIcons, 300)

watch(searchQuery, (query) => {
  debouncedSearch(query)
})

function selectIcon(icon: string): void {
  modelValue.value = icon
  isOpen.value = false
  searchQuery.value = ''
}

function clearSelection(): void {
  modelValue.value = ''
}

function openPicker(): void {
  if (!props.disabled) {
    isOpen.value = true
  }
}

function closePicker(): void {
  isOpen.value = false
  searchQuery.value = ''
}
</script>

<template>
  <div class="relative">
    <FormLabel
      v-if="label"
      :html-for="inputId"
      :error="error"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-0.5">*</span>
    </FormLabel>

    <!-- Selected icon display / trigger -->
    <button
      :id="inputId"
      type="button"
      :disabled="disabled"
      :aria-invalid="hasError || undefined"
      :aria-describedby="hasError ? helpId : undefined"
      class="mt-1 flex w-full items-center gap-3 rounded-md border bg-white px-3 py-2 text-left text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-900"
      :class="[
        hasError
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-primary dark:border-gray-700',
        disabled
          ? 'cursor-not-allowed bg-gray-50 dark:bg-gray-950'
          : 'cursor-pointer hover:border-gray-400 dark:hover:border-gray-600',
      ]"
      @click="openPicker"
    >
      <div
        v-if="modelValue"
        class="flex items-center gap-2 flex-1"
      >
        <div class="flex h-8 w-8 items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
          <Icon :icon="modelValue" class="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </div>
        <span class="text-gray-700 dark:text-gray-300 font-mono text-xs truncate">{{ modelValue }}</span>
      </div>
      <span v-else class="flex-1 text-gray-400 dark:text-gray-500">
        {{ placeholder }}
      </span>
      <button
        v-if="modelValue && !disabled"
        type="button"
        class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        @click.stop="clearSelection"
      >
        <Icon icon="lucide:x" class="h-4 w-4" />
      </button>
      <Icon icon="lucide:chevron-down" class="h-4 w-4 text-gray-400" />
    </button>

    <!-- Help/Error text -->
    <FormHelp v-if="help && !hasError" :id="helpId">
      {{ help }}
    </FormHelp>
    <FormHelp v-if="hasError" :id="helpId" :error="true">
      {{ error }}
    </FormHelp>

    <!-- Dropdown picker -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50"
        @click="closePicker"
      >
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900"
          @click.stop
        >
          <!-- Search input -->
          <div class="relative mb-4">
            <Icon
              icon="lucide:search"
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="placeholder"
              class="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500"
              autofocus
            />
            <div
              v-if="isLoading"
              class="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Icon icon="lucide:loader-2" class="h-4 w-4 animate-spin text-gray-400" />
            </div>
          </div>

          <!-- Icons grid -->
          <div class="max-h-64 overflow-y-auto">
            <div
              v-if="displayedIcons.length === 0 && searchQuery"
              class="py-8 text-center text-sm text-gray-500"
            >
              Aucune icône trouvée pour "{{ searchQuery }}"
            </div>
            <div
              v-else
              class="grid grid-cols-8 gap-1"
            >
              <button
                v-for="icon in displayedIcons"
                :key="icon"
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded transition-colors"
                :class="[
                  modelValue === icon
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
                ]"
                :title="icon"
                @click="selectIcon(icon)"
              >
                <Icon :icon="icon" class="h-5 w-5" />
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
            <p class="text-xs text-gray-500">
              {{ searchQuery ? `${displayedIcons.length} résultats` : 'Icônes populaires' }}
            </p>
            <button
              type="button"
              class="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              @click="closePicker"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
