import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import InputWrapper from './InputWrapper.vue'

const meta: Meta<typeof InputWrapper> = {
  title: 'Form/InputWrapper',
  component: InputWrapper,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    iconRight: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    focused: { control: 'boolean' },
    wrapperClass: { control: 'text' },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Enter text..." />
      </InputWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputWrapper v-slot="{ inputClass }">
  <input v-model="value" :class="inputClass" placeholder="Enter text..." />
</InputWrapper>`,
      },
    },
  },
}

export const WithLeftIcon: Story = {
  args: {
    icon: 'lucide:search',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Search..." />
      </InputWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputWrapper icon="lucide:search" v-slot="{ inputClass }">
  <input v-model="value" :class="inputClass" placeholder="Search..." />
</InputWrapper>`,
      },
    },
  },
}

export const WithRightIcon: Story = {
  args: {
    iconRight: 'lucide:chevron-down',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Select option..." />
      </InputWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputWrapper icon-right="lucide:chevron-down" v-slot="{ inputClass }">
  <input v-model="value" :class="inputClass" placeholder="Select option..." />
</InputWrapper>`,
      },
    },
  },
}

export const WithBothIcons: Story = {
  args: {
    icon: 'lucide:mail',
    iconRight: 'lucide:check',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('validated@email.com')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" type="email" />
      </InputWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputWrapper icon="lucide:mail" icon-right="lucide:check" v-slot="{ inputClass }">
  <input v-model="value" :class="inputClass" type="email" />
</InputWrapper>`,
      },
    },
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { InputWrapper },
    setup: () => {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <InputWrapper icon="lucide:search" size="sm" v-slot="{ inputClass }">
            <input v-model="small" :class="inputClass" placeholder="Small input..." />
          </InputWrapper>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <InputWrapper icon="lucide:search" size="md" v-slot="{ inputClass }">
            <input v-model="medium" :class="inputClass" placeholder="Medium input..." />
          </InputWrapper>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <InputWrapper icon="lucide:search" size="lg" v-slot="{ inputClass }">
            <input v-model="large" :class="inputClass" placeholder="Large input..." />
          </InputWrapper>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputWrapper icon="lucide:search" size="sm" v-slot="{ inputClass }">
  <input :class="inputClass" placeholder="Small input..." />
</InputWrapper>
<InputWrapper icon="lucide:search" size="md" v-slot="{ inputClass }">
  <input :class="inputClass" placeholder="Medium input..." />
</InputWrapper>
<InputWrapper icon="lucide:search" size="lg" v-slot="{ inputClass }">
  <input :class="inputClass" placeholder="Large input..." />
</InputWrapper>`,
      },
    },
  },
}

export const InvalidState: Story = {
  args: {
    icon: 'lucide:mail',
    invalid: true,
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: `
      <div>
        <InputWrapper v-bind="args" v-slot="{ inputClass }">
          <input v-model="value" :class="inputClass" type="email" placeholder="Enter email..." />
        </InputWrapper>
        <p class="mt-1 text-sm text-red-500">Please enter a valid email address</p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<InputWrapper icon="lucide:mail" invalid v-slot="{ inputClass }">
  <input v-model="value" :class="inputClass" type="email" />
</InputWrapper>`,
      },
    },
  },
}

export const States: Story = {
  render: () => ({
    components: { InputWrapper },
    setup: () => {
      const normal = ref('Normal input')
      const focused = ref('Focused input')
      const invalid = ref('Invalid input')
      const disabled = ref('Disabled input')
      return { normal, focused, invalid, disabled }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Normal</label>
          <InputWrapper icon="lucide:type" v-slot="{ inputClass }">
            <input v-model="normal" :class="inputClass" />
          </InputWrapper>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Focused (controlled)</label>
          <InputWrapper icon="lucide:type" :focused="true" v-slot="{ inputClass }">
            <input v-model="focused" :class="inputClass" />
          </InputWrapper>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Invalid</label>
          <InputWrapper icon="lucide:type" :invalid="true" v-slot="{ inputClass }">
            <input v-model="invalid" :class="inputClass" />
          </InputWrapper>
          <p class="mt-1 text-sm text-red-500">This field has an error</p>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Disabled</label>
          <InputWrapper icon="lucide:type" :disabled="true" v-slot="{ inputClass }">
            <input v-model="disabled" :class="inputClass" disabled />
          </InputWrapper>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Normal -->
<InputWrapper icon="lucide:type" v-slot="{ inputClass }">
  <input :class="inputClass" />
</InputWrapper>

<!-- Invalid -->
<InputWrapper icon="lucide:type" invalid v-slot="{ inputClass }">
  <input :class="inputClass" />
</InputWrapper>

<!-- Disabled -->
<InputWrapper icon="lucide:type" disabled v-slot="{ inputClass }">
  <input :class="inputClass" disabled />
</InputWrapper>`,
      },
    },
  },
}
