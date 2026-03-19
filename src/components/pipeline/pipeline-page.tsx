import { PageHeader } from '@/components/shared/page-header';
import { KanbanBoard } from './kanban-board';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

export function PipelinePage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Product Manager"
        description="Drag candidates between stages to update their status"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Candidate
            </Button>
          </>
        }
      />
      <div className="flex-1 overflow-hidden" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <KanbanBoard />
      </div>
    </div>
  );
}
