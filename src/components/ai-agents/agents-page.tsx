import { motion } from 'motion/react';
import { Bot, Zap, CheckCircle2, Sparkles } from 'lucide-react';
import { AgentCard } from './agent-card';
import { ActivityLog } from './activity-log';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { AIShimmer } from '@/components/shared/ai-shimmer';
import { mockAgents } from '@/lib/mocks/agents';

export function AgentsPage() {
  const activeCount = mockAgents.filter((a) => a.status === 'active').length;
  const totalProcessed = mockAgents.reduce((sum, a) => sum + a.processedToday, 0);
  const avgSuccessRate = Math.round(mockAgents.reduce((sum, a) => sum + a.successRate, 0) / mockAgents.length);

  const STATS = [
    {
      label: 'Total Agents',
      value: mockAgents.length,
      suffix: '',
      icon: Bot,
      iconClass: 'text-primary bg-primary/10',
      sub: `${activeCount} active`,
      subClass: 'text-success',
    },
    {
      label: 'Active Now',
      value: activeCount,
      suffix: '',
      icon: Zap,
      iconClass: 'text-ai-amber bg-ai-amber/10',
      sub: `${mockAgents.length - activeCount} paused`,
      subClass: 'text-muted-foreground',
    },
    {
      label: 'Tasks Today',
      value: totalProcessed,
      suffix: '',
      icon: CheckCircle2,
      iconClass: 'text-success bg-success/10',
      sub: 'across all agents',
      subClass: 'text-muted-foreground',
    },
    {
      label: 'Avg Success Rate',
      value: avgSuccessRate,
      suffix: '%',
      icon: Sparkles,
      iconClass: 'text-ai-amber bg-ai-amber/10',
      sub: '↑ 3% this week',
      subClass: 'text-success',
      isAI: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/5 via-background to-ai-amber/5 border border-border p-6 md:p-8"
      >
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <circle cx="320" cy="60" r="80" fill="url(#agent-grad1)" opacity="0.4" />
            <circle cx="380" cy="200" r="50" fill="url(#agent-grad2)" opacity="0.3" />
            <circle cx="240" cy="240" r="30" fill="url(#agent-grad1)" opacity="0.2" />
            <defs>
              <radialGradient id="agent-grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.55 0.25 275)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="agent-grad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.78 0.16 75)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Command Center</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">AI Agents</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Your{' '}
              <span className="inline-flex items-center gap-1">
                <AIShimmer>autonomous recruitment workforce</AIShimmer>
                <Sparkles className="w-3 h-3 text-ai-amber shrink-0" />
              </span>{' '}
              — running 24/7 so you don't have to.
            </p>
          </div>

          {/* Active indicator pill */}
          <div className="flex items-center gap-2 bg-success/8 border border-success/20 rounded-full px-3 py-1.5 self-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span className="text-xs font-semibold text-success tabular-nums">{activeCount} agents running</span>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
              className="bg-card border border-border rounded-xl p-4 md:p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.iconClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-extrabold tabular-nums">
                  {stat.isAI ? (
                    <AIShimmer>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </AIShimmer>
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </p>
                <p className={`text-xs mt-1 font-medium ${stat.subClass}`}>{stat.sub}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Agent cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAgents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <AgentCard agent={agent} />
          </motion.div>
        ))}
      </div>

      {/* Activity log */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.4 }}>
        <ActivityLog />
      </motion.div>
    </div>
  );
}
