# DECISIONS.md

Design and implementation decisions made during the Triolla Talent OS prototype. Each entry documents what was decided, why, and its impact on the PRD or codebase.

---

## [2026-03-19] Remove "Text + Voice" Screening Badge from Pipeline

**Decision:** Remove the visual "Text + Voice" badge from the Screening Kanban column.

**Why:** The no-video constraint is already enforced at the agent level — the Screening Agent mock data explicitly describes "Text & Voice screening". A redundant UI badge on the column header added noise without informational value.

**Impact:** Removed from PRD Section 2 (constraint now reads "text + voice only — no video modality" without requiring a UI badge). Dead commented-out code cleaned up from `kanban-column.tsx`.

---

## [2026-03-19] AI JD Writer Typing Speed

**Decision:** Accept faster typing animation (~12ms interval, 2–5 chars/tick, ~1.5s total) over original plan spec (~30ms/char, ~22s total).

**Why:** The slower spec was intended to simulate "watching AI think" but in practice felt like a loading state rather than a wow moment. The snappier version feels more polished and demo-friendly.

**Impact:** Plan Task 25 updated to reflect accepted spec. `ai-jd-writer.tsx` kept as-is.

---

## [2026-03-19] Reports Date Range Toggle (Non-functional Placeholder)

**Decision:** The 7/30/90 Day toggle is UI-only — charts display the same mock data regardless of selection.

**Why:** Prototype scope. The toggle demonstrates the intended interaction pattern and UX. Live filtering requires backend time-series data.

**Impact:** "Live filtering coming soon" label added below toggle. Added to PRD Section 5.5. Will be wired up in production.

---

## [2026-03-19] AIGlowCard Component

**Decision:** Export `AIGlowCard` from `src/components/shared/ai-shimmer.tsx` as the canonical wrapper for animated gradient borders.

**Why:** The `ai-glow-border` CSS class needed a React wrapper to be composable in JSX. `AIGlowCard` provides a reusable, semantically clear abstraction.

**Impact:** Added to PRD (AI visual language). Use `AIGlowCard` wherever an animated gradient border is needed.

---

## [2026-03-19] Department Quick-Select Chips in AI JD Writer

**Decision:** AI JD Writer input step includes department chips (Engineering, Product, Design, Sales, Marketing, Operations) that append to the prompt textarea.

**Why:** Improves demo interactivity and discoverability for non-technical users. Allows one-click prompt population without typing, which makes the demo flow faster and more impressive.

**Impact:** Added to PRD Section 5.3.

---

## [2026-03-19] Per-Agent Color Stripes in Activity Log

**Decision:** Each activity row in the AI Agents activity log has a colored left-border stripe unique to the agent (keyed via `AGENT_COLORS` map in `activity-log.tsx`).

**Why:** When multiple agents appear in the feed simultaneously, the color stripe allows instant visual attribution without reading the agent name. Improves at-a-glance readability in a fast-moving feed.

**Impact:** Added to PRD Section 5.4.

---

## [2026-03-19] Animated Confidence Bar on AI Insights Panel

**Decision:** Each insight in the Dashboard AI Insights Panel shows an animated width bar representing the confidence score (e.g., 85% → bar fills to 85% width on mount).

**Why:** Transforms an abstract percentage into a spatial, animated signal. Adds meaningful motion to the "wow" panel without being gratuitous.

**Impact:** Added to PRD Section 4 (AI Insights Panel description).

---

## [2026-03-19] KPI Stat Cards Row on Reports Page

**Decision:** Reports page opens with 4 KPI metric cards (Total Hired, Time to Hire, Pipeline Conversion, AI Confidence) above the charts.

**Why:** Provides immediate at-a-glance metrics without requiring chart-reading. Follows standard analytics UX pattern and makes the page feel data-rich from first glance.

**Impact:** Added to PRD Section 5.5.

---

## [2026-03-19] AI Summary Footer on Reports Page

**Decision:** Reports page ends with an AI-generated plain English paragraph summarizing the chart data and offering recommendations (with shimmer text).

**Why:** Directly demonstrates the "AI-first UX" principle — AI synthesizes raw data into actionable recruiter language. A strong differentiator vs. traditional BI dashboards.

**Impact:** Added to PRD Section 5.5.

---

## [2026-03-19] "Powered by Triolla AI" Sidebar Badge

**Decision:** Sidebar footer shows a small branded badge with amber-to-coral gradient icon and shimmer text.

**Why:** Subtle brand reinforcement that keeps the AI-first positioning visible at all times. Consistent with the platform's identity.

**Impact:** No PRD entry needed — cosmetic branding detail. Keep in `sidebar.tsx`.

---

## [2026-03-19] Toast Notifications Deferred to Phase 9

**Decision:** `<Toaster />` component from `sonner` is not mounted in Phases 1–8. Agent card toggle calls to `toast()` are silently dropped.

**Why:** Toast notification design and placement is part of Phase 9 polish. Mounting the Toaster in Phase 8 would produce unstyled toasts that contradict the final design.

**Impact:** `ThemeProvider` added to `main.tsx` as Phase 9 preparation. `<Toaster />` will be added in Phase 9 Task 32.
