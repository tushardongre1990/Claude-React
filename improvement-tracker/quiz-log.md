# Quiz Log

A record of every wrong or shaky answer from "quiz me" sessions. Each session gets its own heading.
Concept gaps that come up more than once (or that point to a real misunderstanding, not a slip)
are also added to [`weak-areas.md`](weak-areas.md), the pre-interview reading list.

**How quizzes run (standing rules, set 2026-10-11):**

1. One concept (one numbered section of the notes) at a time, in order.
2. Mixed question types: explain the concept, predict the output/order, find the bug, write a fix.
3. Every question follows this loop (updated 2026-10-11 at the user's request):
   1. **Question.**
   2. **Evaluate.** If it's wrong or partial, give a hint and allow one retry.
   3. **Verdict.** Say clearly what was wrong, weak, or strong, with an honest opinion of the answer
      and a model interview answer.
   4. **Re-teach.** Explain the concept behind the question again from the start, in plain language
      with a code example (and a diagram where it helps), so it's learned, not just corrected.
   5. **Repeat** with the next question on the same concept.
4. Move to the next section only when every part of the current one is interview-ready. Anything
   missed is re-tested with a differently worded question before moving on.

**Format for each entry:**

```
### <question, short>
- **Section:** <link to §N>
- **My answer:** <what was said, briefly>
- **Problem:** Wrong / Partial / Hesitant: <what was missing or incorrect>
- **Correct answer:** <the fix>
- **Re-tested:** Not yet / Correct on <date> / Wrong again on <date>
```

Newest sessions at the top.

---

## 2026-10-11: ch.03 Side Effects & Lifecycle

*Started at [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0). §0 interview-ready on
2026-10-11. [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1) interview-ready on
2026-10-12. Moved to [§2](../notes/03-side-effects-and-lifecycle/README.md#sec-2).*

### `n` capped at 2: trace dependency check + bail-out per render
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:** Dependency checks correct on every row (`Object.is(0,1)`, `Object.is(1,2)`).
  Row 3: said `setN(2)` causes a re-render, giving 4 renders and 3 Effect runs. After a hint:
  "only 3 renders because of bail-out" ✅.
- **Problem:** Partial. The dependency check is now correct, but the bail-out check was forgotten
  on the first try (the other half of the same weak area).
- **Correct answer:** 3 renders, 3 Effect runs. Render 3's Effect calls `setN(2)` while n is
  already 2, so it bails out and there's no render 4.
- **Re-tested:** Correct after one hint on 2026-10-12.

### Final §1 check: `Stepper` / `mode` loop / SSR `document.title`
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:**
  1. Answered for 1 click instead of 3 (misread). Retry: `step 8, clicks 0` ✅.
  2. "Effect runs twice, 3 renders." Retry: "2 Effects, 2 renders", but the trace said the Effect
     doesn't run on render 2 "as same mode value" and called render 2 a "mount."
  3. False ✅. The reason was only implied ("server HTML is hydrated").
- **Problem:** Partial.
  1. Second misread of an output question (after `'offline!'`/`'online!'`).
  2. Same error as loop-or-settle Version B: blends the dependency check (previous commit vs this
     commit) with the setState bail-out (new value vs stored). Added to weak-areas.md.
  3. Should state the key fact: "Effects don't run during server rendering."
- **Correct answer:** Part 2: Effect #1 on mount sets 'ready'. Commit 2's dep check finds
  'idle'→'ready', so Effect #2 runs. `setMode('ready')` bails out, so there's no render 3.
- **Re-tested:** Dependency-check half correct on 2026-10-12 (`n` capped at 2). Bail-out half
  correct after a hint.

### Effect timing: render/commit/paint order, "always after paint?", SSR
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:** (1) render → commit → paint → usually useEffect ✅. (2) "No, it can run before
  paint when triggered by interactions" ✅. (3) "I don't think server-side components have
  useEffects."
- **Problem:** Partial on (3). Confused **SSR** (normal components rendered to HTML on the server,
  which can contain `useEffect`) with **Server Components** (server-only, no Hooks at all).
- **Correct answer:** With SSR, Effects don't run during server rendering (there's no
  commit/paint), so the server HTML never includes an Effect's result. Effects run in the browser
  after hydration.
- **Re-tested:** Not yet

### Loop or settle? Object dep (A), primitive dep (B), `[]` (C)
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:** A loops ✅. C settles ✅ (said "1 render", but it's 1 Effect run and 2 renders).
  B: said it settles, but traced "re-render → Effect doesn't run because loaded didn't change."
  After a hint: "Effect runs twice" ✅.
- **Problem:** Partial. In B, compared `loaded` within one render instead of between commits
  (false → true *is* a change). Loose wording on render vs Effect-run counts.
- **Correct answer:** B: Effect run #1 on mount sets true. Commit 2 compares false→true (changed),
  so Effect run #2 sets true again. That's the same primitive, so it bails out and settles.
- **Re-tested:** Not yet

### `Box`: state vs plain local variable across renders and remount
- **Section:** ch.02 [§1](../notes/02-state-and-events/README.md#sec-1) (re-test of the
  "useState resets" weak area)
- **Date:** 2026-10-12
- **My answer:** After 2 clicks: `20 / 15`. After hide + show: `10 / 10`, with correct reasoning.
- **Problem:** Partial. Thought the handler's `m = m + 5` shows up on screen. It changes only that
  render's `m`. The re-render (caused by `setN`) runs `let m = 10` again.
- **Correct answer:** `20 / 10`, then `10 / 10`. Plain variables reset every render, and their
  changes are never displayed. State persists across renders and resets only on remount.
- **Re-tested:** Correct on 2026-10-12 (`Stepper`: `step 8, clicks 0`).

### `Notifications`: three bugs (conditional Hook / setState loop / async setup)
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:** Effect 1 and Effect 3 correct after one hint. Effect 2 (no-array Effect calling
  `setCount(count + 1)`), both tries: "UI shows 0, then 1, and stays at 1 because it always starts
  from 0." Proposed fix: updater function + `[count]`.
- **Problem:** Wrong on Effect 2.
  1. Didn't recognize the infinite loop ("Maximum update depth exceeded").
  2. **Closure misconception:** assumed one Effect function keeps seeing `count = 0` forever. In
     fact each render creates a new Effect that sees that render's `count`. Values only get stuck
     when a dependency is *missing* (stale closure, §4).
  3. Wrong fix: an updater or `[count]` still loops, because the Effect changes its own dependency.
  4. **Root cause (found on follow-up):** believed each render starts again from `useState(0)`'s
     initial value. Added to weak-areas.md.
- **Correct answer:** It's an infinite render loop. Fix: don't set state in an Effect without an
  external reason. Increment in the handler/callback that receives the event, use a ref for
  render-counting, or derive the value during render.
- **Re-tested:** Loop recognition correct on 2026-10-12 (Version A of the loop-or-settle question).

### `Dashboard`: state object vs body object as dependencies
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:** Moment 1 (Count click): `F`, correct, including that the state object `filters`
  keeps its identity. Moment 2 (`setFilters({ status: 'open' })`): first said `F`; after a hint
  said "nothing is logged, React checks its value and ignores it if it's the same."
- **Problem:** Wrong. **Misconception:** believes React's `useState` bail-out compares object
  *contents*. It uses `Object.is` (identity), the same as dependencies. Also dropped `F`, which
  always runs once a re-render happens.
- **Correct answer:** `E F`. The new object is a new identity, so the state changes, React
  re-renders, E's dependency changed, and `styles` is new so F runs. G skips. A bail-out only
  happens for the same primitive or the same object reference (`setFilters(filters)`).
- **Re-tested:** Correct on 2026-10-12 (5/5 quick-fire: `setPage(1)`, `setTags(tags)`,
  `setTags(['react'])`, `setTags([...tags])`, all with correct reasons).

### `Profile`: which of Effects A/B/C/D run (no array, `[]`, `[userId]`, `[user]` object)
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Date:** 2026-10-12
- **My answer:** Unsure. Thought batching might be involved. After being taught the method, asked
  for the answer instead of attempting it.
- **Problem:** Hesitant / not attempted.
  1. Misapplied batching: batching groups *multiple* updates in one event into one render. Here
     each moment had a single update, so it was irrelevant.
  2. Couldn't yet apply "after each commit, check each Effect's deps with `Object.is`" on its own.
- **Correct answer:** Mount: A B C D. Click: A D (C skips because 7 === 7; D runs because `user`
  is a new object each render). `userId` 7→8: A C D.
- **Re-tested:** Correct on 2026-10-12 (applied the per-commit dependency check unaided in the
  `Dashboard` moment 1 and the `tags`/`page` quick-fire).

### Three dependency-array forms + how "changed" is decided
- **Section:** [§1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **My answer:** First try: forms 1 and 2 correct, but `[a, b]` was missing "also runs on mount";
  named `Object.is` without explaining it. Retry: fixed the mount case and stated cleanup → setup
  correctly, but described `Object.is` as "like `==`" for primitives, and didn't say why identity
  comparison matters for Effects.
- **Problem:** Partial.
  1. `Object.is` is like `===` (no type conversion), not `==` (`5 == '5'` is true;
     `Object.is(5, '5')` is false). A JS equality slip (ch.00 territory).
  2. Didn't connect identity comparison to its consequence.
- **Correct answer:** `Object.is` ≈ `===`: primitives compare by value; objects/arrays/functions
  compare by identity. An object created during render is new on every render, so as a dependency
  it makes the Effect re-run after every render.
- **Re-tested:** Correct on 2026-10-12 (quick-fire 5/5 used identity vs value correctly).

### `Cart`: unnecessary Effect computing `total`
- **Section:** [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0) /
  [§8](../notes/03-side-effects-and-lifecycle/README.md#sec-8)
- **My answer:** Correctly identified the first Effect as unnecessary ("sum can be calculated from
  items"). Correctly said the `localStorage` Effect is needed (external system). Asked for the
  answer on "what does the Effect version cost?"
- **Problem:** Partial. Couldn't explain the *cost* of derived state in an Effect, and didn't write
  the fix.
- **Correct answer:** The first render shows the stale `₹0` and is committed. Then the Effect runs
  `setTotal(150)`, which causes a second render and commit. Cost: an extra render on every `items`
  change, plus a stale intermediate value. Fix: `const total = items.reduce(...)` during render,
  with no state and no Effect.
- **Re-tested:** Not yet

### Classify round 2: analytics / cart POST / localStorage / filter / app init
- **Section:** [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0) (+ app init from
  [§8](../notes/03-side-effects-and-lifecycle/README.md#sec-8))
- **My answer:** (a) Effect, (b) handler, (c) Effect, (d) **Event** ("user types"), (e) module level.
  After hints, asked for the answers instead of retrying.
- **Problem:** Wrong on (d), partial on (a) and (e).
  1. (d) Classified `items.filter(... query)` as an event handler by tracing back to the user's
     typing. Skipped flowchart question 1 ("does it only compute a value?").
  2. (a) didn't name the external system (the analytics server).
  3. (e) gave no reason why module level beats a `[]` Effect.
- **Correct answer:** (d) render: it's derived from state. The typing is handled by `onChange` →
  `setQuery`, and the filter is computed during render. (e) `[]` means once *per mount*, and
  Strict Mode / conditional re-show / `key` change remount it. App-wide init goes at module level.
- **Re-tested:** (d) correct on 2026-10-11 (`Cart` question: spotted the derived `total`
  immediately). (a) correct on 2026-10-11 (named `localStorage` as the external system in `Cart`).
  (e) correct on 2026-10-11 after one hint (Strict Mode remount + `key` change; missed
  "conditionally shown again", the most common case).

### `NetworkBadge`: what logs on mount? (window `online`/`offline` listeners)
- **Section:** [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0)
- **My answer:** On mount: `'effect setup'` then `'online!'`, reasoning that "goOnline doesn't
  check isOnline, so it should log."
- **Problem:** Wrong (a JS-mechanics gap). Treated *defining* a function and *registering* it with
  `addEventListener` as *calling* it. Also assumed the `online` event fires at page load when
  already online.
- **Correct answer:** Mount logs only `'effect setup'`. `goOnline` runs only when the browser fires
  `online`, which happens only on an offline→online *transition*. Same idea as
  `onClick={handleSend}`: registering a handler doesn't run it.
- **Re-tested:** Correct on 2026-10-11 (retry after explanation). Two small slips on the retry:
  1. Part 2 didn't finish the chain to the UI (`setIsOnline(false)` → re-render → 🔴 Offline).
  2. Part 3 wrote `'offline!'` for the `online` event; it should be `'online!'` (slip or confusion).
     Watch for careless reads in output-prediction questions.

### Classify: render / handler / Effect (5 cases incl. two ref-based DOM cases)
- **Section:** [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0)
- **My answer:** First try: classified (a)-(c) correctly, gave no reasons, skipped (d)/(e). Retry:
  all five classified correctly. (e) reasoning was excellent ("can't be expressed as JSX → external
  system → Effect").
- **Problem:** Partial.
  1. (c) `document.title`: the reason given was "React values change (unreadCount)", which is
     *timing* again, the same pattern as the previous question. That reason doesn't separate render
     from Effect, since render also re-runs when `unreadCount` changes.
  2. (d) said "render" but didn't say the ref mutation must be *replaced* by a JSX
     `style`/`className` prop (not run during render).
- **Correct answer:** (c) is an Effect because `document.title` lives outside React's tree (an
  external system). (d) replace the ref code with `style={{ borderColor: isInvalid ? 'red' :
  undefined }}`. Bonus: React 19 can render `<title>` in a component (covered in ch.07).
- **Re-tested:** Not yet

### Event handler vs `useEffect`: what decides which one to use?
- **Section:** [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0)
- **My answer:** First try: "handlers run on an event, Effects synchronize with external systems
  like timers/APIs", with no examples. Second try: gave the right chat-app examples, explained the
  Effect by *timing* (mount + dependency changes), and stated the decision question as "did the
  user do something, or did the external system change?"
- **Problem:** Partial.
  1. Explained *when* an Effect runs (timing) rather than *why* (cause), which the notes call the
     weak interview answer.
  2. Misconception: thinks an Effect runs "because the external system changed." It doesn't. React
     can't observe external systems. An Effect re-runs only when React values in its dependency
     array change. To react to external changes, the Effect *subscribes* (e.g.
     `addEventListener`), and the subscription's callback is what runs.
- **Correct answer:** The difference is *cause*. A handler runs because of a specific
  interaction (click Send → send message). An Effect runs because the component is displayed and
  must stay in sync with an external system (stay connected to the room while it's on screen).
  Decision rule from the docs: "ask *why* this code needs to run."
- **Re-tested:** Misconception 2 correct on 2026-10-11 (`NetworkBadge`, part 2: knew the Effect
  doesn't re-run and the browser calls the listener). Misconception 1 (timing vs cause) correct on
  2026-10-11: rejected "useEffect = code after render" and answered with the cause unprompted.
