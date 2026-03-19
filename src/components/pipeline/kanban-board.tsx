import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { type Candidate, type PipelineStage } from '@/types';
import { mockCandidates } from '@/lib/mocks/candidates';
import { KanbanColumn } from './kanban-column';
import { CandidateCard } from './candidate-card';
import { createPortal } from 'react-dom';

// Let's use 6 columns as requested by the 6 mock statuses effectively.
const ALL_STAGES: { id: PipelineStage; title: string }[] = [
  { id: 'new', title: 'New' },
  { id: 'screening', title: 'Screening' },
  { id: 'interview', title: 'Interview' },
  { id: 'offer', title: 'Offer' },
  { id: 'hired', title: 'Hired' },
  { id: 'rejected', title: 'Rejected' },
];

export function KanbanBoard() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveCandidate = active.data.current?.type === 'Candidate';
    const isOverCandidate = over.data.current?.type === 'Candidate';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveCandidate) return;

    // Dropping a candidate over another candidate
    if (isActiveCandidate && isOverCandidate) {
      setCandidates((candidates) => {
        const activeIndex = candidates.findIndex((t) => t.id === activeId);
        const overIndex = candidates.findIndex((t) => t.id === overId);

        if (candidates[activeIndex].status !== candidates[overIndex].status) {
          // Move to different column
          const newCandidates = [...candidates];
          newCandidates[activeIndex] = { ...newCandidates[activeIndex], status: candidates[overIndex].status };
          return arrayMove(newCandidates, activeIndex, overIndex);
        }

        // Same column
        return arrayMove(candidates, activeIndex, overIndex);
      });
    }

    // Dropping a candidate over an empty column area
    if (isActiveCandidate && isOverColumn) {
      setCandidates((candidates) => {
        const activeIndex = candidates.findIndex((t) => t.id === activeId);
        const newCandidates = [...candidates];
        newCandidates[activeIndex] = { ...newCandidates[activeIndex], status: overId as PipelineStage };
        return arrayMove(newCandidates, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveCandidate = active.data.current?.type === 'Candidate';
    const isOverCandidate = over.data.current?.type === 'Candidate';

    if (isActiveCandidate && isOverCandidate) {
      setCandidates((candidates) => {
        const activeIndex = candidates.findIndex((t) => t.id === activeId);
        const overIndex = candidates.findIndex((t) => t.id === overId);
        return arrayMove(candidates, activeIndex, overIndex);
      });
    }
  };

  const activeCandidate = activeId ? candidates.find((c) => c.id === activeId) : null;

  return (
    <div className="flex h-full w-full overflow-x-auto pb-4 custom-scrollbar">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 px-1">
          {ALL_STAGES.map((stage) => (
            <KanbanColumn
              key={stage.id}
              stage={stage.id}
              title={stage.title}
              candidates={candidates.filter((c) => c.status === stage.id)}
            />
          ))}
        </div>

        {typeof window !== 'undefined' &&
          createPortal(
            <DragOverlay>{activeCandidate ? <CandidateCard candidate={activeCandidate} isOverlay /> : null}</DragOverlay>,
            document.body,
          )}
      </DndContext>
    </div>
  );
}
