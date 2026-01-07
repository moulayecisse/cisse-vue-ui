import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ToastContainer from './ToastContainer.vue'
import type { ToastItem } from './ToastContainer.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof ToastContainer> = {
  title: 'Feedback/ToastContainer',
  component: ToastContainer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'top-center', 'bottom-center'],
    },
    topOffset: { control: 'text' },
  },
  args: {
    position: 'top-right',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const sampleToasts: ToastItem[] = [
  { id: '1', message: 'File uploaded successfully', type: 'success', title: 'Upload Complete' },
  { id: '2', message: 'New message received', type: 'info' },
]

export const Default: Story = {
  args: {
    toasts: sampleToasts,
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer :toasts="toasts" @close="handleClose" />`,
      },
    },
  },
}

export const TopLeft: Story = {
  args: {
    toasts: sampleToasts,
    position: 'top-left',
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer :toasts="toasts" position="top-left" @close="handleClose" />`,
      },
    },
  },
}

export const BottomRight: Story = {
  args: {
    toasts: sampleToasts,
    position: 'bottom-right',
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer :toasts="toasts" position="bottom-right" @close="handleClose" />`,
      },
    },
  },
}

export const BottomLeft: Story = {
  args: {
    toasts: sampleToasts,
    position: 'bottom-left',
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer :toasts="toasts" position="bottom-left" @close="handleClose" />`,
      },
    },
  },
}

export const TopCenter: Story = {
  args: {
    toasts: sampleToasts,
    position: 'top-center',
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer :toasts="toasts" position="top-center" @close="handleClose" />`,
      },
    },
  },
}

export const BottomCenter: Story = {
  args: {
    toasts: sampleToasts,
    position: 'bottom-center',
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer :toasts="toasts" position="bottom-center" @close="handleClose" />`,
      },
    },
  },
}

export const WithTopOffset: Story = {
  args: {
    toasts: sampleToasts,
    position: 'top-right',
    topOffset: '80px',
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: `
      <div>
        <div class="fixed top-0 left-0 right-0 h-16 bg-gray-800 flex items-center px-4 z-50">
          <span class="text-white font-medium">Fixed Header (64px)</span>
        </div>
        <p class="mt-20 text-sm text-gray-500">Toast container with 80px top offset to account for the header</p>
        <ToastContainer v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer
  :toasts="toasts"
  position="top-right"
  top-offset="80px"
  @close="handleClose"
/>`,
      },
    },
  },
}

export const AllTypes: Story = {
  args: {
    toasts: [
      { id: '1', message: 'Operation completed', type: 'success', title: 'Success' },
      { id: '2', message: 'New update available', type: 'info', title: 'Info' },
      { id: '3', message: 'Check your input', type: 'warning', title: 'Warning' },
      { id: '4', message: 'Something went wrong', type: 'error', title: 'Error' },
    ],
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: '<ToastContainer v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer
  :toasts="[
    { id: '1', message: 'Operation completed', type: 'success', title: 'Success' },
    { id: '2', message: 'New update available', type: 'info', title: 'Info' },
    { id: '3', message: 'Check your input', type: 'warning', title: 'Warning' },
    { id: '4', message: 'Something went wrong', type: 'error', title: 'Error' }
  ]"
  @close="handleClose"
/>`,
      },
    },
  },
}

export const Interactive: Story = {
  render: () => ({
    components: { ToastContainer, Button },
    setup: () => {
      const toasts = ref<ToastItem[]>([])
      let idCounter = 1

      const addToast = (type: 'success' | 'info' | 'warning' | 'error') => {
        const messages = {
          success: { title: 'Success', message: 'Action completed successfully!' },
          info: { title: 'Info', message: 'Here is some information.' },
          warning: { title: 'Warning', message: 'Please review this action.' },
          error: { title: 'Error', message: 'An error occurred.' },
        }
        toasts.value.push({
          id: String(idCounter++),
          type,
          ...messages[type],
          duration: 5000,
        })
      }

      const handleClose = (id: string) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }

      return { toasts, addToast, handleClose }
    },
    template: `
      <div>
        <div class="flex gap-2 flex-wrap">
          <Button size="sm" @click="addToast('success')">Success Toast</Button>
          <Button size="sm" variant="secondary" @click="addToast('info')">Info Toast</Button>
          <Button size="sm" variant="outline" @click="addToast('warning')">Warning Toast</Button>
          <Button size="sm" variant="danger" @click="addToast('error')">Error Toast</Button>
        </div>
        <ToastContainer :toasts="toasts" @close="handleClose" />
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
    message: 'Toast message',
    duration: 5000
  })
}

const handleClose = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}
</script>

<template>
  <ToastContainer :toasts="toasts" @close="handleClose" />
</template>`,
      },
    },
  },
}

export const WithDuration: Story = {
  args: {
    toasts: [
      { id: '1', message: 'This toast will disappear in 2 seconds', type: 'info', duration: 2000 },
      { id: '2', message: 'This toast will disappear in 5 seconds', type: 'success', duration: 5000 },
    ],
  },
  render: (args) => ({
    components: { ToastContainer },
    setup: () => ({ args }),
    template: `
      <div>
        <p class="text-sm text-gray-500 mb-4">Each toast has a different duration</p>
        <ToastContainer v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<ToastContainer
  :toasts="[
    { id: '1', message: 'Disappears in 2 seconds', type: 'info', duration: 2000 },
    { id: '2', message: 'Disappears in 5 seconds', type: 'success', duration: 5000 }
  ]"
  @close="handleClose"
/>`,
      },
    },
  },
}
