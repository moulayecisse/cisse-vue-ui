import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PhoneInput from './PhoneInput.vue'

const meta: Meta<typeof PhoneInput> = {
  title: 'Form/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    defaultCountry: { control: 'text' },
  },
  args: {
    size: 'md',
    defaultCountry: 'FR',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('')
      return { args, phone }
    },
    template: '<PhoneInput v-bind="args" v-model="phone" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('612345678')
      return { phone }
    },
    template: '<PhoneInput v-model="phone" />',
  }),
}

export const UnitedStates: Story = {
  args: {
    defaultCountry: 'US',
  },
  render: (args) => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('2025551234')
      return { args, phone }
    },
    template: '<PhoneInput v-bind="args" v-model="phone" />',
  }),
}

export const Mali: Story = {
  args: {
    defaultCountry: 'ML',
  },
  render: (args) => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('70123456')
      return { args, phone }
    },
    template: '<PhoneInput v-bind="args" v-model="phone" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { PhoneInput },
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
          <PhoneInput v-model="small" size="sm" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <PhoneInput v-model="medium" size="md" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <PhoneInput v-model="large" size="lg" />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('612345678')
      return { args, phone }
    },
    template: '<PhoneInput v-bind="args" v-model="phone" />',
  }),
}

export const WithFullNumber: Story = {
  render: () => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('612345678')
      const phoneRef = ref<InstanceType<typeof PhoneInput> | null>(null)
      return { phone, phoneRef }
    },
    template: `
      <div class="space-y-2">
        <PhoneInput ref="phoneRef" v-model="phone" />
        <p class="text-sm text-gray-500">
          Full number: <code class="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">{{ phoneRef?.fullNumber }}</code>
        </p>
      </div>
    `,
  }),
}

export const ContactForm: Story = {
  render: () => ({
    components: { PhoneInput },
    setup: () => {
      const phone = ref('')
      return { phone }
    },
    template: `
      <div class="max-w-sm space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Phone Number <span class="text-red-500">*</span>
          </label>
          <PhoneInput v-model="phone" required />
          <p class="mt-1 text-xs text-gray-500">We'll use this to contact you</p>
        </div>
      </div>
    `,
  }),
}
