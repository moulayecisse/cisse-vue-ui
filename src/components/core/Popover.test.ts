import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Popover from './Popover.vue'

describe('Popover', () => {
  it('renders trigger slot', () => {
    const wrapper = mount(Popover, {
      slots: {
        trigger: '<button class="trigger-btn">Open</button>',
      },
    })

    expect(wrapper.find('.trigger-btn').exists()).toBe(true)
  })

  it('opens on click by default', async () => {
    const wrapper = mount(Popover, {
      slots: {
        trigger: '<button>Open</button>',
        default: '<div class="popover-content">Content</div>',
      },
      attachTo: document.body,
    })

    await wrapper.find('.relative > div').trigger('click')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Content')

    wrapper.unmount()
  })

  it('closes on second click', async () => {
    const wrapper = mount(Popover, {
      slots: {
        trigger: '<button>Open</button>',
        default: '<div class="popover-content">Content</div>',
      },
      attachTo: document.body,
    })

    // Open
    await wrapper.find('.relative > div').trigger('click')
    await wrapper.vm.$nextTick()
    expect(document.body.textContent).toContain('Content')

    // Close
    await wrapper.find('.relative > div').trigger('click')
    await wrapper.vm.$nextTick()

    // Content should be removed
    const content = document.body.querySelector('.popover-content')
    expect(content).toBeFalsy()

    wrapper.unmount()
  })

  it('opens on hover when hover prop is true', async () => {
    const wrapper = mount(Popover, {
      props: { hover: true },
      slots: {
        trigger: '<button>Hover me</button>',
        default: '<div class="popover-content">Content</div>',
      },
      attachTo: document.body,
    })

    await wrapper.find('.relative').trigger('mouseenter')
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Content')

    wrapper.unmount()
  })

  it('closes on mouseleave when hover prop is true', async () => {
    const wrapper = mount(Popover, {
      props: { hover: true },
      slots: {
        trigger: '<button>Hover me</button>',
        default: '<div class="popover-content">Content</div>',
      },
      attachTo: document.body,
    })

    // Open
    await wrapper.find('.relative').trigger('mouseenter')
    await wrapper.vm.$nextTick()
    expect(document.body.textContent).toContain('Content')

    // Close
    await wrapper.find('.relative').trigger('mouseleave')
    await wrapper.vm.$nextTick()

    const content = document.body.querySelector('.popover-content')
    expect(content).toBeFalsy()

    wrapper.unmount()
  })

  it('does not open on click when hover is true', async () => {
    const wrapper = mount(Popover, {
      props: { hover: true },
      slots: {
        trigger: '<button>Hover me</button>',
        default: '<div class="popover-content">Content</div>',
      },
      attachTo: document.body,
    })

    await wrapper.find('.relative > div').trigger('click')
    await wrapper.vm.$nextTick()

    const content = document.body.querySelector('.popover-content')
    expect(content).toBeFalsy()

    wrapper.unmount()
  })

  describe('width options', () => {
    it('applies auto width by default', async () => {
      const wrapper = mount(Popover, {
        slots: {
          trigger: '<button>Open</button>',
          default: 'Content',
        },
        attachTo: document.body,
      })

      await wrapper.find('.relative > div').trigger('click')
      await wrapper.vm.$nextTick()

      const popover = document.body.querySelector('[class*="z-9999"]')
      expect(popover?.classList.contains('min-w-48')).toBe(true)

      wrapper.unmount()
    })

    it('applies sm width', async () => {
      const wrapper = mount(Popover, {
        props: { width: 'sm' },
        slots: {
          trigger: '<button>Open</button>',
          default: 'Content',
        },
        attachTo: document.body,
      })

      await wrapper.find('.relative > div').trigger('click')
      await wrapper.vm.$nextTick()

      const popover = document.body.querySelector('[class*="z-9999"]')
      expect(popover?.classList.contains('w-48')).toBe(true)

      wrapper.unmount()
    })

    it('applies md width', async () => {
      const wrapper = mount(Popover, {
        props: { width: 'md' },
        slots: {
          trigger: '<button>Open</button>',
          default: 'Content',
        },
        attachTo: document.body,
      })

      await wrapper.find('.relative > div').trigger('click')
      await wrapper.vm.$nextTick()

      const popover = document.body.querySelector('[class*="z-9999"]')
      expect(popover?.classList.contains('w-64')).toBe(true)

      wrapper.unmount()
    })

    it('applies lg width', async () => {
      const wrapper = mount(Popover, {
        props: { width: 'lg' },
        slots: {
          trigger: '<button>Open</button>',
          default: 'Content',
        },
        attachTo: document.body,
      })

      await wrapper.find('.relative > div').trigger('click')
      await wrapper.vm.$nextTick()

      const popover = document.body.querySelector('[class*="z-9999"]')
      expect(popover?.classList.contains('w-80')).toBe(true)

      wrapper.unmount()
    })
  })

  it('provides close function to default slot', async () => {
    const wrapper = mount(Popover, {
      slots: {
        trigger: '<button>Open</button>',
        default: `<template #default="{ close }">
          <button class="close-btn" @click="close">Close</button>
        </template>`,
      },
      attachTo: document.body,
    })

    await wrapper.find('.relative > div').trigger('click')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('.close-btn')).toBeTruthy()

    wrapper.unmount()
  })
})
