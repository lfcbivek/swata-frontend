import {
  createRootRouteWithContext,
  redirect,
  Outlet,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AppLayout from '@/common/AppLayout'
import type { AuthContextType } from '@/context/AuthContext'

const Root = () => {
  const matches = useMatches()
  const noLayout = matches.some((m: any) => m.staticData?.noLayout)

  const content = <Outlet />

  return (
    <>
      {noLayout ? content : <AppLayout>{content}</AppLayout>}
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRouteWithContext<{ auth: AuthContextType }>()({
  component: Root,

  beforeLoad: ({ context, location }) => {
    const isLoggedIn = context.auth.isAuthenticated
    const path = location.pathname

    const publicRoutes = ['/login', '/get-started', '/verify-otpge']

    if (!isLoggedIn && !publicRoutes.includes(path)) {
      throw redirect({ to: '/login' })
    }
  },
})
