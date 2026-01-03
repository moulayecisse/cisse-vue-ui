import type { Meta, StoryObj } from '@storybook/vue3'
import CheckboxGroup from './CheckboxGroup.vue'

const languageOptions = [
  { value: 'francais', label: 'Français' },
  { value: 'bambara', label: 'Bambara' },
  { value: 'peul', label: 'Peul' },
  { value: 'songhay', label: 'Songhay' },
  { value: 'tamasheq', label: 'Tamasheq' },
  { value: 'soninke', label: 'Soninké' },
]

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Form/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
    options: { control: 'object' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    columns: {
      control: 'select',
      options: [1, 2, 3, 4],
    },
    inline: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof CheckboxGroup>

export const Default: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    modelValue: ['francais'],
  },
}

export const WithHint: Story = {
  args: {
    label: 'Languages spoken',
    options: languageOptions,
    hint: 'Select all languages you speak fluently.',
    modelValue: ['francais', 'bambara'],
  },
}

export const WithError: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    error: 'Please select at least one language',
    modelValue: [],
  },
}

export const Required: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    required: true,
    hint: 'At least one language is required.',
    modelValue: [],
  },
}

export const ThreeColumns: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    columns: 3,
    modelValue: ['francais', 'bambara', 'peul'],
  },
}

export const FourColumns: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    columns: 4,
    modelValue: ['francais'],
  },
}

export const SingleColumn: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    columns: 1,
    modelValue: ['francais', 'bambara'],
  },
}

export const Inline: Story = {
  args: {
    label: 'Quick selection',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
      { value: 'maybe', label: 'Maybe' },
    ],
    inline: true,
    modelValue: ['yes'],
  },
}

export const Disabled: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    disabled: true,
    modelValue: ['francais', 'bambara'],
  },
}

export const WithDisabledOptions: Story = {
  args: {
    label: 'Languages',
    options: [
      { value: 'francais', label: 'Français' },
      { value: 'bambara', label: 'Bambara' },
      { value: 'peul', label: 'Peul', disabled: true },
      { value: 'songhay', label: 'Songhay' },
      { value: 'tamasheq', label: 'Tamasheq', disabled: true },
      { value: 'soninke', label: 'Soninké' },
    ],
    modelValue: ['francais'],
  },
}
