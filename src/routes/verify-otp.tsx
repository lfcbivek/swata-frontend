import { createFileRoute } from '@tanstack/react-router'
import OtpPage from '@/components/OtpPage'

export const Route = createFileRoute('/verify-otp')({
  validateSearch: (search) => ({
    userId: String(search.userId),
  }),
  component: OtpPage,
  staticData: { noLayout: true },
})