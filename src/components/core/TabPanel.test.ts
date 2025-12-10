import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import TabPanel from './TabPanel.vue'

describe('TabPanel', () => {
  it('renders slot content', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'tab1' },
      global: {
        provide: {
          activeTab: ref('tab1'),
        },
      },
      slots: {
        default: '<div class="panel-content">Panel Content</div>',
      },
    })

    expect(wrapper.find('.panel-content').exists()).toBe(true)
    expect(wrapper.text()).toContain('Panel Content')
  })

  it('has role="tabpanel"', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'tab1' },
      global: {
        provide: {
          activeTab: ref('tab1'),
        },
      },
    })

    expect(wrapper.attributes('role')).toBe('tabpanel')
  })

  it('is visible when value matches activeTab', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'tab1' },
      global: {
        provide: {
          activeTab: ref('tab1'),
        },
      },
      slots: {
        default: '<span id="content">Content</span>',
      },
    })

    // Should be visible (no display: none)
    expect(wrapper.element.style.display).not.toBe('none')
  })

  it('is hidden when value does not match activeTab', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'tab1' },
      global: {
        provide: {
          activeTab: ref('tab2'),
        },
      },
      slots: {
        default: '<span id="content">Content</span>',
      },
    })

    // Should be hidden (display: none from v-show)
    expect(wrapper.element.style.display).toBe('none')
  })

  it('handles undefined activeTab gracefully', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'tab1' },
      slots: {
        default: 'Content',
      },
    })

    // Should render without error
    expect(wrapper.exists()).toBe(true)
  })

  it('updates visibility when activeTab changes', async () => {
    const activeTab = ref('tab1')

    const wrapper = mount(TabPanel, {
      props: { value: 'tab2' },
      global: {
        provide: {
          activeTab,
        },
      },
      slots: {
        default: 'Content',
      },
    })

    // Initially hidden
    expect(wrapper.element.style.display).toBe('none')

    // Change activeTab
    activeTab.value = 'tab2'
    await wrapper.vm.$nextTick()

    // Now visible
    expect(wrapper.element.style.display).not.toBe('none')
  })

  it('renders complex slot content', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'settings' },
      global: {
        provide: {
          activeTab: ref('settings'),
        },
      },
      slots: {
        default: `
          <div class="settings-panel">
            <h2>Settings</h2>
            <form>
              <input type="text" />
              <button>Save</button>
            </form>
          </div>
        `,
      },
    })

    expect(wrapper.find('.settings-panel').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toBe('Settings')
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('accepts string value prop', () => {
    const wrapper = mount(TabPanel, {
      props: { value: 'my-tab' },
      global: {
        provide: {
          activeTab: ref('my-tab'),
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })
})
