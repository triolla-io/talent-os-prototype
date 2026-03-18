import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { JobsTable } from './jobs-table';
import { JobsSearch } from './jobs-search';
import { AIJDWriter } from './ai-jd-writer';
import { AIShimmer } from '@/components/shared/ai-shimmer';
import { mockJobs } from '@/lib/mocks/jobs';

const stagger: any = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp: any = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function JobsPage() {
  const [isWriterOpen, setIsWriterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'draft' | 'paused' | 'closed'>('all');

  const filteredJobs = useMemo(() => {
    let result = mockJobs;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.hiringManager.toLowerCase().includes(q)
      );
    }
    if (activeFilter !== 'all') {
      result = result.filter((j) => j.status === activeFilter);
    }
    return result;
  }, [searchQuery, activeFilter]);

  const activeCount = mockJobs.filter((j) => j.status === 'active').length;
  const draftCount = mockJobs.filter((j) => j.status === 'draft').length;
  const totalCandidates = mockJobs.reduce((sum, j) => sum + j.candidateCount, 0);

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={fadeUp}>
        <PageHeader
          title="Job Openings"
          description="Manage your active and draft positions"
          actions={
            <>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Job
              </Button>
              <Button size="sm" onClick={() => setIsWriterOpen(true)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Draft with AI
              </Button>
            </>
          }
        />
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border rounded-xl p-4 shadow-sm flex flex-col gap-1 items-start">
          <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Active Roles</span>
          <span className="text-2xl font-bold">{activeCount}</span>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm flex flex-col gap-1 items-start">
          <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Drafts</span>
          <span className="text-2xl font-bold">{draftCount}</span>
        </div>
        <div className="bg-card border rounded-xl p-4 shadow-sm flex flex-col gap-1 items-start">
          <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold">Total Candidates</span>
          <span className="text-2xl font-bold">{totalCandidates}</span>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <JobsSearch
          query={searchQuery}
          onQueryChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </motion.div>

      <motion.div variants={fadeUp}>
        <JobsTable jobs={filteredJobs} />
      </motion.div>

      <AIJDWriter open={isWriterOpen} onOpenChange={setIsWriterOpen} />
    </motion.div>
  );
}
