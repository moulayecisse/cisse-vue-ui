import type { Meta, StoryObj } from '@storybook/vue3'
import CheckboxGroup from './CheckboxGroup.vue'

const languageOptions = [
  { value: 'francais', label: 'Francais' },
  { value: 'bambara', label: 'Bambara' },
  { value: 'peul', label: 'Peul' },
  { value: 'songhay', label: 'Songhay' },
  { value: 'tamasheq', label: 'Tamasheq' },
  { value: 'soninke', label: 'Soninke' },
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
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
/>`,
      },
    },
  },
}

export const WithHint: Story = {
  args: {
    label: 'Languages spoken',
    options: languageOptions,
    hint: 'Select all languages you speak fluently.',
    modelValue: ['francais', 'bambara'],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages spoken"
  :options="options"
  hint="Select all languages you speak fluently."
/>`,
      },
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    error: 'Please select at least one language',
    modelValue: [],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
  error="Please select at least one language"
/>`,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
  required
  hint="At least one language is required."
/>`,
      },
    },
  },
}

export const ThreeColumns: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    columns: 3,
    modelValue: ['francais', 'bambara', 'peul'],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
  :columns="3"
/>`,
      },
    },
  },
}

export const FourColumns: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    columns: 4,
    modelValue: ['francais'],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
  :columns="4"
/>`,
      },
    },
  },
}

export const SingleColumn: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    columns: 1,
    modelValue: ['francais', 'bambara'],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
  :columns="1"
/>`,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Quick selection"
  :options="options"
  inline
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Languages',
    options: languageOptions,
    disabled: true,
    modelValue: ['francais', 'bambara'],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="options"
  disabled
/>`,
      },
    },
  },
}

export const WithDisabledOptions: Story = {
  args: {
    label: 'Languages',
    options: [
      { value: 'francais', label: 'Francais' },
      { value: 'bambara', label: 'Bambara' },
      { value: 'peul', label: 'Peul', disabled: true },
      { value: 'songhay', label: 'Songhay' },
      { value: 'tamasheq', label: 'Tamasheq', disabled: true },
      { value: 'soninke', label: 'Soninke' },
    ],
    modelValue: ['francais'],
  },
  parameters: {
    docs: {
      source: {
        code: `<CheckboxGroup
  v-model="selected"
  label="Languages"
  :options="[
    { value: 'francais', label: 'Francais' },
    { value: 'bambara', label: 'Bambara' },
    { value: 'peul', label: 'Peul', disabled: true },
  ]"
/>`,
      },
    },
  },
}
