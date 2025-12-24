import { ref, computed, type Ref } from 'vue'

let idCounter = 0

/**
 * Generates a unique ID for accessibility relationships (aria-labelledby, aria-describedby, etc.)
 * Pattern: cisse-{prefix}-{counter}
 */
export function generateId(prefix = 'id'): string {
  idCounter++
  return `cisse-${prefix}-${idCounter}`
}

/**
 * Resets the ID counter (useful for testing)
 */
export function resetIdCounter(): void {
  idCounter = 0
}

export interface UseIdOptions {
  /** Prefix for the generated ID */
  prefix?: string
  /** Custom ID to use instead of generating one */
  id?: string
}

export interface UseIdReturn {
  /** The unique ID (reactive) */
  id: Ref<string>
  /** Generate a related ID with a suffix (e.g., id-label, id-description) */
  related: (suffix: string) => string
}

/**
 * Composable for generating unique IDs for accessibility relationships
 *
 * @example
 * ```vue
 * <script setup>
 * const { id, related } = useId({ prefix: 'modal' })
 * // id.value = 'cisse-modal-1'
 * // related('title') = 'cisse-modal-1-title'
 * // related('description') = 'cisse-modal-1-description'
 * </script>
 *
 * <template>
 *   <div :id="id" role="dialog" :aria-labelledby="related('title')">
 *     <h2 :id="related('title')">Modal Title</h2>
 *   </div>
 * </template>
 * ```
 */
export function useId(options: UseIdOptions = {}): UseIdReturn {
  const { prefix = 'id', id: customId } = options

  const id = ref(customId || generateId(prefix))

  const related = (suffix: string): string => {
    return `${id.value}-${suffix}`
  }

  return {
    id,
    related,
  }
}
