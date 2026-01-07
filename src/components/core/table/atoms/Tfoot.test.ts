import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tfoot from './Tfoot.vue'

describe('Tfoot', () => {
  it('renders tfoot element', () => {
    const wrapper = mount(Tfoot)
    expect(wrapper.find('tfoot').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(Tfoot, {
      slots: {
        default: '<tr><td>Footer content</td></tr>',
      },
    })
    expect(wrapper.text()).toContain('Footer content')
  })

  it('applies border top style', () => {
    const wrapper = mount(Tfoot)
    const tfoot = wrapper.find('tfoot')
    expect(tfoot.classes()).toContain('border-t')
  })
})
