# Chapter 00: Interview Questions & Answers

**Part of:** [Chapter 00: JavaScript & Browser Fundamentals for React Interviews](README.md)

Every question an interviewer could reasonably ask from this chapter's topics
([`javascript/README.md`](javascript/README.md) and [`browser-and-web/README.md`](browser-and-web/README.md)),
each with a full answer written to stand on its own as a complete, interview-accepted response —
not just a keyword. Read the linked section in the notes first if an answer here doesn't fully
click; this file is for drilling recall and delivery, not first-time learning.

---

## JavaScript Fundamentals

### Closures — [notes](javascript/README.md#1-closures)

**Q: What is a closure?**

A: A closure is the combination of a function and the lexical environment (the variables) it was
defined in. Every function in JavaScript automatically keeps a live connection to the scope it was
created in, even after the code that created that scope has finished running. It's a **live
reference** to the same variable binding, not a snapshot/copy of the value at creation time — if
the closed-over variable is mutated later, the closure sees the new value.

```js
function makeCounter() {
  let count = 0;
  return () => ++count; // closes over the *binding* `count`, not its value at creation
}
const counter = makeCounter();
counter(); // 1
counter(); // 2 — same live binding, mutated in place
```

**Q: Why does `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }` log `3, 3, 3` instead of `0, 1, 2`, and why does switching to `let` fix it?**

A: `var` is function-scoped, not block-scoped — there is only **one** `i` variable for the entire
loop, shared by every iteration. All three callbacks close over that same shared binding. By the
time any callback actually runs (`setTimeout` always runs later, even at `0`ms — it goes through
the task queue after the loop has already finished synchronously), `i` has already reached `3`, so
all three callbacks read the same, now-final value. `let` fixes this because it creates a **brand
new binding on every iteration** — each callback closes over its own private copy of `i`, so they
log `0, 1, 2`.

**Q: Explain this React bug: an interval inside `useEffect` with an empty dependency array only increments the counter once, then appears stuck, even though the interval is still firing.**

```jsx
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000);
  return () => clearInterval(id);
}, []);
```

A: This is a stale closure. Every render creates a brand-new `count` variable (React gives each
render its own snapshot of state, it isn't one mutable box). The `setInterval` callback closes
over `count` from whichever render created the Effect — and because the dependency array is
empty, the Effect only runs once, on the first render, so the interval callback is permanently
stuck reading `count = 0`. First tick: `setCount(0 + 1)` → count becomes `1`, component
re-renders — but the interval callback itself is never recreated, so it's still reading `count =
0` from the original closure. Second tick: `setCount(0 + 1)` → `1` again, React sees the value is
unchanged (`Object.is` bail-out) and skips re-rendering. Visible result: `0 → 1` once, then stuck,
even though the interval keeps firing. Two fixes: the functional updater `setCount(c => c + 1)`
(reads the latest value from React directly, no closure dependency), or add `count` to the
dependency array (correct, but tears down and recreates the interval every render — the updater
form is usually what you actually want). **When answering this in an interview, name the
mechanism — closure capturing the render's state snapshot — before naming the fix**; jumping
straight to "use the updater function" without explaining why reads as pattern-matching, not
understanding.

---

### `this` binding — [notes](javascript/README.md#2-this-binding)

**Q: What determines the value of `this` in a JavaScript function?**

A: `this` is decided fresh, at **call time**, based on *how* the function was called — not where
it was written or defined. Four rules, in precedence order (highest wins):
1. **`new` binding** — `new Foo()` binds `this` to the newly created object.
2. **Explicit binding** — `fn.call(obj)`, `fn.apply(obj)`, `fn.bind(obj)`.
3. **Implicit binding** — `obj.method()` binds `this` to whatever is left of the dot.
4. **Default binding** — a bare call binds `this` to `undefined` in strict mode, or the global
   object in sloppy mode.

**Q: Why does calling `const greet = user.greet; greet();` not work the way `user.greet()` did?**

A: Extracting a method reference into a plain variable doesn't carry the object along with it —
functions aren't "attached" to the object they came from; `this` is only resolved at the moment of
the call. `greet()` here is a bare call, which falls to rule 4 (default binding). In strict mode
(the default in ES modules, classes, and TypeScript — i.e. virtually all modern React/TS code),
`this` is `undefined`, so `this.name` throws `TypeError: Cannot read properties of undefined`. In
old sloppy-mode script code, `this` falls back to the global object instead, so it doesn't throw —
in a browser, `window.name` is a real spec'd property defaulting to `""`, so the bug silently
returns `"hi, "` instead of erroring. This is exactly what happens when you write
`onClick={user.greet}` in React instead of `onClick={() => user.greet()}` — the method is
detached from its object. Lead with the mechanism (implicit binding lost on extraction); the exact
runtime behavior (throw vs. silent) is a secondary strict-mode detail.

**Q: Does `.bind()` permanently lock `this`? What happens if you call a bound function with `new`?**

A: Not unconditionally — `.bind()` only pre-fills what `this` will be *if no higher-precedence
rule fires*. Calling the bound function normally uses the locked object (rule 2). But calling it
with `new` invokes rule 1, which unconditionally creates a fresh object and binds `this` to that
instead — the earlier `.bind()` is simply discarded:

```js
function Foo(val) { this.val = val; }
const boundFoo = Foo.bind({ val: "locked" });
boundFoo(999).val;         // "locked" object used (explicit binding)
new boundFoo(999).val;     // 999 — `new` wins, the locked object is ignored
```

Naming "`new` is rule 1, `.bind` is only rule 2" is the fast way to show this isn't memorized
trivia.

**Q: How do arrow functions handle `this` differently, and why did that make them the default for React event handlers before hooks existed?**

A: Arrow functions don't have their own `this` at all — they capture `this` **lexically** from the
enclosing scope at definition time (the same mechanism as closures capturing variables), and it can
never be reassigned: `.call`/`.apply`/`.bind` have no effect on an arrow function's `this`. In
class components, this sidesteps the method-extraction problem above entirely, since an arrow
function class property always reads `this` from the surrounding class instance rather than from
how it happens to be called. This is precisely why `this` mostly disappears as a concern once
you're all-in on function components + hooks — but an interviewer will test whether you understand
*why* it disappeared, not just that it did.

---

### Prototypes, `class`, and inheritance — [notes](javascript/README.md#3-prototypes-class-and-inheritance)

**Q: How does property lookup work when you access `obj.toString()` on a plain object you never defined a `toString` method on?**

A: Every object has a hidden internal link to another object — its **prototype**. When you access
a property not found directly on the object, JS automatically looks it up on the prototype, then
that object's prototype, and so on, until it reaches `null` (the end of the chain). `toString`
lives on `Object.prototype`, which sits at the end of the chain for almost every plain object —
that's where the lookup finds it.

**Q: Is `class` a different object model from prototypes, or the same thing with different syntax?**

A: The same mechanism, with nicer syntax. Methods defined in a class body live on
`ClassName.prototype` as **one shared function**, not duplicated onto every instance — `a1.speak
=== a2.speak` is `true` for two instances of the same class. Real semantic differences from manual
prototype-chaining: class bodies are strict-mode by default, methods are non-enumerable, and a
class can't be called without `new`.

**Q: What does `instanceof` actually check, and why can it return `false` for an array that "really is" an array?**

A: `obj instanceof Animal` walks `obj`'s prototype chain checking whether `Animal.prototype` (from
the *current* realm) appears anywhere in it. This breaks across realms: an array created inside a
different iframe/window has that iframe's `Array.prototype` in its chain, not the current window's
— so `arrFromOtherIframe instanceof Array` can be `false` even though it's a perfectly normal
array, just constructed via a different global's `Array` constructor.

---

### Promises & async/await — [notes](javascript/README.md#4-promises--asyncawait)

**Q: What problem does a Promise solve, and how is it different from a plain callback?**

A: Some operations take time (network requests, timers, file reads) and JS can't pause and wait
(it's single-threaded — see the event loop). Before Promises, async code passed a callback
*directly into* the operation, which the operation called back when done — workable for one step,
but deeply nested and hard to read once you chain several async steps ("callback hell"). A Promise
is an object representing "a value that doesn't exist yet but will (or won't)." Instead of passing
a callback in, the function hands you back a Promise, and you attach what to do next *onto* it via
`.then()`, which composes cleanly.

**Q: Describe a Promise's state machine precisely.**

A: Exactly one transition: pending → fulfilled, or pending → rejected. Once settled, it never
changes state again. `.then()` handlers registered *after* settlement still fire — asynchronously,
as a microtask — which is what makes Promises safe to consume regardless of timing.

**Q: What happens when a `.then` callback returns a value vs. returns another Promise?**

A: Chaining returns a new Promise each time. If a `.then` callback returns a plain value, the next
`.then` in the chain receives that value directly. If it returns a Promise, the chain
auto-flattens and waits for that inner Promise to settle before continuing — you never end up with
a "promise of a promise" that needs manual unwrapping.

**Q: How does error propagation work in a Promise chain, and what does `try`/`catch` around `await` actually catch?**

A: A rejection skips every `.then` in the chain until it hits a `.catch` (or a `.then`'s second
argument). `async`/`await` is syntax sugar that lets Promise-based code *look* synchronous, and
`try`/`catch` around an `await` gives you the same error-skipping behavior — it catches a rejected
awaited Promise, a synchronously thrown error in the `try` block, and a rejection from any further
`await` inside it (e.g. a bad `res.json()` call after an `await fetch(...)`).

**Q: Does `await` block the JS thread while it "pauses"?**

A: No. `await` unwraps a Promise's resolved value (or re-throws its rejection as a catchable
exception), but it does this by suspending the `async` function and letting other code run in the
meantime — it does not freeze the thread. It's built on the same event-loop/microtask mechanics
covered below. Also worth knowing: an `async` function **always returns a Promise**, even if you
`return` a plain value — React/JS wraps it automatically.

**Q: Know the exact resolve/reject semantics of `Promise.all`, `allSettled`, `race`, and `any` — this gets asked directly.**

A:
| Combinator | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | all fulfill | **first** rejection (short-circuits, other results discarded) |
| `Promise.allSettled` | all settle (fulfilled or rejected) | never — always resolves with per-item status |
| `Promise.race` | first settles (fulfilled or rejected) | — |
| `Promise.any` | **first** fulfillment | all reject (`AggregateError`) |

`Promise.all` is the default reach, but it's wrong when partial failure is acceptable — e.g.
loading three independent dashboard widgets where one failing shouldn't blank the whole page calls
for `allSettled`.

**Q: Can you cancel a Promise?**

A: No — a Promise itself has no built-in cancellation; once created, it will settle. "Cancelling"
an async operation actually means cancelling the *underlying work*, not the Promise object.
`fetch` supports this via `AbortController`/`AbortSignal`. Any library claiming "cancellable
promises" is really discarding the result or using this same underlying-operation-cancellation
pattern under the hood.

---

### The event loop — [notes](javascript/README.md#5-the-event-loop)

**Q: JavaScript is single-threaded — so how does async code (timers, network requests) not freeze the page?**

A: Slow operations aren't actually performed *by* JavaScript itself — they're handed off to the
browser (or Node runtime), which does the waiting outside the JS thread entirely. When that
outside work finishes, it doesn't interrupt whatever JS is currently running; it *schedules* a
callback to run later, the next time the JS thread is free. The event loop is the mechanism that
decides when "later" is.

**Q: Describe the event loop's mechanism precisely — what runs first, and what "drains" mean.**

A: The call stack (synchronous code) runs to empty. Then the **entire microtask queue** drains —
every `.then`/`.catch`, `queueMicrotask` call, and `await` continuation, *including microtasks
queued by other microtasks while draining*. Only once the microtask queue is fully empty does the
loop run exactly **one** task from the task queue (a `setTimeout`/`setInterval` callback, I/O, a
message event — informally a "macrotask"). The browser may get a chance to paint around this
point (not after every single task). Then it goes back to draining microtasks again.

**Q: Predict the output:**

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

A: `1, 4, 3, 2`. Synchronous code runs first, top to bottom: logs `1`, schedules the timeout
callback onto the task queue, schedules the `.then` callback onto the microtask queue, logs `4`.
Call stack is now empty, so the microtask queue drains before anything else: logs `3`. Only then
does the event loop pick the next task off the task queue: logs `2`. The key fact this tests:
**microtasks always fully drain before the next task runs, even a `setTimeout(fn, 0)`** — `0`ms
does not mean "immediately," it means "as soon as possible after the current synchronous code and
all pending microtasks are done."

**Q: How does the event loop relate to React's batching? Is batching a JavaScript runtime feature?**

A: They're related but distinct. The event loop explains *when* your code gets to run at all;
React's batching is a separate mechanism *layered on top* that decides, given a chunk of your code
is now running, how many `setState` calls inside it get collapsed into a single re-render.
Pre-React 18, that batching mechanism was only wired up around React's own synthetic event
handling — state updates made from inside a raw `setTimeout` callback or a Promise `.then` (code
running as its own task/microtask, outside that wiring) fell through to one re-render per update.
React 18's **automatic batching** extended the same batching mechanism to apply no matter which
task/microtask the update runs in. So: the event loop is a JS runtime feature that makes React's
batching rules legible; batching itself is React's own design decision, not something the JS
runtime provides for free.

**Q: What's the difference between concurrency and parallelism in this context?**

A: JS gives you concurrency — interleaving many logical tasks on one thread — but not parallelism
(true simultaneous execution on multiple threads). That's what Web Workers exist for: an actually
separate thread with no shared memory by default.

---

### Functional patterns — [notes](javascript/README.md#6-functional-patterns)

**Q: What's the difference between debounce and throttle? This is the single most commonly reversed pair in interviews.**

A: **Debounce** collapses a burst of calls into one, firing only after the calls *stop* for a given
delay — it cancels and reschedules on every new call. Use case: search-as-you-type, firing the
request only after the user pauses typing. **Throttle** guarantees a call fires **at most once**
per interval, regardless of how many times it's invoked, without waiting for calls to stop entirely.
Use case: scroll/resize handlers, where you want steady periodic updates *while* the event is
continuously firing. Debounce delays until quiet; throttle rate-limits during continuous activity.

**Q: What's the difference between currying and partial application?**

A: Currying transforms `f(a, b, c)` into `f(a)(b)(c)` — each call returns a new function until all
arguments are supplied, strictly one argument at a time. Partial application is the more general,
less rigid cousin: fixing *some* arguments now and supplying the rest later in one call, not
necessarily one at a time.

**Q: What is memoization, and how does it relate to `useMemo` and the React Compiler?**

A: Memoization caches a pure function's return value keyed by its arguments, trading memory for
avoiding repeated, expensive recomputation. `useMemo` is the same idea applied to a single value
inside a component render (cache the value across renders unless its dependencies change), and the
React Compiler (ch.06) automates this same pattern across a whole component automatically.
Understanding manual memoization first is what makes the compiler's behavior legible later instead
of feeling like magic.

---

### Objects & equality — [notes](javascript/README.md#7-objects--equality)

**Q: Why does `{ a: 1 } === { a: 1 }` evaluate to `false`?**

A: JS values fall into two categories. Primitives (numbers, strings, booleans, `null`, `undefined`,
symbols) are compared *by value* — `5 === 5` is `true` because they're literally the same value.
Objects (including arrays and functions) are compared *by reference* — `===` asks "are these two
variables pointing at the exact same object in memory," not "do they look structurally the same."
Two objects can be structurally identical and still not be `===` because they're two separate
allocations in memory.

**Q: Why does this matter specifically for React dependency arrays and `React.memo`?**

A: Passing a new object/array/function *literal* as a prop or a `useEffect`/`useMemo` dependency on
every render creates a new reference every single time, even if the content is "logically"
unchanged — `{ a: 1 } inline in JSX` defeats reference-equality checks. This is exactly why
`useMemo`/`useCallback` exist: to keep the *reference* stable across renders when the meaningful
content hasn't actually changed, so dependency comparisons and `memo`'s shallow prop comparison
correctly see "unchanged" instead of "new object, must re-run/re-render."

**Q: What's the difference between shallow and deep copy, and what are `structuredClone`'s limitations?**

A: `{ ...obj }`, `[...arr]`, and `Object.assign` copy only the **top level** — nested
objects/arrays are still shared references between the copy and the original:

```js
const original = { nested: { count: 1 } };
const shallow = { ...original };
shallow.nested.count = 99;
original.nested.count; // 99 — the nested object was shared, not copied
```

`structuredClone(obj)` performs a true recursive deep clone, with two *different* failure modes
worth distinguishing: functions and DOM nodes are hard-rejected — it **throws** `DataCloneError`.
Custom class instances are the more dangerous trap because there's **no error at all** — it
silently clones the plain data properties and hands back an ordinary object that has lost the
prototype chain entirely (its methods are gone, `cloned instanceof MyClass` is `false`). This
directly explains a common React bug: `setState({ ...state, nested: state.nested })` looks like an
update but doesn't create a new `nested` reference, so anything relying on that reference changing
(memoization, `useEffect` deps keyed on `nested`) won't fire.

---

### Modules — [notes](javascript/README.md#8-modules)

**Q: What problem do JS modules solve?**

A: As an app grows past one file, you need to split code across files while being explicit about
what each file makes available to others (`export`) and what it pulls in from elsewhere
(`import`), instead of every file dumping variables into one shared global namespace where
anything could collide with anything else.

**Q: Why does ESM (`import`/`export`) enable tree shaking while CommonJS (`require`) generally doesn't?**

A: ESM is statically analyzable — imports and exports are resolved at **parse time**, before any
code runs, so a bundler can prove which exports are actually used and delete the rest (tree
shaking) purely by examining the import graph statically. CommonJS resolves `require()` calls at
**runtime**, which is dynamic and generally not tree-shakeable, because the bundler can't always
prove ahead of time what a `require()` call will resolve to.

**Q: What is dynamic `import()`, and how does it relate to `React.lazy`?**

A: Dynamic `import()` returns a Promise and is evaluated at **runtime**, not parse time — it's the
primitive underneath `React.lazy()` and route-based code splitting. The bundler still statically
sees the `import()` call at build time and can split that module into its own chunk, but the
*decision to actually load it* happens at runtime, when the `import()` call executes.

---

### Memory & garbage collection — [notes](javascript/README.md#9-memory--garbage-collection)

**Q: How does garbage collection work in JavaScript, given you never manually free memory?**

A: JS uses (mostly) **mark-and-sweep**: the engine periodically walks everything reachable
starting from a set of roots (global variables, currently-running function calls, closures still
referenced somewhere), marks it as reachable, and sweeps away — reclaims the memory of — anything
that wasn't marked. The practical consequence: you don't manually free memory, you avoid
*unintentionally keeping a reference alive*. A JS "memory leak" almost always means "something is
still reachable that shouldn't be," not "memory wasn't freed."

**Q: Name common closure-shaped sources of memory leaks in a frontend app, and connect them to why `useEffect` cleanup functions matter.**

A: (1) **Event listeners never removed** — `addEventListener` without a matching
`removeEventListener` keeps the handler, and everything it closes over, alive for the DOM node's
lifetime, which can outlive the component that created it. (2) **Timers never cleared** — an
interval/timeout closure keeps its captured scope alive until cleared. (3) **Closures capturing
large objects unnecessarily** — a small callback that references one property of a large object
keeps the *whole* object reachable, not just the property actually used. This is the direct,
mechanistic reason "every Effect with a subscription/timer/listener needs a cleanup function" isn't
a style preference — the cleanup function is what breaks the reachability chain and lets the
garbage collector reclaim that memory once the component unmounts.

---

## Browser & Web Fundamentals

### The rendering pipeline — [notes](browser-and-web/README.md#1-the-rendering-pipeline)

**Q: Walk through the browser's rendering pipeline, from parsed HTML to pixels on screen.**

A: The browser parses HTML into the **DOM** (the document's element tree) and CSS into the
**CSSOM** (the parsed style rule tree). Both must be ready before the **render tree** can be
built — the DOM filtered down to only visible nodes, each merged with its computed styles. Then
**Layout** (a.k.a. reflow) computes the exact size and position of every render-tree node — this
can cascade, since changing one element's size can shift everything after it, which is why it's
expensive. Then **Paint** fills in actual pixels (text, colors, borders, shadows) into layers.
Finally **Composite** combines the painted layers onto the screen, potentially using the GPU —
`transform`/`opacity` changes can be composited without a repaint, which is why animating those two
properties is cheap and animating `width`/`top` is expensive (they force layout).

**Q: What's the precise difference between reflow and repaint, and why is reflow the more expensive one to trigger repeatedly?**

A: A **repaint** is needed when visual appearance changes without affecting geometry/layout (e.g.
`color`, `background`). A **reflow** is needed when geometry changes (e.g. `width`, adding or
removing a DOM node) — and a reflow always triggers a repaint afterward, but not vice versa. Since
reflow can cascade through the whole layout tree and always drags a repaint along with it, it's
the more expensive operation, and the one worth avoiding triggering repeatedly in a loop.

**Q: What is "layout thrashing," and how do you avoid it? How does this connect to `useLayoutEffect`?**

A: Layout thrashing is the specific performance bug where you interleave DOM writes and DOM
*reads* in a loop — e.g. reading `offsetHeight` immediately after writing a style — which forces
the browser to synchronously recompute layout on every single read instead of batching writes
together. The fix is batching all reads first, then all writes. This is why measuring a DOM node
(`ref.current.getBoundingClientRect()`) in a render-adjacent code path needs care, and it's part of
why `useLayoutEffect` exists (ch.04): it runs synchronously after DOM mutations but before the
browser paints, specifically so you can measure-and-adjust without a visible flash — at the cost
of blocking paint if the work inside it is heavy.

---

### Storage & browser APIs — [notes](browser-and-web/README.md#2-storage--browser-apis-application-programming-interfaces)

**Q: Compare `localStorage`, `sessionStorage`, cookies, IndexedDB, and the Cache API.**

A:
| Mechanism | Persists? | Size | Sync/Async | Sent with every HTTP request? |
|---|---|---|---|---|
| `localStorage` | Yes (until cleared) | ~5-10MB | Sync | No |
| `sessionStorage` | Tab lifetime only | ~5-10MB | Sync | No |
| Cookies | Configurable expiry | ~4KB | Sync (via `document.cookie`) | **Yes**, automatically |
| IndexedDB | Yes | Large | Async | No |
| Cache API | Yes (until evicted) | Large | Async | No — intercepts/serves requests |

**Q: What's the single fact about these mechanisms that matters most for a frontend/security interview?**

A: **Cookies are the only one of these automatically attached to outgoing requests.** That's
exactly why cookie-based auth and the `HttpOnly` flag matter (ch.12) — a cookie the browser
controls and attaches itself is a fundamentally different security shape than a token your own JS
code has to manually read out of storage and attach to each request (which also means it's
readable by any script running on the page, i.e. vulnerable to exfiltration via XSS in a way an
`HttpOnly` cookie is not).

---

### Networking — [notes](browser-and-web/README.md#3-networking)

**Q: Walk through what happens, at a conceptual level, when a browser makes a request to a server.**

A: The browser resolves the hostname to an IP address via **DNS**. It then establishes a **TCP**
connection (a reliable, ordered connection) — for HTTPS, this is followed by a **TLS** handshake,
the encryption negotiation that turns HTTP into HTTPS. Once connected, the browser sends the HTTP
request; the server replies with response headers and a body; the browser parses and renders the
result.

**Q: Explain the difference between HTTP/1.1, HTTP/2, and HTTP/3 in terms of head-of-line blocking.**

A: **HTTP/1.1** serializes requests per connection — one at a time — which is why browsers
historically opened many parallel connections (domain sharding) as a workaround; this is
**HTTP-level** head-of-line blocking. **HTTP/2** multiplexes many request/response streams over a
*single* TCP connection, removing that HTTP-level blocking — but because it still rides on TCP, a
single lost TCP packet stalls **all** multiplexed streams on that connection until it's
retransmitted, so **TCP-level** head-of-line blocking remains. **HTTP/3** moves the transport to
QUIC over UDP, which multiplexes streams **independently at the transport layer itself** — a lost
packet only stalls the one stream it belonged to, finally removing head-of-line blocking at both
levels.

**Q: Explain the difference between `Cache-Control: max-age` and `ETag`-based caching.**

A: `Cache-Control: max-age=N` makes a response cacheable for N seconds **without even asking the
server** — the browser doesn't make a request at all until it expires. `ETag` is a fingerprint of
the response body; on the next request, the browser sends `If-None-Match: <etag>`, and the server
replies `304 Not Modified` (no body) if the content hasn't changed — this still makes a request,
but avoids re-downloading the payload. The practical distinction: `max-age` avoids the request
entirely until expiry; `ETag` still makes a request but can avoid re-transferring the body.

**Q: Why do build tools fingerprint output filenames (e.g. `app.a1b2c3.js`)?**

A: CDNs cache static assets at edge locations geographically close to the user to cut latency and
offload the origin server. Fingerprinting the filename based on content lets a CDN/browser cache
that file **forever** (a very long `max-age`), and safely bust the cache only when the content
actually changes and produces a new filename — you get maximal caching without ever serving stale
content after a deploy.

---

### The security model — [notes](browser-and-web/README.md#4-the-security-model)

**Q: What is the Same-Origin Policy, and what exactly is an "origin"?**

A: SOP is the foundational browser security boundary. An "origin" is the tuple `(scheme, host,
port)`. By default, a script from one origin cannot read the response of a request to a different
origin, and cannot read another origin's cookies, `localStorage`, or DOM.

**Q: What is CORS, and how is it different from SOP? Explain what a preflight request is and why it happens.**

A: CORS is the **opt-in relaxation** of SOP — a server explicitly allows specific other origins to
read its responses via `Access-Control-Allow-Origin` and related headers. A "simple" cross-origin
request still actually **happens** on the wire; CORS only controls whether the browser lets your
JS **read** the response afterward. A "non-simple" request (custom headers, methods other than
GET/POST/HEAD, certain content types) triggers a **preflight**: the browser sends an `OPTIONS`
request first to ask permission before sending the real one, and only sends the real request if
the server's preflight response allows it. This directly answers "why did an extra OPTIONS request
show up in the network tab."

**Q: What is XSS, and why does React protect against it by default? Where does that protection stop?**

A: XSS (Cross-Site Scripting) is an attacker getting their own JavaScript to execute in your page's
origin, typically by injecting it into content that later gets rendered as HTML or executed as a
script. React's JSX escapes values by default — text content is set via safe DOM APIs, not
`innerHTML` — so a value like `{userInput}` in JSX is always rendered as inert text, never parsed
as HTML/script, no matter what it contains. This is why XSS in React apps overwhelmingly comes from
`dangerouslySetInnerHTML` (which explicitly opts out of that protection) or from building raw HTML
strings some other way and injecting them outside React's control. Knowing *why* JSX is safe by
default — and exactly where that safety stops — is worth more in an interview than just reciting
"don't use `dangerouslySetInnerHTML`."

**Q: What is CSRF, and why do cookies specifically make it possible? Name defenses.**

A: CSRF (Cross-Site Request Forgery) is an attacker's page, on a completely different origin,
tricking the user's browser into making a request to your origin **using the user's existing
cookies** — because cookies are attached automatically to matching-domain requests regardless of
which site actually initiated the request. The bank's server sees a request with a valid session
cookie and has no way to tell it wasn't intentionally initiated by the user. Defenses: CSRF tokens
(a value the attacker's page can't read or guess and must include in the request), `SameSite`
cookies (restrict when a cookie is sent based on the request's origin), and checking custom
headers (which simple cross-origin form submissions can't set).

**Q: What is CSP, and what does it defend against that XSS-escaping alone doesn't?**

A: Content-Security-Policy is a response header that restricts what a page is *allowed* to load or
execute — scripts, styles, images, connections — as a defense-in-depth layer. Even if an attacker
somehow manages to inject a `<script>` tag (bypassing whatever escaping exists), a strict CSP can
still prevent that script from running at all, or prevent it from exfiltrating data to an
attacker-controlled origin.

**Q: What is clickjacking, and how is it defended against?**

A: Embedding your site inside an invisible `<iframe>`, layered underneath attacker-controlled UI,
so a user's real clicks land on your page without their knowledge. Defended against via
`X-Frame-Options` or CSP's `frame-ancestors` directive, both of which restrict whether your page is
allowed to be embedded in a frame at all.

---

### SPA-relevant browser concepts — [notes](browser-and-web/README.md#5-spa-single-page-application-relevant-browser-concepts)

**Q: What is the History API, and how do client-side routers use it?**

A: `pushState`/`replaceState`/`popstate` let JavaScript change the URL and browser history
**without a full page navigation/reload**. This is exactly what client-side routers like React
Router are built on top of — navigating between "pages" in a single-page app while keeping the
browser's URL bar, back button, and history stack behaving correctly, all without the browser
actually reloading the document.

**Q: What is `postMessage`, and what's the one thing you must always check when receiving a message?**

A: `postMessage` is the sanctioned way for two different-origin windows or iframes to communicate,
since SOP otherwise blocks them from touching each other's DOM/JS directly. It requires the
receiver to explicitly opt in by listening for `message` events — and the receiver should **always
verify `event.origin`** before trusting a received message, since without that check any page on
the internet could send your page a forged message pretending to be from a trusted source.

**Q: What is prefetching, and what trade-off does it make?**

A: Fetching a resource or route's data **before** it's actually needed — e.g. `<link
rel="prefetch">` or a router prefetching a route on link hover — trading bandwidth (you might fetch
something the user never navigates to) for perceived latency (the data is already there by the
time they do navigate). This is what React Router's data-mode prefetching and Next.js `<Link>`
prefetching are doing under the hood.
