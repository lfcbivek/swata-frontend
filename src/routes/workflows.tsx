import { createFileRoute } from '@tanstack/react-router'
import WorkflowContainer from '@/components/WorkflowContainer'

export const Route = createFileRoute('/workflows')({
  component: WorkflowContainer,
})