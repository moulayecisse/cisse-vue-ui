import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import IconPicker from './IconPicker.vue'

const meta: Meta<typeof IconPicker> = {
  title: 'Form/IconPicker',
  component: IconPicker,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    help: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    limit: { control: 'number' },
    collections: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof IconPicker>

export const Default: Story = {
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="icon" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Select Icon',
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="icon" label="Select Icon" />`,
      },
    },
  },
}

export const WithPreselectedValue: Story = {
  args: {
    label: 'Category Icon',
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('mdi:heart')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="icon" label="Category Icon" />
<!-- where icon = ref('mdi:heart') -->`,
      },
    },
  },
}

export const Required: Story = {
  args: {
    label: 'Required Icon',
    required: true,
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="icon" label="Required Icon" required />`,
      },
    },
  },
}

export const WithHelp: Story = {
  args: {
    label: 'Product Icon',
    help: 'Choose an icon to represent this product category',
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Product Icon"
  help="Choose an icon to represent this product category"
/>`,
      },
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'Menu Icon',
    error: 'Please select an icon',
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Menu Icon"
  error="Please select an icon"
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Picker',
    disabled: true,
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('mdi:star')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="icon" label="Disabled Picker" disabled />`,
      },
    },
  },
}

export const CustomCollections: Story = {
  args: {
    label: 'Heroicons Only',
    collections: ['heroicons'],
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Heroicons Only"
  :collections="['heroicons']"
/>`,
      },
    },
  },
}

export const LucideIcons: Story = {
  args: {
    label: 'Lucide Icons',
    collections: ['lucide'],
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Lucide Icons"
  :collections="['lucide']"
/>`,
      },
    },
  },
}

export const CustomLimit: Story = {
  args: {
    label: 'Limited Results',
    limit: 24,
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Limited Results"
  :limit="24"
/>`,
      },
    },
  },
}

export const CustomPlaceholder: Story = {
  args: {
    label: 'Application Icon',
    placeholder: 'Search for an icon...',
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Application Icon"
  placeholder="Search for an icon..."
/>`,
      },
    },
  },
}

export const FormIntegration: Story = {
  render: () => ({
    components: { IconPicker },
    setup() {
      const categoryIcon = ref('mdi:folder')
      const statusIcon = ref('mdi:check-circle')
      const actionIcon = ref('')
      return { categoryIcon, statusIcon, actionIcon }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <IconPicker v-model="categoryIcon" label="Category Icon" help="Icon for the category" />
        <IconPicker v-model="statusIcon" label="Status Icon" help="Icon to show status" />
        <IconPicker v-model="actionIcon" label="Action Icon" required help="Icon for the action button" />

        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">Selected Icons:</h3>
          <div class="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <p>Category: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{{ categoryIcon || 'none' }}</code></p>
            <p>Status: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{{ statusIcon || 'none' }}</code></p>
            <p>Action: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">{{ actionIcon || 'none' }}</code></p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="categoryIcon" label="Category Icon" help="Icon for the category" />
<IconPicker v-model="statusIcon" label="Status Icon" help="Icon to show status" />
<IconPicker v-model="actionIcon" label="Action Icon" required help="Icon for the action button" />`,
      },
    },
  },
}

export const MedicalIcons: Story = {
  args: {
    label: 'Medical Icon',
    collections: ['mdi'],
    help: 'Search for medical-related icons like stethoscope, hospital, etc.',
  },
  render: (args) => ({
    components: { IconPicker },
    setup() {
      const icon = ref('mdi:stethoscope')
      return { args, icon }
    },
    template: '<IconPicker v-bind="args" v-model="icon" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker
  v-model="icon"
  label="Medical Icon"
  :collections="['mdi']"
  help="Search for medical-related icons"
/>`,
      },
    },
  },
}

export const AllStates: Story = {
  render: () => ({
    components: { IconPicker },
    setup() {
      const icon1 = ref('')
      const icon2 = ref('mdi:home')
      const icon3 = ref('')
      const icon4 = ref('lucide:star')
      return { icon1, icon2, icon3, icon4 }
    },
    template: `
      <div class="space-y-6 max-w-md">
        <IconPicker v-model="icon1" label="Empty State" />
        <IconPicker v-model="icon2" label="With Value" />
        <IconPicker v-model="icon3" label="With Error" error="This field is required" required />
        <IconPicker v-model="icon4" label="Disabled" disabled />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<IconPicker v-model="icon1" label="Empty State" />
<IconPicker v-model="icon2" label="With Value" />
<IconPicker v-model="icon3" label="With Error" error="This field is required" required />
<IconPicker v-model="icon4" label="Disabled" disabled />`,
      },
    },
  },
}
