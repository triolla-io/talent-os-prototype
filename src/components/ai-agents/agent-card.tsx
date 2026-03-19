import { useState } from 'react'
import { motion } from 'motion/react'
import { Sparkles, Mail, ClipboardCheck, Copy, Heart, Calendar, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { AIAgent } from '@/types'

const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Mail,
  ClipboardCheck,
  Copy,
  Heart,
  Calendar,
}

interface AgentCardProps {
  agent: AIAgent
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isActive, setIsActive] = useState(agent.status === 'active')

  const handleToggle = () => {
    const next = !isActive
    setIsActive(next)
    if (next) {
      toast.success(`${agent.name} activated`)
    } else {
      toast(`${agent.name} paused`)
    }
  }

  const Icon = ICON_MAP[agent.icon] ?? Sparkles

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.2 }}
      className={cn('relative rounded-xl transition-all duration-300', isActive ? 'ai-glow-border' : '')}
    >
      <div
        className={cn(
          'relative bg-card rounded-xl p-5 h-full ring-1 ring-foreground/10 transition-all duration-300 overflow-hidden',
          isActive && 'bg-linear-to-br from-success/3 via-card to-card',
        )}
      >
        {/* Decorative orb for active state */}
        {isActive && (
          <div
            className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, oklch(0.72 0.19 160 / 0.15) 0%, transparent 70%)',
              transform: 'translate(35%, -35%)',
            }}
          />
        )}

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={cn(
                'p-2.5 rounded-xl shrink-0 transition-all duration-300',
                isActive ? 'bg-linear-to-br from-success/20 to-success/5 shadow-sm' : 'bg-muted',
              )}
            >
              <Icon className={cn('w-4 h-4 transition-colors duration-300', isActive ? 'text-success' : 'text-muted-foreground')} />
            </div>

            <div className="min-w-0 pt-0.5">
              <p className="font-semibold text-sm leading-tight truncate">{agent.name}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                {isActive && (
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                  </span>
                )}
                <span
                  className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded-full border transition-colors duration-300',
                    isActive
                      ? 'border-success/30 text-success bg-success/8'
                      : agent.status === 'paused'
                        ? 'border-warning/30 text-warning bg-warning/8'
                        : 'border-border text-muted-foreground',
                  )}
                >
                  {isActive ? 'active' : agent.status === 'paused' ? 'paused' : 'idle'}
                </span>
              </div>
            </div>
          </div>

          {/* Toggle switch */}
          <button
            onClick={handleToggle}
            aria-label={isActive ? `Deactivate ${agent.name}` : `Activate ${agent.name}`}
            className={cn(
              'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 mt-0.5',
              isActive ? 'bg-success' : 'bg-muted-foreground/25',
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200',
                isActive ? 'translate-x-4' : 'translate-x-0',
              )}
            />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">{agent.description}</p>

        {/* Stats */}
        <div className="space-y-3">
          {/* Success rate bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-muted-foreground font-medium">Success rate</span>
              <span className={cn('text-[11px] font-bold tabular-nums', isActive ? 'text-success' : 'text-foreground')}>
                {agent.successRate}%
              </span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${agent.successRate}%` }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={cn('h-full rounded-full', isActive ? 'bg-linear-to-r from-success/70 to-success' : 'bg-muted-foreground/40')}
              />
            </div>
          </div>

          {/* Processed today */}
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[11px] text-muted-foreground font-medium">Processed today</span>
            <span className="text-[11px] font-bold tabular-nums">{isActive ? agent.processedToday : 0}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
