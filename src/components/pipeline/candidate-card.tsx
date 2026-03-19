import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type Candidate } from '@/types'
import { ScoreBadge } from '@/components/shared/score-badge'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface CandidateCardProps {
  candidate: Candidate
  isOverlay?: boolean
}

function getRelativeTime(dateStr: string) {
  const diffDays = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  return `${diffDays} days ago`
}

export function CandidateCard({ candidate, isOverlay = false }: CandidateCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: candidate.id,
    data: {
      type: 'Candidate',
      candidate,
    },
  })

  const style = {
    // Only apply the transform/transition for the sortable items, not the overlay
    transform: CSS.Transform.toString(transform),
    transition,
    // The placeholder behind the drag should be faint
    opacity: isDragging ? 0.3 : 1,
  }

  const isDuplicate = candidate.isDuplicate

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'group relative flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm transition-all text-left',
        // Interaction styles (only apply to non-overlay if not dragging)
        !isDragging && !isOverlay && 'hover:-translate-y-0.5 hover:shadow-md cursor-grab',
        // Overlay styles (when the card is physically being dragged)
        isOverlay && 'rotate-3 scale-[1.02] shadow-xl border-primary/30 z-50 cursor-grabbing opacity-95',
        // Duplicate indicator
        isDuplicate && 'border-l-[3px] border-l-destructive/80',
        // Fallback for dragging
        isDragging && !isOverlay && 'cursor-grabbing border-dashed',
      )}
    >
      {/* Top Row: Avatar, Name, Role, Score */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="h-9 w-9 shrink-0 rounded-full bg-muted object-cover ring-1 ring-border"
          />
          <div className="flex flex-col truncate">
            <span className="truncate font-semibold text-sm flex items-center gap-1.5">
              {candidate.name}
              {isDuplicate && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" aria-label="Duplicate candidate detected" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Duplicate candidate detected</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </span>
            <span className="truncate text-xs text-muted-foreground">{candidate.role}</span>
          </div>
        </div>
        <ScoreBadge score={candidate.aiScore} size="sm" className="shrink-0" />
      </div>

      {/* Skills */}
      {candidate.skills && candidate.skills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {candidate.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary" className="px-1.5 py-0 text-[10px] h-4">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="px-1.5 py-0 text-[10px] h-4">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Footer: Source and Date */}
      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
        <span className="truncate max-w-[120px]">{candidate.source}</span>
        <span className="shrink-0 whitespace-nowrap">{getRelativeTime(candidate.appliedDate)}</span>
      </div>
    </div>
  )
}
