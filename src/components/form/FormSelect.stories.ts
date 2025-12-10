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
  },
  args: {
    placeholder: 'Select an option...',
    teleport: true,
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
}
