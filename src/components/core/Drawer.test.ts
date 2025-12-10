import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Drawer from './Drawer.vue'

describe('Drawer', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  afterEach(() => {
    document.body.style.overflow = ''
  })

  it('renders when modelValue is true', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true },
      attachTo: document.body,
    })

    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy()
    wrapper.unmount()
  })

  it('does not render when modelValue is false', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: false },
      attachTo: document.body,
    })

    expect(document.body.querySelector('[role="dialog"]')).toBeFalsy()
    wrapper.unmount()
  })

  it('renders title in header', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true, title: 'Test Title' },
      attachTo: document.body,
    })

    expect(document.body.textContent).toContain('Test Title')
    wrapper.unmount()
  })

  it('renders slot content', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true },
      slots: { default: '<div class="test-content">Content</div>' },
      attachTo: document.body,
    })

    expect(document.body.querySelector('.test-content')).toBeTruthy()
    wrapper.unmount()
  })

  it('renders footer slot', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true },
      slots: { footer: '<button class="footer-btn">Save</button>' },
      attachTo: document.body,
    })

    expect(document.body.querySelector('.footer-btn')).toBeTruthy()
    wrapper.unmount()
  })

  it('emits update:modelValue when close button clicked', async () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true, showClose: true },
      attachTo: document.body,
    })

    const closeButton = document.body.querySelector('button')
    closeButton?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
    wrapper.unmount()
  })

  it('closes on overlay click when closeOnOverlay is true', async () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true, closeOnOverlay: true },
      attachTo: document.body,
    })

    const overlay = document.body.querySelector('.bg-black\\/50')
    ;(overlay as HTMLElement)?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    wrapper.unmount()
  })

  it('does not close on overlay click when closeOnOverlay is false', async () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true, closeOnOverlay: false },
      attachTo: document.body,
    })

    const overlay = document.body.querySelector('.bg-black\\/50')
    ;(overlay as HTMLElement)?.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    wrapper.unmount()
  })

  it('hides close button when showClose is false', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true, showClose: false, title: 'Test' },
      attachTo: document.body,
    })

    const buttons = document.body.querySelectorAll('button')
    expect(buttons.length).toBe(0)
    wrapper.unmount()
  })

  describe('positions', () => {
    it('renders on right by default', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('right-0')
      wrapper.unmount()
    })

    it('renders on left when position is left', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true, position: 'left' },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('left-0')
      wrapper.unmount()
    })

    it('renders on top when position is top', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true, position: 'top' },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('top-0')
      wrapper.unmount()
    })

    it('renders on bottom when position is bottom', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true, position: 'bottom' },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('bottom-0')
      wrapper.unmount()
    })
  })

  describe('sizes', () => {
    it('applies sm size class', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true, size: 'sm' },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('w-64')
      wrapper.unmount()
    })

    it('applies md size class by default', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('w-80')
      wrapper.unmount()
    })

    it('applies lg size class', () => {
      const wrapper = mount(Drawer, {
        props: { modelValue: true, size: 'lg' },
        attachTo: document.body,
      })

      const drawer = document.body.querySelector('[role="dialog"]')
      expect(drawer?.className).toContain('w-96')
      wrapper.unmount()
    })
  })

  it('hides overlay when overlay is false', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true, overlay: false },
      attachTo: document.body,
    })

    const overlay = document.body.querySelector('.bg-black\\/50')
    expect(overlay).toBeFalsy()
    wrapper.unmount()
  })
})
