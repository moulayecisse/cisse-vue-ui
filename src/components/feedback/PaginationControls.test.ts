import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationControls from './PaginationControls.vue'

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

    const nextButton = wrapper.findAll('button')[1]
    await nextButton.trigger('click')

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

    const prevButton = wrapper.findAll('button')[0]
    await prevButton.trigger('click')

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

    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    })

    const nextButton = wrapper.findAll('button')[1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('does not emit when clicking disabled previous', async () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 1,
        totalPages: 5,
      },
    })

    const prevButton = wrapper.findAll('button')[0]
    await prevButton.trigger('click')

    expect(wrapper.emitted('update:page')).toBeFalsy()
  })

  it('does not emit when clicking disabled next', async () => {
    const wrapper = mount(PaginationControls, {
      props: {
        currentPage: 5,
        totalPages: 5,
      },
    })

    const nextButton = wrapper.findAll('button')[1]
    await nextButton.trigger('click')

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

    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('disabled')).toBeDefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
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
})
