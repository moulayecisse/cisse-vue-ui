import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

const meta: Meta<typeof Accordion> = {
  title: 'Core/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args">
        <AccordionItem item-key="1" title="What is Vue.js?">
          Vue.js is a progressive JavaScript framework for building user interfaces.
          It is designed to be incrementally adoptable and focuses on the view layer.
        </AccordionItem>
        <AccordionItem item-key="2" title="How do I get started?">
          You can get started by installing Vue via npm or including it via CDN.
          The official documentation provides excellent guides and tutorials.
        </AccordionItem>
        <AccordionItem item-key="3" title="What about TypeScript support?">
          Vue 3 has first-class TypeScript support built-in. You can use TypeScript
          with the Composition API for excellent type inference.
        </AccordionItem>
      </Accordion>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Accordion>
  <AccordionItem item-key="1" title="What is Vue.js?">
    Vue.js is a progressive JavaScript framework for building user interfaces.
  </AccordionItem>
  <AccordionItem item-key="2" title="How do I get started?">
    You can get started by installing Vue via npm or including it via CDN.
  </AccordionItem>
  <AccordionItem item-key="3" title="What about TypeScript support?">
    Vue 3 has first-class TypeScript support built-in.
  </AccordionItem>
</Accordion>`,
      },
    },
  },
}

export const MultipleMode: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args" mode="multiple">
        <AccordionItem item-key="1" title="Section 1">
          This accordion allows multiple sections to be open at once.
        </AccordionItem>
        <AccordionItem item-key="2" title="Section 2">
          Click on another section - this one stays open!
        </AccordionItem>
        <AccordionItem item-key="3" title="Section 3">
          All sections can be expanded simultaneously.
        </AccordionItem>
      </Accordion>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Accordion mode="multiple">
  <AccordionItem item-key="1" title="Section 1">
    This accordion allows multiple sections to be open at once.
  </AccordionItem>
  <AccordionItem item-key="2" title="Section 2">
    Click on another section - this one stays open!
  </AccordionItem>
</Accordion>`,
      },
    },
  },
}

export const WithDefaultOpen: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args" :default-open="['2']">
        <AccordionItem item-key="1" title="First Section">
          Content of first section.
        </AccordionItem>
        <AccordionItem item-key="2" title="Second Section (Open by default)">
          This section is open by default.
        </AccordionItem>
        <AccordionItem item-key="3" title="Third Section">
          Content of third section.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const WithIcons: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args">
        <AccordionItem item-key="1" title="Account Settings" icon="heroicons:user">
          Manage your account settings and preferences.
        </AccordionItem>
        <AccordionItem item-key="2" title="Notifications" icon="heroicons:bell">
          Configure your notification preferences.
        </AccordionItem>
        <AccordionItem item-key="3" title="Security" icon="heroicons:shield-check">
          Update your security settings and password.
        </AccordionItem>
      </Accordion>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Accordion>
  <AccordionItem item-key="1" title="Account Settings" icon="heroicons:user">
    Manage your account settings and preferences.
  </AccordionItem>
  <AccordionItem item-key="2" title="Notifications" icon="heroicons:bell">
    Configure your notification preferences.
  </AccordionItem>
</Accordion>`,
      },
    },
  },
}

export const WithDisabledItem: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args">
        <AccordionItem item-key="1" title="Available Section">
          This section can be opened.
        </AccordionItem>
        <AccordionItem item-key="2" title="Disabled Section" disabled>
          This content is not accessible.
        </AccordionItem>
        <AccordionItem item-key="3" title="Another Available Section">
          This section can also be opened.
        </AccordionItem>
      </Accordion>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Accordion>
        <AccordionItem item-key="1" title="Available Section">
          This section can be opened.
        </AccordionItem>
        <AccordionItem item-key="2" title="Disabled Section" disabled>
          This content is not accessible.
        </AccordionItem>
        <AccordionItem item-key="3" title="Another Available Section">
          This section can also be opened.
        </AccordionItem>
      </Accordion>`,
      },
    },
  },
}

export const FAQ: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `<div class="max-w-2xl">
        <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion v-bind="args">
          <AccordionItem item-key="1" title="How do I reset my password?">
            Click on the "Forgot Password" link on the login page. Enter your email address
            and we'll send you instructions to reset your password.
          </AccordionItem>
          <AccordionItem item-key="2" title="Can I change my subscription plan?">
            Yes, you can upgrade or downgrade your plan at any time from your account settings.
            Changes take effect at the start of your next billing cycle.
          </AccordionItem>
          <AccordionItem item-key="3" title="What payment methods do you accept?">
            We accept all major credit cards (Visa, MasterCard, American Express), PayPal,
            and bank transfers for annual plans.
          </AccordionItem>
          <AccordionItem item-key="4" title="How do I contact support?">
            You can reach our support team via email at support@example.com or through the
            live chat feature available on our website.
          </AccordionItem>
        </Accordion>
      </div>`,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="max-w-2xl">
        <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion v-bind="args">
          <AccordionItem item-key="1" title="How do I reset my password?">
            Click on the "Forgot Password" link on the login page. Enter your email address
            and we'll send you instructions to reset your password.
          </AccordionItem>
          <AccordionItem item-key="2" title="Can I change my subscription plan?">
            Yes, you can upgrade or downgrade your plan at any time from your account settings.
            Changes take effect at the start of your next billing cycle.
          </AccordionItem>
          <AccordionItem item-key="3" title="What payment methods do you accept?">
            We accept all major credit cards (Visa, MasterCard, American Express), PayPal,
            and bank transfers for annual plans.
          </AccordionItem>
          <AccordionItem item-key="4" title="How do I contact support?">
            You can reach our support team via email at support@example.com or through the
            live chat feature available on our website.
          </AccordionItem>
        </Accordion>
      </div>`,
      },
    },
  },
}
