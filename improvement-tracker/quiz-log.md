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

*Started at [§0](../notes/03-side-effects-and-lifecycle/README.md#sec-0).*

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
