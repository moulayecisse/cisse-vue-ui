import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FormGroup from './FormGroup.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof FormGroup> = {
  title: 'Form/FormGroup',
  component: FormGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    select: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username...',
    name: 'username',
  },
  render: (args) => ({
    components: { FormGroup },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: '<FormGroup v-bind="args" v-model="value" />',
  }),
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email...',
    type: 'email',
    error: 'Please enter a valid email address',
  },
  render: (args) => ({
    components: { FormGroup },
    setup: () => {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: '<FormGroup v-bind="args" v-model="value" />',
  }),
}

export const AsSelect: Story = {
  args: {
    label: 'Country',
    select: true,
    placeholder: 'Select a country...',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
    ],
  },
  render: (args) => ({
    components: { FormGroup },
    setup: () => {
      const value = ref(null)
      return { args, value }
    },
    template: '<FormGroup v-bind="args" v-model="value" />',
  }),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
  },
  render: (args) => ({
    components: { FormGroup },
    setup: () => {
      const value = ref('Cannot edit this')
      return { args, value }
    },
    template: '<FormGroup v-bind="args" v-model="value" />',
  }),
}

export const CompleteForm: Story = {
  render: () => ({
    components: { FormGroup, Button },
    setup: () => {
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const country = ref(null)
      const countries = [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'fr', label: 'France' },
      ]
      return { firstName, lastName, email, country, countries }
    },
    template: `
      <form class="grid grid-cols-12 gap-4" @submit.prevent>
        <FormGroup
          v-model="firstName"
          label="First Name"
          placeholder="Enter first name..."
          :cols="6"
        />
        <FormGroup
          v-model="lastName"
          label="Last Name"
          placeholder="Enter last name..."
          :cols="6"
        />
        <FormGroup
          v-model="email"
          label="Email"
          type="email"
          placeholder="Enter email..."
          :cols="12"
        />
        <FormGroup
          v-model="country"
          label="Country"
          :select="true"
          :options="countries"
          placeholder="Select a country..."
          :cols="12"
        />
        <div class="col-span-12">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    `,
  }),
}
