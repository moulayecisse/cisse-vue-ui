import type { Meta, StoryObj } from '@storybook/vue3'
import Breadcrumb from './Breadcrumb.vue'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Core/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Smartphones' },
    ],
  },
}

export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Dashboard', icon: 'heroicons:home' },
      { label: 'Settings', icon: 'heroicons:cog-6-tooth' },
      { label: 'Profile' },
    ],
  },
}

export const NoHomeIcon: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details' },
    ],
    showHomeIcon: false,
  },
}

export const SingleItem: Story = {
  args: {
    items: [{ label: 'Dashboard' }],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Product Type', href: '/category/sub/type' },
      { label: 'Brand', href: '/category/sub/type/brand' },
      { label: 'Product Name' },
    ],
  },
}
