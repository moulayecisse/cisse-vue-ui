import type { Meta, StoryObj } from '@storybook/vue3-vite'
import InputGroup from './InputGroup.vue'
import FormInput from './FormInput.vue'

const meta: Meta<typeof InputGroup> = {
  title: 'Form/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    prefix: 'https://',
  },
  render: (args) => ({
    components: { InputGroup, FormInput },
    setup: () => ({ args }),
    template: `
      <InputGroup v-bind="args">
        <FormInput placeholder="example.com" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup prefix="https://">
  <FormInput placeholder="example.com" />
</InputGroup>`,
      },
    },
  },
}

export const WithSuffix: Story = {
  args: {
    suffix: '.com',
  },
  render: (args) => ({
    components: { InputGroup, FormInput },
    setup: () => ({ args }),
    template: `
      <InputGroup v-bind="args">
        <FormInput placeholder="yoursite" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup suffix=".com">
  <FormInput placeholder="yoursite" />
</InputGroup>`,
      },
    },
  },
}

export const WithBoth: Story = {
  args: {
    prefix: '$',
    suffix: 'USD',
  },
  render: (args) => ({
    components: { InputGroup, FormInput },
    setup: () => ({ args }),
    template: `
      <InputGroup v-bind="args">
        <FormInput type="number" placeholder="0.00" class="text-right" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup prefix="$" suffix="USD">
  <FormInput type="number" placeholder="0.00" />
</InputGroup>`,
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { InputGroup, FormInput },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-500 mb-2">Small</p>
          <InputGroup size="sm" prefix="https://">
            <FormInput size="sm" placeholder="example.com" />
          </InputGroup>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Medium (default)</p>
          <InputGroup size="md" prefix="https://">
            <FormInput size="md" placeholder="example.com" />
          </InputGroup>
        </div>
        <div>
          <p class="text-sm text-gray-500 mb-2">Large</p>
          <InputGroup size="lg" prefix="https://">
            <FormInput size="lg" placeholder="example.com" />
          </InputGroup>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup size="sm" prefix="https://"><FormInput size="sm" /></InputGroup>
<InputGroup size="md" prefix="https://"><FormInput size="md" /></InputGroup>
<InputGroup size="lg" prefix="https://"><FormInput size="lg" /></InputGroup>`,
      },
    },
  },
}

export const WithSlots: Story = {
  render: () => ({
    components: { InputGroup, FormInput },
    template: `
      <InputGroup>
        <template #prefix>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-4" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </template>
        <FormInput type="email" placeholder="you@example.com" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup>
  <template #prefix>
    <Icon icon="mail" />
  </template>
  <FormInput type="email" placeholder="you@example.com" />
</InputGroup>`,
      },
    },
  },
}

export const EmailExample: Story = {
  render: () => ({
    components: { InputGroup, FormInput },
    template: `
      <InputGroup suffix="@company.com">
        <FormInput placeholder="username" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup suffix="@company.com">
  <FormInput placeholder="username" />
</InputGroup>`,
      },
    },
  },
}

export const PercentageExample: Story = {
  render: () => ({
    components: { InputGroup, FormInput },
    template: `
      <InputGroup suffix="%">
        <FormInput type="number" placeholder="0" min="0" max="100" />
      </InputGroup>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputGroup suffix="%">
  <FormInput type="number" placeholder="0" min="0" max="100" />
</InputGroup>`,
      },
    },
  },
}
