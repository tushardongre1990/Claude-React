# React 19 Mastery Roadmap

Goal: go from "have used React for years" to able to comfortably clear a React interview
pitched at **5-10 years of experience** — deep hooks/internals knowledge, React 19/19.2
fluency, ecosystem and architecture breadth, and system-design ability, not just component
syntax.

## How this works

- Notes live one folder per chapter below, numbered `00`-`22` in learning order.
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
  - Chapter 00 additionally has `javascript/` and `browser-and-web/` subfolders, since it
    covers two related but distinct bodies of knowledge.
- Code for exercises and mini-projects goes in [`app/`](../app/), the Vite + React 19 +
  TypeScript + Tailwind project, generally under `app/src/chapters/<chapter-slug>/`.
- Cross-cutting review and practice material lives outside the chapter folders:
  - [`revision-notes/`](../revision-notes/README.md) — a master index that links every
    chapter's cheat sheet, for rapid full-syllabus review close to an interview.
  - [`coding-interviews/`](../coding-interviews/README.md) — a React + JavaScript
    implementation problem bank, separate from concept notes.
  - [`interview-questions/`](../interview-questions/README.md) — "explain this output"
    snippets, a catalog of React traps/misconceptions, and open-ended debugging scenarios.
  - [`improvement-tracker/weak-areas.md`](../improvement-tracker/weak-areas.md) — gaps and
    mistakes noticed during exercises/mock interviews, so nothing gets forgotten.
  - [`assessment/`](../assessment/) — chapter scorecards, mock-interview scorecards, and a
    final readiness checklist.
- Full session context, conventions, and how to resume this project (including from a
  different machine) live in [`/CLAUDE.md`](../CLAUDE.md) at the repo root.

## Curriculum

| # | Chapter | Status |
|---|---------|--------|
| 00 | [JavaScript & Browser Fundamentals for React Interviews](00-javascript-and-browser-fundamentals/README.md) | In Progress |
| 01 | [Foundations: JSX, Rendering & Components](01-foundations/README.md) | In Progress |
| 02 | [State & Events](02-state-and-events/README.md) | Not Started |
| 03 | [Side Effects & Lifecycle](03-side-effects-and-lifecycle/README.md) | Not Started |
| 04 | [Refs & the DOM (Document Object Model)](04-refs-and-dom/README.md) | Not Started |
| 05 | [Context API & useReducer](05-context-and-reducers/README.md) | Not Started |
| 06 | [Performance, Memoization & the React Compiler](06-performance-and-react-compiler/README.md) | Not Started |
| 07 | [React 19 & 19.2: Modern APIs](07-react-19-features/README.md) | Not Started |
| 08 | [Component Design Patterns](08-component-design-patterns/README.md) | Not Started |
| 09 | [Forms in Depth](09-forms-in-depth/README.md) | Not Started |
| 10 | [Routing (React Router)](10-routing/README.md) | Not Started |
| 11 | [Data Fetching & Server State](11-data-fetching-and-server-state/README.md) | Not Started |
| 12 | [API (Application Programming Interface) Integration, Authentication & Security](12-api-integration-auth-and-security/README.md) | Not Started |
| 13 | [Global State Management](13-global-state-management/README.md) | Not Started |
| 14 | [TypeScript with React](14-typescript-with-react/README.md) | Not Started |
| 15 | [Testing React Applications](15-testing/README.md) | Not Started |
| 16 | [Error Handling, Debugging & Observability](16-error-handling-debugging-and-observability/README.md) | Not Started |
| 17 | [Architecture, SSR (Server-Side Rendering) & React Server Components (RSC)](17-architecture-ssr-and-rsc/README.md) | Not Started |
| 18 | [Frontend Application Architecture](18-frontend-application-architecture/README.md) | Not Started |
| 19 | [React Internals: Fiber & Reconciliation](19-react-internals/README.md) | Not Started |
| 20 | [Accessibility & Web Vitals](20-accessibility-and-web-vitals/README.md) | Not Started |
| 21 | [Production React](21-production-react/README.md) | Not Started |
| 22 | [System Design & Mock Interviews](22-system-design-and-mock-interviews/README.md) | Not Started |

Status values: `Not Started` → `In Progress` → `Done`. This table and the mirrored one in
`CLAUDE.md` are the source of truth for where we are — update both when a chapter's status
changes.

## Suggested pacing

Chapter 00 is worth taking seriously even if it feels basic — a large share of "why does this
React code behave that way" interview questions are actually JavaScript/browser questions.
Chapters 01-06 are foundation-solidifying (fast if you're already comfortable, but don't
skip). Chapter 07 (React 19/19.2) is the highest-priority chapter if your hands-on experience
predates React 19. Chapters 08-16 are breadth across the ecosystem, API/security, and
production concerns a senior engineer is expected to navigate. Chapters 17-19 are
architecture and "explain it on a whiteboard" depth. Chapter 20 is a quick but often-skipped
credibility booster. Chapter 21 is production maturity signaling. Chapter 22 is the capstone —
don't attempt it until most of 00-21 are done, and lean on `coding-interviews/` and
`interview-questions/` throughout, not just at the end.

## Revision history

- **2026-08-11:** Initial 18-chapter curriculum created.
- **2026-08-11:** Expanded to 23 chapters (00-22) plus `coding-interviews/`,
  `interview-questions/`, and `assessment/` after reviewing external feedback on gaps
  (JS/browser fundamentals, React 19.2, React Compiler depth, API/auth/security, production
  concerns, and a dedicated coding-interview/traps problem bank).
- **2026-08-11:** Second review pass — tightened wording in ch.01/02/03 (precision fixes
  around `createRoot`, state-update semantics, and Effects-vs-Suspense framing), expanded
  ch.06 (transitions, a canonical Suspense-fundamentals section, deeper React Compiler
  mechanics), fixed Server Functions/Server Actions terminology in ch.07/17, and expanded
  `interview-questions/` and `assessment/` with more categories and a timed-performance /
  critical-topic-floor readiness bar. A proposed CSS fundamentals addition to ch.00 was
  **explicitly declined** — judged as out of scope for this goal.
- **2026-08-11:** Third review pass — a claim that stale duplicate chapter folders existed on
  disk was checked directly against the filesystem and git history and found to be **false**
  (the repo was already clean); no folders were touched. Legitimate fixes from that pass: a
  stray empty root `package-lock.json` removed, small bullets added to ch.12 (idempotency/safe
  retries), ch.18 (module boundaries), and ch.21 (frontend secrets), ch.22's "what you'll
  build" aligned to 3 mock interviews to match `assessment/final-readiness.md`, the
  chapter-level (≥4.0) vs overall-syllabus (≥3.5) readiness thresholds made explicit about how
  they relate, a problem-diversity note added to the coding-problem requirements, and
  `app/README.md` replaced with project-specific content instead of the default Vite template.
- **2026-08-11:** Fourth review confirmed the structure is clean and recommended freezing the
  curriculum. Two small fixes applied: every chapter's `revision.md` now has a **Last
  reviewed** field (to make the "re-read within 2 weeks" pre-interview requirement in
  `assessment/final-readiness.md` actually measurable), and a stale-data debugging scenario
  was added to `interview-questions/debugging-scenarios/`. A suggested "difficulty tier"
  requirement for the coding bank was considered and **declined** as unnecessary process
  overhead. **The curriculum is now considered locked** — further changes should come from
  gaps found while actually studying, not further external review cycles. Time to start
  Chapter 00.
- **2026-08-13:** Ch.00's `javascript/README.md` was rewritten so every section builds up from
  a plain-language "start here" explanation before reaching interview-depth precision (the
  user's actual JS level is "comfortable with basics, shaky on deeper mechanics" — the original
  "assume fluency" framing was wrong for JS specifically; see `CLAUDE.md`). A standing
  "Accuracy & currency practice" was also added to `CLAUDE.md`, and a first verification pass
  against official docs (MDN, react.dev, nodejs.org) was run against ch.00: confirmed accurate
  — closures wording, Promise combinator semantics, React 18 automatic batching, CORS/preflight
  semantics. Found and fixed two real staleness issues — Node's TypeScript type-stripping is
  now **on by default** as of Node 22.18/23.6/24+ (was experimental-flag-only when originally
  written), and `structuredClone`'s behavior on custom class instances is a **silent** data
  loss (prototype/methods dropped, no error thrown), not a hard failure like functions/DOM
  nodes — the original wording implied a uniform "cannot clone" failure mode across all three.
- **2026-08-14:** Corrected a wrong assumption: the user is **not** a fluent React user and is
  learning React for the first time, not just brushing up. Ch.01's notes (originally written
  assuming React fluency) were rewritten from scratch to teach every concept from zero, using
  the same "start here" plain-language build-up ch.00 already uses for JS mechanics. This now
  applies project-wide to every chapter's React content, not just ch.00's JS content — see
  `CLAUDE.md`'s "User preferences / how to teach this user" section, which is the source of
  truth for this going forward.
- **2026-08-14 (later same day):** Ch.01 went through an external (ChatGPT) accuracy review;
  each claim was independently re-verified against react.dev before acting on it, since the
  review itself contained some imprecise reasoning (e.g. its suggested fix for why
  `className`/`htmlFor` are used was also inaccurate — reserved words aren't actually the
  reason, and modern JS permits reserved words as object property names anyway). Confirmed
  accurate and kept as originally written: React "applies the minimal necessary DOM
  operations" during commit (this **is** the official docs' own wording — the review's
  suggestion to soften it was itself overcautious). Genuinely fixed: the `className`/`htmlFor`
  explanation (now correctly attributed to mirroring DOM property names, not reserved words);
  "single root element" softened to allow strings/numbers/null/arrays; `useEffect` timing
  relative to paint (it's not strictly always-after-paint — interaction-caused Effects may run
  before paint); "batching is a correctness requirement" downgraded to purely a performance
  framing (matches the React 18 blog post); the hooks-vs-classes migration answer disentangled
  into "no 1:1 lifecycle mapping" (minor) vs. "Error Boundaries have no Hook equivalent"
  (genuine); Strict Mode's "every bug was a real latent bug" softened to "exposes unsafe
  assumptions React doesn't actually guarantee." Genuinely added (still within existing
  topics, no new topics per the working rule): explicit component-purity guidance with a
  local-vs-non-local mutation example, `children` can be multiple nodes not just one, "initial
  render" as an explicit third trigger alongside state/parent/context, `key` is deliberately
  not forwarded as a regular prop (`props.key` is always `undefined`) plus the related React 19
  `ref`-as-prop change, and Strict Mode not double-invoking event handlers.
- **2026-08-14 (same day, correcting the correction above):** The `className`/`htmlFor`
  "reserved words aren't the reason" fix above was itself wrong — caught by the user, who found
  the actual react.dev page (`learn/writing-markup-with-jsx`, "camelCase all most of the
  things") stating outright that `class` **is** a reserved word and that's exactly why
  `className` exists. My error: a WebFetch summary of that page earlier had missed the precise
  mechanism and I over-corrected based on a too-narrow rebuttal (object literal keys like
  `{ class: 1 }` *are* legal, which is true but beside the point). The actual, docs-stated
  mechanism: JSX attributes become props-object keys that are very commonly destructured into
  variables, and reserved words can't be used in a variable/binding position (destructuring
  shorthand, `const`/`let`/`var` names) even though they're fine as plain object keys — so
  `function Img({ class })` is a real `SyntaxError`. Fixed in ch.01's JSX section with the
  precise mechanism and a direct citation. **Lesson for future sessions:** a WebFetch summary
  of a doc page is a paraphrase from a smaller model, not the primary source — for a fact
  specific and falsifiable enough to state as "X is wrong, here's why," prefer getting the
  exact quoted wording (or reading the page directly) over trusting a summarized rebuttal,
  especially before overriding something the official docs state directly.
- **2026-08-14 (third pass, same day):** A second external (ChatGPT) review of ch.01, run
  against the post-correction version, found four further precision issues — again each
  independently verified against react.dev (exact quotes, not summaries, per the lesson above)
  before acting. Fixed: `createRoot` was described as "the switch that turns on" automatic
  batching/transitions/concurrent rendering, which overstates it — automatic batching does
  apply automatically to every update once on `createRoot`, but concurrent features like
  transitions remain opt-in (`useTransition`/`startTransition`) rather than automatically
  active; reworded to distinguish the two. Strict Mode's interview-framing line claiming a
  broken Effect cleanup "would eventually have caused a leak in production too" overstated
  what React's own docs say (they frame the double setup/cleanup cycle as a stress test for
  setup/cleanup *symmetry*, not a guarantee of an eventual production leak) — softened to match
  the docs' actual framing. The purity section's "side effects belong in a `useEffect`" was
  incomplete — react.dev's guidance splits side effects by cause: interaction-caused side
  effects (e.g. a "Buy" button's POST request) belong in the **event handler**, not an Effect;
  only side effects that must happen because the component is displayed, independent of which
  interaction caused that, belong in `useEffect` — fixed with the docs' own Buy-button example.
  The render-triggers section had a self-contradiction (claiming exactly two root causes, then
  listing four numbered items including Context as if a third) — restructured so initial
  render/state-update are the two root causes and parent-rerender/context-consumers are
  explicitly framed as consequences/modifiers, not independent triggers.
