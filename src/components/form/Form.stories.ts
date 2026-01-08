import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Form from './Form.vue'
import FormInput from './FormInput.vue'
import FormGroup from './FormGroup.vue'
import FormLabel from './FormLabel.vue'
import Select from './Select.vue'

const meta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    cols: {
      control: 'number',
    },
  },
  args: {
    layout: 'vertical',
    cols: 12,
    hideFooter: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Personal Information',
    description: 'Use a permanent address where you can receive mail.',
  },
  render: (args) => ({
    components: { Form, FormInput, FormGroup, FormLabel },
    setup: () => ({ args }),
    template: `
      <Form v-bind="args" @submit="console.log('submit')" @cancel="console.log('cancel')">
        <FormGroup class="col-span-6">
          <FormLabel for="first_name">First name</FormLabel>
          <FormInput name="first_name" placeholder="John" />
        </FormGroup>
        <FormGroup class="col-span-6">
          <FormLabel for="last_name">Last name</FormLabel>
          <FormInput name="last_name" placeholder="Doe" />
        </FormGroup>
        <FormGroup class="col-span-12">
          <FormLabel for="email">Email address</FormLabel>
          <FormInput name="email" type="email" placeholder="john@example.com" />
        </FormGroup>
      </Form>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Form title="Personal Information" description="...">
  <FormGroup class="col-span-6">
    <FormLabel>First name</FormLabel>
    <FormInput name="first_name" />
  </FormGroup>
  <FormGroup class="col-span-6">
    <FormLabel>Last name</FormLabel>
    <FormInput name="last_name" />
  </FormGroup>
</Form>`,
      },
    },
  },
}

export const WithLoading: Story = {
  args: {
    title: 'Account Settings',
    loading: true,
  },
  render: (args) => ({
    components: { Form, FormInput, FormGroup, FormLabel },
    setup: () => ({ args }),
    template: `
      <Form v-bind="args">
        <FormGroup class="col-span-12">
          <FormLabel for="username">Username</FormLabel>
          <FormInput name="username" placeholder="johndoe" />
        </FormGroup>
      </Form>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Form title="Account Settings" :loading="true">
  <!-- form fields -->
</Form>`,
      },
    },
  },
}

export const HideFooter: Story = {
  args: {
    title: 'Search Form',
    hideFooter: true,
  },
  render: (args) => ({
    components: { Form, FormInput, FormGroup, FormLabel },
    setup: () => ({ args }),
    template: `
      <Form v-bind="args">
        <FormGroup class="col-span-12">
          <FormLabel for="search">Search</FormLabel>
          <FormInput name="search" placeholder="Search..." />
        </FormGroup>
      </Form>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Form title="Search Form" :hide-footer="true">
  <!-- form fields -->
</Form>`,
      },
    },
  },
}

export const CustomLabels: Story = {
  args: {
    title: 'Contact Form',
    submitLabel: 'Send Message',
    cancelLabel: 'Reset',
  },
  render: (args) => ({
    components: { Form, FormInput, FormGroup, FormLabel },
    setup: () => ({ args }),
    template: `
      <Form v-bind="args">
        <FormGroup class="col-span-12">
          <FormLabel for="message">Message</FormLabel>
          <textarea name="message" class="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600" rows="4" placeholder="Your message..."></textarea>
        </FormGroup>
      </Form>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Form title="Contact Form" submit-label="Send Message" cancel-label="Reset">
  <!-- form fields -->
</Form>`,
      },
    },
  },
}

export const WithDividers: Story = {
  args: {
    title: 'Profile Settings',
    divide: true,
    layout: 'vertical',
  },
  render: (args) => ({
    components: { Form, FormInput, FormGroup, FormLabel, Select },
    setup: () => ({ args }),
    template: `
      <Form v-bind="args">
        <FormGroup class="col-span-6">
          <FormLabel>First name</FormLabel>
          <FormInput placeholder="John" />
        </FormGroup>
        <FormGroup class="col-span-6">
          <FormLabel>Last name</FormLabel>
          <FormInput placeholder="Doe" />
        </FormGroup>
        <FormGroup class="col-span-12">
          <FormLabel>Email</FormLabel>
          <FormInput type="email" placeholder="john@example.com" />
        </FormGroup>
        <FormGroup class="col-span-12">
          <FormLabel>Country</FormLabel>
          <Select :options="[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'fr', label: 'France' },
          ]" />
        </FormGroup>
      </Form>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Form title="Profile Settings" :divide="true">
  <!-- form fields -->
</Form>`,
      },
    },
  },
}

export const CustomColumns: Story = {
  args: {
    title: 'Grid Example',
    cols: 6,
  },
  render: (args) => ({
    components: { Form, FormInput, FormGroup, FormLabel },
    setup: () => ({ args }),
    template: `
      <Form v-bind="args">
        <FormGroup class="col-span-2">
          <FormLabel>Field 1</FormLabel>
          <FormInput placeholder="1/3 width" />
        </FormGroup>
        <FormGroup class="col-span-2">
          <FormLabel>Field 2</FormLabel>
          <FormInput placeholder="1/3 width" />
        </FormGroup>
        <FormGroup class="col-span-2">
          <FormLabel>Field 3</FormLabel>
          <FormInput placeholder="1/3 width" />
        </FormGroup>
        <FormGroup class="col-span-3">
          <FormLabel>Field 4</FormLabel>
          <FormInput placeholder="1/2 width" />
        </FormGroup>
        <FormGroup class="col-span-3">
          <FormLabel>Field 5</FormLabel>
          <FormInput placeholder="1/2 width" />
        </FormGroup>
      </Form>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Form title="Grid Example" :cols="6">
  <FormGroup class="col-span-2">...</FormGroup>
  <FormGroup class="col-span-3">...</FormGroup>
</Form>`,
      },
    },
  },
}
