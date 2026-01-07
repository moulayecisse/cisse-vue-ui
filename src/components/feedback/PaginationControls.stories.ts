import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PaginationControls from './PaginationControls.vue'

const meta: Meta<typeof PaginationControls> = {
  title: 'Feedback/PaginationControls',
  component: PaginationControls,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: 'number' },
    totalPages: { control: 'number' },
    pageSize: { control: 'number' },
    showPageSize: { control: 'boolean' },
    showPageNumbers: { control: 'boolean' },
    maxVisiblePages: { control: 'number' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(1)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="10"
        :page-size="pageSize"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="currentPage"
  :total-pages="10"
  :page-size="pageSize"
  @update:page="currentPage = $event"
  @update:page-size="pageSize = $event"
/>`,
      },
    },
  },
}

export const MidPage: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(5)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="10"
        :page-size="pageSize"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="5"
  :total-pages="10"
  :page-size="10"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const LastPage: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(10)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="10"
        :page-size="pageSize"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="10"
  :total-pages="10"
  :page-size="10"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const WithoutPageSize: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="5"
        :show-page-size="false"
        @update:page="currentPage = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="currentPage"
  :total-pages="5"
  :show-page-size="false"
  @update:page="handlePageChange"
/>`,
      },
    },
  },
}

export const Loading: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(1)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="10"
        :page-size="pageSize"
        :loading="true"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="currentPage"
  :total-pages="10"
  :page-size="pageSize"
  :loading="true"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const CustomPageSizes: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(1)
      const pageSize = ref(25)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="20"
        :page-size="pageSize"
        :page-size-options="[25, 50, 100, 200]"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="currentPage"
  :total-pages="20"
  :page-size="pageSize"
  :page-size-options="[25, 50, 100, 200]"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const InTable: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(1)
      const pageSize = ref(10)
      const items = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        status: i % 2 === 0 ? 'Active' : 'Inactive',
      }))
      return { currentPage, pageSize, items }
    },
    template: `
      <div class="rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">ID</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" class="border-t border-gray-200 dark:border-gray-700">
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ item.id }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ item.name }}</td>
              <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
        <PaginationControls
          :current-page="currentPage"
          :total-pages="10"
          :page-size="pageSize"
          @update:page="currentPage = $event"
          @update:page-size="pageSize = $event"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Table :items="items" :properties="properties">
  <template #footer>
    <PaginationControls
      :current-page="currentPage"
      :total-pages="10"
      :page-size="pageSize"
      @update:page="handlePageChange"
      @update:page-size="handlePageSizeChange"
    />
  </template>
</Table>`,
      },
    },
  },
}

export const ManyPages: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(50)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="100"
        :page-size="pageSize"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="50"
  :total-pages="100"
  :page-size="10"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const ManyPagesAtStart: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(1)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="100"
        :page-size="pageSize"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="1"
  :total-pages="100"
  :page-size="10"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const ManyPagesAtEnd: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(100)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="100"
        :page-size="pageSize"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="100"
  :total-pages="100"
  :page-size="10"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const WithoutPageNumbers: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(5)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <PaginationControls
        :current-page="currentPage"
        :total-pages="20"
        :page-size="pageSize"
        :show-page-numbers="false"
        @update:page="currentPage = $event"
        @update:page-size="pageSize = $event"
      />
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<PaginationControls
  :current-page="currentPage"
  :total-pages="20"
  :page-size="pageSize"
  :show-page-numbers="false"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}

export const CustomMaxVisiblePages: Story = {
  render: () => ({
    components: { PaginationControls },
    setup: () => {
      const currentPage = ref(25)
      const pageSize = ref(10)
      return { currentPage, pageSize }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">maxVisiblePages: 5</p>
          <PaginationControls
            :current-page="currentPage"
            :total-pages="50"
            :page-size="pageSize"
            :max-visible-pages="5"
            @update:page="currentPage = $event"
            @update:page-size="pageSize = $event"
          />
        </div>
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">maxVisiblePages: 9</p>
          <PaginationControls
            :current-page="currentPage"
            :total-pages="50"
            :page-size="pageSize"
            :max-visible-pages="9"
            @update:page="currentPage = $event"
            @update:page-size="pageSize = $event"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Control how many page numbers are visible -->
<PaginationControls
  :current-page="currentPage"
  :total-pages="50"
  :page-size="pageSize"
  :max-visible-pages="5"
  @update:page="handlePageChange"
  @update:page-size="handlePageSizeChange"
/>`,
      },
    },
  },
}
