# 00. JavaScript Fundamentals

**Status:** In Progress
**Part of:** [Chapter 00: JavaScript & Browser Fundamentals for React Interviews](../README.md)

This is written for someone who already writes JavaScript daily — the goal isn't "what is a
closure" 101, it's precision: the exact mental model an interviewer expects you to reach for
under pressure, and the specific traps that catch experienced developers.

---

## 1. Closures

**The precise definition:** a closure is the combination of a function and the *lexical
environment* it was defined in. Every function in JS keeps a reference to the scope chain that
existed when it was created — not a copy of the variables, a live reference to the same
binding.

```js
function makeCounter() {
  let count = 0;
  return () => ++count; // closes over `count`, not a snapshot of it
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 — same `count` binding, mutated in place
```

**Closures in loops — the classic trap:**

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
} // logs 3, 3, 3
```

`var` is function-scoped, so there is exactly **one** `i` binding shared by all three
callbacks; by the time the callbacks run, the loop has finished and `i` is 3. Switching to
`let` fixes it because `let` creates a **new binding per iteration** — each closure captures
its own `i`.

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
} // logs 0, 1, 2
```

**Stale closures — the React-relevant version of the same bug:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // `count` is frozen at whatever it was when this effect ran
    }, 1000);
    return () => clearInterval(id);
  }, []); // empty deps — this closure is never recreated
}
```

This effect closes over the `count` from the render in which it was created, forever (because
the empty dependency array means the effect never re-runs to capture a fresh `count`). The
counter increments once and then sticks. Two fixes, each with a different tradeoff: the
functional updater `setCount(c => c + 1)` (doesn't need to read `count` at all), or adding
`count` to the dependency array (correct, but tears down/recreates the interval every render —
usually the updater form is what you actually want). This exact bug — "why does my interval
only increment once" — is one of the most common real interview debugging prompts.

**Interview framing:** if asked "why doesn't this effect see the latest state," the strong
answer names the mechanism (closure captured the render's snapshot of state) before naming the
fix. Naming the fix without the mechanism reads as pattern-matching, not understanding.

---

## 2. `this` binding

`this` is **not** lexically scoped for regular functions — it's determined by *how a function
is called*, not where it's defined. Four rules, in precedence order:

1. **`new` binding** — `new Foo()` binds `this` to the newly created object.
2. **Explicit binding** — `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)`.
3. **Implicit binding** — `obj.method()` binds `this` to `obj` (whatever is left of the dot).
4. **Default binding** — a bare function call binds `this` to `undefined` in strict mode (or
   the global object in sloppy mode).

**The classic break — method extraction:**

```js
const user = {
  name: "Ana",
  greet() { return `hi, ${this.name}`; },
};
const greet = user.greet;
greet(); // "hi, undefined" — implicit binding is lost; called as a bare function
```

This is exactly what happens when you pass `onClick={user.greet}` in React instead of
`onClick={() => user.greet()}` or a properly bound/arrow class method — the function is
detached from the object it was "called on."

**Arrow functions don't have their own `this`** — they capture `this` lexically from the
enclosing scope at definition time, and it can never be reassigned (`.call`/`.apply`/`.bind`
on an arrow function has no effect on `this`). This is precisely why arrow functions became
the default for React class-component handlers before hooks existed, and why `this` mostly
disappears as a concern once you're all-in on function components — but interviewers will
still test whether you understand *why* it disappeared, not just that it did.

---

## 3. Prototypes, `class`, and inheritance

JavaScript objects have an internal `[[Prototype]]` link (`Object.getPrototypeOf(obj)`,
historically `__proto__`) forming a chain that property lookup walks when a property isn't
found directly on the object.

```js
const base = { greet() { return "hi"; } };
const child = Object.create(base);
child.greet(); // "hi" — found by walking up the prototype chain
```

`class` syntax is sugar over this same prototype mechanism — methods defined in a class body
live on `ClassName.prototype`, not on each instance:

```js
class Animal {
  speak() { return "..."; } // one shared function on Animal.prototype
}
```

`instanceof` walks the prototype chain checking for a match: `obj instanceof Animal` is really
asking "does `Animal.prototype` appear anywhere in `obj`'s prototype chain?" This is why it
breaks across realms (e.g. an array from a different iframe fails `instanceof Array` there,
because it has a different `Array.prototype`).

**Interview-relevant nuance:** know that `class` doesn't introduce a fundamentally different
object model — it's the same prototypal inheritance with cleaner syntax, `super`, and a
few real semantic differences from manual prototype-chaining (class bodies are strict-mode by
default, methods are non-enumerable, and a class can't be called without `new`).

---

## 4. Promises & async/await

A Promise is a state machine with exactly one transition: **pending → fulfilled** or
**pending → rejected**, and once settled, it never changes state again. `.then()` handlers
registered *after* settlement still fire (asynchronously, as a microtask) — this is what makes
Promises safe to consume regardless of timing.

**Chaining returns a new Promise each time** — if a `.then` callback returns a value, the next
`.then` receives that value; if it returns a Promise, the chain waits for it to settle first
(auto-flattening, no manual "promise of a promise" nesting).

**Error propagation** — a rejection skips every `.then` until it hits a `.catch` (or a second
argument to `.then`). This is the same model `try/catch` gives you around `await`:

```js
async function load() {
  try {
    const res = await fetch("/api");
    if (!res.ok) throw new Error("bad status");
    return await res.json();
  } catch (err) {
    // catches: network failure, the thrown Error, AND a rejection from res.json()
  }
}
```

**`async` functions always return a Promise**, even if you `return` a plain value — it gets
wrapped. `await` unwraps a Promise's resolved value or re-throws its rejection as a catchable
exception; syntactically sequential, but not blocking the thread (see event loop below).

**Combinators — know the exact failure semantics of each, this gets asked directly:**

| Combinator | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | all fulfill | **first** rejection (short-circuits, other results discarded) |
| `Promise.allSettled` | all settle (fulfilled or rejected) | never — always resolves with per-item status |
| `Promise.race` | first settles (fulfilled or rejected) | — |
| `Promise.any` | **first** fulfillment | all reject (`AggregateError`) |

`Promise.all` is what most people reach for, but it's the wrong choice when partial failure is
acceptable — e.g. loading three independent dashboard widgets where one failing shouldn't blank
the whole page calls for `allSettled`.

---

## 5. The event loop

**The mental model senior interviews actually test:** JS is single-threaded — one call stack.
Async work doesn't run on a second thread; it gets *scheduled* and the event loop decides when
the (empty) call stack gets to run it.

```text
Call stack (sync code) runs to empty
         ↓
Drain the ENTIRE microtask queue (Promise .then/.catch, queueMicrotask, async/await
continuations) — including microtasks that were queued BY other microtasks
         ↓
Run exactly ONE macrotask (setTimeout/setInterval callback, I/O callback, message event)
         ↓
Repeat: drain microtasks again → one macrotask → ...
```

The critical fact that produces the classic "guess the output" question: **microtasks always
fully drain before the next macrotask runs**, even a `setTimeout(fn, 0)`.

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2
```

Order: sync code first (1, 4) → microtask queue drains (3) → one macrotask runs (2).
`queueMicrotask` behaves exactly like `.then` for ordering purposes.

**Why this matters for React specifically:** React's batching boundary is closely tied to this
model. Updates inside the same synchronous call stack (an event handler) get batched into one
re-render; historically (pre-React 18), updates inside a `setTimeout` callback or a raw Promise
`.then` were *not* automatically batched because they ran as a separate task/microtask outside
React's own event handling — React 18's automatic batching closed that gap by batching
regardless of where the update originates. Knowing the event loop is what lets you explain
*why* that distinction existed in the first place, not just that "React 18 batches more."

**Concurrency vs. parallelism:** JS gives you concurrency (interleaving many logical tasks on
one thread) but not parallelism (true simultaneous execution) — that's what Web Workers exist
for (see ch.06), running on an actually separate thread with no shared memory by default.

---

## 6. Functional patterns

These come up both as direct coding-interview problems (see `coding-interviews/javascript/`)
and as the theoretical basis for hooks like `useMemo`/`useCallback`.

**Debounce** — collapse a burst of calls into one, fired only after the calls *stop* for a
given delay (cancel-and-reschedule on every call). Use case: search-as-you-type, only fire the
request after the user pauses.

**Throttle** — guarantee a call fires **at most once** per interval, regardless of how many
times it's invoked, without waiting for calls to stop. Use case: scroll/resize handlers, where
you want steady periodic updates while the event is continuously firing.

The distinction is the single most common thing people get backwards in interviews: debounce
delays until quiet; throttle rate-limits during continuous activity.

**Currying** — transforming `f(a, b, c)` into `f(a)(b)(c)`, each call returning a new function
until all arguments are supplied. **Partial application** is the more general, less rigid
cousin — fixing *some* arguments now and supplying the rest later in one call, not necessarily
one-at-a-time.

**Memoization** — caching a pure function's return value keyed by its arguments, trading memory
for repeated-call speed. This is the manual, general-purpose version of what `useMemo` does for
a single value inside a component render, and what the React Compiler does automatically (see
ch.06) — understanding manual memoization first is what makes the compiler's behavior legible
later instead of magic.

---

## 7. Objects & equality

**`===` is reference equality for objects/arrays/functions** — two objects with identical
contents are never `===` unless they're the literal same reference in memory.

```js
{ a: 1 } === { a: 1 } // false — different objects
const obj = { a: 1 };
obj === obj // true — same reference
```

This is *the* reason React dependency arrays and `React.memo` behave the way they do: passing a
new object/array/function literal as a prop or dependency on every render is a new reference
every time, even if "logically" unchanged — which is why `{ a: 1 }` inline in JSX defeats
memoization, and why `useMemo`/`useCallback` exist (to keep the *reference* stable across
renders when the meaningful content hasn't changed).

**Shallow vs. deep copy** — `{ ...obj }` and `[...arr]` (and `Object.assign`) copy only the
top level; nested objects/arrays are still shared references between the copy and the original.
`structuredClone(obj)` (built into modern JS, no library needed) performs a true recursive deep
clone, but cannot clone functions, DOM nodes, or class instances with private fields — know
this limitation, it's a common "why doesn't structuredClone work here" trap.

```js
const original = { nested: { count: 1 } };
const shallow = { ...original };
shallow.nested.count = 99;
original.nested.count; // 99 — the nested object was shared, not copied
```

This directly explains a very common React bug: `setState({ ...state, nested: state.nested })`
looks like an update but doesn't actually create a new `nested` reference, so any code relying
on that reference changing (memoization, `useEffect` deps) won't fire.

---

## 8. Modules

**ESM (`import`/`export`) vs. CommonJS (`require`/`module.exports`):** ESM is statically
analyzable — imports/exports are resolved at parse time, before any code runs, which is exactly
what makes **tree shaking** possible (a bundler can prove which exports are unused and delete
them, because the import graph is static). CommonJS resolves `require()` calls at runtime,
which is dynamic and generally not tree-shakeable.

**Dynamic `import()`** returns a Promise and is evaluated at runtime, not parse time — this is
the primitive underneath `React.lazy()` and route-based code splitting (ch.06/ch.10): the
bundler still statically sees the `import()` call and can split that module into its own chunk,
but the *decision to load it* happens at runtime.

---

## 9. Memory & garbage collection

JS uses (mostly) mark-and-sweep garbage collection: an object is eligible for collection once
nothing reachable from a root (global scope, active call stacks, closures still in use) holds a
reference to it. You don't manually free memory — you avoid *unintentionally keeping a
reference alive*.

**Common leak sources, all closure-shaped:**
- **Event listeners never removed** — `addEventListener` without a matching `removeEventListener`
  keeps the handler (and everything it closes over) alive for the DOM node's lifetime, which
  can outlive the component that created it.
- **Timers never cleared** — an interval/timeout closure keeps its captured scope alive until
  cleared; this is precisely why `useEffect` cleanup functions matter (ch.03).
- **Closures capturing large objects unnecessarily** — a small callback that closes over an
  entire large object (because it references one property of it) keeps the *whole* object
  reachable, not just the property used.

This is the theoretical backing for why "every effect with a subscription/timer/listener needs
a cleanup function" isn't a style preference — it's the direct fix for a real memory-leak
mechanism.
