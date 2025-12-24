import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

const meta: Meta<typeof AccordionItem> = {
  title: 'Core/AccordionItem',
  component: AccordionItem,
  tags: ['autodocs'],
  argTypes: {
    itemKey: { control: 'text' },
    title: { control: 'text' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    itemKey: '1',
    title: 'Accordion Item Title',
  },
  decorators: [
    (story) => ({
      components: { story, Accordion },
      template: '<Accordion><story /></Accordion>',
    }),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion>
        <AccordionItem v-bind="args">
          This is the content of the accordion item. It can contain any content you want.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    icon: 'heroicons:information-circle',
    title: 'Item with Icon',
  },
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion>
        <AccordionItem v-bind="args">
          This accordion item has an icon displayed next to the title.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    title: 'Disabled Item',
  },
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion>
        <AccordionItem v-bind="args">
          This content cannot be accessed because the item is disabled.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const OpenByDefault: Story = {
  args: {
    itemKey: 'open-item',
    title: 'Open by Default',
  },
  render: (args) => ({
    components: { Accordion, AccordionItem },
    setup() {
      return { args }
    },
    template: `
      <Accordion :default-open="['open-item']">
        <AccordionItem v-bind="args">
          This accordion item is open by default.
        </AccordionItem>
      </Accordion>
    `,
  }),
}

export const MultipleItems: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion>
        <AccordionItem item-key="1" title="First Item" icon="heroicons:home">
          Content for the first accordion item.
        </AccordionItem>
        <AccordionItem item-key="2" title="Second Item" icon="heroicons:user">
          Content for the second accordion item.
        </AccordionItem>
        <AccordionItem item-key="3" title="Third Item (Disabled)" icon="heroicons:cog" disabled>
          This item is disabled and cannot be opened.
        </AccordionItem>
      </Accordion>
    `,
  }),
}
