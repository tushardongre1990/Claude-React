# Chapter 06: Performance, Memoization & the React Compiler

**Status:** Not Started
**Folder:** `notes/06-performance-and-react-compiler/`

## Why this chapter matters for a 5-10 YOE interview
Performance debugging is where senior candidates are separated from mid-level ones — expect a live 'why is this slow' exercise, and current interviews increasingly probe React Compiler understanding.

## Topics to cover

- Why components re-render: parent renders, state changes, context changes
- React.memo, useMemo, useCallback — what they actually do, and when they help vs hurt
- Concurrent UI (User Interface) APIs (Application Programming Interfaces): `useTransition`/`startTransition` and `useDeferredValue` — urgent vs
  non-urgent updates (e.g. keeping a search input responsive while a large result list update
  is deferred/interruptible); underlying scheduling concepts covered fully in ch.19
- **Suspense fundamentals** (the canonical treatment — ch.07/11/17 build on this rather than
  re-explaining it): what suspension means, fallback boundaries, nested Suspense, reveal
  order, Suspense + transitions, lazy loading, and how it relates to (but is distinct from)
  data fetching — Suspense coordinates rendering around something that suspends, it does not
  itself fetch data
- The React Compiler, in depth: why manual memoization existed; what the compiler analyzes
  and automatically memoizes; the Rules of React the compiler depends on; what causes
  compilation to bail out; `eslint-plugin-react-hooks` compiler-aware linting; incremental
  adoption strategy; debugging compiler-related behavior; library/compiler compatibility;
  manual `useMemo`/`useCallback`/`React.memo` as escape hatches that remain valid, not
  "forbidden," under the compiler
- React DevTools Profiler workflow
- List virtualization (windowing) for large datasets
- Code splitting with lazy() and Suspense
- Browser-level performance: layout thrashing, long tasks blocking the main thread, requestAnimationFrame, Web Workers (overview)
- Bundle & network performance: tree shaking, chunking, bundle analysis, image/font loading
- Case studies: identifying and fixing unnecessary re-renders

## What you'll build
A slow list-rendering demo, profiled and fixed step by step (memoization vs compiler vs
virtualization vs transitions). When this chapter is unlocked, actually enable the React
Compiler in `app/` (via its Vite/Babel integration) and compare behavior with it on vs off,
rather than only reading about it.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
