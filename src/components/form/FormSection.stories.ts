import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormSection from './FormSection.vue'
import FormInput from './FormInput.vue'
import FormGroup from './FormGroup.vue'
import Button from '../core/Button.vue'

const meta: Meta<typeof FormSection> = {
  title: 'Form/FormSection',
  component: FormSection,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    icon: { control: 'text' },
    iconColor: {
      control: 'select',
      options: ['primary', 'gray', 'success', 'warning', 'danger'],
    },
    bordered: { control: 'boolean' },
    collapsible: { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Personal Information',
    subtitle: 'Enter your personal details',
    icon: 'heroicons:user',
  },
  render: (args) => ({
    components: { FormSection, FormInput, FormGroup },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="First Name" required>
            <FormInput placeholder="John" />
          </FormGroup>
          <FormGroup label="Last Name" required>
            <FormInput placeholder="Doe" />
          </FormGroup>
          <FormGroup label="Email" class="md:col-span-2">
            <FormInput type="email" placeholder="john@example.com" icon="heroicons:envelope" />
          </FormGroup>
        </div>
      </FormSection>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    title: 'Account Settings',
    subtitle: 'Manage your account preferences',
    icon: 'heroicons:cog-6-tooth',
  },
  render: (args) => ({
    components: { FormSection, FormInput, FormGroup, Button },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <div class="space-y-4">
          <FormGroup label="Username">
            <FormInput placeholder="johndoe" />
          </FormGroup>
          <FormGroup label="Password">
            <FormInput type="password" placeholder="••••••••" />
          </FormGroup>
        </div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </template>
      </FormSection>
    `,
  }),
}

export const Collapsible: Story = {
  args: {
    title: 'Advanced Options',
    subtitle: 'Click to expand',
    icon: 'heroicons:adjustments-horizontal',
    collapsible: true,
  },
  render: (args) => ({
    components: { FormSection, FormInput, FormGroup },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <div class="space-y-4">
          <FormGroup label="API Key">
            <FormInput placeholder="sk-..." />
          </FormGroup>
          <FormGroup label="Webhook URL">
            <FormInput placeholder="https://..." />
          </FormGroup>
        </div>
      </FormSection>
    `,
  }),
}

export const CollapsedByDefault: Story = {
  args: {
    title: 'Hidden Section',
    icon: 'heroicons:eye-slash',
    collapsible: true,
    collapsed: true,
  },
  render: (args) => ({
    components: { FormSection },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <p class="text-gray-600">This content is hidden by default.</p>
      </FormSection>
    `,
  }),
}

export const SuccessColor: Story = {
  args: {
    title: 'Verification Complete',
    subtitle: 'Your account has been verified',
    icon: 'heroicons:check-circle',
    iconColor: 'success',
  },
  render: (args) => ({
    components: { FormSection },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <p class="text-gray-600">All verification steps have been completed successfully.</p>
      </FormSection>
    `,
  }),
}

export const WarningColor: Story = {
  args: {
    title: 'Action Required',
    subtitle: 'Please complete the following',
    icon: 'heroicons:exclamation-triangle',
    iconColor: 'warning',
  },
  render: (args) => ({
    components: { FormSection },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <p class="text-gray-600">Some fields require your attention.</p>
      </FormSection>
    `,
  }),
}

export const DangerColor: Story = {
  args: {
    title: 'Danger Zone',
    subtitle: 'Irreversible actions',
    icon: 'heroicons:trash',
    iconColor: 'danger',
  },
  render: (args) => ({
    components: { FormSection, Button },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <p class="text-gray-600 mb-4">Once you delete your account, there is no going back.</p>
        <Button variant="danger">Delete Account</Button>
      </FormSection>
    `,
  }),
}

export const NoBorder: Story = {
  args: {
    title: 'Simple Section',
    icon: 'heroicons:document',
    bordered: false,
  },
  render: (args) => ({
    components: { FormSection },
    setup: () => ({ args }),
    template: `
      <FormSection v-bind="args">
        <p class="text-gray-600">A section without border styling.</p>
      </FormSection>
    `,
  }),
}
