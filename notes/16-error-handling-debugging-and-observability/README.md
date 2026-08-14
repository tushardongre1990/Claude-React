# Chapter 16: Error Handling, Debugging & Observability

**Status:** Not Started
**Folder:** `notes/16-error-handling-debugging-and-observability/`

## Why this chapter matters for a 5-10 YOE interview
"Users say it's slow" and "why doesn't this Error Boundary catch that" are exactly the kind of production-reasoning questions that separate 5-10 YOE candidates from tutorial-level ones.

## Topics to cover

- Error Boundaries: what they catch, and why they do NOT catch event-handler or async errors
- Route-level error boundaries (ties into ch.10)
- Handling async/promise errors and event-handler errors explicitly
- Fallback UI (User Interface) and retry UX (User Experience) patterns
- Logging and error tracking (conceptual — e.g. Sentry-style tooling)
- React DevTools Profiler workflow (cross-ref ch.06)
- Browser DevTools: network panel, performance panel, memory panel, source maps
- Production debugging playbook: 'the page is slow for some users' / 'only production has this bug' — how to investigate

## What you'll build
A component tree with layered error boundaries and a deliberately-broken async flow to practice diagnosing and fixing.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
