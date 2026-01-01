import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import OTPInput from './OTPInput.vue'

const meta: Meta<typeof OTPInput> = {
  title: 'Form/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  argTypes: {
    length: { control: 'number' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    masked: { control: 'boolean' },
  },
  args: {
    length: 6,
    size: 'md',
    autoFocus: false,
    masked: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { OTPInput },
    setup: () => {
      const code = ref('')
      return { args, code }
    },
    template: '<OTPInput v-bind="args" v-model="code" />',
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { OTPInput },
    setup: () => {
      const code = ref('123456')
      return { code }
    },
    template: '<OTPInput v-model="code" :autoFocus="false" />',
  }),
}

export const FourDigits: Story = {
  args: {
    length: 4,
  },
  render: (args) => ({
    components: { OTPInput },
    setup: () => {
      const code = ref('')
      return { args, code }
    },
    template: '<OTPInput v-bind="args" v-model="code" />',
  }),
}

export const Masked: Story = {
  args: {
    masked: true,
  },
  render: (args) => ({
    components: { OTPInput },
    setup: () => {
      const code = ref('123456')
      return { args, code }
    },
    template: '<OTPInput v-bind="args" v-model="code" />',
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { OTPInput },
    setup: () => {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { small, medium, large }
    },
    template: `
      <div class="space-y-6">
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <OTPInput v-model="small" size="sm" :autoFocus="false" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <OTPInput v-model="medium" size="md" :autoFocus="false" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <OTPInput v-model="large" size="lg" :autoFocus="false" />
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
    components: { OTPInput },
    setup: () => {
      const code = ref('123456')
      return { args, code }
    },
    template: '<OTPInput v-bind="args" v-model="code" />',
  }),
}

export const VerificationForm: Story = {
  render: () => ({
    components: { OTPInput },
    setup: () => {
      const code = ref('')
      const isComplete = ref(false)

      function handleComplete(value: string) {
        isComplete.value = true
        console.log('OTP Complete:', value)
      }

      return { code, isComplete, handleComplete }
    },
    template: `
      <div class="max-w-md mx-auto text-center">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verify your email</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          We've sent a 6-digit code to your email. Enter it below.
        </p>

        <OTPInput v-model="code" @complete="handleComplete" :autoFocus="false" />

        <div class="mt-6">
          <p v-if="isComplete" class="text-emerald-500 font-medium">
            Code verified!
          </p>
          <p v-else class="text-sm text-gray-500">
            Didn't receive the code? <button class="text-primary-500 hover:underline">Resend</button>
          </p>
        </div>
      </div>
    `,
  }),
}

export const PhoneVerification: Story = {
  args: {
    length: 4,
  },
  render: (args) => ({
    components: { OTPInput },
    setup: () => {
      const code = ref('')
      return { args, code }
    },
    template: `
      <div class="max-w-sm mx-auto text-center">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Phone verification</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter the 4-digit code sent to +33 6** *** **12
        </p>

        <OTPInput v-bind="args" v-model="code" />
      </div>
    `,
  }),
}
