import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { type Candidate, type PipelineStage } from '@/types'
import { CandidateCard } from './candidate-card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface KanbanColumnProps {
  stage: PipelineStage
  title: string
  candidates: Candidate[]
}

export function KanbanColumn({ stage, title, candidates }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: stage,
    data: {
      type: 'Column',
      stage,
    },
  })

  // Calculate actual class names from the map or just use tailwind classes directly
  // PRD requests: New=primary, Screening=chart-2, Interview=chart-4, Offer=success, Hired=success, Rejected=destructive
  const topBorderClass = {
    new: 'border-t-primary',
    screening: 'border-t-chart-2',
    interview: 'border-t-chart-4',
    offer: 'border-t-success',
    hired: 'border-t-success',
    rejected: 'border-t-destructive',
  }[stage]

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex min-w-[300px] w-[300px] max-w-[300px] flex-col rounded-xl border bg-muted/40 transition-colors',
        'border-t-[3px]',
        topBorderClass,
        isOver && 'bg-primary/5 ring-1 ring-primary/20',
      )}
    >
      {/* Column Header */}
      <div className="flex flex-col gap-1 p-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm capitalize">{title}</h3>
            <Badge variant="secondary" className="h-5 rounded-full px-1.5 text-xs text-muted-foreground">
              {candidates.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Column Body: Droppable Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-16rem)] p-3 pt-1">
        <div className="flex flex-col gap-3 min-h-[150px]">
          <SortableContext items={candidates.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            {candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}

            {candidates.length === 0 && (
              <div className="flex h-[120px] items-center justify-center rounded-lg border-2 border-dashed border-border/60 text-xs text-muted-foreground/60 transition-colors">
                Drop here
              </div>
            )}
          </SortableContext>
        </div>
      </div>
    </div>
  )
}
