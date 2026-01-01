import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import InputWrapper from './InputWrapper.vue'

const meta: Meta<typeof InputWrapper> = {
  title: 'Form/InputWrapper',
  component: InputWrapper,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },
    iconRight: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    wrapperClass: { control: 'text' },
  },
  args: {
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Enter text..." />
      </InputWrapper>
    `,
  }),
}

export const WithLeftIcon: Story = {
  args: {
    icon: 'lucide:search',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Search..." />
      </InputWrapper>
    `,
  }),
}

export const WithRightIcon: Story = {
  args: {
    iconRight: 'lucide:chevron-down',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Select option..." />
      </InputWrapper>
    `,
  }),
}

export const WithBothIcons: Story = {
  args: {
    icon: 'lucide:mail',
    iconRight: 'lucide:check',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('validated@email.com')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" type="email" />
      </InputWrapper>
    `,
  }),
}

export const WithClearButton: Story = {
  args: {
    icon: 'lucide:search',
  },
  render: (args) => ({
    components: { InputWrapper, Icon },
    setup: () => {
      const value = ref('Some text to clear')
      const clear = () => { value.value = '' }
      return { args, value, clear }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input v-model="value" :class="inputClass" placeholder="Search..." />
        <template #actions>
          <button
            v-if="value"
            @click="clear"
            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
          >
            <Icon icon="lucide:x" class="size-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
        </template>
      </InputWrapper>
    `,
  }),
}

export const PasswordToggle: Story = {
  args: {
    icon: 'lucide:lock',
  },
  render: (args) => ({
    components: { InputWrapper, Icon },
    setup: () => {
      const password = ref('mysecretpassword')
      const showPassword = ref(false)
      const toggle = () => { showPassword.value = !showPassword.value }
      return { args, password, showPassword, toggle }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :class="inputClass"
          placeholder="Enter password..."
        />
        <template #actions>
          <button
            @click="toggle"
            class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors"
            type="button"
          >
            <Icon
              :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
              class="size-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            />
          </button>
        </template>
      </InputWrapper>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { InputWrapper },
    setup: () => {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Small</label>
          <InputWrapper icon="lucide:search" size="sm" v-slot="{ inputClass }">
            <input v-model="small" :class="inputClass" placeholder="Small input..." />
          </InputWrapper>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Medium (default)</label>
          <InputWrapper icon="lucide:search" size="md" v-slot="{ inputClass }">
            <input v-model="medium" :class="inputClass" placeholder="Medium input..." />
          </InputWrapper>
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Large</label>
          <InputWrapper icon="lucide:search" size="lg" v-slot="{ inputClass }">
            <input v-model="large" :class="inputClass" placeholder="Large input..." />
          </InputWrapper>
        </div>
      </div>
    `,
  }),
}

export const InvalidState: Story = {
  args: {
    icon: 'lucide:mail',
    invalid: true,
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: `
      <div>
        <InputWrapper v-bind="args" v-slot="{ inputClass }">
          <input v-model="value" :class="inputClass" type="email" placeholder="Enter email..." />
        </InputWrapper>
        <p class="mt-1 text-sm text-red-500">Please enter a valid email address</p>
      </div>
    `,
  }),
}

export const CustomIconSlot: Story = {
  render: () => ({
    components: { InputWrapper, Icon },
    setup: () => {
      const value = ref('')
      return { value }
    },
    template: `
      <InputWrapper v-slot="{ inputClass }">
        <template #icon>
          <div class="flex items-center gap-1">
            <Icon icon="lucide:dollar-sign" class="size-4 text-emerald-500" />
          </div>
        </template>
        <input v-model="value" :class="inputClass" placeholder="0.00" type="number" step="0.01" />
      </InputWrapper>
    `,
  }),
}

export const WithTextarea: Story = {
  args: {
    icon: 'lucide:message-square',
  },
  render: (args) => ({
    components: { InputWrapper },
    setup: () => {
      const value = ref('')
      return { args, value }
    },
    template: `
      <InputWrapper v-bind="args" v-slot="{ inputClass }">
        <textarea
          v-model="value"
          :class="[inputClass, 'resize-none min-h-24']"
          placeholder="Enter your message..."
          rows="4"
        />
      </InputWrapper>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { InputWrapper, Icon },
    setup: () => {
      const search = ref('')
      const email = ref('user@example.com')
      const password = ref('secret')
      const showPassword = ref(false)
      const amount = ref('1234.56')
      return { search, email, password, showPassword, amount }
    },
    template: `
      <div class="space-y-4 max-w-md">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Search with clear</label>
          <InputWrapper icon="lucide:search" v-slot="{ inputClass }">
            <input v-model="search" :class="inputClass" placeholder="Search..." />
            <template #actions>
              <button v-if="search" @click="search = ''" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600">
                <Icon icon="lucide:x" class="size-4 text-gray-400" />
              </button>
            </template>
          </InputWrapper>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email validated</label>
          <InputWrapper icon="lucide:mail" iconRight="lucide:check-circle" v-slot="{ inputClass }">
            <input v-model="email" :class="inputClass" type="email" />
          </InputWrapper>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password with toggle</label>
          <InputWrapper icon="lucide:lock" v-slot="{ inputClass }">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" :class="inputClass" />
            <template #actions>
              <button @click="showPassword = !showPassword" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-600">
                <Icon :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'" class="size-5 text-gray-400" />
              </button>
            </template>
          </InputWrapper>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Currency input</label>
          <InputWrapper v-slot="{ inputClass }">
            <template #icon>
              <Icon icon="lucide:dollar-sign" class="size-5 text-emerald-500" />
            </template>
            <input v-model="amount" :class="inputClass" type="text" />
          </InputWrapper>
        </div>
      </div>
    `,
  }),
}
