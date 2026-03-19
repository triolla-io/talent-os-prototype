import { motion } from 'motion/react'
import { Brain, Lightbulb, Target, AlertTriangle } from 'lucide-react'
import { mockInsights } from '@/lib/mocks/priorities'
import type { AIInsight } from '@/types'

const TYPE_CONFIG: Record<AIInsight['type'], { icon: typeof Lightbulb; iconClass: string; bgClass: string }> = {
  prediction: {
    icon: Lightbulb,
    iconClass: 'text-primary',
    bgClass: 'bg-primary/8',
  },
  recommendation: {
    icon: Target,
    iconClass: 'text-success',
    bgClass: 'bg-success/8',
  },
  alert: {
    icon: AlertTriangle,
    iconClass: 'text-ai-amber',
    bgClass: 'bg-ai-amber/10',
  },
}

export function AIInsightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-xl h-full"
    >
      <div className="ai-glow-border rounded-xl h-full">
        <div className="bg-card bg-linear-to-br from-ai-amber/3 to-ai-coral/3 rounded-xl p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-ai-amber to-ai-coral flex items-center justify-center shrink-0">
              <Brain className="w-3.5 h-3.5 text-white" />
            </div>
            <h2 className="font-bold text-base">AI Insights</h2>
          </div>

          {/* Insights */}
          <div className="flex flex-col gap-3 flex-1">
            {mockInsights.map((insight, i) => {
              const { icon: Icon, iconClass, bgClass } = TYPE_CONFIG[insight.type]
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <div className="flex gap-3 items-start">
                    <div className={`w-7 h-7 rounded-lg ${bgClass} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon className={`w-3.5 h-3.5 ${iconClass}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug text-foreground/90">{insight.text}</p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${insight.confidence}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                            className="h-full rounded-full bg-linear-to-r from-ai-amber to-ai-coral"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-ai-amber shrink-0">{insight.confidence}%</span>
                      </div>
                    </div>
                  </div>
                  {i < mockInsights.length - 1 && <div className="mt-3 border-t border-border/50" />}
                </motion.div>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border/50">
            <p className="text-[11px] text-center">
              <span className="ai-shimmer font-semibold">Powered by Triolla AI</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
