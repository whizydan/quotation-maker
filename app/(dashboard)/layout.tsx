'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Menu,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const navItems = [
  { href: '/quotations', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/export', label: 'Export Data', icon: FileText },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  const Sidebar = ({ pathname }: { pathname: string }) => {
    const isActive = (href: string) =>
      pathname === href || pathname.startsWith(href + '/')
  
    return (
      <aside className="flex flex-col w-64 bg-background border-r h-full p-4">
        <nav className="flex-1 space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition',
                isActive(href) && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t">
          <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://user-images.githubusercontent.com/5709133/50445980-88299a80-0912-11e9-962a-6fd92fd18027.png" alt="user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="text-sm">user@example.com</div>
          </Link>
        </div>
      </aside>
    )
  }
  
  return (
    <div className="flex h-screen">
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
            </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
            <VisuallyHidden>
                <DialogTitle>Navigation Menu</DialogTitle>
            </VisuallyHidden>
            <Sidebar pathname={pathname} />
            </SheetContent>
        </Sheet>
        </div>

      {/* Desktop sidebar */}
        <div className="hidden md:block fixed h-screen w-64">
            <Sidebar pathname={pathname} />
        </div>

      <main className="flex-1 ml-0 md:ml-64 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  )
}