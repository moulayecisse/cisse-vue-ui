import type { Meta, StoryObj } from '@storybook/vue3'
import FileUpload from './FileUpload.vue'

const meta: Meta<typeof FileUpload> = {
  title: 'Form/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<FileUpload />`,
      },
    },
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Upload your documents',
    description: 'PDF, DOC, or DOCX files up to 10MB',
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUpload
  label="Upload your documents"
  description="PDF, DOC, or DOCX files up to 10MB"
/>`,
      },
    },
  },
}

export const ImagesOnly: Story = {
  args: {
    label: 'Upload images',
    description: 'PNG, JPG, GIF up to 5MB',
    accept: 'image/*',
    maxSize: 5242880,
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUpload
  label="Upload images"
  description="PNG, JPG, GIF up to 5MB"
  accept="image/*"
  :max-size="5242880"
/>`,
      },
    },
  },
}

export const MultipleFiles: Story = {
  args: {
    label: 'Upload multiple files',
    multiple: true,
    maxFiles: 5,
    description: 'You can upload up to 5 files',
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUpload
  label="Upload multiple files"
  multiple
  :max-files="5"
  description="You can upload up to 5 files"
/>`,
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Upload disabled',
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUpload label="Upload disabled" disabled />`,
      },
    },
  },
}

export const WithMaxSize: Story = {
  args: {
    maxSize: 2097152, // 2MB
    description: 'Maximum file size is 2MB',
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUpload :max-size="2097152" description="Maximum file size is 2MB" />`,
      },
    },
  },
}

export const PDFOnly: Story = {
  args: {
    label: 'Upload PDF documents',
    accept: '.pdf',
    description: 'Only PDF files are accepted',
  },
  parameters: {
    docs: {
      source: {
        code: `<FileUpload
  label="Upload PDF documents"
  accept=".pdf"
  description="Only PDF files are accepted"
/>`,
      },
    },
  },
}
