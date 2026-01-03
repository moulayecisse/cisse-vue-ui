import type { Meta, StoryObj } from '@storybook/vue3'
import TextArea from './TextArea.vue'

const meta = {
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
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    hint: 'Write a short bio to introduce yourself to others.',
    rows: 4,
  },
}

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    error: 'Description is required',
    modelValue: '',
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
}

export const Disabled: Story = {
  args: {
    label: 'Notes',
    placeholder: 'Notes...',
    disabled: true,
    modelValue: 'This field is disabled',
  },
}

export const Readonly: Story = {
  args: {
    label: 'Terms',
    readonly: true,
    modelValue: 'These are the terms and conditions that cannot be edited.',
    rows: 4,
  },
}

export const NoResize: Story = {
  args: {
    label: 'Fixed Size',
    placeholder: 'This textarea cannot be resized...',
    resize: 'none',
    rows: 4,
  },
}

export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback...',
    required: true,
    hint: 'This field is required.',
  },
}
