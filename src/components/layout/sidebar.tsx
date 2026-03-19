import { motion } from 'motion/react'
import { LayoutDashboard, Kanban, Users, Briefcase, Bot, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PageId } from '@/types'

const NAV_ITEMS = [
  { id: 'dashboard' as PageId, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'pipeline' as PageId, label: 'Pipeline', icon: Kanban },
  { id: 'talent-pool' as PageId, label: 'Talent Pool', icon: Users },
  { id: 'jobs' as PageId, label: 'Job Openings', icon: Briefcase },
  { id: 'ai-agents' as PageId, label: 'AI Agents', icon: Bot },
  { id: 'reports' as PageId, label: 'Reports', icon: BarChart3 },
]

interface SidebarProps {
  activePage: PageId
  onNavigate: (page: PageId) => void
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-4rem)] sticky top-16 border-r border-sidebar-border bg-sidebar overflow-y-auto">
      <nav className="flex-1 p-3 space-y-0.5">
        {NAV_ITEMS.map((item, index) => {
          const isActive = activePage === item.id
          const Icon = item.icon

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              )}
            >
              {/* Sliding active indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-sidebar-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                className={cn('w-4 h-4 shrink-0 transition-colors', isActive ? 'text-sidebar-primary' : 'text-sidebar-foreground/70')}
              />
              <span className="truncate">{item.label}</span>

              {/* Active dot for AI Agents */}
              {item.id === 'ai-agents' && (
                <span className="ml-auto flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                </span>
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Bottom "Powered by AI" badge */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 px-2">
          <div className="w-5 h-5 rounded-md bg-linear-to-br from-ai-amber to-ai-coral flex items-center justify-center">
            <Bot className="w-3 h-3 text-white" />
          </div>
          <span className="ai-shimmer text-xs font-semibold">Powered by Triolla AI</span>
        </div>
      </div>
    </aside>
  )
}
