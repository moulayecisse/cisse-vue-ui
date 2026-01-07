import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormLabel from './FormLabel.vue'
import FormInput from './FormInput.vue'
import FormHelp from './FormHelp.vue'

const meta: Meta<typeof FormLabel> = {
  title: 'Form/FormLabel',
  component: FormLabel,
  tags: ['autodocs'],
  argTypes: {
    error: { control: 'boolean' },
    htmlFor: { control: 'text' },
  },
  args: {
    htmlFor: 'input-id',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { FormLabel },
    setup() {
      return { args }
    },
    template: `
      <FormLabel v-bind="args">
        Label Text
      </FormLabel>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormLabel html-for="input-id">Label Text</FormLabel>`,
      },
    },
  },
}

export const ErrorState: Story = {
  args: {
    error: true,
  },
  render: (args) => ({
    components: { FormLabel },
    setup() {
      return { args }
    },
    template: `
      <FormLabel v-bind="args">
        Label with Error
      </FormLabel>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormLabel html-for="input-id" error>Label with Error</FormLabel>`,
      },
    },
  },
}

export const WithInput: Story = {
  render: () => ({
    components: { FormLabel, FormInput },
    template: `
      <div>
        <FormLabel html-for="email">Email Address</FormLabel>
        <FormInput id="email" type="email" placeholder="Enter your email" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormLabel html-for="email">Email Address</FormLabel>
<FormInput id="email" type="email" placeholder="Enter your email" />`,
      },
    },
  },
}

export const WithInputAndHelp: Story = {
  render: () => ({
    components: { FormLabel, FormInput, FormHelp },
    template: `
      <div>
        <FormLabel html-for="password">Password</FormLabel>
        <FormInput id="password" type="password" placeholder="Enter password" />
        <FormHelp text="Must be at least 8 characters." />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormLabel html-for="password">Password</FormLabel>
<FormInput id="password" type="password" placeholder="Enter password" />
<FormHelp text="Must be at least 8 characters." />`,
      },
    },
  },
}

export const ErrorWithInput: Story = {
  render: () => ({
    components: { FormLabel, FormInput, FormHelp },
    template: `
      <div>
        <FormLabel html-for="username" error>Username</FormLabel>
        <FormInput id="username" placeholder="Enter username" />
        <FormHelp error text="Username is already taken." />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormLabel html-for="username" error>Username</FormLabel>
<FormInput id="username" placeholder="Enter username" />
<FormHelp error text="Username is already taken." />`,
      },
    },
  },
}

export const RequiredField: Story = {
  render: () => ({
    components: { FormLabel, FormInput },
    template: `
      <div>
        <FormLabel html-for="name">
          Full Name <span class="text-red-500">*</span>
        </FormLabel>
        <FormInput id="name" placeholder="Enter your full name" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormLabel html-for="name">
  Full Name <span class="text-red-500">*</span>
</FormLabel>
<FormInput id="name" placeholder="Enter your full name" />`,
      },
    },
  },
}

export const MultipleFields: Story = {
  render: () => ({
    components: { FormLabel, FormInput, FormHelp },
    template: `
      <div class="space-y-4">
        <div>
          <FormLabel html-for="first-name">First Name</FormLabel>
          <FormInput id="first-name" placeholder="John" />
        </div>
        <div>
          <FormLabel html-for="last-name">Last Name</FormLabel>
          <FormInput id="last-name" placeholder="Doe" />
        </div>
        <div>
          <FormLabel html-for="email-field">Email</FormLabel>
          <FormInput id="email-field" type="email" placeholder="john@example.com" />
          <FormHelp text="We'll use this for account recovery." />
        </div>
        <div>
          <FormLabel html-for="invalid-email" error>Email (Invalid)</FormLabel>
          <FormInput id="invalid-email" type="email" placeholder="invalid-email" />
          <FormHelp error text="Please enter a valid email address." />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div>
  <FormLabel html-for="first-name">First Name</FormLabel>
  <FormInput id="first-name" placeholder="John" />
</div>

<div>
  <FormLabel html-for="email-field">Email</FormLabel>
  <FormInput id="email-field" type="email" placeholder="john@example.com" />
  <FormHelp text="We'll use this for account recovery." />
</div>

<div>
  <FormLabel html-for="invalid-email" error>Email (Invalid)</FormLabel>
  <FormInput id="invalid-email" type="email" placeholder="invalid-email" />
  <FormHelp error text="Please enter a valid email address." />
</div>`,
      },
    },
  },
}
