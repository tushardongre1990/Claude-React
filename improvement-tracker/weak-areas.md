# Improvement Tracker — Weak Areas

A running log of gaps, mistakes, and slow spots noticed while working through exercises,
chapter reviews, or mock interviews. This is the single most important pre-interview reading
list — it's built from what has *actually* tripped you up, not a generic checklist.

**Format for each entry:**

```
## <short title>
- **Chapter:** <link>
- **Noticed:** <date>
- **What happened:** <the mistake, confusion, or slow answer>
- **Correct understanding:** <the fix — what should be true instead>
- **Status:** Open / Resolved (resolved <date>)
```

Newest entries at the top. Move an entry to "Resolved" (don't delete it) once you can explain
it correctly without hesitation — the history is useful evidence of progress.

---

## Explains Effects by *timing* instead of *cause*; thinks Effects re-run when external systems change
- **Chapter:** [ch.03 §0](../notes/03-side-effects-and-lifecycle/README.md#sec-0)
- **Noticed:** 2026-10-11 (quiz; came up in 2 consecutive questions, see [quiz-log.md](quiz-log.md))
- **What happened:** When asked *why* code belongs in an Effect, answered with *when* it runs
  ("on mount and when dependencies change", "because unreadCount changes"). Also stated the
  decision rule as "did the user do something, or did the external system change?"
- **Correct understanding:**
  1. Why it's an Effect: the component is on screen and must keep an **external system** (something
     outside React's tree: network, browser APIs, `document.title`, imperative DOM calls) in sync
     with its props/state. A change in a React value also re-runs render, so it can't be the reason.
  2. React can't observe external systems. An Effect re-runs only when React values in its
     dependency array change. External changes reach React through a *subscription callback* that
     the Effect set up (e.g. a `resize` listener calling `setWidth`).
- **Status:** Open. Both parts were answered correctly in later questions the same day (see
  quiz-log). Keep re-testing in later sections before marking Resolved.
