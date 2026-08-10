# Chapter 01: Foundations: JSX, Rendering & Components

**Status:** Not Started
**Folder:** `notes/01-foundations/`

## Why this chapter matters for a 5-10 YOE interview
Interviewers use this to check you can explain *why* React works the way it does, not just recite syntax you've used for years on autopilot.

## Topics to cover

- JSX syntax, expressions, and how it compiles (React.createElement / the modern JSX transform)
- Functional components + hooks vs class components — why modern React favors functions,
  while classes remain supported for compatibility (and Error Boundaries historically require
  them — see ch.16)
- Props: passing, default values, children, composition over configuration
- What triggers a render; render phase vs commit phase (conceptual intro, deep dive in ch.19)
- Keys and lists: why keys matter, common key anti-patterns (index as key pitfalls)
- Conditional rendering patterns and their trade-offs
- `createRoot`: the client rendering API introduced in React 18, still the standard entry
  point in React 19 (not a React-19-specific feature — get this precise for interviews)
- Strict Mode: why effects/renders double-invoke in development

## What you'll build
A small component tree (profile card + list) to practice props, composition, and keys.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
