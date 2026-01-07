import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tabs from './Tabs.vue'
import TabPanel from './TabPanel.vue'

const meta: Meta<typeof Tabs> = {
  title: 'Core/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pills', 'boxed'],
    },
  },
  args: {
    variant: 'underline',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultTabs = [
  { key: 'account', label: 'Account' },
  { key: 'password', label: 'Password' },
  { key: 'notifications', label: 'Notifications' },
]

export const Underline: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'underline',
  },
  render: (args) => ({
    components: { Tabs, TabPanel },
    setup: () => ({ args }),
    template: `
      <Tabs v-bind="args" v-model="args.modelValue">
        <TabPanel value="account">
          <p class="text-gray-600 dark:text-gray-400">Account settings content goes here.</p>
        </TabPanel>
        <TabPanel value="password">
          <p class="text-gray-600 dark:text-gray-400">Password settings content goes here.</p>
        </TabPanel>
        <TabPanel value="notifications">
          <p class="text-gray-600 dark:text-gray-400">Notification preferences content goes here.</p>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="tabs" variant="underline" v-model="activeTab">
  <TabPanel value="account">
    <p>Account settings content goes here.</p>
  </TabPanel>
  <TabPanel value="password">
    <p>Password settings content goes here.</p>
  </TabPanel>
  <TabPanel value="notifications">
    <p>Notification preferences content goes here.</p>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}

export const Pills: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'pills',
  },
  render: (args) => ({
    components: { Tabs, TabPanel },
    setup: () => ({ args }),
    template: `
      <Tabs v-bind="args">
        <TabPanel value="account">
          <p class="text-gray-600 dark:text-gray-400">Account settings content.</p>
        </TabPanel>
        <TabPanel value="password">
          <p class="text-gray-600 dark:text-gray-400">Password settings content.</p>
        </TabPanel>
        <TabPanel value="notifications">
          <p class="text-gray-600 dark:text-gray-400">Notification preferences content.</p>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="tabs" variant="pills">
  <TabPanel value="account">
    <p>Account settings content.</p>
  </TabPanel>
  <TabPanel value="password">
    <p>Password settings content.</p>
  </TabPanel>
  <TabPanel value="notifications">
    <p>Notification preferences content.</p>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}

export const Boxed: Story = {
  args: {
    tabs: defaultTabs,
    variant: 'boxed',
  },
  render: (args) => ({
    components: { Tabs, TabPanel },
    setup: () => ({ args }),
    template: `
      <Tabs v-bind="args">
        <TabPanel value="account">
          <p class="text-gray-600 dark:text-gray-400">Account settings content.</p>
        </TabPanel>
        <TabPanel value="password">
          <p class="text-gray-600 dark:text-gray-400">Password settings content.</p>
        </TabPanel>
        <TabPanel value="notifications">
          <p class="text-gray-600 dark:text-gray-400">Notification preferences content.</p>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="tabs" variant="boxed">
  <TabPanel value="account">
    <p>Account settings content.</p>
  </TabPanel>
  <TabPanel value="password">
    <p>Password settings content.</p>
  </TabPanel>
  <TabPanel value="notifications">
    <p>Notification preferences content.</p>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { key: 'active', label: 'Active Tab' },
      { key: 'disabled', label: 'Disabled Tab', disabled: true },
      { key: 'another', label: 'Another Tab' },
    ],
    variant: 'underline',
  },
  render: (args) => ({
    components: { Tabs, TabPanel },
    setup: () => ({ args }),
    template: `
      <Tabs v-bind="args">
        <TabPanel value="active">
          <p class="text-gray-600 dark:text-gray-400">Active tab content.</p>
        </TabPanel>
        <TabPanel value="disabled">
          <p class="text-gray-600 dark:text-gray-400">This tab is disabled.</p>
        </TabPanel>
        <TabPanel value="another">
          <p class="text-gray-600 dark:text-gray-400">Another tab content.</p>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="[
  { key: 'active', label: 'Active Tab' },
  { key: 'disabled', label: 'Disabled Tab', disabled: true },
  { key: 'another', label: 'Another Tab' },
]" variant="underline">
  <TabPanel value="active">
    <p>Active tab content.</p>
  </TabPanel>
  <TabPanel value="disabled">
    <p>This tab is disabled.</p>
  </TabPanel>
  <TabPanel value="another">
    <p>Another tab content.</p>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup: () => ({
      tabs: defaultTabs,
    }),
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="mb-4 font-semibold text-gray-800 dark:text-gray-200">Underline</h3>
          <Tabs :tabs="tabs" variant="underline">
            <TabPanel value="account"><p class="text-gray-600 dark:text-gray-400">Content</p></TabPanel>
          </Tabs>
        </div>
        <div>
          <h3 class="mb-4 font-semibold text-gray-800 dark:text-gray-200">Pills</h3>
          <Tabs :tabs="tabs" variant="pills">
            <TabPanel value="account"><p class="text-gray-600 dark:text-gray-400">Content</p></TabPanel>
          </Tabs>
        </div>
        <div>
          <h3 class="mb-4 font-semibold text-gray-800 dark:text-gray-200">Boxed</h3>
          <Tabs :tabs="tabs" variant="boxed">
            <TabPanel value="account"><p class="text-gray-600 dark:text-gray-400">Content</p></TabPanel>
          </Tabs>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Underline variant -->
<Tabs :tabs="tabs" variant="underline">
  <TabPanel value="account"><p>Content</p></TabPanel>
</Tabs>

<!-- Pills variant -->
<Tabs :tabs="tabs" variant="pills">
  <TabPanel value="account"><p>Content</p></TabPanel>
</Tabs>

<!-- Boxed variant -->
<Tabs :tabs="tabs" variant="boxed">
  <TabPanel value="account"><p>Content</p></TabPanel>
</Tabs>`,
      },
    },
  },
}
