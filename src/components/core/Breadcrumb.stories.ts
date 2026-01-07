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
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones' },
]" />`,
      },
    },
  },
}

export const Simple: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'About' },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'About' },
]" />`,
      },
    },
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
  parameters: {
    docs: {
      source: {
        code: `<Breadcrumb :items="[
  { label: 'Dashboard', icon: 'heroicons:home' },
  { label: 'Settings', icon: 'heroicons:cog-6-tooth' },
  { label: 'Profile' },
]" />`,
      },
    },
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

export const EcommercePath: Story = {
  args: {
    items: [
      { label: 'Shop', href: '/shop' },
      { label: 'Electronics', href: '/shop/electronics' },
      { label: 'Computers', href: '/shop/electronics/computers' },
      { label: 'Laptops', href: '/shop/electronics/computers/laptops' },
      { label: 'Gaming Laptop XYZ' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple de fil d\'Ariane pour un site e-commerce.',
      },
      source: {
        code: `<Breadcrumb :items=" [
  { label: 'Shop', href: '/shop' },
  { label: 'Electronics', href: '/shop/electronics' },
  { label: 'Computers', href: '/shop/electronics/computers' },
  { label: 'Laptops', href: '/shop/electronics/computers/laptops' },
  { label: 'Gaming Laptop XYZ' },
]" />`,
      },
    },
  },
}

export const AdminPath: Story = {
  args: {
    items: [
      { label: 'Dashboard', icon: 'lucide:layout-dashboard', href: '/admin' },
      { label: 'Users', icon: 'lucide:users', href: '/admin/users' },
      { label: 'User Details', href: '/admin/users/123' },
      { label: 'Edit' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple de navigation admin avec icônes.',
      },
    },
  },
}

export const DocumentationPath: Story = {
  args: {
    items: [
      { label: 'Docs', href: '/docs' },
      { label: 'Components', href: '/docs/components' },
      { label: 'Form', href: '/docs/components/form' },
      { label: 'Button' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple pour une section documentation.',
      },
    },
  },
}

export const WithMaxItems: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup: () => ({
      items: [
        { label: 'Home', href: '/' },
        { label: 'Level 1', href: '/level1' },
        { label: 'Level 2', href: '/level2' },
        { label: 'Level 3', href: '/level3' },
        { label: 'Level 4', href: '/level4' },
        { label: 'Level 5' },
      ],
    }),
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-600 mb-2">Sans limite:</p>
          <Breadcrumb :items="items" />
        </div>
        <div>
          <p class="text-sm text-gray-600 mb-2">Avec limite (max 3 items visibles):</p>
          <Breadcrumb :items="items" :max-items="3" />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Démontre la limitation du nombre d\'items affichés avec un collapse.',
      },
    },
  },
}

export const StatesDemo: Story = {
  render: () => ({
    components: { Breadcrumb },
    template: `
      <div class="space-y-6">
        <div>
          <p class="mb-2 text-sm font-medium text-gray-700">Normal</p>
          <Breadcrumb :items=" [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Current Page' },
          ]" />
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-700">Avec icônes</p>
          <Breadcrumb :items=" [
            { label: 'Home', icon: 'lucide:home', href: '/' },
            { label: 'Folder', icon: 'lucide:folder', href: '/folder' },
            { label: 'File' },
          ]" />
        </div>
        <div>
          <p class="mb-2 text-sm font-medium text-gray-700">Mode sombre</p>
          <div class="dark bg-gray-900 p-4 rounded">
            <Breadcrumb :items=" [
              { label: 'Home', href: '/' },
              { label: 'Settings', href: '/settings' },
              { label: 'Profile' },
            ]" />
          </div>
        </div>
      </div>
    `,
  }),
}
