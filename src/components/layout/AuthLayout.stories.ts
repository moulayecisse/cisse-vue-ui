import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AuthLayout from './AuthLayout.vue'

const meta: Meta<typeof AuthLayout> = {
  title: 'Layout/AuthLayout',
  component: AuthLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    appName: { control: 'text' },
    appIcon: { control: 'text' },
    headline: { control: 'text' },
    subHeadline: { control: 'text' },
    description: { control: 'text' },
    gradientFrom: { control: 'text' },
    gradientVia: { control: 'text' },
    gradientTo: { control: 'text' },
    showDecorations: { control: 'boolean' },
    showPattern: { control: 'boolean' },
    underlineColor: { control: 'color' },
    formTitle: { control: 'text' },
    formSubtitle: { control: 'text' },
    homeLink: { control: 'text' },
    brandingAnimation: { control: 'text' },
    formAnimation: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const defaultFeatures = [
  { icon: 'lucide:users', text: 'User management' },
  { icon: 'lucide:shield', text: 'Secure authentication' },
  { icon: 'lucide:zap', text: 'Fast performance' },
]

export const Default: Story = {
  args: {
    appName: 'My App',
    appIcon: 'lucide:box',
    headline: 'Welcome to',
    subHeadline: 'My Application',
    description: 'Sign in to access your account and manage your resources.',
    features: defaultFeatures,
    formTitle: 'Sign In',
    formSubtitle: 'Enter your credentials to continue',
  },
  render: (args) => ({
    components: { AuthLayout },
    setup: () => ({ args }),
    template: `
      <AuthLayout v-bind="args">
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </AuthLayout>
    `,
  }),
}

export const WithCustomGradient: Story = {
  args: {
    appName: 'Brand',
    appIcon: 'lucide:star',
    headline: 'Join the',
    subHeadline: 'Community',
    description: 'Create an account and start exploring.',
    gradientFrom: 'from-purple-700',
    gradientVia: 'via-indigo-600',
    gradientTo: 'to-blue-800',
    underlineColor: 'rgba(196, 181, 253, 0.5)',
    formTitle: 'Create Account',
    formSubtitle: 'Get started in minutes',
    features: [
      { icon: 'lucide:rocket', text: 'Quick setup' },
      { icon: 'lucide:heart', text: 'Community support' },
      { icon: 'lucide:gift', text: 'Free tier available' },
    ],
  },
  render: (args) => ({
    components: { AuthLayout },
    setup: () => ({ args }),
    template: `
      <AuthLayout v-bind="args">
        <form class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                type="text"
                placeholder="John"
                class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create password"
              class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
          >
            Create Account
          </button>
        </form>
      </AuthLayout>
    `,
  }),
}

export const MinimalBranding: Story = {
  args: {
    appName: 'App',
    appIcon: 'lucide:circle',
    formTitle: 'Login',
    showDecorations: false,
    showPattern: false,
  },
  render: (args) => ({
    components: { AuthLayout },
    setup: () => ({ args }),
    template: `
      <AuthLayout v-bind="args">
        <form class="space-y-4">
          <input
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            class="w-full py-3 bg-primary-600 text-white rounded-xl font-medium"
          >
            Continue
          </button>
        </form>
      </AuthLayout>
    `,
  }),
}

export const WithCustomSlots: Story = {
  args: {
    formTitle: 'Welcome Back',
    formSubtitle: 'Sign in to your account',
  },
  render: (args) => ({
    components: { AuthLayout },
    setup: () => ({ args }),
    template: `
      <AuthLayout v-bind="args">
        <template #branding-logo>
          <div class="flex items-center gap-3">
            <div class="size-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
              A
            </div>
            <span class="text-2xl font-bold text-white">Acme Corp</span>
          </div>
        </template>

        <template #branding-headline>
          <h1 class="text-4xl font-bold text-white mb-6">
            Manage your<br />
            <span class="text-yellow-300">business smarter</span>
          </h1>
        </template>

        <template #branding-content>
          <div class="mt-8 flex items-center gap-4">
            <div class="flex -space-x-2">
              <div class="size-8 rounded-full bg-white/20 border-2 border-white/30"></div>
              <div class="size-8 rounded-full bg-white/20 border-2 border-white/30"></div>
              <div class="size-8 rounded-full bg-white/20 border-2 border-white/30"></div>
            </div>
            <span class="text-white/80 text-sm">Join 10,000+ businesses</span>
          </div>
        </template>

        <form class="space-y-4">
          <input
            type="email"
            placeholder="Email"
            class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
          />
          <input
            type="password"
            placeholder="Password"
            class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            class="w-full py-3 bg-primary-600 text-white rounded-xl font-medium"
          >
            Sign In
          </button>
        </form>

        <template #form-footer>
          <p class="text-center text-gray-500 dark:text-gray-400 mt-6 text-sm">
            Don't have an account?
            <a href="#" class="text-primary-600 font-medium">Sign up</a>
          </p>
        </template>
      </AuthLayout>
    `,
  }),
}

export const FormOnlyNobranding: Story = {
  args: {
    formTitle: 'Reset Password',
    formSubtitle: 'Enter your email to receive a reset link',
  },
  render: (args) => ({
    components: { AuthLayout },
    setup: () => ({ args }),
    template: `
      <AuthLayout v-bind="args">
        <form class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
          >
            Send Reset Link
          </button>
          <a href="#" class="block text-center text-primary-600 text-sm font-medium">
            Back to login
          </a>
        </form>
      </AuthLayout>
    `,
  }),
}
