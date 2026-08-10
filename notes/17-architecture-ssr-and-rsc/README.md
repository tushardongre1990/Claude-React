# Chapter 17: Architecture, SSR & React Server Components

**Status:** Not Started
**Folder:** `notes/17-architecture-ssr-and-rsc/`

## Why this chapter matters for a 5-10 YOE interview
RSC questions are one of the least-rehearsed parts of senior React interviews right now — high leverage to prep well.

## Topics to cover

- CSR vs SSR vs SSG vs ISR — trade-offs
- Server Components vs Client Components — the mental model
- Trap to explicitly correct: there is no directive that marks a Server Component — `"use
  server"` marks a Server Function, not a component; Server Components are the default in an
  RSC-enabled framework, not something you opt into per-file
- Hydration: what it is, and what causes hydration mismatches
- Streaming SSR and Suspense boundaries (builds on the Suspense fundamentals from ch.06)
- Next.js App Router basics (enough for interview-level discussion)
- Server Functions / Server Actions overview (terminology consistent with ch.07)
- When NOT to reach for SSR/RSC

## What you'll build
A minimal Next.js App Router page mixing Server and Client Components with streaming.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
