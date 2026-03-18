import { motion } from "motion/react";
import {
  LayoutDashboard,
  Kanban,
  Users,
  Briefcase,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PageId } from "@/types";

const MOBILE_NAV_ITEMS = [
  { id: "dashboard" as PageId, label: "Dashboard", icon: LayoutDashboard },
  { id: "pipeline" as PageId, label: "Pipeline", icon: Kanban },
  { id: "talent-pool" as PageId, label: "Talent Pool", icon: Users },
  { id: "jobs" as PageId, label: "Jobs", icon: Briefcase },
  { id: "ai-agents" as PageId, label: "AI Agents", icon: Bot },
];

interface MobileNavProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

export function MobileNav({ activePage, onNavigate }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div
        className="flex items-stretch"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 min-h-[64px] py-2 px-1 relative transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-active-bg"
                  className="absolute inset-x-2 inset-y-1.5 rounded-xl bg-primary/8"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                className={cn(
                  "w-5 h-5 relative z-10 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium relative z-10 transition-colors leading-none",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
