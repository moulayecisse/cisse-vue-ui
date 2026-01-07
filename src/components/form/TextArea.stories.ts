import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TextArea from './TextArea.vue'

const meta: Meta<typeof TextArea> = {
  title: 'Form/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    maxLength: { control: 'number' },
    showCount: { control: 'boolean' },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="description" label="Description" placeholder="Enter a description..." />`,
      },
    },
  },
}

export const WithHint: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    hint: 'Write a short bio to introduce yourself to others.',
    rows: 4,
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea
  v-model="bio"
  label="Bio"
  placeholder="Tell us about yourself..."
  hint="Write a short bio to introduce yourself to others."
  :rows="4"
/>`,
      },
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    error: 'Description is required',
    modelValue: '',
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="description" label="Description" error="Description is required" />`,
      },
    },
  },
}

export const WithMaxLength: Story = {
  args: {
    label: 'Tweet',
    placeholder: 'What\'s happening?',
    maxLength: 280,
    showCount: true,
    modelValue: 'This is a sample tweet with character count.',
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="tweet" label="Tweet" :max-length="280" show-count />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Notes...',
    disabled: true,
    modelValue: 'This field is disabled',
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="notes" label="Notes" disabled />`,
      },
    },
  },
}

export const Readonly: Story = {
  args: {
    label: 'Terms',
    readonly: true,
    modelValue: 'These are the terms and conditions that cannot be edited.',
    rows: 4,
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="terms" label="Terms" readonly />`,
      },
    },
  },
}

export const NoResize: Story = {
  args: {
    label: 'Fixed Size',
    placeholder: 'This textarea cannot be resized...',
    resize: 'none',
    rows: 4,
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="text" label="Fixed Size" resize="none" :rows="4" />`,
      },
    },
  },
}

export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback...',
    required: true,
    hint: 'This field is required.',
  },
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="feedback" label="Feedback" required hint="This field is required." />`,
      },
    },
  },
}

export const States: Story = {
  render: () => ({
    components: { TextArea },
    setup: () => {
      const normal = ref('Normal textarea content')
      const invalid = ref('Invalid content')
      const disabled = ref('Disabled content')
      return { normal, invalid, disabled }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <TextArea
          v-model="normal"
          label="Normal"
          placeholder="Enter text..."
        />
        <TextArea
          v-model="invalid"
          label="Invalid"
          error="This field has an error"
        />
        <TextArea
          v-model="disabled"
          label="Disabled"
          disabled
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="normal" label="Normal" />
<TextArea v-model="invalid" label="Invalid" error="This field has an error" />
<TextArea v-model="disabled" label="Disabled" disabled />`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { TextArea },
    setup: () => {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { small, medium, large }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <TextArea
          v-model="small"
          label="Small"
          size="sm"
          placeholder="Small textarea..."
        />
        <TextArea
          v-model="medium"
          label="Medium (default)"
          size="md"
          placeholder="Medium textarea..."
        />
        <TextArea
          v-model="large"
          label="Large"
          size="lg"
          placeholder="Large textarea..."
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<TextArea v-model="small" label="Small" size="sm" />
<TextArea v-model="medium" label="Medium" size="md" />
<TextArea v-model="large" label="Large" size="lg" />`,
      },
    },
  },
}
