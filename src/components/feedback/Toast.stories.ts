import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Toast from './Toast.vue'
import ToastContainer from './ToastContainer.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    title: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    closable: { control: 'boolean' },
    duration: { control: 'number' },
  },
  args: {
    message: 'This is a toast message',
    type: 'info',
    closable: true,
    duration: 0,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    message: 'Your changes have been saved successfully.',
    title: 'Success',
    type: 'success',
  },
  render: (args) => ({
    components: { Toast },
    setup: () => ({ args }),
    template: '<Toast v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Toast
  type="success"
  title="Success"
  message="Your changes have been saved successfully."
/>`,
      },
    },
  },
}

export const Error: Story = {
  args: {
    message: 'An error occurred while processing your request.',
    title: 'Error',
    type: 'error',
  },
  render: (args) => ({
    components: { Toast },
    setup: () => ({ args }),
    template: '<Toast v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Toast
  type="error"
  title="Error"
  message="An error occurred while processing your request."
/>`,
      },
    },
  },
}

export const Warning: Story = {
  args: {
    message: 'Please review your information before proceeding.',
    title: 'Warning',
    type: 'warning',
  },
  render: (args) => ({
    components: { Toast },
    setup: () => ({ args }),
    template: '<Toast v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Toast
  type="warning"
  title="Warning"
  message="Please review your information before proceeding."
/>`,
      },
    },
  },
}

export const Info: Story = {
  args: {
    message: 'A new version is available.',
    title: 'Info',
    type: 'info',
  },
  render: (args) => ({
    components: { Toast },
    setup: () => ({ args }),
    template: '<Toast v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Toast
  type="info"
  title="Info"
  message="A new version is available."
/>`,
      },
    },
  },
}

export const AllTypes: Story = {
  render: () => ({
    components: { Toast },
    template: `
      <div class="space-y-4 max-w-sm">
        <Toast type="success" title="Success" message="Operation completed successfully." :duration="0" />
        <Toast type="error" title="Error" message="Something went wrong." :duration="0" />
        <Toast type="warning" title="Warning" message="Please be careful." :duration="0" />
        <Toast type="info" title="Info" message="Here's some information." :duration="0" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Toast type="success" title="Success" message="Operation completed successfully." />
<Toast type="error" title="Error" message="Something went wrong." />
<Toast type="warning" title="Warning" message="Please be careful." />
<Toast type="info" title="Info" message="Here's some information." />`,
      },
    },
  },
}

export const WithContainer: Story = {
  render: () => ({
    components: { ToastContainer, Button },
    setup: () => {
      const toasts = ref<Array<{ id: string; message: string; type: 'success' | 'error' | 'warning' | 'info'; title?: string }>>([])
      let id = 0

      const addToast = (type: 'success' | 'error' | 'warning' | 'info') => {
        const messages = {
          success: 'Operation completed successfully!',
          error: 'An error occurred.',
          warning: 'Please review your action.',
          info: 'Here is some information.',
        }
        toasts.value.push({
          id: `toast-${++id}`,
          type,
          title: type.charAt(0).toUpperCase() + type.slice(1),
          message: messages[type],
        })
      }

      const removeToast = (toastId: string) => {
        toasts.value = toasts.value.filter((t) => t.id !== toastId)
      }

      return { toasts, addToast, removeToast }
    },
    template: `
      <div>
        <div class="flex flex-wrap gap-2">
          <Button variant="success" @click="addToast('success')">Success Toast</Button>
          <Button variant="danger" @click="addToast('error')">Error Toast</Button>
          <Button variant="outline" @click="addToast('warning')">Warning Toast</Button>
          <Button variant="secondary" @click="addToast('info')">Info Toast</Button>
        </div>
        <ToastContainer :toasts="toasts" @close="removeToast" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<script setup>
import { ref } from 'vue'

const toasts = ref([])

const addToast = (type) => {
  toasts.value.push({
    id: String(Date.now()),
    type,
    title: 'Title',
    message: 'Toast message'
  })
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}
</script>

<template>
  <ToastContainer :toasts="toasts" @close="removeToast" />
</template>`,
      },
    },
  },
}

export const WithoutTitle: Story = {
  args: {
    message: 'This is a simple toast without a title.',
    type: 'info',
  },
  render: (args) => ({
    components: { Toast },
    setup: () => ({ args }),
    template: '<div class="max-w-sm"><Toast v-bind="args" /></div>',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Toast type="info" message="This is a simple toast without a title." />`,
      },
    },
  },
}
