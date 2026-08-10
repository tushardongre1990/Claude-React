# React 19 Mastery Roadmap

Goal: go from "have used React for years" to able to comfortably clear a React interview
pitched at **5-10 years of experience** — deep hooks/internals knowledge, React 19 fluency,
architecture and system-design ability, not just component syntax.

## How this works

- Notes live one folder per chapter under `notes/`, numbered in learning order.
- **Only outlines exist right now.** Each chapter's `README.md` lists what will be covered,
  but the actual explanations, code samples, and gotchas are written only when that chapter
  is unlocked.
- To unlock the next chapter, just say **"next chapter"** (or name a specific chapter/number
  if you want to jump around or revisit one).
- Each chapter folder contains:
  - `README.md` — the chapter notes (outline now, full notes once unlocked)
  - `exercises/` — hands-on exercises for that chapter (added on unlock)
  - `revision.md` — a short cheat-sheet for fast pre-interview review (filled in once the
    chapter is completed)
- Code for exercises and mini-projects goes in [`app/`](../../app/), the Vite + React 19 +
  TypeScript + Tailwind project, generally under `app/src/chapters/<chapter-slug>/`.
- Cross-cutting review material lives outside the chapter folders:
  - [`revision-notes/`](../../revision-notes/) — a master index that links every chapter's
    cheat sheet, for rapid full-syllabus review close to an interview.
  - [`improvement-tracker/weak-areas.md`](../../improvement-tracker/weak-areas.md) — gaps and
    mistakes noticed during exercises/mock interviews, so nothing gets forgotten.
- Full session context, conventions, and how to resume this project (including from a
  different machine) live in [`/CLAUDE.md`](../../CLAUDE.md) at the repo root.

## Curriculum

| # | Chapter | Status |
|---|---------|--------|
| 01 | [Foundations: JSX, Rendering & Components](../01-foundations/README.md) | Not Started |
| 02 | [State & Events](../02-state-and-events/README.md) | Not Started |
| 03 | [Side Effects & Lifecycle](../03-side-effects-and-lifecycle/README.md) | Not Started |
| 04 | [Refs & the DOM](../04-refs-and-dom/README.md) | Not Started |
| 05 | [Context API & useReducer](../05-context-and-reducers/README.md) | Not Started |
| 06 | [Performance & Memoization](../06-performance-and-memoization/README.md) | Not Started |
| 07 | [React 19 New Features](../07-react-19-features/README.md) | Not Started |
| 08 | [Component Design Patterns](../08-component-design-patterns/README.md) | Not Started |
| 09 | [Forms in Depth](../09-forms-in-depth/README.md) | Not Started |
| 10 | [Routing (React Router v7)](../10-routing/README.md) | Not Started |
| 11 | [Data Fetching & Server State](../11-data-fetching-and-server-state/README.md) | Not Started |
| 12 | [Global State Management](../12-global-state-management/README.md) | Not Started |
| 13 | [TypeScript with React](../13-typescript-with-react/README.md) | Not Started |
| 14 | [Testing React Applications](../14-testing/README.md) | Not Started |
| 15 | [Architecture, SSR & React Server Components](../15-architecture-ssr-and-rsc/README.md) | Not Started |
| 16 | [React Internals: Fiber & Reconciliation](../16-react-internals/README.md) | Not Started |
| 17 | [Accessibility & Web Vitals](../17-accessibility-and-web-vitals/README.md) | Not Started |
| 18 | [System Design & Mock Interviews](../18-system-design-and-mock-interviews/README.md) | Not Started |

Status values: `Not Started` → `In Progress` → `Done`. This table and the mirrored one in
`CLAUDE.md` are the source of truth for where we are — update both when a chapter's status
changes.

## Suggested pacing

Chapters 01-06 are foundation-solidifying (fast if you're already comfortable, but don't
skip — interviewers probe exactly the details that get papered over by daily habit).
Chapter 07 (React 19) is the highest-priority chapter if your hands-on experience predates
React 19. Chapters 08-14 are breadth across the ecosystem a senior engineer is expected to
navigate. Chapters 15-16 are the "explain it on a whiteboard" depth chapters. Chapter 17 is a
quick but often-skipped credibility booster. Chapter 18 is the capstone — don't attempt it
until most of 01-17 are done.
