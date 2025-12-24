import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NotificationComponent from './NotificationComponent.vue'

const meta: Meta<typeof NotificationComponent> = {
  title: 'Feedback/NotificationComponent',
  component: NotificationComponent,
  tags: ['autodocs'],
  argTypes: {
    autoDismiss: { control: 'boolean' },
    duration: { control: 'number' },
  },
  args: {
    autoDismiss: false,
    duration: 5000,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    notification: {
      id: '1',
      type: 'success',
      title: 'Success',
      message: 'Your changes have been saved successfully.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const Info: Story = {
  args: {
    notification: {
      id: '2',
      type: 'info',
      title: 'Information',
      message: 'A new version is available for download.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const Warning: Story = {
  args: {
    notification: {
      id: '3',
      type: 'warning',
      title: 'Warning',
      message: 'Your session will expire in 5 minutes.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const Error: Story = {
  args: {
    notification: {
      id: '4',
      type: 'error',
      title: 'Error',
      message: 'Failed to save changes. Please try again.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const MessageOnly: Story = {
  args: {
    notification: {
      id: '5',
      type: 'info',
      message: 'This is a notification without a title.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const TitleOnly: Story = {
  args: {
    notification: {
      id: '6',
      type: 'success',
      title: 'Operation completed',
      message: '',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const LongMessage: Story = {
  args: {
    notification: {
      id: '7',
      type: 'info',
      title: 'System Update',
      message: 'A scheduled maintenance will occur on December 25th from 2:00 AM to 4:00 AM UTC. During this time, the service may be temporarily unavailable.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => ({ args }),
    template: '<NotificationComponent v-bind="args" />',
  }),
}

export const WithDismissHandler: Story = {
  args: {
    notification: {
      id: '8',
      type: 'success',
      title: 'Dismissible',
      message: 'Click the X button to dismiss this notification.',
    },
  },
  render: (args) => ({
    components: { NotificationComponent },
    setup: () => {
      const handleDismiss = (id: string) => {
        console.log('Dismissed notification:', id)
      }
      return { args, handleDismiss }
    },
    template: '<NotificationComponent v-bind="args" @dismiss="handleDismiss" />',
  }),
}

export const AllTypes: Story = {
  render: () => ({
    components: { NotificationComponent },
    setup: () => {
      const notifications = [
        { id: '1', type: 'success', title: 'Success', message: 'Operation completed successfully.' },
        { id: '2', type: 'info', title: 'Info', message: 'Here is some useful information.' },
        { id: '3', type: 'warning', title: 'Warning', message: 'Please review before proceeding.' },
        { id: '4', type: 'error', title: 'Error', message: 'Something went wrong.' },
      ]
      return { notifications }
    },
    template: `
      <div class="space-y-4">
        <NotificationComponent
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
        />
      </div>
    `,
  }),
}
