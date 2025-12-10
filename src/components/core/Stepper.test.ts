import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stepper from './Stepper.vue'

const mockSteps = [
  { key: 'step1', title: 'Account', description: 'Create your account' },
  { key: 'step2', title: 'Profile', description: 'Set up your profile' },
  { key: 'step3', title: 'Confirm', description: 'Review and confirm' },
]

describe('Stepper', () => {
  it('renders all steps', () => {
    const wrapper = mount(Stepper, {
      props: { steps: mockSteps },
    })

    expect(wrapper.text()).toContain('Account')
    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Confirm')
  })

  it('renders step descriptions', () => {
    const wrapper = mount(Stepper, {
      props: { steps: mockSteps },
    })

    expect(wrapper.text()).toContain('Create your account')
    expect(wrapper.text()).toContain('Set up your profile')
  })

  it('first step is active by default', () => {
    const wrapper = mount(Stepper, {
      props: { steps: mockSteps },
    })

    // First step circle should have active styling
    const circles = wrapper.findAll('[class*="rounded-full"]')
    expect(circles[0].classes().some(c => c.includes('primary'))).toBe(true)
  })

  it('activates correct step based on modelValue', () => {
    const wrapper = mount(Stepper, {
      props: {
        steps: mockSteps,
        modelValue: 'step2',
      },
    })

    // Step 1 should be complete, step 2 active, step 3 pending
    const circles = wrapper.findAll('[class*="rounded-full"][class*="size-12"]')

    // First step (complete)
    expect(circles[0].classes().some(c => c.includes('primary'))).toBe(true)

    // Second step (active)
    expect(circles[1].classes().some(c => c.includes('primary'))).toBe(true)

    // Third step (pending)
    expect(circles[2].classes().some(c => c.includes('gray'))).toBe(true)
  })

  it('shows step numbers by default', () => {
    const wrapper = mount(Stepper, {
      props: { steps: mockSteps },
    })

    expect(wrapper.text()).toContain('1')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('3')
  })

  it('shows check icon for completed steps', () => {
    const wrapper = mount(Stepper, {
      props: {
        steps: mockSteps,
        modelValue: 'step3',
      },
    })

    // Steps 1 and 2 should be complete and show check icons
    const checkIcons = wrapper.findAll('[class*="size-6"]')
    expect(checkIcons.length).toBeGreaterThan(0)
  })

  describe('orientation', () => {
    it('renders horizontal by default', () => {
      const wrapper = mount(Stepper, {
        props: { steps: mockSteps },
      })

      const container = wrapper.find('[class*="justify-between"]')
      expect(container.exists()).toBe(true)
    })

    it('renders vertical orientation', () => {
      const wrapper = mount(Stepper, {
        props: {
          steps: mockSteps,
          orientation: 'vertical',
        },
      })

      const container = wrapper.find('[class*="flex-col"][class*="gap-4"]')
      expect(container.exists()).toBe(true)
    })
  })

  it('shows progress line in horizontal mode', () => {
    const wrapper = mount(Stepper, {
      props: {
        steps: mockSteps,
        modelValue: 'step2',
      },
    })

    // Should have progress line elements
    const progressLines = wrapper.findAll('[class*="h-0.5"]')
    expect(progressLines.length).toBeGreaterThan(0)
  })

  it('calculates progress width correctly', () => {
    const wrapper = mount(Stepper, {
      props: {
        steps: mockSteps,
        modelValue: 'step2',
      },
    })

    // Second step (index 1) of 3 steps = 50% progress
    const progressBar = wrapper.find('[class*="bg-primary"][class*="h-0.5"]')
    expect(progressBar.attributes('style')).toContain('50%')
  })

  it('handles steps with custom icons', () => {
    const stepsWithIcons = [
      { key: 'step1', title: 'Step 1', icon: 'lucide:user' },
      { key: 'step2', title: 'Step 2', icon: 'lucide:settings' },
    ]

    const wrapper = mount(Stepper, {
      props: {
        steps: stepsWithIcons,
        modelValue: 'step1',
      },
    })

    // Should render without error
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.text()).toContain('Step 1')
  })

  it('handles numeric step keys', () => {
    const numericSteps = [
      { key: 1, title: 'First' },
      { key: 2, title: 'Second' },
    ]

    const wrapper = mount(Stepper, {
      props: {
        steps: numericSteps,
        modelValue: 2,
      },
    })

    // Second step should be active
    const circles = wrapper.findAll('[class*="rounded-full"][class*="size-12"]')
    expect(circles[1].classes().some(c => c.includes('primary'))).toBe(true)
  })

  it('steps without description only show title', () => {
    const stepsNoDesc = [
      { key: 'step1', title: 'Only Title' },
    ]

    const wrapper = mount(Stepper, {
      props: { steps: stepsNoDesc },
    })

    expect(wrapper.text()).toContain('Only Title')
    // Should not have description paragraph
    const descriptions = wrapper.findAll('.text-xs')
    expect(descriptions.length).toBe(0)
  })
})
