import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FormSelect from './FormSelect.vue'

const meta: Meta<typeof FormSelect> = {
  title: 'Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    teleport: { control: 'boolean' },
    triggerClass: { control: 'text' },
    noResultsText: { control: 'text' },
  },
  args: {
    placeholder: 'Select an option...',
    teleport: true,
    noResultsText: 'No results found',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
]

export const Default: Story = {
  args: {
    options: defaultOptions,
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect
  v-model="value"
  :options="[
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ]"
  placeholder="Select an option..."
/>`,
      },
    },
  },
}

export const WithPreselectedValue: Story = {
  args: {
    options: defaultOptions,
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref('banana')
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect v-model="selectedValue" :options="options" />`,
      },
    },
  },
}

export const Searchable: Story = {
  args: {
    options: defaultOptions,
    searchable: true,
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect v-model="value" :options="options" searchable />`,
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
    components: { FormSelect },
    setup: () => {
      const value = ref('apple')
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect v-model="value" :options="options" disabled />`,
      },
    },
  },
}

export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    searchable: true,
    placeholder: 'Select from many options...',
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect
  v-model="value"
  :options="options"
  searchable
  placeholder="Select from many options..."
/>`,
      },
    },
  },
}

export const CountrySelector: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'es', label: 'Spain' },
      { value: 'it', label: 'Italy' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
    ],
    searchable: true,
    placeholder: 'Select a country...',
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect
  v-model="country"
  :options="countries"
  searchable
  placeholder="Select a country..."
/>`,
      },
    },
  },
}

export const CustomTriggerClass: Story = {
  args: {
    options: defaultOptions,
    triggerClass: 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-700',
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: '<FormSelect v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect
  v-model="value"
  :options="options"
  trigger-class="bg-blue-50 border-blue-300"
/>`,
      },
    },
  },
}

export const CustomNoResultsText: Story = {
  args: {
    options: defaultOptions,
    searchable: true,
    noResultsText: 'Aucun résultat trouvé',
    placeholder: 'Rechercher un fruit...',
  },
  render: (args) => ({
    components: { FormSelect },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: `
      <div>
        <p class="mb-2 text-sm text-gray-500">Type something that doesn't match to see custom "no results" text</p>
        <FormSelect v-bind="args" v-model="value" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect
  v-model="value"
  :options="options"
  searchable
  no-results-text="Aucun résultat trouvé"
  placeholder="Rechercher un fruit..."
/>`,
      },
    },
  },
}

export const States: Story = {
  render: () => ({
    components: { FormSelect },
    setup: () => {
      const normal = ref(null)
      const withValue = ref('banana')
      const disabled = ref('apple')
      const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]
      return { normal, withValue, disabled, options }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Normal</label>
          <FormSelect v-model="normal" :options="options" placeholder="Select an option..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">With Value</label>
          <FormSelect v-model="withValue" :options="options" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Disabled</label>
          <FormSelect v-model="disabled" :options="options" disabled />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Normal -->
<FormSelect v-model="normal" :options="options" placeholder="Select an option..." />

<!-- With Value -->
<FormSelect v-model="withValue" :options="options" />

<!-- Disabled -->
<FormSelect v-model="disabled" :options="options" disabled />`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { FormSelect },
    setup: () => {
      const small = ref(null)
      const medium = ref(null)
      const large = ref(null)
      const options = [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'cherry', label: 'Cherry' },
      ]
      return { small, medium, large, options }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <FormSelect v-model="small" :options="options" size="sm" placeholder="Select..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <FormSelect v-model="medium" :options="options" size="md" placeholder="Select..." />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <FormSelect v-model="large" :options="options" size="lg" placeholder="Select..." />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormSelect v-model="small" :options="options" size="sm" placeholder="Select..." />
<FormSelect v-model="medium" :options="options" size="md" placeholder="Select..." />
<FormSelect v-model="large" :options="options" size="lg" placeholder="Select..." />`,
      },
    },
  },
}
