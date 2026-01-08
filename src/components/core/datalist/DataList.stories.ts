import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { DataList, DataListItem, DataListLabel, DataListValue } from './index'

const meta: Meta<typeof DataList> = {
  title: 'Core/DataList',
  component: DataList,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
    },
  },
  args: {
    size: 'md',
    variant: 'default',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { label: 'Full name', value: 'Margot Foster' },
  { label: 'Email address', value: 'margotfoster@example.com' },
  { label: 'Salary expectation', value: '$120,000' },
  { label: 'About', value: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
  },
  render: (args) => ({
    components: { DataList },
    setup: () => ({ args }),
    template: '<DataList v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DataList :items="[
  { label: 'Full name', value: 'Margot Foster' },
  { label: 'Email address', value: 'margotfoster@example.com' },
]" />`,
      },
    },
  },
}

export const WithSlots: Story = {
  render: () => ({
    components: { DataList, DataListItem, DataListLabel, DataListValue },
    template: `
      <DataList>
        <DataListItem>
          <DataListLabel>Full name</DataListLabel>
          <DataListValue>Margot Foster</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Email</DataListLabel>
          <DataListValue>
            <a href="mailto:margot@example.com" class="text-primary-600 hover:underline">
              margot@example.com
            </a>
          </DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Status</DataListLabel>
          <DataListValue>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Active
            </span>
          </DataListValue>
        </DataListItem>
      </DataList>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DataList>
  <DataListItem>
    <DataListLabel>Full name</DataListLabel>
    <DataListValue>Margot Foster</DataListValue>
  </DataListItem>
  <DataListItem>
    <DataListLabel>Email</DataListLabel>
    <DataListValue>
      <a href="mailto:margot@example.com">margot@example.com</a>
    </DataListValue>
  </DataListItem>
</DataList>`,
      },
    },
  },
}

export const Striped: Story = {
  args: {
    items: sampleItems,
    variant: 'striped',
  },
  render: (args) => ({
    components: { DataList },
    setup: () => ({ args }),
    template: '<DataList v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DataList :items="items" variant="striped" />`,
      },
    },
  },
}

export const Bordered: Story = {
  args: {
    items: sampleItems,
    variant: 'bordered',
  },
  render: (args) => ({
    components: { DataList },
    setup: () => ({ args }),
    template: '<DataList v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DataList :items="items" variant="bordered" />`,
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { DataList },
    setup: () => ({ items: sampleItems.slice(0, 2) }),
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Small</h3>
          <DataList :items="items" size="sm" variant="bordered" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Medium (default)</h3>
          <DataList :items="items" size="md" variant="bordered" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Large</h3>
          <DataList :items="items" size="lg" variant="bordered" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DataList :items="items" size="sm" />
<DataList :items="items" size="md" />
<DataList :items="items" size="lg" />`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { DataList },
    setup: () => ({ items: sampleItems.slice(0, 3) }),
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Default</h3>
          <DataList :items="items" variant="default" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Striped</h3>
          <DataList :items="items" variant="striped" />
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500 mb-2">Bordered</h3>
          <DataList :items="items" variant="bordered" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DataList :items="items" variant="default" />
<DataList :items="items" variant="striped" />
<DataList :items="items" variant="bordered" />`,
      },
    },
  },
}

export const InCard: Story = {
  render: () => ({
    components: { DataList },
    setup: () => ({ items: sampleItems }),
    template: `
      <div class="max-w-2xl bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Applicant Information</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Personal details and application.</p>
        </div>
        <DataList :items="items" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="bg-white shadow rounded-lg overflow-hidden">
  <div class="px-4 py-5 border-b">
    <h3>Applicant Information</h3>
  </div>
  <DataList :items="items" />
</div>`,
      },
    },
  },
}
