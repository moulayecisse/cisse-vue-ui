import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DateType from './DateType.vue'

const meta: Meta<typeof DateType> = {
  title: 'Type/DateType',
  component: DateType,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    format: {
      control: 'select',
      options: ['date', 'datetime', 'time'],
    },
    locale: { control: 'text' },
  },
  args: {
    format: 'date',
    locale: 'en-US',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleDate = '2024-03-15T14:30:00Z'

export const DateOnly: Story = {
  args: {
    value: sampleDate,
    format: 'date',
  },
  render: (args) => ({
    components: { DateType },
    setup: () => ({ args }),
    template: '<DateType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType value="2024-03-15T14:30:00Z" format="date" />`,
      },
    },
  },
}

export const DateTime: Story = {
  args: {
    value: sampleDate,
    format: 'datetime',
  },
  render: (args) => ({
    components: { DateType },
    setup: () => ({ args }),
    template: '<DateType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType value="2024-03-15T14:30:00Z" format="datetime" />`,
      },
    },
  },
}

export const TimeOnly: Story = {
  args: {
    value: sampleDate,
    format: 'time',
  },
  render: (args) => ({
    components: { DateType },
    setup: () => ({ args }),
    template: '<DateType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType value="2024-03-15T14:30:00Z" format="time" />`,
      },
    },
  },
}

export const FrenchLocale: Story = {
  args: {
    value: sampleDate,
    format: 'datetime',
    locale: 'fr-FR',
  },
  render: (args) => ({
    components: { DateType },
    setup: () => ({ args }),
    template: '<DateType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType value="2024-03-15T14:30:00Z" format="datetime" locale="fr-FR" />`,
      },
    },
  },
}

export const NullValue: Story = {
  args: {
    value: null,
  },
  render: (args) => ({
    components: { DateType },
    setup: () => ({ args }),
    template: '<DateType v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType :value="null" />`,
      },
    },
  },
}

export const AllFormats: Story = {
  render: () => ({
    components: { DateType },
    setup: () => ({
      value: '2024-03-15T14:30:00Z',
    }),
    template: `
      <div class="space-y-2">
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">Date:</span>
          <DateType :value="value" format="date" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">DateTime:</span>
          <DateType :value="value" format="datetime" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">Time:</span>
          <DateType :value="value" format="time" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType value="2024-03-15T14:30:00Z" format="date" />
<DateType value="2024-03-15T14:30:00Z" format="datetime" />
<DateType value="2024-03-15T14:30:00Z" format="time" />`,
      },
    },
  },
}

export const DifferentLocales: Story = {
  render: () => ({
    components: { DateType },
    setup: () => ({
      value: '2024-03-15T14:30:00Z',
    }),
    template: `
      <div class="space-y-2">
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">en-US:</span>
          <DateType :value="value" format="datetime" locale="en-US" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">fr-FR:</span>
          <DateType :value="value" format="datetime" locale="fr-FR" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">de-DE:</span>
          <DateType :value="value" format="datetime" locale="de-DE" />
        </div>
        <div class="flex items-center gap-4">
          <span class="w-24 text-sm text-gray-600 dark:text-gray-400">ja-JP:</span>
          <DateType :value="value" format="datetime" locale="ja-JP" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DateType value="2024-03-15T14:30:00Z" format="datetime" locale="en-US" />
<DateType value="2024-03-15T14:30:00Z" format="datetime" locale="fr-FR" />
<DateType value="2024-03-15T14:30:00Z" format="datetime" locale="de-DE" />
<DateType value="2024-03-15T14:30:00Z" format="datetime" locale="ja-JP" />`,
      },
    },
  },
}
