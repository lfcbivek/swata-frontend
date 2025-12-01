import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { AuthContextType } from '@/context/AuthContext'

// Extend the router context type
declare module '@tanstack/react-router' {
  interface RouterContext {
    auth: AuthContextType
  }
}

// Create the router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // Will be injected in main.tsx
  },
})
