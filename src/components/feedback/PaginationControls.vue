<script lang="ts" setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const {
  currentPage,
  totalPages,
  loading = false,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSize = true,
  showPageNumbers = true,
  maxVisiblePages = 7,
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
  showPageNumbers?: boolean
  maxVisiblePages?: number
  pageLabel?: string
  ofLabel?: string
  itemsPerPageLabel?: string
  previousLabel?: string
  nextLabel?: string
}>()

type PageItem = number | 'ellipsis-start' | 'ellipsis-end'

const visiblePages = computed<PageItem[]>(() => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: PageItem[] = []
  const sidePages = Math.floor((maxVisiblePages - 3) / 2)

  // Always show first page
  pages.push(1)

  // Calculate range around current page
  let rangeStart = Math.max(2, currentPage - sidePages)
  let rangeEnd = Math.min(totalPages - 1, currentPage + sidePages)

  // Adjust range to show more pages on one side if near edges
  if (currentPage <= sidePages + 2) {
    rangeEnd = Math.min(totalPages - 1, maxVisiblePages - 2)
  } else if (currentPage >= totalPages - sidePages - 1) {
    rangeStart = Math.max(2, totalPages - maxVisiblePages + 3)
  }

  // Add ellipsis or pages after first page
  if (rangeStart > 2) {
    pages.push('ellipsis-start')
  }

  // Add range pages
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i)
  }

  // Add ellipsis or pages before last page
  if (rangeEnd < totalPages - 1) {
    pages.push('ellipsis-end')
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
})

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
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-200 px-4 sm:px-6 py-4 dark:border-gray-700"
  >
    <!-- Info and page size -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div class="text-sm text-gray-700 dark:text-gray-300 text-center sm:text-left">
        {{ pageLabel }} {{ currentPage }} {{ ofLabel }} {{ totalPages }}
      </div>
      <div
        v-if="showPageSize"
        class="flex items-center justify-center sm:justify-start gap-2"
      >
        <label
          class="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline"
          for="page-size"
        >
          {{ itemsPerPageLabel }}
        </label>
        <select
          id="page-size"
          :value="pageSize"
          class="focus:border-primary focus:ring-primary rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          @change="changePageSize"
        >
          <option
            v-for="size in pageSizeOptions"
            :key="size"
            :value="size"
          >
            {{ size }}
          </option>
        </select>
      </div>
    </div>

    <!-- Navigation buttons -->
    <div class="flex justify-center sm:justify-end items-center gap-1">
      <!-- Previous button -->
      <button
        :disabled="currentPage === 1 || loading"
        class="focus:ring-primary inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        @click="changePage(currentPage - 1)"
      >
        <Icon
          class="size-4"
          icon="lucide:chevron-left"
        />
        <span class="hidden sm:inline">{{ previousLabel }}</span>
      </button>

      <!-- Page numbers -->
      <template v-if="showPageNumbers">
        <template
          v-for="page in visiblePages"
          :key="page"
        >
          <!-- Ellipsis -->
          <span
            v-if="page === 'ellipsis-start' || page === 'ellipsis-end'"
            class="px-2 py-2 text-sm text-gray-500 dark:text-gray-400"
          >
            …
          </span>
          <!-- Page number button -->
          <button
            v-else
            :disabled="loading"
            :class="[
              'min-w-[40px] px-3 py-2 text-sm font-medium rounded-lg border transition-colors',
              page === currentPage
                ? 'bg-primary-600 text-white border-primary-600 dark:bg-primary-500 dark:border-primary-500'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700',
              loading ? 'cursor-not-allowed opacity-50' : ''
            ]"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </template>
      </template>

      <!-- Next button -->
      <button
        :disabled="currentPage === totalPages || loading"
        class="focus:ring-primary inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        @click="changePage(currentPage + 1)"
      >
        <span class="hidden sm:inline">{{ nextLabel }}</span>
        <Icon
          class="size-4"
          icon="lucide:chevron-right"
        />
      </button>
    </div>
  </div>
</template>
