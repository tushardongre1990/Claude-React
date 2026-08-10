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
memoize), object equality, modules, and memory/GC.

### Browser & Web Fundamentals

Full notes: [`browser-and-web/README.md`](browser-and-web/README.md) — the rendering pipeline,
storage APIs, networking/caching, the browser security model (SOP/CORS/XSS/CSRF/CSP), and
SPA-relevant concepts (History API, `postMessage`, prefetching).

## Exercises

See [`exercises/README.md`](exercises/README.md) for the full problem set. Starter files live
in [`app/src/chapters/00-javascript-and-browser-fundamentals/`](../../app/src/chapters/00-javascript-and-browser-fundamentals/).

**How to run a kata** — these are deliberately framework-free, so you don't need the Vite dev
server. Node 22+ can run TypeScript files directly via type stripping:

```bash
cd app
node --experimental-strip-types src/chapters/00-javascript-and-browser-fundamentals/debounce.ts
```

(The `ExperimentalWarning` printed to stderr is expected and harmless — it's Node telling you
the flag itself is still experimental, not that anything is wrong.)

## What you'll build
Framework-free JS katas (debounce/throttle/memoize/LRU cache) plus written 'trace the event
loop' and closure-bug exercises — no React yet, deliberately.

---
When you've worked through the notes and exercises, say so and this chapter's `revision.md`
will get filled in and its status moved to `Done`.
