import { createFileRoute } from '@tanstack/react-router'
import GetStarted from '@/components/GetStarted'

export const Route = createFileRoute('/get-started')({
  component: GetStarted,
  staticData: { noLayout: true },
})