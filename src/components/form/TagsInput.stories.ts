import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TagsInput from './TagsInput.vue'

const meta: Meta<typeof TagsInput> = {
  title: 'Form/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    max: { control: 'number' },
    allowDuplicates: { control: 'boolean' },
  },
  args: {
    size: 'md',
    allowDuplicates: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TagsInput },
    setup: () => {
      const tags = ref<string[]>([])
      return { args, tags }
    },
    template: '<TagsInput v-bind="args" v-model="tags" />',
  }),
}

export const WithTags: Story = {
  render: () => ({
    components: { TagsInput },
    setup: () => {
      const tags = ref(['Vue.js', 'TypeScript', 'Tailwind CSS'])
      return { tags }
    },
    template: '<TagsInput v-model="tags" />',
  }),
}

export const WithMaxLimit: Story = {
  args: {
    max: 5,
  },
  render: (args) => ({
    components: { TagsInput },
    setup: () => {
      const tags = ref(['React', 'Vue', 'Angular'])
      return { args, tags }
    },
    template: `
      <div>
        <TagsInput v-bind="args" v-model="tags" />
        <p class="mt-2 text-sm text-gray-500">Maximum 5 tags ({{ tags.length }}/5)</p>
      </div>
    `,
  }),
}

export const AllowDuplicates: Story = {
  args: {
    allowDuplicates: true,
  },
  render: (args) => ({
    components: { TagsInput },
    setup: () => {
      const tags = ref(['duplicate', 'duplicate'])
      return { args, tags }
    },
    template: '<TagsInput v-bind="args" v-model="tags" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { TagsInput },
    setup: () => {
      const small = ref(['tag1', 'tag2'])
      const medium = ref(['tag1', 'tag2'])
      const large = ref(['tag1', 'tag2'])
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <TagsInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <TagsInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <TagsInput v-model="large" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { TagsInput },
    setup: () => {
      const tags = ref(['readonly', 'tags'])
      return { args, tags }
    },
    template: '<TagsInput v-bind="args" v-model="tags" />',
  }),
}

export const SkillsInput: Story = {
  args: {
    placeholder: 'Add a skill...',
    max: 10,
  },
  render: (args) => ({
    components: { TagsInput },
    setup: () => {
      const skills = ref(['JavaScript', 'TypeScript', 'Vue.js'])
      return { args, skills }
    },
    template: `
      <div class="max-w-md">
        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Skills
        </label>
        <TagsInput v-bind="args" v-model="skills" />
        <p class="mt-1 text-xs text-gray-500">Press Enter or comma to add a skill</p>
      </div>
    `,
  }),
}

export const EmailRecipients: Story = {
  args: {
    placeholder: 'Add email...',
  },
  render: (args) => ({
    components: { TagsInput },
    setup: () => {
      const emails = ref(['john@example.com', 'jane@example.com'])
      return { args, emails }
    },
    template: `
      <div class="max-w-md">
        <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Recipients
        </label>
        <TagsInput v-bind="args" v-model="emails" />
      </div>
    `,
  }),
}
