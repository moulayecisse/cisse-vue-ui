import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FilterTabs from './FilterTabs.vue'

const meta: Meta<typeof FilterTabs> = {
  title: 'Core/FilterTabs',
  component: FilterTabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pills', 'underline', 'boxed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Pills: Story = {
  args: {
    options: [
      { key: 'all', label: 'All', icon: 'heroicons:squares-2x2' },
      { key: 'active', label: 'Active', icon: 'heroicons:check-circle' },
      { key: 'pending', label: 'Pending', icon: 'heroicons:clock' },
    ],
    variant: 'pills',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('all')
      return { args, selected }
    },
    template: `
      <div>
        <FilterTabs v-model="selected" v-bind="args" />
        <p class="mt-4 text-sm text-gray-600">Selected: {{ selected }}</p>
      </div>
    `,
  }),
}

export const Underline: Story = {
  args: {
    options: [
      { key: 'overview', label: 'Overview' },
      { key: 'analytics', label: 'Analytics' },
      { key: 'reports', label: 'Reports' },
      { key: 'settings', label: 'Settings' },
    ],
    variant: 'underline',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('overview')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}

export const Boxed: Story = {
  args: {
    options: [
      { key: 'day', label: 'Day' },
      { key: 'week', label: 'Week' },
      { key: 'month', label: 'Month' },
      { key: 'year', label: 'Year' },
    ],
    variant: 'boxed',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('week')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}

export const WithCounts: Story = {
  args: {
    options: [
      { key: 'all', label: 'All', count: 42 },
      { key: 'unread', label: 'Unread', count: 7 },
      { key: 'starred', label: 'Starred', count: 12 },
    ],
    variant: 'pills',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('all')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}

export const WithIcons: Story = {
  args: {
    options: [
      { key: 'inbox', label: 'Inbox', icon: 'heroicons:inbox', count: 24 },
      { key: 'sent', label: 'Sent', icon: 'heroicons:paper-airplane' },
      { key: 'drafts', label: 'Drafts', icon: 'heroicons:document', count: 3 },
      { key: 'trash', label: 'Trash', icon: 'heroicons:trash' },
    ],
    variant: 'pills',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('inbox')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}

export const Small: Story = {
  args: {
    options: [
      { key: 'a', label: 'Option A' },
      { key: 'b', label: 'Option B' },
      { key: 'c', label: 'Option C' },
    ],
    variant: 'pills',
    size: 'sm',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('a')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}

export const Large: Story = {
  args: {
    options: [
      { key: 'a', label: 'Option A' },
      { key: 'b', label: 'Option B' },
      { key: 'c', label: 'Option C' },
    ],
    variant: 'pills',
    size: 'lg',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('a')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}

export const FullWidth: Story = {
  args: {
    options: [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2' },
      { key: 'tab3', label: 'Tab 3' },
    ],
    variant: 'pills',
    fullWidth: true,
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('tab1')
      return { args, selected }
    },
    template: `
      <div class="w-full max-w-md">
        <FilterTabs v-model="selected" v-bind="args" />
      </div>
    `,
  }),
}

export const WithDisabled: Story = {
  args: {
    options: [
      { key: 'available', label: 'Available' },
      { key: 'coming', label: 'Coming Soon', disabled: true },
      { key: 'archived', label: 'Archived' },
    ],
    variant: 'pills',
  },
  render: (args) => ({
    components: { FilterTabs },
    setup() {
      const selected = ref('available')
      return { args, selected }
    },
    template: `<FilterTabs v-model="selected" v-bind="args" />`,
  }),
}
