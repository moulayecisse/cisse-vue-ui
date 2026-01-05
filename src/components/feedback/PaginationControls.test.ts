import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationControls from './PaginationControls.vue'

// Helper to get navigation buttons (first and last buttons are prev/next)
const getPrevButton = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('button').at(0)!
const getNextButton = (wrapper: ReturnType<typeof mount>) => wrapper.findAll('button').at(-1)!
const getPageButtons = (wrapper: ReturnType<typeof mount>) => {
  const buttons = wrapper.findAll('button')
  return buttons.slice(1, -1) // exclude first (prev) and last (next)
}

describe('PaginationControls', () => {
  it('renders when totalPages > 1', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('does not render when totalPages <= 1', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 1,
        totalPages: 1,
      },
    })

    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('shows current page and total pages', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 3,
        totalPages: 10,
      },
    })

    expect(wrapper.text()).toContain('Page 3 of 10')
  })

  it('uses custom labels', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 2,
        totalPages: 5,
        pageLabel: 'Página',
        ofLabel: 'de',
      },
    })

    expect(wrapper.text()).toContain('Página 2 de 5')
  })

  it('emits update:page when next clicked', async () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 2,
        totalPages: 5,
      },
    })

    await getNextButton(wrapper).trigger('click')

    expect(wrapper.emitted('update:page')).toBeTruthy()
    expect(wrapper.emitted('update:page')![0]).toEqual([3])
  })

  it('emits update:page when previous clicked', async () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 3,
        totalPages: 5,
      },
    })

    await getPrevButton(wrapper).trigger('click')

    expect(wrapper.emitted('update:page')).toBeTruthy()
    expect(wrapper.emitted('update:page')![0]).toEqual([2])
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    expect(getPrevButton(wrapper).attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    })

    expect(getNextButton(wrapper).attributes('disabled')).toBeDefined()
  })

  it('does not emit when clicking disabled previous', async () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    await getPrevButton(wrapper).trigger('click')

    expect(wrapper.emitted('update:page')).toBeFalsy()
  })

  it('does not emit when clicking disabled next', async () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    })

    await getNextButton(wrapper).trigger('click')

    expect(wrapper.emitted('update:page')).toBeFalsy()
  })

  it('disables buttons when loading', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 3,
        totalPages: 5,
        loading: true,
      },
    })

    expect(getPrevButton(wrapper).attributes('disabled')).toBeDefined()
    expect(getNextButton(wrapper).attributes('disabled')).toBeDefined()
  })

  describe('page size', () => {
    it('shows page size selector by default', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
        },
      })

      expect(wrapper.find('select').exists()).toBe(true)
    })

    it('hides page size selector when showPageSize is false', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
          showPageSize: false,
        },
      })

      expect(wrapper.find('select').exists()).toBe(false)
    })

    it('renders default page size options', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
        },
      })

      const options = wrapper.findAll('option')
      expect(options.map(o => o.text())).toEqual(['10', '20', '50', '100'])
    })

    it('renders custom page size options', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
          pageSizeOptions: [5, 15, 25],
        },
      })

      const options = wrapper.findAll('option')
      expect(options.map(o => o.text())).toEqual(['5', '15', '25'])
    })

    it('shows current page size as selected', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
          pageSize: 20,
        },
      })

      expect(wrapper.find('select').element.value).toBe('20')
    })

    it('emits update:pageSize when changed', async () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
          pageSize: 10,
        },
      })

      await wrapper.find('select').setValue('50')

      expect(wrapper.emitted('update:pageSize')).toBeTruthy()
      expect(wrapper.emitted('update:pageSize')![0]).toEqual([50])
    })

    it('uses custom items per page label', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
          itemsPerPageLabel: 'Éléments par page:',
        },
      })

      expect(wrapper.text()).toContain('Éléments par page:')
    })
  })

  it('uses custom navigation labels', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 2,
        totalPages: 5,
        previousLabel: 'Précédent',
        nextLabel: 'Suivant',
      },
    })

    expect(wrapper.text()).toContain('Précédent')
    expect(wrapper.text()).toContain('Suivant')
  })

  describe('page numbers', () => {
    it('shows page number buttons by default', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
        },
      })

      const pageButtons = getPageButtons(wrapper)
      expect(pageButtons.length).toBe(5)
      expect(pageButtons.map(b => b.text())).toEqual(['1', '2', '3', '4', '5'])
    })

    it('hides page numbers when showPageNumbers is false', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
          showPageNumbers: false,
        },
      })

      const pageButtons = getPageButtons(wrapper)
      expect(pageButtons.length).toBe(0)
    })

    it('highlights current page', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 3,
          totalPages: 5,
        },
      })

      const pageButtons = getPageButtons(wrapper)
      const currentPageBtn = pageButtons[2] // Page 3 is index 2
      expect(currentPageBtn.classes()).toContain('bg-primary-600')
    })

    it('emits update:page when page number clicked', async () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 5,
        },
      })

      const pageButtons = getPageButtons(wrapper)
      await pageButtons[2].trigger('click') // Click page 3

      expect(wrapper.emitted('update:page')).toBeTruthy()
      expect(wrapper.emitted('update:page')![0]).toEqual([3])
    })

    it('shows ellipsis for many pages', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 50,
          totalPages: 100,
        },
      })

      expect(wrapper.text()).toContain('…')
    })

    it('shows first and last page with ellipsis when in middle', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 50,
          totalPages: 100,
          maxVisiblePages: 7,
        },
      })

      // Should show: 1 ... 49 50 51 ... 100
      expect(wrapper.text()).toContain('1')
      expect(wrapper.text()).toContain('100')
      expect(wrapper.text()).toContain('50')
    })

    it('respects maxVisiblePages prop', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 1,
          totalPages: 20,
          maxVisiblePages: 5,
        },
      })

      const pageButtons = getPageButtons(wrapper)
      // Should show limited pages: 1, 2, 3, ..., 20
      expect(pageButtons.length).toBeLessThanOrEqual(5)
    })

    it('shows more pages at start when near beginning', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 2,
          totalPages: 20,
          maxVisiblePages: 7,
        },
      })

      // Should show: 1 2 3 4 5 ... 20
      expect(wrapper.text()).toContain('1')
      expect(wrapper.text()).toContain('2')
      expect(wrapper.text()).toContain('3')
      expect(wrapper.text()).toContain('20')
    })

    it('shows more pages at end when near last page', () => {
      const wrapper = mount(PaginationControls, {
        props: {
          currentPage: 19,
          totalPages: 20,
          maxVisiblePages: 7,
        },
      })

      // Should show: 1 ... 16 17 18 19 20
      expect(wrapper.text()).toContain('1')
      expect(wrapper.text()).toContain('19')
      expect(wrapper.text()).toContain('20')
    })
  })
})
