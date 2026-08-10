# Chapter 00 Exercises

Framework-free — these deliberately don't touch React yet. See the parent
[`README.md`](../README.md) for how to run a kata file. Starter stubs are in
[`app/src/chapters/00-javascript-and-browser-fundamentals/`](../../../app/src/chapters/00-javascript-and-browser-fundamentals/).

## Coding katas

Implement each of these yourself before checking the reference approach in
`coding-interviews/javascript/` (they overlap deliberately — this chapter is where you first
attempt them, that folder is where you'd revisit them later under time pressure).

### 1. `debounce(fn, delay)`
Returns a debounced version of `fn`: each call resets a timer, and `fn` only actually runs
once no new call has arrived for `delay` ms. Requirements to hit deliberately:
- Arguments from the *last* call are the ones `fn` gets invoked with.
- `this` should be preserved when the debounced function is called as a method.
- Bonus: add a `.cancel()` method that cancels a pending invocation.

### 2. `throttle(fn, interval)`
Returns a throttled version of `fn` that runs **at most once** per `interval` ms, no matter how
often it's called, without waiting for calls to stop. Decide (and be able to justify) whether
your implementation fires on the *leading* edge, *trailing* edge, or both — this is a real
design decision interviewers probe, not an implementation detail.

### 3. `memoize(fn)`
Caches `fn`'s return value keyed by its arguments so repeat calls with the same arguments skip
recomputation. Start with single-primitive-argument support, then think through (doesn't have
to be fully solved): how would you key the cache for multiple arguments, or for object
arguments where `===` doesn't do what you want?

### 4. LRU Cache
A cache with a fixed capacity that evicts the **L**east **R**ecently **U**sed entry when full.
Implement `get(key)` and `put(key, value)`, each expected at O(1). (Hint: this is the textbook
Map + doubly-linked-list problem, but start with just `Map` — its insertion-order iteration
gets you most of the way there.)

## Written exercises (no code — explain out loud or in writing)

### 5. Predict the output
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 0);
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 0);
}
```
Predict the full output *in order*, then explain the mechanism (not just "let is block
scoped") — why does each `var` callback see the same value, and why doesn't each `let`
callback?

### 6. Trace the event loop
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve()
  .then(() => console.log("C"))
  .then(() => console.log("D"));
console.log("E");
```
Predict the output order and explain each step in terms of the call stack, microtask queue,
and macrotask queue — not just the final answer.

### 7. Fix the stale closure
```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds(seconds + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return <p>{seconds}</p>;
}
```
This renders `0` forever after the first tick... or does it? Predict what actually happens,
explain *why* using the closures mental model from `javascript/README.md`, then fix it two
different ways and explain the tradeoff between the two fixes.

### 8. `this` in the wild
```js
class Button {
  constructor(label) {
    this.label = label;
  }
  handleClick() {
    console.log(`clicked ${this.label}`);
  }
}
const btn = new Button("Save");
document.querySelector("#save")?.addEventListener("click", btn.handleClick);
```
This is a real bug, not a contrived one. What breaks when the click actually fires, why, and
what are the (at least two) idiomatic ways to fix it in a class?
