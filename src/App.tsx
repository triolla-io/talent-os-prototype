import { AnimatePresence, motion } from "motion/react";
import { AppLayout } from "@/components/layout/app-layout";
import { useActivePage } from "@/hooks/use-active-page";
import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { PipelinePage } from "@/components/pipeline/pipeline-page";

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
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activePage === "dashboard" && <DashboardPage />}
          {activePage === "pipeline" && <PipelinePage />}
          {activePage === "talent-pool" && (
            <div className="text-muted-foreground text-sm">Talent Pool — coming soon</div>
          )}
          {activePage === "jobs" && (
            <div className="text-muted-foreground text-sm">Jobs — coming soon</div>
          )}
          {activePage === "ai-agents" && (
            <div className="text-muted-foreground text-sm">AI Agents — coming soon</div>
          )}
          {activePage === "reports" && (
            <div className="text-muted-foreground text-sm">Reports — coming soon</div>
          )}
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}

export default App;
