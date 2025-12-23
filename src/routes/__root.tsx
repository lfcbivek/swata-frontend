import {
  createRootRoute,
  redirect,
  Outlet,
  useMatches,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AppLayout from '@/common/AppLayout'
import { authStore } from '@/store/authStore'

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

export const Route = createRootRoute({
  component: Root,

  beforeLoad: () => {
    const { token ,user } = authStore.getState();
    const isLoggedIn = token ? true : false;
    const path = location.pathname
    const publicRoutes = ['/login', '/get-started', '/verify-otp']
    const currentTenantSlug = window.location.hostname.split('.')[0]
    if (!isLoggedIn) {
      if (!publicRoutes.includes(path)) {
        throw redirect({ to: '/login' })
      }
      return
    }

    const userTenant = user?.tenant?.slug
    if (!userTenant) return
    const isDev = import.meta.env.VITE_APP_ENVIRONMENT;
    const dashboardUrl = isDev ? `http://${userTenant}.swata.localhost/dashboard` : `https://${userTenant}.swata.com/dashboard`;
    //Logged in but on wrong tenant, redirect to correct one
    // if (tenantSlug && tenantSlug !== userTenant) {
    //   window.location.href = dashboardUrl;
    //   return
    // }

    // //Logged in and on app domain, redirect
    // const isOnAppDomain = tenantSlug === null
    // if (isOnAppDomain) {
    //   window.location.href = dashboardUrl;
    //   return
    // }
  },
})
