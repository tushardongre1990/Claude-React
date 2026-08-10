# Chapter 12: API Integration, Authentication & Security

**Status:** Not Started
**Folder:** `notes/12-api-integration-auth-and-security/`

## Why this chapter matters for a 5-10 YOE interview
"Where would you store a JWT?" and "how do you handle a 401 mid-session" are classic senior questions that most React-only prep skips entirely.

## Topics to cover

- REST vs GraphQL — conceptual overview and trade-offs for a frontend consumer
- API client abstraction: interceptors/middleware, base client design
- Authentication models: session-based auth, JWT, access + refresh tokens, cookie-based auth
- Token storage trade-offs: memory vs localStorage vs HttpOnly cookies, and why storage choice matters for XSS exposure
- Cookie flags: HttpOnly, Secure, SameSite
- Authorization: RBAC, permissions, feature flags, route protection, UI-level vs backend-level authorization
- Error taxonomy: network error vs 401/403/404/409/422/429/500 vs timeout/abort vs validation vs business error — and how the UI should differ for each
- Retries, exponential backoff, request cancellation, timeouts
- Idempotency and safe retries: what should happen when a request (e.g. a POST) actually
  succeeded server-side but the response was lost — when is it safe for the client to retry,
  and how does idempotency-key design address this?
- Pagination strategies: offset vs cursor-based
- Realtime overview: polling vs WebSockets vs Server-Sent Events

## What you'll build
An API client layer with interceptors, typed error handling, and a token-refresh flow against a mock auth API.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
