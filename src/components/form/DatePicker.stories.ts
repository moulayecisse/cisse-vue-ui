import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DatePicker from './DatePicker.vue'

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    format: {
      control: 'select',
      options: ['short', 'medium', 'long', 'full'],
    },
    locale: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Select date',
    format: 'short',
    locale: 'en-US',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(null)
      return { args, date }
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" placeholder="Select date" />`,
      },
    },
  },
}

export const WithPreselectedDate: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(new Date())
      return { args, date }
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" />`,
      },
    },
  },
}

export const MediumFormat: Story = {
  args: {
    format: 'medium',
  },
  render: (args) => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(new Date())
      return { args, date }
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" format="medium" />`,
      },
    },
  },
}

export const LongFormat: Story = {
  args: {
    format: 'long',
  },
  render: (args) => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(new Date())
      return { args, date }
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" format="long" />`,
      },
    },
  },
}

export const FrenchLocale: Story = {
  args: {
    locale: 'fr-FR',
    format: 'long',
  },
  render: (args) => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(new Date())
      return { args, date }
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" locale="fr-FR" format="long" />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(new Date())
      return { args, date }
    },
    template: '<DatePicker v-bind="args" v-model="date" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" disabled />`,
      },
    },
  },
}

export const WithMinMax: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(null)
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
      return { date, minDate, maxDate }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Select a date within this month only</p>
        <DatePicker v-model="date" :min-date="minDate" :max-date="maxDate" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" :min-date="minDate" :max-date="maxDate" />`,
      },
    },
  },
}

export const FutureDatesOnly: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(null)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { date, minDate: today }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">Only future dates are selectable</p>
        <DatePicker v-model="date" :min-date="minDate" placeholder="Select future date" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" :min-date="today" placeholder="Select future date" />`,
      },
    },
  },
}

export const InForm: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => {
      const startDate = ref<Date | null>(null)
      const endDate = ref<Date | null>(null)
      return { startDate, endDate }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
          <DatePicker v-model="startDate" placeholder="Select start date" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
          <DatePicker v-model="endDate" placeholder="Select end date" :min-date="startDate || undefined" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="startDate" placeholder="Select start date" />
<DatePicker v-model="endDate" placeholder="Select end date" :min-date="startDate" />`,
      },
    },
  },
}

export const DifferentLocales: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => {
      const date = ref<Date | null>(new Date())
      return { date }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">English (US)</label>
          <DatePicker v-model="date" locale="en-US" format="long" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">French</label>
          <DatePicker v-model="date" locale="fr-FR" format="long" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">German</label>
          <DatePicker v-model="date" locale="de-DE" format="long" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Japanese</label>
          <DatePicker v-model="date" locale="ja-JP" format="long" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="date" locale="en-US" format="long" />
<DatePicker v-model="date" locale="fr-FR" format="long" />
<DatePicker v-model="date" locale="de-DE" format="long" />`,
      },
    },
  },
}

export const States: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => {
      const normal = ref<Date | null>(null)
      const withValue = ref<Date | null>(new Date())
      const disabled = ref<Date | null>(new Date())
      return { normal, withValue, disabled }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Normal</label>
          <DatePicker v-model="normal" placeholder="Select date..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">With Value</label>
          <DatePicker v-model="withValue" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Disabled</label>
          <DatePicker v-model="disabled" disabled />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="normal" placeholder="Select date..." />
<DatePicker v-model="withValue" />
<DatePicker v-model="disabled" disabled />`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { DatePicker },
    setup: () => {
      const small = ref<Date | null>(null)
      const medium = ref<Date | null>(null)
      const large = ref<Date | null>(null)
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <DatePicker v-model="small" size="sm" placeholder="Select date..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <DatePicker v-model="medium" size="md" placeholder="Select date..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <DatePicker v-model="large" size="lg" placeholder="Select date..." />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<DatePicker v-model="small" size="sm" placeholder="Select date..." />
<DatePicker v-model="medium" size="md" placeholder="Select date..." />
<DatePicker v-model="large" size="lg" placeholder="Select date..." />`,
      },
    },
  },
}
