import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Avatar from './Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
    },
    rounded: {
      control: 'select',
      options: ['full', 'lg', 'md'],
    },
    color: {
      control: 'select',
      options: [
        undefined, 'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green',
        'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple',
        'fuchsia', 'pink', 'rose',
      ],
    },
    autoColor: {
      control: 'boolean',
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    name: { control: 'text' },
  },
  args: {
    size: 'md',
    rounded: 'full',
    autoColor: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar />`,
      },
    },
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar src="https://i.pravatar.cc/150?img=1" alt="User avatar" />`,
      },
    },
  },
}

export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar name="John Doe" />`,
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-end gap-4">
        <Avatar size="xs" name="XS" />
        <Avatar size="sm" name="SM" />
        <Avatar size="md" name="MD" />
        <Avatar size="lg" name="LG" />
        <Avatar size="xl" name="XL" />
        <Avatar size="2xl" name="2X" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />
<Avatar size="2xl" name="2X" />`,
      },
    },
  },
}

export const WithStatus: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Online" status="online" />
        <Avatar name="Offline" status="offline" />
        <Avatar name="Away" status="away" />
        <Avatar name="Busy" status="busy" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar name="Online" status="online" />
<Avatar name="Offline" status="offline" />
<Avatar name="Away" status="away" />
<Avatar name="Busy" status="busy" />`,
      },
    },
  },
}

export const RoundedVariants: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <Avatar name="Full" rounded="full" />
        <Avatar name="Large" rounded="lg" />
        <Avatar name="Medium" rounded="md" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar name="Full" rounded="full" />
<Avatar name="Large" rounded="lg" />
<Avatar name="Medium" rounded="md" />`,
      },
    },
  },
}

export const ImageWithStatus: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    status: 'online',
    size: 'lg',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar src="https://i.pravatar.cc/150?img=3" status="online" size="lg" />`,
      },
    },
  },
}

export const ManualColor: Story = {
  args: {
    name: 'John Doe',
    color: 'blue',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar name="John Doe" color="blue" />`,
      },
    },
  },
}

export const AutoColorFromName: Story = {
  name: 'Auto Color (WhatsApp style)',
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-4">
        <Avatar name="Alice Martin" autoColor />
        <Avatar name="Bob Smith" autoColor />
        <Avatar name="Charlie Brown" autoColor />
        <Avatar name="Diana Ross" autoColor />
        <Avatar name="Edward King" autoColor />
        <Avatar name="Fiona Green" autoColor />
        <Avatar name="George White" autoColor />
        <Avatar name="Hannah Black" autoColor />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar name="Alice Martin" autoColor />
<Avatar name="Bob Smith" autoColor />
<Avatar name="Charlie Brown" autoColor />`,
      },
    },
  },
}

export const AllColors: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Avatar name="G" color="gray" />
        <Avatar name="R" color="red" />
        <Avatar name="O" color="orange" />
        <Avatar name="A" color="amber" />
        <Avatar name="Y" color="yellow" />
        <Avatar name="L" color="lime" />
        <Avatar name="G" color="green" />
        <Avatar name="E" color="emerald" />
        <Avatar name="T" color="teal" />
        <Avatar name="C" color="cyan" />
        <Avatar name="S" color="sky" />
        <Avatar name="B" color="blue" />
        <Avatar name="I" color="indigo" />
        <Avatar name="V" color="violet" />
        <Avatar name="P" color="purple" />
        <Avatar name="F" color="fuchsia" />
        <Avatar name="P" color="pink" />
        <Avatar name="R" color="rose" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<Avatar name="G" color="gray" />
<Avatar name="R" color="red" />
<Avatar name="B" color="blue" />
<Avatar name="G" color="green" />
<Avatar name="P" color="purple" />
<!-- and more colors... -->`,
      },
    },
  },
}

export const ColorPriority: Story = {
  name: 'Color Priority (manual > autoColor)',
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-center gap-4">
        <div class="text-center">
          <Avatar name="Alice" autoColor />
          <p class="text-xs text-gray-500 mt-1">autoColor</p>
        </div>
        <div class="text-center">
          <Avatar name="Alice" color="pink" />
          <p class="text-xs text-gray-500 mt-1">color="pink"</p>
        </div>
        <div class="text-center">
          <Avatar name="Alice" autoColor color="pink" />
          <p class="text-xs text-gray-500 mt-1">both (color wins)</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      source: {
        code: `<!-- Auto color from name -->
<Avatar name="Alice" autoColor />

<!-- Manual color -->
<Avatar name="Alice" color="pink" />

<!-- Both: manual color takes priority -->
<Avatar name="Alice" autoColor color="pink" />`,
      },
    },
  },
}
