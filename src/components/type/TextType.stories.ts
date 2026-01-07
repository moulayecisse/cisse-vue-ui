import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TextType from './TextType.vue'

const meta: Meta<typeof TextType> = {
  title: 'Type/TextType',
  component: TextType,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 'Hello, World!',
  },
  render: (args) => ({
    components: { TextType },
    setup: () => ({ args }),
    template: '<TextType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TextType value="Hello, World!" />`,
      },
    },
  },
}

export const NullValue: Story = {
  args: {
    value: null,
  },
  render: (args) => ({
    components: { TextType },
    setup: () => ({ args }),
    template: '<TextType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TextType :value="null" />`,
      },
    },
  },
}

export const UndefinedValue: Story = {
  args: {
    value: undefined,
  },
  render: (args) => ({
    components: { TextType },
    setup: () => ({ args }),
    template: '<TextType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TextType :value="undefined" />`,
      },
    },
  },
}

export const NumberAsText: Story = {
  args: {
    value: 12345,
  },
  render: (args) => ({
    components: { TextType },
    setup: () => ({ args }),
    template: '<TextType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<TextType :value="12345" />`,
      },
    },
  },
}

export const InTable: Story = {
  render: () => ({
    components: { TextType },
    template: `
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Name</th>
            <th class="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><TextType value="John Doe" /></td>
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><TextType value="john@example.com" /></td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><TextType value="Jane Smith" /></td>
            <td class="px-4 py-2 text-sm text-gray-600 dark:text-gray-400"><TextType value="jane@example.com" /></td>
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
      <td><TextType value="John Doe" /></td>
      <td><TextType value="john@example.com" /></td>
    </tr>
    <tr>
      <td><TextType value="Jane Smith" /></td>
      <td><TextType value="jane@example.com" /></td>
    </tr>
  </tbody>
</table>`,
      },
    },
  },
}
