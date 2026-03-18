# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Triolla Talent OS** is a high-fidelity interactive frontend prototype for an agentic HR/recruitment platform designed for lean teams with a single recruiter. This prototype uses only mocked data and focuses on visual validation of the UI/UX before backend implementation.

### Scope & Constraints
- **Frontend-only prototype** with no backend integration
- **Mock data only** — all data is hardcoded or generated in component state
- **Visual design focus** — the prototype should look and feel exactly like the final production product
- **Non-technical users in mind** — the UI must be intuitive for recruiters without technical background

## Architecture & Directory Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (pre-built, reusable)
│   ├── layout/          # Layout components (navigation, sidebars, headers)
│   ├── dashboard/       # Dashboard-specific components
│   ├── pipeline/        # Pipeline/Kanban related components
│   ├── talent-pool/     # Talent pool search/duplicate detection components
│   ├── jobs/            # Job openings & AI JD writer components
│   └── ai-agents/       # AI agents control center components
├── lib/
│   ├── utils.ts         # Shared utility functions
│   └── mocks/           # Mock data generators and fixtures
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component with routing
└── main.tsx             # React DOM entry point
```

## Core Features & Views

Based on the PRD, the app has these main sections:

1. **Dashboard** — The operational hub with:
   - Welcome card with personalized greeting
   - Key metrics (active roles, candidates in pipeline, hires, AI confidence)
   - Today's priorities (actionable AI suggestions)
   - Recent applications (scrollable/table view)
   - AI insights panel

2. **Pipeline** — Drag-and-drop Kanban board with columns:
   - New → Screening → Interview → Offer → Hired/Rejected
   - Candidate cards showing basic info and AI match scores

3. **Talent Pool** — Search interface with:
   - Large candidate database simulation
   - Duplicate detection alerts (visual mockups showing duplicates)
   - Integration fee savings messaging

4. **Job Openings** — Table view with:
   - Active and drafted positions
   - "Draft with AI" modal flow
   - Simulated AI typing effect for generated job descriptions

5. **AI Agents** — Control center showing:
   - Backend agent toggles (mock controls)
   - Activity logs and status indicators
   - Processing state mockups

## Critical PRD Principles

When building any view, keep these principles in mind:

- ✅ **No video screening** — all screening must show text + voice modalities only
- ✅ **500 CVs/month scale** — UI should appear capable of handling this volume
- ✅ **AI-first UX** — natural language inputs, AI suggestions throughout
- ✅ **Non-technical friendly** — plain English, intuitive workflows
- ✅ **Duplicate detection ROI** — clearly show how duplicates are flagged to save sourcing fees
- ✅ **Agentic workflows** — visual indication that AI is handling things autonomously

## Global Navigation & Layout

### Top Navigation Bar (persistent across all screens)
- **Left**: Triolla logo
- **Center**: Global search bar (natural language, e.g., "Find developers with React experience")
- **Right**: "Ask AI" ✨ button, notification bell 🔔, recruiter avatar 👤

### Left Sidebar (main menu)
- 🏠 Dashboard
- 🔄 Pipeline
- 🏊 Talent Pool
- 💼 Job Openings
- 🤖 AI Agents
- 📊 Reports

### Mobile Responsiveness
On mobile devices, the left sidebar collapses into a **bottom navigation bar** with large, touch-friendly buttons. Use Tailwind responsive classes (`hidden md:block`, `md:hidden`, etc.) to toggle between desktop and mobile layouts.

## Technology Stack & Setup

- **React 19.2** — Latest React with concurrent features
- **TypeScript 5.9** — Strict mode enabled
- **Tailwind CSS 4.2** — Utility-first CSS framework with @tailwindcss/vite
- **Vite 8** — Fast build tool and dev server
- **shadcn/ui** — Pre-built, accessible components (button, card, dialog, etc.)
- **@tanstack/react-table** — Headless table library for data grids
- **recharts** — Composable React charting library
- **lucide-react** — Icon library
- **next-themes** — Dark mode support

## Component & UI Guidelines

### shadcn/ui Components
Shadcn/ui components are already installed in `src/components/ui/`. When building views:

- Use existing shadcn components (Button, Card, Dialog, Input, etc.) for consistency
- Extend or compose shadcn components rather than creating custom versions
- All components support Tailwind CSS class customization via the `className` prop

### Styling Approach
- **Tailwind CSS utility classes** for all styling (no inline styles or CSS files)
- **Dark mode support** via `next-themes` — use `dark:` prefixes for dark mode classes
- **Responsive design** with `sm:`, `md:`, `lg:`, `xl:` breakpoints
- **Consistent spacing** — use Tailwind's spacing scale (4px unit)

### Icons
- Use **lucide-react** for all icons (e.g., `<BarChart3 className="w-4 h-4" />`)
- Keep icon sizes small (typically `w-4 h-4` or `w-5 h-5`)

## Mock Data Strategy

- Create mock data in **`src/lib/mocks/`** — separate files for each domain (candidates, jobs, agents)
- Use consistent mock data across components for a cohesive prototype experience
- Mock API responses should feel realistic (include timestamps, realistic text, proper counts)
- All data is **hardcoded or derived from initial state** — no actual API calls

Example structure:
```typescript
// src/lib/mocks/candidates.ts
export const mockCandidates = [
  {
    id: '1',
    name: 'Alice Johnson',
    role: 'Senior PM',
    aiScore: 92,
    // ...
  },
  // ...
];
```

## Development Commands

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Type check and build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Code Style & Best Practices

- **Strict TypeScript** — all components should be typed, no `any` unless unavoidable
- **React best practices** — use hooks (useState, useEffect, useCallback), avoid class components
- **Accessible components** — all interactive elements must be keyboard accessible, use semantic HTML
- **Performance** — use React.memo for expensive components, avoid unnecessary re-renders
- **Component composition** — prefer small, focused components over monolithic views
- **Naming conventions**:
  - Components: PascalCase (e.g., `DashboardView`)
  - Files: kebab-case for component files (e.g., `dashboard-view.tsx`)
  - Types: PascalCase (e.g., `Candidate`, `Job`)
  - Mock functions: prefixed with `mock` (e.g., `mockCandidates()`)

## Testing & Linting

- ESLint is configured with React and TypeScript rules
- Run `npm run lint` before committing code
- Fix linting issues automatically where possible (`eslint --fix`)
- Focus on visual testing in the prototype phase — manually verify UI matches PRD

## Import Aliases

Use the `@/` alias for imports from `src/`:
```typescript
import { Button } from '@/components/ui/button';
import { mockCandidates } from '@/lib/mocks/candidates';
```

## Key Implementation Notes

1. **Start with layout components** — build the top nav, sidebar, and responsive layout first
2. **Dashboard is the entry point** — implement the dashboard view with all sections
3. **Use component composition** — break down large views into smaller, reusable components
4. **Mock all data** — don't leave blank placeholders; populate with realistic mock data
5. **Handle responsive design early** — don't build desktop-first and add mobile later
6. **Visual consistency** — refer to the PRD for exact wording, tone, and visual hierarchy

## Common Workflows

### Adding a New Page
1. Create component file in appropriate subdirectory (e.g., `src/components/jobs/jobs-page.tsx`)
2. Add mock data to `src/lib/mocks/` if needed
3. Import and add to App.tsx routing
4. Ensure responsive design works on mobile

### Adding a New Modal/Dialog
1. Use shadcn/ui `Dialog` component as base
2. Import and compose in the parent component
3. Use state (useState) to control open/close
4. Handle mock data updates in state (not real API)

### Testing a View
1. Run `npm run dev`
2. Navigate to the view in browser
3. Test on mobile using browser dev tools (`Cmd+Shift+M` on Mac)
4. Check dark mode toggle works (if implemented)
5. Verify all interactive elements work and feel natural
