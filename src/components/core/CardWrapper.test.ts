import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardWrapper from './CardWrapper.vue'

describe('CardWrapper', () => {
  describe('Basic rendering', () => {
    it('renders slot content', () => {
      const wrapper = mount(CardWrapper, {
        slots: {
          default: '<p class="content">Card content</p>',
        },
      })

      expect(wrapper.find('.content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Card content')
    })

    it('renders title when provided', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Card Title' },
      })

      expect(wrapper.text()).toContain('Card Title')
    })

    it('renders description when provided', () => {
      const wrapper = mount(CardWrapper, {
        props: { description: 'Card description' },
      })

      expect(wrapper.text()).toContain('Card description')
    })

    it('renders icon when provided', () => {
      const wrapper = mount(CardWrapper, {
        props: { icon: 'lucide:home', title: 'Title' },
      })

      // Icon element has size-5 class by default
      expect(wrapper.find('.size-5').exists()).toBe(true)
    })
  })

  describe('Shadow variants', () => {
    it('applies no shadow when shadow="none"', () => {
      const wrapper = mount(CardWrapper, { props: { shadow: 'none' } })
      expect(wrapper.find('.shadow-sm').exists()).toBe(false)
      expect(wrapper.find('.shadow-md').exists()).toBe(false)
      expect(wrapper.find('.shadow-lg').exists()).toBe(false)
    })

    it('applies shadow-sm when shadow="sm"', () => {
      const wrapper = mount(CardWrapper, { props: { shadow: 'sm' } })
      expect(wrapper.find('.shadow-sm').exists()).toBe(true)
    })

    it('applies shadow-md by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.shadow-md').exists()).toBe(true)
    })

    it('applies shadow-lg when shadow="lg"', () => {
      const wrapper = mount(CardWrapper, { props: { shadow: 'lg' } })
      expect(wrapper.find('.shadow-lg').exists()).toBe(true)
    })

    it('applies shadow-xl when shadow="xl"', () => {
      const wrapper = mount(CardWrapper, { props: { shadow: 'xl' } })
      expect(wrapper.find('.shadow-xl').exists()).toBe(true)
    })
  })

  describe('Rounded variants', () => {
    it('applies rounded-lg by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.rounded-lg').exists()).toBe(true)
    })

    it('applies rounded-none when rounded="none"', () => {
      const wrapper = mount(CardWrapper, { props: { rounded: 'none' } })
      expect(wrapper.find('.rounded-none').exists()).toBe(true)
    })

    it('applies rounded-xl when rounded="xl"', () => {
      const wrapper = mount(CardWrapper, { props: { rounded: 'xl' } })
      expect(wrapper.find('.rounded-xl').exists()).toBe(true)
    })
  })

  describe('Border variants', () => {
    it('has no border by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.border').exists()).toBe(false)
    })

    it('applies default border', () => {
      const wrapper = mount(CardWrapper, { props: { border: 'default' } })
      expect(wrapper.find('.border-gray-200').exists()).toBe(true)
    })

    it('applies primary border', () => {
      const wrapper = mount(CardWrapper, { props: { border: 'primary' } })
      expect(wrapper.find('.border-primary-500').exists()).toBe(true)
    })
  })

  describe('Variant styles', () => {
    it('applies default variant by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.bg-white').exists()).toBe(true)
    })

    it('applies glass variant', () => {
      const wrapper = mount(CardWrapper, { props: { variant: 'glass' } })
      expect(wrapper.find('.backdrop-blur-sm').exists()).toBe(true)
    })

    it('applies flat variant', () => {
      const wrapper = mount(CardWrapper, { props: { variant: 'flat' } })
      expect(wrapper.find('.bg-gray-50').exists()).toBe(true)
    })
  })

  describe('Padding variants', () => {
    it('applies no content padding by default (matches CardComponent)', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.p-5').exists()).toBe(false)
      expect(wrapper.find('.p-3').exists()).toBe(false)
    })

    it('applies medium header padding by default', () => {
      const wrapper = mount(CardWrapper, { props: { title: 'Title' } })
      expect(wrapper.find('.px-5').exists()).toBe(true)
      expect(wrapper.find('.py-3').exists()).toBe(true)
    })

    it('applies small content padding', () => {
      const wrapper = mount(CardWrapper, { props: { padding: 'sm' } })
      expect(wrapper.find('.p-3').exists()).toBe(true)
    })

    it('applies medium content padding', () => {
      const wrapper = mount(CardWrapper, { props: { padding: 'md' } })
      expect(wrapper.find('.p-5').exists()).toBe(true)
    })

    it('applies large content padding', () => {
      const wrapper = mount(CardWrapper, { props: { padding: 'lg' } })
      expect(wrapper.find('.p-6').exists()).toBe(true)
    })

    it('applies small header padding', () => {
      const wrapper = mount(CardWrapper, { props: { title: 'Title', headerPadding: 'sm' } })
      expect(wrapper.find('.px-3').exists()).toBe(true)
      expect(wrapper.find('.py-2').exists()).toBe(true)
    })

    it('applies large header padding', () => {
      const wrapper = mount(CardWrapper, { props: { title: 'Title', headerPadding: 'lg' } })
      expect(wrapper.find('.px-6').exists()).toBe(true)
      expect(wrapper.find('.py-4').exists()).toBe(true)
    })

    it('applies no header padding when headerPadding="none"', () => {
      const wrapper = mount(CardWrapper, { props: { title: 'Title', headerPadding: 'none' } })
      expect(wrapper.find('.px-5').exists()).toBe(false)
      expect(wrapper.find('.py-3').exists()).toBe(false)
    })
  })

  describe('Header and footer', () => {
    it('renders header divider by default when header exists', () => {
      const wrapper = mount(CardWrapper, { props: { title: 'Title' } })
      expect(wrapper.find('.border-b').exists()).toBe(true)
    })

    it('hides header divider when headerDivider=false', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Title', headerDivider: false },
      })
      expect(wrapper.find('.border-b').exists()).toBe(false)
    })

    it('renders footer slot', () => {
      const wrapper = mount(CardWrapper, {
        slots: { footer: '<div class="footer-content">Footer</div>' },
      })
      expect(wrapper.find('.footer-content').exists()).toBe(true)
    })

    it('renders footer divider when footer exists', () => {
      const wrapper = mount(CardWrapper, {
        slots: { footer: '<div>Footer</div>' },
      })
      expect(wrapper.find('.border-t').exists()).toBe(true)
    })

    it('hides footer divider when footerDivider=false', () => {
      const wrapper = mount(CardWrapper, {
        props: { footerDivider: false },
        slots: { footer: '<div>Footer</div>' },
      })
      expect(wrapper.find('.border-t').exists()).toBe(false)
    })

    it('renders actions slot', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Title' },
        slots: { actions: '<button class="action-btn">Action</button>' },
      })
      expect(wrapper.find('.action-btn').exists()).toBe(true)
    })
  })

  describe('Custom classes', () => {
    it('applies custom cardClass', () => {
      const wrapper = mount(CardWrapper, {
        props: { cardClass: 'my-custom-card' },
      })
      expect(wrapper.find('.my-custom-card').exists()).toBe(true)
    })

    it('applies custom titleClass', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Title', titleClass: 'custom-title-class' },
      })
      expect(wrapper.find('.custom-title-class').exists()).toBe(true)
    })

    it('applies custom contentClass', () => {
      const wrapper = mount(CardWrapper, {
        props: { contentClass: 'custom-content' },
        slots: { default: '<p>Content</p>' },
      })
      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })

    it('applies custom headerClass', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Title', headerClass: 'custom-header' },
      })
      expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('applies custom footerClass', () => {
      const wrapper = mount(CardWrapper, {
        props: { footerClass: 'custom-footer' },
        slots: { footer: '<div>Footer</div>' },
      })
      expect(wrapper.find('.custom-footer').exists()).toBe(true)
    })
  })

  describe('Loading state', () => {
    it('shows loading skeleton when loading', () => {
      const wrapper = mount(CardWrapper, { props: { loading: true } })
      expect(wrapper.findComponent({ name: 'CardSkeleton' }).exists()).toBe(true)
    })

    it('hides content when loading', () => {
      const wrapper = mount(CardWrapper, {
        props: { loading: true },
        slots: { default: '<p class="content">Content</p>' },
      })
      expect(wrapper.find('.content').exists()).toBe(false)
    })

    it('passes loading props to skeleton', () => {
      const wrapper = mount(CardWrapper, {
        props: {
          loading: true,
          loadingLines: 5,
          loadingAvatar: true,
          loadingActions: true,
        },
      })
      const skeleton = wrapper.findComponent({ name: 'CardSkeleton' })
      expect(skeleton.props('lines')).toBe(5)
      expect(skeleton.props('showAvatar')).toBe(true)
      expect(skeleton.props('showActions')).toBe(true)
    })
  })

  describe('Slots', () => {
    it('renders icon slot', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Title' },
        slots: { icon: '<svg class="custom-icon"></svg>' },
      })
      expect(wrapper.find('.custom-icon').exists()).toBe(true)
    })

    it('renders header slot replacing standard header', () => {
      const wrapper = mount(CardWrapper, {
        props: { title: 'Title' },
        slots: { header: '<div class="custom-header">Custom Header</div>' },
      })
      expect(wrapper.find('.custom-header').exists()).toBe(true)
      expect(wrapper.text()).not.toContain('Title')
    })

    it('renders title slot', () => {
      const wrapper = mount(CardWrapper, {
        slots: { title: '<span class="custom-title">Custom Title</span>' },
      })
      expect(wrapper.find('.custom-title').exists()).toBe(true)
    })

    it('renders description slot', () => {
      const wrapper = mount(CardWrapper, {
        slots: { description: '<span class="custom-desc">Custom Desc</span>' },
      })
      expect(wrapper.find('.custom-desc').exists()).toBe(true)
    })
  })

  describe('Accent', () => {
    it('has no accent by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.border-t-4').exists()).toBe(false)
      expect(wrapper.find('.border-l-4').exists()).toBe(false)
    })

    it('applies primary accent on top', () => {
      const wrapper = mount(CardWrapper, { props: { accent: 'primary' } })
      expect(wrapper.find('.border-t-4').exists()).toBe(true)
      expect(wrapper.find('.border-primary-500').exists()).toBe(true)
    })

    it('applies success accent', () => {
      const wrapper = mount(CardWrapper, { props: { accent: 'success' } })
      expect(wrapper.find('.border-emerald-500').exists()).toBe(true)
    })

    it('applies warning accent', () => {
      const wrapper = mount(CardWrapper, { props: { accent: 'warning' } })
      expect(wrapper.find('.border-amber-500').exists()).toBe(true)
    })

    it('applies danger accent', () => {
      const wrapper = mount(CardWrapper, { props: { accent: 'danger' } })
      expect(wrapper.find('.border-red-500').exists()).toBe(true)
    })

    it('applies info accent', () => {
      const wrapper = mount(CardWrapper, { props: { accent: 'info' } })
      expect(wrapper.find('.border-blue-500').exists()).toBe(true)
    })

    it('applies left accent for horizontal layout', () => {
      const wrapper = mount(CardWrapper, {
        props: { accent: 'primary', image: 'test.jpg', imagePosition: 'left' },
      })
      expect(wrapper.find('.border-l-4').exists()).toBe(true)
    })
  })

  describe('Clickable state', () => {
    it('is not clickable by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.cursor-pointer').exists()).toBe(false)
      expect(wrapper.attributes('role')).toBeUndefined()
    })

    it('applies clickable styles when clickable=true', () => {
      const wrapper = mount(CardWrapper, { props: { clickable: true } })
      const card = wrapper.find('.cursor-pointer')
      expect(card.exists()).toBe(true)
      expect(card.attributes('role')).toBe('button')
      expect(card.attributes('tabindex')).toBe('0')
    })

    it('emits click event when clicked', async () => {
      const wrapper = mount(CardWrapper, { props: { clickable: true } })
      const card = wrapper.find('.cursor-pointer')
      await card.trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
      expect(wrapper.emitted('click')?.length).toBe(1)
    })

    it('does not emit click when not clickable', async () => {
      const wrapper = mount(CardWrapper)
      await wrapper.find('.overflow-hidden').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('supports keyboard navigation', async () => {
      const wrapper = mount(CardWrapper, { props: { clickable: true } })
      const card = wrapper.find('.cursor-pointer')
      await card.trigger('keydown.enter')
      expect(wrapper.emitted('click')).toBeTruthy()
    })
  })

  describe('Selected state', () => {
    it('is not selected by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.ring-2').exists()).toBe(false)
    })

    it('applies selected ring when selected=true', () => {
      const wrapper = mount(CardWrapper, { props: { selected: true } })
      expect(wrapper.find('.ring-2').exists()).toBe(true)
      expect(wrapper.find('.ring-primary-500').exists()).toBe(true)
    })
  })

  describe('Disabled state', () => {
    it('is not disabled by default', () => {
      const wrapper = mount(CardWrapper)
      expect(wrapper.find('.opacity-60').exists()).toBe(false)
    })

    it('applies disabled styles when disabled=true', () => {
      const wrapper = mount(CardWrapper, { props: { disabled: true } })
      expect(wrapper.find('.opacity-60').exists()).toBe(true)
      expect(wrapper.find('.cursor-not-allowed').exists()).toBe(true)
    })

    it('does not emit click when disabled and clickable', async () => {
      const wrapper = mount(CardWrapper, { props: { clickable: true, disabled: true } })
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('removes tabindex when disabled', () => {
      const wrapper = mount(CardWrapper, { props: { clickable: true, disabled: true } })
      expect(wrapper.attributes('tabindex')).toBeUndefined()
    })
  })

  describe('Image', () => {
    it('renders image when image prop is provided', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg' } })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('test.jpg')
    })

    it('applies image alt text', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg', imageAlt: 'Test image' } })
      expect(wrapper.find('img').attributes('alt')).toBe('Test image')
    })

    it('renders image at top by default', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg' } })
      expect(wrapper.find('.rounded-t-lg').exists()).toBe(true)
    })

    it('renders image at bottom', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg', imagePosition: 'bottom' } })
      expect(wrapper.find('.rounded-b-lg').exists()).toBe(true)
    })

    it('renders image on left with horizontal layout', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg', imagePosition: 'left' } })
      expect(wrapper.find('.flex').exists()).toBe(true)
      expect(wrapper.find('.rounded-l-lg').exists()).toBe(true)
    })

    it('renders image on right with horizontal layout', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg', imagePosition: 'right' } })
      expect(wrapper.find('.flex-row-reverse').exists()).toBe(true)
      expect(wrapper.find('.rounded-r-lg').exists()).toBe(true)
    })

    it('renders background image with overlay', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg', imagePosition: 'background' } })
      expect(wrapper.find('.absolute.inset-0').exists()).toBe(true)
      expect(wrapper.find('.bg-gradient-to-t').exists()).toBe(true)
    })

    it('applies custom imageClass', () => {
      const wrapper = mount(CardWrapper, { props: { image: 'test.jpg', imageClass: 'custom-image' } })
      expect(wrapper.find('.custom-image').exists()).toBe(true)
    })

    it('renders image slot instead of prop', () => {
      const wrapper = mount(CardWrapper, {
        slots: { image: '<div class="custom-image-slot">Custom Image</div>' },
      })
      expect(wrapper.find('.custom-image-slot').exists()).toBe(true)
    })
  })
})
