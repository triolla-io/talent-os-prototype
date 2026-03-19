# Triolla Talent OS — Full Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, visually stunning frontend prototype of the Triolla Talent OS agentic HR platform — all 6 views (Dashboard, Pipeline, Talent Pool, Jobs, AI Agents, Reports) with mock data, smooth animations, and a WOW-factor design system that makes non-technical recruiters fall in love.

**Architecture:** Single-page React app with state-based page navigation (no router needed for prototype). All data is mocked in `src/lib/mocks/`. The app shell is a persistent layout (top nav + sidebar) with swappable page content. Each page is a self-contained component tree. Animations use `motion` (Framer Motion) for orchestrated entrances and micro-interactions, `@dnd-kit` for Kanban drag-and-drop.

**Tech Stack:** React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS 4.2 + shadcn/ui (radix-nova) + motion + @dnd-kit + recharts + lucide-react + Plus Jakarta Sans font

---

## Design Direction

**Aesthetic:** "Refined Productivity" — the intersection of Linear's precision, Notion's warmth, and Apple's polish. Clean layouts with moments of delight. The AI elements feel alive with warm amber/gold accents and subtle glow effects.

**Key WOW Moments:**

1. **Animated number counters** on dashboard metrics that count up from 0
2. **AI shimmer effect** — a warm gradient pulse on AI-related elements
3. **Staggered entrance animations** — cards and sections fade+slide in with orchestrated delays
4. **Kanban drag-and-drop** with rotation tilt, shadow elevation, and snap-back
5. **AI JD Writer** with a typing effect that simulates AI generating text character-by-character
6. **Sliding active indicator** on sidebar navigation
7. **Glass morphism** on AI panels with animated gradient borders
8. **Search bar glow** on focus with expanding animation
9. **Smooth page transitions** between views
10. **Duplicate detection alert** that slides in with attention-grabbing animation

**Typography:**

- **Primary font:** Plus Jakarta Sans (variable weight 200–800) — geometric, friendly, modern, distinctive
- **Weight hierarchy:** 800 for page titles, 700 for section headings, 600 for card titles, 500 for body emphasis, 400 for body text, 300 for muted/secondary

**Color Palette (oklch for Tailwind CSS 4):**

- **Background:** Warm off-white `oklch(0.985 0.002 90)` — NOT pure white, subtle warmth
- **Surface (cards):** `oklch(1 0 0)` — pure white for contrast against warm bg
- **Primary:** Rich indigo `oklch(0.55 0.25 275)` — confident, tech-forward
- **Primary hover:** `oklch(0.48 0.25 275)` — deeper on interaction
- **AI Accent:** Warm amber `oklch(0.78 0.16 75)` — feels alive, intelligent, warm
- **AI Gradient:** From amber `oklch(0.78 0.16 75)` to soft coral `oklch(0.72 0.18 40)`
- **Success:** Emerald `oklch(0.72 0.19 160)`
- **Text primary:** `oklch(0.15 0.01 260)` — near-black with slight blue undertone
- **Text muted:** `oklch(0.55 0.02 260)` — readable secondary text
- **Border:** `oklch(0.92 0.004 260)` — subtle, not harsh
- **Ring/Focus:** Primary at 30% opacity

**Animations (motion library patterns):**

- **Entrance:** `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}`
- **Stagger children:** Parent uses `staggerChildren: 0.08` in `transition`
- **Hover lift:** `whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}`
- **Page transition:** `AnimatePresence` with `mode="wait"`, fade + subtle slide

---

## File Structure

```
src/
├── components/
│   ├── ui/                        # [existing] shadcn/ui components
│   ├── layout/
│   │   ├── app-layout.tsx         # Main layout: top nav + sidebar + content area
│   │   ├── top-nav.tsx            # Top navigation bar (logo, search, AI button, notifications, avatar)
│   │   ├── sidebar.tsx            # Left sidebar with sliding active indicator
│   │   └── mobile-nav.tsx         # Bottom navigation bar for mobile
│   ├── dashboard/
│   │   ├── dashboard-page.tsx     # Dashboard orchestrator — composes all sections
│   │   ├── welcome-card.tsx       # Personalized greeting card with gradient bg
│   │   ├── metrics-row.tsx        # 4 metric cards with animated counters
│   │   ├── priorities-list.tsx    # Today's AI-suggested priorities
│   │   ├── recent-applications.tsx # Horizontal scrolling candidate cards
│   │   └── ai-insights-panel.tsx  # Glass morphism AI insights card
│   ├── pipeline/
│   │   ├── pipeline-page.tsx      # Pipeline view orchestrator
│   │   ├── kanban-board.tsx       # Kanban container with columns
│   │   ├── kanban-column.tsx      # Single droppable column
│   │   └── candidate-card.tsx     # Draggable candidate card with AI score
│   ├── talent-pool/
│   │   ├── talent-pool-page.tsx   # Talent pool orchestrator
│   │   ├── candidate-search.tsx   # NLP-style search bar with filters
│   │   ├── candidate-table.tsx    # TanStack Table of candidates
│   │   └── duplicate-alert.tsx    # Duplicate detection banner
│   ├── jobs/
│   │   ├── jobs-page.tsx          # Jobs orchestrator
│   │   ├── jobs-table.tsx         # Job openings table
│   │   └── ai-jd-writer.tsx       # AI JD writer modal with typing effect
│   ├── ai-agents/
│   │   ├── agents-page.tsx        # AI Agents orchestrator
│   │   ├── agent-card.tsx         # Individual agent toggle card
│   │   └── activity-log.tsx       # Real-time activity feed
│   ├── reports/
│   │   └── reports-page.tsx       # Reports with recharts
│   └── shared/
│       ├── ai-shimmer.tsx         # Reusable AI shimmer/glow effect
│       ├── animated-counter.tsx   # Number counter animation component
│       ├── score-badge.tsx        # Circular AI score indicator
│       └── page-header.tsx        # Consistent page header with title + actions
├── lib/
│   ├── utils.ts                   # [existing] cn() utility
│   └── mocks/
│       ├── candidates.ts          # 20+ mock candidates with realistic data
│       ├── jobs.ts                # 8+ mock job openings
│       ├── agents.ts              # 6 AI agent definitions with activity logs
│       ├── metrics.ts             # Dashboard metrics + chart data
│       └── priorities.ts          # Today's priorities + AI insights
├── hooks/
│   ├── use-active-page.ts         # Page navigation state management
│   └── use-animated-counter.ts    # Hook for animating numbers
├── types/
│   └── index.ts                   # All shared TypeScript types
├── App.tsx                        # Root: wraps layout, passes active page
├── main.tsx                       # [existing] entry point
└── index.css                      # [modify] Design system tokens + custom animations
```

---

## Phase 1: Foundation

### Task 1: Install Dependencies

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install motion @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @fontsource-variable/plus-jakarta-sans
```

- [ ] **Step 2: Remove the old Inter font (replaced by Plus Jakarta Sans)**

```bash
npm uninstall @fontsource-variable/inter
```

- [ ] **Step 3: Verify all required shadcn/ui components exist**

Run `ls src/components/ui/` and verify `button.tsx` exists. If missing, run:

```bash
npx shadcn@latest add button
```

Also verify these are present (all used by the prototype): `button`, `card`, `badge`, `dialog`, `input`, `dropdown-menu`, `separator`, `skeleton`, `tooltip`, `sonner`, `alert`. If any are missing, install them with `npx shadcn@latest add <name>`.

- [ ] **Step 4: Verify installation**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add motion, dnd-kit, Plus Jakarta Sans; remove Inter font"
```

---

### Task 2: Design System — Update CSS Tokens & Custom Animations

**Files:**

- Modify: `src/index.css`

This is the most important task. It establishes the entire visual identity.

- [ ] **Step 1: Replace `src/index.css` with the new design system**

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'shadcn/tailwind.css';
@import '@fontsource-variable/plus-jakarta-sans';
/* Note: @fontsource-variable/inter was removed — Plus Jakarta Sans replaces it */

@custom-variant dark (&:is(.dark *));

/*
 * Design System: "Refined Productivity"
 * Warm, polished, with alive AI accents
 */

:root {
  /* Typography */
  --font-sans: 'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;

  /* Layout */
  --radius: 0.75rem;
  --sidebar-width: 16rem;
  --sidebar-width-collapsed: 4rem;

  /* Core Palette — warm, refined */
  --background: oklch(0.985 0.002 90);
  --foreground: oklch(0.145 0.015 260);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0.015 260);

  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0.015 260);

  /* Primary — rich indigo */
  --primary: oklch(0.55 0.25 275);
  --primary-foreground: oklch(0.985 0 0);

  --secondary: oklch(0.965 0.002 260);
  --secondary-foreground: oklch(0.205 0.015 260);

  --muted: oklch(0.965 0.002 260);
  --muted-foreground: oklch(0.52 0.02 260);

  --accent: oklch(0.955 0.005 260);
  --accent-foreground: oklch(0.205 0.015 260);

  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);

  --border: oklch(0.925 0.004 260);
  --input: oklch(0.925 0.004 260);
  --ring: oklch(0.55 0.25 275);

  /* AI Accent — warm amber to coral gradient */
  --ai-amber: oklch(0.78 0.16 75);
  --ai-coral: oklch(0.72 0.18 40);
  --ai-glow: oklch(0.78 0.16 75 / 0.15);

  /* Success */
  --success: oklch(0.72 0.19 160);
  --success-foreground: oklch(0.985 0 0);

  /* Warning */
  --warning: oklch(0.78 0.16 75);
  --warning-foreground: oklch(0.205 0.015 260);

  /* Chart colors — cohesive palette */
  --chart-1: oklch(0.55 0.25 275);
  --chart-2: oklch(0.78 0.16 75);
  --chart-3: oklch(0.72 0.19 160);
  --chart-4: oklch(0.65 0.2 310);
  --chart-5: oklch(0.72 0.18 40);

  /* Sidebar */
  --sidebar: oklch(0.98 0.002 260);
  --sidebar-foreground: oklch(0.35 0.02 260);
  --sidebar-primary: oklch(0.55 0.25 275);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.955 0.005 275);
  --sidebar-accent-foreground: oklch(0.55 0.25 275);
  --sidebar-border: oklch(0.935 0.004 260);
  --sidebar-ring: oklch(0.55 0.25 275);
}

.dark {
  --background: oklch(0.12 0.015 260);
  --foreground: oklch(0.93 0.005 260);

  --card: oklch(0.155 0.015 260);
  --card-foreground: oklch(0.93 0.005 260);

  --popover: oklch(0.155 0.015 260);
  --popover-foreground: oklch(0.93 0.005 260);

  --primary: oklch(0.65 0.25 275);
  --primary-foreground: oklch(0.12 0.015 260);

  --secondary: oklch(0.2 0.015 260);
  --secondary-foreground: oklch(0.93 0.005 260);

  --muted: oklch(0.2 0.015 260);
  --muted-foreground: oklch(0.6 0.02 260);

  --accent: oklch(0.2 0.02 275);
  --accent-foreground: oklch(0.93 0.005 260);

  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.12 0.015 260);

  --border: oklch(0.25 0.015 260);
  --input: oklch(0.25 0.015 260);
  --ring: oklch(0.65 0.25 275);

  --ai-amber: oklch(0.78 0.16 75);
  --ai-coral: oklch(0.72 0.18 40);
  --ai-glow: oklch(0.78 0.16 75 / 0.2);

  --success: oklch(0.72 0.19 160);
  --success-foreground: oklch(0.12 0.015 260);

  --warning: oklch(0.78 0.16 75);
  --warning-foreground: oklch(0.12 0.015 260);

  --chart-1: oklch(0.65 0.25 275);
  --chart-2: oklch(0.78 0.16 75);
  --chart-3: oklch(0.72 0.19 160);
  --chart-4: oklch(0.7 0.2 310);
  --chart-5: oklch(0.72 0.18 40);

  --sidebar: oklch(0.14 0.015 260);
  --sidebar-foreground: oklch(0.8 0.01 260);
  --sidebar-primary: oklch(0.65 0.25 275);
  --sidebar-primary-foreground: oklch(0.12 0.015 260);
  --sidebar-accent: oklch(0.2 0.02 275);
  --sidebar-accent-foreground: oklch(0.65 0.25 275);
  --sidebar-border: oklch(0.22 0.015 260);
  --sidebar-ring: oklch(0.65 0.25 275);
}

/* Tailwind theme extensions */
@theme inline {
  --font-sans: var(--font-sans);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ai-amber: var(--ai-amber);
  --color-ai-coral: var(--ai-coral);
  --color-ai-glow: var(--ai-glow);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
}

/* Base styles */
*,
::after,
::before,
::backdrop,
::file-selector-button {
  border-color: var(--color-border, currentColor);
  --tw-ring-color: var(--color-ring, currentColor);
}

html {
  @apply font-sans;
}

body {
  @apply bg-background text-foreground;
  font-feature-settings: 'cv11', 'ss01';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom keyframes for AI effects */
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

@keyframes ai-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

@keyframes slide-indicator {
  from {
    transform: translateY(var(--indicator-from, 0));
  }
  to {
    transform: translateY(var(--indicator-to, 0));
  }
}

@keyframes gradient-border {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes typing-cursor {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Utility classes for AI effects */
.ai-shimmer {
  background: linear-gradient(
    110deg,
    var(--ai-amber) 0%,
    var(--ai-coral) 25%,
    var(--ai-amber) 50%,
    var(--ai-coral) 75%,
    var(--ai-amber) 100%
  );
  background-size: 200% auto;
  animation: shimmer 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ai-glow-border {
  position: relative;
}
.ai-glow-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(135deg, var(--ai-amber), var(--ai-coral), var(--ai-amber));
  background-size: 200% 200%;
  animation: gradient-border 4s ease infinite;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  pointer-events: none;
}

.typing-cursor::after {
  content: '▊';
  animation: typing-cursor 0.8s step-end infinite;
  color: var(--ai-amber);
  margin-left: 1px;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 999px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--muted-foreground);
}
```

- [ ] **Step 2: Verify the design system renders correctly**

```bash
npm run dev
```

Open browser at `http://localhost:5173`. Verify the warm off-white background renders and the font is Plus Jakarta Sans (check in browser dev tools).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: establish design system — Plus Jakarta Sans, warm palette, AI effects"
```

---

### Task 3: TypeScript Types

**Files:**

- Create: `src/types/index.ts`

- [ ] **Step 1: Create all shared types**

```typescript
// src/types/index.ts

export type PageId = 'dashboard' | 'pipeline' | 'talent-pool' | 'jobs' | 'ai-agents' | 'reports';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string; // URL or initials placeholder
  role: string; // Role they applied for
  aiScore: number; // 0-100 AI match score
  source: string; // "LinkedIn", "Agency - TechHunt", "Referral", etc.
  appliedDate: string; // ISO date string
  status: PipelineStage;
  skills: string[];
  experience: string; // "5 years", "Senior", etc.
  location: string;
  isDuplicate?: boolean;
  duplicateSource?: string; // "Agency - TechHunt submitted this candidate who already exists"
  notes?: string;
}

export type PipelineStage = 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'active' | 'draft' | 'closed' | 'paused';
  candidateCount: number;
  postedDate: string;
  description?: string;
  requirements?: string[];
  salaryRange?: string;
  hiringManager: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'idle';
  icon: string; // lucide icon name
  lastActivity: string;
  processedToday: number;
  successRate: number; // 0-100
  activities: AgentActivity[];
}

export interface AgentActivity {
  id: string;
  agentId: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'failed';
}

export interface DashboardMetrics {
  activeRoles: number;
  candidatesInPipeline: number;
  monthlyHires: number;
  aiConfidenceScore: number;
}

export interface Priority {
  id: string;
  text: string;
  type: 'review' | 'follow-up' | 'action' | 'ai-suggestion';
  urgency: 'high' | 'medium' | 'low';
  relatedCount?: number;
  completed: boolean;
}

export interface AIInsight {
  id: string;
  text: string;
  type: 'prediction' | 'recommendation' | 'alert';
  confidence: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No type errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add TypeScript types for all domain entities"
```

---

### Task 4: Mock Data

**Files:**

- Create: `src/lib/mocks/candidates.ts`
- Create: `src/lib/mocks/jobs.ts`
- Create: `src/lib/mocks/agents.ts`
- Create: `src/lib/mocks/metrics.ts`
- Create: `src/lib/mocks/priorities.ts`

- [ ] **Step 1: Create candidates mock data**

Create `src/lib/mocks/candidates.ts` with 20+ realistic candidates. Use diverse names, real-sounding tech roles (Senior PM, Frontend Engineer, Head of Sales, DevOps Lead, etc.), varied AI scores (45-98), multiple sources, different pipeline stages, and 2-3 flagged as duplicates. Include realistic skills arrays and experience levels. Generate avatar URLs using `https://api.dicebear.com/9.x/initials/svg?seed=FIRSTNAME` for placeholder avatars.

**Export name:** `export const mockCandidates: Candidate[]`

Key data points to make the prototype feel real:

- Mix of high-score (85+) and low-score (below 60) candidates
- At least 3 candidates in each pipeline stage
- 2 candidates flagged as duplicates from agency sources
- Realistic applied dates within the last 30 days

- [ ] **Step 2: Create jobs mock data**

Create `src/lib/mocks/jobs.ts` — **Export name:** `export const mockJobs: Job[]` — with 8 jobs: mix of active (5), draft (2), closed (1). Roles: Senior Product Manager, Frontend Engineer, Head of Sales, DevOps Lead, UX Designer, Data Analyst, Backend Engineer, Marketing Lead. Include candidate counts, realistic posted dates, salary ranges, and hiring manager names.

- [ ] **Step 3: Create agents mock data**

Create `src/lib/mocks/agents.ts` — **Export name:** `export const mockAgents: AIAgent[]` — with 6 AI agents:

1. **Auto-Enrichment Agent** — enriches candidate profiles with public data (active, processed 23 today)
2. **Outreach Agent** — sends personalized outreach emails (active, processing 5 emails)
3. **Screening Agent** — auto-screens CVs via text + voice analysis (NO video) against job requirements (active, screened 12 today). Description must mention "Text & Voice screening" to reflect the PRD constraint that there is no video screening.
4. **Duplicate Detection Agent** — flags duplicate candidates (active, found 3 duplicates)
5. **Nurturing Agent** — sends follow-up messages to warm candidates (paused)
6. **Scheduling Agent** — coordinates interview scheduling (idle)

Each agent has 3-5 recent activities with timestamps.

- [ ] **Step 4: Create metrics and priorities mock data**

Create `src/lib/mocks/metrics.ts` — **Export names:** `export const dashboardMetrics: DashboardMetrics`, `export const pipelineChartData: ChartDataPoint[]`, `export const hiringTrendData: ChartDataPoint[]`, `export const sourceDistributionData: ChartDataPoint[]` — with:

- Dashboard metrics: `{ activeRoles: 5, candidatesInPipeline: 87, monthlyHires: 2, aiConfidenceScore: 91 }`
- Pipeline chart data (candidates per stage)
- Hiring trend data (last 6 months)
- Source distribution data

Create `src/lib/mocks/priorities.ts` — **Export names:** `export const mockPriorities: Priority[]`, `export const mockInsights: AIInsight[]` — with:

- 5 priorities: "Review 3 strong Senior PM candidates" (high), "Follow up with 8 candidates from last week" (medium), "New JD ready for 'Head of Sales'" (low/AI), "Schedule 2 final interviews" (medium), "Review AI screening results for Frontend role" (high)
- 3 AI insights: "3 candidates in your Talent Pool are likely to respond this week", "Your screening-to-interview conversion is 15% above industry average", "2 candidates from TechHunt Agency are duplicates — potential savings of $12,000"

- [ ] **Step 5: Verify all mocks compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/mocks/
git commit -m "feat: add comprehensive mock data for all views"
```

---

## Phase 2: Layout Shell

### Task 5: Page Navigation Hook

**Files:**

- Create: `src/hooks/use-active-page.ts`

- [ ] **Step 1: Create the navigation state hook**

```typescript
// src/hooks/use-active-page.ts
import { useState, useCallback } from 'react';
import type { PageId } from '@/types';

export function useActivePage(initialPage: PageId = 'dashboard') {
  const [activePage, setActivePage] = useState<PageId>(initialPage);

  const navigate = useCallback((page: PageId) => {
    setActivePage(page);
  }, []);

  return { activePage, navigate } as const;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/use-active-page.ts
git commit -m "feat: add page navigation state hook"
```

---

### Task 6: Shared Components — AI Shimmer, Score Badge, Animated Counter, Page Header

**Files:**

- Create: `src/components/shared/ai-shimmer.tsx`
- Create: `src/components/shared/score-badge.tsx`
- Create: `src/components/shared/animated-counter.tsx`
- Create: `src/components/shared/page-header.tsx`
- Create: `src/hooks/use-animated-counter.ts`

- [ ] **Step 1: Create the animated counter hook**

```typescript
// src/hooks/use-animated-counter.ts
import { useState, useEffect, useRef } from 'react';

export function useAnimatedCounter(target: number, duration: number = 1200) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const animationFrame = useRef<number>();

  useEffect(() => {
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [target, duration]);

  return count;
}
```

- [ ] **Step 2: Create the AI shimmer component**

```tsx
// src/components/shared/ai-shimmer.tsx
import { cn } from '@/lib/utils';

interface AIShimmerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'p';
}

export function AIShimmer({ children, className, as: Tag = 'span' }: AIShimmerProps) {
  return <Tag className={cn('ai-shimmer font-semibold', className)}>{children}</Tag>;
}

interface AIGlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AIGlowCard({ children, className }: AIGlowCardProps) {
  return <div className={cn('ai-glow-border rounded-xl', className)}>{children}</div>;
}
```

- [ ] **Step 3: Create the score badge component**

A circular badge showing the AI match score. Uses SVG for the circular progress ring. Color varies: green (80+), amber (60-79), red (below 60).

```tsx
// src/components/shared/score-badge.tsx
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ScoreBadge({ score, size = 'md', className }: ScoreBadgeProps) {
  const sizeMap = { sm: 32, md: 44, lg: 56 };
  const fontSizeMap = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
  const strokeWidthMap = { sm: 3, md: 3.5, lg: 4 };
  const s = sizeMap[size];
  const strokeWidth = strokeWidthMap[size];
  const radius = (s - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color = score >= 80 ? 'stroke-success' : score >= 60 ? 'stroke-warning' : 'stroke-destructive';

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: s, height: s }}>
      <svg width={s} height={s} className="-rotate-90">
        <circle cx={s / 2} cy={s / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
        <motion.circle
          cx={s / 2}
          cy={s / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={color}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <span className={cn('absolute font-bold', fontSizeMap[size])}>{score}</span>
    </div>
  );
}
```

- [ ] **Step 4: Create the animated counter component**

```tsx
// src/components/shared/animated-counter.tsx
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({ value, duration, suffix = '', prefix = '', className }: AnimatedCounterProps) {
  const count = useAnimatedCounter(value, duration);
  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 5: Create the page header component**

```tsx
// src/components/shared/page-header.tsx
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <motion.div
      className={cn('flex items-start justify-between gap-4 mb-8', className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </motion.div>
  );
}
```

- [ ] **Step 6: Verify all compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add src/components/shared/ src/hooks/
git commit -m "feat: add shared components — AI shimmer, score badge, animated counter, page header"
```

---

### Task 7: Top Navigation Bar

**Files:**

- Create: `src/components/layout/top-nav.tsx`

- [ ] **Step 1: Build the top nav**

The top nav has three sections:

- **Left:** Triolla logo (text-based: "Triolla" in bold + "Talent OS" in lighter weight)
- **Center:** Global search bar with search icon, placeholder "Search candidates, jobs, or ask AI...", focus glow effect
- **Right:** "Ask AI" button with sparkle icon (ai-shimmer gradient), notification bell with badge count (3), recruiter avatar dropdown

Use `motion` for the search bar focus animation (expand width, add glow shadow). The "Ask AI" button should have the `ai-shimmer` text effect and a subtle hover scale.

The nav is `sticky top-0 z-50` with a glass-morphism backdrop blur. Height is `h-16`. Bottom border `border-b border-border`.

Icons from lucide-react: `Search`, `Sparkles`, `Bell`, `ChevronDown`.

Avatar: 36px circle with initials "SJ" (Sarah Johnson — the recruiter persona from the PRD).

- [ ] **Step 2: Verify visually**

```bash
npm run dev
```

Temporarily render `<TopNav />` in App.tsx. Verify: logo renders, search bar has glow on focus, Ask AI button shimmers, notification badge shows "3", avatar renders.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/top-nav.tsx
git commit -m "feat: add top navigation bar with search, AI button, and notifications"
```

---

### Task 8: Sidebar Navigation

**Files:**

- Create: `src/components/layout/sidebar.tsx`

- [ ] **Step 1: Build the sidebar**

Desktop sidebar (hidden below `md` breakpoint):

- Fixed width `w-64` (matches `--sidebar-width`)
- Background `bg-sidebar` with right border
- Full height below top nav: `h-[calc(100vh-4rem)]` `sticky top-16`
- Navigation items: icon + label, each item `px-3 py-2.5 rounded-lg`
- Active item: `bg-sidebar-accent text-sidebar-accent-foreground font-semibold` with a subtle animated left border indicator (2px wide, rounded, primary color, uses `motion.layoutId` for smooth sliding between items)
- Hover: `hover:bg-sidebar-accent/50` transition
- Items grouped with section labels if needed

Navigation items (from PRD):

- 🏠 `LayoutDashboard` → Dashboard
- 🔄 `Kanban` → Pipeline
- 🏊 `Users` → Talent Pool
- 💼 `Briefcase` → Job Openings
- 🤖 `Bot` → AI Agents
- 📊 `BarChart3` → Reports

The sidebar receives `activePage` and `onNavigate` as props.

At the bottom of the sidebar: a small "Powered by AI" badge with the ai-shimmer effect, and a collapse button (optional for prototype).

- [ ] **Step 2: Verify visually**

Render sidebar in App.tsx. Click through nav items — the active indicator should slide smoothly between items using `motion.layoutId`.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/sidebar.tsx
git commit -m "feat: add sidebar with sliding active indicator animation"
```

---

### Task 9: Mobile Bottom Navigation

**Files:**

- Create: `src/components/layout/mobile-nav.tsx`
- Create: `src/hooks/use-mobile.ts`

- [ ] **Step 1: Create mobile detection hook**

```typescript
// src/hooks/use-mobile.ts
import { useState, useEffect } from 'react';

export function useMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
}
```

- [ ] **Step 2: Build mobile bottom nav**

Visible only below `md` breakpoint (`md:hidden`). Fixed to bottom: `fixed bottom-0 left-0 right-0 z-50`.

5 main items (Dashboard, Pipeline, Talent Pool, Jobs, AI Agents — Reports is accessible from a "more" menu or dropdown on mobile).

Each item: icon (24px) + small label below. Active item uses primary color. Touch-friendly: `min-h-[64px]` tap targets.

Background: white with top border. Subtle shadow upward. Safe area padding for iOS: `pb-[env(safe-area-inset-bottom)]`.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/mobile-nav.tsx src/hooks/use-mobile.ts
git commit -m "feat: add mobile bottom navigation bar"
```

---

### Task 10: App Layout Shell & Wire Up App.tsx

**Files:**

- Create: `src/components/layout/app-layout.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the layout shell**

```tsx
// src/components/layout/app-layout.tsx
import { TopNav } from './top-nav';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import type { PageId } from '@/types';

interface AppLayoutProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  children: React.ReactNode;
}

export function AppLayout({ activePage, onNavigate, children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 md:p-8 pb-24 md:pb-8 overflow-y-auto">{children}</main>
      </div>
      <MobileNav activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
```

- [ ] **Step 2: Wire up App.tsx with page switching**

```tsx
// src/App.tsx
import { AnimatePresence, motion } from 'motion/react';
import { AppLayout } from '@/components/layout/app-layout';
import { useActivePage } from '@/hooks/use-active-page';

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
          {activePage === 'dashboard' && <div>Dashboard placeholder</div>}
          {activePage === 'pipeline' && <div>Pipeline placeholder</div>}
          {activePage === 'talent-pool' && <div>Talent Pool placeholder</div>}
          {activePage === 'jobs' && <div>Jobs placeholder</div>}
          {activePage === 'ai-agents' && <div>AI Agents placeholder</div>}
          {activePage === 'reports' && <div>Reports placeholder</div>}
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
}

export default App;
```

- [ ] **Step 3: Full visual verification**

```bash
npm run dev
```

Verify:

- Top nav renders with logo, search, AI button, notifications, avatar
- Sidebar renders with all 6 nav items, clicking switches active page
- The active indicator slides smoothly between items
- Page content area shows placeholder text that changes on nav click
- Page transitions animate (fade + slide)
- On mobile (resize to < 768px): sidebar hides, bottom nav appears
- Bottom nav items are touch-friendly and switch pages

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/app-layout.tsx src/App.tsx
git commit -m "feat: wire up app layout shell with page transitions"
```

---

## Phase 3: Dashboard

### Task 11: Welcome Card

**Files:**

- Create: `src/components/dashboard/welcome-card.tsx`

- [ ] **Step 1: Build the welcome card**

A large card at the top of the dashboard. Spans full width. Features:

- Warm gradient background: from `primary/5` to `ai-amber/5` (very subtle, not garish)
- Large greeting: "Good morning, Sarah." (use `text-2xl font-extrabold`)
- Subtitle: "You have **12** new candidates today. **3** are high-potential." (numbers bolded, use `AnimatedCounter` for the numbers)
- Small sparkle icon (✨) next to "high-potential" using the AI shimmer effect
- Right side: a subtle decorative SVG pattern or abstract shapes (geometric dots, circles) — adds visual interest without being distracting. Use simple CSS shapes or inline SVG.
- Entrance animation: fade in + slide up with 0.5s duration

- [ ] **Step 2: Verify visually in isolation**

Temporarily render in App.tsx dashboard section. Check gradient is subtle, numbers animate on mount, text reads naturally.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/welcome-card.tsx
git commit -m "feat: add dashboard welcome card with animated counters"
```

---

### Task 12: Metrics Row

**Files:**

- Create: `src/components/dashboard/metrics-row.tsx`

- [ ] **Step 1: Build the metrics row**

4 metric cards in a responsive grid (`grid grid-cols-2 lg:grid-cols-4 gap-4`).

Each card:

- White card with subtle border, rounded-xl
- Small icon (color-coded) + metric label (muted, small)
- Large number (using `AnimatedCounter`, `text-3xl font-extrabold`)
- Small trend indicator below: "↑ 12% vs last month" in green or "→ same as last week" in muted

Cards:

1. **Active Roles** — `Briefcase` icon (primary color) — value: 5 — trend: "+2 this month"
2. **In Pipeline** — `Users` icon (chart-2 color) — value: 87 — trend: "↑ 23% vs last month"
3. **Hired This Month** — `Trophy` icon (success color) — value: 2 — trend: "On track for Q1 goal"
4. **AI Confidence** — `Brain` icon with ai-shimmer — value: 91% — trend: "↑ 4% this week"

Each card has `motion` entrance with staggered delay (0, 0.1, 0.2, 0.3). Hover: subtle lift (`whileHover={{ y: -2 }}`).

- [ ] **Step 2: Verify visually**

Numbers should count up on page load with stagger. Hover lifts cards. Grid is 2 cols on mobile, 4 on desktop.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/metrics-row.tsx
git commit -m "feat: add dashboard metrics row with animated counters and staggered entrance"
```

---

### Task 13: Today's Priorities

**Files:**

- Create: `src/components/dashboard/priorities-list.tsx`

- [ ] **Step 1: Build the priorities list**

A card with the title "Today's Priorities" and an AI sparkle badge "AI Suggested".

List of 5 priority items. Each item:

- Checkbox (clickable, toggles `completed` state)
- Priority text
- Right side: colored urgency badge (high = destructive variant, medium = default, low = secondary)
- Items with `type: "ai-suggestion"` have a small ✨ icon next to the text
- Completed items: text gets `line-through opacity-50` with smooth transition

Staggered entrance animation for each list item.

Hover on uncompleted items: subtle bg highlight.

- [ ] **Step 2: Verify interactivity**

Click checkboxes to toggle — verify line-through animation is smooth. AI suggestion items show sparkle.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/priorities-list.tsx
git commit -m "feat: add today's priorities with interactive checkboxes and AI suggestions"
```

---

### Task 14: Recent Applications

**Files:**

- Create: `src/components/dashboard/recent-applications.tsx`

- [ ] **Step 1: Build recent applications section**

Section title: "Recent Applications" with a "View all →" link.

Horizontal scrolling row of candidate cards (`overflow-x-auto`, custom scrollbar from CSS, `flex gap-4`). Show 8 candidates.

Each mini card (`w-[200px] shrink-0`):

- Avatar (48px circle, using dicebear URL or initials)
- Name (font-semibold, truncate)
- Applied role (muted, small, truncate)
- AI Score badge (using `ScoreBadge` component, size="sm")
- "Quick View" ghost button at the bottom
- Subtle border, rounded-xl, white bg
- Hover: lift + shadow

Scroll indicator: subtle gradient fade on the right edge to indicate more content.

Staggered entrance animation.

- [ ] **Step 2: Verify scroll behavior**

Horizontal scroll works on both desktop (mouse wheel + drag) and mobile (swipe). Gradient fade visible on right edge. Cards have lift on hover.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/recent-applications.tsx
git commit -m "feat: add recent applications horizontal scroll with candidate cards"
```

---

### Task 15: AI Insights Panel

**Files:**

- Create: `src/components/dashboard/ai-insights-panel.tsx`

- [ ] **Step 1: Build the AI insights panel**

This is the "wow" component of the dashboard. A card with the `ai-glow-border` effect (animated gradient border).

Header: "AI Insights" with a `Brain` icon using ai-shimmer.

3 insight items, each with:

- Icon based on type: `Lightbulb` (prediction), `Target` (recommendation), `AlertTriangle` (alert)
- Text of the insight
- Confidence percentage badge
- Subtle dividers between items

The whole card has a very subtle background: `bg-gradient-to-br from-ai-amber/[0.03] to-ai-coral/[0.03]` — barely perceptible but adds warmth.

Bottom of card: "Powered by Triolla AI" text with ai-shimmer effect.

Entrance: the gradient border animation starts on mount (inherent from CSS animation), card fades in.

- [ ] **Step 2: Verify the glow effect**

The gradient border should animate smoothly. The card should feel special — visually distinct from regular cards.

- [ ] **Step 3: Commit**

```bash
git add src/components/dashboard/ai-insights-panel.tsx
git commit -m "feat: add AI insights panel with animated gradient border"
```

---

### Task 16: Dashboard Page Assembly

**Files:**

- Create: `src/components/dashboard/dashboard-page.tsx`
- Modify: `src/App.tsx` — replace dashboard placeholder

- [ ] **Step 1: Compose the dashboard page**

```tsx
// src/components/dashboard/dashboard-page.tsx
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
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
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
```

- [ ] **Step 2: Update App.tsx to use DashboardPage**

Replace `{activePage === "dashboard" && <div>Dashboard placeholder</div>}` with `{activePage === "dashboard" && <DashboardPage />}`.

- [ ] **Step 3: Full dashboard verification**

```bash
npm run dev
```

Verify:

- All 5 sections render in correct layout
- Staggered entrance animation plays — sections fade in one by one
- Metrics numbers count up
- Priorities are interactive (checkboxes)
- Horizontal scroll works on recent applications
- AI insights panel has glowing border
- Responsive: on mobile, layout stacks to single column
- Page looks cohesive, professional, and impressive

- [ ] **Step 4: Commit**

```bash
git add src/components/dashboard/ src/App.tsx
git commit -m "feat: assemble complete dashboard with staggered entrance animations"
```

---

## Phase 4: Pipeline (Kanban)

### Task 17: Candidate Card Component

**Files:**

- Create: `src/components/pipeline/candidate-card.tsx`

- [ ] **Step 1: Build the draggable candidate card**

Used in the Kanban board. Each card shows:

- Avatar (36px, circle) + Name (font-semibold) + Role (muted, small) — top row
- AI Score badge (`ScoreBadge`, size="sm") — top right
- Skills tags (2-3 max, using `Badge` component, secondary variant, small)
- Source label (muted text, very small)
- Bottom: applied date (relative, e.g., "2 days ago") in muted
- If `isDuplicate`: a small red `AlertTriangle` icon with tooltip "Duplicate candidate detected"

Card styling: white bg, border, `rounded-xl`, `p-3`, `cursor-grab` (changes to `cursor-grabbing` when dragging).

On drag: card rotates slightly (±3deg), shadow elevates, opacity drops to 0.9.
On hover (not dragging): subtle lift.

Use `@dnd-kit/sortable` `useSortable` hook for drag behavior.

- [ ] **Step 2: Verify card renders correctly with sample data**

- [ ] **Step 3: Commit**

```bash
git add src/components/pipeline/candidate-card.tsx
git commit -m "feat: add draggable candidate card with AI score and drag effects"
```

---

### Task 18: Kanban Column

**Files:**

- Create: `src/components/pipeline/kanban-column.tsx`

- [ ] **Step 1: Build the Kanban column**

A vertical droppable container. Props: `stage: PipelineStage`, `candidates: Candidate[]`, `title: string`.

Layout:

- Header: stage title (font-semibold) + candidate count badge
- Color-coded top border (2px): New=primary, Screening=chart-2, Interview=chart-4, Offer=success, Hired=success, Rejected=destructive
- **PRD constraint:** The Screening column header should include a small "Text + Voice" badge (no video icon crossed out) to visually indicate the text + voice only screening modality per PRD requirements
- Column body: vertical list of `CandidateCard` components, `gap-3`, scrollable (`overflow-y-auto max-h-[calc(100vh-16rem)]`)
- Empty state: dashed border area with "Drop here" text in muted

Uses `@dnd-kit/sortable` `SortableContext` and `useDroppable`.

When a card is dragged over this column, the column gets a subtle highlight background (`bg-primary/5`).

- [ ] **Step 2: Commit**

```bash
git add src/components/pipeline/kanban-column.tsx
git commit -m "feat: add Kanban column with droppable area and color-coded headers"
```

---

### Task 19: Kanban Board & Pipeline Page

**Files:**

- Create: `src/components/pipeline/kanban-board.tsx`
- Create: `src/components/pipeline/pipeline-page.tsx`
- Modify: `src/App.tsx` — replace pipeline placeholder

- [ ] **Step 1: Build the Kanban board**

The board is a horizontal scrollable container (`overflow-x-auto`) with 5 columns side by side (`flex gap-4`).

Columns: New → Screening → Interview → Offer → Hired/Rejected (combine Hired and Rejected into one column with sub-sections, or keep as 6 columns — prefer 5 columns: New, Screening, Interview, Offer, Hired with a separate "Rejected" indicator).

Uses `@dnd-kit/core` `DndContext` with `closestCorners` collision detection.

State: candidates array managed with `useState`. On `onDragEnd`, update the candidate's `status` to the target column's stage. Use dnd-kit's `DragOverlay` exclusively for drag visuals — do NOT combine with `motion.layoutId` (they conflict).

Sensors: `useSensor(PointerSensor, { activationConstraint: { distance: 5 } })` to prevent accidental drags.

`DragOverlay` renders a copy of the card being dragged (with rotation and elevated shadow).

- [ ] **Step 2: Build the pipeline page**

```tsx
// src/components/pipeline/pipeline-page.tsx
import { PageHeader } from '@/components/shared/page-header';
import { KanbanBoard } from './kanban-board';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';

export function PipelinePage() {
  return (
    <div>
      <PageHeader
        title="Pipeline"
        description="Drag candidates between stages to update their status"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Candidate
            </Button>
          </>
        }
      />
      <KanbanBoard />
    </div>
  );
}
```

- [ ] **Step 3: Update App.tsx**

Replace pipeline placeholder with `<PipelinePage />`.

- [ ] **Step 4: Full verification**

Verify:

- 5 columns render with correct color-coded headers
- Candidate cards appear in correct columns based on mock data status
- Dragging a card: rotation tilt, shadow elevation, DragOverlay renders
- Dropping in another column: card moves and status updates
- Columns scroll vertically if too many cards
- Board scrolls horizontally on mobile
- Responsive layout works

- [ ] **Step 5: Commit**

```bash
git add src/components/pipeline/ src/App.tsx
git commit -m "feat: add Pipeline view with full drag-and-drop Kanban board"
```

---

## Phase 5: Talent Pool

### Task 20: Candidate Search Bar

**Files:**

- Create: `src/components/talent-pool/candidate-search.tsx`

- [ ] **Step 1: Build the NLP-style search bar**

A large search input that feels like it understands natural language.

Features:

- Large input (`h-12 text-base`), full width
- Search icon on the left, clear button on right when text is entered
- Placeholder: `"Search by name, skill, or describe who you're looking for..."` — cycles through 3 placeholders with a typing animation effect (optional: just use one)
- On focus: expands slightly (scale), gets a glow shadow (`shadow-[0_0_0_3px_var(--ring)]`)
- Below the input: filter chips (toggleable): "All", "High Score (80+)", "Available Now", "Referred", "Duplicates"
- Filter chips use `Badge` component in outline variant, active filter gets primary variant

Mock search: filtering the candidates array by name or skills match (simple `includes` search on the text).

- [ ] **Step 2: Commit**

```bash
git add src/components/talent-pool/candidate-search.tsx
git commit -m "feat: add NLP-style candidate search with filter chips"
```

---

### Task 21: Candidate Table

**Files:**

- Create: `src/components/talent-pool/candidate-table.tsx`

- [ ] **Step 1: Build the table with TanStack Table**

A data table using `@tanstack/react-table` showing all candidates.

Columns:

1. **Candidate** — avatar (32px) + name + email below (muted, small) — width: flexible
2. **Role** — the role they applied for
3. **AI Score** — `ScoreBadge` component, size="sm"
4. **Source** — text label
5. **Status** — colored `Badge`: new=default, screening=outline, interview=secondary, offer=success variant (use custom colors)
6. **Applied** — relative date ("2 days ago")
7. **Actions** — "View" button (ghost) + dropdown with "Edit", "Move to...", "Reject"

Table styling:

- Use shadcn table patterns but with custom styling
- Alternating row backgrounds: every other row `bg-muted/30`
- Hover: row highlights `bg-muted/50`
- Duplicate rows: subtle left border `border-l-2 border-destructive` + small "Duplicate" badge next to name
- Header: `text-xs uppercase tracking-wide text-muted-foreground font-semibold`
- Rounded table container: `rounded-xl border overflow-hidden`

Entrance: rows fade in with stagger.

Sorting: click column headers to sort (use TanStack sorting).
Pagination: show 10 per page with pagination controls at bottom.

- [ ] **Step 2: Commit**

```bash
git add src/components/talent-pool/candidate-table.tsx
git commit -m "feat: add candidate table with TanStack Table, sorting, and pagination"
```

---

### Task 22: Duplicate Detection Alert

**Files:**

- Create: `src/components/talent-pool/duplicate-alert.tsx`

- [ ] **Step 1: Build the duplicate detection alert**

A prominent but not intrusive banner that appears at the top of the Talent Pool page.

Design:

- Uses the `Alert` component as a base but with custom styling
- Background: `bg-warning/5` with `border-warning/30` left border (4px)
- Icon: `AlertTriangle` in warning color
- Title: "Duplicate Candidates Detected" (font-semibold)
- Body: "**2 candidates** submitted by external agencies already exist in your talent pool. Estimated sourcing fee savings: **$12,000**"
- Action button: "Review Duplicates" (outline, warning-colored)

The "$12,000" figure should use the `ai-shimmer` effect for emphasis.

Entrance animation: slides in from the top with a subtle bounce.

Dismissable: small X button to hide it (state-managed).

- [ ] **Step 2: Commit**

```bash
git add src/components/talent-pool/duplicate-alert.tsx
git commit -m "feat: add duplicate detection alert banner with savings highlight"
```

---

### Task 23: Talent Pool Page Assembly

**Files:**

- Create: `src/components/talent-pool/talent-pool-page.tsx`
- Modify: `src/App.tsx` — replace talent pool placeholder

- [ ] **Step 1: Compose the talent pool page**

```tsx
// src/components/talent-pool/talent-pool-page.tsx
import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { CandidateSearch } from './candidate-search';
import { CandidateTable } from './candidate-table';
import { DuplicateAlert } from './duplicate-alert';
import { Button } from '@/components/ui/button';
import { Upload, UserPlus } from 'lucide-react';
import { mockCandidates } from '@/lib/mocks/candidates';

export function TalentPoolPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCandidates = useMemo(() => {
    let result = mockCandidates;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some((s) => s.toLowerCase().includes(q)),
      );
    }
    if (activeFilter === 'high-score') result = result.filter((c) => c.aiScore >= 80);
    if (activeFilter === 'duplicates') result = result.filter((c) => c.isDuplicate);
    return result;
  }, [searchQuery, activeFilter]);

  return (
    <div className="space-y-6">
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
      <DuplicateAlert />
      <CandidateSearch query={searchQuery} onQueryChange={setSearchQuery} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <CandidateTable candidates={filteredCandidates} />
    </div>
  );
}
```

- [ ] **Step 2: Update App.tsx**

Replace talent pool placeholder with `<TalentPoolPage />`.

- [ ] **Step 3: Full verification**

Verify:

- Duplicate alert banner shows at top with savings figure
- Search filters candidates in real-time
- Filter chips toggle and update results
- Table shows correct data with sorting
- Duplicate candidates have visual indicators
- Pagination works
- Responsive layout

- [ ] **Step 4: Commit**

```bash
git add src/components/talent-pool/ src/App.tsx
git commit -m "feat: assemble Talent Pool view with search, filters, and duplicate detection"
```

---

## Phase 6: Job Openings

### Task 24: Jobs Table

**Files:**

- Create: `src/components/jobs/jobs-table.tsx`

- [ ] **Step 1: Build the jobs table**

A table listing all job openings. Simpler than the candidate table.

Columns:

1. **Job Title** — font-semibold, clickable (could open detail modal later)
2. **Department** — muted text
3. **Status** — colored badge: active=success, draft=secondary, closed=outline, paused=warning
4. **Candidates** — number with small bar chart indicator (inline)
5. **Posted** — date string
6. **Hiring Manager** — name
7. **Actions** — "View" button, "Edit" button, dropdown for more

Table styling: same patterns as candidate table (rounded container, hover rows, clean headers).

Each row with entrance stagger animation.

---

### Task 25: AI Job Description Writer Modal

**Files:**

- Create: `src/components/jobs/ai-jd-writer.tsx`

- [ ] **Step 1: Build the AI JD writer**

This is one of the key WOW features. It's a `Dialog` that simulates AI generating a job description.

**Flow:**

1. User clicks "Draft with AI" button → Dialog opens
2. **Step 1:** Input field: "Describe the role in a few words..." with placeholder "e.g., Senior React developer for our fintech platform". Below: a few quick-select chips ("Engineering", "Product", "Design", "Sales", "Marketing")
3. User types or selects, then clicks "Generate" button (primary, with Sparkles icon)
4. **Step 2:** The dialog transitions to show a "generating" state:
   - A loading bar at the top (animated, gradient from ai-amber to ai-coral)
   - Below: the job description text appears character by character with a typing animation
   - The text is formatted with sections: Title, About the Role, Responsibilities (bullet list), Requirements (bullet list), Nice to Have, Compensation & Benefits
   - Typing speed: ~12ms interval, 2–5 chars per tick (completes in ~1.5s — fast and snappy, accepted deviation from original 30ms/char spec)
   - A blinking cursor at the end of the currently typing text (use `.typing-cursor` CSS class)
5. When typing completes: "Copy to Clipboard" and "Use This Description" buttons appear with fade-in

The typing effect should use a `useState` + `useEffect` with `setInterval` to reveal characters one by one from a pre-defined mock job description string.

The dialog should be medium-large size (`max-w-2xl`).

- [ ] **Step 2: Verify the complete flow**

Click "Draft with AI" → type a role → click "Generate" → watch the typing animation → verify buttons appear at end.

- [ ] **Step 3: Commit**

```bash
git add src/components/jobs/ai-jd-writer.tsx
git commit -m "feat: add AI JD writer modal with character-by-character typing effect"
```

---

### Task 26: Jobs Page Assembly

**Files:**

- Create: `src/components/jobs/jobs-page.tsx`
- Modify: `src/App.tsx` — replace jobs placeholder

- [ ] **Step 1: Compose the jobs page**

Layout:

- `PageHeader` with title "Job Openings", description "Manage your active and draft positions"
- Actions: "Draft with AI ✨" button (primary, with Sparkles icon + ai-shimmer on the text), "Create Job" button (outline)
- Stats row: 3 small cards — "Active: 5", "Draft: 2", "Total Candidates: 87" — similar to dashboard metrics but smaller
- `JobsTable` below
- `AIJDWriter` dialog (opened by the "Draft with AI" button)

- [ ] **Step 2: Update App.tsx**

Replace jobs placeholder with `<JobsPage />`.

- [ ] **Step 3: Verify**

Verify full flow: page renders, "Draft with AI" opens the writer, typing animation works, table shows jobs.

- [ ] **Step 4: Commit**

```bash
git add src/components/jobs/ src/App.tsx
git commit -m "feat: assemble Jobs view with AI JD writer"
```

---

## Phase 7: AI Agents

### Task 27: Agent Card

**Files:**

- Create: `src/components/ai-agents/agent-card.tsx`

- [ ] **Step 1: Build the agent card**

Each agent gets a card showing its status and controls.

Card layout:

- Top: icon (from lucide, based on agent's `icon` field) + agent name (font-semibold) + status badge
- Description text (muted, small)
- Stats row: "Processed today: **23**" | "Success rate: **96%**"
- Toggle switch at the top-right corner (active agents = on, paused/idle = off). Use a simple styled checkbox or a custom toggle.
- When toggled: status badge and stats animate to reflect the change

Status badge colors: active = success with green dot animation (tiny pulsing circle), paused = warning, idle = muted

Active agents have a subtle green left border. The card for "active" agents has a very subtle `bg-success/[0.02]` background.

Hover: lift effect.
Entrance: stagger fade-in.

- [ ] **Step 2: Commit**

```bash
git add src/components/ai-agents/agent-card.tsx
git commit -m "feat: add AI agent card with toggle and status indicators"
```

---

### Task 28: Activity Log

**Files:**

- Create: `src/components/ai-agents/activity-log.tsx`

- [ ] **Step 1: Build the activity log**

A real-time-feeling feed of agent activities.

Layout: a card with header "Recent Activity" and a scrollable list.

Each activity item:

- Small colored dot (success for completed, warning for in-progress, destructive for failed)
- Agent name in bold (small)
- Action description: "Enriched profile for **Alice Johnson**" or "Sent outreach email to **Bob Smith**"
- Timestamp: relative ("2 min ago", "15 min ago")
- Items are compact (`py-2`) with subtle dividers

Entrance: items slide in from the left with stagger.

Optional WOW: every 5 seconds, a new mock activity "appears" at the top of the list with a slide-in animation (simulates real-time updates). Use `useEffect` + `setInterval` to prepend a new activity from a pool of mock activities.

- [ ] **Step 2: Commit**

```bash
git add src/components/ai-agents/activity-log.tsx
git commit -m "feat: add agent activity log with real-time simulation"
```

---

### Task 29: AI Agents Page Assembly

**Files:**

- Create: `src/components/ai-agents/agents-page.tsx`
- Modify: `src/App.tsx` — replace AI agents placeholder

- [ ] **Step 1: Compose the agents page**

Layout:

- `PageHeader`: "AI Agents" with description "Your autonomous recruitment workforce"
- Summary stats row: "6 Agents" | "4 Active" | "47 tasks processed today" — use small cards or inline badges
- Agent cards in a grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`
- Below: full-width Activity Log card

The whole page should feel like a "command center" — slightly different visual tone. Consider a very subtle dark overlay or gradient on the page background (just `bg-muted/30` on the main area) to differentiate from other pages.

- [ ] **Step 2: Update App.tsx**

Replace AI agents placeholder with `<AgentsPage />`.

- [ ] **Step 3: Verify**

Verify: all 6 agent cards render, toggles work, activity log shows items with simulated real-time updates, page feels like a control center.

- [ ] **Step 4: Commit**

```bash
git add src/components/ai-agents/ src/App.tsx
git commit -m "feat: assemble AI Agents command center with real-time activity"
```

---

## Phase 8: Reports

### Task 30: Reports Page

**Files:**

- Create: `src/components/reports/reports-page.tsx`
- Modify: `src/App.tsx` — replace reports placeholder

- [ ] **Step 1: Build the reports page**

A dashboard-style page with charts using `recharts`.

Layout:

- `PageHeader`: "Reports" with description "Recruitment performance analytics"
- Actions: date range selector (mock — just 3 badges: "7 Days", "30 Days", "90 Days" with toggle)

Charts (in a grid `grid-cols-1 lg:grid-cols-2 gap-6`):

1. **Hiring Funnel** — vertical bar chart showing candidates at each pipeline stage (New: 32, Screening: 24, Interview: 18, Offer: 8, Hired: 5). Use primary color with decreasing opacity for each stage.
2. **Hires Over Time** — area chart showing hires per month (last 6 months). Smooth curve, gradient fill from primary to transparent.
3. **Source Distribution** — pie/donut chart showing candidate sources (LinkedIn 40%, Referral 25%, Agency 20%, Direct 15%). Use chart-1 through chart-4 colors.
4. **AI Confidence Trend** — line chart showing AI confidence score over last 30 days (hovering around 88-93%). Use ai-amber color for the line.

Each chart is in a Card with a title. Cards have entrance stagger animation.

Use recharts `ResponsiveContainer` for all charts. Style recharts with Tailwind CSS variables for colors.

- [ ] **Step 2: Update App.tsx**

Replace reports placeholder with `<ReportsPage />`.

- [ ] **Step 3: Verify**

Verify: all 4 charts render with mock data, charts are responsive, date range toggle works (mock — just filter display), animations on entrance.

- [ ] **Step 4: Commit**

```bash
git add src/components/reports/ src/App.tsx
git commit -m "feat: add Reports view with hiring funnel, trends, and source charts"
```

---

## Phase 9: Polish & Final Touches

### Task 31: Dark Mode Toggle

**Files:**

- Modify: `src/components/layout/top-nav.tsx` — add dark mode toggle
- Modify: `src/main.tsx` — add ThemeProvider

- [ ] **Step 1: Add ThemeProvider to main.tsx**

Wrap the app in `ThemeProvider` from `next-themes`:

```tsx
import { ThemeProvider } from 'next-themes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
);
```

- [ ] **Step 2: Add toggle button to top nav**

In the right section of the top nav, add a `Sun`/`Moon` icon button that toggles between light and dark mode using `useTheme()` from `next-themes`. The icon should animate (rotate + fade) on toggle.

- [ ] **Step 3: Verify dark mode**

Toggle dark mode and verify:

- Background switches to dark
- All cards, text, borders adapt
- AI shimmer/glow effects look good in dark mode
- Charts readable in dark mode
- No elements with hardcoded light-only colors

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx src/components/layout/top-nav.tsx
git commit -m "feat: add dark mode toggle with animated icon switch"
```

---

### Task 32: Toaster Setup & Interactive Feedback

**Files:**

- Modify: `src/App.tsx` — add Toaster
- Modify various components to add toast notifications

- [ ] **Step 1: Add Toaster to App.tsx**

Import and add `<Toaster />` from `@/components/ui/sonner` at the root level.

- [ ] **Step 2: Add toast feedback to key interactions**

Add `toast` calls (from `sonner`) to these interactions:

- Pipeline: when a candidate is moved to a new stage → `toast.success("Alice moved to Interview stage")`
- AI Agents: when an agent is toggled → `toast("Outreach Agent paused")` or `toast.success("Outreach Agent activated")`
- Jobs: when "Use This Description" is clicked in JD writer → `toast.success("Job description saved")`
- Talent Pool: when "Review Duplicates" is clicked → `toast("Showing duplicate candidates")` + filter to duplicates

- [ ] **Step 3: Verify toasts work**

Each interaction should show a brief, non-intrusive toast in the bottom-right.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx src/components/
git commit -m "feat: add toast notifications for key user interactions"
```

---

### Task 33: Responsive Polish & Final QA

**Files:**

- Potentially modify various layout/component files

- [ ] **Step 1: Mobile layout verification**

Resize browser to 375px width (iPhone). Verify each page:

- **Dashboard:** Single column layout, all sections stack, horizontal scroll on applications
- **Pipeline:** Kanban scrolls horizontally, cards are readable
- **Talent Pool:** Table scrolls horizontally or switches to card view
- **Jobs:** Table scrolls horizontally
- **AI Agents:** Cards stack to single column
- **Reports:** Charts resize properly

Fix any overflow issues, text truncation problems, or touch target sizes.

- [ ] **Step 2: Animation performance check**

Navigate rapidly between pages. Verify:

- No animation jank or flicker
- AnimatePresence transitions are smooth
- No layout shifts during entrance animations
- Stagger animations don't feel slow (adjust timing if needed)

- [ ] **Step 3: Final visual consistency pass**

Check:

- All cards use consistent border-radius, padding, and shadow
- All text follows the weight hierarchy (800/700/600/500/400/300)
- AI elements consistently use the shimmer/glow effects
- Color usage is consistent (no random one-off colors)
- Spacing is consistent (prefer 4/6/8 spacing scale)

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: responsive polish and animation performance tuning"
```

---

### Task 34: Build Verification & Final Commit

- [ ] **Step 1: Run linting**

```bash
npm run lint
```

Fix any linting errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Fix any build errors.

- [ ] **Step 3: Preview production build**

```bash
npm run preview
```

Open browser and do a full walkthrough: Dashboard → Pipeline (drag a card) → Talent Pool (search, filter) → Jobs (open JD writer) → AI Agents (toggle an agent) → Reports → toggle dark mode → test on mobile viewport.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "chore: fix linting and build errors, production-ready prototype"
```

---

## Parallelization Notes

After Phase 2 (Layout Shell) is complete, the following phases can be built in parallel by independent subagents:

- **Phase 3** (Dashboard) — independent
- **Phase 4** (Pipeline/Kanban) — independent
- **Phase 5** (Talent Pool) — independent
- **Phase 6** (Jobs) — independent
- **Phase 7** (AI Agents) — independent
- **Phase 8** (Reports) — independent

Each phase only depends on:

1. The types from `src/types/index.ts` (Task 3)
2. The mock data from `src/lib/mocks/` (Task 4)
3. The shared components from `src/components/shared/` (Task 6)
4. The layout shell for final integration into `App.tsx` (Task 10)

Each page component is self-contained. **IMPORTANT:** When parallelizing, do NOT have each subagent modify `App.tsx` independently — this causes merge conflicts. Instead, each subagent should only build its page components. A single final integration task should then update `App.tsx` to import and wire up all completed pages at once.

**Phase 9** (Polish) must run after all feature phases complete.

---

## Summary

| Phase           | Tasks | Description                                                |
| --------------- | ----- | ---------------------------------------------------------- |
| 1. Foundation   | 1-4   | Dependencies, design system, types, mock data              |
| 2. Layout Shell | 5-10  | Navigation, sidebar, mobile nav, app shell                 |
| 3. Dashboard    | 11-16 | Welcome, metrics, priorities, recent apps, AI insights     |
| 4. Pipeline     | 17-19 | Candidate cards, Kanban columns, drag-and-drop board       |
| 5. Talent Pool  | 20-23 | Search, table, duplicate detection, page assembly          |
| 6. Jobs         | 24-26 | Jobs table, AI JD writer with typing effect, page assembly |
| 7. AI Agents    | 27-29 | Agent cards, activity log, command center                  |
| 8. Reports      | 30    | Charts with recharts                                       |
| 9. Polish       | 31-34 | Dark mode, toasts, responsive polish, build verification   |

**Total: 34 tasks across 9 phases**
