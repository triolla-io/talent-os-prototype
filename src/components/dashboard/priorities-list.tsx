import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { mockPriorities } from '@/lib/mocks/priorities'
import type { Priority } from '@/types'
import { cn } from '@/lib/utils'

function urgencyBadgeVariant(urgency: Priority['urgency']) {
  if (urgency === 'high') return 'destructive'
  if (urgency === 'medium') return 'default'
  return 'secondary'
}

export function PrioritiesList() {
  const [priorities, setPriorities] = useState(mockPriorities)

  const toggle = (id: string) => {
    setPriorities((prev) => prev.map((p) => (p.id === id ? { ...p, completed: !p.completed } : p)))
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-base">Today's Priorities</h2>
        <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-ai-amber/10 text-ai-amber border border-ai-amber/20">
          <Sparkles className="w-2.5 h-2.5" />
          AI Suggested
        </span>
      </div>

      <ul className="space-y-2">
        {priorities.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
          >
            <button
              onClick={() => toggle(p.id)}
              className={cn(
                'w-full flex items-start gap-3 px-3 py-2.5 rounded-lg text-left transition-colors',
                !p.completed && 'hover:bg-muted/50',
              )}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  'mt-0.5 w-4 h-4 shrink-0 rounded border-2 flex items-center justify-center transition-all',
                  p.completed ? 'bg-success border-success' : 'border-border bg-background',
                )}
              >
                <AnimatePresence>
                  {p.completed && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                      <Check className="w-2.5 h-2.5 text-success-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Text */}
              <span
                className={cn('flex-1 text-sm leading-snug transition-all', p.completed ? 'line-through opacity-40' : 'text-foreground')}
              >
                {p.type === 'ai-suggestion' && <Sparkles className="inline w-3 h-3 text-ai-amber mr-1 mb-0.5" />}
                {p.text}
              </span>

              {/* Badge */}
              <Badge variant={urgencyBadgeVariant(p.urgency)} className="shrink-0 text-[10px] capitalize">
                {p.urgency}
              </Badge>
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
