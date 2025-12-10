import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Stepper from './Stepper.vue'
import Button from './Button.vue'

const meta: Meta<typeof Stepper> = {
  title: 'Core/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultSteps = [
  { key: 'account', title: 'Account', description: 'Create your account' },
  { key: 'profile', title: 'Profile', description: 'Set up your profile' },
  { key: 'review', title: 'Review', description: 'Review and submit' },
]

export const Horizontal: Story = {
  args: {
    steps: defaultSteps,
    modelValue: 'profile',
  },
  render: (args) => ({
    components: { Stepper },
    setup: () => ({ args }),
    template: '<Stepper v-bind="args" />',
  }),
}

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    modelValue: 'profile',
    orientation: 'vertical',
  },
  render: (args) => ({
    components: { Stepper },
    setup: () => ({ args }),
    template: '<Stepper v-bind="args" />',
  }),
}

export const FirstStep: Story = {
  args: {
    steps: defaultSteps,
    modelValue: 'account',
  },
  render: (args) => ({
    components: { Stepper },
    setup: () => ({ args }),
    template: '<Stepper v-bind="args" />',
  }),
}

export const LastStep: Story = {
  args: {
    steps: defaultSteps,
    modelValue: 'review',
  },
  render: (args) => ({
    components: { Stepper },
    setup: () => ({ args }),
    template: '<Stepper v-bind="args" />',
  }),
}

export const WithIcons: Story = {
  args: {
    steps: [
      { key: 'cart', title: 'Cart', description: 'Review your items', icon: 'lucide:shopping-cart' },
      { key: 'shipping', title: 'Shipping', description: 'Enter address', icon: 'lucide:truck' },
      { key: 'payment', title: 'Payment', description: 'Payment method', icon: 'lucide:credit-card' },
      { key: 'confirm', title: 'Confirm', description: 'Place order', icon: 'lucide:check-circle' },
    ],
    modelValue: 'shipping',
  },
  render: (args) => ({
    components: { Stepper },
    setup: () => ({ args }),
    template: '<Stepper v-bind="args" />',
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup: () => {
      const currentStep = ref('account')
      const steps = defaultSteps
      const stepKeys = steps.map((s) => s.key)

      const next = () => {
        const currentIndex = stepKeys.indexOf(currentStep.value)
        if (currentIndex < stepKeys.length - 1) {
          currentStep.value = stepKeys[currentIndex + 1]
        }
      }

      const prev = () => {
        const currentIndex = stepKeys.indexOf(currentStep.value)
        if (currentIndex > 0) {
          currentStep.value = stepKeys[currentIndex - 1]
        }
      }

      return { currentStep, steps, next, prev }
    },
    template: `
      <div class="space-y-8">
        <Stepper :steps="steps" v-model="currentStep" />
        <div class="flex justify-center gap-4">
          <Button variant="outline" @click="prev" :disabled="currentStep === 'account'">Previous</Button>
          <Button @click="next" :disabled="currentStep === 'review'">Next</Button>
        </div>
        <p class="text-center text-sm text-gray-600 dark:text-gray-400">Current step: {{ currentStep }}</p>
      </div>
    `,
  }),
}

export const ManySteps: Story = {
  args: {
    steps: [
      { key: '1', title: 'Step 1' },
      { key: '2', title: 'Step 2' },
      { key: '3', title: 'Step 3' },
      { key: '4', title: 'Step 4' },
      { key: '5', title: 'Step 5' },
    ],
    modelValue: '3',
  },
  render: (args) => ({
    components: { Stepper },
    setup: () => ({ args }),
    template: '<Stepper v-bind="args" />',
  }),
}
