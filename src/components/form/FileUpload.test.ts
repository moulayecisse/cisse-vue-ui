import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FileUpload from './FileUpload.vue'

describe('FileUpload', () => {
  it('renders dropzone', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.find('.border-dashed').exists()).toBe(true)
  })

  it('renders default label', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.text()).toContain('Drop files here or click to upload')
  })

  it('renders custom label', () => {
    const wrapper = mount(FileUpload, {
      props: { label: 'Custom upload label' },
    })
    expect(wrapper.text()).toContain('Custom upload label')
  })

  it('renders description when provided', () => {
    const wrapper = mount(FileUpload, {
      props: { description: 'Only PNG and JPG files' },
    })
    expect(wrapper.text()).toContain('Only PNG and JPG files')
  })

  it('shows max size when provided', () => {
    const wrapper = mount(FileUpload, {
      props: { maxSize: 5242880 }, // 5MB
    })
    expect(wrapper.text()).toContain('Max size: 5 MB')
  })

  it('has hidden file input', () => {
    const wrapper = mount(FileUpload)
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    expect(input.classes()).toContain('hidden')
  })

  it('sets accept attribute on input', () => {
    const wrapper = mount(FileUpload, {
      props: { accept: 'image/*,.pdf' },
    })
    expect(wrapper.find('input').attributes('accept')).toBe('image/*,.pdf')
  })

  it('sets multiple attribute when multiple is true', () => {
    const wrapper = mount(FileUpload, {
      props: { multiple: true },
    })
    expect(wrapper.find('input').attributes('multiple')).toBeDefined()
  })

  it('does not set multiple attribute when multiple is false', () => {
    const wrapper = mount(FileUpload, {
      props: { multiple: false },
    })
    expect(wrapper.find('input').attributes('multiple')).toBeUndefined()
  })

  it('disables input when disabled', () => {
    const wrapper = mount(FileUpload, {
      props: { disabled: true },
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies disabled styling', () => {
    const wrapper = mount(FileUpload, {
      props: { disabled: true },
    })
    expect(wrapper.find('.border-dashed').classes()).toContain('cursor-not-allowed')
  })

  it('renders upload icon', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.find('.size-12').exists()).toBe(true)
  })

  it('does not show file list initially', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  describe('drag events', () => {
    it('handles dragover event', async () => {
      const wrapper = mount(FileUpload)
      await wrapper.find('.border-dashed').trigger('dragover')
      // Should not throw error
      expect(wrapper.exists()).toBe(true)
    })

    it('handles dragleave event', async () => {
      const wrapper = mount(FileUpload)
      await wrapper.find('.border-dashed').trigger('dragleave')
      expect(wrapper.exists()).toBe(true)
    })
  })

  describe('file size formatting', () => {
    it('shows bytes correctly', () => {
      const wrapper = mount(FileUpload, {
        props: { maxSize: 500 },
      })
      expect(wrapper.text()).toContain('500 B')
    })

    it('shows KB correctly', () => {
      const wrapper = mount(FileUpload, {
        props: { maxSize: 1024 },
      })
      expect(wrapper.text()).toContain('1 KB')
    })

    it('shows MB correctly', () => {
      const wrapper = mount(FileUpload, {
        props: { maxSize: 1048576 },
      })
      expect(wrapper.text()).toContain('1 MB')
    })
  })
})
