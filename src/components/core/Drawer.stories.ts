import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Drawer from './Drawer.vue'
import Button from './Button.vue'

const meta: Meta<typeof Drawer> = {
  title: 'Core/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Drawer</Button>
        <Drawer v-bind="args" v-model="isOpen" title="Drawer Title">
          <p>This is the drawer content. You can put anything here.</p>
        </Drawer>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Button @click="isOpen = true">Open Drawer</Button>
<Drawer v-model="isOpen" title="Drawer Title">
  <p>This is the drawer content. You can put anything here.</p>
</Drawer>`,
      },
    },
  },
}

export const LeftPosition: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Left Drawer</Button>
        <Drawer v-bind="args" v-model="isOpen" position="left" title="Left Drawer">
          <p>This drawer slides in from the left.</p>
        </Drawer>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Drawer v-model="isOpen" position="left" title="Left Drawer">
  <p>This drawer slides in from the left.</p>
</Drawer>`,
      },
    },
  },
}

export const TopPosition: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Top Drawer</Button>
        <Drawer v-bind="args" v-model="isOpen" position="top" title="Top Drawer">
          <p>This drawer slides in from the top.</p>
        </Drawer>
      </div>
    `,
  }),
}

export const BottomPosition: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Bottom Drawer</Button>
        <Drawer v-bind="args" v-model="isOpen" position="bottom" title="Bottom Drawer">
          <p>This drawer slides in from the bottom.</p>
        </Drawer>
      </div>
    `,
  }),
}

export const WithFooter: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Drawer with Footer</Button>
        <Drawer v-bind="args" v-model="isOpen" title="Edit Profile">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name</label>
              <input type="text" class="w-full border rounded px-3 py-2" placeholder="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Email</label>
              <input type="email" class="w-full border rounded px-3 py-2" placeholder="john@example.com" />
            </div>
          </div>
          <template #footer>
            <div class="flex gap-2 justify-end">
              <Button variant="secondary" @click="isOpen = false">Cancel</Button>
              <Button @click="isOpen = false">Save Changes</Button>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Drawer v-model="isOpen" title="Edit Profile">
  <div class="space-y-4">
    <!-- Form fields -->
  </div>
  <template #footer>
    <div class="flex gap-2 justify-end">
      <Button variant="secondary" @click="isOpen = false">Cancel</Button>
      <Button @click="isOpen = false">Save Changes</Button>
    </div>
  </template>
</Drawer>`,
      },
    },
  },
}

export const LargeSize: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Large Drawer</Button>
        <Drawer v-bind="args" v-model="isOpen" size="lg" title="Large Drawer">
          <p>This is a large drawer with more space for content.</p>
        </Drawer>
      </div>
    `,
  }),
}

export const NoOverlay: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Drawer (No Overlay)</Button>
        <Drawer v-bind="args" v-model="isOpen" :overlay="false" title="No Overlay">
          <p>This drawer has no overlay background.</p>
        </Drawer>
      </div>
    `,
  }),
}
