# Chapter 00: JavaScript & Browser Fundamentals for React Interviews

**Status:** In Progress
**Folder:** `notes/00-javascript-and-browser-fundamentals/`

> **Note:** This chapter is split into two subfolders (`javascript/` and `browser-and-web/`) since it covers two related but distinct bodies of knowledge.

## Why this chapter matters for a 5-10 YOE interview
A large share of 'why does this React code do that' interview questions are actually JavaScript or browser questions in disguise (closures, the event loop, reference equality). Senior interviews also test these independently of React entirely.

## Topics to cover

### JavaScript Fundamentals

Full notes: [`javascript/README.md`](javascript/README.md) — closures, `this` binding,
prototypes/class, Promises, the event loop, functional patterns (debounce/throttle/curry/
memoize), object equality, modules, and memory/GC. Each section starts from a plain-language
explanation and builds up to interview-level precision — you don't need prior depth on these
topics going in, just comfort with everyday JS (variables, functions, arrays, objects).

### Browser & Web Fundamentals

Full notes: [`browser-and-web/README.md`](browser-and-web/README.md) — the rendering pipeline,
storage APIs, networking/caching, the browser security model (SOP/Same-Origin Policy,
CORS/Cross-Origin Resource Sharing, XSS/Cross-Site Scripting, CSRF/Cross-Site Request Forgery,
CSP/Content-Security-Policy), and SPA (Single Page Application)-relevant concepts (History API,
`postMessage`, prefetching).

## Exercises

See [`exercises/README.md`](exercises/README.md) for the full problem set. Starter files live
in [`app/src/chapters/00-javascript-and-browser-fundamentals/`](../../app/src/chapters/00-javascript-and-browser-fundamentals/).

**How to run a kata** — these are deliberately framework-free, so you don't need the Vite dev
server. Node can run TypeScript files directly via type stripping — the exact invocation
depends on your installed Node version (check with `node --version`):

- **Node 22.6-22.17:** requires the flag —
  `node --experimental-strip-types src/chapters/00-javascript-and-browser-fundamentals/debounce.ts`
  (the `ExperimentalWarning` on stderr is expected and harmless).
- **Node 22.18+ / 23.6+ / 24+:** type stripping is **on by default**, no flag needed —
  just `node src/chapters/00-javascript-and-browser-fundamentals/debounce.ts`.
- **Below Node 22.6:** type stripping isn't available at all; either upgrade Node or ask for a
  `tsx`-based alternative.

Either way, TypeScript syntax that requires actual *transformation* (not just erasure) still
isn't supported even on newer Node — most relevantly, constructor **parameter properties**
(`constructor(private x: number)`), enums, and namespaces with runtime code. `lru-cache.ts`
already avoids this; if you write your own class-based solution, declare fields explicitly
instead (see that file for the pattern) rather than using parameter-property shorthand.

## What you'll build
Framework-free JS katas (debounce/throttle/memoize/LRU cache) plus written 'trace the event
loop' and closure-bug exercises — no React yet, deliberately.

---
When you've worked through the notes and exercises, say so and this chapter's `revision.md`
will get filled in and its status moved to `Done`.
