# CLAUDE.md — React 19 Mastery Project

This file is the persistent context for this repo. It is committed to git so the project can
be resumed from **any machine or any new Claude Code session** with zero lost context. Read
this file first, in full, before doing anything else in this repo.

## What this project is

The user is preparing for a React interview pitched at **5-10 years of experience** — deep
hooks/internals knowledge, React 19/19.2 fluency, ecosystem breadth beyond just React itself
(JS/browser fundamentals, API/auth/security, architecture, production concerns), and
system-design ability, not just "can write a component." This repo is a learning curriculum
(`notes/`), a dedicated coding-interview problem bank (`coding-interviews/`), short-form
interview drilling material (`interview-questions/`), and a hands-on codebase (`app/`), built
chapter by chapter as the curriculum progresses.

The curriculum was originally 18 chapters, then expanded to **23 chapters (00-22)** on
2026-08-11 after the user had it reviewed externally and gaps were identified (JS/browser
fundamentals, React 19.2, React Compiler depth, API/auth/security, production concerns, a
dedicated coding-interview bank). A second external review (same day) proposed further
tightening — mostly wording precision fixes and additions *inside* existing chapters, not new
chapters — which was applied except for one item: **the user explicitly rejected adding a CSS
fundamentals section to ch.00**, judging it tangential to this specific goal. Don't re-propose
CSS content into this curriculum unless the user brings it up again. If you're resuming this
project, treat the structure described below (including the wording in each chapter's
`README.md`) as current — don't re-propose the original 18-chapter version or undo the
terminology fixes (e.g. "Server Functions/Server Actions" not just "Server Actions";
`createRoot` described as a React-18-introduced API, not React-19-specific).

A third external review (same day) claimed the repo still contained 8 stale duplicate chapter
folders from the pre-restructure layout. **That claim was checked directly against the
filesystem and git history and was false** — the repo was already clean. The legitimate parts
of that review were still applied: removed a stray empty root `package-lock.json`, added small
bullets to ch.12/18/21, aligned ch.22's mock-interview count with `assessment/`, and made the
chapter-level vs overall readiness thresholds explicit. **Lesson for future sessions:** when an
external review makes a structural claim about this repo's current state, verify it against
the actual filesystem/git before acting on it rather than trusting the claim — external
reviewers may be working from a stale copy. Full detail in `notes/README.md`'s revision
history.

## The single most important working rule

**Only the current/completed chapters (and problems/questions the user has actually picked)
have detailed content. Everything else is an outline only** — chapter folders contain a
`README.md` with topics to cover, empty `exercises/`, and a placeholder `revision.md`;
`coding-interviews/` and `interview-questions/` subfolders contain an index of problem/snippet
titles only.

Do **not** write detailed notes, explanations, exercises, or example code for a chapter (or a
specific coding-interview problem, or an explain-this-output snippet) until the user
explicitly asks to start it — e.g. "next chapter", "let's do chapter 7", "let's try the
debounced search problem". This was an explicit, deliberate instruction from the user: they
want to learn incrementally, not be handed the whole syllabus pre-written. Never get ahead of
where the user actually is.

**Exception:** the `assessment/` folder (scorecards, readiness checklist) is process tooling,
not chapter content — it was created fully filled-in as templates from the start and should be
*updated* (rows filled in, scores added) as the user progresses, not left as a placeholder.

When a chapter is unlocked, do all of the following for that chapter (not future ones):
1. Fill in `notes/<NN-slug>/README.md` with real explanations — assume a strong existing
   React developer, so focus on *depth, nuance, gotchas, and interview framing* rather than
   basic tutorial prose. Call out what's new/changed in React 19/19.2 wherever relevant. For
   chapter 07 specifically, verify current API details against the live React docs rather than
   relying purely on prior knowledge — those APIs were newer at curriculum-design time.
2. Add hands-on exercises to `notes/<NN-slug>/exercises/` (problem statements), with starter
   and solution code living in `app/src/chapters/<NN-slug>/`.
3. As the user works through the chapter, actively watch for mistakes, hesitations, or
   outdated mental models. Log them in
   [`improvement-tracker/weak-areas.md`](improvement-tracker/weak-areas.md) using the format
   already defined in that file. This was an explicit user request — don't skip it, and don't
   wait to be asked each time.
4. Once the chapter is solid, fill in `notes/<NN-slug>/revision.md` — a short, dense
   cheat-sheet (5-10 min re-read), not a copy of the full notes.
5. Update the chapter's **Status** to `In Progress` then `Done` in *both* places: the table in
   [`notes/README.md`](notes/README.md) and the mirrored table below in this file. Keep them
   in sync — this file is what a fresh session reads first.

   **A chapter only earns `Done` when all of the following are true, not just "notes were
   written":** concepts understood, exercises completed, at least a few relevant
   `interview-questions/` entries answered, at least one concept explained back verbally (not
   just read), and the chapter's row in
   [`assessment/chapter-scorecard.md`](assessment/chapter-scorecard.md) meets the readiness
   threshold defined there. Otherwise leave it `In Progress` — the goal is interview
   performance, not reading-completion.
6. When the user works a problem from `coding-interviews/` or a snippet from
   `interview-questions/`, fill in that specific entry in place (requirements/starter/
   solution/follow-ups, or the snippet + answer) — same "only what's been asked for" rule
   applies there too.

## Repo structure

```
/
├── CLAUDE.md                 ← you are here — always read first
├── README.md                 ← short human-facing overview, points back to this file
├── app/                      ← Vite + React 19 + TypeScript + Tailwind CSS v4
│   └── src/chapters/<NN-slug>/   ← exercise/mini-project code, created per chapter as unlocked
├── notes/
│   ├── README.md              ← curriculum overview + status table (source of truth on structure)
│   ├── 00-javascript-and-browser-fundamentals/
│   │   ├── README.md          ← chapter notes (outline now, full notes once unlocked)
│   │   ├── javascript/README.md       ← subfolder: JS fundamentals topics
│   │   ├── browser-and-web/README.md  ← subfolder: browser/web fundamentals topics
│   │   ├── exercises/README.md
│   │   └── revision.md
│   ├── 01-foundations/
│   │   ├── README.md
│   │   ├── exercises/README.md
│   │   └── revision.md
│   ├── 02-state-and-events/  ← same shape, repeated for all chapters 01-22
│   ├── ...
│   └── 22-system-design-and-mock-interviews/
├── coding-interviews/         ← implementation problem bank, separate from concept notes
│   ├── README.md
│   ├── react/README.md        ← index of ~23 React build problems
│   └── javascript/README.md   ← index of ~17 framework-free JS problems
├── interview-questions/       ← short-form drilling material
│   ├── README.md
│   ├── explain-this-output/README.md   ← "what does this log/render, and why" snippets
│   ├── react-traps/README.md           ← catalog of common misconceptions
│   └── debugging-scenarios/README.md   ← open-ended production debugging prompts
├── revision-notes/README.md  ← master index linking every chapter's revision.md, for full-syllabus review
├── improvement-tracker/
│   └── weak-areas.md         ← running log of mistakes/gaps observed, with status Open/Resolved
└── assessment/                ← process tooling, kept filled-in as progress happens (not gated like chapter content)
    ├── chapter-scorecard.md
    ├── mock-interview-scorecard.md
    └── final-readiness.md
```

## Tech stack decisions (already made — don't re-ask)

- **React 19** (currently 19.2.x per `app/package.json`), functional components + hooks only.
  No class components except where a chapter explicitly discusses them for
  historical/interview context.
- **TypeScript**, strict — the user chose TS over JS specifically so TS-with-React becomes
  part of the interview prep (see chapter 14).
- **Vite** as the build tool (`app/`), scaffolded with `create-vite` react-ts template.
- **Tailwind CSS v4**, wired in via `@tailwindcss/vite` (no `tailwind.config.js`/PostCSS
  needed — v4's Vite plugin + `@import "tailwindcss";` in `src/index.css` is sufficient).
- **npm** as the package manager (not pnpm/yarn).
- No backend/database — this is a frontend-only learning repo. Chapters that need "server"
  concepts (data fetching, SSR/RSC, Actions, auth) mock or use public APIs / Next.js's own dev
  server for the SSR chapter specifically.
- Git repo initialization and the first GitHub push are the **user's** responsibility — do not
  run `git init`, `git remote add`, or push on their behalf unless they explicitly ask again in
  a future session. (As of this writing the user has already connected a GitHub remote
  themselves.)

## How to resume this project (new session / new machine checklist)

1. Read this file fully.
2. Check the **Current Progress** table below to see which chapter is active.
3. Open that chapter's `notes/<NN-slug>/README.md` to see what's already written and what
   topics remain.
4. Check [`improvement-tracker/weak-areas.md`](improvement-tracker/weak-areas.md) for open
   items — these are things worth re-testing the user on before moving forward.
5. Do not jump ahead to future chapters' content — see the working rule above.
6. If `app/node_modules` is missing (fresh clone on a new machine), run `npm install` inside
   `app/` before trying to run/build anything.

## Current Progress

_Keep this table's status column in sync with `notes/README.md`. Update the "Notes" column
with anything a fresh session needs to know (e.g. "exercise 3 left unfinished")._

| # | Chapter | Status | Notes |
|---|---------|--------|-------|
| 00 | JavaScript & Browser Fundamentals | In Progress | Notes (both subfolders) + exercises + starter kata files written 2026-08-11. User is now working through exercises. `revision.md` and `Done` status pending completion. |
| 01 | Foundations: JSX, Rendering & Components | Not Started | |
| 02 | State & Events | Not Started | |
| 03 | Side Effects & Lifecycle | Not Started | |
| 04 | Refs & the DOM | Not Started | |
| 05 | Context API & useReducer | Not Started | |
| 06 | Performance, Memoization & the React Compiler | Not Started | |
| 07 | React 19 & 19.2: Modern APIs | Not Started | |
| 08 | Component Design Patterns | Not Started | |
| 09 | Forms in Depth | Not Started | |
| 10 | Routing (React Router) | Not Started | |
| 11 | Data Fetching & Server State | Not Started | |
| 12 | API Integration, Authentication & Security | Not Started | |
| 13 | Global State Management | Not Started | |
| 14 | TypeScript with React | Not Started | |
| 15 | Testing React Applications | Not Started | |
| 16 | Error Handling, Debugging & Observability | Not Started | |
| 17 | Architecture, SSR & React Server Components | Not Started | |
| 18 | Frontend Application Architecture | Not Started | |
| 19 | React Internals: Fiber & Reconciliation | Not Started | |
| 20 | Accessibility & Web Vitals | Not Started | |
| 21 | Production React | Not Started | |
| 22 | System Design & Mock Interviews | Not Started | |

## User preferences / how to teach this user

- Treat the user as an experienced engineer, not a beginner. Assume familiarity with JS/ES6+,
  general software engineering, and prior React exposure — the goal is filling gaps and
  updating stale knowledge to React 19/19.2, not "what is a component" 101.
- **Explain concepts via code examples and Mermaid diagrams as much as possible** — this was
  an explicit request. Use Mermaid for anything that's a state machine, a sequence/timing
  relationship, a tree/hierarchy, or a decision flowchart (closures/scope, the event loop,
  Promise states, prototype chains, request lifecycles, `this`-binding rules, etc.). Applies
  to every chapter's notes going forward.
- Prioritize *interview framing*: for every concept, be explicit about how it could show up as
  an interview question and what a strong answer sounds like, not just how the API works.
- Be explicit about what changed in **React 19 / 19.2** specifically vs older React the user
  may have learned — don't assume they already know the delta.
- Prefer depth and precision over breadth-padding. This user wants mastery, not a tour — this
  is exactly why the curriculum was expanded to 23 chapters based on a real gap analysis
  rather than padded further to the ~27-chapter "encyclopedic" version that was also proposed
  and explicitly rejected as overkill.
- Don't write ahead of the current chapter (see working rule above) — this has been asked for
  explicitly and repetition of this instruction is unnecessary once followed correctly.
- Use `coding-interviews/` and `interview-questions/` actively, not just `notes/` — the user's
  goal is interview *performance*, and drilling/output-prediction/traps are as important as
  the explanatory notes.

## Commands

```bash
cd app
npm install       # first time / after pulling on a new machine
npm run dev        # start dev server
npm run build       # type-check (tsc -b) + production build
npm run preview     # preview the production build
npm run lint        # oxlint
```
