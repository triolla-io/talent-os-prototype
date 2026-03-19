import { TopNav } from './top-nav'
import { Sidebar } from './sidebar'
import { MobileNav } from './mobile-nav'
import type { PageId } from '@/types'

interface AppLayoutProps {
  activePage: PageId
  onNavigate: (page: PageId) => void
  children: React.ReactNode
}

export function AppLayout({ activePage, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 md:p-8 pb-24 md:pb-8 overflow-y-auto">{children}</main>
      </div>
      <MobileNav activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
