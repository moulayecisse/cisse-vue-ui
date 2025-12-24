import { describe, it, expect } from 'vitest'
import * as FeedbackComponents from './index'

describe('Feedback components index', () => {
  it('exports all feedback components', () => {
    expect(FeedbackComponents.LoadingSpinner).toBeDefined()
    expect(FeedbackComponents.Modal).toBeDefined()
    expect(FeedbackComponents.PaginationControls).toBeDefined()
    expect(FeedbackComponents.NotificationComponent).toBeDefined()
    expect(FeedbackComponents.NotificationList).toBeDefined()
    expect(FeedbackComponents.Alert).toBeDefined()
    expect(FeedbackComponents.EmptyState).toBeDefined()
    expect(FeedbackComponents.Toast).toBeDefined()
    expect(FeedbackComponents.ToastContainer).toBeDefined()
    expect(FeedbackComponents.Progress).toBeDefined()
    expect(FeedbackComponents.Skeleton).toBeDefined()
    expect(FeedbackComponents.TableSkeleton).toBeDefined()
    expect(FeedbackComponents.CardSkeleton).toBeDefined()
    expect(FeedbackComponents.ListSkeleton).toBeDefined()
    expect(FeedbackComponents.ConfirmDialog).toBeDefined()
  })

  it('exports all components as Vue components', () => {
    const components = [
      FeedbackComponents.LoadingSpinner,
      FeedbackComponents.Modal,
      FeedbackComponents.Alert,
      FeedbackComponents.Toast,
      FeedbackComponents.Progress,
      FeedbackComponents.Skeleton,
    ]

    components.forEach((component) => {
      expect(component).toHaveProperty('__name')
    })
  })
})
