# Chapter 21: Production React

**Status:** Not Started
**Folder:** `notes/21-production-react/`

## Why this chapter matters for a 5-10 YOE interview
This is what separates 'I know React' from 'I've built and maintained React applications in production' — a distinction senior interviewers explicitly probe for.

## Topics to cover

- Environment configuration and environment-specific config
- Frontend secrets: why anything bundled into client-shipped env vars (`VITE_*`,
  `NEXT_PUBLIC_*`, `REACT_APP_*`, etc.) is effectively public, and what must stay server-side
  instead — "where would you put an API secret in a Vite React app?" is a real interview
  question with the answer "not in the frontend bundle"
- Feature flags
- Logging, monitoring, error tracking, and analytics (conceptual)
- API versioning
- Caching strategy across the stack
- Deployment models and CDN usage
- CI/CD basics for a frontend app
- Rollback strategy
- Source maps and bundle analysis in production

## What you'll build
A CI pipeline config (build, typecheck, test, lint) for the app/ project, plus a written production-readiness checklist.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
