# Chapter 03 Exercises — Side Effects & Lifecycle

Starter files live in
[`app/src/chapters/03-side-effects-and-lifecycle/`](../../../app/src/chapters/03-side-effects-and-lifecycle/).
As in earlier chapters, the easiest way to see one is to temporarily render the exercise's exported
component from `app/src/App.tsx`, then run:

```bash
cd app
npm run dev
```

Strict Mode is on (see `main.tsx`), and it matters for this chapter more than any other. Several of
these exercises are designed to show you exactly what the dev-only setup → cleanup → setup cycle
catches.

Use `npm run lint` as you go. In exercise 2 the `exhaustive-deps` warnings are the bugs you're
fixing. Everywhere else, a new warning means you've introduced one.

Each exercise has a problem statement, what to do, and "why this, not just how" follow-ups to answer
**out loud** (per `CLAUDE.md`, explaining a concept back verbally is part of what makes a chapter
count as `Done`).

> **Do exercise 1 before reading [§2](../README.md#sec-2) and [§6](../README.md#sec-6) of the
> notes closely.** It's a prediction exercise, and
> the notes contain the answer.

---

## Exercise 1 — `EffectOrderLab`: predict first, then run

**File:** [`ex1-effect-order-lab.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex1-effect-order-lab.tsx)
**Notes:** [§1](../README.md#sec-1), [§2](../README.md#sec-2), [§6](../README.md#sec-6), [§7](../README.md#sec-7)

A `Parent` renders a `Child`. Each has one `useLayoutEffect` and one `useEffect`, and every render,
setup and cleanup is written to a log panel. Nothing to implement.

1. **Before running**, write in the comment block at the bottom of the file the exact log you
   expect for: the initial mount (in Strict Mode), clicking "change dep", and clicking "toggle
   mount".
2. Run it and compare line by line.
3. To see the **production** order (no Strict Mode), temporarily remove `<StrictMode>` from
   `main.tsx`, reload, and compare again. Put it back afterwards.

**Follow-ups to answer out loud:**
- Why do *all* layout Effects run before *any* regular Effect in the same commit?
- On "change dep", every cleanup runs before any new setup. Which React version made that a
  guarantee, and what bug could the old order cause?
- In Strict Mode, the extra cleanup/setup appears on mount but not on "change dep". Why only on
  mount? What real React 19.2 feature does the same unmount/remount in production?

---

## Exercise 2 — `StaleClosureLab`: three bugs, three different fixes

**File:** [`ex2-stale-closures.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex2-stale-closures.tsx)
**Notes:** [§3](../README.md#sec-3), [§4](../README.md#sec-4), [§12](../README.md#sec-12)

- **Part A — `BrokenTicker`:** goes 0 → 1 and freezes. Fix it so the interval is created **once**.
- **Part B — `StepTicker`:** adds `step` every second, but changing `step` does nothing. Fix it
  twice: (1) with `step` as a dependency, and (2) with `useEffectEvent`. Watch the ticks closely
  while typing a new step in each version. One of them resets the one-second rhythm on every
  change. Leave a comment saying which fix you'd ship.
- **Part C — `EnterToSubmit`:** pressing Enter always submits an empty string. Fix it.

For each part, **before fixing**, write a one-line comment naming which render's value the stale
function reads and why React never gave it a newer one.

**Follow-ups to answer out loud:**
- Explain Part A's bug in terms of closures alone, without the words "stale closure."
- Parts A and B both involve an interval. Why is the right fix different? (Hint: does the callback
  only *write* state, or does it also need to *read* something that isn't state it's setting?)
- Someone fixes Part C with `// eslint-disable-next-line react-hooks/exhaustive-deps`. What's your
  code-review comment?

---

## Exercise 3 — `CleanupAudit`: five leaks

**File:** [`ex3-cleanup-audit.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex3-cleanup-audit.tsx)
**Notes:** [§5](../README.md#sec-5), [§6](../README.md#sec-6)

Five small components, each with a cleanup problem. The file's `tracked*` helpers do the real work
*and* count what's still alive, and a stats panel shows the counts.

1. Run it and read the panel **before changing anything**. Explain every number that's wrong.
   Strict Mode doubles some of them. Why those and not others?
2. Toggle mount and switch rooms a few times. Which numbers only ever grow?
3. Fix all five. Target: **2 listeners / 1 interval / 1 connection / 1 widget** while mounted, all
   zeros after unmounting, and exactly one connection (to the *current* room) after switching
   rooms.
4. Bug 4 is a thinking exercise: work out whether it's actually broken before touching it, then
   rewrite it in the React 17 release notes' recommended shape anyway.

**Follow-ups to answer out loud:**
- Bug 3's cleanup *looks* symmetrical. What exactly does `removeEventListener` compare, and why did
  that fail?
- Bug 5 shows "1 connection" in development, so it looks *correct* under Strict Mode. Name the two
  ways it's still broken. What did the `useRef` guard actually hide?
- What does the `AbortController` + `{ signal }` option for `addEventListener` buy you in Bug 1
  and Bug 3?

---

## Exercise 4 — `LiveSearchLab`: the chapter build

**File:** [`ex4-live-search.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex4-live-search.tsx)
**Notes:** [§9](../README.md#sec-9), [§10](../README.md#sec-10)

`fakeSearch(query, signal)` takes 200–1500ms at random and honours an `AbortSignal` the way
`fetch` does. A query containing `!` makes the "server" fail. A request counter at the top shows
started / completed / aborted / failed.

1. **Reproduce the bug first.** In `NaiveSearch`, type `re` then `red` quickly, several times, until
   "results for" disagrees with the input. Draw the sequence of requests and responses that caused
   it.
2. **Implement `LiveSearch`** (it starts as a copy of the naive version). Requirements:
   - Debounce: no request until the user has paused typing for 300ms.
   - Cancellation: pass an `AbortController` signal to `fakeSearch` and abort in cleanup.
     `AbortError` must never show up as an error in the UI.
   - Status: model it as `'idle' | 'loading' | 'success' | 'error'`, not as booleans.
   - Show a loading indicator, an error message (try `re!`), and "no results" for an empty list.
   - Empty or whitespace-only query: no request, and an idle state derived from `query` during
     render (not set in an Effect).
   - "results for" must **never** show `← STALE` once a response is displayed, however you type.
3. Type a 10-character word quickly in both panels and compare the request counters.
4. Stretch: add a 2-second timeout with `AbortSignal.timeout(2000)` combined with your controller
   via `AbortSignal.any`, and show a distinct "timed out" message. (What error `name` do you check?)

**Follow-ups to answer out loud:**
- Name the bug in `NaiveSearch` precisely, and explain why it can't be reproduced on a fast,
  consistent connection.
- The `ignore` flag and `AbortController` both fix the race. What does each one buy that the other
  doesn't?
- Your cleanup handles two different stages with two calls. What are the stages?
- An interviewer asks "would you ship this?" Give the honest answer, including what you'd use
  instead and why ([§10](../README.md#sec-10)).

---

## Exercise 5 — `EffectFreeRefactor`: delete five Effects

**File:** [`ex5-effect-free-refactor.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex5-effect-free-refactor.tsx)
**Notes:** [§8](../README.md#sec-8)

`ProductBrowser` works, and has six `useEffect` calls. Only one of them synchronizes with a system
outside React. Refactor until **exactly one** Effect remains, with the same visible behaviour:

- the filtered list and its price total
- selection resets when the category changes
- the parent is told about every selection change
- the details panel opens when something is selected
- `document.title` follows the selection

For each Effect you delete, leave a one-line comment naming its [§8](../README.md#sec-8)
anti-pattern and what replaced it. Note the render counter before and after. It counts Strict Mode's
double render too, so compare relative numbers, not absolute ones.

**Follow-ups to answer out loud:**
- Which Effect stays, and what's the "external system" it synchronizes with?
- Effect 3 (reset on category change) has two good replacements. Which fits this component better,
  and when would you pick the other?
- Effect 4 (notify parent) ran after *every* render, not just when `selected` changed. Why? What
  was the parent passing it?

---

## Exercise 6 — `ExternalStoreLab`: `useSyncExternalStore`

**File:** [`ex6-external-store.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex6-external-store.tsx)
**Notes:** [§11](../README.md#sec-11)

- **Part A:** implement `useOnlineStatus` and `useWindowWidth` with `useSyncExternalStore`,
  `subscribe` declared outside each hook, plus a server snapshot for `useOnlineStatus`. Test
  offline with DevTools → Network → Offline.
- **Part B:** finish `cartStore` (`add`, `clear`, `subscribe`, `getSnapshot`) so `CartBadge` and
  `CartList` stay in sync. Never mutate `cart`.
- **Part C:** uncomment `<BadSnapshot />`, read both console messages, comment it out again, and
  write a working version below it **without changing the store**.

**Follow-ups to answer out loud:**
- The old `useOnlineStatusWithEffect` works. Give three concrete things `useSyncExternalStore` does
  better.
- In Part B, what happens if `add` mutates `cart` with `push` and then notifies? Walk through the
  `Object.is` check.
- Explain Part C's infinite loop step by step.

---

## Exercise 7 — Explain-back (no code)

Close the notes. Out loud, in under three minutes, answer as if to an interviewer:

> "Walk me through everything that happens, in order, when a component with a `useEffect` that
> subscribes to a chat room mounts, re-renders with a new `roomId`, and unmounts — in development
> and in production."

You should naturally hit: render → commit → paint → setup; `Object.is` comparison of dependencies;
old cleanup (with the old `roomId`) before new setup; cleanup on unmount; Strict Mode's extra
setup → cleanup → setup on mount only; and why that check exists.

Then, without notes:
- When would you use `useLayoutEffect` instead?
- Name five situations where you *shouldn't* write an Effect, and what to use instead.
- Where would you fetch data in a production app, and why is "in a `useEffect`" usually not your
  first answer?

---

*Solutions get filled in here (or linked) as each exercise is attempted, per the chapter's normal
workflow.*
