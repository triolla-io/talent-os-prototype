import { useState, useMemo } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { CandidateSearch } from './candidate-search'
import { CandidateTable } from './candidate-table'
import { DuplicateAlert } from './duplicate-alert'
import { Button } from '@/components/ui/button'
import { Upload, UserPlus } from 'lucide-react'
import { mockCandidates } from '@/lib/mocks/candidates'
import { motion, type Variants } from 'motion/react'

const stagger: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export function TalentPoolPage() {
  const [searchQuery, setSearchQuery] = useState('')
  // "all" | "high-score" | "available" | "referred" | "duplicates"
  const [activeFilter, setActiveFilter] = useState<'all' | 'high-score' | 'available' | 'referred' | 'duplicates'>('all')

  const filteredCandidates = useMemo(() => {
    let result = mockCandidates
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q)),
      )
    }
    if (activeFilter === 'high-score') {
      result = result.filter((c) => c.aiScore >= 80)
    }
    if (activeFilter === 'duplicates') {
      result = result.filter((c) => c.isDuplicate)
    }
    // Note: 'available' and 'referred' could have specific logic if mock data supports it.
    if (activeFilter === 'referred') {
      result = result.filter((c) => c.source.toLowerCase().includes('referral'))
    }
    return result
  }, [searchQuery, activeFilter])

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={fadeUp}>
        <PageHeader
          title="Talent Pool"
          description={`${mockCandidates.length} candidates in your database`}
          actions={
            <>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Import CVs
              </Button>
              <Button size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Candidate
              </Button>
            </>
          }
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <DuplicateAlert />
      </motion.div>

      <motion.div variants={fadeUp}>
        <CandidateSearch query={searchQuery} onQueryChange={setSearchQuery} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <CandidateTable candidates={filteredCandidates} />
      </motion.div>
    </motion.div>
  )
}
