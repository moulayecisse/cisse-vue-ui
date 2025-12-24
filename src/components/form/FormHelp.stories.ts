import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormHelp from './FormHelp.vue'
import FormInput from './FormInput.vue'
import FormLabel from './FormLabel.vue'

const meta: Meta<typeof FormHelp> = {
  title: 'Form/FormHelp',
  component: FormHelp,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    text: { control: 'text' },
  },
  args: {
    text: 'This is helper text for the form field.',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'This is helper text for the form field.',
  },
}

export const WithSlot: Story = {
  render: () => ({
    components: { FormHelp },
    template: `
      <FormHelp>
        Helper text can also be passed via the default slot.
      </FormHelp>
    `,
  }),
}

export const ErrorState: Story = {
  args: {
    error: true,
    text: 'This field is required.',
  },
}

export const WithFormInput: Story = {
  render: () => ({
    components: { FormHelp, FormInput, FormLabel },
    template: `
      <div>
        <FormLabel html-for="email">Email</FormLabel>
        <FormInput id="email" type="email" placeholder="Enter your email" />
        <FormHelp text="We'll never share your email with anyone." />
      </div>
    `,
  }),
}

export const WithFormInputError: Story = {
  render: () => ({
    components: { FormHelp, FormInput, FormLabel },
    template: `
      <div>
        <FormLabel html-for="password" error>Password</FormLabel>
        <FormInput id="password" type="password" placeholder="Enter password" />
        <FormHelp error text="Password must be at least 8 characters." />
      </div>
    `,
  }),
}

export const MultipleExamples: Story = {
  render: () => ({
    components: { FormHelp, FormInput, FormLabel },
    template: `
      <div class="space-y-6">
        <div>
          <FormLabel html-for="username">Username</FormLabel>
          <FormInput id="username" placeholder="Choose a username" />
          <FormHelp text="Username must be 3-20 characters long." />
        </div>
        <div>
          <FormLabel html-for="bio">Bio</FormLabel>
          <FormInput id="bio" placeholder="Tell us about yourself" />
          <FormHelp>Optional. Max 200 characters.</FormHelp>
        </div>
        <div>
          <FormLabel html-for="required-field" error>Required Field</FormLabel>
          <FormInput id="required-field" placeholder="This field is required" />
          <FormHelp error text="This field cannot be empty." />
        </div>
      </div>
    `,
  }),
}
