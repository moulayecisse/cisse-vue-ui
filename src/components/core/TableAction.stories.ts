import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TableAction from './TableAction.vue'

const meta: Meta<typeof TableAction> = {
  title: 'Core/TableAction',
  component: TableAction,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    color: {
      control: 'select',
      options: ['default', 'info', 'warning', 'success', 'error'],
    },
    link: { control: 'text' },
  },
  args: {
    icon: 'heroicons:pencil',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'heroicons:pencil',
  },
}

export const Info: Story = {
  args: {
    icon: 'heroicons:eye',
    color: 'info',
  },
}

export const Warning: Story = {
  args: {
    icon: 'heroicons:exclamation-triangle',
    color: 'warning',
  },
}

export const Success: Story = {
  args: {
    icon: 'heroicons:check',
    color: 'success',
  },
}

export const Error: Story = {
  args: {
    icon: 'heroicons:trash',
    color: 'error',
  },
}

export const WithLink: Story = {
  args: {
    icon: 'heroicons:arrow-top-right-on-square',
    color: 'info',
    link: '/details/1',
  },
}

export const AllColors: Story = {
  render: () => ({
    components: { TableAction },
    template: `
      <div class="flex items-center gap-2">
        <TableAction icon="heroicons:pencil" />
        <TableAction icon="heroicons:eye" color="info" />
        <TableAction icon="heroicons:exclamation-triangle" color="warning" />
        <TableAction icon="heroicons:check" color="success" />
        <TableAction icon="heroicons:trash" color="error" />
      </div>
    `,
  }),
}

export const CommonActions: Story = {
  render: () => ({
    components: { TableAction },
    template: `
      <div class="flex items-center gap-2">
        <TableAction icon="heroicons:eye" color="info" />
        <TableAction icon="heroicons:pencil" color="warning" />
        <TableAction icon="heroicons:trash" color="error" />
      </div>
    `,
  }),
}

export const InTableRow: Story = {
  render: () => ({
    components: { TableAction },
    template: `
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
            <th class="px-4 py-2 text-right text-sm font-medium text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr class="bg-white dark:bg-gray-900">
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">John Doe</td>
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Active</td>
            <td class="px-4 py-2 text-right">
              <div class="flex justify-end gap-2">
                <TableAction icon="heroicons:eye" color="info" />
                <TableAction icon="heroicons:pencil" color="warning" />
                <TableAction icon="heroicons:trash" color="error" />
              </div>
            </td>
          </tr>
          <tr class="bg-white dark:bg-gray-900">
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Jane Smith</td>
            <td class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">Pending</td>
            <td class="px-4 py-2 text-right">
              <div class="flex justify-end gap-2">
                <TableAction icon="heroicons:eye" color="info" />
                <TableAction icon="heroicons:pencil" color="warning" />
                <TableAction icon="heroicons:trash" color="error" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    `,
  }),
}
