<script lang="ts" setup>
import { Icon } from '@iconify/vue'

const {
  currentPage,
  totalPages,
  loading = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSize = true,
  pageLabel = 'Page',
  ofLabel = 'of',
  itemsPerPageLabel = 'Items per page:',
  previousLabel = 'Previous',
  nextLabel = 'Next',
} = defineProps<{
  currentPage: number
  totalPages: number
  loading?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  showPageSize?: boolean
  pageLabel?: string
  ofLabel?: string
  itemsPerPageLabel?: string
  previousLabel?: string
  nextLabel?: string
}>()

const emit = defineEmits<{
  'update:page': [page: number]
  'update:pageSize': [size: number]
}>()

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages && !loading) {
    emit('update:page', page)
  }
}

const changePageSize = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:pageSize', Number(target.value))
}
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-700"
  >
    <div class="flex items-center gap-4">
      <div class="text-sm text-gray-700 dark:text-gray-300">
        {{ pageLabel }} {{ currentPage }} {{ ofLabel }} {{ totalPages }}
      </div>
      <div v-if="showPageSize" class="flex items-center gap-2">
        <label class="text-sm text-gray-600 dark:text-gray-400" for="page-size">
          {{ itemsPerPageLabel }}
        </label>
        <select
          id="page-size"
          :value="pageSize"
          class="focus:border-primary focus:ring-primary rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          @change="changePageSize"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>
    </div>
    <div class="flex gap-2">
      <button
        :disabled="currentPage === 1 || loading"
        class="focus:ring-primary inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        @click="changePage(currentPage - 1)"
      >
        <Icon class="h-4 w-4" icon="lucide:chevron-left" />
        {{ previousLabel }}
      </button>
      <button
        :disabled="currentPage === totalPages || loading"
        class="focus:ring-primary inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        @click="changePage(currentPage + 1)"
      >
        {{ nextLabel }}
        <Icon class="h-4 w-4" icon="lucide:chevron-right" />
      </button>
    </div>
  </div>
</template>
