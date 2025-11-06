import { createFileRoute } from '@tanstack/react-router'
import OtpPage from '@/components/OtpPage'

export const Route = createFileRoute('/verify-otp')({
  component: OtpPage,
  staticData: { noLayout: true },
})