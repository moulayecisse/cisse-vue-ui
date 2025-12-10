import type { Meta, StoryObj } from '@storybook/vue3'
import Timeline from './Timeline.vue'

const meta: Meta<typeof Timeline> = {
  title: 'Core/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Order Placed',
        description: 'Your order has been placed successfully',
        date: 'Jan 15, 2024',
        status: 'completed',
      },
      {
        key: '2',
        title: 'Processing',
        description: 'Your order is being processed',
        date: 'Jan 16, 2024',
        status: 'completed',
      },
      {
        key: '3',
        title: 'Shipped',
        description: 'Your order has been shipped',
        date: 'Jan 17, 2024',
        status: 'current',
      },
      {
        key: '4',
        title: 'Delivered',
        description: 'Estimated delivery',
        date: 'Jan 20, 2024',
        status: 'upcoming',
      },
    ],
  },
}

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    items: [
      { key: '1', title: 'Step 1', status: 'completed' },
      { key: '2', title: 'Step 2', status: 'completed' },
      { key: '3', title: 'Step 3', status: 'current' },
      { key: '4', title: 'Step 4', status: 'upcoming' },
      { key: '5', title: 'Step 5', status: 'upcoming' },
    ],
  },
}

export const WithError: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Payment Initiated',
        description: 'Transaction started',
        status: 'completed',
      },
      {
        key: '2',
        title: 'Verification',
        description: 'Verifying payment details',
        status: 'completed',
      },
      {
        key: '3',
        title: 'Payment Failed',
        description: 'Card declined - insufficient funds',
        status: 'error',
      },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Account Created',
        description: 'Welcome to the platform!',
        icon: 'heroicons:user-plus',
        status: 'completed',
      },
      {
        key: '2',
        title: 'Profile Setup',
        description: 'Added profile information',
        icon: 'heroicons:identification',
        status: 'completed',
      },
      {
        key: '3',
        title: 'First Purchase',
        description: 'Make your first purchase',
        icon: 'heroicons:shopping-cart',
        status: 'current',
      },
      {
        key: '4',
        title: 'Leave Review',
        description: 'Share your experience',
        icon: 'heroicons:star',
        status: 'upcoming',
      },
    ],
  },
}

export const ProjectTimeline: Story = {
  args: {
    items: [
      {
        key: '1',
        title: 'Project Kickoff',
        description: 'Initial meeting and requirements gathering',
        date: 'Week 1',
        status: 'completed',
      },
      {
        key: '2',
        title: 'Design Phase',
        description: 'UI/UX design and prototyping',
        date: 'Week 2-3',
        status: 'completed',
      },
      {
        key: '3',
        title: 'Development',
        description: 'Frontend and backend implementation',
        date: 'Week 4-8',
        status: 'current',
      },
      {
        key: '4',
        title: 'Testing',
        description: 'QA testing and bug fixes',
        date: 'Week 9-10',
        status: 'upcoming',
      },
      {
        key: '5',
        title: 'Launch',
        description: 'Production deployment',
        date: 'Week 11',
        status: 'upcoming',
      },
    ],
  },
}

export const SimpleSteps: Story = {
  args: {
    items: [
      { key: '1', title: 'Sign Up', status: 'completed' },
      { key: '2', title: 'Verify Email', status: 'completed' },
      { key: '3', title: 'Complete Profile', status: 'current' },
      { key: '4', title: 'Start Using', status: 'upcoming' },
    ],
  },
}
