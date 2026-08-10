# Chapter 00: JavaScript & Browser Fundamentals for React Interviews

**Status:** Not Started
**Folder:** `notes/00-javascript-and-browser-fundamentals/`

> **Note:** This chapter is split into two subfolders (`javascript/` and `browser-and-web/`) since it covers two related but distinct bodies of knowledge.

## Why this chapter matters for a 5-10 YOE interview
A large share of 'why does this React code do that' interview questions are actually JavaScript or browser questions in disguise (closures, the event loop, reference equality). Senior interviews also test these independently of React entirely.

## Topics to cover

### JavaScript Fundamentals

See [`javascript/README.md`](javascript/README.md). Topics:

- Closures: lexical scope, closures in loops, stale closures, closures inside React hooks
- `this` binding: implicit vs explicit binding, arrow functions, method-extraction bugs
- Prototype chain, `class`, inheritance, `Object.create`, `instanceof`
- Promises: states, chaining, async/await, error propagation, Promise.all/allSettled/race/any
- The event loop: call stack, microtask vs macrotask queue, setTimeout vs Promise vs queueMicrotask — and how this relates to React's rendering/batching behavior
- Functional patterns: debounce, throttle, currying, partial application, memoization
- Objects & equality: shallow vs deep copy, structuredClone, spread, reference equality (why this matters for React state updates and dependency arrays)
- Modules: ESM vs CommonJS, tree shaking, dynamic imports
- Memory: garbage collection basics, common leak sources (closures, event listeners, timers)

### Browser & Web Fundamentals

See [`browser-and-web/README.md`](browser-and-web/README.md). Topics:

- Rendering pipeline: DOM, CSSOM, render tree, layout, paint, compositing, reflow/repaint, layout thrashing
- Storage & browser APIs: localStorage/sessionStorage, cookies, IndexedDB (overview), Cache API
- Networking: HTTP/1.1 vs 2 vs 3 basics, request lifecycle, caching headers, ETags, CDNs
- Security model: same-origin policy, CORS, XSS, CSRF, CSP, clickjacking
- Auth-adjacent browser concepts: JWTs, cookie flags (HttpOnly/Secure/SameSite) — expanded further in ch.12
- SPA-relevant browser concepts: History API, iframes, postMessage, prefetching

## What you'll build
Framework-free JS katas (debounce/throttle/memoize/LRU cache) plus written 'trace the event loop' exercises — no React yet, deliberately.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
