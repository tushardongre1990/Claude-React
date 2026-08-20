# Chapter 01: Interview Questions & Answers

**Part of:** [Chapter 01: Foundations: JSX, Rendering & Components](README.md)

Every question an interviewer could reasonably ask from this chapter's topics, each with a full
answer written to stand on its own as a complete, interview-accepted response — not just a
keyword. Read the linked section in [`README.md`](README.md) first if an answer here doesn't fully
click; this file is for drilling recall and delivery, not first-time learning.

---

## §0. What React actually is — [notes](README.md#sec-0)

**Q: What problem does React solve? Why not just use the DOM APIs directly?**

A: Without a library, keeping a page in sync with changing data means writing **imperative**
code — step-by-step instructions for *how* to change the page: find this node, set this property,
add this class. That's manageable for one counter, but becomes genuinely hard to maintain once a
page has dozens of interdependent pieces of UI that all need to stay in sync with each other and
with your data — you end up manually tracking, by hand, every place that might need to touch every
piece of the DOM whenever anything changes. React lets you write **declarative** UI instead: you
describe *what* the UI should look like for a given set of data, and React figures out *how* to
make the real DOM match that description — including working out the minimal set of actual DOM
changes needed, which is the hard, error-prone part you'd otherwise hand-manage.

**Q: What is a component, in plain terms?**

A: A component is just a JavaScript function that returns a description of some UI. You build an
application by writing many small components and composing them together — a `Counter` inside a
`Toolbar` inside a `Page` — the same way you'd break any large program into smaller functions: to
keep each piece small, nameable, and reusable.

**Q: Is it accurate to say React gives you "optimal" DOM updates?**

A: No — this is a real trap to avoid overclaiming in an interview. React's own reconciliation docs
are explicit that a genuinely optimal tree diff is *not* what React does: "the state of the art
algorithms have a complexity in the order of O(n³)... React implements a heuristic **O(n)**
algorithm based on two assumptions" — that two elements of different types produce different
trees, and that `key` lets you mark which children are stable across renders. React deliberately
trades theoretical optimality for linear time, and those two assumptions are exactly what the
rules around `key` (§5) exist to protect. Naming that trade-off explicitly is a much stronger
signal than the word "optimal."

---

## §1. JSX: syntax, expressions, and how it compiles — [notes](README.md#sec-1)

**Q: What is JSX? Is it HTML, or a string?**

A: JSX is a syntax extension to JavaScript that lets you describe UI in a shape that reads like the
markup it will eventually produce. It is neither real HTML nor a string — it's syntax that gets
transformed into plain JavaScript function calls before your code ever runs in the browser.

**Q: What is an "expression slot" in JSX, and why can't you write an `if` statement or a variable declaration directly inside `{}`?**

A: `{}` in JSX accepts an **expression** — something that produces a value — not a **statement**.
`if`, `for`, and declarations like `const x = 1` are statements; they don't produce a value, so
none of them are legal directly inside `{}`. This is exactly why conditional rendering in React
uses expression-shaped tools (the ternary `? :`, `&&`) instead of an inline `if` block — see §6.

**Q: How does JSX actually become DOM? Walk through the full pipeline.**

A: Four steps. (1) A **JSX transform** — performed by a compiler the build tool delegates to
(Babel, SWC, or TypeScript; in this project, `@vitejs/plugin-react`, not Vite itself and not
TypeScript, since `tsc -b` here only type-checks) — rewrites each JSX expression into a plain
function call, at build time. (2) That function call **returns a plain JavaScript object** — a
**React element** — describing what you asked for (`{ type, props }`). It's inert data: not a DOM
node, and it doesn't render anything just by existing. (3) React's renderer compares that element
tree against the previously rendered tree (**reconciliation**, the render phase — §4) to figure out
what actually changed. (4) React **commits** the minimal necessary DOM mutations needed to make the
real DOM match. Answering "JSX gets turned into HTML" conflates step 2 (a JS object) with the real
DOM and is a tell that someone hasn't looked underneath the syntax; collapsing reconciliation and
commit into one unnamed step is the next most common imprecision.

**Q: What does JSX actually compile to — show the classic transform vs. the modern automatic transform.**

A: `<h1 className="title">Hello, {name}</h1>` compiles, under the **classic transform** (pre-React
17), to:
```js
React.createElement("h1", { className: "title" }, "Hello, ", name);
```
Under the **modern automatic JSX transform** (the default since React 17):
```js
import { jsxs as _jsxs } from "react/jsx-runtime";
_jsxs("h1", { className: "title", children: ["Hello, ", name] });
```
The runtime exports both `jsx` (single child) and `jsxs` (a known-at-compile-time array of
children — the `s` is for *static*) — the example above has two children, so it emits `jsxs`, not
`jsx`. Development builds use a third entry point, `jsxDEV` from `react/jsx-dev-runtime`, which
takes extra arguments recording source file/line/column for better error messages.

**Q: Why did the classic transform require `import React from 'react'` in every single file, and why doesn't the modern transform need it?**

A: The classic transform compiles JSX to `React.createElement(...)` calls, which need `React` to
be in scope in that file. The modern automatic transform instead imports `jsx`/`jsxs` from
`react/jsx-runtime` **for you**, automatically, so that explicit import is no longer needed. Seeing
an apparently-unused `import React from 'react'` at the top of every file in an older codebase is
the classic transform's fingerprint, not dead code.

**Q: What's the precise difference between a component, a React element, and a DOM node?**

A: | Term | What it actually is |
|---|---|
| **Component** | A JS function (or class) you write, that *describes* UI — the blueprint. |
| **React element** | The plain-object output of calling that description (`{ type, props }`) for one render — inert data, not yet on screen. |
| **DOM node** | The actual browser object rendered on screen, which React creates/updates to match the element tree. |

`<Counter />` refers to the *component*; it compiles to a React *element* whose `type` points at
the `Counter` function, **without calling `Counter` itself** (React calls it later, during its own
render process — see §2). Once React has done that and knows what the tree should look like, it
reconciles the result and commits the resulting *DOM nodes*.

**Q: Why must component names be capitalized when used as a JSX tag? What actually enforces this?**

A: This isn't a style preference — it's how the compiler decides what a tag *means*. `<div>`
compiles to the **string** `"div"` as the element's `type` (meaning "this is a built-in HTML
tag"); `<Counter>` compiles to a **reference to the variable named `Counter`** (meaning "this is a
component I wrote"):
```js
<Greeting />  →  jsx(Greeting, {})    // reference to your function
<greeting />  →  jsx("greeting", {})  // the string "greeting" — an unknown HTML tag
```
A lowercase custom component name would be silently treated as an unknown HTML tag string instead
of your component. Note precisely *where* the constraint lives: it's JSX tag resolution, not a
requirement on the function itself — `function greeting() {...}` is a perfectly valid component if
handed to `createElement` directly; it simply can't be written as `<greeting />`.

**Q: Why does JSX use `className` instead of `class`, and `htmlFor` instead of `for`? Is it just because they're reserved words?**

A: The precise mechanism: JSX attributes become the keys of the props object, and you very often
want to pull those attributes out into plain variables — most commonly by destructuring a
component's props (`function Greeting({ name })`). JavaScript variable/binding names have
restrictions that plain object property *keys* don't: they can't be reserved words like `class`.
So `function Img({ class }) { ... }` is an actual `SyntaxError` — not just bad style — because that
destructuring shorthand tries to declare a variable literally named `class`. (This is narrower than
"objects can't have `class` as a key at all" — `{ class: 'x' }` and `el.class` are both fine; it's
specifically the variable/binding-name position that rejects reserved words.) Since `class` can't
safely be used there, React picked `className` — not an arbitrary substitute, but the name already
used by the DOM's own `element.className` property — and `htmlFor` follows the same pattern.

**Q: Are there exceptions to the camelCase attribute rule?**

A: Yes — `aria-*` and `data-*` attributes keep their HTML dashed spelling as-is in JSX
(`aria-label`, `data-testid`, not `ariaLabel`/`dataTestid`). React's docs call this out directly as
a historical exception, not an oversight.

---

## §2. Components: functions + hooks vs. classes — [notes](README.md#sec-2)

**Q: What's the difference between calling `Greeting()` directly and writing `<Greeting />`?**

A: `Greeting()` is an ordinary synchronous function call — it runs immediately, right where it's
written, and returns whatever it returns. `<Greeting />` compiles to `jsx(Greeting, {...})` — it
does **not** call `Greeting`; it produces a React element that *describes* "render `Greeting`
here," and React decides if/when to actually call the function as part of its own render process.
This is exactly why React can skip calling a component entirely (`memo`) or call it twice on
purpose (Strict Mode) — both are only possible because React, not your code, controls the call.

**Q: What makes a function a valid React component? Name the rules.**

A: (1) When used as a JSX tag, its name must be capitalized — for the mechanism reason in §1 (JSX
tag resolution, not a constraint on the function itself). (2) It must return a value React can
render or treat as empty: JSX/elements, strings, and numbers are actually displayed; `null`,
`undefined`, and booleans render nothing (valid, just invisible); an array/Fragment of any of those
is also valid. (3) It must be **pure** while rendering (see next question) — not enforced at
compile time, but a real correctness requirement.

**Q: What does "a component must be pure" mean precisely?**

A: React's Rules of React define it in three parts: **idempotent** — given the same
props/state/context, it always returns the same JSX; **free of side effects during render** — the
function body must not modify external variables, touch the DOM, start subscriptions, or make
network calls (side effects triggered by a specific interaction, like a "Buy" button's POST
request, belong in the *event handler*; side effects that must happen because the component is
*displayed*, regardless of which interaction caused that, belong in `useEffect`, ch.03);
**non-mutating of anything it doesn't own** — it must never write to a variable/object/array that
exists outside the function call currently rendering. The key nuance: **reading** an external value
during render is fine, only **mutating** one is the problem. This matters mechanically, not just
stylistically, because React is free to call a component function more than once for a single
logical render (exactly what Strict Mode does on purpose in development, and what concurrent
features may do for real in production) — any state your render logic leaves behind in shared,
external storage will double up or silently diverge from what's on screen.

**Q: What are hooks, and why do function components need them?**

A: A plain JS function doesn't remember anything between calls — every call starts its local
variables fresh. But components need to remember things (like a counter's current value) across
renders. Hooks — special functions always named starting with `use` — let a function component tap
into React-managed capabilities a plain function couldn't have on its own: persistent state that
survives across renders, running code in response to being displayed, reading Context values, and
more. They're what turn an ordinary, stateless function into something that can behave like a
living, updating piece of UI.

**Q: State the Rules of Hooks.**

A: (1) Only call Hooks at the top level of a component — never inside a loop, a condition, a nested
function, or after an early `return`. (2) Only call Hooks from a React function component or
another Hook — never from a regular JS function. This is exactly why a conditional early return
must come *after* all Hook calls, not before.

**Q: Why did hooks "win" over class components? Give mechanical reasons, not just "the team preferred it."**

A: (1) **Reusable stateful logic without wrapper hell** — before hooks, sharing stateful *behavior*
between components meant Higher-Order Components or render props, patterns that wrap the component
tree in extra layers and make it hard to trace which wrapper injected which prop. A custom Hook
(`useWindowSize()`) lets you extract and reuse that logic directly, with no extra component and no
wrapping. (2) **`this`-binding footguns disappear** — in a class, passing `this.handleClick` as an
event handler (instead of an inline arrow function) detaches the method from its object, so `this`
inside it is `undefined` when actually clicked, requiring a manual `.bind(this)` in the
constructor. Functions + hooks have no `this` for component logic at all, so this entire category
of bug doesn't exist. (3) **Related logic can live together** — in a class, "subscribe on mount"
lives in `componentDidMount` and its cleanup lives in a *separate* method,
`componentWillUnmount`; `useEffect` lets setup and cleanup for the same concern live in one place,
and you can write several independent `useEffect` calls instead of cramming every "on mount"
concern into one method.

**Q: Can every class component be rewritten as a function component with hooks? Is there anything hooks genuinely can't do?**

A: This is a common trap question, and the precise answer distinguishes two different claims. No
Hook maps one-to-one onto every legacy lifecycle method (`getSnapshotBeforeUpdate` has no Hook
equivalent) — but that's a *migration convenience* gap, not a *capability* gap, since the large
majority of real class components' actual behavior (state + effects) is expressible via
`useState`/`useReducer`/`useEffect` without a line-for-line lifecycle mapping. The one genuine
**capability** gap is **Error Boundaries**: catching render errors from components below you in the
tree requires the `componentDidCatch`/`static getDerivedStateFromError` class contract, and
react.dev states directly that "there is currently no way to write an Error Boundary as a function
component." An unqualified "yes" (glossing over Error Boundaries) or unqualified "no" (overstating
the lifecycle-mapping gap) both signal not having hit this distinction in practice.

---

## §3. Props: data in, defaults, `children`, composition — [notes](README.md#sec-3)

**Q: What are props, mechanically?**

A: A component receives inputs the same way any function does. In JSX, `<Greeting name="Ada" />`
compiles so that all the attributes you pass become a single object argument (conventionally named
`props`) — `Greeting({ name: "Ada" })` under the hood. In practice, props are almost always
**destructured** directly in the function signature (`function Greeting({ name })`), which is
plain JS destructuring, not a React feature.

**Q: Why are props described as "read-only" or "an immutable snapshot"? What's the correct pattern if a child needs to change something conceptually given to it by a parent?**

A: Props (like state) are an immutable snapshot for a given render — a value reflecting what was
true at the moment this particular render started, which the child is never meant to write to.
Props flow one direction: parent to child. If a child needs to change something, the correct
pattern is for the parent to pass a **callback function** as a prop, which the child calls to ask
the parent to make the change — the parent owns the actual data and decides what happens. This
"data down, callback functions back up" shape is called **lifting state up** (full mechanics in
ch.02).

**Q: How do you give a prop a default value in modern React, and what changed in React 19?**

A: Use a plain JavaScript **default parameter** — ordinary JS syntax, not React-specific:
```jsx
function Button({ variant = "primary", children }) { ... }
```
There used to be a React-specific mechanism, `Button.defaultProps = { variant: 'primary' }`. It's
deprecated as of React 18.3 and its support was **removed entirely for function components in
React 19** — always use a JS default parameter going forward. This deprecation is
function-component-specific: `defaultProps` on *class* components still works, since there's no
ES6 default-parameter alternative for class fields in the same way.

**Q: What is `children`, and how is it different from a normal prop?**

A: Whatever you nest *between* a component's opening and closing tags is automatically collected
into a special prop called `children` — you don't pass it as an attribute, but once inside the
function it's just a prop like any other:
```jsx
<Card><p>Text</p></Card>
// equivalent to: <Card children={<p>Text</p>} />
```
Worth knowing precisely: `children` is **not necessarily a single element**. Multiple nested
elements, plain text mixed with elements, even other components, all get collected together into
`children` as a list. React calls this general category — anything renderable, including a single
element, an array, a string, a number, or nothing at all — a **React node**, and `children` is
typed as exactly that, not "one element."

**Q: What is "composition over configuration," and what trade-off does it make?**

A: The idiomatic React answer to a component accumulating a dozen boolean/config props trying to
control every possible variant of its content. Instead of `<Modal showHeader showCloseButton
title="..." footerButtons={[...]} />` (configuration — `Modal` must know about every possible
internal variation up front, and the prop list grows without bound as new use cases appear),
composition pushes that knowledge back to the call site: `<Modal><Modal.Header>...</Modal.Header>
<Modal.Body>...</Modal.Body></Modal>` — `Modal` only needs to know about layout, not content.
`children` (plus sometimes multiple named "slot" props, e.g. `<Layout sidebar={<Nav />}
main={<Content />} />`) are the two building blocks that make this possible. The trade-off:
configuration is easier to constrain (fewer ways to misuse it) but doesn't scale as variants
multiply; composition scales better but gives callers more freedom, and more ways to misuse it.

---

## §4. What triggers a render; render phase vs. commit phase — [notes](README.md#sec-4)

**Q: What triggers a component to render? Name React's teaching model, then the honest caveat to it.**

A: React's own docs teach it with a deliberately simple model — "there are two reasons for a
component to render": **initial render** (the first time the tree is displayed, kicked off by
`createRoot(...).render(<App />)`) and **a state update** (calling a `useState` setter, or
dispatching to a `useReducer`, with a value actually different from the current one — in the
component itself, or in an ancestor). Treat that as React's *teaching model*, the right thing to
lead with in an interview, not an exhaustive specification: components subscribed via
`useSyncExternalStore` (how Redux/Zustand integrate with React) re-render when the *store*
notifies a change, which isn't literally a `useState` setter call. The most robust phrasing that
stays true in every case: React starts work either for an initial render or for an update; updates
originate from component state, from a Provider being given a new value, or from an external store
React is subscribed to.

**Q: Is a prop changing an independent trigger for a render? Why or why not?**

A: No — and it's easy to phrase this wrong in both directions. The sloppy version, "props changing
does nothing," is wrong too: from inside the child, receiving different props absolutely is the
reason it renders *differently*. The precise claim is about **causation**: the thing that caused
the child to render *at all* was its parent re-rendering (from that parent's own state update, or
from being re-rendered by *its* parent), which then happened to pass a different prop value down.
Tracing "why did this component render?" backwards always terminates at an initial render or a
state update — never at "a prop changed." Two related, non-independent effects worth naming: by
default a re-rendering parent re-renders **all** its children regardless of whether their own props
changed (why `memo` exists, ch.06), and Context consumers re-render whenever their Provider's value
changes (ch.05), independent of their own local props/state.

**Q: Describe what happens in the render phase vs. the commit phase.**

A: **Render phase**: React walks the tree, calling component functions, each call returning a
fresh React element tree, which React reconciles against the previous tree as it goes (calling
components and reconciling their output are interleaved during traversal, not three fully separate
sequential passes — that's a simplified teaching picture, and the real traversal mechanics are
ch.19's subject). This phase must be **pure** — no side effects — because React is allowed to
start, throw away, and restart a render without warning (exactly what Strict Mode's double-invoke
in dev is designed to catch, and what makes `useTransition` safe: an in-progress render can be
abandoned mid-flight with no harm done). **Commit phase**: React actually touches the real DOM to
match what the render phase computed, applying the minimal necessary mutations, and runs layout
Effects (`useLayoutEffect`) synchronously as part of the same phase. Unlike render, commit is not
treated as discardable — React runs it through to completion once it starts.

**Q: Where does `useEffect` fit relative to commit and browser paint? Is it part of the commit phase?**

A: No — this is a common source of imprecision worth avoiding. React's own performance-tracks
documentation names a separate, later step, **"Remaining Effects,"** specifically for passive
Effects: "this usually happens after the paint, and this is when React runs hooks like
`useEffect`. One known exception is user interactions, like clicks... in this scenario, this phase
could run before the paint." So the accurate ordering is: commit (DOM mutations + layout Effects)
→ browser paint (usually) → `useEffect` — not `useEffect` nested inside commit.

**Q: Define render, re-render, reconciliation, and commit precisely — these get used loosely and conflated.**

A: **Render** — React calling a component function to compute what it should display.
**Re-render** — the informal word for "render happening again" after the initial one; not a
separate mechanism. **Reconciliation** — React's comparison of the new element tree against the
previous one, to figure out what actually changed (part of the render phase). **Commit** —
actually applying the result of that comparison to the real DOM.

**Q: Define mount, update, and unmount.**

A: **Mount** — the first time a component appears in the tree and gets its first render + commit.
**Update** — an already-mounted component rendering again because its own state changed, a parent
re-rendered and passed new props, or a Context value it reads changed. **Unmount** — the component
being removed from the tree entirely, its DOM node(s) removed and its state discarded — this is
exactly when an Effect's cleanup function runs for the last time.

**Q: Why does `console.log(count)` right after `setCount(count + 1)` still log the old value?**

```jsx
function handleClick() {
  setCount(count + 1);
  console.log(count); // still the OLD value
}
```

A: Calling a setter *schedules* a re-render; it doesn't change the variable in the currently
executing function call. `count` here is a snapshot from the render that produced this particular
`handleClick` closure (the same closure mechanics as ch.00's stale-closure section, applied to
state specifically) — it doesn't retroactively update just because you called `setCount`.

**Q: Why doesn't calling `setCount(count + 1)` three times in a row triple the count, and what's the fix?**

```jsx
setCount(count + 1); // all three read the SAME `count` snapshot from this render
setCount(count + 1); // — this only ever moves count from 0 to 1, not to 3
setCount(count + 1);
```

A: All three calls read `count` from the *same* render's snapshot, so they all compute the same
new value. The fix is the **updater function** form, which receives the latest pending value
instead of the render's snapshot:
```jsx
setCount((c) => c + 1); // each call receives the previous call's result — correctly reaches 3
setCount((c) => c + 1);
setCount((c) => c + 1);
```

**Q: Why does React batch state updates? Is that a correctness requirement or a performance one? What changed in React 18?**

A: It's a **performance** optimization, not a correctness one — be precise about that distinction
if asked. React groups multiple `setState` calls that happen within the same event/tick into a
single render+commit pass instead of one per call, avoiding redundant re-renders. React 18 made
this **automatic batching apply everywhere** — inside promises, timeouts, native event handlers,
not just React's own synthetic event handlers — which is a real behavior change from React 17 and
earlier, where only updates inside React event handlers were batched.

**Q: What causes React to "bail out" and skip a re-render even after `setState` is called?**

A: If you call `setState(x)` with a value that's `Object.is`-equal to the current state
(essentially reference-equal, for objects/arrays), React can bail out and skip re-rendering that
component. This is exactly why replacing an object/array with a **new reference** (rather than
mutating the existing one in place) matters: `setUser({ ...user, name })` creates a new object, so
React sees a different reference and re-renders; `user.name = name; setUser(user)` passes back the
*same* reference, so React sees "no change" and can skip work — even though the object's contents
did change.

---

## §5. Keys and lists — [notes](README.md#sec-5)

**Q: Why does React need `key` when rendering a list?**

A: When a list re-renders (an item added, removed, reordered, or edited), React needs to match each
element in the *new* array to the corresponding element in the *old* array to decide: "same
logical item, update it in place" vs. "brand-new item, mount fresh" vs. "this item is gone, remove
it." `key` is how you tell React which item is which — without a stable identity attached to each
item, React can't distinguish "the list was reordered" from "an item was deleted and a
differently-worded new item happened to appear in its place." React's docs frame it well: a key is
like a filename — it lets React identify an item across renders even if its position changes,
because a well-chosen key carries more information than array position alone.

**Q: What happens if you don't provide a `key` at all?**

A: React still renders the list (with a console warning), but falls back to matching new children
against previous ones **by position/array index** — behaving exactly as if you had passed each
item's index as its key. React's own docs state this directly: "that's what React will use if you
don't specify a `key` at all." One precision point: React doesn't literally attach `key={0}`,
`key={1}` props onto your elements — those elements genuinely have no key; positional matching is
what the reconciler falls back to. "React uses the index as the key" describes the resulting
*behavior*, not props React silently wrote for you.

**Q: Walk through the classic "index-as-key bug" — why does deleting a list item sometimes cause the wrong row to show stale input state?**

A: Positional matching works fine as long as the list never reorders, filters, or has items
inserted/removed anywhere but the very end. The moment an item is deleted from the middle, position
0 before (`'A'`) and position 0 after (`'B'`, having shifted up) get matched as "the same logical
element" purely because they occupy the same array index — so React reuses the existing DOM node
and component state at that position, but that node now displays `B`'s content. If that list item
is, say, a text input holding per-row draft text, **the input's state stays attached to the DOM
node at that position, not to the logical data item that moved** — so after deleting row A, row B
visually inherits whatever the user had typed into row A. No crash, no error — just silently wrong
state attached to the wrong row. This is a favorite "explain this bug" prompt precisely because it
looks like a state-management bug rather than a keys bug unless you know what to look for.

**Q: What makes a good key?**

A: **Stable across renders** — don't generate a new one during render (`Math.random()` or
`crypto.randomUUID()` called inside the component function defeats the purpose, since every render
would then look like a full delete-and-recreate of every item). **Unique among siblings** —
uniqueness across other, unrelated arrays elsewhere in the app doesn't matter. **Prefer a real,
stable identifier from your data** (a database ID) over a synthetic one.

**Q: Can a component read its own `key` via `props.key`? Why or why not?**

A: No — `key` is metadata *for React itself*, consumed during reconciliation, and it's deliberately
never forwarded to your component as a prop:
```jsx
<User key={user.id} />
function User({ key }) { /* key is always undefined here — React strips it out */ }
```
This trips people up because every other JSX attribute *does* flow through as a prop; `key` is the
exception, not the rule. If the component needs that ID value for its own logic, pass it again
under a different name: `<User key={user.id} userId={user.id} />`. (`ref` used to be a second
exception requiring `forwardRef` in function components, but as of React 19, function components
can receive `ref` directly as a regular prop — `key` remains the one attribute that's never passed
through, in every version of React through 19.2.)

**Q: When is using the array index as a key actually acceptable?**

A: When the list is static and will never reorder, filter, or have items inserted/removed anywhere
but the end — e.g. a fixed set of lines in a poem that never changes. This is rare enough in real
UIs that "prefer a stable ID" should be the default answer, with the static-list case named as the
explicit exception. Explaining the underlying *mechanism* (React matches old-vs-new children by key
to decide reuse-vs-recreate) lets you correctly derive the answer for any variant of this question,
rather than just reciting "don't use index as key" as a memorized rule.

---

## §6. Conditional rendering patterns — [notes](README.md#sec-6)

**Q: Is there special JSX syntax for conditional rendering?**

A: No — `if` works perfectly well in a component, since it's completely ordinary JavaScript;
React's docs confirm you can conditionally render JSX using `if` statements, `&&`, and `? :`
operators. What doesn't exist is a *JSX-specific* conditional tag or syntax inside the markup
itself — `{}` in JSX is an expression slot, and `if` is a statement, so you can't write `{if (x) {
... }}` directly inside a JSX tree. "Conditional rendering" is really just "which value do I put in
this expression slot (or what do I choose to return before I get there)," using ordinary JS tools:
a ternary, `&&`, an early `return` written *before* the JSX (not inside it), or a variable assigned
via `if`/`else` before being referenced in `{}`.

**Q: Compare the trade-offs of ternary, `&&`, early return, and variable assignment for conditional rendering.**

A: Ternaries are good for "either A or B," especially inline, but nest badly — a ternary-of-
ternaries is a real readability trap; switch to early returns or an assigned variable past two
branches. `&&` is good for "render this, or render nothing," and is concise, but hides a real
footgun (next question). Early return is clearest when a whole component has a few
mutually-exclusive whole-output states (loading/error/empty/success) — but hooks must still be
called unconditionally *before* any early return; you can't put a conditional return above a
`useState`/`useEffect` call. Variable assignment (`if`/`else` setting a `content` variable before
`return`) is good when the condition is complex or the branches get reused.

**Q: Explain precisely why `{count && <span>{count} items</span>}` renders the literal text "0" when `count` is `0`, instead of rendering nothing.**

A: Two separate mechanisms stack to produce this bug. (1) **What `&&` does as plain JavaScript**:
it is not a boolean operator that returns `true`/`false` — it evaluates the left operand and, if
that operand is **falsy**, returns **that operand itself, unchanged**, without evaluating the right
side at all. So `0 && <span/>` doesn't evaluate to `false`, it evaluates to the number `0`. (2)
**What React does with the resulting value**: React renders strings and numbers as visible text,
and treats `false`, `null`, and `undefined` as "holes" that render nothing. Put those together: a
falsy *number* on the left survives step 1 as a number, and step 2 then dutifully renders it as
text — which is why `&&` seems to work fine right up until the day the left side happens to be `0`
or `NaN`. `false`/`null`/`undefined` don't have this problem because, while they're also falsy and
also survive step 1 unchanged, they happen to be exactly the values React renders as nothing. The
fix is to force an actual boolean on the left side: `{count > 0 && <span>...</span>}` or
`{Boolean(count) && ...}`.

**Q: Why must hooks be called before any early return in a component?**

A: The Rules of Hooks (§2) require Hooks to be called at the top level, unconditionally, on every
render — never inside a condition or after an early return. If a `useState`/`useEffect` call sat
below a conditional `return`, some renders would call that hook and others wouldn't, which breaks
React's internal per-component hook ordering (each hook's state is tracked by call order across
renders). So any early return for a "not ready yet" state must be written *after* every Hook call
in the component body.

---

## §7. `createRoot`: mounting a React app — [notes](README.md#sec-7)

**Q: Walk through how a React app actually ends up on screen, from `index.html` to pixels.**

A: `index.html` is a nearly-empty page — its only real content is one `<div id="root"></div>` plus
a `<script>` tag loading the entry file (`main.tsx`). That entry file is the one place in the whole
app where plain DOM APIs (`document.getElementById`) meet React: it finds that empty `<div>` and
hands it to `createRoot`, which mounts the entire component tree (`<App />` and everything it
renders, recursively) inside it. Every other file in the app is components rendering other
components — the entry file is the single bridge between "plain HTML page" and "React-managed
tree":
```jsx
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")).render(<App />);
```

**Q: Is `createRoot` a React 19 API?**

A: No — this is a real precision signal to have ready. `createRoot` is a **React 18** API; it
replaced the older, legacy `ReactDOM.render()` call. It remains the standard mounting API,
unchanged, in React 19/19.2 — nothing about *mounting itself* changed in 19; only what you can do
*inside* the mounted tree changed (Actions, the `use` API, etc.).

**Q: What does `createRoot` unlock automatically, and what remains opt-in?**

A: Be precise here rather than picturing `createRoot` as one big switch that turns on concurrency
everywhere. **Automatic batching** applies automatically to every update once you're on
`createRoot`, with nothing further to opt into. **Concurrent-rendering features** like transitions,
by contrast, remain **opt-in** — using `createRoot` makes those APIs *available*, but a tree
mounted with `createRoot` doesn't start rendering concurrently on its own; you still have to reach
for `useTransition`/`startTransition` to actually use them.

**Q: What's the real difference between legacy `ReactDOM.render` and `createRoot`?**

A: Legacy `render` never enables the React 18 concurrent root at all, so neither automatic batching
everywhere nor concurrent APIs like transitions are available under it. `createRoot` is what makes
automatic batching apply everywhere unconditionally, and makes concurrent-rendering APIs like
transitions *available* to opt into (not automatically active just from mounting with it).

**Q: What happens if you call `root.render()` more than once on the same root?**

A: `root.render()` clears any existing DOM content inside the container on its **first** call, then
**reconciles** against the previous tree on any subsequent calls — calling `render()` again on the
same root preserves component state as long as the tree shape still matches. This is part of what
makes hot-reloading during development not blow away all your component state.

---

## §8. Strict Mode — [notes](README.md#sec-8)

**Q: What is Strict Mode for? Does it do anything in production?**

A: Strict Mode is a **development-only, opt-in wrapper component**. It renders no visible UI of its
own and does **nothing at all in production builds**. Its entire job is helping you catch bugs
while developing, by deliberately doing extra, redundant work that makes certain classes of bugs
impossible to miss. Specifically: React expects every component to behave like a pure function
(same inputs always produce the same output, no side effects sneaking out during render). If that's
true, calling the function twice in a row and discarding the first result changes nothing
observable. Strict Mode exploits exactly that — it calls things twice on purpose, so *impure* code
becomes visibly broken in development instead of quietly working by luck until it breaks in
production.

**Q: What actually gets double-invoked under Strict Mode, and what does not?**

A: Your component function body (render logic); `useState`/`useReducer` initializer and updater
functions; and Effect setup+cleanup+setup — where "Effects" means the category (`useEffect`,
`useLayoutEffect`, `useInsertionEffect`), not `useEffect` alone. The same setup+cleanup+setup
pattern applies to callback refs too. Class components get the equivalent treatment on
`constructor`, `render`, and `shouldComponentUpdate`. **Not** double-invoked: event handlers —
clicking a button wrapped in Strict Mode still calls its `onClick` exactly once, since
double-invocation only targets render-time and lifecycle logic, not code that runs in response to a
specific user interaction.

**Q: Describe the mechanism and purpose of Strict Mode's double Effect setup/cleanup/setup cycle.**

A: React runs an Effect's setup, immediately runs its cleanup, then runs setup again — simulating a
remount. This is a stress test that verifies cleanup **"mirrors" setup**: the rule of thumb is that
a user shouldn't be able to tell the difference between setup running once (production) and
setup→cleanup→setup (development). If an Effect has a *correct* cleanup function — e.g. it opens a
WebSocket and properly closes it — the dance closes the first connection before opening the second,
leaving exactly one live connection, indistinguishable from production. If the cleanup is missing
or incomplete, that same dance is precisely what exposes it: you get a stray, un-closed connection
from the first setup almost immediately in dev, instead of only noticing a slow leak much later in
production. Don't overstate this as "guaranteed to leak in production" — the safer, docs-accurate
framing is that it's exposing an unsafe *assumption* (code that only works because it happened to
run exactly once, in exactly one order) that a different timing, React version, or concurrent
scenario could just as easily expose later.

**Q: What changed about Strict Mode's double-invocation behavior in React 19, specifically regarding `useMemo`/`useCallback`?**

A: The React 19 upgrade guide states directly, under "StrictMode changes": "when double rendering
in Strict Mode in development, `useMemo` and `useCallback` will reuse the memoized results from the
first render during the second render." Before this change, Strict Mode's double-render
independently re-ran `useMemo`/`useCallback` calculations on both invocations; as of React 19, the
second render's `useMemo`/`useCallback` calls reuse the first render's memoized result instead of
recomputing. This is exactly the kind of detail worth re-checking per React version rather than
assuming Strict Mode's behavior is perfectly uniform across every hook and every version.

**Q: "Why does my `useEffect` fire twice in development?" — give the strong interview answer, not just "that's normal, ignore it."**

A: Name the mechanism: it's Strict Mode's setup→cleanup→setup cycle, dev-only, designed specifically
to catch missing or incorrect Effect cleanup. Frame it as a stress test verifying that cleanup
mirrors setup, not as arbitrary extra work — a broken cleanup (e.g. a missing `clearInterval` or
`unsubscribe`) means the Effect's setup/cleanup logic isn't correctly symmetrical, which is exactly
the property real-world remounts and concurrent rendering can also exercise in production. Treat it
as a real defect worth fixing, without overstating it as "guaranteed to leak in production."
