import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BooleanType from './BooleanType.vue'

const meta: Meta<typeof BooleanType> = {
  title: 'Type/BooleanType',
  component: BooleanType,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'boolean' },
    display: {
      control: 'select',
      options: ['text', 'icon', 'both'],
    },
    trueLabel: { control: 'text' },
    falseLabel: { control: 'text' },
  },
  args: {
    display: 'text',
    trueLabel: 'Yes',
    falseLabel: 'No',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const True: Story = {
  args: {
    value: true,
  },
  render: (args) => ({
    components: { BooleanType },
    setup: () => ({ args }),
    template: '<BooleanType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<BooleanType :value="true" />`,
      },
    },
  },
}

export const False: Story = {
  args: {
    value: false,
  },
  render: (args) => ({
    components: { BooleanType },
    setup: () => ({ args }),
    template: '<BooleanType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<BooleanType :value="false" />`,
      },
    },
  },
}

export const IconOnly: Story = {
  args: {
    value: true,
    display: 'icon',
  },
  render: (args) => ({
    components: { BooleanType },
    setup: () => ({ args }),
    template: '<BooleanType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<BooleanType :value="true" display="icon" />`,
      },
    },
  },
}

export const IconAndText: Story = {
  args: {
    value: true,
    display: 'both',
  },
  render: (args) => ({
    components: { BooleanType },
    setup: () => ({ args }),
    template: '<BooleanType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<BooleanType :value="true" display="both" />`,
      },
    },
  },
}

export const CustomLabels: Story = {
  args: {
    value: true,
    display: 'both',
    trueLabel: 'Active',
    falseLabel: 'Inactive',
  },
  render: (args) => ({
    components: { BooleanType },
    setup: () => ({ args }),
    template: '<BooleanType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<BooleanType :value="true" display="both" true-label="Active" false-label="Inactive" />`,
      },
    },
  },
}

export const AllDisplayModes: Story = {
  render: () => ({
    components: { BooleanType },
    template: `
      <div class="space-y-4">
        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">True values:</h4>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">text:</span>
              <BooleanType :value="true" display="text" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">icon:</span>
              <BooleanType :value="true" display="icon" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">both:</span>
              <BooleanType :value="true" display="both" />
            </div>
          </div>
        </div>
        <div>
          <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">False values:</h4>
          <div class="flex items-center gap-6">
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">text:</span>
              <BooleanType :value="false" display="text" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">icon:</span>
              <BooleanType :value="false" display="icon" />
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs text-gray-500">both:</span>
              <BooleanType :value="false" display="both" />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- True values -->
<BooleanType :value="true" display="text" />
<BooleanType :value="true" display="icon" />
<BooleanType :value="true" display="both" />

<!-- False values -->
<BooleanType :value="false" display="text" />
<BooleanType :value="false" display="icon" />
<BooleanType :value="false" display="both" />`,
      },
    },
  },
}

export const InTable: Story = {
  render: () => ({
    components: { BooleanType },
    template: `
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">User</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Active</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Verified</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">John Doe</td>
            <td class="px-4 py-2 text-sm"><BooleanType :value="true" display="both" /></td>
            <td class="px-4 py-2 text-sm"><BooleanType :value="true" display="icon" /></td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">Jane Smith</td>
            <td class="px-4 py-2 text-sm"><BooleanType :value="false" display="both" /></td>
            <td class="px-4 py-2 text-sm"><BooleanType :value="true" display="icon" /></td>
          </tr>
        </tbody>
      </table>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<table>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td><BooleanType :value="true" display="both" /></td>
      <td><BooleanType :value="true" display="icon" /></td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td><BooleanType :value="false" display="both" /></td>
      <td><BooleanType :value="true" display="icon" /></td>
    </tr>
  </tbody>
</table>`,
      },
    },
  },
}
