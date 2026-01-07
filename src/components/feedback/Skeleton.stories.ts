import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Skeleton from './Skeleton.vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: 'number' },
    animate: { control: 'boolean' },
  },
  args: {
    variant: 'text',
    animate: true,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: {
    variant: 'text',
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="text" />`,
      },
    },
  },
}

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="text" :lines="3" />`,
      },
    },
  },
}

export const Circular: Story = {
  args: {
    variant: 'circular',
    width: '4rem',
    height: '4rem',
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="circular" width="4rem" height="4rem" />`,
      },
    },
  },
}

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: '200px',
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="rectangular" width="100%" height="200px" />`,
      },
    },
  },
}

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '100%',
    height: '120px',
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="rounded" width="100%" height="120px" />`,
      },
    },
  },
}

export const CardSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="max-w-sm rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <Skeleton variant="rounded" height="160px" class="mb-4" />
        <Skeleton variant="text" width="70%" class="mb-2" />
        <Skeleton variant="text" :lines="2" />
        <div class="mt-4 flex items-center gap-3">
          <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
          <div class="flex-1">
            <Skeleton variant="text" width="60%" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="rounded-lg border p-4">
  <Skeleton variant="rounded" height="160px" class="mb-4" />
  <Skeleton variant="text" width="70%" class="mb-2" />
  <Skeleton variant="text" :lines="2" />
  <div class="mt-4 flex items-center gap-3">
    <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
    <Skeleton variant="text" width="60%" />
  </div>
</div>`,
      },
    },
  },
}

export const ListSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-4">
        <div v-for="i in 3" :key="i" class="flex items-center gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <Skeleton variant="circular" width="3rem" height="3rem" />
          <div class="flex-1">
            <Skeleton variant="text" width="40%" class="mb-2" />
            <Skeleton variant="text" width="70%" />
          </div>
          <Skeleton variant="rounded" width="5rem" height="2rem" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div v-for="i in 3" :key="i" class="flex items-center gap-4 p-4">
  <Skeleton variant="circular" width="3rem" height="3rem" />
  <div class="flex-1">
    <Skeleton variant="text" width="40%" class="mb-2" />
    <Skeleton variant="text" width="70%" />
  </div>
  <Skeleton variant="rounded" width="5rem" height="2rem" />
</div>`,
      },
    },
  },
}

export const TableSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex gap-4">
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="15%" />
          </div>
        </div>
        <div v-for="i in 5" :key="i" class="border-b border-gray-200 px-4 py-3 last:border-0 dark:border-gray-700">
          <div class="flex gap-4">
            <Skeleton variant="text" width="20%" />
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="15%" />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Table skeleton -->
<div class="rounded-lg border">
  <div class="border-b bg-gray-50 px-4 py-3">
    <div class="flex gap-4">
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="text" width="30%" />
    </div>
  </div>
  <div v-for="i in 5" :key="i" class="border-b px-4 py-3">
    <div class="flex gap-4">
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="text" width="30%" />
    </div>
  </div>
</div>`,
      },
    },
  },
}

export const ProfileSkeleton: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="flex items-start gap-6">
        <Skeleton variant="circular" width="6rem" height="6rem" />
        <div class="flex-1">
          <Skeleton variant="text" width="40%" height="1.5rem" class="mb-2" />
          <Skeleton variant="text" width="60%" class="mb-4" />
          <Skeleton variant="text" :lines="3" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="flex items-start gap-6">
  <Skeleton variant="circular" width="6rem" height="6rem" />
  <div class="flex-1">
    <Skeleton variant="text" width="40%" height="1.5rem" class="mb-2" />
    <Skeleton variant="text" width="60%" class="mb-4" />
    <Skeleton variant="text" :lines="3" />
  </div>
</div>`,
      },
    },
  },
}

export const NoAnimation: Story = {
  args: {
    variant: 'text',
    lines: 3,
    animate: false,
  },
  render: (args) => ({
    components: { Skeleton },
    setup: () => ({ args }),
    template: '<Skeleton v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Skeleton variant="text" :lines="3" :animate="false" />`,
      },
    },
  },
}
