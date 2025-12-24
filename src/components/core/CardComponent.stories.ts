import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CardComponent from './CardComponent.vue'
import Button from './Button.vue'

const meta: Meta<typeof CardComponent> = {
  title: 'Core/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CardComponent },
    template: `
      <CardComponent>
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">This is a basic card with some content inside.</p>
        </div>
      </CardComponent>
    `,
  }),
}

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
  },
  render: (args) => ({
    components: { CardComponent },
    setup: () => ({ args }),
    template: `
      <CardComponent v-bind="args">
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Card content goes here.</p>
        </div>
      </CardComponent>
    `,
  }),
}

export const WithTitleAndDescription: Story = {
  args: {
    title: 'Card Title',
    description: 'A brief description of what this card contains',
  },
  render: (args) => ({
    components: { CardComponent },
    setup: () => ({ args }),
    template: `
      <CardComponent v-bind="args">
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Card content goes here.</p>
        </div>
      </CardComponent>
    `,
  }),
}

export const WithActions: Story = {
  args: {
    title: 'User Settings',
    description: 'Manage your account preferences',
  },
  render: (args) => ({
    components: { CardComponent, Button },
    setup: () => ({ args }),
    template: `
      <CardComponent v-bind="args">
        <template #actions>
          <Button size="sm" variant="outline">Cancel</Button>
          <Button size="sm">Save</Button>
        </template>
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Configure your settings here.</p>
        </div>
      </CardComponent>
    `,
  }),
}

export const CustomSlots: Story = {
  render: () => ({
    components: { CardComponent, Button },
    template: `
      <CardComponent>
        <template #title>
          <span class="text-primary">Custom Title Slot</span>
        </template>
        <template #description>
          <span class="italic">Custom description with styling</span>
        </template>
        <template #actions>
          <Button size="sm" icon="lucide:edit">Edit</Button>
        </template>
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Card with custom slot content.</p>
        </div>
      </CardComponent>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { CardComponent },
    template: '<CardComponent loading />',
  }),
}

export const LoadingWithAvatar: Story = {
  render: () => ({
    components: { CardComponent },
    template: '<CardComponent loading loading-avatar />',
  }),
}

export const LoadingWithActions: Story = {
  render: () => ({
    components: { CardComponent },
    template: '<CardComponent loading loading-avatar loading-actions :loading-lines="4" />',
  }),
}
