import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NotificationList from './NotificationList.vue'
import Button from '../core/Button.vue'
import type { Notification, NotificationType } from '@/types'

const meta: Meta<typeof NotificationList> = {
  title: 'Feedback/NotificationList',
  component: NotificationList,
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

const sampleNotifications = [
  { id: '1', type: 'success' as const, title: 'Success', message: 'Your changes have been saved.' },
  { id: '2', type: 'info' as const, title: 'Info', message: 'New features are available.' },
  { id: '3', type: 'warning' as const, title: 'Warning', message: 'Your session will expire soon.' },
]

export const Default: Story = {
  args: {
    notifications: sampleNotifications,
  },
  render: (args) => ({
    components: { NotificationList },
    setup: () => ({ args }),
    template: '<NotificationList v-bind="args" />',
  }),
}

export const SingleNotification: Story = {
  args: {
    notifications: [
      { id: '1', type: 'success' as const, title: 'Welcome!', message: 'You have successfully logged in.' },
    ],
  },
  render: (args) => ({
    components: { NotificationList },
    setup: () => ({ args }),
    template: '<NotificationList v-bind="args" />',
  }),
}

export const MixedTypes: Story = {
  args: {
    notifications: [
      { id: '1', type: 'success' as const, title: 'Saved', message: 'Document saved successfully.' },
      { id: '2', type: 'error' as const, title: 'Upload Failed', message: 'Could not upload file.' },
      { id: '3', type: 'info' as const, title: 'Tip', message: 'Press Ctrl+S to save.' },
      { id: '4', type: 'warning' as const, title: 'Unsaved Changes', message: 'You have unsaved changes.' },
    ],
  },
  render: (args) => ({
    components: { NotificationList },
    setup: () => ({ args }),
    template: '<NotificationList v-bind="args" />',
  }),
}

export const WithAutoDismiss: Story = {
  args: {
    notifications: sampleNotifications,
    autoDismiss: true,
    duration: 3000,
  },
  render: (args) => ({
    components: { NotificationList },
    setup: () => ({ args }),
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-500">Notifications will auto-dismiss after 3 seconds</p>
        <NotificationList v-bind="args" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { NotificationList, Button },
    setup: () => {
      const notifications = ref<Notification[]>([
        { id: '1', type: 'info', title: 'Welcome', message: 'Click the buttons to add notifications.' },
      ])
      let idCounter = 2

      const addNotification = (type: NotificationType) => {
        const messages: Record<NotificationType, { title: string; message: string }> = {
          success: { title: 'Success', message: 'Operation completed successfully!' },
          info: { title: 'Info', message: 'Here is some information for you.' },
          warning: { title: 'Warning', message: 'Please be careful with this action.' },
          error: { title: 'Error', message: 'Something went wrong. Please try again.' },
        }
        notifications.value.push({
          id: String(idCounter++),
          type,
          ...messages[type],
        })
      }

      const handleDismiss = (id: string) => {
        notifications.value = notifications.value.filter(n => n.id !== id)
      }

      return { notifications, addNotification, handleDismiss }
    },
    template: `
      <div>
        <div class="mb-4 flex gap-2">
          <Button size="sm" @click="addNotification('success')">Add Success</Button>
          <Button size="sm" variant="secondary" @click="addNotification('info')">Add Info</Button>
          <Button size="sm" variant="outline" @click="addNotification('warning')">Add Warning</Button>
          <Button size="sm" variant="danger" @click="addNotification('error')">Add Error</Button>
        </div>
        <NotificationList :notifications="notifications" @dismiss="handleDismiss" />
      </div>
    `,
  }),
}

export const Empty: Story = {
  args: {
    notifications: [],
  },
  render: (args) => ({
    components: { NotificationList },
    setup: () => ({ args }),
    template: `
      <div>
        <p class="text-sm text-gray-500 mb-4">No notifications to display</p>
        <NotificationList v-bind="args" />
      </div>
    `,
  }),
}
