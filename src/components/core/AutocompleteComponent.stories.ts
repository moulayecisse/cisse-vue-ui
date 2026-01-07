import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AutocompleteComponent from './AutocompleteComponent.vue'

const meta: Meta<typeof AutocompleteComponent> = {
  title: 'Core/AutocompleteComponent',
  component: AutocompleteComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const countryOptions = [
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
]

const userOptions = [
  { value: 'user-1', label: 'John Doe' },
  { value: 'user-2', label: 'Jane Smith' },
  { value: 'user-3', label: 'Bob Wilson' },
  { value: 'user-4', label: 'Alice Brown' },
  { value: 'user-5', label: 'Charlie Davis' },
]

export const Default: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>(null)
      return { value, options: countryOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          placeholder="Search countries..."
        />
        <p class="mt-2 text-sm text-gray-500">Selected: {{ value || 'None' }}</p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
  v-model="value"
  :options="options"
  placeholder="Search countries..."
/>`,
      },
    },
  },
}

export const WithLabel: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>(null)
      return { value, options: countryOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          label="Country"
          placeholder="Select a country..."
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
  v-model="value"
  :options="options"
  label="Country"
  placeholder="Select a country..."
/>`,
      },
    },
  },
}

export const WithPreselectedValue: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>('fr')
      return { value, options: countryOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          label="Country"
          placeholder="Select a country..."
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `AutocompleteComponent
          v-model="value"
          :options="options"
          label="Country"
          placeholder="Select a country..."
        />`,
      },
    },
  },
}

export const WithError: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>(null)
      return { value, options: countryOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          label="Country"
          placeholder="Select a country..."
          error="Please select a country"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
  v-model="value"
  :options="options"
  label="Country"
  placeholder="Select a country..."
  error="Please select a country"
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>('fr')
      return { value, options: countryOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          label="Country"
          placeholder="Select a country..."
          disabled
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
  v-model="value"
  :options="options"
  label="Country"
  placeholder="Select a country..."
  disabled
/>`,
      },
    },
  },
}

export const UserSearch: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>(null)
      return { value, options: userOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          label="Assign to"
          placeholder="Search users..."
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
          v-model="value"
          :options="options"
          label="Assign to"
          placeholder="Search users..."
        />`,
      },
    },
  },
}

export const ManyOptions: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>(null)
      const options = Array.from({ length: 50 }, (_, i) => ({
        value: `item-${i + 1}`,
        label: `Item ${i + 1}`,
      }))
      return { value, options }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          label="Select Item"
          placeholder="Search items..."
        />
        <p class="mt-2 text-xs text-gray-400">50 options available</p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
          v-model="value"
          :options="options"
          label="Select Item"
          placeholder="Search items..."
        />`,
      },
    },
  },
}

export const CustomNoResults: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const value = ref<string | null>(null)
      return { value, options: countryOptions }
    },
    template: `
      <div class="max-w-sm">
        <AutocompleteComponent
          v-model="value"
          :options="options"
          placeholder="Search countries..."
          no-results-text="No countries match your search"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<AutocompleteComponent
          v-model="value"
          :options="options"
          placeholder="Search countries..."
          no-results-text="No countries match your search"
        />`,
      },
    },
  },
}

export const InForm: Story = {
  render: () => ({
    components: { AutocompleteComponent },
    setup: () => {
      const country = ref<string | null>(null)
      const user = ref<string | null>(null)
      return { country, user, countryOptions, userOptions }
    },
    template: `
      <div class="max-w-md space-y-4">
        <AutocompleteComponent
          v-model="country"
          :options="countryOptions"
          label="Country"
          placeholder="Select your country..."
        />
        <AutocompleteComponent
          v-model="user"
          :options="userOptions"
          label="Account Manager"
          placeholder="Select account manager..."
        />
        <div class="pt-4 text-sm text-gray-600">
          <p>Country: {{ country || 'Not selected' }}</p>
          <p>Manager: {{ user || 'Not selected' }}</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<div class="max-w-md space-y-4">
        <AutocompleteComponent
          v-model="country"
          :options="countryOptions"
          label="Country"
          placeholder="Select your country..."
        />
        <AutocompleteComponent
          v-model="user"
          :options="userOptions"
          label="Account Manager"
          placeholder="Select account manager..."
        />
        <div class="pt-4 text-sm text-gray-600">
          <p>Country: {{ country || 'Not selected' }}</p>
          <p>Manager: {{ user || 'Not selected' }}</p>
        </div>
      </div>`,
      },
    },
  },
}
