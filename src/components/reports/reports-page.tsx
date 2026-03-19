import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Users, Trophy, Brain, Sparkles, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIShimmer } from '@/components/shared/ai-shimmer';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { pipelineChartData, hiringTrendData, sourceDistributionData } from '@/lib/mocks/metrics';

// AI Confidence trend — 30 data points hovering 88–93
const aiConfidenceTrend = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  value: Math.round(88 + Math.sin(i * 0.4) * 2.5 + Math.random() * 1.5),
}));

const RANGE_OPTIONS = ['7 Days', '30 Days', '90 Days'] as const;
type RangeOption = (typeof RANGE_OPTIONS)[number];

// Custom tooltip for charts
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name?: string; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-muted-foreground">
          <span className="font-bold" style={{ color: p.color }}>
            {p.value}
          </span>
          {p.name && p.name !== 'value' ? ` ${p.name}` : ''}
        </p>
      ))}
    </div>
  );
}

const DONUT_COLORS = ['oklch(0.55 0.25 275)', 'oklch(0.78 0.16 75)', 'oklch(0.72 0.19 160)', 'oklch(0.65 0.2 310)'];

const KPI_STATS = [
  {
    label: 'Total Hired',
    value: 14,
    suffix: '',
    icon: Trophy,
    iconClass: 'text-success bg-success/10',
    trend: '↑ 40% vs last quarter',
    trendClass: 'text-success',
  },
  {
    label: 'Time to Hire',
    value: 18,
    suffix: 'd',
    icon: TrendingUp,
    iconClass: 'text-primary bg-primary/10',
    trend: '↓ 5 days faster',
    trendClass: 'text-success',
  },
  {
    label: 'Pipeline Conversion',
    value: 16,
    suffix: '%',
    icon: Users,
    iconClass: 'text-chart-4 bg-chart-4/10',
    trend: '↑ 3% vs industry avg',
    trendClass: 'text-success',
  },
  {
    label: 'AI Confidence',
    value: 91,
    suffix: '%',
    icon: Brain,
    iconClass: 'text-ai-amber bg-ai-amber/10',
    trend: '↑ 4% this week',
    trendClass: 'text-success',
    isAI: true,
  },
];

export function ReportsPage() {
  const [activeRange, setActiveRange] = useState<RangeOption>('30 Days');

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-chart-1/5 via-background to-chart-3/5 border border-border p-6 md:p-8"
      >
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-25">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <circle cx="330" cy="80" r="90" fill="url(#rep-grad1)" opacity="0.5" />
            <circle cx="370" cy="220" r="55" fill="url(#rep-grad2)" opacity="0.4" />
            <circle cx="250" cy="250" r="35" fill="url(#rep-grad1)" opacity="0.2" />
            <rect x="280" y="30" width="60" height="60" rx="12" fill="url(#rep-grad2)" opacity="0.15" transform="rotate(20 310 60)" />
            <defs>
              <radialGradient id="rep-grad1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.55 0.25 275)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <radialGradient id="rep-grad2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.72 0.19 160)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Analytics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">Reports</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <AIShimmer>Recruitment performance</AIShimmer>
                <Sparkles className="w-3 h-3 text-ai-amber shrink-0" />
              </span>{' '}
              — insights powered by AI analysis.
            </p>
          </div>

          {/* Date range toggle */}
          <div className="flex flex-col items-end gap-1.5 self-start">
          <div className="flex items-center gap-1 bg-muted/60 rounded-lg p-1">
            {RANGE_OPTIONS.map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={[
                  'relative px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200',
                  activeRange === range ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {activeRange === range && (
                  <motion.span
                    layoutId="range-indicator"
                    className="absolute inset-0 bg-card rounded-md shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {range}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60">Live filtering coming soon</p>
          </div>
        </div>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_STATS.map((stat, i) => {
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
                <p className={`text-xs mt-1 font-medium flex items-center gap-1 ${stat.trendClass}`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.trend.replace('↑ ', '').replace('↓ ', '')}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Hiring Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <CardTitle className="text-sm font-semibold">Hiring Funnel</CardTitle>
                </div>
                <span className="text-[11px] text-muted-foreground">by pipeline stage</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={pipelineChartData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 260)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'oklch(0.52 0.02 260)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'oklch(0.52 0.02 260)' }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: 'oklch(0.55 0.25 275 / 0.06)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {pipelineChartData.map((_, i) => (
                      <Cell key={i} fill={`oklch(0.55 0.25 275 / ${1 - i * 0.15})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* 2. Hires Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <CardTitle className="text-sm font-semibold">Hires Over Time</CardTitle>
                </div>
                <span className="text-[11px] text-muted-foreground">last 6 months</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={hiringTrendData}>
                  <defs>
                    <linearGradient id="hireGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 260)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'oklch(0.52 0.02 260)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'oklch(0.52 0.02 260)' }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'oklch(0.72 0.19 160)', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="oklch(0.72 0.19 160)"
                    strokeWidth={2.5}
                    fill="url(#hireGrad)"
                    dot={{ r: 4, fill: 'oklch(0.72 0.19 160)', stroke: 'white', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: 'oklch(0.72 0.19 160)', stroke: 'white', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3. Source Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-chart-4" />
                  <CardTitle className="text-sm font-semibold">Source Distribution</CardTitle>
                </div>
                <span className="text-[11px] text-muted-foreground">candidate origins</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={sourceDistributionData} cx="45%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                      {sourceDistributionData.map((_, i) => (
                        <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0];
                        return (
                          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
                            <p className="font-semibold">{d.name}</p>
                            <p className="text-muted-foreground">
                              <span className="font-bold text-foreground">{d.value}%</span> of candidates
                            </p>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Legend */}
                <div className="flex flex-col gap-2 shrink-0 pr-2">
                  {sourceDistributionData.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: DONUT_COLORS[i % DONUT_COLORS.length] }} />
                      <span className="text-[11px] text-muted-foreground whitespace-nowrap">{item.name}</span>
                      <span className="text-[11px] font-bold tabular-nums ml-1">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 4. AI Confidence Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-2 border-b border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-ai-amber" />
                  <CardTitle className="text-sm font-semibold">
                    <AIShimmer>AI Confidence Trend</AIShimmer>
                  </CardTitle>
                </div>
                <span className="text-[11px] text-muted-foreground">last 30 days</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={aiConfidenceTrend}>
                  <defs>
                    <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="oklch(0.78 0.16 75)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.004 260)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: 'oklch(0.52 0.02 260)' }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis
                    domain={[84, 96]}
                    tick={{ fontSize: 11, fill: 'oklch(0.52 0.02 260)' }}
                    axisLine={false}
                    tickLine={false}
                    width={32}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-xs">
                          <p className="text-muted-foreground mb-0.5">{label}</p>
                          <p className="font-bold" style={{ color: 'oklch(0.78 0.16 75)' }}>
                            {payload[0].value}% confidence
                          </p>
                        </div>
                      );
                    }}
                    cursor={{ stroke: 'oklch(0.78 0.16 75)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="oklch(0.78 0.16 75)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: 'oklch(0.78 0.16 75)', stroke: 'white', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI summary footer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="relative overflow-hidden rounded-xl border border-border bg-linear-to-r from-ai-amber/5 via-background to-primary/5 p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-ai-amber/20 to-ai-coral/10 flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4 text-ai-amber" />
          </div>
          <p className="text-sm text-muted-foreground flex-1">
            <AIShimmer as="span">AI Summary: </AIShimmer> Your hiring pipeline is{' '}
            <span className="font-semibold text-foreground">performing above industry benchmarks</span> with a 16% screening-to-hire
            conversion. LinkedIn remains your top source. Consider boosting referral incentives — referrals convert at{' '}
            <span className="font-semibold text-foreground">2× the rate</span> of agency candidates.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
