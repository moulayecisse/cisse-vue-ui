import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Combobox from './Combobox.vue'
import type { ComboboxOption } from './Combobox.vue'

const meta: Meta<typeof Combobox> = {
  title: 'Form/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    teleport: {
      control: 'text',
      description: 'Teleport target (e.g., "body", "#app"). Leave empty to disable.',
    },
  },
  decorators: [
    () => ({
      template: '<div class="p-4 max-w-md"><story /></div>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof Combobox>

const countries: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
  { value: 'br', label: 'Brazil' },
  { value: 'au', label: 'Australia' },
]

const programmingLanguages: ComboboxOption[] = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'py', label: 'Python' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
]

export const Default: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string | null>(null)
      return { args, selected }
    },
    template: `
      <Combobox v-bind="args" v-model="selected" />
    `,
  }),
  args: {
    options: countries,
    placeholder: 'Select a country...',
  },
}

export const WithValue: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string>('us')
      return { args, selected }
    },
    template: `
      <Combobox v-bind="args" v-model="selected" />
    `,
  }),
  args: {
    options: countries,
    placeholder: 'Select a country...',
  },
}

export const Clearable: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string>('fr')
      return { args, selected }
    },
    template: `
      <Combobox v-bind="args" v-model="selected" />
    `,
  }),
  args: {
    options: countries,
    placeholder: 'Select a country...',
    clearable: true,
  },
}

export const Multiple: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected }
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selected" />
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Selected: {{ selected.join(', ') || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    options: programmingLanguages,
    placeholder: 'Select languages...',
    multiple: true,
  },
}

export const MultipleWithValues: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string[]>(['js', 'ts', 'py'])
      return { args, selected }
    },
    template: `
      <div>
        <Combobox v-bind="args" v-model="selected" />
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Selected: {{ selected.join(', ') }}</p>
      </div>
    `,
  }),
  args: {
    options: programmingLanguages,
    placeholder: 'Select languages...',
    multiple: true,
    clearable: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string>('uk')
      return { args, selected }
    },
    template: `
      <Combobox v-bind="args" v-model="selected" />
    `,
  }),
  args: {
    options: countries,
    placeholder: 'Select a country...',
    disabled: true,
  },
}

export const WithDisabledOptions: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string | null>(null)
      return { args, selected }
    },
    template: `
      <Combobox v-bind="args" v-model="selected" />
    `,
  }),
  args: {
    options: [
      { value: 'free', label: 'Free Plan' },
      { value: 'starter', label: 'Starter Plan' },
      { value: 'pro', label: 'Pro Plan', disabled: true },
      { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
    ],
    placeholder: 'Select a plan...',
  },
}

export const CustomPlaceholders: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string | null>(null)
      return { args, selected }
    },
    template: `
      <Combobox v-bind="args" v-model="selected" />
    `,
  }),
  args: {
    options: countries,
    placeholder: 'Choose your country',
    searchPlaceholder: 'Type to filter countries...',
    noResultsText: 'No countries match your search',
  },
}

export const LongList: Story = {
  render: (args) => ({
    components: { Combobox },
    setup() {
      const selected = ref<string | null>(null)
      const manyOptions: ComboboxOption[] = Array.from({ length: 50 }, (_, i) => ({
        value: `option-${i + 1}`,
        label: `Option ${i + 1}`,
      }))
      return { args, selected, manyOptions }
    },
    template: `
      <Combobox v-bind="args" :options="manyOptions" v-model="selected" />
    `,
  }),
  args: {
    placeholder: 'Select from many options...',
  },
}

export const InForm: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      const country = ref<string | null>(null)
      const languages = ref<string[]>([])
      return { country, languages, countries, programmingLanguages }
    },
    template: `
      <form class="space-y-4" @submit.prevent>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
          <Combobox
            v-model="country"
            :options="countries"
            placeholder="Select country..."
            clearable
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Programming Languages</label>
          <Combobox
            v-model="languages"
            :options="programmingLanguages"
            placeholder="Select languages..."
            multiple
            clearable
          />
        </div>
        <div class="pt-2 text-sm text-gray-600 dark:text-gray-400">
          <p>Country: {{ country || 'None' }}</p>
          <p>Languages: {{ languages.join(', ') || 'None' }}</p>
        </div>
      </form>
    `,
  }),
}
