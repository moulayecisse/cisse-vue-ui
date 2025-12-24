import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Feedback/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'danger', 'success'],
    },
    teleport: {
      control: 'text',
      description: 'Teleport target (e.g., "body", "#app"). Set to empty string to disable.',
    },
  },
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Default: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Dialog</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          @confirm="isOpen = false"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed with this action?',
  },
}

export const DangerVariant: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button variant="danger" @click="isOpen = true">Delete Item</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          @confirm="isOpen = false"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Delete Item',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    variant: 'danger',
    confirmText: 'Delete',
  },
}

export const WarningVariant: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button variant="secondary" @click="isOpen = true">Reset Settings</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          @confirm="isOpen = false"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Reset Settings',
    message: 'This will reset all settings to their default values. Your customizations will be lost.',
    variant: 'warning',
    confirmText: 'Reset',
  },
}

export const SuccessVariant: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button variant="primary" @click="isOpen = true">Publish Article</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          @confirm="isOpen = false"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Publish Article',
    message: 'Your article will be visible to the public. Are you ready to publish?',
    variant: 'success',
    confirmText: 'Publish',
  },
}

export const WithLoading: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      const loading = ref(false)
      const handleConfirm = () => {
        loading.value = true
        setTimeout(() => {
          loading.value = false
          isOpen.value = false
        }, 2000)
      }
      return { args, isOpen, loading, handleConfirm }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Dialog</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          :loading="loading"
          @confirm="handleConfirm"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Save Changes',
    message: 'Click confirm to see the loading state.',
  },
}

export const CustomIcon: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Send Email</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          @confirm="isOpen = false"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Send Email',
    message: 'This will send the email to all selected recipients.',
    icon: 'lucide:mail',
    confirmText: 'Send',
  },
}

export const CustomButtonText: Story = {
  render: (args) => ({
    components: { ConfirmDialog, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Log Out</Button>
        <ConfirmDialog
          v-bind="args"
          :open="isOpen"
          @confirm="isOpen = false"
          @cancel="isOpen = false"
        />
      </div>
    `,
  }),
  args: {
    title: 'Log Out',
    message: 'Are you sure you want to log out of your account?',
    confirmText: 'Yes, log out',
    cancelText: 'Stay logged in',
    variant: 'warning',
  },
}
