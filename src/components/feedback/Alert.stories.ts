import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Alert from './Alert.vue'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    title: { control: 'text' },
    dismissible: { control: 'boolean' },
    icon: { control: 'text' },
  },
  args: {
    variant: 'info',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args">This is an informational message.</Alert>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="info" title="Information">
  This is an informational message.
</Alert>`,
      },
    },
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args">Your changes have been saved successfully.</Alert>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="success" title="Success">
  Your changes have been saved successfully.
</Alert>`,
      },
    },
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args">Please review your information before proceeding.</Alert>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="warning" title="Warning">
  Please review your information before proceeding.
</Alert>`,
      },
    },
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args">An error occurred while processing your request.</Alert>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="error" title="Error">
  An error occurred while processing your request.
</Alert>`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4">
        <Alert variant="info" title="Information">
          This is an informational alert.
        </Alert>
        <Alert variant="success" title="Success">
          Operation completed successfully.
        </Alert>
        <Alert variant="warning" title="Warning">
          Please be careful with this action.
        </Alert>
        <Alert variant="error" title="Error">
          Something went wrong.
        </Alert>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="info" title="Information">
  This is an informational alert.
</Alert>

<Alert variant="success" title="Success">
  Operation completed successfully.
</Alert>

<Alert variant="warning" title="Warning">
  Please be careful with this action.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong.
</Alert>`,
      },
    },
  },
}

export const Dismissible: Story = {
  render: () => ({
    components: { Alert },
    setup: () => {
      const visible = ref(true)
      const reset = () => (visible.value = true)
      return { visible, reset }
    },
    template: `
      <div>
        <Alert
          v-if="visible"
          variant="info"
          title="Dismissible Alert"
          dismissible
          @dismiss="visible = false"
        >
          Click the X button to dismiss this alert.
        </Alert>
        <button
          v-else
          class="text-sm text-primary hover:underline"
          @click="reset"
        >
          Show alert again
        </button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert
  v-if="visible"
  variant="info"
  title="Dismissible Alert"
  dismissible
  @dismiss="visible = false"
>
  Click the X button to dismiss this alert.
</Alert>`,
      },
    },
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args">A simple alert without a title.</Alert>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="info">
  A simple alert without a title.
</Alert>`,
      },
    },
  },
}

export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    icon: 'lucide:bell',
  },
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: '<Alert v-bind="args">Alert with a custom bell icon.</Alert>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Alert variant="info" title="Custom Icon" icon="lucide:bell">
  Alert with a custom bell icon.
</Alert>`,
      },
    },
  },
}
