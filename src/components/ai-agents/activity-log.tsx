import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle2, Loader2, XCircle, Activity } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AIShimmer } from '@/components/shared/ai-shimmer'
import { mockAgents, mockActivityPool } from '@/lib/mocks/agents'
import type { AgentActivity } from '@/types'

function relativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const agentNameMap = Object.fromEntries(mockAgents.map((a) => [a.id, a.name]))

// Assign a subtle accent color per agent for visual differentiation
const AGENT_COLORS: Record<string, string> = {
  'agent-1': 'oklch(0.55 0.25 275 / 0.8)',
  'agent-2': 'oklch(0.72 0.18 40 / 0.8)',
  'agent-3': 'oklch(0.72 0.19 160 / 0.8)',
  'agent-4': 'oklch(0.78 0.16 75 / 0.8)',
  'agent-5': 'oklch(0.65 0.2 310 / 0.8)',
  'agent-6': 'oklch(0.72 0.18 40 / 0.6)',
}

function getInitialActivities(): AgentActivity[] {
  return mockAgents.flatMap((a) => a.activities).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function ActivityLog() {
  const [activities, setActivities] = useState<AgentActivity[]>(getInitialActivities)
  const poolIndex = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const next = mockActivityPool[poolIndex.current % mockActivityPool.length]
      poolIndex.current += 1
      const liveActivity: AgentActivity = {
        ...next,
        id: `live-${Date.now()}`,
        timestamp: new Date().toISOString(),
      }
      setActivities((prev) => [liveActivity, ...prev].slice(0, 30))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const completedCount = activities.filter((a) => a.status === 'completed').length
  const failedCount = activities.filter((a) => a.status === 'failed').length

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-border/50 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-ai-amber/20 to-ai-coral/10 flex items-center justify-center">
              <Activity className="w-3.5 h-3.5 text-ai-amber" />
            </div>
            <CardTitle className="text-sm font-semibold">
              <AIShimmer>Live Activity Feed</AIShimmer>
            </CardTitle>
          </div>

          {/* Mini stats */}
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-success" />
              <span className="font-semibold tabular-nums text-success">{completedCount}</span>
              <span className="text-muted-foreground">done</span>
            </div>
            {failedCount > 0 && (
              <div className="flex items-center gap-1">
                <XCircle className="w-3 h-3 text-destructive" />
                <span className="font-semibold tabular-nums text-destructive">{failedCount}</span>
                <span className="text-muted-foreground">failed</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              <span className="text-muted-foreground">live</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-0">
        <div className="max-h-72 overflow-y-auto">
          <AnimatePresence initial={false}>
            {activities.map((activity) => {
              const agentColor = AGENT_COLORS[activity.agentId] ?? 'oklch(0.55 0.25 275 / 0.7)'
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-start gap-3 px-4 py-2.5 border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors group"
                >
                  {/* Agent color stripe */}
                  <div className="w-0.5 self-stretch rounded-full shrink-0 mt-0.5 mb-0.5 opacity-70" style={{ background: agentColor }} />

                  {/* Status icon */}
                  <div className="mt-0.5 shrink-0">
                    {activity.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
                    {activity.status === 'in-progress' && <Loader2 className="w-3.5 h-3.5 text-warning animate-spin" />}
                    {activity.status === 'failed' && <XCircle className="w-3.5 h-3.5 text-destructive" />}
                  </div>

                  {/* Content */}
                  <p className="flex-1 text-xs leading-relaxed min-w-0">
                    <span className="font-semibold">{agentNameMap[activity.agentId] ?? activity.agentId}</span>
                    <span className="text-muted-foreground mx-1">—</span>
                    <span className="text-muted-foreground">{activity.action} for </span>
                    <span className="font-medium text-foreground">{activity.target}</span>
                  </p>

                  {/* Timestamp */}
                  <span className="text-[11px] text-muted-foreground shrink-0 tabular-nums opacity-70 group-hover:opacity-100 transition-opacity">
                    {relativeTime(activity.timestamp)}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
