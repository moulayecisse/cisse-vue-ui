import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Switch from './Switch.vue'

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Switch },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<Switch v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Switch v-model="enabled" />`,
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Enable notifications',
  },
  render: (args) => ({
    components: { Switch },
    setup: () => {
      const value = ref(false)
      return { args, value }
    },
    template: '<Switch v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Switch v-model="enabled" label="Enable notifications" />`,
      },
    },
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products and features',
  },
  render: (args) => ({
    components: { Switch },
    setup: () => {
      const value = ref(true)
      return { args, value }
    },
    template: '<Switch v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Switch
  v-model="enabled"
  label="Marketing emails"
  description="Receive emails about new products and features"
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
  render: (args) => ({
    components: { Switch },
    setup: () => {
      const value = ref(true)
      return { args, value }
    },
    template: '<Switch v-bind="args" v-model="value" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Switch v-model="enabled" label="Disabled switch" disabled />`,
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Switch },
    setup: () => {
      const sm = ref(true)
      const md = ref(true)
      const lg = ref(true)
      return { sm, md, lg }
    },
    template: `
      <div class="space-y-4">
        <Switch v-model="sm" size="sm" label="Small" />
        <Switch v-model="md" size="md" label="Medium" />
        <Switch v-model="lg" size="lg" label="Large" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Switch v-model="sm" size="sm" label="Small" />
<Switch v-model="md" size="md" label="Medium" />
<Switch v-model="lg" size="lg" label="Large" />`,
      },
    },
  },
}

export const SettingsExample: Story = {
  render: () => ({
    components: { Switch },
    setup: () => {
      const notifications = ref(true)
      const emails = ref(false)
      const darkMode = ref(false)
      return { notifications, emails, darkMode }
    },
    template: `
      <div class="space-y-6 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
        <div class="space-y-4">
          <Switch
            v-model="notifications"
            label="Push notifications"
            description="Receive push notifications on your device"
          />
          <Switch
            v-model="emails"
            label="Email updates"
            description="Receive weekly email updates"
          />
          <Switch
            v-model="darkMode"
            label="Dark mode"
            description="Use dark theme across the application"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Switch
  v-model="notifications"
  label="Push notifications"
  description="Receive push notifications on your device"
/>
<Switch
  v-model="emails"
  label="Email updates"
  description="Receive weekly email updates"
/>
<Switch
  v-model="darkMode"
  label="Dark mode"
  description="Use dark theme across the application"
/>`,
      },
    },
  },
}
