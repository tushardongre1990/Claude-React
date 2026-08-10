# Chapter 18: Frontend Application Architecture

**Status:** Not Started
**Folder:** `notes/18-frontend-application-architecture/`

## Why this chapter matters for a 5-10 YOE interview
"How would you structure a large React codebase" is a standard senior/staff-adjacent question that pure-hooks knowledge doesn't answer.

## Topics to cover

- Feature-based vs domain-based vs component-based folder structure
- Layering a codebase: components / hooks / services / lib / types — what belongs where and why
- Component design principles: single responsibility, composition, coupling & cohesion, dependency inversion, separation of concerns
- The state-placement decision framework: local state → lifted state → context → server state → global client state, and how to justify each step
- Reusable/shared UI vs feature-specific components
- Module boundaries and dependency direction: preventing circular dependencies and preventing
  one feature from reaching into another feature's internal implementation (e.g.
  `features/orders` may depend on `shared/*`, but not on `features/users/internal/*`)
- Scaling patterns as a codebase and team grow

## What you'll build
A refactor of an earlier chapter's flat project into a feature-based structure, with a written justification for each state-placement decision.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
