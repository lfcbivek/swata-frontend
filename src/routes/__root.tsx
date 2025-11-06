import { createRootRoute, Link, Outlet, useMatches } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import AppLayout from '@/common/AppLayout'

const Root = () => {
  const matches = useMatches()
  // If any matched route sets staticData.noLayout = true, skip the Layout
  const noLayout = matches.some((m:any) => m.staticData?.noLayout)

  const content = <Outlet />
  return (
    <>
      {noLayout ? content : <AppLayout>{content}</AppLayout>}
      <TanStackRouterDevtools />
    </>
  )
}
export const Route = createRootRoute({
  component: Root
})
