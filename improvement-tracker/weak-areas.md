# Improvement Tracker — Weak Areas

A running log of gaps, mistakes, and slow spots noticed while working through exercises,
chapter reviews, or mock interviews. This is the single most important pre-interview reading
list — it's built from what has *actually* tripped you up, not a generic checklist.

**Format for each entry:**

```
## <short title>
- **Chapter:** <link>
- **Noticed:** <date>
- **What happened:** <the mistake, confusion, or slow answer>
- **Correct understanding:** <the fix — what should be true instead>
- **Status:** Open / Resolved (resolved <date>)
```

Newest entries at the top. Move an entry to "Resolved" (don't delete it) once you can explain
it correctly without hesitation — the history is useful evidence of progress.

---

## Blends the dependency check with the `setState` bail-out
- **Chapter:** [ch.03 §1](../notes/03-side-effects-and-lifecycle/README.md#sec-1)
- **Noticed:** 2026-10-12 (2 questions: `loaded` Version B, then `mode` 'idle'→'ready'; see
  [quiz-log.md](quiz-log.md))
- **What happened:** For `useEffect(() => setX(v), [x])`, traced "on the 2nd render the Effect
  won't run because x is the same value," skipping the second Effect run. Also called the 2nd
  render a "mount."
- **Correct understanding:** Two separate checks:
  1. **Dependency check** (after each commit): this commit's dep value vs the previous commit's,
     which decides whether the Effect runs.
  2. **Bail-out** (when `setX` is called): the new value vs the stored value, which decides whether
     a new render happens.
  'idle'→'ready' between commits means Effect #2 runs. Its `setMode('ready')` then bails out, so
  there's no render 3. Mount = the first commit only. Later renders are updates.
- **Status:** Open. 2026-10-12: the dependency check is now applied correctly unaided, but the
  bail-out still needed a hint (`n` capped at 2). Re-test both checks together in a later session.

## Thought `useState(initial)` resets to the initial value on every render
- **Chapter:** [ch.02 §1](../notes/02-state-and-events/README.md#sec-1) (surfaced in the ch.03 §1 quiz)
- **Noticed:** 2026-10-12 (see [quiz-log.md](quiz-log.md), `Notifications` Effect 2)
- **What happened:** Asked "shouldn't each render start with the initial value of 0?" This was the
  root cause of predicting that `useEffect(() => setCount(count + 1))` stays at 1 instead of looping.
- **Correct understanding:** React stores state outside the component function, per component
  instance. The initial value is used only on the first render (mount). Every later render's
  `useState(0)` returns the *current stored* value. State resets only on unmount → remount (removed
  and shown again, or `key` change). Plain local variables, in contrast, *are* recreated every render.
- **Status:** Open

## `Object.is`: identity vs contents (state bail-out and Effect deps)
- **Chapter:** [ch.03 §1](../notes/03-side-effects-and-lifecycle/README.md#sec-1) (rooted in ch.00
  equality and the ch.02 `useState` bail-out)
- **Noticed:** 2026-10-11 to 2026-10-12 (quiz; came up in 3 questions, see [quiz-log.md](quiz-log.md))
- **What happened:**
  1. Described `Object.is` as "like `==`" (it's like `===`).
  2. Couldn't predict that an object dependency created in the body re-runs the Effect every render.
  3. Believed `setFilters({ status: 'open' })` is skipped because the contents match the current
     state, i.e. that React compares contents.
- **Correct understanding:** React only ever uses `Object.is` (≈ `===`), for both state bail-outs
  and Effect dependencies. Primitives compare by value. Objects/arrays/functions compare by
  identity, never by contents. A new object with identical contents is "changed." State keeps its
  identity across renders until the setter is given a different value. An object written in the
  component body is new on every render.
- **Status:** Open

## Explains Effects by *timing* instead of *cause*; thinks Effects re-run when external systems change
- **Chapter:** [ch.03 §0](../notes/03-side-effects-and-lifecycle/README.md#sec-0)
- **Noticed:** 2026-10-11 (quiz; came up in 2 consecutive questions, see [quiz-log.md](quiz-log.md))
- **What happened:** When asked *why* code belongs in an Effect, answered with *when* it runs
  ("on mount and when dependencies change", "because unreadCount changes"). Also stated the
  decision rule as "did the user do something, or did the external system change?"
- **Correct understanding:**
  1. Why it's an Effect: the component is on screen and must keep an **external system** (something
     outside React's tree: network, browser APIs, `document.title`, imperative DOM calls) in sync
     with its props/state. A change in a React value also re-runs render, so it can't be the reason.
  2. React can't observe external systems. An Effect re-runs only when React values in its
     dependency array change. External changes reach React through a *subscription callback* that
     the Effect set up (e.g. a `resize` listener calling `setWidth`).
- **Status:** Open. Both parts were answered correctly in later questions the same day (see
  quiz-log). Keep re-testing in later sections before marking Resolved.
