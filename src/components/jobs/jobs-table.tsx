import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal, BarChart2, ChevronLeft, ChevronRight } from 'lucide-react';
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
import type { Job } from '@/types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: Job['status'] }) {
  switch (status) {
    case 'active':
      return <Badge className="bg-success/10 text-success border border-success/30">{status}</Badge>;
    case 'draft':
      return <Badge variant="secondary">{status}</Badge>;
    case 'closed':
      return <Badge variant="outline">{status}</Badge>;
    case 'paused':
      return <Badge className="bg-warning/10 text-warning border border-warning/30">{status}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
}

function getRelativeDate(postedDate: string) {
  const diffDays = Math.floor((Date.now() - new Date(postedDate).getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  const months = Math.floor(diffDays / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

// ---------------------------------------------------------------------------
// Column helper
// ---------------------------------------------------------------------------

const columnHelper = createColumnHelper<Job>();

const columns = [
  columnHelper.accessor("title", {
    header: "Job Title",
    cell: ({ getValue }) => (
      <span className="font-semibold cursor-pointer hover:underline decoration-muted-foreground underline-offset-4 whitespace-nowrap">
        {getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("department", {
    header: "Department",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground whitespace-nowrap">{getValue()}</span>
    ),
  }),

  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  }),

  columnHelper.accessor("candidateCount", {
    header: "Candidates",
    cell: ({ getValue }) => {
      const count = getValue();
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{count}</span>
          {count > 0 && <BarChart2 className="w-3.5 h-3.5 text-primary opacity-60" />}
        </div>
      );
    },
  }),

  columnHelper.accessor("postedDate", {
    header: "Posted",
    cell: ({ getValue }) => (
      <span className="text-muted-foreground whitespace-nowrap">{getRelativeDate(getValue())}</span>
    ),
  }),

  columnHelper.accessor("hiringManager", {
    header: "Hiring Manager",
    cell: ({ getValue }) => (
      <span className="text-foreground whitespace-nowrap">{getValue()}</span>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="sm" className="text-xs">
            View
          </Button>
          <Button variant="ghost" size="sm" className="text-xs hidden sm:inline-flex">
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-1.5">
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">More actions for {job.title}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 rounded-xl border border-border/50 bg-background/95 backdrop-blur-md shadow-xl ring-0 p-1.5"
            >
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-muted font-medium py-1.5">
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-muted font-medium py-1.5">
                Edit Job
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer hover:bg-muted font-medium py-1.5">
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/50 my-1" />
              <DropdownMenuItem className="text-warning rounded-lg cursor-pointer hover:bg-warning/10 focus:bg-warning/10 focus:text-warning font-medium py-1.5">
                Pause Recruiting
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive rounded-lg cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive font-medium py-1.5">
                Close Role
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

interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: jobs,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
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
                  const canSort = header.column.getCanSort() && header.id !== 'actions';
                  const sortDir = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "px-4 py-3 text-left text-xs uppercase tracking-wide text-muted-foreground font-semibold whitespace-nowrap",
                        canSort && "cursor-pointer select-none hover:text-foreground transition-colors",
                        header.id === 'actions' && "text-right"
                      )}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className={cn("flex items-center gap-1", header.id === 'actions' && "justify-end")}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="ml-0.5 opacity-60">
                            {sortDir === "asc" ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : sortDir === "desc" ? (
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
              const isEven = index % 2 === 0;

              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    "border-b last:border-b-0 hover:bg-muted/40 transition-colors",
                    isEven ? "bg-background" : "bg-muted/20"
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
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted-foreground text-sm"
                >
                  No job openings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {totalRows === 0 ? 0 : pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, totalRows)}
          </span>{" "}
          of <span className="font-medium text-foreground">{totalRows}</span> jobs
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground px-1">
            Page{" "}
            <span className="font-medium text-foreground">{pageCount === 0 ? 0 : pageIndex + 1}</span>{" "}
            of{" "}
            <span className="font-medium text-foreground">{pageCount}</span>
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
