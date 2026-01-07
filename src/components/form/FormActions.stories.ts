import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FormActions from './FormActions.vue'

const meta: Meta<typeof FormActions> = {
  title: 'Form/FormActions',
  component: FormActions,
  tags: ['autodocs'],
  argTypes: {
    submitLabel: { control: 'text' },
    cancelLabel: { control: 'text' },
    submitIcon: { control: 'text' },
    cancelIcon: { control: 'text' },
    loading: { control: 'boolean' },
    loadingLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    showCancel: { control: 'boolean' },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'stretch'],
    },
    stackOnMobile: { control: 'boolean' },
    submitVariant: {
      control: 'select',
      options: ['primary', 'success', 'danger'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    submitLabel: 'Save',
    cancelLabel: 'Cancel',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save" cancel-label="Cancel" />`,
      },
    },
  },
}

export const Loading: Story = {
  args: {
    submitLabel: 'Save',
    loading: true,
    loadingLabel: 'Saving...',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save" :loading="true" loading-label="Saving..." />`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    submitLabel: 'Save',
    disabled: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save" disabled />`,
      },
    },
  },
}

export const CustomIcons: Story = {
  args: {
    submitLabel: 'Send',
    cancelLabel: 'Discard',
    submitIcon: 'heroicons:paper-airplane',
    cancelIcon: 'heroicons:trash',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions
  submit-label="Send"
  cancel-label="Discard"
  submit-icon="heroicons:paper-airplane"
  cancel-icon="heroicons:trash"
/>`,
      },
    },
  },
}

export const NoCancel: Story = {
  args: {
    submitLabel: 'Continue',
    showCancel: false,
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Continue" :show-cancel="false" />`,
      },
    },
  },
}

export const AlignLeft: Story = {
  args: {
    submitLabel: 'Save',
    align: 'left',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save" align="left" />`,
      },
    },
  },
}

export const AlignCenter: Story = {
  args: {
    submitLabel: 'Save',
    align: 'center',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save" align="center" />`,
      },
    },
  },
}

export const Stretch: Story = {
  args: {
    submitLabel: 'Save',
    align: 'stretch',
  },
  decorators: [
    () => ({
      template: '<div class="max-w-md"><story /></div>',
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save" align="stretch" />`,
      },
    },
  },
}

export const StackedOnMobile: Story = {
  args: {
    submitLabel: 'Save Changes',
    cancelLabel: 'Discard',
    stackOnMobile: true,
  },
  decorators: [
    () => ({
      template: '<div class="max-w-xs"><story /></div>',
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: `<FormActions submit-label="Save Changes" cancel-label="Discard" stack-on-mobile />`,
      },
    },
  },
}

export const SuccessVariant: Story = {
  args: {
    submitLabel: 'Confirm',
    submitIcon: 'heroicons:check-circle',
    submitVariant: 'success',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions
  submit-label="Confirm"
  submit-icon="heroicons:check-circle"
  submit-variant="success"
/>`,
      },
    },
  },
}

export const DangerVariant: Story = {
  args: {
    submitLabel: 'Delete',
    submitIcon: 'heroicons:trash',
    submitVariant: 'danger',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions
  submit-label="Delete"
  submit-icon="heroicons:trash"
  submit-variant="danger"
/>`,
      },
    },
  },
}

export const WithEvents: Story = {
  render: () => ({
    components: { FormActions },
    setup() {
      const message = ref('')
      const loading = ref(false)

      const handleSubmit = async () => {
        loading.value = true
        await new Promise(resolve => setTimeout(resolve, 1500))
        message.value = 'Form submitted!'
        loading.value = false
      }

      const handleCancel = () => {
        message.value = 'Cancelled'
      }

      return { message, loading, handleSubmit, handleCancel }
    },
    template: `
      <div>
        <FormActions
          submit-label="Submit"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
        <p v-if="message" class="mt-4 text-sm text-gray-600">{{ message }}</p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<FormActions
  submit-label="Submit"
  :loading="loading"
  @submit="handleSubmit"
  @cancel="handleCancel"
/>`,
      },
    },
  },
}

export const FrenchLabels: Story = {
  args: {
    submitLabel: 'Enregistrer',
    cancelLabel: 'Annuler',
    loadingLabel: 'Enregistrement...',
  },
  parameters: {
    docs: {
      source: {
        code: `<FormActions
  submit-label="Enregistrer"
  cancel-label="Annuler"
  loading-label="Enregistrement..."
/>`,
      },
    },
  },
}
