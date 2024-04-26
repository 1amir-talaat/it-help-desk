import {
  IconApps,
  IconBarrierBlock,
  IconChecklist,
  IconError404,
  IconExclamationCircle,
  IconLayoutDashboard,
  IconServerOff,
  IconSettings,
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
    label: '3',
    href: '/tickets',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Customers',
    label: '',
    href: '/customers',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
    {
    title: 'Apps',
    label: '',
    href: '/apps',
    icon: <IconApps size={18} />,
  }
]
