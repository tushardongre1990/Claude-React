# Chapter 07: React 19 & 19.2: Modern APIs

**Status:** Not Started
**Folder:** `notes/07-react-19-features/`

> **Note:** Verify exact API (Application Programming Interface) shapes/behavior against the current React docs when this chapter is unlocked — the 19.2 APIs listed here were newer at curriculum-design time and details may have evolved.

## Why this chapter matters for a 5-10 YOE interview
This is the headline chapter — interviewers explicitly probe whether your React knowledge is current or stuck at React 17/18.

## Topics to cover

- Actions: passing async functions to transitions and forms
- useActionState (replaces useFormState)
- useFormStatus for pending UI (User Interface) in forms
- useOptimistic for optimistic UI updates
- The use() API for reading promises/context conditionally (incl. inside conditionals/loops)
- Ref as a prop (no forwardRef) + ref cleanup functions
- Document metadata support (title/meta tags rendered from components)
- Improved hydration error diagnostics
- React 19.2: <Activity> for keeping hidden UI state alive
- React 19.2: useEffectEvent for splitting reactive vs non-reactive effect logic — teach this
  as "how to call non-reactive logic from an Effect without lying about dependencies," not as
  a generic dependency-array escape hatch (that misconception is worth its own entry in
  `interview-questions/react-traps/`)
- React 19.2: cacheSignal and other Server Components-era additions
- React 19.2: Performance Tracks, partial pre-rendering, related SSR (Server-Side Rendering)/Suspense changes (conceptual — deep dive in ch.17)
- Server Functions & Server Actions — conceptual overview (deep dive in ch.17); a Server
  Function becomes a "Server Action" specifically when used in an action context — don't
  teach the two terms as strict synonyms
- Migration notes and breaking changes from React 18

## What you'll build
A form rewritten with Actions + useActionState + useFormStatus + useOptimistic end to end, plus a small useEffectEvent refactor of a ch.03 example.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
