import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDialog from './ConfirmDialog.vue'

describe('ConfirmDialog', () => {
  const defaultProps = {
    open: true,
    title: 'Confirm Action',
    message: 'Are you sure?',
    teleport: false as const,
  }

  it('renders when open', () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
    })
    expect(wrapper.text()).toContain('Confirm Action')
    expect(wrapper.text()).toContain('Are you sure?')
  })

  it('does not render when closed', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, open: false },
    })
    expect(wrapper.find('.fixed').exists()).toBe(false)
  })

  it('displays custom title and message', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        ...defaultProps,
        title: 'Delete Item',
        message: 'This cannot be undone.',
      },
    })
    expect(wrapper.text()).toContain('Delete Item')
    expect(wrapper.text()).toContain('This cannot be undone.')
  })

  it('displays custom button text', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        ...defaultProps,
        confirmText: 'Yes, delete',
        cancelText: 'No, keep',
      },
    })
    expect(wrapper.text()).toContain('Yes, delete')
    expect(wrapper.text()).toContain('No, keep')
  })

  it('emits confirm event when confirm button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
    })
    const confirmButton = wrapper.findAll('button').find((btn) => btn.text().includes('Confirm'))
    await confirmButton?.trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: defaultProps,
    })
    const cancelButton = wrapper.findAll('button').find((btn) => btn.text().includes('Cancel'))
    await cancelButton?.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('shows loading state on confirm button', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, loading: true },
    })
    const confirmButton = wrapper.findAll('button').find((btn) => btn.text().includes('Confirm'))
    expect(confirmButton?.attributes('disabled')).toBeDefined()
  })

  it('applies danger variant styles', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, variant: 'danger' },
    })
    expect(wrapper.html()).toContain('bg-red')
  })

  it('applies warning variant styles', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, variant: 'warning' },
    })
    expect(wrapper.html()).toContain('text-yellow')
  })

  it('applies success variant styles', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, variant: 'success' },
    })
    expect(wrapper.html()).toContain('bg-green')
  })

  it('applies info variant styles', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...defaultProps, variant: 'info' },
    })
    expect(wrapper.html()).toContain('text-blue')
  })
})
