import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { useFocusTrap } from './useFocusTrap'

describe('useFocusTrap', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    container.innerHTML = `
      <button id="btn1">First</button>
      <input id="input1" type="text" />
      <a id="link1" href="#">Link</a>
      <button id="btn2">Last</button>
    `
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('returns containerRef and control functions', () => {
    const { containerRef, activate, deactivate, isActive } = useFocusTrap()

    expect(containerRef.value).toBeNull()
    expect(typeof activate).toBe('function')
    expect(typeof deactivate).toBe('function')
    expect(isActive.value).toBe(false)
  })

  it('activates focus trap when containerRef is set and activate is called', async () => {
    const { containerRef, activate, isActive } = useFocusTrap({ focusFirst: false })

    containerRef.value = container
    activate()

    expect(isActive.value).toBe(true)
  })

  it('deactivates focus trap', () => {
    const { containerRef, activate, deactivate, isActive } = useFocusTrap({ focusFirst: false })

    containerRef.value = container
    activate()
    expect(isActive.value).toBe(true)

    deactivate()
    expect(isActive.value).toBe(false)
  })

  it('stores and restores previously focused element', async () => {
    const outsideButton = document.createElement('button')
    outsideButton.id = 'outside'
    document.body.appendChild(outsideButton)
    outsideButton.focus()

    expect(document.activeElement).toBe(outsideButton)

    const { containerRef, activate, deactivate } = useFocusTrap({
      focusFirst: false,
      restoreFocus: true,
    })

    containerRef.value = container
    activate()
    deactivate()

    expect(document.activeElement).toBe(outsideButton)

    document.body.removeChild(outsideButton)
  })

  it('does not restore focus when restoreFocus is false', () => {
    const outsideButton = document.createElement('button')
    outsideButton.id = 'outside'
    document.body.appendChild(outsideButton)
    outsideButton.focus()

    const { containerRef, activate, deactivate } = useFocusTrap({
      focusFirst: false,
      restoreFocus: false,
    })

    containerRef.value = container
    activate()

    // Focus something inside
    const btn1 = container.querySelector<HTMLButtonElement>('#btn1')!
    btn1.focus()

    deactivate()

    // Should not have restored focus to outside button
    expect(document.activeElement).not.toBe(outsideButton)

    document.body.removeChild(outsideButton)
  })

  it('activates when reactive active ref becomes true', async () => {
    const active = ref(false)
    const { containerRef, isActive } = useFocusTrap({
      active,
      focusFirst: false,
    })

    containerRef.value = container
    await nextTick()

    expect(isActive.value).toBe(false)

    active.value = true
    await nextTick()

    expect(isActive.value).toBe(true)
  })

  it('deactivates when reactive active ref becomes false', async () => {
    const active = ref(true)
    const { containerRef, isActive } = useFocusTrap({
      active,
      focusFirst: false,
    })

    containerRef.value = container
    await nextTick()

    expect(isActive.value).toBe(true)

    active.value = false
    await nextTick()

    expect(isActive.value).toBe(false)
  })

  it('handles Tab key to cycle forward through focusable elements', async () => {
    const { containerRef, activate } = useFocusTrap({ focusFirst: false })

    containerRef.value = container
    activate()

    const btn2 = container.querySelector<HTMLButtonElement>('#btn2')!
    const btn1 = container.querySelector<HTMLButtonElement>('#btn1')!

    // Focus the last button
    btn2.focus()
    expect(document.activeElement).toBe(btn2)

    // Press Tab - should wrap to first element
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(tabEvent)

    expect(document.activeElement).toBe(btn1)
  })

  it('handles Shift+Tab to cycle backward through focusable elements', async () => {
    const { containerRef, activate } = useFocusTrap({ focusFirst: false })

    containerRef.value = container
    activate()

    const btn1 = container.querySelector<HTMLButtonElement>('#btn1')!
    const btn2 = container.querySelector<HTMLButtonElement>('#btn2')!

    // Focus the first button
    btn1.focus()
    expect(document.activeElement).toBe(btn1)

    // Press Shift+Tab - should wrap to last element
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(shiftTabEvent)

    expect(document.activeElement).toBe(btn2)
  })

  it('ignores disabled elements', () => {
    const disabledContainer = document.createElement('div')
    disabledContainer.innerHTML = `
      <button id="enabled1">Enabled 1</button>
      <button id="disabled1" disabled>Disabled</button>
      <button id="enabled2">Enabled 2</button>
    `
    document.body.appendChild(disabledContainer)

    const { containerRef, activate } = useFocusTrap({ focusFirst: false })

    containerRef.value = disabledContainer
    activate()

    const enabled2 = disabledContainer.querySelector<HTMLButtonElement>('#enabled2')!
    const enabled1 = disabledContainer.querySelector<HTMLButtonElement>('#enabled1')!

    // Focus last enabled button
    enabled2.focus()

    // Tab should skip disabled and go to first enabled
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    })
    document.dispatchEvent(tabEvent)

    expect(document.activeElement).toBe(enabled1)

    document.body.removeChild(disabledContainer)
  })

  it('handles initialFocus as selector', async () => {
    vi.useFakeTimers()

    const { containerRef, activate } = useFocusTrap({
      focusFirst: true,
      initialFocus: '#input1',
    })

    containerRef.value = container
    activate()

    // Wait for requestAnimationFrame
    vi.advanceTimersByTime(16)

    const input = container.querySelector<HTMLInputElement>('#input1')!
    expect(document.activeElement).toBe(input)

    vi.useRealTimers()
  })

  it('does not activate twice', () => {
    const { containerRef, activate, isActive } = useFocusTrap({ focusFirst: false })

    containerRef.value = container
    activate()
    activate() // Second call should be no-op

    expect(isActive.value).toBe(true)
  })

  it('does not deactivate twice', () => {
    const { containerRef, activate, deactivate, isActive } = useFocusTrap({ focusFirst: false })

    containerRef.value = container
    activate()
    deactivate()
    deactivate() // Second call should be no-op

    expect(isActive.value).toBe(false)
  })
})
