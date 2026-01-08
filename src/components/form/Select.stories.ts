import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Select from './Select.vue'
import Option from './Option.vue'
import FormGroup from './FormGroup.vue'
import FormLabel from './FormLabel.vue'

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    size: 'md',
    placeholder: 'Select an option',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select :options="options" v-model="value" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
    ],
  },
  render: (args) => ({
    components: { Select, FormGroup, FormLabel },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <FormGroup>
        <FormLabel for="country">Country</FormLabel>
        <Select v-bind="args" v-model="value" id="country" name="country" />
      </FormGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormGroup>
  <FormLabel for="country">Country</FormLabel>
  <Select :options="countries" v-model="value" />
</FormGroup>`,
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref(null)
      const options = defaultOptions
      return { value, options }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-500 mb-2">Small</p>
          <Select :options="options" v-model="value" size="sm" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Medium (default)</p>
          <Select :options="options" v-model="value" size="md" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Large</p>
          <Select :options="options" v-model="value" size="lg" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select size="sm" />
<Select size="md" />
<Select size="lg" />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref('option1')
      return { args, value }
    },
    template: '<Select v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select :options="options" v-model="value" :disabled="true" />`,
      },
    },
  },
}

export const Invalid: Story = {
  args: {
    options: defaultOptions,
    invalid: true,
  },
  render: (args) => ({
    components: { Select, FormGroup, FormLabel },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <FormGroup>
        <FormLabel>Select option</FormLabel>
        <Select v-bind="args" v-model="value" />
        <p class="text-sm text-red-500 mt-1">Please select an option</p>
      </FormGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select :options="options" v-model="value" :invalid="true" />`,
      },
    },
  },
}

export const WithSlots: Story = {
  render: () => ({
    components: { Select, Option },
    setup() {
      const value = ref(null)
      return { value }
    },
    template: `
      <Select v-model="value" placeholder="Choose a fruit">
        <Option value="apple">Apple</Option>
        <Option value="banana">Banana</Option>
        <Option value="cherry">Cherry</Option>
        <Option value="grape" :disabled="true">Grape (Out of stock)</Option>
      </Select>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select v-model="value" placeholder="Choose a fruit">
  <Option value="apple">Apple</Option>
  <Option value="banana">Banana</Option>
  <Option value="cherry">Cherry</Option>
  <Option value="grape" :disabled="true">Grape (Out of stock)</Option>
</Select>`,
      },
    },
  },
}

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'basic', label: 'Basic Plan' },
      { value: 'pro', label: 'Pro Plan' },
      { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
    ],
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: '<Select v-bind="args" v-model="value" placeholder="Select a plan" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select :options="[
  { value: 'basic', label: 'Basic Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
]" />`,
      },
    },
  },
}

export const Required: Story = {
  args: {
    options: defaultOptions,
    required: true,
  },
  render: (args) => ({
    components: { Select, FormGroup, FormLabel },
    setup() {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <FormGroup>
        <FormLabel required>Required field</FormLabel>
        <Select v-bind="args" v-model="value" />
      </FormGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Select :options="options" v-model="value" :required="true" />`,
      },
    },
  },
}
