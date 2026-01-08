import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Divider from './Divider.vue'

const meta: Meta<typeof Divider> = {
  title: 'Core/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'muted'],
    },
    label: { control: 'text' },
  },
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    color: 'default',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<Divider v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Divider />`,
      },
    },
  },
}

export const WithLabel: Story = {
  args: {
    label: 'OR',
  },
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<Divider v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Divider label="OR" />`,
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-500 mb-2">Small</p>
          <Divider size="sm" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Medium (default)</p>
          <Divider size="md" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Large</p>
          <Divider size="lg" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Divider size="sm" />
<Divider size="md" />
<Divider size="lg" />`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-500 mb-2">Solid (default)</p>
          <Divider variant="solid" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Dashed</p>
          <Divider variant="dashed" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Dotted</p>
          <Divider variant="dotted" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />`,
      },
    },
  },
}

export const AllColors: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-sm text-gray-500 mb-2">Default</p>
          <Divider color="default" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Primary</p>
          <Divider color="primary" />
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Muted</p>
          <Divider color="muted" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Divider color="default" />
<Divider color="primary" />
<Divider color="muted" />`,
      },
    },
  },
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="flex items-center h-16">
        <span class="text-gray-700 dark:text-gray-300">Item 1</span>
        <Divider orientation="vertical" />
        <span class="text-gray-700 dark:text-gray-300">Item 2</span>
        <Divider orientation="vertical" />
        <span class="text-gray-700 dark:text-gray-300">Item 3</span>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="flex items-center h-16">
  <span>Item 1</span>
  <Divider orientation="vertical" />
  <span>Item 2</span>
  <Divider orientation="vertical" />
  <span>Item 3</span>
</div>`,
      },
    },
  },
}

export const WithLabelVariants: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="space-y-6">
        <Divider label="OR" />
        <Divider label="Continue with" />
        <Divider label="Section Break" color="primary" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Divider label="OR" />
<Divider label="Continue with" />
<Divider label="Section Break" color="primary" />`,
      },
    },
  },
}

export const InContent: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="max-w-md p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Sign In</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Enter your credentials below</p>
        <Divider class="my-4" />
        <div class="space-y-3">
          <input type="email" placeholder="Email" class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
          <input type="password" placeholder="Password" class="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600" />
          <button class="w-full py-2 bg-primary-600 text-white rounded-lg">Sign In</button>
        </div>
        <Divider label="OR" class="my-4" />
        <button class="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300">
          Continue with Google
        </button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="p-4 bg-white rounded-lg shadow">
  <h3>Sign In</h3>
  <Divider class="my-4" />
  <!-- Form fields -->
  <Divider label="OR" class="my-4" />
  <!-- Social login -->
</div>`,
      },
    },
  },
}
