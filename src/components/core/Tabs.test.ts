import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabs from './Tabs.vue'
import TabPanel from './TabPanel.vue'
import { h } from 'vue'

const mockTabs = [
  { key: 'tab1', label: 'Tab 1' },
  { key: 'tab2', label: 'Tab 2' },
  { key: 'tab3', label: 'Tab 3' },
]

describe('Tabs', () => {
  it('renders tab buttons', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(3)
    expect(buttons[0].text()).toBe('Tab 1')
    expect(buttons[1].text()).toBe('Tab 2')
    expect(buttons[2].text()).toBe('Tab 3')
  })

  it('has role="tablist"', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs },
    })

    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
  })

  it('tabs have role="tab"', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs },
    })

    const buttons = wrapper.findAll('button')
    buttons.forEach(button => {
      expect(button.attributes('role')).toBe('tab')
    })
  })

  it('first tab is active by default', () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-selected')).toBe('true')
    expect(buttons[1].attributes('aria-selected')).toBe('false')
  })

  it('activates tab specified by modelValue', () => {
    const wrapper = mount(Tabs, {
      props: {
        tabs: mockTabs,
        modelValue: 'tab2',
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-selected')).toBe('false')
    expect(buttons[1].attributes('aria-selected')).toBe('true')
  })

  it('emits update:modelValue when tab clicked', async () => {
    const wrapper = mount(Tabs, {
      props: { tabs: mockTabs },
    })

    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['tab2'])
  })

  it('does not emit when disabled tab clicked', async () => {
    const tabsWithDisabled = [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2', disabled: true },
    ]

    const wrapper = mount(Tabs, {
      props: { tabs: tabsWithDisabled },
    })

    await wrapper.findAll('button')[1].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('disabled tab has disabled attribute', () => {
    const tabsWithDisabled = [
      { key: 'tab1', label: 'Tab 1' },
      { key: 'tab2', label: 'Tab 2', disabled: true },
    ]

    const wrapper = mount(Tabs, {
      props: { tabs: tabsWithDisabled },
    })

    expect(wrapper.findAll('button')[1].attributes('disabled')).toBeDefined()
  })

  describe('variants', () => {
    it('applies underline variant by default', () => {
      const wrapper = mount(Tabs, {
        props: { tabs: mockTabs },
      })

      const container = wrapper.find('[role="tablist"]')
      expect(container.classes()).toContain('border-b')
    })

    it('applies pills variant', () => {
      const wrapper = mount(Tabs, {
        props: {
          tabs: mockTabs,
          variant: 'pills',
        },
      })

      const container = wrapper.find('[role="tablist"]')
      expect(container.classes()).toContain('gap-2')
    })

    it('applies boxed variant', () => {
      const wrapper = mount(Tabs, {
        props: {
          tabs: mockTabs,
          variant: 'boxed',
        },
      })

      const container = wrapper.find('[role="tablist"]')
      expect(container.classes()).toContain('bg-gray-100')
    })
  })

  it('provides activeTab to slot', () => {
    const wrapper = mount(Tabs, {
      props: {
        tabs: mockTabs,
        modelValue: 'tab2',
      },
      slots: {
        default: ({ activeTab }: { activeTab: string }) => h('div', { class: 'test-slot' }, activeTab),
      },
    })

    expect(wrapper.find('.test-slot').text()).toBe('tab2')
  })
})

describe('TabPanel', () => {
  it('renders content when active', () => {
    const wrapper = mount({
      components: { Tabs, TabPanel },
      template: `
        <Tabs :tabs="tabs" v-model="active">
          <TabPanel value="tab1"><span id="panel1">Content 1</span></TabPanel>
          <TabPanel value="tab2"><span id="panel2">Content 2</span></TabPanel>
        </Tabs>
      `,
      data() {
        return {
          tabs: mockTabs,
          active: 'tab1',
        }
      },
    })

    // Both panels exist in DOM (v-show), but only first is visible
    expect(wrapper.find('#panel1').exists()).toBe(true)
    expect(wrapper.find('#panel2').exists()).toBe(true)

    // First panel's parent should not have display:none
    const panel1 = wrapper.find('#panel1').element.parentElement
    const panel2 = wrapper.find('#panel2').element.parentElement
    expect(panel1?.style.display).not.toBe('none')
    expect(panel2?.style.display).toBe('none')
  })

  it('has role="tabpanel"', () => {
    const wrapper = mount({
      components: { Tabs, TabPanel },
      template: `
        <Tabs :tabs="tabs" v-model="active">
          <TabPanel value="tab1">Content 1</TabPanel>
        </Tabs>
      `,
      data() {
        return {
          tabs: mockTabs,
          active: 'tab1',
        }
      },
    })

    expect(wrapper.find('[role="tabpanel"]').exists()).toBe(true)
  })

  it('switches visible panel when tab changes', async () => {
    const wrapper = mount({
      components: { Tabs, TabPanel },
      template: `
        <Tabs :tabs="tabs" v-model="active">
          <TabPanel value="tab1"><span id="panel1">Content 1</span></TabPanel>
          <TabPanel value="tab2"><span id="panel2">Content 2</span></TabPanel>
        </Tabs>
      `,
      data() {
        return {
          tabs: mockTabs,
          active: 'tab1',
        }
      },
    })

    // Initially first panel visible
    let panel1 = wrapper.find('#panel1').element.parentElement
    let panel2 = wrapper.find('#panel2').element.parentElement
    expect(panel1?.style.display).not.toBe('none')
    expect(panel2?.style.display).toBe('none')

    // Click second tab
    await wrapper.findAll('button')[1].trigger('click')
    await wrapper.vm.$nextTick()

    // Now second panel visible
    panel1 = wrapper.find('#panel1').element.parentElement
    panel2 = wrapper.find('#panel2').element.parentElement
    expect(panel1?.style.display).toBe('none')
    expect(panel2?.style.display).not.toBe('none')
  })

  it('renders slot content', () => {
    const wrapper = mount({
      components: { Tabs, TabPanel },
      template: `
        <Tabs :tabs="tabs" v-model="active">
          <TabPanel value="tab1">
            <div class="custom-content">Custom Content</div>
          </TabPanel>
        </Tabs>
      `,
      data() {
        return {
          tabs: mockTabs,
          active: 'tab1',
        }
      },
    })

    expect(wrapper.find('.custom-content').exists()).toBe(true)
    expect(wrapper.find('.custom-content').text()).toBe('Custom Content')
  })
})
