# Chapter 02 Exercises — State & Events

Starter files live in
[`app/src/chapters/02-state-and-events/`](../../../app/src/chapters/02-state-and-events/). As in
chapter 01, the easiest way to see one render is to temporarily import the exercise component
into `app/src/App.tsx` while you work on it, then run:

```bash
cd app
npm run dev
```

Strict Mode is already on (see `main.tsx`), which matters for exercises 1 and 4 — a couple of
these are *designed* to double-invoke.

Each exercise below has a problem statement, what to fill in, and a "why this, not just how"
follow-up question to answer **out loud** (per the working rule in `CLAUDE.md` — verbally
explaining a concept back is part of what makes a chapter count as `Done`).

> **Do exercise 1 before reading further into the others.** It's a prediction exercise, and
> reading ahead spoils it.

---

## Exercise 1 — `BatchingLab`: predict first, then run

**File:** [`ex1-batching-lab.tsx`](../../../app/src/chapters/02-state-and-events/ex1-batching-lab.tsx)

The file contains five buttons, each with a handler that's already written. **Before running
anything**, write down — on paper or in a comment — two predictions per button:

1. What `count` will be after one click.
2. How many times the component function will run as a result of that click.

Then run it. A render counter and a log panel are wired up in the starter file so you can check
both predictions without guessing from the console.

The five handlers:

| Button | Handler body |
|---|---|
| A | `setCount(count + 1)` three times |
| B | `setCount(c => c + 1)` three times |
| C | `setCount(count + 5); setCount(c => c + 1)` |
| D | `setCount(count + 5); setCount(c => c + 1); setCount(42)` |
| E | the same three calls as A, but inside `setTimeout(..., 0)` |

Only after you've recorded predictions and compared them against reality: fill in `handleF`,
which must increment `count` by exactly 3 **and** cause exactly one re-render, and then add a
sixth prediction for it.

**Follow-ups to answer out loud:**
- Explain button A's result *without using the word "asynchronous."*
- Button E is the interesting one for a version question: what would it have done in React 17,
  and what specifically changed?
- A and B produce different values but the same number of renders. Why are those two facts
  independent of each other?

---

## Exercise 2 — `TodoEditor`: immutable updates, objects and arrays

**File:** [`ex2-todo-editor.tsx`](../../../app/src/chapters/02-state-and-events/ex2-todo-editor.tsx)

State is a single array of `{ id: string; text: string; done: boolean; tags: string[] }`.
Implement six operations, all immutably — no `push`, `splice`, `sort`, or `arr[i] =`:

1. `addTodo(text)` — append.
2. `removeTodo(id)`.
3. `toggleDone(id)` — flip `done` on one todo, leaving the others' object identities untouched.
4. `renameTodo(id, text)`.
5. `addTag(id, tag)` — this is the nested one: a new array *inside* a new object *inside* a new
   array.
6. `sortByText()` — alphabetical, without mutating state.

The starter file renders a small "identity inspector" showing, after each update, which todo
objects kept their previous reference. Use it to verify a claim from the notes: **toggling one
todo should create exactly one new object**, and every other todo should still be the same
reference it was before.

Then deliberately break it: add a `toggleDoneBroken` that mutates (`todo.done = !todo.done;
setTodos(todos)`) and observe what the UI does — including whether it *ever* catches up when you
then click a different button.

**Follow-ups to answer out loud:**
- Why is a mutation bug harder to diagnose than a clean "nothing happens" failure?
- `setTodos([...todos].sort(...))` vs. `setTodos(todos.sort(...))` — name *both* things that go
  wrong with the second one.
- If `toggleDone` accidentally returned brand-new objects for every todo instead of just the one,
  nothing visible would break. Why would that still be a real problem in a larger app? (Points
  forward to ch.06.)

---

## Exercise 3 — `SignupForm`: controlled inputs, and the uncontrolled twin

**File:** [`ex3-signup-form.tsx`](../../../app/src/chapters/02-state-and-events/ex3-signup-form.tsx)

Build the same small form twice, in one file, side by side.

**Part A — controlled.** Fields: `email` (text), `plan` (a `<select>`), `acceptedTerms` (a
checkbox). Requirements:
- Every field is fully controlled.
- The submit button is disabled unless the email contains `@` **and** terms are accepted — this
  validity flag must be **derived during render**, not stored in its own state variable.
- `onSubmit` calls `e.preventDefault()` and logs the values.
- Show a live character count next to the email field, also derived.

**Part B — uncontrolled.** The same three fields, using `defaultValue`/`defaultChecked` and
reading everything at submit time with `new FormData(e.currentTarget)`. No `useState` at all in
this half.

**Part C — reproduce the warning.** Add a fourth field that starts as `useState()` (no argument)
and is passed as `value`. Open the console, type in it, and read React's actual warning text.
Then fix it, and note in a comment which two fixes both work.

**Follow-ups to answer out loud:**
- Define controlled vs. uncontrolled in terms of *who owns the value*, not in terms of which
  props are used.
- Part B has no state and no re-renders per keystroke. So why is controlled still the usual
  default?
- React's `onChange` fires on every keystroke, but the browser's native `change` event on a text
  input doesn't. Which native event is React's `onChange` actually modeled on, and why does that
  matter for Part A working at all?

---

## Exercise 4 — `EventLab`: propagation, delegation, and the two `e.` methods

**File:** [`ex4-event-lab.tsx`](../../../app/src/chapters/02-state-and-events/ex4-event-lab.tsx)

A nested structure — outer `<div>` → inner `<div>` → `<button>` → `<span>` — with a log panel.

1. Attach `onClick` to all four and click the innermost `<span>`. Record the exact firing order.
2. Add `onClickCapture` to the outer div and predict where it lands in that order before running.
3. Add `e.stopPropagation()` to the button's `onClick`. Which of the four still fire — and does
   the capture handler?
4. Log `e.target.tagName` and `e.currentTarget.tagName` in each handler. Explain why one of them
   is the same in all four and the other isn't.
5. Add a plain `document.addEventListener('click', ...)` in a `useEffect` (Effects are ch.03 —
   the starter file has the boilerplate written for you). Does it fire before or after the React
   handlers? Does the button's `stopPropagation()` prevent it? Explain the result in terms of
   *where React actually attaches its listener*.
6. Add a `<form onSubmit>` with a submit button. Observe what happens **without**
   `e.preventDefault()`, then add it.

**Follow-ups to answer out loud:**
- `stopPropagation` vs. `preventDefault` — give a concrete scenario for each where the other one
  would be the wrong tool.
- Where does React attach its real DOM listeners in React 19, where did it attach them in React
  16, and what problem did moving them solve?
- Someone tells you "React's SyntheticEvent is pooled, so you have to call `e.persist()` before
  using it in a `setTimeout`." What's your response?

---

## Exercise 5 — `TemperatureSync`: lifting state up, and resetting with `key`

**File:** [`ex5-temperature-sync.tsx`](../../../app/src/chapters/02-state-and-events/ex5-temperature-sync.tsx)

1. Start from the given broken version: two `TemperatureInput` components (Celsius and
   Fahrenheit), each holding its own local state. Confirm they don't stay in sync.
2. Lift the state to the common parent, following the docs' three steps in order — remove state
   from the children, pass hardcoded data down, then add state to the parent and pass the
   handlers. Do the middle step for real, even though it feels pointless; the point is that a
   broken step 2 tells you the wiring is wrong before any state is involved.
3. The parent should hold exactly **two** state variables (the value, and which scale it was last
   typed in) and derive the other scale during render. Deliberately do *not* store both
   temperatures — that would be the duplication anti-pattern from [§8](../README.md#sec-8).
4. Add a `<Notes />` child with its own local `useState` for a free-text scratchpad, and a
   "measurement session" selector above it. Wire the session so switching it *resets* the
   scratchpad — using `key`, not by mirroring the session prop into state and clearing it.

**Follow-ups to answer out loud:**
- After step 3, `TemperatureInput` no longer has state. Using the notes' vocabulary, what did it
  just become, and what did the parent gain by that?
- Why is "store `value` + `scale` and derive the other" better than "store `celsius` +
  `fahrenheit` and update both on every change"? Name the failure mode of the second.
- Explain the `key` reset in step 4 in terms of *state being tied to a position in the tree*.
  What exactly does React do when the key changes?

---

## Exercise 6 — Explain-back (no code)

Close the notes. Out loud, in under three minutes, explain to an imaginary interviewer:

> "Walk me through what happens between clicking a button and seeing the number change on screen."

You should naturally hit: the handler runs → setter *schedules* an update rather than assigning →
the snapshot rule means `count` doesn't change inside that handler → updates are queued and
batched into one render → React calls the component again with the new value → reconciliation →
commit. If you find yourself saying "it's asynchronous," stop and restate it.

Then answer, without notes:
- Why does `setCount(count + 1)` three times give 1?
- Why does mutating an object in state do nothing?
- What changed about batching in React 18, and about events in React 17?

---

*Solutions get filled in here (or linked) as each exercise is attempted, per the chapter's normal workflow.*
