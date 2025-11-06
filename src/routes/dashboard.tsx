import { createFileRoute } from '@tanstack/react-router'
import DashboardContainer from '@/components/DashboardContainer'

export const Route = createFileRoute('/dashboard')({
  component: DashboardContainer,
})
