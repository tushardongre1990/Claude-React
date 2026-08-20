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
  - `interview-qa.md` — a comprehensive interview Q&A drill covering every topic in that
    chapter's notes, one complete question-and-answer per concept (written once, in full, when
    the chapter's `README.md` is written). Each question is tagged (⭐ Core / 🔥 Frequent /
    🧠 Deep / 🎯 Trap / a chapter-appropriate cross-link or version tag) and answered in two
    layers — a 15-20 second **Quick answer** followed by the complete **Full answer** — with a
    **Coding & Scenario Questions** section at the end presenting a subset of the same material
    as code-first "what does this output / find the bug" prompts. Distinct from the root-level
    [`interview-questions/`](../interview-questions/README.md) folder, which holds short-form
    "explain this output" snippets, a traps catalog, and open-ended debugging scenarios rather
    than a comprehensive per-chapter drill.
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
  comparison table in [§1](01-foundations/README.md#sec-1); an explicit `<Greeting />` vs. `Greeting()` distinction in [§2](01-foundations/README.md#sec-2); a
  render/re-render/reconciliation/commit glossary and a mount/update/unmount subsection in [§4](01-foundations/README.md#sec-4);
  a brief `setCount(count + 1)` vs. `setCount(c => c + 1)` batching preview in [§4](01-foundations/README.md#sec-4) (full mechanics
  still deferred to ch.02); minor wording softenings (commit-phase "not interruptible" reframed
  as "not treated as discardable," the index-as-key fallback phrased as "implicit identity"
  rather than implying React literally writes `key={index}`); and a top-of-chapter React-version
  note. Rejected as already accurate on re-verification: the "minimal DOM changes" wording ([§0](01-foundations/README.md#sec-0))
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
  React element" — directly contradicting [§1](01-foundations/README.md#sec-1)'s own (correct) explanation that `<Counter />`
  produces an element *without* calling `Counter`; reworded so the two sections agree. Softened
  the Strict Mode WebSocket cleanup example, which read as "you'll always see two connections"
  when the accurate framing is "two connections only if cleanup is actually broken — that's the
  point of the stress test." Clarified that "this project's Vite setup uses the automatic JSX
  transform" is a project-configuration fact (verified against `app/tsconfig.app.json`'s
  `"jsx": "react-jsx"`), not something the cited react.dev page itself establishes. Added two
  citations for completeness against the "every specific claim is cited" policy:
  `reference/react/createElement` (component/element/DOM distinction) and
  `reference/react/useContext` (context consumers re-rendering).
- **2026-08-14 (seventh pass, same day):** A fifth external (ChatGPT) review, run against the
  fully-cited version, found the chapter at ~9.5/10 with one genuine internal inconsistency and
  a few wording refinements. Fixed: [§1](01-foundations/README.md#sec-1)'s "how does JSX become the DOM" interview-framing box
  said React's renderer "walks that tree during the commit phase" — contradicting [§4](01-foundations/README.md#sec-4)'s own
  (correct) explanation that reconciliation happens during the **render** phase and only DOM
  mutations happen during **commit**. Reworded to name both phases correctly and explicitly.
  Reworded "every component in the tree renders once" (initial-render trigger) to avoid reading
  as inconsistent with [§8](01-foundations/README.md#sec-8)'s own explanation that Strict Mode may invoke render logic twice in
  development. Verified the `&&`/`0` footgun claim precisely against `learn/conditional-rendering`
  (`false` is explicitly a "hole" that renders nothing; `0` explicitly is NOT) and narrowed the
  "0/NaN/''" grouping to just the numeric case (`0`/`NaN`) — an empty string doesn't produce the
  same visible-junk problem, so grouping it with `0`/`NaN` overstated the footgun. Smoothed the
  `createRoot`-vs-legacy-`render` interview framing for consistency with the more nuanced
  paragraph immediately above it (kept the substance — legacy `render` genuinely has no access
  to React 18's concurrent model at all — just aligned the tone).
- **2026-08-14 (eighth pass, same day):** Fixed a mermaid parse error the user hit directly when
  rendering [§8](01-foundations/README.md#sec-8)'s Strict Mode sequence diagram: the `Note over` line used literal `\n` for line
  breaks, which is valid inside flowchart `["..."]` node labels (used elsewhere in this chapter)
  but not inside a sequence-diagram `Note`, and broke the parser entirely. First fix collapsed it
  to one line (parses, but the text overflowed the note box's border) — corrected fix uses `<br/>`
  (the syntax sequence-diagram notes actually support for line breaks) to wrap it into two lines
  that render inside the box.
- **2026-08-14 (ninth pass, same day):** A sixth external (ChatGPT) review flagged that the [§4](01-foundations/README.md#sec-4)
  render/commit diagram nested browser paint and `useEffect` inside the "Commit phase" subgraph,
  overclaiming what commit actually covers. Checked directly against
  `reference/dev-tools/react-performance-tracks` (not previously consulted) before changing
  anything, since this contradicted the diagram's existing structure — confirmed the page names
  **Commit** (DOM mutations + `useLayoutEffect`, synchronous) and a separate, later
  **"Remaining Effects"** phase for passive effects (`useEffect`, usually after paint) as
  genuinely distinct steps, with browser paint sitting between them. Restructured the diagram so
  paint and `useEffect` sit *after* the Commit subgraph rather than inside it, and updated the
  accompanying prose with the exact quote. Also applied a minor wording fix: "component must
  return something React can display" was imprecise since `null`/`undefined`/booleans are valid
  returns but aren't actually displayed — reworded to distinguish visibly-rendered values from
  validly-empty ones.
- **2026-08-18:** A seventh external (ChatGPT) review of ch.01, this time focused on the five
  mermaid diagrams. Rated the chapter ~8.5-9/10 with no major conceptual flaws; four diagram
  fixes were flagged as "definitely fix" and three prose points as "worth improving." All were
  checked before acting on them, and all held up, so all were applied:
  - **[§1](01-foundations/README.md#sec-1) JSX diagram** said `compiler: Vite / Babel / TS`, treating Vite as the JSX compiler.
    Vite is the build tool that *delegates* the transform to Babel/SWC/TypeScript. Relabelled,
    and the surrounding prose now separates build tool from transform explicitly.
  - **[§1](01-foundations/README.md#sec-1) automatic-transform code sample** was factually wrong, which the review only gestured
    at ("you can get `jsx()`, `jsxs()`, or development-specific transforms") without pinning
    down. Verified empirically rather than from memory, by running this project's own TypeScript
    compiler over the chapter's exact snippet: `<h1 className="title">Hello, {name}</h1>` has two
    children, so it emits **`jsxs`**, not `jsx` — the sample showed `_jsx`. Fixed, and added a
    short explanation of `jsx` vs. `jsxs` vs. dev builds' `jsxDEV`/`react/jsx-dev-runtime`
    (also verified by compiling with `jsx: "react-jsxdev"`). The `Sources` entry records that
    this specific claim was verified by compilation, not by a doc, since React's own JSX
    transform post documents `jsx` but not `jsxs`/`jsxDEV` in detail.
  - **[§1](01-foundations/README.md#sec-1) project-configuration footnote** claimed `app/tsconfig.app.json`'s `"jsx": "react-jsx"`
    "is what actually turns this transform on for this repo." Checked the actual config: that
    file also sets `"noEmit": true`, so `tsc -b` only type-checks — the emit is done by
    `@vitejs/plugin-react` (whose README confirms the automatic runtime is its default).
    Corrected to say the tsconfig setting governs type-checking, not emit.
  - **[§4](01-foundations/README.md#sec-4) render/commit diagram** labelled its entry node
    `Trigger (setState / parent render / context change)`, which contradicted the section's own
    prose two paragraphs above naming exactly two root causes and explicitly saying parent
    renders and context changes are *not* independent triggers. Relabelled to "An update occurs
    (initial render, or a state update)".
  - **[§4](01-foundations/README.md#sec-4) render-phase boxes** read as three strictly sequential passes (call everything → build
    a whole tree → diff two finished trees). Kept the simplified boxes but added an explicit
    note that calling components and reconciling their output are interleaved during traversal,
    and that the simplified picture shouldn't be defended as literal mechanics (ch.19's subject).
  - **[§4](01-foundations/README.md#sec-4) "a prop changing, by itself, does nothing"** was blunt enough to be wrong in the other
    direction — different props absolutely are why a child renders *differently*. Reworded to
    the causal claim: a prop change isn't an independent *trigger*, and tracing "why did this
    render" always terminates at an initial render or a state update.
  - **[§4](01-foundations/README.md#sec-4) "exactly two root causes"** — added the review's suggested honest caveat about
    `useSyncExternalStore`, which re-renders subscribers without a `useState` setter call, plus
    a phrasing that stays true in all cases (updates originate from state, a Provider's new
    value, or a subscribed external store).
  - **[§5](01-foundations/README.md#sec-5) index-as-key diagram** drew `key=0` / `key=1` / `key=2` as though React had written
    those props onto keyless elements. React matches keyless children *by position*; it doesn't
    synthesize key props. Redrawn as `position 0 → 'A'` etc. Note the prose itself was already
    defensible — `learn/rendering-lists` says outright "that's what React will use if you don't
    specify a `key` at all" (re-confirmed against the live page), so the fix was to keep that
    quote while making clear it describes resulting *behavior*, not props React inserted.
  - **[§8](01-foundations/README.md#sec-8) Strict Mode diagram** said "Effect setup" and "this is the one that stays." Confirmed
    against `reference/react/StrictMode` that the docs use **Effects** as a category term
    (`useEffect`/`useLayoutEffect`/`useInsertionEffect`), not `useEffect` alone; relabelled and
    added a note. Replaced "the one that stays" with "simulates a remount," since the original
    could imply React retains a particular Effect instance from the second invocation.
  No changes were made to the parts the review rated already-correct ([§3](01-foundations/README.md#sec-3)'s composition diagram,
  and the long list of concepts it signed off on).
- **2026-08-18 (second pass, same day):** The same reviewer re-checked the revised file, rated
  the diagrams ~9.5/10 and interview-safe, and raised exactly one remaining point — all of it
  outside the diagrams: [§4](01-foundations/README.md#sec-4) said React's docs "name **exactly** two root causes for a component
  to render **at all**," which overstates a teaching simplification as a complete specification,
  especially given the chapter's own `useSyncExternalStore` caveat a few paragraphs later.
  Re-checked `learn/render-and-commit` first: the page does say "There are two reasons for a
  component to render," so the underlying attribution was accurate — the problem was only the
  added emphasis. Reworded to quote the docs verbatim and frame it explicitly as React's
  *teaching model* of how rendering starts (the right thing to lead with in an interview) rather
  than an exhaustive account, and made the two downstream references to "the two root causes"
  consistent with the new phrasing. The reviewer's recommendation was to stop polishing ch.01's
  diagrams and move to the next chapter.
- **2026-08-18 (third pass, same day):** An eighth external (ChatGPT) review rated the chapter
  9.6/10 with no remaining major issues and four wording tweaks, all of which were checked and
  applied:
  - **[§6](01-foundations/README.md#sec-6)'s `&&` explanation** opened with a genuinely garbled sentence ("JSX renders that falsy
    value's left-hand result directly"). Rewritten as two explicitly separated mechanisms, per
    the project's standing rule that JS mechanics get taught in full rather than assumed: (1)
    what `&&` does as plain JavaScript — it returns the left *operand itself* when falsy, not
    `false`, and short-circuits without evaluating the right side; (2) what React then does with
    that value — numbers/strings render as visible text, `false`/`null`/`undefined` are holes.
    The bug falls out of stacking the two. The section's conclusions were already correct; only
    the mechanism sentence was wrong.
  - **[§0](01-foundations/README.md#sec-0)'s "every tag becomes a node"** oversimplified the DOM. Reworded to note that text
    between tags becomes its own text node, comments are nodes too, and the parser may
    insert/move things — so it isn't a strict one-tag-one-node mapping.
  - **[§0](01-foundations/README.md#sec-0)'s "near-optimal DOM updates"** was an overclaim, and this one turned out to be worth
    more than a wording fix. Checked `legacy.reactjs.org/docs/reconciliation` (not previously
    consulted, and with no current react.dev equivalent): React explicitly does **not** do an
    optimal diff — "state of the art algorithms have a complexity in the order of O(n³)...
    React implements a heuristic O(n) algorithm based on two assumptions." Replaced the claim,
    and expanded the interview-framing box to name the trade-off and connect the algorithm's two
    assumptions to [§5](01-foundations/README.md#sec-5)'s keys rules, since that connection is a much stronger interview signal
    than the word "optimal." Added the page to `## Sources`.
  - **[§4](01-foundations/README.md#sec-4)'s render-diagram entry node** still said "the two reasons above," slightly narrower
    than the robust phrasing established in the prose just above it. Changed to "React starts
    work (initial render, or an update)."
  The reviewer again recommended stopping work on ch.01's notes and moving to the exercises and
  `revision.md`, which matches the chapter's actual `Done` criteria in `CLAUDE.md`.
- **2026-08-18 (fourth pass, same day):** A ninth external (ChatGPT) review rated the chapter
  9.8/10 with a single remaining item, which held up and was applied. [§2](01-foundations/README.md#sec-2) listed "its name must
  start with a capital letter" as a rule defining a valid React function component; the
  constraint actually lives in **JSX tag resolution**, not in the function. Verified by
  compiling both forms: `<Greeting />` emits `jsx(Greeting, {})` (a reference to the variable),
  while `<greeting />` emits `jsx("greeting", {})` (a string type — an intrinsic HTML element),
  so a lowercase-named function is a perfectly valid component when handed to
  `createElement`/`jsx` directly; it just can't be written as `<greeting />`. Rewrote rule 1 to
  put the constraint where it belongs, with the compiled-output comparison inline. Kept
  react.dev's blunter framing quoted alongside it ("their names must start with a capital letter
  or they won't work!", `learn/your-first-component`) rather than contradicting it, since that
  page is stating the practical rule and is right about practice — you always use a component via
  a JSX tag. Note [§1](01-foundations/README.md#sec-1)'s own capitalization bullet was already precise on this point and needed no
  change; the imprecision was only in [§2](01-foundations/README.md#sec-2)'s restatement. One claim was **dropped for lack of
  evidence** rather than written up: that `eslint-plugin-react-hooks` identifies components by
  PascalCase name. Neither `reference/rules/rules-of-hooks` nor the plugin's own README documents
  how it detects components, so it isn't asserted in the notes.
  Ch.01's notes are now considered technically settled; remaining work for `Done` is the
  exercises, `interview-questions/` entries, a verbal explain-back, and `revision.md`.
- **2026-08-18 (fifth pass, same day):** Fixed a second mermaid parse error the user hit when
  rendering [§1](01-foundations/README.md#sec-1)'s JSX pipeline diagram (`Expecting 'SEMI', 'NEWLINE'... got 'CALLBACKNAME'`).
  Cause: the diagram's second node used the **ID `call`**, and `call` is a reserved token in
  mermaid's flowchart grammar — it's the `click nodeId call callbackName()` syntax, and the
  lexer switches into callback-name state on `call` followed by whitespace, so the statement
  `call -->|returns| element` was never parsed as an edge at all. The node's *label* was fine;
  only the ID mattered. Renamed the node to `fncall`, and simplified its label from
  `('h1', { children: [...] })` to `(type, props)` since the exact compiled output already
  appears in code blocks immediately above the diagram. Note this is unrelated to the earlier
  `Note`/`\n` fix — different diagram, different failure mode, so mermaid problems in this repo
  have now come from two independent causes.
  **Lesson worth keeping:** balanced quotes are not a sufficient check for mermaid blocks. Node
  IDs must also avoid mermaid keywords (`graph`, `flowchart`, `subgraph`, `end`, `click`,
  `call`, `href`, `class`, `classDef`, `style`, `linkStyle`, `direction`, `default`, and bare
  `o`/`x`), and sequence-diagram `Note` lines need `<br/>` rather than `\n`. A scan of every
  mermaid block in `notes/` (20 blocks across ch.00's two subfolders and ch.01) found no other
  instance of either problem — ch.00's `call1`/`call2` IDs are safe, since the keyword rule only
  fires on bare `call` followed by whitespace, and the word "call" inside a quoted label is also
  fine.
- **2026-08-20:** New per-chapter artifact added at the user's request: `interview-qa.md`, a
  comprehensive interview Q&A drill file covering every topic in a chapter's notes (one complete,
  interview-ready question-and-answer per concept, not a keyword or one-liner). Written once, in
  full, when a chapter's `README.md` is written, and required going forward for a chapter to earn
  `Done` status (see `CLAUDE.md`'s "when a chapter is unlocked" working rule and `Done` criteria,
  both updated to reference it). It's distinct from the root-level `interview-questions/` folder,
  which holds short-form "explain this output" snippets, a traps catalog, and open-ended debugging
  scenarios rather than a comprehensive per-chapter drill. Written for the two chapters that
  currently have full notes: [`00-javascript-and-browser-fundamentals/interview-qa.md`](00-javascript-and-browser-fundamentals/interview-qa.md)
  (covering both the `javascript/` and `browser-and-web/` subfolders) and
  [`01-foundations/interview-qa.md`](01-foundations/interview-qa.md). Content was synthesized
  directly from each chapter's already fact-checked notes rather than re-verified against docs
  independently, since the underlying claims had already gone through this project's accuracy
  practice when the notes themselves were written.
- **2026-08-20 (second pass, same day):** An external (ChatGPT) review of ch.01's first-pass
  `interview-qa.md` was checked against the standing "fact-check external reviews" policy before
  acting. Most of the review was structural/pedagogical opinion (add priority tags, a short
  spoken-answer layer, tiers, a coding-scenario section) rather than a checkable factual claim, so
  it was presented to the user as a scope decision rather than auto-applied; the user chose the
  full rework. One claim *was* independently checkable and held up: the review flagged
  `interview-qa.md`'s (and, it turned out, the underlying [`01-foundations/README.md`](01-foundations/README.md)
  §4 interview-framing box's) phrase "within the same event/tick" for describing React's batching
  boundary as an imprecise, potentially self-contradicting term. Fetched the
  [React 18 release post](https://react.dev/blog/2022/03/29/react-v18) directly for the exact
  wording: "Before: updates inside of promises, setTimeout, native event handlers, or any other
  event were not batched... After: updates inside of timeouts, promises, native event handlers or
  any other event are batched" — confirming react.dev never uses "tick" as its own terminology, and
  that automatic batching's entire point is grouping updates from callbacks that run as genuinely
  separate event-loop turns (a timeout callback vs. the code that scheduled it), which "same tick"
  reads as contradicting. Fixed in both `01-foundations/README.md`'s §4 interview-framing box and
  `01-foundations/interview-qa.md`, replacing "tick" with "a single callback invocation" and adding
  the exact quoted wording. Applied the full structural rework the user chose to both chapters'
  `interview-qa.md` files: every question now carries priority tags (⭐ Core / 🔥 Frequent /
  🧠 Deep / 🎯 Trap, plus 🔗 React-link for ch.00 and ⚠️ Version for ch.01) and a short **Quick
  answer** layer above the existing **Full answer**, and each file gained a **Coding & Scenario
  Questions** section (8 prompts each) converting the chapter's concepts into code-first "what does
  this output / find the bug" prompts rather than pure explain-the-concept questions. This format
  is now the standing template for every future chapter's `interview-qa.md` — see `CLAUDE.md`'s
  working-rule step 3.
- **2026-08-20 (third pass, same day):** A follow-up ChatGPT review of the reworked
  `01-foundations/interview-qa.md` rated it ready to use as-is, with two small wording fixes and
  guidance to stop expanding the file further (focus remaining effort on scenario-question quality
  and spoken-delivery practice, not more theoretical questions — accepted as guidance for future
  chapters, no action needed now). Both wording fixes checked out and were applied to **both**
  `01-foundations/README.md`'s component/element/DOM-node table ([§1](01-foundations/README.md#sec-1))
  and its `interview-qa.md` mirror: the "React element" row said "the plain-object output of
  calling that description," which — read in isolation from the table — reads as "produced by
  calling the component," directly contradicting the surrounding prose's own point that
  `<Counter />` produces an element *without* calling `Counter`. This was a residual of the exact
  wording the 2026-08-14 sixth-pass entry above already fixed once in the surrounding prose but not
  in the table's own phrasing; reworded the table row to state directly that the element is
  "produced by the JSX transform/`createElement`, **not** by calling the component itself." Also
  reworded `interview-qa.md`'s "props are read-only" Quick Answer, which used "frozen for a given
  render" — risking a reader inferring literal `Object.freeze()` semantics — to match the Full
  Answer's more accurate "immutable snapshot" wording instead.
- **2026-08-20 (fourth pass, same day):** At the user's request, reworked ch.01's "what triggers
  a render" subsection of [§4](01-foundations/README.md#sec-4) to lean much more heavily on code
  examples and Mermaid diagrams rather than prose alone — no factual changes, purely a
  clarity/pedagogy pass. Added: a minimal `createRoot`/`Counter` code pair illustrating the two
  root triggers directly; a `Parent`/`Child` code example plus a cascade diagram showing "a
  re-rendering parent renders all its children by default" concretely, with `memo` named as the
  escape hatch; a `ThemeContext`/`Toolbar`/`ThemedButton` code example contrasting "renders
  because its parent re-rendered" against "renders because it's a direct Context subscriber"; and
  a decision-tree diagram for tracing "why did this component render?" backwards to its root
  cause. Also strengthened the standing "explain via code/diagrams" instruction in `CLAUDE.md`'s
  "User preferences" section: the four named diagram-shapes (state machine/sequence/tree/decision
  flowchart) are examples of when a diagram helps, not an exhaustive gate on when one is allowed —
  default to more code and diagrams than feels strictly required, going forward for every chapter.
