# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project

**Triolla Talent OS** — frontend-only interactive prototype for an agentic HR/recruitment platform. No backend, no API calls — all data is mocked.

### Hard Constraints

- Mock data only (hardcoded or component state)
- No video screening — text + voice modalities only
- AI-first UX: natural language inputs, AI suggestions throughout
- Non-technical friendly: plain English, intuitive workflows
- Duplicate detection: flag candidates from agencies who already exist in the DB

## Commands

```bash
npm run dev      # Dev server → http://localhost:5173
npm run build    # Type-check + production build
npm run lint     # ESLint
# No test suite — this is a prototype
```

## Tech Stack

| Tool                   | Version | Notes                              |
| ---------------------- | ------- | ---------------------------------- |
| React                  | 19.2    | Concurrent features                |
| TypeScript             | 5.9     | Strict mode                        |
| Tailwind CSS           | 4.2     | via @tailwindcss/vite              |
| Vite                   | 8       |                                    |
| shadcn/ui              | —       | Components in `src/components/ui/` |
| lucide-react           | —       | All icons (`w-4 h-4` default size) |
| recharts               | —       | Charts                             |
| @tanstack/react-table  | —       | Data grids                         |
| next-themes            | —       | Dark mode                          |
| motion (framer-motion) | —       | Animations — use `motion` import   |

## Directory Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui (don't modify)
│   ├── layout/       # Top nav, sidebar, responsive shell
│   ├── dashboard/
│   ├── pipeline/
│   ├── talent-pool/
│   ├── jobs/
│   ├── ai-agents/
│   └── reports/
├── lib/
│   ├── utils.ts
│   └── mocks/        # One file per domain (candidates.ts, jobs.ts, agents.ts)
├── types/
├── App.tsx           # Routing
└── main.tsx
```

## Design Direction

**Aesthetic:** "Refined Productivity" — Linear's precision + Notion's warmth + Apple's polish. Clean layouts with moments of delight.

**Typography:** Plus Jakarta Sans (variable, 200–800). Weight hierarchy: 800 page titles → 700 section headings → 600 card titles → 500 body emphasis → 400 body → 300 muted.

**Color palette (oklch, Tailwind CSS 4):**

- Background: warm off-white `oklch(0.985 0.002 90)` — NOT pure white
- Cards: `oklch(1 0 0)` — pure white for contrast
- Primary: rich indigo `oklch(0.55 0.25 275)`
- AI accent: warm amber `oklch(0.78 0.16 75)` → coral `oklch(0.72 0.18 40)` gradient

**AI visual language:** Amber/coral shimmer on AI text (`ai-shimmer` CSS class), animated gradient borders on AI panels (`ai-glow-border`), subtle warm glow on AI cards.

**Animations (`motion` from `motion/react`):**

- Entrance: `opacity: 0, y: 20` → `opacity: 1, y: 0`, duration 0.5s, ease `[0.25, 0.46, 0.45, 0.94]`
- Stagger children: `staggerChildren: 0.08`
- Hover lift: `whileHover={{ y: -2 }}`
- Page transitions: `AnimatePresence mode="wait"` with fade + subtle slide

**Key WOW moments:** animated number counters on metrics · AI shimmer on AI elements · staggered card entrances · Kanban drag with rotation tilt · AI JD writer typing effect · sliding sidebar active indicator · glass-morphism AI panels · duplicate detection slide-in alert

## Navigation (all screens)

**Top bar:** Logo | Global search (natural language) | Ask AI ✨ | Bell 🔔 | Avatar
**Left sidebar:** Dashboard · Pipeline · Talent Pool · Job Openings · AI Agents · Reports
**Mobile:** sidebar collapses to bottom nav bar (`hidden md:block` / `md:hidden`)

## Styling Rules

- Tailwind utility classes only — no inline styles, no CSS files
- Dark mode: `dark:` prefix classes (via next-themes)
- Responsive: `sm:` `md:` `lg:` `xl:` breakpoints
- Use shadcn/ui components as base; compose, don't rewrite

## Import Alias

```typescript
import { Button } from '@/components/ui/button'
import { mockCandidates } from '@/lib/mocks/candidates'
```

## Naming Conventions

- Components: `PascalCase`
- Files: `kebab-case.tsx`
- Types: `PascalCase`
- Mock exports: `mockX` or `MOCK_X`

## Mock Data

Keep mock data in `src/lib/mocks/` with realistic timestamps, scores, and text. Populate all UI — no empty placeholders.
