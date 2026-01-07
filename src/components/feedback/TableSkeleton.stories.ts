import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TableSkeleton from './TableSkeleton.vue'

const meta: Meta<typeof TableSkeleton> = {
  title: 'Feedback/TableSkeleton',
  component: TableSkeleton,
  tags: ['autodocs'],
  argTypes: {
    rows: { control: { type: 'number', min: 1, max: 20 } },
    columns: { control: { type: 'number', min: 1, max: 10 } },
    showHeader: { control: 'boolean' },
  },
  args: {
    rows: 5,
    columns: 4,
    showHeader: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: '<TableSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TableSkeleton />`,
      },
    },
  },
}

export const NoHeader: Story = {
  args: {
    showHeader: false,
  },
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: '<TableSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TableSkeleton :show-header="false" />`,
      },
    },
  },
}

export const ThreeColumns: Story = {
  args: {
    columns: 3,
  },
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: '<TableSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TableSkeleton :columns="3" />`,
      },
    },
  },
}

export const SixColumns: Story = {
  args: {
    columns: 6,
  },
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: '<TableSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TableSkeleton :columns="6" />`,
      },
    },
  },
}

export const TenRows: Story = {
  args: {
    rows: 10,
  },
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: '<TableSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TableSkeleton :rows="10" />`,
      },
    },
  },
}

export const Compact: Story = {
  args: {
    rows: 3,
    columns: 3,
  },
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: '<TableSkeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TableSkeleton :rows="3" :columns="3" />`,
      },
    },
  },
}

export const InCard: Story = {
  args: {
    rows: 5,
    columns: 4,
  },
  render: (args) => ({
    components: { TableSkeleton },
    setup: () => ({ args }),
    template: `
      <div class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <TableSkeleton v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <TableSkeleton :rows="5" :columns="4" />
</Card>`,
      },
    },
  },
}
