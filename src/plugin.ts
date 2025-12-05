import type { App, Plugin, Component } from 'vue'
import * as components from './components'

export interface PluginOptions {
  /** Optional prefix for component names (e.g., 'Ui' makes CardComponent -> UiCardComponent) */
  prefix?: string
  /** List of specific components to register. If not provided, all components are registered */
  components?: string[]
}

/**
 * Vue plugin for global component registration
 *
 * @example
 * // Register all components
 * app.use(VueTailwindUI)
 *
 * @example
 * // Register with prefix
 * app.use(VueTailwindUI, { prefix: 'Ui' })
 *
 * @example
 * // Register specific components only
 * app.use(VueTailwindUI, { components: ['CardComponent', 'TableComponent'] })
 */
const VueTailwindUI: Plugin = {
  install(app: App, options: PluginOptions = {}) {
    const { prefix = '', components: selectedComponents } = options

    const allComponents = components as Record<string, Component>

    const componentsToRegister = selectedComponents
      ? Object.fromEntries(
          Object.entries(allComponents).filter(([name]) =>
            selectedComponents.includes(name),
          ),
        )
      : allComponents

    for (const [name, component] of Object.entries(componentsToRegister)) {
      app.component(`${prefix}${name}`, component)
    }
  },
}

export default VueTailwindUI
