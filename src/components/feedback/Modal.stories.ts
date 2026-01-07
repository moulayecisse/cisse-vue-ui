import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Modal from './Modal.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof Modal> = {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
    },
    title: { control: 'text' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    teleport: {
      control: 'text',
      description: 'Teleport target (e.g., "body", "#app"). Set to empty string to disable.',
    },
  },
  args: {
    size: 'default',
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Modal, Button },
    setup: () => {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Modal</Button>
        <Modal v-if="isOpen" title="Modal Title" @close="isOpen = false">
          <p class="text-gray-600 dark:text-gray-400">
            This is the modal content. You can put any content here.
          </p>
        </Modal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Modal v-if="isOpen" title="Modal Title" @close="isOpen = false">
  <p>This is the modal content. You can put any content here.</p>
</Modal>`,
      },
    },
  },
}

export const WithFooter: Story = {
  render: () => ({
    components: { Modal, Button },
    setup: () => {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Modal with Footer</Button>
        <Modal v-if="isOpen" title="Confirm Action" @close="isOpen = false">
          <p class="text-gray-600 dark:text-gray-400">
            Are you sure you want to proceed with this action?
          </p>
          <template #footer>
            <Button variant="outline" @click="isOpen = false">Cancel</Button>
            <Button @click="isOpen = false">Confirm</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Modal v-if="isOpen" title="Confirm Action" @close="isOpen = false">
  <p>Are you sure you want to proceed with this action?</p>
  <template #footer>
    <Button variant="outline" @click="isOpen = false">Cancel</Button>
    <Button @click="isOpen = false">Confirm</Button>
  </template>
</Modal>`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Modal, Button },
    setup: () => {
      const size = ref<string | null>(null)
      return { size }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <Button @click="size = 'sm'">Small</Button>
        <Button @click="size = 'default'">Default</Button>
        <Button @click="size = 'lg'">Large</Button>
        <Button @click="size = 'xl'">Extra Large</Button>
        <Button @click="size = 'full'">Full</Button>
        <Modal v-if="size" :title="'Modal - ' + size" :size="size" @close="size = null">
          <p class="text-gray-600 dark:text-gray-400">
            This modal has size: {{ size }}
          </p>
          <template #footer>
            <Button @click="size = null">Close</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Size options: sm, default, lg, xl, full -->
<Modal title="Modal Title" size="lg" @close="handleClose">
  <p>Modal content here.</p>
</Modal>`,
      },
    },
  },
}

export const NoCloseOnBackdrop: Story = {
  render: () => ({
    components: { Modal, Button },
    setup: () => {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Modal</Button>
        <Modal
          v-if="isOpen"
          title="Persistent Modal"
          :close-on-backdrop="false"
          @close="isOpen = false"
        >
          <p class="text-gray-600 dark:text-gray-400">
            Clicking the backdrop will not close this modal.
            You must click the close button.
          </p>
          <template #footer>
            <Button @click="isOpen = false">Close</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Modal
  v-if="isOpen"
  title="Persistent Modal"
  :close-on-backdrop="false"
  @close="isOpen = false"
>
  <p>Clicking the backdrop will not close this modal.</p>
  <template #footer>
    <Button @click="isOpen = false">Close</Button>
  </template>
</Modal>`,
      },
    },
  },
}

export const FormModal: Story = {
  render: () => ({
    components: { Modal, Button },
    setup: () => {
      const isOpen = ref(false)
      const name = ref('')
      const email = ref('')
      return { isOpen, name, email }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Form Modal</Button>
        <Modal v-if="isOpen" title="Edit Profile" @close="isOpen = false">
          <form class="space-y-4" @submit.prevent>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                v-model="name"
                type="text"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                v-model="email"
                type="email"
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
          </form>
          <template #footer>
            <Button variant="outline" @click="isOpen = false">Cancel</Button>
            <Button @click="isOpen = false">Save Changes</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Modal v-if="isOpen" title="Edit Profile" @close="isOpen = false">
  <form class="space-y-4" @submit.prevent>
    <FormInput v-model="name" label="Name" placeholder="Enter your name" />
    <FormInput v-model="email" label="Email" type="email" placeholder="Enter your email" />
  </form>
  <template #footer>
    <Button variant="outline" @click="isOpen = false">Cancel</Button>
    <Button @click="handleSave">Save Changes</Button>
  </template>
</Modal>`,
      },
    },
  },
}

export const DeleteConfirmation: Story = {
  render: () => ({
    components: { Modal, Button },
    setup: () => {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button variant="danger" @click="isOpen = true">Delete Item</Button>
        <Modal v-if="isOpen" title="Delete Confirmation" size="sm" @close="isOpen = false">
          <p class="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <template #footer>
            <Button variant="outline" @click="isOpen = false">Cancel</Button>
            <Button variant="danger" @click="isOpen = false">Delete</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Modal v-if="isOpen" title="Delete Confirmation" size="sm" @close="isOpen = false">
  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
  <template #footer>
    <Button variant="outline" @click="isOpen = false">Cancel</Button>
    <Button variant="danger" @click="handleDelete">Delete</Button>
  </template>
</Modal>`,
      },
    },
  },
}
