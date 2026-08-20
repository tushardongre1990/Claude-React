# Chapter 02: Interview Questions & Answers

**Part of:** [Chapter 02: State & Events](README.md)

Every question an interviewer could reasonably ask from this chapter's topics, each with a full
answer written to stand on its own as a complete, interview-accepted response — not just a
keyword. Read the linked section in [`README.md`](README.md) first if an answer here doesn't fully
click; this file is for drilling recall and delivery, not first-time learning.

## How to use this file

Each question is tagged, then answered in two layers: a **Quick answer** — a 15-20 second version
you could actually say out loud as your *first* response — followed by the **Full answer**, the
complete depth layer that backs it up and is what you reach for on any follow-up. Don't try to
recite the full answer verbatim as your opening line; lead with the quick answer, then let the
interviewer's follow-up (or your own judgment that more depth is warranted) pull the rest out of
you.

Tags:
- ⭐ **Core** — never hesitate on these; baseline expectations for 5-10 YOE.
- 🔥 **Frequent** — comes up often, in some form, across real interview loops.
- 🧠 **Deep** — separates "read about React" from "understands React"; usually a follow-up, not an opener.
- 🎯 **Trap** — a common wrong or incomplete answer exists; naming *why* it's wrong is the actual signal.
- ⚠️ **Version** — a React-17/18/19-specific detail; know the delta from older React explicitly.

A [**Coding & Scenario Questions**](#coding--scenario-questions) section at the end converts the
same underlying concepts into "what does this output / find the bug" prompts, which is closer to
how interviewers actually probe this material than a pure explain-the-concept question is.

> **This chapter's one-sentence spine**, worth having ready because half these answers reduce to
> it: *state lives outside your component in React; a state variable is a snapshot fixed for the
> render that read it; a setter schedules an update rather than assigning to that variable.*

---

## §0. What state is, and why a plain variable doesn't work — [notes](README.md#sec-0)

**Q: Why can't you just use a regular local variable instead of state?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** Two reasons, and most people only give one: a local variable doesn't *persist*
across renders (it's re-initialized every time the function runs), and changing it doesn't *tell
React to re-render*. State provides both.

**Full answer:** A component is a function, and React calls it again every time it needs an
updated description of the UI. A `let count = 0` inside that function is re-initialized on every
call, so any value you assigned during the previous render is gone — that's ordinary JavaScript
function scoping, not a React quirk. Separately, assigning to a local variable is invisible to
React: nothing schedules a re-render, so even a value that *did* somehow survive would never make
it to the screen. State solves both problems at once, because React stores it outside your
component and the setter is what schedules the re-render. If you only say "React needs state to
re-render," you've given half the answer.

**Q: Where does state actually live?** *(🧠 Deep)*

**Quick answer:** In React, not in your component. React's docs describe it as living "on a shelf"
outside your function, associated with that component's position in the render tree.

**Full answer:** React's docs put it directly: "State actually 'lives' in React itself — as if on a
shelf! — outside of your function." Your component doesn't own the value; React hands it to you
when it calls your function, and the setter is a *request* to React to update its own copy and
schedule another call. Two consequences fall out of that picture, and both matter later: state is
per **component instance**, not per component function — render `<Counter />` twice and you get two
independent counts, because React keeps one slot per position in the tree — and `setCount(1)` is
not an assignment, which is why the local `count` binding is unchanged for the rest of the
currently-running function.

**Q: What does `useState` return, and why is it an array?** *(⭐ Core)*

**Quick answer:** A pair — the current value for this render, and a setter function — returned as
an array specifically so you can name both whatever you want via array destructuring.

**Full answer:** `const [count, setCount] = useState(0)` destructures a two-element array: the
current value, and the function that requests an update. It's an array rather than an object
precisely because array destructuring is positional, so you pick the names — which matters when a
component has five state variables and they all need distinct names. The convention is universally
`[thing, setThing]`; don't deviate from it, because every reader and every interviewer pattern-matches
on it.

---

## §1. `useState` in depth — [notes](README.md#sec-1)

**Q: What happens to the argument you pass to `useState` on re-renders?** *(⭐ Core · 🎯 Trap)*

**Quick answer:** It's ignored. The docs say it outright: "This argument is ignored after the
initial render." It's the initial value for the first mount, not "the value."

**Full answer:** `useState(x)` uses `x` only when React initializes state for that component
instance. Every subsequent render passes the argument again — JavaScript evaluates it again — but
React discards it and returns the value it's currently holding. This is why seeding state from a
prop (`useState(props.color)`) silently freezes at the first render's value and never updates when
the prop changes; that's the "don't mirror props in state" anti-pattern in [§8](README.md#sec-8). It's also *why*
lazy initializers exist: if the argument is going to be thrown away on every render but the first,
you'd rather not compute it every render.

**Q: What's the difference between `useState(computeExpensive())` and `useState(computeExpensive)`?** *(🧠 Deep · 🔥 Frequent)*

**Quick answer:** The first calls the function on *every* render and throws away all but the first
result. The second is a lazy initializer — React calls it only during initialization.

**Full answer:** `useState(computeExpensive())` is ordinary JavaScript: to pass the result as an
argument, the call has to be evaluated first, on every single render, forever. React then discards
the result on every render but the first (per the "ignored after the initial render" rule). So if
`computeExpensive` parses a large localStorage blob, you pay for it on every keystroke.
`useState(computeExpensive)` — note the missing `()` — passes the function itself, and per the
docs: "If you pass a function as `initialState`, it will be treated as an *initializer function*.
It should be pure, should take no arguments, and should return a value of any type. React will call
your initializer function when initializing the component." Use `useState(() => compute(arg))` when
you need to pass arguments. The trap: if the state you actually want to *store* is a function,
`useState(myFn)` would call it — wrap it as `useState(() => myFn)`.

**Q: Does calling a state setter always cause a re-render?** *(🎯 Trap · 🧠 Deep)*

**Quick answer:** No. If the new value is `Object.is`-equal to the current one, React bails out and
skips re-rendering the component and its children — though it may still call your component once
before skipping.

**Full answer:** The docs: "If the new value you provide is identical to the current `state`, as
determined by an `Object.is` comparison, React will **skip re-rendering the component and its
children.** This is an optimization. Although in some cases React may still need to call your
component before skipping the children, it shouldn't affect your code." Two things to land here.
First, note that caveat — "always guarantees zero renders" is an overclaim, and a docs-literate
interviewer may push on it; the guarantee is about not propagating work to children. Second, and
much more practically: `Object.is` is reference equality for objects, so mutating an object in
state and passing the same reference back hits the bail-out and does nothing. That's the mechanism
behind React's whole immutability requirement ([§6](README.md#sec-6)).

**Q: What's the difference between `Object.is` and `===`?** *(🧠 Deep)*

**Quick answer:** Two cases: `Object.is(NaN, NaN)` is `true` (where `NaN === NaN` is `false`), and
`Object.is(+0, -0)` is `false` (where `+0 === -0` is `true`). Otherwise identical.

**Full answer:** For every value React realistically compares, they behave the same, so the honest
framing is "reference equality, with two special cases for `NaN` and signed zero." The `NaN` case
is the one that occasionally matters: with plain `===`, setting a `NaN` state to `NaN` would look
like a change and re-render forever in a bad loop; `Object.is` correctly treats it as unchanged.

---

## §2. State as a snapshot — [notes](README.md#sec-2)

**Q: Why doesn't the state variable update immediately after you call the setter?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** Because a state variable is a snapshot for the render that read it. The setter
doesn't assign to that variable — it can't, it's a `const` in a function that's already running —
it schedules the next render.

**Full answer:** Deliberately avoid the word "asynchronous" here; it's the shorthand that produces
wrong predictions, and interviewers listen for it. The accurate framing has two halves. (1) A
setter **schedules an update** — it asks React to make a value the next state and re-render; it
performs no assignment. (2) A state variable is a **snapshot**: React's docs say "**A state
variable's value never changes within a render,** even if its event handler's code is
asynchronous." So reading `count` right after calling `setCount(count + 1)` reads the old value by
definition — and so does *any closure created during that render*, including a `setTimeout`
callback or a `.then()`. React frames the guarantee positively: "**React keeps the state values
'fixed' within one render's event handlers.** You don't need to worry whether the state has changed
while the code is running." A handler that reads `count` in five places sees the same `count` in
all five, which rules out half-updated reads.

**Q: Why does calling `setCount(count + 1)` three times only increment by one?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** All three read the same snapshot. On the render where `count` is 0, all three
lines are literally `setCount(1)` — three requests to make the next value 1.

**Full answer:** `handleClick` is a closure created during the render where `count` was `0`. It
closed over that `0`. Nothing reassigns `count` between the three lines — nothing *can*, it's a
`const` binding in a function that's currently executing. So the three calls are
`setCount(0 + 1)`, `setCount(0 + 1)`, `setCount(0 + 1)`: three "replace with 1" entries in the
queue. The final value is 1, and React re-renders once. The fix is the updater form,
`setCount(c => c + 1)`, which tells React *how* to compute the next value from the pending one
rather than baking in this render's snapshot — see [§3](README.md#sec-3).

**Q: If you call a setter and then read the state in a `setTimeout` from the same handler, what do you see?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** The old value — the one from the render that created that handler — no matter how
long the timeout is or how many times the user has clicked since.

**Full answer:** This is closure behavior, not a React special case: the `setTimeout` callback
captured the `count` binding from the render that created it, and that binding never changes. The
docs' framing: "The state stored in React may have changed by the time the alert runs, but it was
scheduled using a snapshot of the state at the time the user interacted with it!" React just makes
the consequence very visible, because it calls your function many times and each call creates fresh
closures. If you actually need the current value inside a delayed callback, the answer is an
updater function (`setCount(c => ...)`, [§3](README.md#sec-3)) — or, when you need to *read* rather than *set*, a ref
(ch.04). Reaching for a ref first, before mentioning updaters, is a weaker answer.

**Q: Someone says "state updates are asynchronous." Is that right?** *(🎯 Trap · 🧠 Deep)*

**Quick answer:** It's a misleading shorthand. Nothing is deferred to a later event-loop turn by
the setter itself, and `await`ing it is meaningless. The accurate statements are "the setter
schedules an update" and "state is a snapshot."

**Full answer:** The shorthand produces wrong predictions, which is why it's worth rejecting
explicitly. `setCount` isn't asynchronous the way `fetch` is — there's no promise, no callback, no
microtask you can hook. What's true is that the *effect* on screen is deferred until the next
render, and that the local variable you're holding is a fixed snapshot. Say those two things
instead. As a bonus, the shorthand actively obscures automatic batching, whose whole point ([§4](README.md#sec-4)) is
grouping updates that come from callbacks running in genuinely separate event-loop turns.

---

## §3. Queueing updates: updater functions — [notes](README.md#sec-3)

**Q: What is an updater function and when should you use one?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** A function passed to a setter instead of a value — `setCount(c => c + 1)` — that
receives the pending state and returns the next one. Use it whenever the next value depends on the
previous value.

**Full answer:** The docs describe it as "a way to tell React to 'do something with the state
value' instead of just replacing it." Each setter call adds an entry to a queue for that state
variable; at the next render React walks the queue from the current value, applying each entry.
That's why three `setCount(c => c + 1)` calls reach 3 while three `setCount(count + 1)` calls reach
1 — the updater sees the queue's running result, not this render's snapshot. Use it when the next
value derives from the previous one, when you're updating the same state multiple times in one
handler, and especially when updating from a delayed or async callback where the snapshot is
guaranteed stale. When the new value doesn't depend on the old one — `setName(e.target.value)` — a
plain value is fine and reads better.

**Q: How does React process the update queue when you mix plain values and updater functions?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** A plain value queues "replace with X," discarding everything computed so far; an
updater queues "apply this function to the running result." Read `setN(n + 5)` as "replace with 5,"
not "add 5."

**Full answer:** The docs: "**Any other value** (e.g. number `5`) adds 'replace with `5`' to the
queue, ignoring what's already queued." So starting from `number = 0`:
`setNumber(number + 5); setNumber(n => n + 1)` gives **6** — the first entry replaces with 5 (React
evaluated `0 + 5` immediately, using this render's snapshot), then the updater adds 1. Add
`setNumber(42)` at the end and the answer becomes **42**, because a plain value discards the whole
running result. The trick to never getting these wrong is to mentally rewrite every plain-value
call as "replace with «the number it evaluated to right now»."

**Q: Do updater functions change how many re-renders happen?** *(🎯 Trap · 🧠 Deep)*

**Quick answer:** No. Batching decides how many renders happen; updaters decide what value you end
up with. Three plain setters and three updaters both produce exactly one re-render.

**Full answer:** These two mechanisms get fused into one vague answer constantly, and separating
them cleanly is a good senior signal. Batching ([§4](README.md#sec-4)) is about React collecting all the setter calls
from one callback invocation and rendering once. Updater functions are about how the queue's
entries are *combined* into a final value. `setCount(count + 1)` three times → value 1, one render.
`setCount(c => c + 1)` three times → value 3, one render. Same render count, different value.

**Q: Do updater functions need to be pure? What does Strict Mode do to them?** *(🧠 Deep · ⚠️ Version)*

**Quick answer:** Yes — React calls them during rendering, and in Strict Mode it calls them twice
in development to expose impurities, discarding one result.

**Full answer:** The docs: "In Strict Mode, React will **call your updater function twice** in
order to help you find accidental impurities. This is development-only behavior and does not affect
production... The result from one of the calls will be ignored." The same applies to lazy
initializer functions. So an updater must compute and return the next state without side effects
and without mutating anything outside itself. The classic violation combines two bugs at once:
`setItems(prev => { prev.push(x); return prev; })` mutates the existing array (so it gets applied
twice under Strict Mode) *and* returns the same reference (so the `Object.is` bail-out from [§1](README.md#sec-1)
skips the render anyway). The correct form is `setItems(prev => [...prev, x])`.

**Q: What are the naming conventions for updater arguments?** *(⭐ Core)*

**Quick answer:** Three acceptable ones: first letters of the state variable (`setEnabled(e => !e)`),
the full name (`setEnabled(enabled => !enabled)`), or a `prev` prefix
(`setEnabled(prevEnabled => !prevEnabled)`).

**Full answer:** React's docs name all three; pick one and be consistent within a codebase. The
first-letters style (`setFriendCount(fc => fc * 2)`) is the most common in React's own examples and
the most compact; the `prev` prefix is the most explicit and tends to win in team codebases where
readability beats brevity.

---

## §4. Batching and `flushSync` — [notes](README.md#sec-4)

**Q: What is batching, and why does React do it?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** Grouping multiple state updates into a single re-render. React waits until all
the code in a callback has run before processing the updates — primarily for performance, and
secondarily to avoid rendering a half-updated UI.

**Full answer:** The docs: "React waits until *all* code in the event handlers has run before
processing your state updates... This behavior, also known as **batching,** makes your React app
run much faster. It also avoids dealing with confusing 'half-finished' renders where only some of
the variables have been updated." So a handler that calls `setCount`, `setName`, and `setIsOpen`
produces one re-render, not three. Lead with the performance framing (that's React's own emphasis)
and mention the consistency benefit second — a render where `count` had updated but `name` hadn't
would be a genuinely confusing intermediate state.

**Q: What changed about batching in React 18?** *(⭐ Core · 🔥 Frequent · ⚠️ Version)*

**Quick answer:** Before 18, React only batched updates originating inside React event handlers.
React 18's *automatic batching* extended it to timeouts, promises, native event handlers — anything.

**Full answer:** Quoting the React 18 release post: "Without automatic batching, we only batched
updates inside React event handlers. Updates inside of promises, setTimeout, native event handlers,
or any other event were not batched in React by default. With automatic batching, these updates
will be batched automatically." So the classic example — two setters inside a `setTimeout` — went
from two renders to one. The caveat worth adding unprompted: automatic batching came with
`createRoot`; an app still mounted with the legacy `ReactDOM.render` kept the old behavior. That's
moot in React 19, where legacy `render` was removed entirely, but it's exactly the question someone
maintaining a half-migrated codebase will ask.

**Q: Does React batch across two separate clicks?** *(🎯 Trap · 🧠 Deep)*

**Quick answer:** No — and deliberately so. Each intentional user interaction is handled
separately.

**Full answer:** The docs: "**React does not batch across *multiple* intentional events like
clicks** — each click is handled separately. Rest assured that React only does batching when it's
generally safe to do. This ensures that, for example, if the first button click disables a form,
the second click would not submit it again." That example is the whole rationale: batching across
distinct interactions would let the app act on a UI state the user never actually saw. So the
batching boundary is a single callback invocation, not a time window.

**Q: How do you opt out of batching, and when would you?** *(🧠 Deep)*

**Quick answer:** `flushSync` from `react-dom`. It forces the updates inside its callback to be
committed to the DOM synchronously. Use it as a last resort — usually to measure or scroll to
something that only exists after the update.

**Full answer:** The docs: "`flushSync` lets you force React to flush any updates inside the
provided callback synchronously. This ensures that the DOM is updated immediately." The realistic
use case is DOM access that can't wait: append an item, then `scrollIntoView` the node that only
exists after the commit. Crucially, pair it with the warning, because reaching for it casually is a
negative signal: "Using `flushSync` is uncommon and can hurt the performance of your app... Use
`flushSync` as last resort," and it "may force pending Suspense boundaries to show their `fallback`
state." Naming the API *and* its cost is the complete answer.

**Q: Is batching a performance optimization or a correctness requirement?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Primarily performance. React's own framing is that it makes the app faster, with
avoiding half-finished renders as a secondary benefit — not that the app would be incorrect without
it.

**Full answer:** Worth being careful here, because it's easy to overclaim in either direction.
React's React 18 post and the queueing docs both frame batching as making the app "run much
faster," plus avoiding "confusing 'half-finished' renders." That second part is a real consistency
benefit, but it's not the same as saying unbatched React would be broken — React 17 was unbatched
outside event handlers and worked fine. So: performance headline, consistency as a genuine
secondary benefit, and don't call it a correctness requirement.

---

## §5. Events, SyntheticEvent, delegation, propagation — [notes](README.md#sec-5)

**Q: What is a SyntheticEvent, and why does React use one?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** It's React's event object — a cross-browser-normalized wrapper that conforms to
the DOM event standard while ironing out browser inconsistencies. React uses it because it
dispatches events itself, via delegation at the root, rather than attaching a listener per element.

**Full answer:** The docs: "Your event handlers will receive a *React event object.* It is also
sometimes known as a 'synthetic event'... It conforms to the same standard as the underlying DOM
events, but fixes some browser inconsistencies." You get the familiar API — `target`,
`currentTarget`, `preventDefault()`, `stopPropagation()`. If you need the raw browser event it's on
`e.nativeEvent`, and the mapping isn't always one-to-one: "in `onMouseLeave`, `e.nativeEvent` will
point to a `mouseout` event. The specific mapping is not part of the public API and may change."
The reason a wrapper exists at all is that React isn't handing you the browser's dispatch — it
attaches listeners at the root container and synthesizes propagation through the React tree, so it
needs an event object whose `currentTarget`/`eventPhase` reflect *your* tree rather than where the
real listener lives.

**Q: Is React's SyntheticEvent still pooled? Do you need `e.persist()`?** *(🎯 Trap · ⚠️ Version · 🧠 Deep)*

**Quick answer:** No, and no. Event pooling was fully removed in React 17. `e.persist()` still
exists but does nothing.

**Full answer:** In React 16 and earlier, event objects were recycled between events as a
performance optimization, so reading `e.target` inside a `setTimeout` or a `.then()` gave you
`null` unless you'd called `e.persist()` first. React 17's release notes: "The old event pooling
optimization has been fully removed, so you can read the event fields whenever you need them."
This is a nice one to know because interviewers who learned React pre-17 still ask it as if pooling
were current — answering with the version delta rather than the old workaround is the signal.

**Q: Where does React actually attach its DOM event listeners?** *(🧠 Deep · ⚠️ Version)*

**Quick answer:** At the root container of your React tree (since React 17); at `document` in React
16 and earlier. Not on individual elements — React uses delegation.

**Full answer:** React does not attach a real DOM listener per element with an `onClick`; it
attaches a small number at the root and dispatches from there. The docs confirm this in passing:
"Under the hood, React attaches event handlers at the root, but this is not reflected in React
event objects." React 17 moved that attachment point: "React will no longer attach event handlers
at the `document` level. Instead, it will attach them to the root DOM container." The motivation
was gradual upgrades — with `document`-level delegation, two React versions on one page fought over
events, and `e.stopPropagation()` inside an inner tree couldn't stop the outer one. The practical
consequence to name: React's synthetic propagation follows the React *component* tree, and a native
`document`-level listener you add yourself only sees the event after React's root has handled it —
which is where mixing `stopPropagation()` with hand-written `addEventListener` calls gets confusing.

**Q: `e.stopPropagation()` vs. `e.preventDefault()`.** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** Unrelated. `stopPropagation` stops parent handlers from firing;
`preventDefault` stops the browser's built-in behavior for that event.

**Full answer:** The docs state them as two unrelated methods: "`e.stopPropagation()`: Stops the
event handlers attached to parent tags from firing" and "`e.preventDefault()`: Prevents the default
browser behavior for events that have it." Have a concrete example of each ready rather than just
definitions. `preventDefault` on a form's `onSubmit` stops the full-page reload — it has nothing to
do with propagation. `stopPropagation` on a modal's inner panel stops a click reaching the backdrop
handler that would close the modal — it has nothing to do with default behavior. Mixing them up is
one of the most common stumbles on an otherwise strong candidate.

**Q: `e.target` vs. `e.currentTarget`?** *(⭐ Core · 🎯 Trap)*

**Quick answer:** `target` is the deepest element the event originated on; `currentTarget` is the
element whose handler is currently running.

**Full answer:** Click a `<span>` inside a `<button>` inside a `<div>`, with handlers on all three:
`e.target` is the `<span>` in all three handlers (it's where the event happened), while
`e.currentTarget` differs per handler (`<span>`, then `<button>`, then `<div>`). The practical use:
`currentTarget` is what you want when reading `e.currentTarget.value` on an input or
`new FormData(e.currentTarget)` on a form, because `target` could be a nested element.

**Q: How does event propagation work in React, and are there exceptions?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Three phases, exactly like the DOM — capture down (`onClickCapture`), target,
bubble up (`onClick`). Two exceptions: `onScroll` doesn't propagate, and `onFocus`/`onBlur` *do*
even though their native counterparts don't.

**Full answer:** The docs: "Event handlers will also catch events from any children your component
might have. We say that an event 'bubbles' or 'propagates' up the tree." Capture-phase handlers are
named with a `Capture` suffix and fire on the way *down*, before any child can call
`stopPropagation()` — which makes them the right tool for things like analytics that must not be
suppressible by a child. The two exceptions are worth memorizing because they're specific enough to
be memorable: "All events propagate in React except `onScroll`, which only works on the JSX tag you
attach it to" (React 17 aligned this with the browser, where element `scroll` doesn't bubble); and
`onFocus`/`onBlur` bubble in React even though native `focus`/`blur` don't, because React implements
them with `focusin`/`focusout`. That second one is genuinely useful — it's how you detect focus
entering or leaving a whole subtree without wiring every field.

**Q: Why must you pass a function to `onClick` rather than call one?** *(⭐ Core · 🎯 Trap)*

**Quick answer:** `onClick={handleClick()}` calls the function immediately during rendering and
passes its return value as the handler. If that call sets state, you've built an infinite render
loop.

**Full answer:** The docs: "In the first example, the function is passed as an event handler. In the
second, the `()` fires the function **immediately during rendering**, without any clicks. This is
because JavaScript inside JSX curly braces executes right away." So the failure isn't just "nothing
happens on click" — a handler that sets state turns into render → setter → schedule render →
setter, which React eventually errors on as too many re-renders. To pass arguments, wrap:
`onClick={() => handleDelete(item.id)}`.

**Q: Are inline arrow functions in `onClick` a performance problem?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Almost never. Creating a small closure per render is cheap. It matters only when
a `memo`-wrapped child receives it as a prop and the new identity defeats the memoization.

**Full answer:** This is a question where both extreme answers are wrong. "Never use inline arrows"
is cargo-cult — it's the idiomatic pattern in React's own docs, and allocating a closure per row per
render is negligible next to the render itself. "It never matters" is also wrong: if the child is
wrapped in `memo`, or the function goes into a `useEffect` dependency array, a fresh identity every
render defeats the optimization (ch.06 covers `useCallback` and when it's actually warranted). The
answer that lands is: *"It's a non-issue unless it's crossing a `memo` boundary or a dependency
array — and then the fix is `useCallback`, applied deliberately, not by default."*

---

## §6. Immutability — [notes](README.md#sec-6)

**Q: Why does React require immutable state updates?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** React compares the new value to the old with `Object.is`. A mutated object is
reference-identical to the old one, so React bails out and never re-renders.

**Full answer:** Start with the mechanism — the `Object.is` bail-out from [§1](README.md#sec-1) — because that's the
actual reason, not a style rule. Then add the two things that elevate the answer. First, mutation is
*worse* than a clean failure, because it often half-works: React's docs say "mutating state can work
in some cases," which in practice means some *other* state update re-renders the component moments
later and picks up the already-mutated object. The bug shows up as "my UI is one click behind" or
"it works, but only when I also type in the search box" — far harder to diagnose than nothing
happening. Second, name the downstream blast radius: `memo`, `useMemo`, `useCallback`, and
`useEffect` dependency arrays (ch.03/06) are all reference comparisons too, so mutation silently
defeats the entire memoization system, not just this one re-render.

**Q: Is it ever OK to mutate an object in a React component?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Yes — "local mutation." Mutating an object you just created, that nothing else
references yet, is fine, even during render.

**Full answer:** The docs: "Mutation is only a problem when you change *existing* objects that are
already in state. Mutating an object you've just created is okay because *no other code references
it yet*... This is called a 'local mutation'. You can even do local mutation while rendering." So
`const next = {}; next.x = e.clientX; next.y = e.clientY; setPosition(next);` is perfectly correct.
The rule is about values already in state (or props, or anything else outside the current
function), not about the `=` operator. Knowing this distinction stops the over-corrected answer
that "you can never mutate anything in React."

**Q: Which array methods are safe to use on state, and which aren't?** *(⭐ Core · 🎯 Trap)*

**Quick answer:** Avoid `push`/`unshift`/`pop`/`shift`/`splice`/`sort`/`reverse` and index
assignment; prefer `concat`/spread for adding, `filter`/`slice` for removing, `map` for replacing,
and copy before sorting.

**Full answer:** React's own table maps it exactly: **adding** — avoid `push`/`unshift`, use
`concat` or `[...arr]`; **removing** — avoid `pop`/`shift`/`splice`, use `filter`/`slice`;
**replacing** — avoid `splice` and `arr[i] = ...`, use `map`; **sorting** — avoid `reverse`/`sort`,
copy the array first. Two specific traps live in that table. `slice` vs. `splice` — the docs flag
it: "`slice` lets you copy an array or a part of it. `splice` **mutates** the array." One letter
apart, opposite safety. And `sort`/`reverse` mutate in place *and* return the same reference, so
`setTodos(todos.sort(...))` both corrupts state and hits the `Object.is` bail-out — the update
appears to do nothing while having already damaged the data. Modern JS also offers non-mutating
`toSorted`/`toReversed`/`with`/`toSpliced`, but `[...arr].sort()` is the maximally compatible form.

**Q: You copied the array with spread and it still mutated state. What happened?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Copying is shallow. `[...list]` is a new array containing the *same* item objects,
so `nextList[0].seen = true` mutates the object that's still in state.

**Full answer:** The docs: "Even if you copy an array, you can't mutate existing items *inside* of
it directly. This is because copying is shallow — the new array will contain the same items as the
original one." Same for objects: `{ ...person }` is a new top-level object whose `person.artwork`
property points at the identical nested object. The rule is that you must create a new object at
**every level you're changing** — `setPerson({ ...person, artwork: { ...person.artwork, city } })`
— and can safely share every level you're not. For lists, that means `map` with a spread on the one
item you're touching, so exactly one new object gets created and every other item keeps its identity
(which is what keeps `memo`'d rows from re-rendering).

**Q: What is Immer, and when would you reach for it?** *(🧠 Deep)*

**Quick answer:** A library that lets you write mutating-looking code against a Proxy "draft" and
produces the immutable copies for you. Reach for it when nested spreads become unreadable — but
consider flattening the state first.

**Full answer:** The docs call it "a popular library that lets you write using the convenient but
mutating syntax and takes care of producing the copies for you." With `useImmer`, you write
`updatePerson(draft => { draft.artwork.city = 'Paris' })` and Immer records the changes against a
Proxy and produces a new object. Worth knowing by name — but note that React's docs offer flattening
the state structure as the *first* suggestion, with Immer as the alternative if you don't want to
restructure. Saying "I'd look at whether the state is more nested than it needs to be before adding
a library to make deep updates tolerable" is the stronger answer.

---

## §7. Controlled vs. uncontrolled inputs — [notes](README.md#sec-7)

**Q: What's the difference between a controlled and an uncontrolled input?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** Who owns the value. Controlled: React state owns it, passed via `value` with an
`onChange` that updates that state. Uncontrolled: the DOM node owns it; React only seeds it with
`defaultValue`, and you read it on demand via a ref or `FormData`.

**Full answer:** Define it by ownership rather than by which props are used — that's what
generalizes. In a controlled input, every keystroke fires `onChange` → sets state → re-renders →
passes the new `value` down, so the character the user sees is the one that came back from state;
the DOM node never decides anything. In an uncontrolled input, the DOM keeps the value and React
supplies only a starting point, so you read it at submit time. The element-specific details are a
common quick check: text inputs and `<textarea>` use `value`/`defaultValue`; checkboxes and radios
use `checked`/`defaultChecked` ("Checkboxes need `checked` (or `defaultChecked`), not `value`");
`<select>` takes `value` on the `<select>` itself rather than `selected` on an `<option>`; and file
inputs are *always* uncontrolled.

**Q: What happens if you pass `value` without `onChange`?** *(🎯 Trap · 🔥 Frequent)*

**Quick answer:** The input becomes impossible to type into — React forces it back to the value you
passed after every keystroke.

**Full answer:** The docs: "If you pass `value` without `onChange`, it will be impossible to type
into the input. When you control an input by passing some `value` to it, you *force* it to always
have the value you passed. So if you pass a state variable as a `value` but forget to update that
state variable synchronously during the `onChange` event handler, React will revert the input after
every keystroke back to the `value` that you specified." So a "frozen input" bug is almost always
one of two things: no `onChange` at all, or an `onChange` that updates some *other* state than the
one feeding `value`. (If you deliberately want a read-only display, use `readOnly` rather than
omitting `onChange`.)

**Q: You're seeing "A component is changing an uncontrolled input to be controlled." What's wrong?** *(🎯 Trap · 🔥 Frequent)*

**Quick answer:** The state started as `undefined` (or `null`), so `value={undefined}` made the
input uncontrolled on the first render; the first keystroke set a string and made it controlled.

**Full answer:** The docs are explicit that "an input cannot switch between being controlled or
uncontrolled over its lifetime," and this warning is React telling you it happened. The two common
causes are `useState()` with no argument, and seeding from data that hasn't arrived yet —
`useState(user?.name)`, which is `undefined` until the fetch resolves. Both fixes are one
character-class change: `useState('')`, or `useState(user?.name ?? '')`. The general rule is that a
controlled input's state must be a string (or boolean for checkboxes) from the very first render,
never nullish.

**Q: React's `onChange` — how does it differ from the DOM's `change` event?** *(🧠 Deep)*

**Quick answer:** React's `onChange` fires on every keystroke; the browser's native `change` on a
text input fires only on blur. React's `onChange` is really the native `input` event.

**Full answer:** The docs: "Fires immediately when the input's value is changed by the user (for
example, it fires on every keystroke). Behaves like the browser `input` event." This isn't trivia
for its own sake — it's *why* controlled inputs work keystroke by keystroke at all. If React's
`onChange` had the native `change` semantics, a controlled input would only sync its state on blur,
and everything typed in between would be reverted. It's a small detail that reliably reads as
depth when it comes up.

**Q: Which do you default to, controlled or uncontrolled?** *(🧠 Deep · 🔥 Frequent)*

**Quick answer:** Controlled, because it keeps UI-as-a-function-of-state and makes
validation/formatting/cross-field logic trivial. Uncontrolled for submit-only forms, file inputs,
third-party widgets, and per-keystroke re-renders that actually profile badly.

**Full answer:** Give the trade-off, not a preference. Controlled wins whenever the value needs to
*drive* something as it changes — live validation, formatting as you type, disabling a submit
button, two fields that must stay in sync. Uncontrolled wins when you genuinely only need values at
submit time: less code, no re-render per keystroke, and it's mandatory for `<input type="file">` and
for wrapping non-React widgets that insist on owning their own DOM. Then add currency: **React 19's
form Actions** (`<form action={fn}>`) plus `useActionState` made the uncontrolled + `FormData` path
substantially more attractive than it was in the React 16 era — React even resets uncontrolled
forms automatically after a successful Action. "Always controlled" is no longer the settled answer,
and knowing that is a differentiator (ch.07/ch.09 cover Actions properly).

---

## §8. Structuring state: derived state and duplication — [notes](README.md#sec-8)

**Q: What's wrong with derived state?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** It's a second source of truth for something that already has one, so it can go out
of sync — and keeping it in sync means remembering to update it in every handler that touches its
inputs. Compute it during render instead.

**Full answer:** React's docs put the rule directly: "If you can calculate some information from the
component's props or its existing state variables during rendering, you **should not** put that
information into that component's state." The canonical example is `fullName` stored alongside
`firstName`/`lastName` — with three state variables, every name handler has to remember to update
two of them, forever, and any handler that forgets creates a stale display. With `const fullName =
firstName + ' ' + lastName`, there is nothing to keep in sync. Same for filtered lists, totals,
counts, and validity flags. The follow-up is always "but isn't recomputing every render slow?" —
usually no (filtering a few hundred items is nothing next to the render itself), and if profiling
says otherwise the answer is `useMemo` (ch.06), which caches the computation *without* turning it
into a second source of truth. Storing it in state is the one option that's both harder to maintain
and correctness-hazardous.

**Q: Why shouldn't you initialize state from a prop?** *(⭐ Core · 🎯 Trap · 🔥 Frequent)*

**Quick answer:** Because the initial value is ignored after the first render, so the state freezes
at the prop's first value and never updates when the parent passes a new one.

**Full answer:** The docs: "The problem is that if the parent component passes a different value of
`messageColor` later (for example, `'red'` instead of `'blue'`), the `color` *state variable* would
not be updated! The state is only initialized during the first render... Instead, use the
`messageColor` prop directly." This is [§1](README.md#sec-1)'s "ignored after the initial render" rule biting in the
most common way. There is one legitimate use — deliberately capturing only the first value — and
the docs give it a naming convention: prefix the prop `initial` or `default` (`initialColor`,
`defaultValue`) to signal that later updates are intentionally ignored. That's exactly what
`defaultValue` on an `<input>` means. And if you genuinely need the component to *reset* when a prop
changes, the idiomatic tool is `key` ([§9](README.md#sec-9)), not mirroring plus an Effect to re-sync — which is the
pattern people reach for and which React's docs steer away from.

**Q: What are React's principles for structuring state?** *(🧠 Deep)*

**Quick answer:** Five: group related state, avoid contradictions, avoid redundant state, avoid
duplication, avoid deeply nested state.

**Full answer:** Quoting the docs' five: (1) "If you always update two or more state variables at
the same time, consider merging them into a single state variable." (2) "When the state is
structured in a way that several pieces of state may contradict and 'disagree' with each other, you
leave room for mistakes." (3) "If you can calculate some information from the component's props or
its existing state variables during rendering, you should not put that information into that
component's state." (4) "When the same data is duplicated between multiple state variables, or
within nested objects, it is difficult to keep them in sync." (5) "Deeply hierarchical state is not
very convenient to update. When possible, prefer to structure state in a flat way." Don't just
recite them — have a concrete example for #2 and #4 ready, since those are the ones interviewers
probe.

**Q: Give an example of "avoiding contradictions in state."** *(🧠 Deep · 🔥 Frequent)*

**Quick answer:** Replace multiple booleans with one status union. Two booleans give four
combinations when only three are legal; a `'typing' | 'sending' | 'sent'` union makes the illegal
one unrepresentable.

**Full answer:** `const [isSending, setIsSending] = useState(false)` plus
`const [isSent, setIsSent] = useState(false)` allows `isSending && isSent`, which is nonsense, and
nothing in the code prevents it — you're one forgotten `setIsSending(false)` away from a stuck UI.
One `status` variable with three legal values makes that state impossible by construction, and you
derive the booleans you need (`const isSending = status === 'sending'`). This is "make illegal
states unrepresentable," it pays off enormously in TypeScript (ch.14) where the union makes the
compiler enforce it, and it's the natural bridge to `useReducer` (ch.05), which exists for exactly
the case where the transitions between those states get complex enough to want written down in one
place. Bringing that connection up unprompted moves the answer from React trivia to design judgment.

**Q: Give an example of "avoiding duplication in state."** *(🧠 Deep)*

**Quick answer:** Store an ID, not a copy of the object. `selectedId` plus a lookup, rather than
`selectedItem` holding a duplicate that goes stale when the original is edited.

**Full answer:** `const [selectedItem, setSelectedItem] = useState(items[0])` stores a *copy* of a
reference into a second place. Edit that item in `items` and the selection still points at the old
object — the detail pane shows stale data while the list shows the new value, and the two are now
permanently capable of disagreeing. Storing `const [selectedId, setSelectedId] = useState(items[0].id)`
and deriving `const selectedItem = items.find(i => i.id === selectedId)` during render removes the
possibility entirely. Same idea as derived state, applied to identity instead of computation.

---

## §9. Lifting state up — [notes](README.md#sec-9)

**Q: What does "lifting state up" mean, and what are the steps?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** Moving state that two components need out of both of them and into their closest
common parent, then passing it down as props along with the handlers that change it.

**Full answer:** The docs: "Sometimes, you want the state of two components to always change
together. To do it, remove state from both of them, move it to their closest common parent, and then
pass it down to them via props." Three steps, in order: (1) remove state from the children; (2) pass
*hardcoded* data down from the common parent; (3) add state to the parent and pass it down together
with the event handlers. Step 2 feels pointless and is worth doing anyway — it proves the wiring
works before any moving parts are involved, so a failure at that point is unambiguously a props
problem. The resulting shape is the core React composition pattern: data flows down as props, events
flow up as callbacks.

**Q: What does "single source of truth" actually mean in React?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** That each piece of state has exactly one owning component — not that all state
lives in one global store.

**Full answer:** The docs are careful about this and it's worth quoting: "For each unique piece of
state, you will choose the component that 'owns' it... It doesn't mean that all state lives in one
place — but that for *each* piece of state, there is a *specific* component that holds that piece of
information." The misreading — "single source of truth means one global store" — is exactly how
teams end up putting form field values in Redux. Naming that misreading explicitly is a good signal,
because it shows you've thought about the principle rather than repeating the phrase.

**Q: Can a whole component be "controlled" or "uncontrolled," or does that only apply to inputs?** *(🧠 Deep)*

**Quick answer:** It applies to any component. A component with local state is uncontrolled; one
whose important information comes from props is controlled by its parent.

**Full answer:** The docs generalize the terms directly: "It is common to call a component with some
local state 'uncontrolled'... you might say a component is 'controlled' when the important
information in it is driven by props rather than its own local state. This lets the parent component
fully specify its behavior." Uncontrolled components are easier to drop in; controlled ones are more
flexible to coordinate. The design insight worth adding: this is exactly why real component
libraries accept *both* `value` and `defaultValue` — they're deliberately supporting either mode, and
recognizing that a library's API is offering this choice on purpose is a strong signal (ch.08 treats
it as a design pattern).

**Q: What determines whether a component keeps its state across a re-render?** *(🧠 Deep · 🎯 Trap · 🔥 Frequent)*

**Quick answer:** Its position in the render tree, plus its type and `key`. Same component type at
the same position → state preserved. Different type at that position, or a changed `key` → state
destroyed and the component remounts.

**Full answer:** The docs: "React associates each piece of state it's holding with the correct
component by where that component sits in the render tree... React preserves a component's state for
as long as it's being rendered at its position in the UI tree. If it gets removed, or a different
component gets rendered at the same position, React discards its state." Two rules follow, and both
surprise people in opposite directions. `{isFancy ? <Counter isFancy /> : <Counter />}` **preserves**
the count across the toggle — same type, same position — even though the JSX branches look like two
different elements. And `{isPaused ? <p>Paused</p> : <Counter />}` **destroys** it, because a
different component type now occupies that position. This is the explanation for a whole class of
"why did my state survive / why did it vanish" bugs.

**Q: How do you reset a child component's state when a prop changes?** *(⭐ Core · 🎯 Trap · 🔥 Frequent)*

**Quick answer:** Give it a `key` tied to that prop. When the key changes, React discards the old
instance and mounts a fresh one, so its local state starts over.

**Full answer:** `<Chat key={selectedContact.id} contact={selectedContact} />` — switching contacts
changes the key, so React unmounts the old `Chat` and mounts a new one, discarding the half-typed
draft in its local state instead of leaking it into the next conversation. The docs' framing: "keys
let you tell React that this is not just a first counter, or a second counter, but a specific
counter." This is the *right* answer to a question people usually answer with the anti-pattern —
mirroring the prop into state plus a `useEffect` to clear it when the prop changes. Naming `key` as
the idiomatic solution, and the mirror-plus-Effect approach as the thing to avoid, is the whole
point of the question. It's also the same mechanism as list keys from ch.01, applied deliberately
rather than to a list.

**Q: How do you decide between local state, lifted state, Context, and a state library?** *(🧠 Deep · 🔥 Frequent)*

**Quick answer:** A ladder, climbed only as far as needed: local `useState` by default → lift to the
nearest common ancestor of the components that need it → Context for genuinely tree-wide values →
a store for cross-cutting state with real complexity or server sync.

**Full answer:** The question is testing whether you have a default and escalate deliberately, or
reach for the biggest tool first. Give the ladder and name the *cost* of each step up, which is what
makes it a real answer: lifting adds re-renders below the new owner and prop drilling through
components that don't care; Context re-renders every consumer when the value changes (ch.05); a
store adds indirection and boilerplate, and for server data you probably want a server-state library
instead of a client store anyway (ch.11/13). The mistakes are symmetrical in both directions —
keeping state too low forces duplication and manual syncing, hoisting everything to the top couples
unrelated parts of the app and re-renders things that don't care. A good closing line:
*"State should live at the lowest common ancestor of the components that need it — no lower, because
then it needs syncing, and no higher, because then it re-renders things that don't care."*

---

## Coding & Scenario Questions

The same underlying mechanisms above, presented the way an interviewer actually tends to ask them —
as a snippet plus "what happens" or "find the bug," not "explain the concept." Try to answer before
reading the explanation.

**1. What is `count` after one click, and how many times does the component function run?**
```jsx
function handleClick() {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}
// count is 0 before the click
```
*([§2](README.md#sec-2)/[§3](README.md#sec-3)/[§4](README.md#sec-4), ⭐ Core · 🔥 Frequent · 🎯 Trap)* `count` becomes **1**, and the component runs **once**
more. All three calls close over the same snapshot (`count === 0`), so all three are literally
`setCount(1)` — three "replace with 1" entries. And because they're in one callback invocation,
React batches them into a single re-render. The two halves are independent: `setCount(c => c + 1)`
three times would give **3** and still cause **one** render. If you can state both the value *and*
the render count, and note that they're governed by different mechanisms, you've answered the
follow-up before it was asked.

**2. What does this alert show?**
```jsx
function handleClick() {
  setCount(count + 1);
  setTimeout(() => alert(count), 3000);
}
// count is 0; the user clicks, then clicks 3 more times before the alert fires
```
*([§2](README.md#sec-2), 🧠 Deep · 🎯 Trap)* It alerts **0**. The `setTimeout` callback is a closure created during the
render where `count` was `0`, and that binding never changes — it isn't a live reference to React's
stored state. This is plain JavaScript closure behavior, made vivid by the fact that React creates
fresh closures on every render. If you need the current value inside a delayed callback, use an
updater (`setCount(c => ...)`) to *write*, or a ref (ch.04) to *read*.

**3. What's the final value?**
```jsx
setNumber(number + 5);
setNumber(n => n + 1);
setNumber(42);
// number is 0
```
*([§3](README.md#sec-3), 🧠 Deep · 🎯 Trap)* **42.** Walk the queue: `setNumber(number + 5)` evaluated `0 + 5` right
away and queued "replace with 5"; the updater queued "add 1 to the running result" → 6; then
`setNumber(42)` queued "replace with 42," which discards everything before it. Drop the last line
and the answer is **6**, not 5 — that's the version of this question that catches people who read
`setNumber(number + 5)` as "add 5" rather than "replace with 5."

**4. Why does nothing happen on screen?**
```jsx
function haveBirthday() {
  user.age = user.age + 1;
  setUser(user);
}
```
*([§1](README.md#sec-1)/[§6](README.md#sec-6), ⭐ Core · 🔥 Frequent · 🎯 Trap)* `setUser` received the *same object reference* it already
held, so `Object.is(next, current)` is `true` and React bails out of re-rendering. Fix:
`setUser({ ...user, age: user.age + 1 })`. The nastier detail worth volunteering: the age *was*
mutated, so the next time anything else re-renders this component, the new age appears — which makes
this present as "my UI is one action behind" rather than "my UI doesn't update," and that's a much
harder bug to trace.

**5. Find the bug.**
```jsx
const nextTodos = [...todos];
nextTodos[0].done = true;
setTodos(nextTodos);
```
*([§6](README.md#sec-6), 🧠 Deep · 🎯 Trap)* The array copy is real, so React *will* re-render — but `nextTodos[0]` and
`todos[0]` are the same object, so state was mutated on the way. In practice this often "works,"
which is exactly what makes it dangerous: any `memo`'d row comparing `prevProps.todo ===
nextProps.todo` sees no change and skips its update, so the checkbox visibly fails to move while the
data underneath has already changed. Fix with `map`:
`setTodos(todos.map((t, i) => (i === 0 ? { ...t, done: true } : t)))` — exactly one new object, every
other item keeps its identity.

**6. Find the bug.**
```jsx
function Toggle() {
  const [on, setOn] = useState();
  return <input type="checkbox" checked={on} onChange={e => setOn(e.target.checked)} />;
}
```
*([§7](README.md#sec-7), 🔥 Frequent · 🎯 Trap)* `useState()` with no argument makes `on` `undefined` on the first
render, so `checked={undefined}` renders an **uncontrolled** checkbox. The first click sets a
boolean, making it controlled — and React logs "A component is changing an uncontrolled input to be
controlled." Fix: `useState(false)`. The general rule: a controlled input's backing state must be a
string (or boolean, for checkboxes) from the very first render, never nullish — which also catches
the async variant, `useState(user?.name)` before the fetch resolves.

**7. The user clicks the span. What order do the logs appear in, and what does `stopPropagation` change?**
```jsx
<div onClick={() => log('outer')} onClickCapture={() => log('capture')}>
  <button onClick={e => { e.stopPropagation(); log('button'); }}>
    <span onClick={() => log('span')}>click</span>
  </button>
</div>
```
*([§5](README.md#sec-5), 🧠 Deep · 🎯 Trap)* Order: **capture → span → button**, and `'outer'` never logs. The capture
handler fires on the way *down*, before anything can stop it — which is exactly why capture-phase
handlers are the right tool for things a child mustn't be able to suppress, like analytics. Then the
bubble phase runs innermost-first: `span`, then `button`, where `stopPropagation()` halts it before
reaching the div's `onClick`. Worth adding: `e.target` is the `<span>` in all three handlers, while
`e.currentTarget` differs in each.

**8. What actually happens when this renders?**
```jsx
<button onClick={handleDelete(item.id)}>Delete</button>
```
*([§5](README.md#sec-5), ⭐ Core · 🎯 Trap)* `handleDelete(item.id)` is called **during rendering**, and its return
value (probably `undefined`) is passed as the handler — so clicking does nothing, and the delete
already fired on render. If `handleDelete` sets state, this is an infinite loop: render → setter →
schedule render → setter, until React throws "Too many re-renders." Fix:
`onClick={() => handleDelete(item.id)}`. And no, the inline arrow is not a performance problem here
— it only matters if it's crossing a `memo` boundary or a dependency array.

**9. Why does the second `<Counter />` keep its count, and the fourth lose it?**
```jsx
{isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}   // A
{isPaused ? <p>Paused</p> : <Counter />}                                // B
```
*([§9](README.md#sec-9), 🧠 Deep · 🎯 Trap)* In **A**, both branches render the *same component type at the same
position* in the render tree, so React preserves the state — toggling `isFancy` does not reset the
count, which surprises almost everyone because the JSX looks like two distinct elements. In **B**, a
different type (`<p>`) occupies that position while paused, so React discards `Counter`'s state and
remounts it from zero when it comes back. State is tied to a position in the tree, not to the JSX
you wrote. To force a reset in case A, give the two branches different `key`s.

**10. A chat app leaks the previous contact's half-typed draft into the next conversation. `Chat` holds the draft in local `useState`. Fix it.**
*([§8](README.md#sec-8)/[§9](README.md#sec-9), ⭐ Core · 🔥 Frequent)* `<Chat key={selectedContact.id} contact={selectedContact} />`.
Switching contacts changes the key, so React unmounts the old `Chat` instance and mounts a fresh
one, discarding its local state. The answer to *avoid* is mirroring the contact into state and
adding a `useEffect` to clear the draft when it changes — that's the "don't mirror props in state"
anti-pattern plus an Effect papering over it, and React's own docs steer away from it. Same
mechanism as list keys from ch.01, applied deliberately to force a remount.

**11. How many renders does each of these cause, in React 17 vs. React 18+?**
```jsx
// inside a React onClick handler:
setCount(c => c + 1); setFlag(f => !f);

// inside setTimeout(() => { ... }, 1000):
setCount(c => c + 1); setFlag(f => !f);
```
*([§4](README.md#sec-4), ⚠️ Version · 🔥 Frequent)* The event-handler pair is **one render in both versions** — React
always batched inside its own event handlers. The `setTimeout` pair is **two renders in React 17**
and **one in React 18+**, which is exactly what automatic batching changed: "updates inside of
timeouts, promises, native event handlers or any other event are batched." Two details worth adding:
it came with `createRoot` (an app still on legacy `ReactDOM.render` kept the old behavior, which is
moot in React 19 where legacy `render` was removed), and React still doesn't batch across two
separate clicks, deliberately.

**12. What's wrong here, and what does Strict Mode do to it?**
```jsx
setItems(prev => {
  prev.push(newItem);
  return prev;
});
```
*([§3](README.md#sec-3)/[§6](README.md#sec-6), 🧠 Deep · 🎯 Trap)* Two bugs stacked. The updater is **impure** — it mutates the existing
array — and Strict Mode calls updater functions twice in development specifically to surface that,
so `newItem` gets pushed twice. It also **returns the same reference**, so the `Object.is` bail-out
means React may not re-render at all — leaving a doubly-mutated array that only becomes visible
later. Fix: `setItems(prev => [...prev, newItem])`. Being able to name *both* failure modes from one
three-line snippet is the signal here.
