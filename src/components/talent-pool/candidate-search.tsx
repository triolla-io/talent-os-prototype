import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type FilterValue = 'all' | 'high-score' | 'available' | 'referred' | 'duplicates'

interface CandidateSearchProps {
  query: string
  onQueryChange: (q: string) => void
  activeFilter: FilterValue
  onFilterChange: (f: FilterValue) => void
}

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'High Score (80+)', value: 'high-score' },
  { label: 'Available Now', value: 'available' },
  { label: 'Referred', value: 'referred' },
  { label: 'Duplicates', value: 'duplicates' },
]

export function CandidateSearch({ query, onQueryChange, activeFilter, onFilterChange }: CandidateSearchProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-3 w-full">
      <motion.div
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={cn(
          'relative flex items-center rounded-xl border border-border bg-background transition-shadow duration-150',
          focused && 'shadow-[0_0_0_3px_oklch(0.55_0.25_275/0.12)]',
        )}
      >
        <Search className="absolute left-3.5 w-5 h-5 text-muted-foreground pointer-events-none shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search by name, skill, or describe who you're looking for..."
          className="h-12 w-full bg-transparent pl-10 pr-10 text-base text-foreground placeholder:text-muted-foreground outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            className="absolute right-3.5 flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Badge
            key={filter.value}
            asChild
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            className={cn(
              'cursor-pointer h-7 px-3 text-xs transition-colors',
              activeFilter === filter.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
            )}
          >
            <button type="button" onClick={() => onFilterChange(filter.value)}>
              {filter.label}
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
