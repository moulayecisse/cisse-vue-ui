import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'

const meta: Meta<typeof SearchInput> = {
  title: 'Form/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Search...',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="max-w-sm">
        <SearchInput v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-500">Value: "{{ value }}"</p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: (args) => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('Hello world')
      return { args, value }
    },
    template: `
      <div class="max-w-sm">
        <SearchInput v-bind="args" v-model="value" />
      </div>
    `,
  }),
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search users...',
  },
  render: (args) => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="max-w-sm">
        <SearchInput v-bind="args" v-model="value" />
      </div>
    `,
  }),
}

export const CustomIcon: Story = {
  args: {
    placeholder: 'Filter...',
    icon: 'lucide:filter',
  },
  render: (args) => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="max-w-sm">
        <SearchInput v-bind="args" v-model="value" />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Search disabled...',
    disabled: true,
  },
  render: (args) => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('Cannot edit')
      return { args, value }
    },
    template: `
      <div class="max-w-sm">
        <SearchInput v-bind="args" v-model="value" />
      </div>
    `,
  }),
}

export const InHeader: Story = {
  render: () => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('')
      return { value }
    },
    template: `
      <div class="flex items-center justify-between rounded-lg bg-white p-4 shadow dark:bg-gray-800">
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">Users</h1>
        <div class="w-64">
          <SearchInput v-model="value" placeholder="Search users..." />
        </div>
      </div>
    `,
  }),
}

export const WithFiltering: Story = {
  render: () => ({
    components: { SearchInput },
    setup: () => {
      const search = ref('')
      const items = [
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Elderberry',
        'Fig',
        'Grape',
        'Honeydew',
      ]

      return { search, items }
    },
    template: `
      <div class="max-w-sm">
        <SearchInput v-model="search" placeholder="Filter fruits..." />
        <ul class="mt-4 space-y-1">
          <li
            v-for="item in items.filter(i => i.toLowerCase().includes(search.toLowerCase()))"
            :key="item"
            class="rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {{ item }}
          </li>
          <li
            v-if="items.filter(i => i.toLowerCase().includes(search.toLowerCase())).length === 0"
            class="px-3 py-2 text-sm text-gray-500"
          >
            No results found
          </li>
        </ul>
      </div>
    `,
  }),
}

export const DifferentWidths: Story = {
  render: () => ({
    components: { SearchInput },
    setup: () => {
      const value = ref('')
      return { value }
    },
    template: `
      <div class="space-y-4">
        <div class="w-48">
          <p class="mb-1 text-xs text-gray-500">Small (w-48)</p>
          <SearchInput v-model="value" placeholder="Search..." />
        </div>
        <div class="w-64">
          <p class="mb-1 text-xs text-gray-500">Medium (w-64)</p>
          <SearchInput v-model="value" placeholder="Search..." />
        </div>
        <div class="w-96">
          <p class="mb-1 text-xs text-gray-500">Large (w-96)</p>
          <SearchInput v-model="value" placeholder="Search..." />
        </div>
        <div class="w-full">
          <p class="mb-1 text-xs text-gray-500">Full width</p>
          <SearchInput v-model="value" placeholder="Search..." />
        </div>
      </div>
    `,
  }),
}
