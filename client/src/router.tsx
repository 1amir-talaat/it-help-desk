import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import AppShell from './components/app-shell'
import Dashboard from './pages/dashboard'
import Tickets from '@/pages/tickets'
import Customers from '@/pages/customers'
import Apps from '@/pages/apps'
import ComingSoon from '@/components/coming-soon'
import Settings from './pages/settings'
import Profile from './pages/settings/profile'
import Account from './pages/settings/account'
import Appearance from './pages/settings/appearance'
import Notifications from './pages/settings/notifications'
import Display from './pages/settings/display'
import ErrorExample from './pages/settings/error-example'

const routes = [
  // Auth routes
  { path: '/sign-in', Component: SignIn },
  { path: '/sign-up', Component: SignUp },

  // Main routes
  {
    path: '/',
    Component: AppShell,
    children: [
      { index: true, path: '/', Component: Dashboard },
      { path: 'tickets', Component: Tickets },
      { path: 'apps', Component: Apps },
      { path: 'customers', Component: Customers },
      {
        path: 'settings',
        Component: Settings,
        children: [
          { index: true, path: '/settings', Component: Profile },
          { path: 'account', Component: Account },
          { path: 'appearance', Component: Appearance },
          { path: 'notifications', Component: Notifications },
          { path: 'display', Component: Display },
          { path: 'error-example', Component: ErrorExample },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]

const router = createBrowserRouter(routes)

export default router
