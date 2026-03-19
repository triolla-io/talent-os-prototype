import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScoreBadge } from '@/components/shared/score-badge';
import type { Candidate, PipelineStage } from '@/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getRelativeTime(dateStr: string) {
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
}

function StatusBadge({ status }: { status: PipelineStage }) {
  switch (status) {
    case 'new':
      return <Badge variant="default">{status}</Badge>;
    case 'screening':
      return <Badge variant="outline">{status}</Badge>;
    case 'interview':
      return <Badge variant="secondary">{status}</Badge>;
    case 'offer':
      return <Badge className="bg-warning/10 text-warning border border-warning/30">{status}</Badge>;
    case 'hired':
      return <Badge className="bg-success/10 text-success border border-success/30">{status}</Badge>;
    case 'rejected':
      return <Badge className="bg-destructive/10 text-destructive border border-destructive/30">{status}</Badge>;
  }
}

// ---------------------------------------------------------------------------
// Column helper
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<Candidate>();

const columns = [
  columnHelper.accessor('name', {
    id: 'candidate',
    header: 'Candidate',
    cell: ({ row }) => {
      const { name, email, avatar, isDuplicate } = row.original;
      return (
        <div className="flex items-center gap-3 min-w-0">
          <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-sm truncate">{name}</span>
              {isDuplicate && (
                <Badge variant="outline" className="border-destructive/50 text-destructive text-[10px] px-1 py-0 h-4 shrink-0">
                  Duplicate
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </div>
      );
    },
    size: 260,
  }),

  columnHelper.accessor('role', {
    header: 'Role',
    cell: ({ getValue }) => <span className="text-sm">{getValue()}</span>,
  }),

  columnHelper.accessor('aiScore', {
    header: 'AI Score',
    cell: ({ getValue }) => <ScoreBadge score={getValue()} size="sm" />,
  }),

  columnHelper.accessor('source', {
    header: 'Source',
    cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getValue()}</span>,
  }),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  }),

  columnHelper.accessor('appliedDate', {
    header: 'Applied',
    cell: ({ getValue }) => <span className="text-sm text-muted-foreground">{getRelativeTime(getValue())}</span>,
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const candidate = row.original;
      return (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-xs">
            View
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-1.5">
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">More actions for {candidate.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-xl ring-0 p-1.5"
            >
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-muted font-medium py-1.5">Edit</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-muted font-medium py-1.5">Move to...</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 my-1" />
              <DropdownMenuItem className="text-destructive rounded-lg cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive font-medium py-1.5">
                Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface CandidateTableProps {
  candidates: Candidate[];
}

export function CandidateTable({ candidates }: CandidateTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: candidates,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
  });

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  return (
    <div className="flex flex-col gap-4">
      {/* Table container */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-muted/40 border-b">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left text-xs uppercase tracking-wide text-muted-foreground font-semibold whitespace-nowrap',
                        canSort && 'cursor-pointer select-none hover:text-foreground transition-colors',
                      )}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="ml-0.5 opacity-60">
                            {sortDir === 'asc' ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : sortDir === 'desc' ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronsUpDown className="w-3 h-3" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              const isDuplicate = row.original.isDuplicate;
              const isEven = index % 2 === 0;

              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    'border-b last:border-b-0 hover:bg-muted/40 transition-colors',
                    isEven ? 'bg-background' : 'bg-muted/20',
                    isDuplicate && 'border-l-2 border-l-destructive',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              );
            })}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-muted-foreground text-sm">
                  No candidates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-medium text-foreground">
            {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, totalRows)}
          </span>{' '}
          of <span className="font-medium text-foreground">{totalRows}</span> candidates
        </p>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground px-1">
            Page <span className="font-medium text-foreground">{pageIndex + 1}</span> of{' '}
            <span className="font-medium text-foreground">{pageCount}</span>
          </span>

          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
