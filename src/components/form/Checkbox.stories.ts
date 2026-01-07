import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

const meta: Meta<typeof Checkbox> = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<Checkbox v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox v-model="checked" />`,
      },
    },
  },
}

export const Checked: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => {
      const value = ref(true)
      return { value }
    },
    template: '<Checkbox v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox v-model="checked" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  render: (args) => ({
    components: { Checkbox },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<Checkbox v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox v-model="accepted" label="Accept terms and conditions" />`,
      },
    },
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Subscribe to newsletter',
    description: 'Get the latest news and updates',
  },
  render: (args) => ({
    components: { Checkbox },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<Checkbox v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox
  v-model="subscribed"
  label="Subscribe to newsletter"
  description="Get the latest news and updates"
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
  render: (args) => ({
    components: { Checkbox },
    setup: () => {
      const value = ref(true)
      return { args, value }
    },
    template: '<Checkbox v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox v-model="checked" label="Disabled checkbox" disabled />`,
      },
    },
  },
}

export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
  render: (args) => ({
    components: { Checkbox },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<Checkbox v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox v-model="selectAll" label="Select all" indeterminate />`,
      },
    },
  },
}

export const CheckboxGroup: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => {
      const options = ref({
        option1: false,
        option2: true,
        option3: false,
      })
      return { options }
    },
    template: `
      <div class="space-y-3">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Select your interests:</p>
        <Checkbox v-model="options.option1" label="Technology" />
        <Checkbox v-model="options.option2" label="Design" />
        <Checkbox v-model="options.option3" label="Business" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox v-model="options.technology" label="Technology" />
<Checkbox v-model="options.design" label="Design" />
<Checkbox v-model="options.business" label="Business" />`,
      },
    },
  },
}

export const FormExample: Story = {
  render: () => ({
    components: { Checkbox },
    setup: () => {
      const terms = ref(false)
      const marketing = ref(false)
      const privacy = ref(false)
      return { terms, marketing, privacy }
    },
    template: `
      <div class="space-y-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Consent</h3>
        <div class="space-y-3">
          <Checkbox
            v-model="terms"
            label="I agree to the terms of service"
            description="You must agree to continue"
          />
          <Checkbox
            v-model="privacy"
            label="I have read the privacy policy"
          />
          <Checkbox
            v-model="marketing"
            label="Send me marketing communications"
            description="Optional - you can unsubscribe at any time"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Checkbox
  v-model="terms"
  label="I agree to the terms of service"
  description="You must agree to continue"
/>
<Checkbox
  v-model="privacy"
  label="I have read the privacy policy"
/>
<Checkbox
  v-model="marketing"
  label="Send me marketing communications"
  description="Optional - you can unsubscribe at any time"
/>`,
      },
    },
  },
}
