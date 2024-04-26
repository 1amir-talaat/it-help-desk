import { cn } from '@/lib/utils'


interface TopNavProps extends React.HTMLAttributes<HTMLElement> {
  links: {
    title: string
    href: string
    isActive: boolean
  }[]
}

export function TopNav({ className, ...props }: TopNavProps) {
  return (
    <>
      <nav
        className={cn(
          'hidden items-center space-x-4 md:flex lg:space-x-6',
          className
        )}
        {...props}
      >
      </nav>
    </>
  )
}
