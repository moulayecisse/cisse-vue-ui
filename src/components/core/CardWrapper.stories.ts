import type { Meta, StoryObj } from '@storybook/vue3-vite'
import CardWrapper from './CardWrapper.vue'
import Button from './Button.vue'

const meta: Meta<typeof CardWrapper> = {
  title: 'Core/CardWrapper',
  component: CardWrapper,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    icon: { control: 'text' },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    rounded: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    headerPadding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    border: {
      control: 'select',
      options: ['none', 'default', 'primary', 'secondary'],
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'outline', 'flat'],
    },
    accent: {
      control: 'select',
      options: ['none', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    headerDivider: { control: 'boolean' },
    footerDivider: { control: 'boolean' },
    clickable: { control: 'boolean' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    image: { control: 'text' },
    imageAlt: { control: 'text' },
    imagePosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'background'],
    },
    imageHeight: { control: 'text' },
    imageWidth: { control: 'text' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <CardWrapper>
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">This is a basic card wrapper with some content inside.</p>
        </div>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">This is a basic card wrapper with some content inside.</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const WithTitleAndIcon: Story = {
  args: {
    title: 'Dashboard',
    description: 'Overview of your account',
    icon: 'lucide:layout-dashboard',
  },
  render: (args) => ({
    components: { CardWrapper },
    setup: () => ({ args }),
    template: `
      <CardWrapper v-bind="args">
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Card content with icon in header.</p>
        </div>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  title="Dashboard"
  description="Overview of your account"
  icon="lucide:layout-dashboard"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Card content with icon in header.</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const WithActions: Story = {
  args: {
    title: 'User Settings',
    description: 'Manage your account preferences',
    icon: 'lucide:settings',
  },
  render: (args) => ({
    components: { CardWrapper, Button },
    setup: () => ({ args }),
    template: `
      <CardWrapper v-bind="args">
        <template #actions>
          <Button size="sm" variant="outline">Cancel</Button>
          <Button size="sm">Save</Button>
        </template>
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Configure your settings here.</p>
        </div>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  title="User Settings"
  description="Manage your account preferences"
  icon="lucide:settings"
>
  <template #actions>
    <Button size="sm" variant="outline">Cancel</Button>
    <Button size="sm">Save</Button>
  </template>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Configure your settings here.</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const WithFooter: Story = {
  args: {
    title: 'Order Summary',
    icon: 'lucide:shopping-cart',
  },
  render: (args) => ({
    components: { CardWrapper, Button },
    setup: () => ({ args }),
    template: `
      <CardWrapper v-bind="args">
        <div class="p-5 space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
            <span class="font-medium dark:text-gray-200">$99.00</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600 dark:text-gray-400">Shipping</span>
            <span class="font-medium dark:text-gray-200">$5.00</span>
          </div>
        </div>
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-lg font-semibold dark:text-white">Total: $104.00</span>
            <Button>Checkout</Button>
          </div>
        </template>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper title="Order Summary" icon="lucide:shopping-cart">
  <div class="p-5 space-y-2">
    <div class="flex justify-between">
      <span class="text-gray-600 dark:text-gray-400">Subtotal</span>
      <span class="font-medium dark:text-gray-200">$99.00</span>
    </div>
    <div class="flex justify-between">
      <span class="text-gray-600 dark:text-gray-400">Shipping</span>
      <span class="font-medium dark:text-gray-200">$5.00</span>
    </div>
  </div>
  <template #footer>
    <div class="flex justify-between items-center">
      <span class="text-lg font-semibold dark:text-white">Total: $104.00</span>
      <Button>Checkout</Button>
    </div>
  </template>
</CardWrapper>`,
      },
    },
  },
}

export const ShadowVariants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <CardWrapper shadow="none" title="No Shadow">
          <div class="p-5">shadow="none"</div>
        </CardWrapper>
        <CardWrapper shadow="sm" title="Small Shadow">
          <div class="p-5">shadow="sm"</div>
        </CardWrapper>
        <CardWrapper shadow="md" title="Medium Shadow">
          <div class="p-5">shadow="md" (default)</div>
        </CardWrapper>
        <CardWrapper shadow="lg" title="Large Shadow">
          <div class="p-5">shadow="lg"</div>
        </CardWrapper>
        <CardWrapper shadow="xl" title="XL Shadow">
          <div class="p-5">shadow="xl"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper shadow="none" title="No Shadow">...</CardWrapper>
<CardWrapper shadow="sm" title="Small Shadow">...</CardWrapper>
<CardWrapper shadow="md" title="Medium Shadow">...</CardWrapper>
<CardWrapper shadow="lg" title="Large Shadow">...</CardWrapper>
<CardWrapper shadow="xl" title="XL Shadow">...</CardWrapper>`,
      },
    },
  },
}

export const RoundedVariants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <CardWrapper rounded="none" title="None">
          <div class="p-5">rounded="none"</div>
        </CardWrapper>
        <CardWrapper rounded="sm" title="Small">
          <div class="p-5">rounded="sm"</div>
        </CardWrapper>
        <CardWrapper rounded="md" title="Medium">
          <div class="p-5">rounded="md"</div>
        </CardWrapper>
        <CardWrapper rounded="lg" title="Large">
          <div class="p-5">rounded="lg" (default)</div>
        </CardWrapper>
        <CardWrapper rounded="xl" title="XL">
          <div class="p-5">rounded="xl"</div>
        </CardWrapper>
        <CardWrapper rounded="full" title="Full">
          <div class="p-5">rounded="full"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper rounded="none" title="None">...</CardWrapper>
<CardWrapper rounded="sm" title="Small">...</CardWrapper>
<CardWrapper rounded="md" title="Medium">...</CardWrapper>
<CardWrapper rounded="lg" title="Large">...</CardWrapper>
<CardWrapper rounded="xl" title="XL">...</CardWrapper>
<CardWrapper rounded="full" title="Full">...</CardWrapper>`,
      },
    },
  },
}

export const BorderVariants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <CardWrapper border="none" title="No Border">
          <div class="p-5">border="none" (default)</div>
        </CardWrapper>
        <CardWrapper border="default" title="Default Border">
          <div class="p-5">border="default"</div>
        </CardWrapper>
        <CardWrapper border="primary" title="Primary Border">
          <div class="p-5">border="primary"</div>
        </CardWrapper>
        <CardWrapper border="secondary" title="Secondary Border">
          <div class="p-5">border="secondary"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper border="none" title="No Border">...</CardWrapper>
<CardWrapper border="default" title="Default Border">...</CardWrapper>
<CardWrapper border="primary" title="Primary Border">...</CardWrapper>
<CardWrapper border="secondary" title="Secondary Border">...</CardWrapper>`,
      },
    },
  },
}

export const Variants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-2 gap-4 p-4" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        <CardWrapper variant="default" title="Default">
          <div class="p-5">variant="default"</div>
        </CardWrapper>
        <CardWrapper variant="glass" title="Glass">
          <div class="p-5">variant="glass"</div>
        </CardWrapper>
        <CardWrapper variant="outline" border="default" title="Outline">
          <div class="p-5">variant="outline"</div>
        </CardWrapper>
        <CardWrapper variant="flat" title="Flat">
          <div class="p-5">variant="flat"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper variant="default" title="Default">...</CardWrapper>
<CardWrapper variant="glass" title="Glass">...</CardWrapper>
<CardWrapper variant="outline" border="default" title="Outline">...</CardWrapper>
<CardWrapper variant="flat" title="Flat">...</CardWrapper>`,
      },
    },
  },
}

export const PaddingVariants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <CardWrapper padding="none" title="No Padding">
          <div class="bg-primary-100 dark:bg-primary-900/30">Content has no padding</div>
        </CardWrapper>
        <CardWrapper padding="sm" title="Small Padding">
          <div class="bg-primary-100 dark:bg-primary-900/30">padding="sm"</div>
        </CardWrapper>
        <CardWrapper padding="md" title="Medium Padding">
          <div class="bg-primary-100 dark:bg-primary-900/30">padding="md"</div>
        </CardWrapper>
        <CardWrapper padding="lg" title="Large Padding">
          <div class="bg-primary-100 dark:bg-primary-900/30">padding="lg"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper padding="none" title="No Padding">...</CardWrapper>
<CardWrapper padding="sm" title="Small Padding">...</CardWrapper>
<CardWrapper padding="md" title="Medium Padding">...</CardWrapper>
<CardWrapper padding="lg" title="Large Padding">...</CardWrapper>`,
      },
    },
  },
}

export const HeaderPaddingVariants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <CardWrapper headerPadding="none" title="No Header Padding">
          <div class="p-5">headerPadding="none"</div>
        </CardWrapper>
        <CardWrapper headerPadding="sm" title="Small Header Padding">
          <div class="p-5">headerPadding="sm"</div>
        </CardWrapper>
        <CardWrapper headerPadding="md" title="Medium Header Padding">
          <div class="p-5">headerPadding="md" (default)</div>
        </CardWrapper>
        <CardWrapper headerPadding="lg" title="Large Header Padding">
          <div class="p-5">headerPadding="lg"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper headerPadding="none" title="No Header Padding">...</CardWrapper>
<CardWrapper headerPadding="sm" title="Small Header Padding">...</CardWrapper>
<CardWrapper headerPadding="md" title="Medium Header Padding">...</CardWrapper>
<CardWrapper headerPadding="lg" title="Large Header Padding">...</CardWrapper>`,
      },
    },
  },
}

export const NoDividers: Story = {
  args: {
    title: 'No Dividers',
    description: 'Clean look without border dividers',
    headerDivider: false,
    footerDivider: false,
  },
  render: (args) => ({
    components: { CardWrapper, Button },
    setup: () => ({ args }),
    template: `
      <CardWrapper v-bind="args">
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Content without dividers above and below.</p>
        </div>
        <template #footer>
          <div class="flex justify-end">
            <Button size="sm">Submit</Button>
          </div>
        </template>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  title="No Dividers"
  description="Clean look without border dividers"
  :header-divider="false"
  :footer-divider="false"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Content without dividers above and below.</p>
  </div>
  <template #footer>
    <div class="flex justify-end">
      <Button size="sm">Submit</Button>
    </div>
  </template>
</CardWrapper>`,
      },
    },
  },
}

export const CustomClasses: Story = {
  args: {
    title: 'Custom Styled Card',
    cardClass: 'hover:scale-105 transition-transform cursor-pointer',
    headerClass: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    titleClass: 'text-white',
    descriptionClass: 'text-white/80',
    contentClass: 'bg-gray-50 dark:bg-gray-800',
  },
  render: (args) => ({
    components: { CardWrapper },
    setup: () => ({ args }),
    template: `
      <CardWrapper v-bind="args" description="With custom class overrides">
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-300">Hover to see scale effect. Header has gradient background.</p>
        </div>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  title="Custom Styled Card"
  description="With custom class overrides"
  card-class="hover:scale-105 transition-transform cursor-pointer"
  header-class="bg-gradient-to-r from-primary-500 to-secondary-500"
  title-class="text-white"
  description-class="text-white/80"
  content-class="bg-gray-50 dark:bg-gray-800"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-300">Hover to see scale effect.</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const CustomIconSlot: Story = {
  args: {
    title: 'Custom Icon',
    description: 'Using icon slot for custom content',
  },
  render: (args) => ({
    components: { CardWrapper },
    setup: () => ({ args }),
    template: `
      <CardWrapper v-bind="args">
        <template #icon>
          <div class="size-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <span class="text-white font-bold">AI</span>
          </div>
        </template>
        <div class="p-5">
          <p class="text-gray-600 dark:text-gray-400">Using custom icon slot with gradient background.</p>
        </div>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper title="Custom Icon" description="Using icon slot for custom content">
  <template #icon>
    <div class="size-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
      <span class="text-white font-bold">AI</span>
    </div>
  </template>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Using custom icon slot with gradient background.</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => ({
    components: { CardWrapper },
    setup: () => ({ args }),
    template: '<CardWrapper v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper loading />`,
      },
    },
  },
}

export const LoadingWithOptions: Story = {
  args: {
    loading: true,
    loadingAvatar: true,
    loadingActions: true,
    loadingLines: 5,
  },
  render: (args) => ({
    components: { CardWrapper },
    setup: () => ({ args }),
    template: '<CardWrapper v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper loading loading-avatar loading-actions :loading-lines="5" />`,
      },
    },
  },
}

export const AccentVariants: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <CardWrapper accent="primary" title="Primary">
          <div class="p-5">accent="primary"</div>
        </CardWrapper>
        <CardWrapper accent="secondary" title="Secondary">
          <div class="p-5">accent="secondary"</div>
        </CardWrapper>
        <CardWrapper accent="success" title="Success">
          <div class="p-5">accent="success"</div>
        </CardWrapper>
        <CardWrapper accent="warning" title="Warning">
          <div class="p-5">accent="warning"</div>
        </CardWrapper>
        <CardWrapper accent="danger" title="Danger">
          <div class="p-5">accent="danger"</div>
        </CardWrapper>
        <CardWrapper accent="info" title="Info">
          <div class="p-5">accent="info"</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper accent="primary" title="Primary">...</CardWrapper>
<CardWrapper accent="secondary" title="Secondary">...</CardWrapper>
<CardWrapper accent="success" title="Success">...</CardWrapper>
<CardWrapper accent="warning" title="Warning">...</CardWrapper>
<CardWrapper accent="danger" title="Danger">...</CardWrapper>
<CardWrapper accent="info" title="Info">...</CardWrapper>`,
      },
    },
  },
}

export const Clickable: Story = {
  render: () => ({
    components: { CardWrapper },
    data: () => ({ clickCount: 0 }),
    template: `
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">Click count: {{ clickCount }}</p>
        <CardWrapper
          clickable
          title="Clickable Card"
          description="Click me to increment the counter"
          icon="lucide:mouse-pointer-click"
          @click="clickCount++"
        >
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">This card has hover effects and is keyboard accessible.</p>
          </div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  clickable
  title="Clickable Card"
  description="Click me to increment the counter"
  icon="lucide:mouse-pointer-click"
  @click="handleClick"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">This card has hover effects and is keyboard accessible.</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const Selected: Story = {
  render: () => ({
    components: { CardWrapper },
    data: () => ({ selectedCard: 1 }),
    template: `
      <div class="grid grid-cols-3 gap-4">
        <CardWrapper
          v-for="i in 3"
          :key="i"
          clickable
          :selected="selectedCard === i"
          :title="'Card ' + i"
          @click="selectedCard = i"
        >
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">Click to select this card</p>
          </div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  clickable
  :selected="selectedCard === 1"
  title="Card 1"
  @click="selectedCard = 1"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Click to select this card</p>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const Disabled: Story = {
  render: () => ({
    components: { CardWrapper, Button },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <CardWrapper title="Normal Card" icon="lucide:check">
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">This card is interactive.</p>
          </div>
        </CardWrapper>
        <CardWrapper disabled title="Disabled Card" icon="lucide:x">
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">This card is disabled and non-interactive.</p>
          </div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper title="Normal Card" icon="lucide:check">...</CardWrapper>
<CardWrapper disabled title="Disabled Card" icon="lucide:x">...</CardWrapper>`,
      },
    },
  },
}

export const ImageTop: Story = {
  render: () => ({
    components: { CardWrapper, Button },
    template: `
      <div class="max-w-sm">
        <CardWrapper
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
          imageAlt="Mountain landscape"
          title="Mountain Adventure"
          description="Explore the peaks"
        >
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">Discover breathtaking views and challenging trails in our mountain expedition.</p>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <Button size="sm">Book Now</Button>
            </div>
          </template>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
  image-alt="Mountain landscape"
  title="Mountain Adventure"
  description="Explore the peaks"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Discover breathtaking views...</p>
  </div>
  <template #footer>
    <div class="flex justify-end">
      <Button size="sm">Book Now</Button>
    </div>
  </template>
</CardWrapper>`,
      },
    },
  },
}

export const ImageLeft: Story = {
  render: () => ({
    components: { CardWrapper, Button },
    template: `
      <div class="max-w-2xl">
        <CardWrapper
          image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=600&fit=crop"
          imageAlt="Team working"
          imagePosition="left"
          imageWidth="200px"
          title="Team Collaboration"
          description="Work together seamlessly"
          accent="primary"
        >
          <div class="p-5">
            <p class="text-gray-600 dark:text-gray-400">Our platform enables teams to collaborate effectively across time zones and departments.</p>
            <div class="mt-4">
              <Button size="sm">Learn More</Button>
            </div>
          </div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  image="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=600&fit=crop"
  image-alt="Team working"
  image-position="left"
  image-width="200px"
  title="Team Collaboration"
  description="Work together seamlessly"
  accent="primary"
>
  <div class="p-5">
    <p class="text-gray-600 dark:text-gray-400">Our platform enables teams to collaborate...</p>
    <div class="mt-4">
      <Button size="sm">Learn More</Button>
    </div>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const ImageBackground: Story = {
  render: () => ({
    components: { CardWrapper, Button },
    template: `
      <div class="max-w-sm">
        <CardWrapper
          image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop"
          imageAlt="Starry night"
          imagePosition="background"
          title="Night Sky Photography"
          description="Capture the cosmos"
          :headerDivider="false"
        >
          <div class="p-5 min-h-[200px] flex items-end">
            <div>
              <p class="text-white/90">Learn astrophotography techniques from experts.</p>
              <Button class="mt-3" size="sm" variant="outline">Explore</Button>
            </div>
          </div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  image="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop"
  image-alt="Starry night"
  image-position="background"
  title="Night Sky Photography"
  description="Capture the cosmos"
  :header-divider="false"
>
  <div class="p-5 min-h-[200px] flex items-end">
    <div>
      <p class="text-white/90">Learn astrophotography techniques from experts.</p>
      <Button class="mt-3" size="sm" variant="outline">Explore</Button>
    </div>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const ImagePositions: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <CardWrapper
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
            imagePosition="top"
            title="Image Top"
          >
            <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Default position</div>
          </CardWrapper>
          <CardWrapper
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
            imagePosition="bottom"
            title="Image Bottom"
          >
            <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Image below content</div>
          </CardWrapper>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <CardWrapper
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=300&fit=crop"
            imagePosition="left"
            imageWidth="120px"
            title="Image Left"
          >
            <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Horizontal layout</div>
          </CardWrapper>
          <CardWrapper
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=300&fit=crop"
            imagePosition="right"
            imageWidth="120px"
            title="Image Right"
          >
            <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Horizontal reversed</div>
          </CardWrapper>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Top (default) -->
<CardWrapper image="..." image-position="top" title="Image Top">...</CardWrapper>

<!-- Bottom -->
<CardWrapper image="..." image-position="bottom" title="Image Bottom">...</CardWrapper>

<!-- Left (horizontal) -->
<CardWrapper image="..." image-position="left" image-width="120px" title="Image Left">...</CardWrapper>

<!-- Right (horizontal) -->
<CardWrapper image="..." image-position="right" image-width="120px" title="Image Right">...</CardWrapper>`,
      },
    },
  },
}

export const InteractiveStates: Story = {
  render: () => ({
    components: { CardWrapper },
    data: () => ({ selected: 2 }),
    template: `
      <div class="grid grid-cols-4 gap-4">
        <CardWrapper title="Default" icon="lucide:circle">
          <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Normal state</div>
        </CardWrapper>
        <CardWrapper clickable title="Clickable" icon="lucide:pointer">
          <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Hover me</div>
        </CardWrapper>
        <CardWrapper selected title="Selected" icon="lucide:check-circle">
          <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Ring indicator</div>
        </CardWrapper>
        <CardWrapper disabled title="Disabled" icon="lucide:ban">
          <div class="p-4 text-sm text-gray-600 dark:text-gray-400">Non-interactive</div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Default -->
<CardWrapper title="Default" icon="lucide:circle">...</CardWrapper>

<!-- Clickable with hover effects -->
<CardWrapper clickable title="Clickable" icon="lucide:pointer">...</CardWrapper>

<!-- Selected with ring indicator -->
<CardWrapper selected title="Selected" icon="lucide:check-circle">...</CardWrapper>

<!-- Disabled (dimmed, non-interactive) -->
<CardWrapper disabled title="Disabled" icon="lucide:ban">...</CardWrapper>`,
      },
    },
  },
}

export const ProductCard: Story = {
  render: () => ({
    components: { CardWrapper, Button },
    template: `
      <div class="max-w-xs">
        <CardWrapper
          clickable
          image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
          imageAlt="Product"
          imageHeight="200px"
          :headerDivider="false"
          shadow="lg"
        >
          <div class="p-4 space-y-2">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Premium Watch</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Luxury timepiece</p>
              </div>
              <span class="text-lg font-bold text-primary-600">$299</span>
            </div>
            <div class="flex gap-1">
              <span v-for="i in 5" :key="i" class="text-amber-400">★</span>
              <span class="text-sm text-gray-500 ml-1">(128)</span>
            </div>
          </div>
          <template #footer>
            <Button class="w-full" icon="lucide:shopping-cart">Add to Cart</Button>
          </template>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  clickable
  image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop"
  image-alt="Product"
  image-height="200px"
  :header-divider="false"
  shadow="lg"
>
  <div class="p-4 space-y-2">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="font-semibold text-gray-900 dark:text-white">Premium Watch</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Luxury timepiece</p>
      </div>
      <span class="text-lg font-bold text-primary-600">$299</span>
    </div>
    <div class="flex gap-1">
      <span v-for="i in 5" :key="i" class="text-amber-400">★</span>
      <span class="text-sm text-gray-500 ml-1">(128)</span>
    </div>
  </div>
  <template #footer>
    <Button class="w-full" icon="lucide:shopping-cart">Add to Cart</Button>
  </template>
</CardWrapper>`,
      },
    },
  },
}

export const BlogPostCard: Story = {
  render: () => ({
    components: { CardWrapper },
    template: `
      <div class="max-w-md">
        <CardWrapper
          clickable
          image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"
          imageAlt="Blog post"
          accent="primary"
          :headerDivider="false"
        >
          <div class="p-5 space-y-3">
            <div class="flex gap-2">
              <span class="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 rounded">Tutorial</span>
              <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 rounded">Vue.js</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">Building Reusable Components in Vue 3</h3>
            <p class="text-gray-600 dark:text-gray-400">Learn best practices for creating flexible, maintainable components using the Composition API.</p>
            <div class="flex items-center gap-3 pt-2">
              <div class="size-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
              <div class="text-sm">
                <p class="font-medium text-gray-900 dark:text-white">Jane Developer</p>
                <p class="text-gray-500 dark:text-gray-400">Jan 15, 2024 · 8 min read</p>
              </div>
            </div>
          </div>
        </CardWrapper>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  clickable
  image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop"
  image-alt="Blog post"
  accent="primary"
  :header-divider="false"
>
  <div class="p-5 space-y-3">
    <div class="flex gap-2">
      <span class="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded">Tutorial</span>
      <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">Vue.js</span>
    </div>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Building Reusable Components in Vue 3</h3>
    <p class="text-gray-600 dark:text-gray-400">Learn best practices for creating flexible, maintainable components...</p>
    <div class="flex items-center gap-3 pt-2">
      <div class="size-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
      <div class="text-sm">
        <p class="font-medium text-gray-900 dark:text-white">Jane Developer</p>
        <p class="text-gray-500 dark:text-gray-400">Jan 15, 2024 · 8 min read</p>
      </div>
    </div>
  </div>
</CardWrapper>`,
      },
    },
  },
}

export const CompleteExample: Story = {
  render: () => ({
    components: { CardWrapper, Button },
    template: `
      <CardWrapper
        title="Project Overview"
        description="Current sprint progress"
        icon="lucide:folder"
        shadow="lg"
        rounded="xl"
        border="default"
        padding="md"
      >
        <template #actions>
          <Button size="sm" variant="ghost" icon="lucide:more-horizontal" />
        </template>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600 dark:text-gray-400">Completion</span>
            <span class="font-semibold text-primary-600 dark:text-primary-400">75%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="bg-primary-500 h-2 rounded-full" style="width: 75%"></div>
          </div>
          <div class="flex gap-4 text-sm">
            <div>
              <span class="text-gray-500 dark:text-gray-400">Tasks</span>
              <p class="font-semibold dark:text-white">15/20</p>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">Days Left</span>
              <p class="font-semibold dark:text-white">5</p>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500 dark:text-gray-400">Updated 2h ago</span>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
        </template>
      </CardWrapper>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<CardWrapper
  title="Project Overview"
  description="Current sprint progress"
  icon="lucide:folder"
  shadow="lg"
  rounded="xl"
  border="default"
  padding="md"
>
  <template #actions>
    <Button size="sm" variant="ghost" icon="lucide:more-horizontal" />
  </template>

  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <span class="text-gray-600 dark:text-gray-400">Completion</span>
      <span class="font-semibold text-primary-600 dark:text-primary-400">75%</span>
    </div>
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div class="bg-primary-500 h-2 rounded-full" style="width: 75%"></div>
    </div>
    <div class="flex gap-4 text-sm">
      <div>
        <span class="text-gray-500 dark:text-gray-400">Tasks</span>
        <p class="font-semibold dark:text-white">15/20</p>
      </div>
      <div>
        <span class="text-gray-500 dark:text-gray-400">Days Left</span>
        <p class="font-semibold dark:text-white">5</p>
      </div>
    </div>
  </div>

  <template #footer>
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500 dark:text-gray-400">Updated 2h ago</span>
      <Button size="sm" variant="outline">View Details</Button>
    </div>
  </template>
</CardWrapper>`,
      },
    },
  },
}
