# Chapter 09: Forms in Depth

**Status:** Not Started
**Folder:** `notes/09-forms-in-depth/`

## Why this chapter matters for a 5-10 YOE interview
Forms touch state, validation, accessibility, and now Actions — a compact way to test breadth in one exercise.

## Topics to cover

- Native uncontrolled forms with FormData
- React 19 Actions-based forms (<form action={fn}>)
- useActionState + useFormStatus in a real multi-field form
- Controlled forms with validation using React Hook Form
- Schema validation with Zod
- Multi-step forms and dynamic field arrays
- Accessibility in forms: labels, error announcements, focus on error
- `useId` for generating stable, SSR (Server-Side Rendering)-safe unique IDs to wire up `<label htmlFor>`/`aria-describedby`
  pairs without hardcoding strings (which breaks when a component is rendered more than once)
  or using `Math.random()`/incrementing counters (which cause SSR/client hydration mismatches
  — see ch.17); not for list `key`s, which is the most common misuse to flag as a trap

## What you'll build
A multi-step signup form with Zod validation and Actions-based submission.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
