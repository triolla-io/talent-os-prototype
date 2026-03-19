import { AnimatePresence, motion } from 'motion/react';
import { AppLayout } from '@/components/layout/app-layout';
import { useActivePage } from '@/hooks/use-active-page';
import { DashboardPage } from '@/components/dashboard/dashboard-page';
import { PipelinePage } from '@/components/pipeline/pipeline-page';
import { TalentPoolPage } from '@/components/talent-pool/talent-pool-page';
import { JobsPage } from '@/components/jobs/jobs-page';
import { AgentsPage } from '@/components/ai-agents/agents-page';
import { ReportsPage } from '@/components/reports/reports-page';

function App() {
  const { activePage, navigate } = useActivePage();

  return (
    <AppLayout activePage={activePage} onNavigate={navigate}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'pipeline' && <PipelinePage />}
          {activePage === 'talent-pool' && <TalentPoolPage />}
          {activePage === 'jobs' && <JobsPage />}
          {activePage === 'ai-agents' && <AgentsPage />}
          {activePage === 'reports' && <ReportsPage />}
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}

export default App;
