import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/router'


// Order is important for the two styling files below.
import './index.css';
import './styles/main.scss';


const App = () => {
  const tenantSlug = window.location.hostname.split('.')[0]
  return <RouterProvider router={router} context={{ tenantSlug }} />
}

const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
