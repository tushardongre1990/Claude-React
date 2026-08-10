# Chapter 03: Side Effects & Lifecycle

**Status:** Not Started
**Folder:** `notes/03-side-effects-and-lifecycle/`

## Why this chapter matters for a 5-10 YOE interview
Stale closures and missing cleanup are the #1 source of real-world React bugs — and a classic senior debugging interview question.

## Topics to cover

- useEffect: dependency arrays, cleanup functions, stale closure bugs
- useLayoutEffect vs useEffect — timing differences and when it matters
- StrictMode's effect double-invoke behavior in dev and what it's protecting against
- Data fetching in Effects vs router loaders vs Server Components vs Suspense-enabled sources
  vs TanStack Query — these solve different problems (an Effect synchronizes with an external
  system; a loader is route-driven; a Server Component fetches on the server; TanStack Query
  manages client-side server state; Suspense coordinates rendering around suspension). Teach
  this as a decision framework, not a simple "Effects are old, Suspense is new" replacement
  narrative
- Effect anti-patterns: syncing state that should be derived, effect chains/waterfalls
- AbortController for cancelling in-flight fetches
- useSyncExternalStore for subscribing to external (non-React) stores
- Preview: useEffectEvent for separating reactive deps from non-reactive logic — covered fully in ch.07

## What you'll build
A live-search component with proper cleanup, request cancellation, and no stale-closure bugs.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
