# CLAUDE.md — React 19 Mastery Project

This file is the persistent context for this repo. It is committed to git so the project can
be resumed from **any machine or any new Claude Code session** with zero lost context. Read
this file first, in full, before doing anything else in this repo.

## What this project is

The user is preparing for a React interview pitched at **5-10 years of experience** — deep
hooks/internals knowledge, React 19 fluency, ecosystem breadth, and system-design ability, not
just "can write a component." This repo is both a learning curriculum (`notes/`) and a
hands-on codebase (`app/`) built chapter by chapter as that curriculum progresses.

## The single most important working rule

**Only the current/completed chapters have detailed content. Every other chapter folder
contains an outline only** (`README.md` with topics to cover, empty `exercises/`, and a
placeholder `revision.md`).

Do **not** write detailed notes, explanations, exercises, or example code for a chapter until
the user explicitly asks to start it — e.g. "next chapter", "let's do chapter 7", "start
React 19 features". This was an explicit, deliberate instruction from the user: they want to
learn chapter by chapter, not be handed the whole syllabus pre-written. Never get ahead of
where the user actually is.

When a chapter is unlocked, do all of the following for that chapter (not future ones):
1. Fill in `notes/<NN-slug>/README.md` with real explanations — assume a strong existing
   React developer, so focus on *depth, nuance, gotchas, and interview framing* rather than
   basic tutorial prose. Call out what's new/changed in React 19 wherever relevant.
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
   [`notes/00-roadmap/README.md`](notes/00-roadmap/README.md) and the mirrored table below in
   this file. Keep them in sync — this file is what a fresh session reads first.

## Repo structure

```
/
├── CLAUDE.md                 ← you are here — always read first
├── README.md                 ← short human-facing overview, points back to this file
├── app/                      ← Vite + React 19 + TypeScript + Tailwind CSS v4
│   └── src/chapters/<NN-slug>/   ← exercise/mini-project code, created per chapter as unlocked
├── notes/
│   ├── 00-roadmap/README.md  ← curriculum overview + status table (source of truth on structure)
│   ├── 01-foundations/
│   │   ├── README.md         ← chapter notes (outline now, full notes once unlocked)
│   │   ├── exercises/README.md
│   │   └── revision.md
│   ├── 02-state-and-events/  ← same shape, repeated for all 18 chapters
│   ├── ...
│   └── 18-system-design-and-mock-interviews/
├── revision-notes/README.md  ← master index linking every chapter's revision.md, for full-syllabus review
└── improvement-tracker/
    └── weak-areas.md         ← running log of mistakes/gaps observed, with status Open/Resolved
```

## Tech stack decisions (already made — don't re-ask)

- **React 19**, functional components + hooks only. No class components except where a
  chapter explicitly discusses them for historical/interview context.
- **TypeScript**, strict — the user chose TS over JS specifically so TS-with-React becomes
  part of the interview prep (see chapter 13).
- **Vite** as the build tool (`app/`), scaffolded with `create-vite` react-ts template.
- **Tailwind CSS v4**, wired in via `@tailwindcss/vite` (no `tailwind.config.js`/PostCSS
  needed — v4's Vite plugin + `@import "tailwindcss";` in `src/index.css` is sufficient).
- **npm** as the package manager (not pnpm/yarn).
- No backend/database — this is a frontend-only learning repo. Chapters that need "server"
  concepts (data fetching, SSR/RSC, Actions) mock or use public APIs / Next.js's own dev
  server for the SSR chapter specifically.
- Git repo initialization and the first GitHub push are the **user's** responsibility — do not
  run `git init`, `git remote add`, or push on their behalf unless they explicitly ask again in
  a future session.

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

_Keep this table's status column in sync with `notes/00-roadmap/README.md`. Update the "Notes"
column with anything a fresh session needs to know (e.g. "exercise 3 left unfinished")._

| # | Chapter | Status | Notes |
|---|---------|--------|-------|
| 01 | Foundations: JSX, Rendering & Components | Not Started | |
| 02 | State & Events | Not Started | |
| 03 | Side Effects & Lifecycle | Not Started | |
| 04 | Refs & the DOM | Not Started | |
| 05 | Context API & useReducer | Not Started | |
| 06 | Performance & Memoization | Not Started | |
| 07 | React 19 New Features | Not Started | |
| 08 | Component Design Patterns | Not Started | |
| 09 | Forms in Depth | Not Started | |
| 10 | Routing (React Router v7) | Not Started | |
| 11 | Data Fetching & Server State | Not Started | |
| 12 | Global State Management | Not Started | |
| 13 | TypeScript with React | Not Started | |
| 14 | Testing React Applications | Not Started | |
| 15 | Architecture, SSR & React Server Components | Not Started | |
| 16 | React Internals: Fiber & Reconciliation | Not Started | |
| 17 | Accessibility & Web Vitals | Not Started | |
| 18 | System Design & Mock Interviews | Not Started | |

## User preferences / how to teach this user

- Treat the user as an experienced engineer, not a beginner. Assume familiarity with JS/ES6+,
  general software engineering, and prior React exposure — the goal is filling gaps and
  updating stale knowledge to React 19, not "what is a component" 101.
- Prioritize *interview framing*: for every concept, be explicit about how it could show up as
  an interview question and what a strong answer sounds like, not just how the API works.
- Be explicit about what changed in **React 19** specifically vs older React the user may have
  learned — don't assume they already know the delta.
- Prefer depth and precision over breadth-padding. This user wants mastery, not a tour.
- Don't write ahead of the current chapter (see working rule above) — this has been asked for
  explicitly and repetition of this instruction is unnecessary once followed correctly.

## Commands

```bash
cd app
npm install       # first time / after pulling on a new machine
npm run dev        # start dev server
npm run build       # type-check (tsc -b) + production build
npm run preview     # preview the production build
npm run lint        # oxlint
```
