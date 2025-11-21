'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Upload,
  Wallet
} from 'lucide-react'

const navigation = [
  { name: 'Дашборд', href: '/', icon: LayoutDashboard },
  { name: 'Подписки', href: '/subscriptions', icon: Receipt },
  { name: 'Карты', href: '/cards', icon: CreditCard },
  { name: 'Аналитика', href: '/analytics', icon: BarChart3 },
  { name: 'AI Импорт', href: '/import', icon: Upload },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Wallet className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-bold">SubManager</span>
      </div>
      
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      
      <div className="border-t border-border p-4">
        <div className="text-xs text-muted-foreground">
          Версия 1.0.0
        </div>
      </div>
    </div>
  )
}
