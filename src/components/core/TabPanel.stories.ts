import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tabs from './Tabs.vue'
import TabPanel from './TabPanel.vue'

const meta: Meta<typeof TabPanel> = {
  title: 'Core/TabPanel',
  component: TabPanel,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
  },
  args: {
    value: 'panel1',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultTabs = [
  { key: 'panel1', label: 'Panel 1' },
  { key: 'panel2', label: 'Panel 2' },
  { key: 'panel3', label: 'Panel 3' },
]

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, TabPanel },
    setup() {
      return { args, tabs: defaultTabs }
    },
    template: `
      <Tabs :tabs="tabs">
        <TabPanel :value="args.value">
          <p class="text-gray-600 dark:text-gray-400">
            This is the content of the first tab panel. The panel is shown when its
            corresponding tab is active.
          </p>
        </TabPanel>
        <TabPanel value="panel2">
          <p class="text-gray-600 dark:text-gray-400">Content for panel 2.</p>
        </TabPanel>
        <TabPanel value="panel3">
          <p class="text-gray-600 dark:text-gray-400">Content for panel 3.</p>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="tabs">
  <TabPanel value="panel1">
    <p>This is the content of the first tab panel.</p>
  </TabPanel>
  <TabPanel value="panel2">
    <p>Content for panel 2.</p>
  </TabPanel>
  <TabPanel value="panel3">
    <p>Content for panel 3.</p>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}

export const WithRichContent: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      return {
        tabs: [
          { key: 'overview', label: 'Overview' },
          { key: 'details', label: 'Details' },
        ],
      }
    },
    template: `
      <Tabs :tabs="tabs">
        <TabPanel value="overview">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Overview</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Tab panels can contain any content including headings, paragraphs, lists, and more.
            </p>
            <ul class="list-disc pl-5 text-gray-600 dark:text-gray-400">
              <li>Item one</li>
              <li>Item two</li>
              <li>Item three</li>
            </ul>
          </div>
        </TabPanel>
        <TabPanel value="details">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Details</h3>
            <p class="text-gray-600 dark:text-gray-400">
              This panel shows detailed information when the Details tab is selected.
            </p>
          </div>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="tabs">
  <TabPanel value="overview">
    <div class="space-y-4">
      <h3>Overview</h3>
      <p>Tab panels can contain any content.</p>
      <ul class="list-disc pl-5">
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
      </ul>
    </div>
  </TabPanel>
  <TabPanel value="details">
    <div class="space-y-4">
      <h3>Details</h3>
      <p>Detailed information here.</p>
    </div>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}

export const WithForm: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      return {
        tabs: [
          { key: 'profile', label: 'Profile' },
          { key: 'settings', label: 'Settings' },
        ],
      }
    },
    template: `
      <Tabs :tabs="tabs">
        <TabPanel value="profile">
          <form class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="john@example.com" />
            </div>
          </form>
        </TabPanel>
        <TabPanel value="settings">
          <div class="space-y-4">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded" />
              <span class="text-gray-700 dark:text-gray-300">Enable notifications</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded" />
              <span class="text-gray-700 dark:text-gray-300">Dark mode</span>
            </label>
          </div>
        </TabPanel>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Tabs :tabs="tabs">
  <TabPanel value="profile">
    <form class="space-y-4">
      <div>
        <label>Name</label>
        <input type="text" placeholder="John Doe" />
      </div>
      <div>
        <label>Email</label>
        <input type="email" placeholder="john@example.com" />
      </div>
    </form>
  </TabPanel>
  <TabPanel value="settings">
    <div class="space-y-4">
      <label class="flex items-center gap-2">
        <input type="checkbox" />
        <span>Enable notifications</span>
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" />
        <span>Dark mode</span>
      </label>
    </div>
  </TabPanel>
</Tabs>`,
      },
    },
  },
}
