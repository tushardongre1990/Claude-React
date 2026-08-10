# Chapter 06: Performance, Memoization & the React Compiler

**Status:** Not Started
**Folder:** `notes/06-performance-and-react-compiler/`

## Why this chapter matters for a 5-10 YOE interview
Performance debugging is where senior candidates are separated from mid-level ones — expect a live 'why is this slow' exercise, and current interviews increasingly probe React Compiler understanding.

## Topics to cover

- Why components re-render: parent renders, state changes, context changes
- React.memo, useMemo, useCallback — what they actually do, and when they help vs hurt
- The React Compiler: why manual memoization existed, what the compiler does (and doesn't do), limitations, debugging compiler-related behavior, migrating an existing app
- React DevTools Profiler workflow
- List virtualization (windowing) for large datasets
- Code splitting with lazy() and Suspense
- Browser-level performance: layout thrashing, long tasks blocking the main thread, requestAnimationFrame, Web Workers (overview)
- Bundle & network performance: tree shaking, chunking, bundle analysis, image/font loading
- Case studies: identifying and fixing unnecessary re-renders

## What you'll build
A slow list-rendering demo, profiled and fixed step by step (memoization vs compiler vs virtualization).

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
