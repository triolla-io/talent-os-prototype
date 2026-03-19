import { motion } from 'motion/react';
import { WelcomeCard } from './welcome-card';
import { MetricsRow } from './metrics-row';
import { PrioritiesList } from './priorities-list';
import { RecentApplications } from './recent-applications';
import { AIInsightsPanel } from './ai-insights-panel';

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function DashboardPage() {
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={fadeUp}>
        <WelcomeCard />
      </motion.div>

      <motion.div variants={fadeUp}>
        <MetricsRow />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <PrioritiesList />
        </motion.div>
        <motion.div variants={fadeUp}>
          <AIInsightsPanel />
        </motion.div>
      </div>

      <motion.div variants={fadeUp}>
        <RecentApplications />
      </motion.div>
    </motion.div>
  );
}
