# Chapter 03: Interview Questions & Answers

**Part of:** [Chapter 03: Side Effects & Lifecycle](README.md)

Every question an interviewer could reasonably ask from this chapter's topics, each with a full
answer written to stand on its own as a complete, interview-accepted response, not just a keyword.
Read the linked section in [`README.md`](README.md) first if an answer here doesn't fully click.
This file is for drilling recall and delivery, not first-time learning.

## How to use this file

Each question is tagged, then answered in two layers. The **Quick answer** is a 15-20 second
version you could say out loud as your *first* response. The **Full answer** is the depth layer
behind it, for follow-ups. Lead with the quick answer and let the interviewer's follow-up (or your
own judgment) pull the rest out of you.

Tags:
- ⭐ **Core** — never hesitate on these; baseline expectations for 5-10 YOE.
- 🔥 **Frequent** — comes up often, in some form, across real interview loops.
- 🧠 **Deep** — separates "read about React" from "understands React"; usually a follow-up.
- 🎯 **Trap** — a common wrong or incomplete answer exists; naming *why* it's wrong is the signal.
- ⚠️ **Version** — a React 17/18/19.2/19.3-specific detail; know the delta explicitly.

A [**Coding & Scenario Questions**](#coding--scenario-questions) section at the end turns the same
concepts into "what does this log / find the bug" prompts, which is closer to how interviewers
actually probe this material.

> **This chapter's one-sentence spine:** *an Effect synchronizes a component with an external
> system: setup starts it, cleanup stops it, and React re-runs cleanup-then-setup whenever a
> reactive value the Effect reads has changed, so the dependencies are determined by the code, not
> chosen.*

---

## §0. What a side effect is, and where code can live — [notes](README.md#sec-0)

**Q: What's the difference between an event handler and an Effect?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** The cause. Event handlers run because of a specific user interaction. Effects run
because the component is on screen and must stay in sync with something outside React.

**Full answer:** The common wrong answer is about timing ("Effects run after render"). That's true
but it isn't what distinguishes them. React's docs define Effects as side effects "caused by
rendering itself, rather than by a particular event." Sending a chat message happens because the
user clicked Send, so it goes in a handler. Staying connected to the chat room happens because the
room is displayed, and no event caused it, so it's an Effect. The docs' decision rule is worth
quoting: "ask yourself *why* this code needs to run. Use Effects only for code that should run
*because* the component was displayed to the user." Rendering code, the third place, must stay
pure: compute JSX from props and state and do nothing else. For precision, "displayed" is the docs'
teaching phrase. More exactly, an Effect keeps an external system in sync with the component's
*committed* props and state, and stays set up only while its Effects are active. Those can differ:
a component inside a hidden `<Activity>` keeps its state but has its Effects unmounted.

**Q: What counts as a "side effect," and why can't it go in the render body?** *(⭐ Core)*

**Quick answer:** Anything besides computing the return value, like network requests, timers,
subscriptions, or DOM and `localStorage` writes. Render must be pure because React may call your
component many times, discard results, or double-call it in Strict Mode.

**Full answer:** Rendering is React asking your function "what should this look like?" React may
call your component many times, call it and throw the result away, or (in Strict Mode) call it
twice on purpose. A side effect in the body would run again every one of those times, including for
a render whose result is thrown away. So side effects go either in event
handlers (caused by an interaction) or in Effects (which run after a commit, so they only happen
for UI that actually reached the screen).

**Q: What is an "external system"?** *(🧠 Deep)*

**Quick answer:** Anything whose state React doesn't manage: the network, browser APIs, timers,
DOM nodes you drive imperatively, third-party widgets, `document.title`, `localStorage`.

**Full answer:** The phrase matters because it's the test for whether you need an Effect at all.
If the Effect only reads props and state and sets other state, no external system is involved, and
it's almost always one of the [§8](README.md#sec-8) anti-patterns (derived state, a reset, event
logic). If there *is* an external system, ask whether you're keeping something connected (an Effect)
or reading a value that changes on its own (`useSyncExternalStore`).

**Q: When is the DOM an "external system" that needs an Effect?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Only when you need an imperative browser API that JSX can't express, like
`play()`/`pause()`, `focus()`, `scrollIntoView()` or `showModal()`. Anything expressible as JSX,
props or state should just be rendered.

**Full answer:** Most of the DOM *is* controlled by React. Class names, text, and whether an element
exists are all JSX, and reaching for an Effect there is an anti-pattern. The docs' canonical case is
a `VideoPlayer` with an `isPlaying` prop. `<video>` has no `playing` prop, so the Effect reads a ref
and calls `ref.current.play()` or `.pause()`, with `[isPlaying]` as the dependency. `isPlaying` is
React state, playback is the external system, and the Effect keeps the second in step with the first.

---

## §1. `useEffect` anatomy — [notes](README.md#sec-1)

**Q: Explain the three forms of the dependency array.** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** No array runs after every commit. `[]` runs after the initial commit of each
mount. `[a, b]` runs after that and after any commit where `a` or `b` changed by `Object.is`.

**Full answer:** From the reference: "If you omit this argument, your Effect will re-run after every
commit of the component," and "React will compare each dependency with its previous value using the
`Object.is` comparison." Two details lift the answer. First, `Object.is` means objects, arrays and
functions are compared by identity, so one created during render is "changed" every render. Second,
"`[]` runs once" is wrong twice over. It's once *per mount*, and components remount (conditional
rendering, a `key` change, `<Activity>` being shown again), and in development Strict Mode adds one
extra setup+cleanup cycle on mount. `[]` means "no reactive dependencies," not "once, ever." Code
that must run once per page load belongs at module level. For a senior answer, add that you
don't choose the array: it has to list every reactive value the Effect reads, and the lint rule
enforces it.

**Q: When is an Effect with no dependency array appropriate?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Rarely. It re-syncs after every commit, so it needs an external system that
genuinely has to be re-synced after every commit. "I want this to run after every render" isn't
that reason.

**Full answer:** No array is valid, but it's the Effect form most likely to be lifecycle thinking in
disguise (a `componentDidUpdate` substitute). Ask which external system needs re-synchronizing after
*every* commit, and why. If there's no good answer, the code is usually derived state (compute it
during render) or event logic (put it in the handler). And if it sets state unconditionally, it's the
infinite-loop trap below.

**Q: When exactly does `useEffect` run relative to rendering and painting?** *(🧠 Deep · ⚠️ Version)*

**Quick answer:** After React commits the DOM changes, and usually after the browser paints. But
for Effects caused by a discrete interaction like a click, React may run them before paint.

**Full answer:** The docs: "Effects run at the end of a commit after the screen updates." The order
is render, commit, paint, then Effects. That keeps the UI responsive, since connecting or logging
shouldn't delay what the user sees. The reference has two caveats. "If your Effect was caused by an
interaction (like a click), React may run your Effect before the browser paints the updated
screen," and even then, "React may allow the browser to repaint the screen before processing the
state updates inside your Effect." The first came in **React 18** as "Consistent useEffect timing":
React now synchronously flushes Effects for discrete input events. So "after paint" is the usual
case, not a guarantee. A state update inside a `useLayoutEffect` is another way it can run early,
since React then "will execute all remaining Effects immediately including `useEffect`." If
correctness depends on running before paint, use `useLayoutEffect`.

**Q: What happens when you call `setState` in an Effect with no dependency array?** *(🎯 Trap)*

**Quick answer:** An infinite loop. The Effect runs after every commit, the state update causes a
render and commit, and that runs the Effect again, until React throws "Maximum update depth
exceeded."

**Full answer:** Same thing with a dependency array if the Effect sets a value that's also a
dependency and always differs, like a freshly created object. The better question is why state is
being set in an Effect at all. Usually it's derived data that should be computed during render.

**Q: Why can't the setup function be `async`?** *(🔥 Frequent · 🎯 Trap)*

**Quick answer:** Setup must return nothing or a cleanup function. An `async` function always
returns a Promise. Define an async function inside the Effect and call it.

**Full answer:** In development React warns: "useEffect must not return anything besides a function,
which is used for clean-up." When it later tries to run the "cleanup," it calls the Promise as a
function, which throws `TypeError: destroy is not a function` (confirmed in React 19.2.8). With
TypeScript, `@types/react` types setup as `() => void | Destructor`, so it's a compile error first,
and the hooks lint rule flags it too ("Effect callbacks are synchronous to prevent race
conditions").
The correct shape is `useEffect(() => { let ignore = false; async function load() { … } load();
return () => { ignore = true; }; }, [id]);`. That also leaves room for the cleanup you need anyway
for race conditions.

---

## §2. Synchronization, not lifecycle, and execution order — [notes](README.md#sec-2)

**Q: Is `useEffect(fn, [])` the same as `componentDidMount`?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** Similar in effect, different in model. It runs after the first commit, but React
wants you to think of an Effect as a start/stop synchronization, not a lifecycle event. It also
usually runs after paint, and Strict Mode runs it twice in dev.

**Full answer:** React's docs: "Effects have a different lifecycle from components. Components may
mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and
later to stop synchronizing it." Lifecycle thinking makes you write separate mount/update/unmount
logic and then forget the update case. That's where missing-dependency bugs come from.
Synchronization thinking means you write one start and one stop, and React calls stop-then-start
whenever the inputs change. On timing, the `Component` reference says `useEffect` is equivalent to
the three class methods together for many use cases, "in the rare cases where it's important for
the code to run before browser paint, `useLayoutEffect` is a closer match."

**Q: What does "each render has its own Effect" mean?** *(🧠 Deep)*

**Quick answer:** Every render creates a new Effect function that closes over that render's props
and state. On a change, React runs the *old* render's cleanup, which sees the old values, then the
new render's setup.

**Full answer:** It's ch.02's snapshot rule applied to Effects. With `roomId` going from `general` to
`travel`, the cleanup logs "disconnected from general" because it was created by the `general`
render. That's exactly right, since you disconnect from the room you connected to. It's also why
[§4](README.md#sec-4)'s stale closures happen: if React never runs the new render's Effect because
the dependencies claim nothing changed, the old closure keeps running.

**Q: In what order do parent and child Effects run?** *(🧠 Deep)*

**Quick answer:** Separate the guarantee from the observation. Documented: layout Effects run
before regular ones, and on an update every cleanup runs before any new setup. Observed in React
19.2.8: setups ran child-first. I wouldn't build logic that depends on parent/child order.

**Full answer:** Logging a `Parent` → `Child` pair in React 19.2.8 gave: render Parent, render
Child, layout setup Child, layout setup Parent, effect setup Child, effect setup Parent. On an
update, all layout cleanups, then all layout setups, then all effect cleanups, then all effect
setups. On unmount, cleanups ran parent-first. Only some of that is documented. "All cleanups
before any new setups" is a **React 17** guarantee, except for `useInsertionEffect`, which the docs
say interleaves cleanup and setup one component at a time. Layout-before-regular follows from the
documented timing. Child-first setup and parent-first unmount are observed behavior. A common
wrong explanation is worth avoiding too: a parent's Effect can read a child's DOM node through a
ref because "React sets `ref.current` during the commit," right after updating the DOM and before
Effects run, not because the child's Effects ran first. Code that depends on cross-component Effect
ordering usually has two secretly coupled Effects.

**Q: Should you put unrelated logic in one Effect if it has the same dependencies?** *(🔥 Frequent)*

**Quick answer:** No. "Each Effect … should represent a separate and independent synchronization
process." Split them, even if their dependencies match today.

**Full answer:** Combining them couples their re-run schedules. Add a dependency to one concern
later and the other re-runs too (for example, analytics changes start reconnecting the chat). The
test: if you deleted one piece, would the other still make sense? Then they're separate Effects.

**Q: What changes when you move an Effect into a custom Hook?** *(🔥 Frequent · 🎯 Trap)*

**Quick answer:** Nothing about how the Effect behaves. A custom Hook packages a synchronization
process under a name, like `useChatRoom(roomId)`. The dependencies, cleanup, closures and Strict
Mode behavior are exactly as if the Effect were written inline.

**Full answer:** A custom Hook is a function whose name starts with `use` and that calls other Hooks.
Its Effect belongs to whichever component calls it, and re-runs according to the values *it* reads.
So `useChatRoom(roomId)` still re-syncs when `roomId` changes and still needs its cleanup. The payoff
is readability, since the component now declares "stay connected to this room," and reuse.
`useOnlineStatus` wrapping `useSyncExternalStore` is the same idea. Designing custom Hooks well is a
separate topic (ch.08).

---

## §3. Dependencies — [notes](README.md#sec-3)

**Q: What must go in the dependency array?** *(⭐ Core)*

**Quick answer:** Every reactive value the Effect reads: props, state, and anything declared in the
component body. Not module constants or stable setters. And `ref.current` doesn't work as one,
because it isn't reactive.

**Full answer:** "All variables declared inside the component (including props, state, and variables
in your component's body) are reactive." State setters have a stable identity, so omitting them is
safe. A ref object is stable too (the docs note it *can* be listed). Mutable values like
`ref.current` or `location.pathname` are the trap. You can *type* `[ref.current]`, but the docs say
it "can't be a dependency" because it doesn't do what you mean: assigning it doesn't trigger a
render, React only compares dependencies during a render, so the Effect won't re-run when the value
changes. Reading mutable data during render also breaks purity. To react to an external mutable
value, subscribe to it with `useSyncExternalStore`.

**Q: The linter wants a dependency that makes the Effect run too often. What do you do?** *(🔥 Frequent · 🎯 Trap)*

**Quick answer:** Change the code, not the array. "Dependencies should match the code," and "to
remove a dependency, prove that it's not a dependency." Never suppress the lint rule.

**Full answer:** Walk the docs' checklist. Should the code be an event handler instead? Is the
Effect doing two unrelated things that should be split? Is it reading state only to compute the next
state, so an updater function removes the read? Is it reading a value it shouldn't react to, which
is what `useEffectEvent` is for? Is an object or function recreated every render, in which case
move it outside the component, create it inside the Effect, or depend on its primitive fields? The
docs on suppressing: "Suppressing the linter leads to very unintuitive bugs that are hard to find
and fix." A missing dependency doesn't crash. The Effect silently runs with old values, so the lint
rule is effectively a stale-closure detector.

**Q: Why does an object in the dependency array make the Effect run on every render?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** Dependencies are compared with `Object.is`, which is identity for objects. An
object created during render is a new object every render, even with identical contents.

**Full answer:** The docs' example: `const options = { serverUrl, roomId }` in the body plus
`[options]` reconnects the chat on every keystroke in an unrelated input. Fixes in order of
preference: (1) static object → move it outside the component; (2) depends on props → build it
inside the Effect and depend on the primitives; (3) object arrives as a prop → destructure its
primitive fields outside the Effect and depend on those. `useMemo`/`useCallback` is the last resort,
since it papers over the identity instead of removing it. The same applies to functions defined in
the body.

**Q: How do you update state from an Effect based on its previous value without adding it as a dependency?** *(🧠 Deep)*

**Quick answer:** Use an updater function, `setMessages(msgs => [...msgs, received])`. The Effect
no longer reads `messages`, so it isn't a dependency.

**Full answer:** Reading `messages` just to append to it makes every new message re-run the Effect,
which here means reconnecting. The updater receives the latest state from React's queue, so the
Effect writes without reading.

**Q: My Effect restarts even though nothing on screen changed. Why?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** Dependencies are compared every time the component renders and commits, whatever
caused the render. Nothing visible has to change. Usually some render created a new object or
function identity for one of the dependencies.

**Full answer:** A render isn't the same as a visible change. The component can re-render because of
its own unrelated state, a parent re-rendering, or a context change, and each time React compares
the dependency array with `Object.is`. An object or function created in the body is a new identity
on every such render, so the Effect restarts. Nothing on screen differs, but the chat reconnects.
The right debugging question is "which render created a new identity for one of my dependencies?",
not "what changed on screen?"

---

## §4. Stale closures — [notes](README.md#sec-4)

**Q: What is a stale closure in React?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** A function from an old render that keeps running and keeps seeing that render's
props and state, because nothing replaced it with a newer one.

**Full answer:** A closure is a function plus the variables it could see where it was created. Each
render is a separate call to your component with its own `const` variables, so a function created
during render 1 sees render 1's `count` forever. With Effects, the usual cause is a dependency array
that omits a value: React doesn't run the newer Effect, so a timer or listener registered by the old
one keeps running with old values. Name the mechanism before the fix. Naming only the fix reads as
pattern-matching.

**Q: This interval increments once and then stops. Why, and how do you fix it?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** `setCount(count + 1)` in a `[]` Effect closes over the first render's `count`
(0), so every tick asks for `0 + 1`. Use `setCount(c => c + 1)`.

**Full answer:** After the first tick state is 1, and every later tick asks for 1 again, which React
bails out on via `Object.is`, so it looks frozen while the interval keeps firing. The updater fix is
best because the callback only *writes* state, and React supplies the current value. Adding `count`
to the dependencies also works, but it tears down and recreates the interval every tick, resetting
its timing. Suppressing the lint rule is how this bug usually gets written.

**Q: What are the ways to fix a stale closure, and when do you use each?** *(🧠 Deep)*

**Quick answer:** First ask "should this value changing restart the synchronization?" If yes, add
the dependency. If the code only writes state, use an updater. If the value is event data that
shouldn't restart anything, use `useEffectEvent` (19.2), or a ref before that. If it was never an
Effect, move it to an event handler.

**Full answer:** It depends on what the stale code does. If a value changing means the
synchronization is wrong (a new `roomId`), it's a real dependency. If the code only computes next
state from previous state, use an updater. If the value is part of an *event* fired from the Effect
and genuinely shouldn't restart it (a theme used in a notification), use an Effect Event in React
19.2+, or before that a ref holding the latest value. Don't treat `useEffectEvent` as a general
"get the latest value" fix: it's for separating non-reactive logic, and wrapping a truly reactive
value in it reintroduces a bug. If the logic responds to a user action, move it to the handler,
since handlers are recreated every render.

---

## §5. Cleanup — [notes](README.md#sec-5)

**Q: When does the cleanup function run?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** Before the next setup when dependencies changed (the component stays mounted),
and when the component's Effects are torn down: on unmount, when an `<Activity>` is hidden, and in
Strict Mode's dev rehearsal. It sees the values from the render that created it. Cleanup means "stop
this synchronization," not "the component is unmounting."

**Full answer:** The reference: "After every commit with changed dependencies, React will first run
the cleanup function (if you provided it) with the old values, and then run your setup function
with the new values. After your component is removed from the DOM, React will run your cleanup
function." The "old values" part is what makes cleanup correct. It disconnects from the room it
connected to, not the new one. The best one-line model: cleanup doesn't mean "unmounting," it means
"stop the synchronization this Effect run started," and a dependency change triggers it while the
component stays mounted.

**Q: What needs cleanup?** *(⭐ Core)*

**Quick answer:** Anything setup starts that keeps running or holds a resource: listeners,
intervals and timeouts, subscriptions, connections, in-flight fetches, third-party widget
instances, and started animations.

**Full answer:** Think in pairs: `addEventListener`/`removeEventListener` (same function
reference), `setInterval`/`clearInterval`, `connect`/`disconnect`, `subscribe`/unsubscribe,
`fetch`/abort or ignore, `init`/`destroy`. The goal the docs set is symmetry: a user shouldn't be
able to tell setup-once apart from setup → cleanup → setup. Fire-and-forget Effects like setting
`document.title` or logging a visit usually need none. Cleanup also has a second job besides
releasing resources: **correctness**. An `ignore` flag or an abort decides which async work is
still allowed to affect the current UI, which is why cleanup matters even when nothing would leak.

**Q: How did cleanup timing change in React 17?** *(🧠 Deep · ⚠️ Version)*

**Quick answer:** `useEffect` cleanup became asynchronous: on unmount it runs *after* the screen
updates. Layout Effect cleanup didn't change. React 17 also guaranteed all cleanups run before any
new Effects. The consequence is that `ref.current` may already be `null` in cleanup, so capture it
during setup.

**Full answer:** Scope it correctly, because "Effect cleanup became async" is too broad. Before 17,
"effect cleanup functions used to run synchronously (similar to `componentWillUnmount` being
synchronous in classes)." React 17: "the effect cleanup function always runs asynchronously — for
example, if the component is unmounting, the cleanup runs after the screen has been updated." The
same notes point to `useLayoutEffect` for anyone who needs synchronous cleanup. They also add "React
17 will always execute all effect cleanup functions (for all components) before it runs any new
effects." Their example of what breaks: reading `someRef.current` inside cleanup. The fix is
`const instance = someRef.current;` in setup, so the cleanup closes over a value that can't change.
That's the closure rule used deliberately.

**Q: What happened to the "Can't perform a React state update on an unmounted component" warning?** *(⚠️ Version · 🎯 Trap)*

**Quick answer:** React 18 removed it. It mostly fired where setting state was harmless, and the
`isMounted` workarounds made code worse.

**Full answer:** The upgrade guide: "This warning was added for subscriptions, but people primarily
run into it in scenarios where setting state is fine, and workarounds make the code worse. We've
removed this warning." That doesn't make late updates always correct. For data fetching, a stale
response landing on screen is a correctness bug, fixed with an `ignore` flag or `AbortController`.
It was never fixed by an `isMounted` check.

**Q: Why might `removeEventListener` in your cleanup silently do nothing?** *(🎯 Trap)*

**Quick answer:** It matches listeners by function identity. Passing a new inline arrow, even with
identical code, removes nothing, and it doesn't throw.

**Full answer:** Declare one named function in the Effect and pass it to both calls. Or pass an
`AbortController`'s `signal` in the `addEventListener` options and call `controller.abort()` in
cleanup. MDN: "The listener will be removed when the `abort()` method of the `AbortController` which
owns the `AbortSignal` is called." One abort removes every listener registered with that signal.

---

## §6. Strict Mode's double Effect — [notes](README.md#sec-6)

**Q: Why does my Effect run twice in development?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** Strict Mode runs one extra setup → cleanup cycle on mount, in development only, to
check that your cleanup fully undoes your setup. Production runs setup once.

**Full answer:** The reference calls it "a stress-test that ensures that your cleanup logic 'mirrors'
your setup logic." The sequence (verified in React 19.2.8) is mount (layout, then regular Effects),
simulated unmount (both destroyed), then remount with the same state. It happens only when a
component first mounts, and updates look like production. The docs reframe the question: it's not
"how to run an Effect once" but "how to fix the Effect so that it works after remounting." An Effect
must be resilient to being started, stopped and started again: setup → cleanup → setup must leave
the external system as one setup would. If the double cycle breaks something, the cleanup is missing
or incomplete. Version detail: from React 19.3 the extra cycle also runs during hydration of
server-rendered apps ("Double invoke Effects in Strict Mode during hydration, matching
client-rendered roots"), not only for client-rendered roots.

**Q: Why not use a ref to make the Effect run only once?** *(🔥 Frequent · 🎯 Trap)*

**Quick answer:** Because it hides the missing cleanup in dev and leaves the bug for production.
The docs say it outright: "Don't use refs to prevent Effects from firing."

**Full answer:** A `didRun` ref guard makes the dev double-call disappear, and it's broken in two
separate ways. (1) There's no cleanup, so the connection leaks on unmount or when an `<Activity>`
hides the component. (2) It blocks legitimate re-synchronization. When a dependency like `roomId`
changes, React re-runs the Effect, but the ref is still `true`, so it returns early and stays
connected to the old room. The guard can't tell Strict Mode's rehearsal from a real change. The fix
is a cleanup that mirrors setup, after which the double cycle is invisible because you end up in the
same state as a single setup.

**Q: Why does React do this? Is remounting real, or just a dev check?** *(🧠 Deep · ⚠️ Version)*

**Quick answer:** It's real. React 18 added the check so components survive being unmounted and
remounted with preserved state. React 19.2's `<Activity>` does that in production: hidden mode
unmounts Effects and keeps state.

**Full answer:** The React 18 upgrade guide explains that React wants to "add and remove sections of
the UI while preserving state," which requires unmounting and remounting "using the same component
state as before." The 19.2 release notes describe `<Activity mode="hidden">` as hiding children and
"unmounts effects." A hidden tab runs your cleanups and runs setup again when shown, which is exactly
the cycle Strict Mode rehearses. An Effect that fails the Strict Mode check fails there too.

**Q: My analytics event or fetch fires twice in dev. Is that a bug?** *(🔥 Frequent)*

**Quick answer:** No, if the Effect is correct. The docs say to keep analytics code as is, and
duplicate fetches are harmless when you ignore or abort the first. A POST firing twice *is* a bug,
because it belongs in an event handler.

**Full answer:** For analytics: "We recommend keeping this code as is. … In production, there will
be no duplicate visit logs." For fetching: "In development, you will see two fetches in the Network
tab. There is nothing wrong with that," since cleanup sets the first run's `ignore` to `true`. A
POST, purchase or "send email" firing twice is different: it's caused by an interaction, so it was
never an Effect and belongs in the event handler. App-wide initialization belongs at module level,
where it runs once per module evaluation.

---

## §7. `useLayoutEffect` vs `useEffect` — [notes](README.md#sec-7)

**Q: When would you use `useLayoutEffect`?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** When you need to measure layout and change what's on screen before the user sees
it, like positioning a tooltip, to avoid a visible flicker. It runs after the DOM is updated but
before the browser paints.

**Full answer:** "`useLayoutEffect` is a version of `useEffect` that fires before the browser
repaints the screen." In the tooltip case you render, measure, and re-render in the right place,
and "all of this needs to happen before the browser repaints the screen." State updates scheduled
inside it are also processed before paint, so the user only sees the final position. Always pair it
with the cost: "`useLayoutEffect` can hurt performance. Prefer `useEffect` when possible." It blocks
paint.

**Q: What are the downsides of `useLayoutEffect`?** *(🧠 Deep)*

**Quick answer:** It blocks the browser from painting, including any state updates it schedules. A
state update inside it also forces all pending `useEffect`s to run immediately. And it does nothing
during server rendering.

**Full answer:** "The code inside `useLayoutEffect` and all state updates scheduled from it block the
browser from repainting the screen. When used excessively, this makes your app slow." That shows up
as interaction latency (ch.20's INP). Separately: "If you trigger a state update inside
`useLayoutEffect`, React will execute all remaining Effects immediately including `useEffect`." So
one `setState` there drags every pending regular Effect in front of the paint too. And on the
server there's no layout, so "`useLayoutEffect` does nothing on the server."

**Q: What is `useInsertionEffect`?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** A hook for CSS-in-JS libraries to inject styles before any layout Effects run. App
code shouldn't need it. Its only firm timing promise is "before layout Effects." Whether the DOM
has been updated yet is deliberately unspecified.

**Full answer:** The docs open with that restriction: it's "for CSS-in-JS library authors." The
hooks overview summarizes it as firing "before React makes changes to the DOM," but the reference's
caveat is more careful: it "may run either before or after the DOM has been updated. You shouldn't
rely on the DOM being updated at any particular time." A 19.2.8 probe showed both. On mount it ran
before anything was in the DOM, and on an update it ran after its own component's DOM text had
changed. Two more documented quirks: unlike other Effects, it interleaves cleanup and setup one
component at a time, and you can't update state in it or read refs, which aren't attached yet.
Order within a commit: insertion Effects (around the DOM mutations), layout Effects, paint
(usually), then regular Effects.

---

## §8. You might not need an Effect — [notes](README.md#sec-8)

**Q: When should you *not* use `useEffect`?** *(⭐ Core · 🔥 Frequent)*

**Quick answer:** When there's no external system involved. Derived data is computed during render,
user-action logic goes in the handler, state resets use `key`, notifying a parent happens in the same
handler, app init goes at module level, and external stores use `useSyncExternalStore`.

**Full answer:** The docs open with two rules: "You don't need Effects to transform data for
rendering" and "You don't need Effects to handle user events." Say what's actually wrong with the
Effect versions. Deriving state in an Effect renders twice, and the first render shows a stale
value. Event logic in an Effect fires on the wrong occasions (on load, on remount, twice in dev).
Chains of Effects cause a render per link and become fragile as requirements change. Notifying the
parent from an Effect makes it find out a render late. The principle underneath: "If something can
be calculated from the existing props or state, don't put it in state. Instead, calculate it during
rendering."

**Q: `useEffect` + `setState` vs. `useMemo` for a derived value: which, and why?** *(⭐ Core · 🎯 Trap)*

**Quick answer:** Neither by default. Compute it during render. Add `useMemo` only if the calculation
is measurably expensive. An Effect is never the tool for derived data.

**Full answer:** They aren't alternatives. `useMemo` is an *optimization* of a calculation you'd
otherwise do during render, and removing it should never change behavior. An Effect is a
*synchronization* with something outside React. Deriving in an Effect costs an extra render per
change, and the first of those renders shows a stale value. So `const visible = filter(items,
query)` is the default, `useMemo(() => filter(items, query), [items, query])` is the optimization,
and `useEffect(() => setVisible(filter(items, query)), [items, query])` is the anti-pattern.

**Q: Where does "run once when the app loads" code go, and what does "once" mean?** *(🧠 Deep)*

**Quick answer:** At module level, outside any component (guarded with `typeof window !==
'undefined'` if it's browser-only). "Once" means once per module evaluation, which in a browser page
load is effectively once per page load.

**Full answer:** A `[]` Effect is the wrong place, because it runs once per *mount* and components
remount. The docs: "Code at the top level runs once when your component is imported — even if it
doesn't end up being rendered." But module evaluation isn't "once for the app's lifetime" everywhere.
On a server, a module is evaluated once per process and shared by every request, so per-user work
must never live there. HMR re-evaluates edited modules in development, and test runners may evaluate
modules once per test file. The docs also show a module-level `didInit` flag inside an Effect for
code that must run after the first render.

**Q: How do you reset a component's state when a prop changes?** *(🔥 Frequent · 🎯 Trap)*

**Quick answer:** Give it a `key` equal to that prop. A new key means React treats it as a
different component and remounts it with fresh state. Not an Effect that clears state.

**Full answer:** `<Profile userId={userId} key={userId} />`. The docs: you're "asking React to treat
two `Profile` components with different `userId` as two different components that should not share
any state." The Effect version renders once with the old user's state before clearing it. To reset
only *part* of the state, prefer deriving (store a selected id, not the selected object), or adjust
state during render guarded by a previous-value comparison.

**Q: Isn't calling `setState` during render forbidden?** *(🧠 Deep · 🎯 Trap)*

**Quick answer:** For *other* components, yes. For the same component, guarded by a condition, React
allows it: it throws away the JSX and immediately re-renders before children render or the DOM
updates.

**Full answer:** This is the docs' `prevItems` pattern: `if (items !== prevItems) { setPrevItems(items);
setSelection(null); }`. "React only lets you update the *same* component's state during a render."
The condition is mandatory, otherwise it loops. The docs call it "hard to understand, but … better
than updating the same state in an Effect," and restructuring so nothing needs adjusting is better
still.

**Q: What's wrong with a chain of Effects that each set state to trigger the next?** *(🧠 Deep)*

**Quick answer:** It re-renders once per link, and it's fragile: the chain won't fit the next
requirement. Compute what you can during render and all the next state in the event handler.

**Full answer:** The docs name two problems: inefficiency ("the component (and its children) have
to re-render between each `set` call in the chain") and brittleness as the code evolves. In the
card-game example the fix is `const isGameOver = round > 5` during render plus a `handlePlaceCard`
handler that computes the next gold count and round together, so one click is one batched render.

---

## §9. Data fetching in an Effect — [notes](README.md#sec-9)

**Q: What's the race condition in fetching data in `useEffect`, and how do you fix it?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** Responses can arrive out of order, so a slow response for an old query can
overwrite a fast one for the current query. Fix it with an `ignore` flag set in cleanup, or abort
the request with `AbortController`.

**Full answer:** The docs: "network responses may arrive in a different order than you sent them."
The `ignore` fix works because each Effect run has its own `ignore` variable, and the old run's
cleanup flips *its* flag when the query changes, so the stale response is dropped: "all responses
except the last requested one will be ignored." `AbortController` additionally cancels the stale
request itself. Pass `controller.signal` to `fetch`, call `controller.abort()` in cleanup, and
ignore the resulting `AbortError`. It's hard to reproduce on a fast connection, which is why it
ships.

**Q: `ignore` flag vs `AbortController`: what's the difference?** *(🧠 Deep)*

**Quick answer:** `ignore` discards the stale result but lets the request finish. Abort cancels the
request and saves bandwidth and connections. Abort needs you to filter out `AbortError`.

**Full answer:** Abort only affects work that holds the signal. Async steps after the fetch that
don't take a signal still need a guard, and checking `controller.signal.aborted` before setting
state gives you both with one object. `abort()` after the response is already handled is a no-op, so
calling it unconditionally in cleanup is safe. Neither undoes server-side work: an aborted POST that
the server already processed stays processed, which is one more reason mutations belong in handlers.

**Q: What does `fetch` do on a 404 or 500?** *(🎯 Trap)*

**Quick answer:** It resolves normally. `fetch` only rejects on network failure or abort, so you
must check `res.ok` yourself.

**Full answer:** So a `.catch` alone never sees a 404 or 500. Throw on `!res.ok` inside the chain
so HTTP errors and network errors reach the same handler, while still filtering `AbortError`, which
is expected when you cancel a request, not a real error.

**Q: How would you build a debounced live search?** *(🔥 Frequent)*

**Quick answer:** One Effect keyed on the query: set a 300ms timeout that starts the fetch with an
abort signal, and in cleanup call both `clearTimeout` and `abort()`.

**Full answer:** The cleanup covers two stages. If the user types again before the timer fires, the
request never starts. If it already started, it's cancelled. Model status as a union (`idle |
loading | success | error`), derive the idle state from an empty query during render rather than
setting it in the Effect, ignore `AbortError`, and check `res.ok`. `AbortSignal.timeout(ms)` combined
through `AbortSignal.any([...])` adds a timeout, and it rejects with a `TimeoutError` you can show
distinctly. Then say what you'd use in production (next section).

---

## §10. Where data fetching should live — [notes](README.md#sec-10)

**Q: How would you fetch data in a React app today?** *(⭐ Core · 🔥 Frequent · 🎯 Trap)*

**Quick answer:** It depends on the problem, and they aren't interchangeable. Framework or router
loaders for route data, Server Components for server-side data, TanStack Query for client-side server
state, and Effects for synchronization or small cases. Suspense coordinates loading UI but doesn't
fetch.

**Full answer:** Start with the docs' four downsides of fetching in Effects: they don't run on the
server, they create network waterfalls, they usually mean no preloading or caching, and there's
race-condition boilerplate. The docs recommend "if you use a framework, use its built-in data
fetching mechanism," otherwise a client-side cache like TanStack Query, useSWR, or React Router 6.4+.
Then place each tool. A router loader is called "before the route component is rendered" on
navigation, so data is tied to the URL and loads as part of navigation instead of in a
render-then-fetch waterfall. A Server Component fetches
on the server with no client fetch code. TanStack Query owns caching, deduping, background refetch
and invalidation, and passes an `AbortSignal` to your query function. Suspense only activates for
Suspense-enabled sources: "Suspense does not detect when data is fetched inside an Effect or event
handler." These combine; they aren't a succession where the newest wins.

**Q: Are Effects still the right tool for anything network-related?** *(🧠 Deep)*

**Quick answer:** Yes, for ongoing synchronization rather than one-off request/response: a WebSocket
or `EventSource` for the room on screen, or a live subscription.

**Full answer:** "Keep this connected while the component is displayed" is exactly what Effects are
for. Data libraries are themselves built on Effects and subscriptions internally, and the docs list
"build your own cache" (with Effects underneath, plus dedupe and caching) as a valid option.

---

## §11. `useSyncExternalStore` — [notes](README.md#sec-11)

**Q: Why use `useSyncExternalStore` instead of `useEffect` + `useState` to subscribe to a store?** *(🔥 Frequent · 🧠 Deep · ⚠️ Version)*

**Quick answer:** The Effect version is workable for a simple client-only app, but
`useSyncExternalStore` is the React primitive designed for this. It adds three things: no guessed
first render, a server snapshot for SSR and hydration, and protection against "tearing" in
concurrent rendering, where components on one screen show different versions of the store.

**Full answer:** The Effect version renders once with a placeholder and corrects it after mount, and
it has no answer for the server. Under concurrent rendering (React 18+), a render can pause, and if
the store changes during the pause, earlier and later components can disagree. The Hook guards
against that by re-checking the snapshot and, for transitions, restarting as a blocking update "to
ensure that every component on screen is reflecting the same version of the store." The React 18
post introduced it to let external stores "support concurrent reads," and said it "removes the need
for useEffect when implementing subscriptions." Version detail: React 19.3's changelog includes "Fix
`useSyncExternalStore` missing store mutations that happened while an `<Activity>` tree was hidden."
That's a narrow edge case that differs between 19.2.x and 19.3, not a general caveat on the Hook.

**Q: What are the arguments to `useSyncExternalStore`?** *(⭐ Core)*

**Quick answer:** `subscribe(callback)` returns an unsubscribe function. `getSnapshot()` returns the
current value, the same value while unchanged. The optional `getServerSnapshot()` is used on the
server and during hydration.

**Full answer:** The store calls `callback` on change, React calls `getSnapshot` again, and it
re-renders if the value differs by `Object.is`. The docs recommend wrapping it in a custom Hook like
`useOnlineStatus`, and preferring `useState`/`useReducer` for state React owns, since it's "mostly
useful if you need to integrate with existing non-React code."

**Q: What causes an infinite loop with `useSyncExternalStore`?** *(🎯 Trap)*

**Quick answer:** A `getSnapshot` that returns a new object every call. React sees a "change" on
every check. Return a primitive or a cached, immutable snapshot.

**Full answer:** React 19.2.8 logs "The result of getSnapshot should be cached to avoid an infinite
loop" and then fails with "Maximum update depth exceeded." The docs' rule: "The store snapshot
returned by `getSnapshot` must be immutable. If the underlying store has mutable data, return a new
immutable snapshot if the data has changed. Otherwise, return a cached last snapshot." A related,
milder trap: a `subscribe` function defined inside the component makes React re-subscribe on every
render. Declare it outside.

---

## §12. `useEffectEvent` — [notes](README.md#sec-12)

**Q: What is `useEffectEvent` and what problem does it solve?** *(🔥 Frequent · ⚠️ Version)*

**Quick answer:** Stable in React 19.2. It creates an Effect Event, a function you call from an
Effect that always sees the latest props and state but isn't a dependency. It separates the
non-reactive "event" part of an Effect from the reactive synchronization.

**Full answer:** Canonical example: a chat Effect shows a notification in the current `theme` when
connected. Reading `theme` makes it a dependency, so toggling dark mode reconnects the chat. Moving
`showNotification('Connected!', theme)` into `const onConnected = useEffectEvent(...)` and calling it
from the connection handler leaves `[roomId]` as the only dependency. "Similar to DOM events, Effect
Events always 'see' the latest props and state." Frame it as separating *reactive* from
*non-reactive* logic, not as a general "get the latest value" tool. Rules: call it only from
Effects (`useEffect`, `useLayoutEffect` or `useInsertionEffect`) or other Effect Events, never
pass it to other components or Hooks, never list it as a dependency (because it represents
non-reactive logic. That's the reason, and its identity changing every render is a secondary
implementation detail), and upgrade `eslint-plugin-react-hooks` so the linter doesn't
demand it. (This repo's `oxlint` already doesn't flag an omitted Effect Event.) Version detail: React 19.3 fixed a bug where Effect Events didn't read the latest values
in `forwardRef` and `memo` components ("Fix `useEffectEvent` to read the latest values in
`forwardRef` and `memo` components"). That's a narrow edge case to know about on 19.2.x, not a
general caveat on the API.

**Q: Can you use `useEffectEvent` to get rid of an annoying dependency?** *(🎯 Trap)*

**Quick answer:** No. The docs: "Do not use `useEffectEvent` to avoid specifying dependencies." Only
move logic into one if it's genuinely an event, meaning its values changing shouldn't restart the
synchronization.

**Full answer:** Ask of each value: if it changes, is the current synchronization wrong? A new
`roomId` means you're connected to the wrong room, so it's reactive and stays a dependency. A new
`theme` doesn't make the connection wrong, so it's event data. Wrapping a truly reactive value in an
Effect Event reintroduces the stale-synchronization bug the linter was protecting you from. The
pattern of passing the reactive part as an argument (`onVisit(url)`) makes the split explicit.

**Q: How did people solve this before React 19.2?** *(🧠 Deep · ⚠️ Version)*

**Quick answer:** A ref holding the latest value, updated on every render and read inside the
Effect. `useEffectEvent` is the dedicated API for the same need.

**Full answer:** The ref pattern works because `ref.current` is one mutable box shared by every
render (ch.04), so the Effect reads the latest value without depending on it. Knowing the older
pattern shows you understand *why* `useEffectEvent` exists. If the codebase is on React < 19.2, say
so. Version awareness is part of a senior answer.

---

## Coding & Scenario Questions

The same mechanisms, presented the way interviewers tend to ask them: a snippet plus "what happens"
or "find the bug." Answer before reading the explanation.

**1. What does this log after the user changes `roomId` from `general` to `travel`, then leaves the page?**
```jsx
useEffect(() => {
  console.log(`connect ${roomId}`);
  return () => console.log(`disconnect ${roomId}`);
}, [roomId]);
```
*([§2](README.md#sec-2)/[§5](README.md#sec-5), ⭐ Core · 🔥 Frequent)* Note that the second and third
lines happen while the component stays mounted: cleanup isn't unmount. In production: `connect
general`, `disconnect general`, `connect travel`, `disconnect travel`. The cleanup logs the *old*
room because it closes over the render that created it. In development with Strict Mode, add
`disconnect general` and `connect general` right after the first line, from the mount-time extra
cycle only.

**2. Why is the screen stuck at 1?**
```jsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);
```
*([§4](README.md#sec-4), ⭐ Core · 🔥 Frequent · 🎯 Trap)* The interval callback closes over the
first render's `count` (0), so every tick is `setCount(1)`, and after the first one React bails out.
Fix with `setCount(c => c + 1)`. `[count]` also works but recreates the interval every tick.

**3. Find the bug.**
```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch(`/api/search?q=${query}`).then(r => r.json()).then(setResults);
  }, [query]);
  // ...
}
```
*([§9](README.md#sec-9), ⭐ Core · 🔥 Frequent · 🎯 Trap)* A race condition: responses arrive out of
order, so results for an older query can overwrite the current one. Fix with an `ignore` flag set in
cleanup, or `AbortController` with `AbortError` filtered. Also point out: no `encodeURIComponent`,
no `res.ok` check, no error or loading state, and no debounce. Then mention TanStack Query or a
loader as what you'd ship.

**4. How many times does this chat reconnect while the user types a 10-character message?**
```jsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  const options = { serverUrl, roomId };
  useEffect(() => {
    const c = createConnection(options);
    c.connect();
    return () => c.disconnect();
  }, [options]);
  return <input value={message} onChange={e => setMessage(e.target.value)} />;
}
```
*([§3](README.md#sec-3), 🔥 Frequent · 🎯 Trap)* **Ten**, once per keystroke. Every render creates a
new `options` object, and `Object.is` compares by identity. Move the object inside the Effect and
depend on `[roomId]` (with `serverUrl` at module level).

**5. What's wrong with this, and what does React print?**
```jsx
useEffect(async () => {
  const user = await fetchUser(id);
  setUser(user);
}, [id]);
```
*([§1](README.md#sec-1)/[§5](README.md#sec-5), 🔥 Frequent · 🎯 Trap)* The async function returns a
Promise, but setup must return nothing or a cleanup function. React warns "useEffect must not return
anything besides a function, which is used for clean-up," and later throws `destroy is not a
function` when it tries to run the Promise as cleanup. In this repo you'd never get that far:
TypeScript rejects it, and the hooks lint rule flags it. Define an async function inside and call
it. There's also no race protection, so add `ignore` or abort.

**6. A teammate's fix for "my Effect runs twice." Review it.**
```jsx
const ran = useRef(false);
useEffect(() => {
  if (ran.current) return;
  ran.current = true;
  const sub = store.subscribe(onChange);
}, []);
```
*([§6](README.md#sec-6), 🔥 Frequent · 🎯 Trap)* It hides Strict Mode's check instead of passing it.
There's no cleanup, so the subscription leaks on unmount or when an `<Activity>` hides the
component. And if this Effect ever gains a dependency, the ref will also block the re-subscribe that
change needs. The docs: "Don't use refs to prevent Effects from firing." Fix:
`return () => sub.unsubscribe();` and delete the ref.

**7. Rewrite without the Effect.**
```jsx
const [items, setItems] = useState([]);
const [total, setTotal] = useState(0);
useEffect(() => {
  setTotal(items.reduce((s, i) => s + i.price, 0));
}, [items]);
```
*([§8](README.md#sec-8), ⭐ Core · 🔥 Frequent)* `const total = items.reduce((s, i) => s + i.price,
0);` during render (with `useMemo` only if it's measurably expensive). The Effect version renders
twice per change, and the first render shows a stale total.

**8. Find the bug.**
```jsx
function ProductPage({ product }) {
  useEffect(() => {
    if (product.isInCart) showToast(`Added ${product.name}!`);
  }, [product]);
  return <button onClick={() => addToCart(product)}>Buy</button>;
}
```
*([§8](README.md#sec-8), 🔥 Frequent · 🎯 Trap)* Event logic in an Effect. The toast fires whenever
the page renders with an in-cart product, including on load or navigating back, not only on the
click. Move `showToast` into the click handler (a shared `buyProduct()` if several buttons add to
the cart).

**9. Tooltip flickers into place. Why, and what's the fix?**
```jsx
useEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setTooltipHeight(height);
}, []);
```
*([§7](README.md#sec-7), 🔥 Frequent)* `useEffect` usually runs after paint, so the user sees the
tooltip in its initial position for a frame before the re-render moves it. Switch to
`useLayoutEffect`, which runs before paint, and whose state update is also committed before paint.
Mention the trade-off (it blocks paint) and that it does nothing during SSR.

**10. Why does this component crash?**
```jsx
const pos = useSyncExternalStore(subscribe, () => ({ x: mouse.x, y: mouse.y }));
```
*([§11](README.md#sec-11), 🧠 Deep · 🎯 Trap)* `getSnapshot` returns a new object every call, so
React sees a change on every check. It logs "The result of getSnapshot should be cached to avoid an
infinite loop" and throws "Maximum update depth exceeded." Fix: two subscriptions returning
primitives (`() => mouse.x`, `() => mouse.y`), or have the store replace an immutable `{ x, y }`
object only when the mouse moves and return that cached object.

**11. Toggling dark mode reconnects the chat. Fix it without breaking the linter's rules.**
```jsx
useEffect(() => {
  const c = createConnection(roomId);
  c.on('connected', () => showNotification('Connected!', theme));
  c.connect();
  return () => c.disconnect();
}, [roomId, theme]);
```
*([§12](README.md#sec-12), 🔥 Frequent · ⚠️ Version)* In React 19.2+: `const onConnected =
useEffectEvent(() => showNotification('Connected!', theme));`, call `onConnected()` in the handler,
and dependencies become `[roomId]`. Explain why `theme` is event data (it doesn't make the connection
wrong) while `roomId` is reactive. Before 19.2: a ref holding the latest `theme`. Never suppress the
lint rule.

**12. What does the parent see, and how many renders happen?**
```jsx
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);
  useEffect(() => { onChange(isOn); }, [isOn, onChange]);
  return <button onClick={() => setIsOn(!isOn)}>{String(isOn)}</button>;
}
// Parent: <Toggle onChange={v => setParentValue(v)} />
```
*([§8](README.md#sec-8), 🧠 Deep · 🎯 Trap)* Three problems. The parent is told a render late (the
child renders and commits, then the Effect tells the parent, which renders again). The inline
`onChange` is a new function every parent render, so the Effect re-runs after every parent render,
not just when `isOn` changes. And the parent is also notified on mount. Fix: call
`onChange(nextIsOn)` in the click handler next to `setIsOn`, so React batches both into one render.
Or remove the child's state and make it controlled by the parent.

**13. Order of logs on mount, no Strict Mode?**
```jsx
function Parent() {
  useEffect(() => console.log('parent effect'));
  useLayoutEffect(() => console.log('parent layout'));
  return <Child />;
}
function Child() {
  useEffect(() => console.log('child effect'));
  useLayoutEffect(() => console.log('child layout'));
  return null;
}
```
*([§2](README.md#sec-2)/[§7](README.md#sec-7), 🧠 Deep · 🎯 Trap)* In React 19.2.8: `child layout`,
`parent layout`, `child effect`, `parent effect`. Say which parts are guarantees. Layout-before-
regular follows from the documented timing, and declaration order inside a component doesn't change
it (verified). Child-first within each kind is observed behavior, consistent in practice but not a
documented contract, so answer "children first, in current React, but I wouldn't depend on it."
