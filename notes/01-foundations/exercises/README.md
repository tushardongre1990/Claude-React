# Chapter 01 Exercises — Foundations: JSX, Rendering & Components

Starter files live in
[`app/src/chapters/01-foundations/`](../../../app/src/chapters/01-foundations/). Unlike
chapter 00's framework-free katas, these are React components — the easiest way to see them
render is to temporarily import the exercise component into `app/src/App.tsx` while you work on
it (swap it back out, or just comment/uncomment the import, when you move to the next
exercise), then run:

```bash
cd app
npm run dev
```

Each exercise below: a problem statement, what to fill in, and a "why this, not just how"
follow-up question to answer out loud (per the working rule in `CLAUDE.md` — verbally explaining
a concept back is part of what makes a chapter count as `Done`).

---

## Exercise 1 — `ProfileCard`: props, defaults, and composition over configuration

**File:** [`ex1-profile-card.tsx`](../../../app/src/chapters/01-foundations/ex1-profile-card.tsx)

Build a `ProfileCard` component that:
- Accepts `name: string` and `role: string` props (both required).
- Accepts an optional `avatarUrl?: string` prop — when absent, render a fallback (e.g. the
  person's initials in a colored circle) instead of a broken `<img>`.
- Accepts an optional `variant?: 'compact' | 'full'` prop that **defaults to `'full'`** using a
  JS default parameter (not `defaultProps` — see the chapter notes on why that's deprecated for
  function components as of React 19).
- Accepts `children` and renders them as a "bio" section — this is the composition part: the
  caller decides what goes in the bio (plain text, a list, a link), `ProfileCard` just provides
  the slot.

**Follow-up to answer out loud:** why does using `children` for the bio scale better than adding
a `bio: string` prop, if you imagine needing the bio to sometimes contain a link or bold text?

---

## Exercise 2 — `StatusPanel`: conditional rendering patterns, and the `&&` footgun

**File:** [`ex2-status-panel.tsx`](../../../app/src/chapters/01-foundations/ex2-status-panel.tsx)

Build a `StatusPanel` component that takes a `status: 'idle' | 'loading' | 'error' | 'success'`
prop and a `resultCount: number` prop, and:
- Renders one of four distinct outputs depending on `status` (your choice of pattern — ternary
  chain, early returns, or an assigned variable — per the trade-offs in the chapter notes).
- When `status === 'success'`, renders `"${resultCount} results"` **only when `resultCount` is
  actually rendered correctly for `resultCount === 0`** — i.e. don't reproduce the classic
  `{resultCount && <span>...}` bug where a `0` result count renders a bare `"0"` on screen
  instead of "0 results" or an empty-state message. Prove to yourself you understand the bug by
  first writing the broken `&&` version, confirming you see a stray `0` render with
  `resultCount = 0`, and then fixing it.

**Follow-up to answer out loud:** why does `{count && <span>...}` render a literal `0` instead of
nothing, when `{isLoggedIn && <Dashboard />}` correctly renders nothing for a falsy
`isLoggedIn`? (Hint: it's about *which* falsy value each one is.)

---

## Exercise 3 — `KeyedList`: keys, reordering, and the index-as-key bug

**File:** [`ex3-keyed-list.tsx`](../../../app/src/chapters/01-foundations/ex3-keyed-list.tsx)

Build a small todo-style list where each row is `{ id: string, text: string }` and renders as an
`<input defaultValue={text} />` (an *uncontrolled* input — deliberately, so React doesn't
override what you type; controlled inputs are ch.02) plus a "Delete" button next to it.

1. First implement it using the array **index** as the `key`.
2. Type something different into two of the inputs (don't submit anything, just edit the text
   in place), then click "Delete" on the **first** row. Observe which input's typed text ends up
   attached to which row after the delete — this reproduces the bug described in the chapter
   notes.
3. Fix it by using `item.id` as the key instead, and re-run the same steps to confirm the typed
   text now stays attached to the correct row.

Keep both versions (e.g. `key={index}` commented out next to `key={item.id}`) so the difference
is easy to point to later during revision.

**Follow-up to answer out loud:** in your own words, what is React actually comparing when it
reconciles a list, and why does that make index keys unsafe specifically when items are
inserted/removed/reordered but safe for a list that only ever appends?

---

## Exercise 4 — Observing Strict Mode double-invocation (no new component required)

Using any of the components above (or `App.tsx` itself), add a `console.log` directly in the
component's function body (not inside an Effect) and one inside a `useEffect` with an empty
dependency array, including a `console.log` in that Effect's cleanup function. Run the dev
server (Strict Mode is already on — see `main.tsx`) and observe the console output order on
first mount.

**Follow-up to answer out loud:** why does the render log appear twice but you (usually) don't
notice any twice-visible *side effect* from it, while the Effect log sequence is
setup → cleanup → setup? What would you expect to go wrong if your Effect's cleanup function
were missing entirely, and why would Strict Mode be the thing that catches it in development
instead of it silently working until production?

---

*Solutions get filled in here (or linked) as each exercise is attempted, per the chapter's normal workflow.*
