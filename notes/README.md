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
- **2026-08-14 (fourth pass, same day):** A third external (ChatGPT) review, run against the
  current state, found the chapter substantially correct (~9/10) with a few precision gaps and
  worthwhile additions still within existing topics. One claimed factual fix — that React 19
  changed `useMemo`/`useCallback` to reuse the first Strict Mode render's memoized result on the
  second render — was checked directly against react.dev (the React 19 blog post, the
  `StrictMode` reference page, and the `useMemo` reference page's own Caveats/Troubleshooting
  sections) and found to be **unsupported**: the docs state React calls the calculation function
  twice and uses one call's result, discarding the other — not that the second call reuses the
  first's result. That specific "fix" was **not applied**. Genuinely applied, each verified by
  exact quote first: `aria-*`/`data-*` attributes as camelCase exceptions (confirmed on
  `writing-markup-with-jsx`); the two Rules of Hooks stated briefly (confirmed on
  `rules/rules-of-hooks`); `ref`-as-a-prop in React 19 tied explicitly to the `key`-is-not-a-prop
  section, since it's the same "exception to normal prop flow" pattern (confirmed on the React
  19 blog). Added within existing topics, not new ones: a component/React-element/DOM-node
  comparison table in §1; an explicit `<Greeting />` vs. `Greeting()` distinction in §2; a
  render/re-render/reconciliation/commit glossary and a mount/update/unmount subsection in §4;
  a brief `setCount(count + 1)` vs. `setCount(c => c + 1)` batching preview in §4 (full mechanics
  still deferred to ch.02); minor wording softenings (commit-phase "not interruptible" reframed
  as "not treated as discardable," the index-as-key fallback phrased as "implicit identity"
  rather than implying React literally writes `key={index}`); and a top-of-chapter React-version
  note. Rejected as already accurate on re-verification: the "minimal DOM changes" wording (§0)
  — react.dev's own `render-and-commit` page uses the phrase "minimal necessary operations," so
  softening it further would have been a regression, not a fix.
- **2026-08-14 (fifth pass, same day):** New standing instruction from the user: verified claims
  need a **visible source link in the notes themselves**, not just verification that happened in
  a chat turn, so claims can be re-checked independently later — recorded in `CLAUDE.md`'s
  "Accuracy & currency practice" section. Retrofitted into ch.01: added inline citation links at
  the specific claims that had gone through correction cycles (JSX transform, `className`/`for`
  reasoning, `aria-*`/`data-*` exception, component purity, Rules of Hooks, Error Boundaries/
  `getSnapshotBeforeUpdate`, `defaultProps` removal, render triggers, `useEffect` paint timing,
  automatic batching, the updater-function example, keys, `ref`-as-prop, conditional rendering,
  `createRoot`, Strict Mode), plus a `## Sources` section at the end of the chapter mapping every
  official doc used to the section that relies on it. Two claims already in the chapter that had
  never actually been independently verified (only asserted, or cited secondhand via an external
  review) were checked for the first time while adding their citations: `defaultProps` removal
  wording (confirmed against the React 19 upgrade guide) and the updater-function batching
  example (confirmed against `learn/queueing-a-series-of-state-updates`) — both held up as
  written, no corrections needed.
- **2026-08-14 (sixth pass, same day):** A fourth external (ChatGPT) review, run against the
  now-cited version, repeated a claim from an earlier round: that React 19 changed
  `useMemo`/`useCallback` to reuse the first Strict Mode render's memoized result on the second
  render. That claim had already been checked and rejected in the fifth-pass round above — but
  this review cited a *different* URL (the
  [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)'s dedicated
  "StrictMode changes" section) than the one checked before (the general React 19 release blog
  post, which doesn't mention it). Fetching the upgrade guide directly confirmed the claim is
  real and verbatim-documented — the earlier rejection was itself wrong, not because the source
  was misread, but because the wrong document was checked. **Lesson, logged to memory:** a
  version-specific behavior change is more likely to live in a dedicated upgrade/migration guide
  than a general release announcement; checking one plausible page and finding nothing isn't the
  same as confirming the claim is unsupported. Fixed ch.01's Strict Mode section accordingly, with
  the exact upgrade-guide quote. Also fixed in this pass: a real internal contradiction where the
  new component/element/DOM comparison table said "`<Counter />` ... calling it ... produces a
  React element" — directly contradicting §1's own (correct) explanation that `<Counter />`
  produces an element *without* calling `Counter`; reworded so the two sections agree. Softened
  the Strict Mode WebSocket cleanup example, which read as "you'll always see two connections"
  when the accurate framing is "two connections only if cleanup is actually broken — that's the
  point of the stress test." Clarified that "this project's Vite setup uses the automatic JSX
  transform" is a project-configuration fact (verified against `app/tsconfig.app.json`'s
  `"jsx": "react-jsx"`), not something the cited react.dev page itself establishes. Added two
  citations for completeness against the "every specific claim is cited" policy:
  `reference/react/createElement` (component/element/DOM distinction) and
  `reference/react/useContext` (context consumers re-rendering).
