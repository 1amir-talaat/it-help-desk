import {
  IconApps,
  IconLayoutDashboard,
  IconSettings, 
  IconChecklist,
  IconUsers,
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Tickets',
    label: '',
    href: '/admin/tickets',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Customers',
    label: '',
    href: '/admin/customers',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/admin/settings',
    icon: <IconSettings size={18} />,
  },
  {
    title: 'Apps',
    label: '',
    href: '/admin/apps',
    icon: <IconApps size={18} />,
  }
]
