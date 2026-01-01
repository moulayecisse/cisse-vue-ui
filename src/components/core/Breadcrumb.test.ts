import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Breadcrumb from './Breadcrumb.vue'

const mockItems = [
  { label: 'Home' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics' },
]

describe('Breadcrumb', () => {
  it('renders navigation element', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    expect(wrapper.find('nav').exists()).toBe(true)
  })

  it('has aria-label for accessibility', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
  })

  it('renders all items', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Electronics')
  })

  it('renders separators between items', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    // 3 items = 2 separators
    const separators = wrapper.findAll('.mx-2')
    expect(separators.length).toBe(2)
  })

  it('renders link for item with href', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.attributes('href')).toBe('/products')
  })

  it('renders span for last item', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    const items = wrapper.findAll('li')
    const lastItem = items[items.length - 1]
    expect(lastItem.find('span').exists()).toBe(true)
  })

  it('sets aria-current on last item', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    const items = wrapper.findAll('li')
    const lastItem = items[items.length - 1]
    expect(lastItem.find('[aria-current="page"]').exists()).toBe(true)
  })

  it('shows home icon on first item by default', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    const firstItem = wrapper.findAll('li')[0]
    expect(firstItem.find('.size-4').exists()).toBe(true)
  })

  it('hides home icon when showHomeIcon is false', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems, showHomeIcon: false },
    })
    const firstItem = wrapper.findAll('li')[0]
    // Only separator icons should exist, not home icon
    const icons = firstItem.findAll('.size-4')
    expect(icons.length).toBe(0)
  })

  it('emits click event when item clicked', async () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    const link = wrapper.find('a')
    await link.trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0][0]).toEqual({ label: 'Products', href: '/products' })
    expect(wrapper.emitted('click')![0][1]).toBe(1)
  })

  it('renders custom icon for item', () => {
    const itemsWithIcon = [
      { label: 'Dashboard', icon: 'heroicons:chart-bar' },
      { label: 'Settings' },
    ]
    const wrapper = mount(Breadcrumb, {
      props: { items: itemsWithIcon },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders with single item', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: [{ label: 'Home' }] },
    })
    expect(wrapper.text()).toContain('Home')
    // No separators for single item
    expect(wrapper.findAll('.mx-2').length).toBe(0)
  })

  it('applies different styling to last item', () => {
    const wrapper = mount(Breadcrumb, {
      props: { items: mockItems },
    })
    const items = wrapper.findAll('li')
    const lastItemContent = items[items.length - 1].find('span')
    expect(lastItemContent.classes()).toContain('font-medium')
  })
})
