import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AuthLayout from './AuthLayout.vue'

describe('AuthLayout', () => {
  it('renders the layout container', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'Test App',
      },
    })

    expect(wrapper.find('.min-h-screen').exists()).toBe(true)
  })

  it('renders app name in branding panel', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'My Application',
      },
    })

    expect(wrapper.text()).toContain('My Application')
  })

  it('renders headline and sub-headline', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        headline: 'Welcome to',
        subHeadline: 'Our Platform',
      },
    })

    expect(wrapper.text()).toContain('Welcome to')
    expect(wrapper.text()).toContain('Our Platform')
  })

  it('renders description text', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        description: 'This is a description',
      },
    })

    expect(wrapper.text()).toContain('This is a description')
  })

  it('renders features list', () => {
    const features = [
      { icon: 'lucide:check', text: 'Feature One' },
      { icon: 'lucide:check', text: 'Feature Two' },
    ]

    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        features,
      },
    })

    expect(wrapper.text()).toContain('Feature One')
    expect(wrapper.text()).toContain('Feature Two')
  })

  it('renders form title and subtitle', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        formTitle: 'Sign In',
        formSubtitle: 'Enter your credentials',
      },
    })

    expect(wrapper.text()).toContain('Sign In')
    expect(wrapper.text()).toContain('Enter your credentials')
  })

  it('renders default slot content (form)', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
      },
      slots: {
        default: '<form class="test-form">Form Content</form>',
      },
    })

    expect(wrapper.find('.test-form').exists()).toBe(true)
    expect(wrapper.text()).toContain('Form Content')
  })

  it('renders branding-logo slot', () => {
    const wrapper = mount(AuthLayout, {
      slots: {
        'branding-logo': '<div class="custom-logo">Custom Logo</div>',
      },
    })

    expect(wrapper.find('.custom-logo').exists()).toBe(true)
  })

  it('renders branding-headline slot', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
      },
      slots: {
        'branding-headline': '<h1 class="custom-headline">Custom Headline</h1>',
      },
    })

    expect(wrapper.find('.custom-headline').exists()).toBe(true)
  })

  it('renders branding-content slot', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
      },
      slots: {
        'branding-content': '<div class="extra-content">Extra Content</div>',
      },
    })

    expect(wrapper.find('.extra-content').exists()).toBe(true)
  })

  it('renders branding-features slot', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
      },
      slots: {
        'branding-features': '<div class="custom-features">Custom Features</div>',
      },
    })

    expect(wrapper.find('.custom-features').exists()).toBe(true)
  })

  it('renders mobile-logo slot', () => {
    const wrapper = mount(AuthLayout, {
      slots: {
        'mobile-logo': '<div class="mobile-logo">Mobile Logo</div>',
      },
    })

    expect(wrapper.find('.mobile-logo').exists()).toBe(true)
  })

  it('renders form-header slot', () => {
    const wrapper = mount(AuthLayout, {
      slots: {
        'form-header': '<div class="form-header">Custom Header</div>',
      },
    })

    expect(wrapper.find('.form-header').exists()).toBe(true)
  })

  it('renders form-footer slot', () => {
    const wrapper = mount(AuthLayout, {
      slots: {
        'form-footer': '<div class="form-footer">Footer Content</div>',
      },
    })

    expect(wrapper.find('.form-footer').exists()).toBe(true)
  })

  it('renders branding-panel slot for complete customization', () => {
    const wrapper = mount(AuthLayout, {
      slots: {
        'branding-panel': '<div class="fully-custom-panel">Fully Custom Panel</div>',
      },
    })

    expect(wrapper.find('.fully-custom-panel').exists()).toBe(true)
  })

  it('hides decorations when showDecorations is false', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        showDecorations: false,
      },
    })

    // Decorative shapes should not exist
    expect(wrapper.find('.rotate-12').exists()).toBe(false)
  })

  it('hides pattern when showPattern is false', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        showPattern: false,
      },
    })

    // Pattern div with opacity-20 should not exist
    const patternDiv = wrapper.findAll('div').filter(d =>
      d.attributes('style')?.includes('radial-gradient'),
    )
    expect(patternDiv.length).toBe(0)
  })

  it('applies custom gradient classes', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        gradientFrom: 'from-purple-700',
        gradientVia: 'via-indigo-600',
        gradientTo: 'to-blue-800',
      },
    })

    const brandingPanel = wrapper.find('.from-purple-700')
    expect(brandingPanel.exists()).toBe(true)
  })

  it('applies underline color to sub-headline SVG', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        subHeadline: 'Test',
        underlineColor: 'rgba(255, 0, 0, 0.5)',
      },
    })

    const path = wrapper.find('path')
    expect(path.attributes('stroke')).toBe('rgba(255, 0, 0, 0.5)')
  })

  it('applies brandingAnimation class', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        brandingAnimation: 'animate-fade-in',
      },
    })

    expect(wrapper.find('.animate-fade-in').exists()).toBe(true)
  })

  it('applies formAnimation class', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        formAnimation: 'animate-slide-up',
      },
    })

    expect(wrapper.find('.animate-slide-up').exists()).toBe(true)
  })

  it('renders link with correct href', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        appName: 'App',
        homeLink: '/home',
      },
    })

    // Without Vue Router, should use <a> with href
    const link = wrapper.find('a[href="/home"]')
    expect(link.exists()).toBe(true)
  })

  it('does not render branding panel when no content provided', () => {
    const wrapper = mount(AuthLayout, {
      props: {
        formTitle: 'Only Form',
      },
    })

    // Should still render the form panel
    expect(wrapper.text()).toContain('Only Form')
    // The branding panel div (lg:w-1/2) should not exist when hasBrandingContent is false
    const brandingPanel = wrapper.find('.lg\\:w-1\\/2')
    // Since appName defaults to empty string and no headline/features, panel should not show
    expect(brandingPanel.exists()).toBe(false)
  })
})
