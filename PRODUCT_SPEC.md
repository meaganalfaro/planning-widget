# Planner — Product Specification

**Version:** 1.0  
**Author:** Meagan Alfaro  
**Status:** In Development

---

## Overview

Planner is an AI-powered productivity widget designed to live in the background of your desktop or phone. It solves the core frustrations of existing planner tools by combining smart scheduling, automatic calendar population, recurring patterns, and a psychological reward system — all driven by an AI onboarding flow that reads your actual syllabi and goals.

---

## The Problem

Existing productivity tools (Notion, Google Calendar, Todoist) each solve part of the planning problem but force users to:

| # | Problem |
|---|---------|
| 1 | Manually enter holidays, breaks, and days off every semester |
| 2 | Create assignments in one place, then re-enter them into a calendar separately |
| 3 | Re-enter the same recurring schedule every single week |
| 4 | Complete tasks with no incentive or sense of progress |
| 5 | Open a separate application to check their schedule instead of seeing it passively |

The result is that most planners get abandoned within weeks because the maintenance cost is higher than the benefit.

---

## The Solution

Planner is a single cohesive system where everything connects. You set it up once via an AI onboarding flow, and it maintains itself from there.

---

## Feature Specifications

### Feature 1 — Smart Date Awareness

**Problem:** Users waste time manually entering holidays, semester breaks, and recurring days off every semester.

**Solution:** Planner ships with a pre-loaded database of US federal holidays and common academic calendar events. Users only need to add personal exceptions (birthdays, trips, appointments).

**How it works:**
- On first load, the calendar is pre-populated with federal holidays for the current academic year
- During AI onboarding, the user uploads their syllabus PDFs — Claude extracts exam dates, project deadlines, and semester breaks automatically and adds them to the calendar
- Users can manually add personal events (birthdays, travel, etc.) via the existing add event popup
- Pre-loaded dates are visually distinguished from user-added dates so users always know the source

**Technical notes:**
- Federal holidays stored as a static JSON file, updated annually
- Syllabus extraction handled by Claude API with structured JSON output during onboarding
- Events tagged with a `source` field: `'system'`, `'syllabus'`, or `'user'`

---

### Feature 2 — Assignment → Calendar Pipeline

**Problem:** Users create assignments or tasks in their planner but then forget to add them to their calendar, resulting in missed deadlines.

**Solution:** Any bucket item created with a due date automatically appears on the calendar. One entry, two places. No double work.

**How it works:**
- When adding an item to a goal bucket, users can optionally attach a due date
- Items with due dates automatically create a calendar event with type `'deadline'`
- The calendar event links back to the bucket item so checking it off in one place updates both
- Color coding is consistent — a deadline from the "Master's Courses" bucket uses the same color in both the bucket view and the calendar

**Technical notes:**
- Shared state between `BucketsTab` and `CalendarTab` lifted to `App.jsx`
- Calendar events generated reactively whenever a bucket item with a date is created or updated
- Deleting a bucket item removes its corresponding calendar event

---

### Feature 3 — Recurring Weekly Pattern

**Problem:** Users have to manually re-enter the same schedule every week, which is tedious and often gets skipped.

**Solution:** The week tab defines a reusable template. The calendar automatically stamps that pattern across every week of the summer, then lets specific days override it for exceptions.

**How it works:**
- The week tab is treated as a **template**, not a one-time schedule
- When the calendar renders a week, it first fills each day from the weekly template
- Calendar-specific events (holidays, deadlines, personal events) then override the template for that specific day only
- If Monday is a holiday, the calendar shows the holiday — not the usual Monday morning template
- Users can also override any single day manually without affecting the template

**Technical notes:**
- Calendar cells follow a priority order: `user event > system event > syllabus event > weekly template`
- Template stored in `localStorage` as `week`, calendar events stored separately as `events`
- Rendering logic merges both at display time

---

### Feature 4 — Completion + Reward System

**Problem:** Completing tasks feels like maintenance, not progress. There is no incentive to finish everything, leading to partial completion and guilt.

**Solution:** A visual and psychological reward system that makes task completion feel meaningful. Days change color as tasks are completed, streaks build over time, and weekly completion unlocks a visual reward.

**How it works:**

**Day-level completion:**
- Each calendar day has a completion state: `incomplete`, `in-progress`, `complete`
- Incomplete days show in a muted version of the theme color
- As tasks are checked off, the day cell fills progressively (like a progress bar within the cell)
- Fully complete days glow in the theme accent color

**Streak system:**
- A streak counter tracks consecutive days where all tasks were completed
- Streak is displayed prominently in the widget collapsed view
- Breaking a streak resets the counter but shows a "best streak" record

**Weekly unlock:**
- Complete all tasks Monday through Friday → weekend cells unlock a special color or animation
- This uses variable ratio reinforcement — one of the most effective psychological motivators for habit formation

**Mascot reactions (stretch):**
- A small kawaii mascot character in the corner reacts to your completion state
- Idle when tasks are incomplete, happy when in progress, celebratory when fully complete

**Technical notes:**
- Task completion state stored per-day in `localStorage`
- Streak calculated from completion history on app load
- Visual states driven by CSS variable swaps on the calendar cell

---

### Feature 5 — Widget-First Design

**Problem:** Productivity tools require you to open a separate app to check your schedule, which breaks focus and means you only check it when you remember to.

**Solution:** Planner lives passively in the background of your desktop or phone. Your schedule, streak, and today's tasks are always visible without opening anything. Full functionality is one click away.

**How it works:**

**Collapsed widget view (always visible):**
- Today's date and day of week
- Current streak counter
- Today's task list with checkboxes
- A single color indicator showing today's completion state
- One tap/click to expand to the full UI

**Expanded full UI:**
- All 4 tabs: Phases, Buckets, Week, Calendar
- Full editing capabilities
- Theme switcher

**Platform targets:**
- **Web:** Deployed to Vercel, embeddable via `<iframe>` in any site or Notion page
- **Mac desktop:** Compatible with Übersicht — runs directly on the desktop background
- **Native Mac (stretch):** WidgetKit implementation for the macOS Notification Center widget layer

**Technical notes:**
- Collapsed/expanded state toggled by a single boolean in state
- Collapsed view is a separate lightweight component that reads from the same localStorage state
- Übersicht widget points to the deployed Vercel URL or uses the built HTML file directly

---

## AI Integration

The entire system is initialized by a single AI onboarding flow powered by the Claude API (BYOK — user provides their own Anthropic API key).

**Onboarding inputs:**
- Target job roles and career goals
- Uploaded syllabus PDFs (multiple supported)
- Weekly availability and schedule constraints
- Hard constraints (days off, part-time work, etc.)

**Claude outputs a single JSON object containing:**
- Personalized monthly phases with real titles and action items
- Goal buckets populated with role-specific tasks
- A weekly schedule template built around the user's actual availability
- Calendar events extracted from syllabi (exam dates, deadlines, project due dates)

**This means:**
- Zero manual setup after onboarding
- The planner reflects the user's actual life, not generic placeholders
- Re-running onboarding at the start of each semester updates everything automatically

---

## Technical Stack

| Layer | Tool | Purpose |
|---|---|---|
| Framework | React + Vite | Component architecture, fast dev |
| Styling | CSS custom properties | Theme system, 4 pastel themes |
| Persistence | localStorage | Saves all user data locally |
| AI | Anthropic Claude API | Onboarding, syllabus extraction |
| Deployment | Vercel | Free hosting, iframe embed |
| Desktop widget | Übersicht | Mac desktop background display |
| Native widget | WidgetKit (stretch) | macOS Notification Center |

---

## Design Principles

1. **Widget-first** — the collapsed view is the primary experience, not an afterthought
2. **One source of truth** — tasks entered once appear everywhere they're relevant
3. **Passive visibility** — the schedule should be visible without any action from the user
4. **Kawaii but professional** — soft pastel aesthetic with enough polish to be taken seriously
5. **AI does the setup, human does the living** — onboarding is the only complex step

---

## Roadmap

### Phase 1 — Core Widget (current)
- [x] Theme system (4 pastel themes)
- [x] Phases tab
- [x] Buckets tab  
- [x] Week tab with color-coded events
- [ ] Calendar tab
- [ ] Theme switcher component
- [ ] localStorage persistence across all tabs
- [ ] Deploy to Vercel

### Phase 2 — AI Onboarding
- [ ] Multi-step onboarding form
- [ ] PDF upload + base64 conversion
- [ ] Claude API integration (BYOK)
- [ ] Structured JSON output → widget population

### Phase 3 — Smart Calendar
- [ ] Pre-loaded US holidays
- [ ] Syllabus event extraction → calendar
- [ ] Weekly template → calendar stamping
- [ ] Assignment → calendar pipeline

### Phase 4 — Reward System
- [ ] Day completion tracking
- [ ] Progress fill on calendar cells
- [ ] Streak counter
- [ ] Weekly unlock visual
- [ ] Collapsed widget view

### Phase 5 — Platform Expansion
- [ ] Übersicht desktop widget config
- [ ] Native macOS WidgetKit (stretch)
- [ ] iOS widget (stretch)

