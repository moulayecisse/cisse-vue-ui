import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NumberType from './NumberType.vue'

const meta: Meta<typeof NumberType> = {
  title: 'Type/NumberType',
  component: NumberType,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    locale: { control: 'text' },
  },
  args: {
    locale: 'en-US',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 1234567.89,
  },
  render: (args) => ({
    components: { NumberType },
    setup: () => ({ args }),
    template: '<NumberType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<NumberType :value="1234567.89" />`,
      },
    },
  },
}

export const Integer: Story = {
  args: {
    value: 1000000,
  },
  render: (args) => ({
    components: { NumberType },
    setup: () => ({ args }),
    template: '<NumberType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<NumberType :value="1000000" />`,
      },
    },
  },
}

export const FrenchLocale: Story = {
  args: {
    value: 1234567.89,
    locale: 'fr-FR',
  },
  render: (args) => ({
    components: { NumberType },
    setup: () => ({ args }),
    template: '<NumberType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<NumberType :value="1234567.89" locale="fr-FR" />`,
      },
    },
  },
}

export const GermanLocale: Story = {
  args: {
    value: 1234567.89,
    locale: 'de-DE',
  },
  render: (args) => ({
    components: { NumberType },
    setup: () => ({ args }),
    template: '<NumberType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<NumberType :value="1234567.89" locale="de-DE" />`,
      },
    },
  },
}

export const NullValue: Story = {
  args: {
    value: null,
  },
  render: (args) => ({
    components: { NumberType },
    setup: () => ({ args }),
    template: '<NumberType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<NumberType :value="null" />`,
      },
    },
  },
}

export const AllLocales: Story = {
  render: () => ({
    components: { NumberType },
    setup: () => ({
      value: 1234567.89,
    }),
    template: `
      <div class="space-y-2">
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">en-US:</span>
          <NumberType :value="value" locale="en-US" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">fr-FR:</span>
          <NumberType :value="value" locale="fr-FR" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">de-DE:</span>
          <NumberType :value="value" locale="de-DE" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">ja-JP:</span>
          <NumberType :value="value" locale="ja-JP" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<NumberType :value="1234567.89" locale="en-US" />
<NumberType :value="1234567.89" locale="fr-FR" />
<NumberType :value="1234567.89" locale="de-DE" />
<NumberType :value="1234567.89" locale="ja-JP" />`,
      },
    },
  },
}
