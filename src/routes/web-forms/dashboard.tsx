import { createFileRoute } from '@tanstack/react-router'
import { ROUTE_PATHS } from '@/constants/routePaths'
import { WebFormDashboard } from '@/components/WebForms/WebFormDashboard'

export const Route = createFileRoute(ROUTE_PATHS.WEB_FORMS.DASHBOARD)({
  component: WebFormDashboard,
})
