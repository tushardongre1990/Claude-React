# Explain-This-Output Questions

Status: index only — snippets and answers get added as we work through chapters (each chapter
that motivates a good "explain this" snippet contributes one or two here).

## Categories planned

- **React rendering & state** — e.g. calling `setCount(count + 1)` three times in a row vs
  `setCount(c => c + 1)` three times; what actually gets committed and why (ties to
  [ch.02](../../notes/02-state-and-events/README.md)).
- **Effects & closures** — stale closure snippets, dependency array mistakes (ties to
  [ch.00](../../notes/00-javascript-and-browser-fundamentals/README.md) and
  [ch.03](../../notes/03-side-effects-and-lifecycle/README.md)).
- **Event loop / async** — ordering of `setTimeout`, `Promise.then`, `async/await`,
  `queueMicrotask` (ties to ch.00).
- **Context & re-renders** — snippets where a value that "looks" memoized still causes
  consumers to re-render.
- **TypeScript narrowing** — snippets testing whether a discriminated union is narrowed
  correctly (ties to [ch.14](../../notes/14-typescript-with-react/README.md)).
- **Plain JavaScript** — `this` binding surprises, prototype chain lookups, closures inside
  loops, reference vs value equality (ties to ch.00).
- **Browser & networking** — caching-header behavior, CORS preflight triggers, cookie
  attribute effects (ties to ch.00 and
  [ch.12](../../notes/12-api-integration-auth-and-security/README.md)).
- **Security** — snippets where a seemingly-safe pattern is actually XSS/CSRF-exposed (ties to
  ch.12).
- **React 19 / 19.2 APIs** — `use()`, `useActionState`, `useOptimistic`, `useEffectEvent`,
  `<Activity>` output/behavior questions (ties to
  [ch.07](../../notes/07-react-19-features/README.md)).
- **RSC/SSR** — Server vs Client Component boundaries, what actually executes where, hydration
  mismatch snippets (ties to [ch.17](../../notes/17-architecture-ssr-and-rsc/README.md)).
