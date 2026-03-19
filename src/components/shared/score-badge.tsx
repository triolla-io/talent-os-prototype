import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

interface ScoreBadgeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ScoreBadge({ score, size = 'md', className }: ScoreBadgeProps) {
  const sizeMap = { sm: 32, md: 44, lg: 56 }
  const fontSizeMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }
  const strokeWidthMap = { sm: 3, md: 3.5, lg: 4 }
  const s = sizeMap[size]
  const strokeWidth = strokeWidthMap[size]
  const radius = (s - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color = score >= 80 ? 'stroke-success' : score >= 60 ? 'stroke-warning' : 'stroke-destructive'

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: s, height: s }}>
      <svg width={s} height={s} className="-rotate-90">
        <circle cx={s / 2} cy={s / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
        <motion.circle
          cx={s / 2}
          cy={s / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={color}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <span className={cn('absolute font-bold', fontSizeMap[size])}>{score}</span>
    </div>
  )
}
