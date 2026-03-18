import { motion } from "motion/react";
import { Briefcase, Users, Trophy, Brain } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { dashboardMetrics } from "@/lib/mocks/metrics";

const METRICS = [
  {
    label: "Active Roles",
    value: dashboardMetrics.activeRoles,
    suffix: "",
    icon: Briefcase,
    iconClass: "text-primary bg-primary/10",
    trend: "+2 this month",
    trendClass: "text-success",
  },
  {
    label: "In Pipeline",
    value: dashboardMetrics.candidatesInPipeline,
    suffix: "",
    icon: Users,
    iconClass: "text-chart-2 bg-chart-2/10",
    trend: "↑ 23% vs last month",
    trendClass: "text-success",
  },
  {
    label: "Hired This Month",
    value: dashboardMetrics.monthlyHires,
    suffix: "",
    icon: Trophy,
    iconClass: "text-success bg-success/10",
    trend: "On track for Q1 goal",
    trendClass: "text-muted-foreground",
  },
  {
    label: "AI Confidence",
    value: dashboardMetrics.aiConfidenceScore,
    suffix: "%",
    icon: Brain,
    iconClass: "text-ai-amber bg-ai-amber/10",
    trend: "↑ 4% this week",
    trendClass: "text-success",
    isAI: true,
  },
];

export function MetricsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
            className="bg-card border border-border rounded-xl p-4 md:p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {metric.label}
              </span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${metric.iconClass}`}>
                {metric.isAI ? (
                  <Icon className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
            </div>

            <div>
              <p className="text-3xl font-extrabold tabular-nums">
                {metric.isAI ? (
                  <span className="ai-shimmer">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </span>
                ) : (
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                )}
              </p>
              <p className={`text-xs mt-1 font-medium ${metric.trendClass}`}>
                {metric.trend}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
