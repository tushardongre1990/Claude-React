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
`README.md` with topics to cover, empty `exercises/`, a placeholder `revision.md`, and (once a
chapter is unlocked — see below) an `interview-qa.md`;
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
   basic tutorial prose. Call out what's new/changed in React 19/19.2 wherever relevant.
   **Before writing (or reviewing) any chapter's content, verify current API/tooling details
   against official documentation rather than relying purely on prior/training knowledge** —
   explicit standing instruction (2026-08-13), not limited to ch.07 as originally scoped. See
   "Accuracy & currency practice" below for which docs to check per topic.
2. Add hands-on exercises to `notes/<NN-slug>/exercises/` (problem statements), with starter
   and solution code living in `app/src/chapters/<NN-slug>/`.
3. Write `notes/<NN-slug>/interview-qa.md` — every interview question a strong interviewer could
   reasonably ask from that chapter's topics, each followed by a complete, interview-ready
   answer (not a keyword or a one-liner — an answer that would actually be accepted as
   demonstrating real understanding, with a short code example where it clarifies the mechanism).
   This is created **once, in full, when the chapter's `README.md` is written** — it's a
   comprehensive drill file covering the whole chapter, not something added incrementally per
   question. It's distinct from the root-level
   [`interview-questions/`](interview-questions/README.md) folder: that folder holds short-form
   "explain this output" snippets, a cross-chapter traps catalog, and open-ended debugging
   scenarios; `interview-qa.md` is one file per chapter, comprehensively covering exactly that
   chapter's material, organized by the chapter's own section headings.

   **Format, as of the 2026-08-20 revision (after an external review of ch.00/ch.01's first-pass
   version — see `notes/README.md`'s revision history for what was checked and adopted):** each
   question is tagged (⭐ Core / 🔥 Frequent / 🧠 Deep / 🎯 Trap, plus a chapter-appropriate
   version/cross-link tag — ch.00 uses 🔗 React-link, ch.01 uses ⚠️ Version; pick what fits the
   chapter, keep it consistent within the file) and answered in two layers — a **Quick answer**
   (15-20 seconds, what you'd actually say first) followed by the **Full answer** (the complete
   depth layer for follow-ups). Each file ends with a **Coding & Scenario Questions** section that
   re-presents a subset of the same material as "what does this output / find the bug" prompts
   with code, since that's closer to how interviewers actually probe this material than a pure
   explain-the-concept question is. See `notes/00-javascript-and-browser-fundamentals/interview-qa.md`
   or `notes/01-foundations/interview-qa.md` for the concrete template — use one of them as the
   pattern for every future chapter's `interview-qa.md` from here on, same "only the unlocked
   chapter" scoping as everything else in this list.
4. As the user works through the chapter, actively watch for mistakes, hesitations, or
   outdated mental models. Log them in
   [`improvement-tracker/weak-areas.md`](improvement-tracker/weak-areas.md) using the format
   already defined in that file. This was an explicit user request — don't skip it, and don't
   wait to be asked each time.
5. Once the chapter is solid, fill in `notes/<NN-slug>/revision.md` — a short, dense
   cheat-sheet (5-10 min re-read), not a copy of the full notes.
6. Update the chapter's **Status** to `In Progress` then `Done` in *both* places: the table in
   [`notes/README.md`](notes/README.md) and the mirrored table below in this file. Keep them
   in sync — this file is what a fresh session reads first.

   **A chapter only earns `Done` when all of the following are true, not just "notes were
   written":** concepts understood, exercises completed, `interview-qa.md` written, at least a
   few relevant `interview-questions/` entries answered, at least one concept explained back
   verbally (not just read), and the chapter's row in
   [`assessment/chapter-scorecard.md`](assessment/chapter-scorecard.md) meets the readiness
   threshold defined there. Otherwise leave it `In Progress` — the goal is interview
   performance, not reading-completion.
7. When the user works a problem from `coding-interviews/` or a snippet from
   `interview-questions/`, fill in that specific entry in place (requirements/starter/
   solution/follow-ups, or the snippet + answer) — same "only what's been asked for" rule
   applies there too.

## Accuracy & currency practice

Explicit standing instruction from the user (2026-08-13): **before writing or reviewing
chapter content, check official documentation for accuracy and for anything newer than
training-data knowledge** — don't rely on memory alone for fast-moving APIs/tooling. This
applies project-wide, not just to the React 19.2 chapter it originated from. Use WebFetch/
WebSearch against these sources as relevant to the topic at hand:

- **React APIs/behavior** (all React chapters, especially ch.06/07/17): react.dev — the
  official docs are unusually current and explicit about version deltas.
- **Node.js runtime/APIs** (ch.00 katas, tooling, any `node --experimental-strip-types` /
  built-in test runner / etc. references): nodejs.org docs, and re-check flags/APIs marked
  "Experimental" since they change between Node versions — this repo currently targets
  whatever Node version is actually installed (`node --version`), not a hardcoded one.
- **Core JS language + browser APIs** (ch.00): MDN (developer.mozilla.org).
- **Routing** (ch.10): reactrouter.com — actively evolving (Declarative/Data/Framework modes).
- **Server state / data fetching** (ch.11): tanstack.com/query docs.
- **TypeScript** (ch.14): typescriptlang.org/docs, especially for newer utility types/operators.
- **Testing** (ch.15): vitest.dev, testing-library.com.
- **Next.js / RSC** (ch.17): nextjs.org docs and react.dev's RSC reference pages.
- **Tailwind** (`app/` setup, not a chapter subject itself): tailwindcss.com docs — this repo
  is on v4, whose config model differs meaningfully from v3; don't default to v3-era answers.

When something in an already-written chapter turns out to be stale or wrong after checking a
source, fix it in place and note the correction in that chapter's section of
`notes/README.md`'s revision history, the same way prior review-driven fixes have been logged.

**Standing instruction (2026-08-18): this applies to external reviews too — fact-check every
claim in a review against the official docs before acting on it.** The user regularly has a
chapter reviewed externally (usually ChatGPT) and pastes the review in. Treat such a review as a
*list of things to check*, never as a list of corrections to apply. For each claim: look up the
relevant official source (per the list above), decide whether it holds, and only then edit. Then
report back which claims held up, which didn't, and which were directionally right but
imprecise — don't silently apply the whole review and don't silently drop the parts you rejected.
This is not hypothetical caution; reviews of this repo have been wrong in both directions:

- One review claimed 8 stale duplicate chapter folders existed. Checked against the filesystem
  and git history — false, the repo was already clean (see the 2026-08-11 entry in
  `notes/README.md`). The reviewer was working from a stale copy.
- A ch.01 diagram review *understated* a real error: it hedged that "you can get `jsx()`,
  `jsxs()`, or development-specific transforms," when the notes' actual code sample was simply
  wrong — the two-child example emits `jsxs`, not `jsx`. Compiling the exact snippet with the
  project's own TypeScript settled it in one command.
- The same review asserted React "does not use the index as the key" when you omit keys, but
  `learn/rendering-lists` says outright: "that's what React will use if you don't specify a
  `key` at all." The prose was fine as written; only the *diagram* (which drew fake `key=0`
  props) needed fixing.

Where a claim can be settled by *running something* rather than reading a doc (what a compiler
emits, what a config actually does, what's installed), prefer that — it's faster and more
conclusive than prose. Record in the chapter's `## Sources` section when a claim was verified
that way rather than from a doc, so the user knows how to re-check it.

**Standing instruction (2026-08-14): cite sources in the notes themselves, not just in
conversation.** When a chapter's notes state a specific, checkable factual claim (an API's exact
behavior, a version-specific change, a "this is why" explanation) that was verified against an
official doc, include a link to that doc near the claim (inline markdown link, or a `## Sources`
section at the end of the chapter mapping doc links to the section/topic they support) so the
user can independently re-verify it later without re-deriving which claim came from where. This
was requested explicitly after a couple of correction cycles on ch.01 where the user re-checked
claims against react.dev themselves — the standing "verify against official docs before writing"
practice (above) is necessary but not sufficient on its own; the verification needs to be
*visible in the artifact*, not just something that happened in a chat turn the user may not
revisit. Apply this to every chapter going forward, and retrofit it into already-written
chapters' notes when next touching them (don't do a one-off pass across untouched chapters
purely to backfill citations — add them as chapters are written or revised).

**Standing instruction (2026-08-20): numbered in-chapter section references (`§N`) must be
clickable links, not plain text — a project-wide rule, not specific to any one chapter.** Every
chapter's `README.md` numbers its major sections (`## 0. ...`, `## 1. ...`, etc.); *anywhere in
the repo* — that chapter's own notes, another chapter's notes, `notes/README.md`'s revision
history, `revision-notes/`, `improvement-tracker/weak-areas.md`, `assessment/`, wherever — prose
that says "see §4" or "(§6)" must link to that section, not just name it. This applies to every
current and future chapter equally; it isn't a one-off fixup that only ch.01 needs.

Mechanism: put `<a id="sec-N"></a>` on its own line immediately above each `## N. ...` heading in
the chapter file, then write every `§N` reference as `[§N](#sec-N)` when linking from within that
same chapter file, or `[§N](<relative-path-to-chapter>/README.md#sec-N)` when linking from a
different file (e.g. `notes/README.md`'s revision history referencing a ch.01 section uses
`[§4](01-foundations/README.md#sec-4)`; a hypothetical ch.05 reference from ch.07's notes would
use `[§2](../05-context-and-usereducer/README.md#sec-2)`). Anchor IDs use a `sec-` prefix rather
than relying on GitHub's auto-generated heading slugs, which are fragile — they change if the
heading wording changes later, whereas an explicit `<a id>` doesn't.

**Exception:** don't linkify `§N` text that appears inside a Mermaid diagram's node/label text
(fenced ` ```mermaid ` blocks) — Mermaid renders labels as plain text, so embedded Markdown link
syntax would show up literally instead of rendering as a link; leave those as plain `§N`.

Applied retroactively to ch.01 (`notes/01-foundations/README.md`) and its cross-references in
`notes/README.md`'s revision history on 2026-08-20, the only chapter with numbered-section
content so far. As each future chapter is unlocked and gets its `README.md` written (per the
single most important working rule, above), add its `sec-N` anchors and linkify its `§N`
references as part of writing that chapter — same "apply as you go, don't backfill in one pass"
approach already used for source citations, immediately above.

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
│   │   ├── interview-qa.md    ← comprehensive Q&A drill, written once chapter README is done
│   │   └── revision.md
│   ├── 01-foundations/
│   │   ├── README.md
│   │   ├── exercises/README.md
│   │   ├── interview-qa.md
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
| 00 | JavaScript & Browser Fundamentals | In Progress | Notes (both subfolders) + exercises + starter kata files written 2026-08-11; `interview-qa.md` (comprehensive Q&A drill) written 2026-08-20. User is now working through exercises. `revision.md` and `Done` status pending completion. |
| 01 | Foundations: JSX, Rendering & Components | In Progress | Notes + exercises + starter stubs written 2026-08-14 (JSX compile/keys/`createRoot`/Strict Mode verified against react.dev); `interview-qa.md` (comprehensive Q&A drill) written 2026-08-20. User now working through `ex1`-`ex3` starter files in `app/src/chapters/01-foundations/`. `revision.md` and `Done` status pending completion. |
| 02 | State & Events | Not Started | |
| 03 | Side Effects & Lifecycle | Not Started | |
| 04 | Refs & the DOM (Document Object Model) | Not Started | |
| 05 | Context API & useReducer | Not Started | |
| 06 | Performance, Memoization & the React Compiler | Not Started | |
| 07 | React 19 & 19.2: Modern APIs | Not Started | |
| 08 | Component Design Patterns | Not Started | |
| 09 | Forms in Depth | Not Started | |
| 10 | Routing (React Router) | Not Started | |
| 11 | Data Fetching & Server State | Not Started | |
| 12 | API (Application Programming Interface) Integration, Authentication & Security | Not Started | |
| 13 | Global State Management | Not Started | |
| 14 | TypeScript with React | Not Started | |
| 15 | Testing React Applications | Not Started | |
| 16 | Error Handling, Debugging & Observability | Not Started | |
| 17 | Architecture, SSR (Server-Side Rendering) & React Server Components (RSC) | Not Started | |
| 18 | Frontend Application Architecture | Not Started | |
| 19 | React Internals: Fiber & Reconciliation | Not Started | |
| 20 | Accessibility & Web Vitals | Not Started | |
| 21 | Production React | Not Started | |
| 22 | System Design & Mock Interviews | Not Started | |

## User preferences / how to teach this user

- **Correction (2026-08-14): the user is NOT a fluent React user and is learning React for the
  first time.** The original framing (treat the user as an experienced React engineer, assume
  fluency) was wrong and is superseded by this note — do not revert to it. Chapter 01's notes
  were written assuming fluency and had to be rewritten from scratch for this reason; every
  chapter from here on (and any already-written chapter, if revisited) must teach React
  concepts from zero, not assume prior React exposure.
- **Standing instruction, applies to every chapter/concept, not just React:** every concept —
  React-specific or JS (see below) — must build up from a plain-language "start here"
  explanation (what problem does this solve, in plain terms, with a minimal example) before
  reaching the interview-depth precision layer and interview framing. This is the same
  structure ch.00's `javascript/README.md` already uses for JS mechanics; it now applies
  project-wide, including all React content. Don't assume the reader already knows what a
  "component," "render," "prop," etc. means — define it the first time it's used in each
  chapter, even if a prior chapter already defined it, briefly enough not to bloat the notes
  but explicitly enough that skipping straight to a later chapter still works.
- General software-engineering judgment (reading code, debugging mindset, comfort with
  tooling/CLI/git) can still be assumed — the gap is specifically React-the-library and, per
  the note below, deep JS language mechanics. Don't over-correct into explaining unrelated
  basics (what a function is, what npm is, etc.) that aren't React- or JS-mechanics-specific.
- **The user's actual JS level (stated 2026-08-13): comfortable with everyday JS — variables,
  functions, arrays, objects, loops — but not deep language mechanics** (closures, `this`,
  prototypes, the event loop, promises, equality/references, modules, GC — i.e. most of
  ch.00). **Whenever a JS concept comes up, anywhere in the curriculum, teach/explain it
  in full rather than assuming it** — this is a standing, explicit instruction, not a
  one-time ask.
- Interview framing (per the bullet further down) is still valuable and should still be
  included — but it comes *after* the plain-language foundation for each concept, not instead
  of it. A first-time-learner explanation and interview-caliber precision are not in tension;
  the notes should do both, in that order, for every concept.
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
- **Standing instruction (2026-08-20): format enumerated content as numbered/bulleted lists, not
  inline prose.** When a rule, step sequence, or set of parallel items is being stated — even
  informally, e.g. "stated as two rules: (1) ... and (2) ..." — write it as an actual markdown
  list, not packed into a sentence. Applies both in chat responses and when writing/editing
  content in this repo (chapter `README.md`s, `interview-qa.md`, `revision.md`, etc.). Example
  of what to avoid, fixed in
  [§2](notes/01-foundations/README.md#sec-2) of `notes/01-foundations/README.md` on 2026-08-20
  after the user flagged it: the Rules of Hooks were originally packed into one sentence as
  "(1) only call Hooks at the top level ... and (2) only call Hooks from a React function
  component ..." and were reformatted into a two-item numbered list.

## Commands

```bash
cd app
npm install       # first time / after pulling on a new machine
npm run dev        # start dev server
npm run build       # type-check (tsc -b) + production build
npm run preview     # preview the production build
npm run lint        # oxlint
```
