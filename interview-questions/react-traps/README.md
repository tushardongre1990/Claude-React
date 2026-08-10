# React Traps

A catalog of common senior-level misconceptions — things that sound plausible but are subtly
wrong. Status: index only, filled in as related chapters are completed.

## Categories planned

- **Rendering** — a state update doesn't mutate state immediately; a parent re-rendering
  doesn't necessarily mean the DOM updates; render ≠ commit; `React.memo` doesn't stop all
  re-renders.
- **Effects** — an effect is not a lifecycle-method equivalent; effects shouldn't derive state
  that could be computed during render; dependency arrays aren't a general-purpose
  optimization knob; cleanup isn't only for unmount.
- **State** — don't duplicate derived state; not everything belongs in Redux/global state;
  server state doesn't belong in client state stores (ties to
  [ch.11](../../notes/11-data-fetching-and-server-state/README.md) and
  [ch.13](../../notes/13-global-state-management/README.md)).
- **Performance** — `useMemo`/`useCallback` aren't automatically wins; memoization has real
  cost; the React Compiler changes but doesn't eliminate this reasoning (ties to
  [ch.06](../../notes/06-performance-and-react-compiler/README.md)).
- **Keys** — index-as-key isn't *always* wrong; unstable keys can silently destroy component
  state.
- **Context** — Context is not inherently a global-state-management solution; changing a
  provider's value object identity re-renders all consumers even if the "meaningful" value
  didn't change; `React.memo` on a consumer does **not** stop it from re-rendering when the
  context it reads changes.
- **React Compiler** — the compiler does not make `useMemo`/`useCallback`/`React.memo`
  "forbidden"; they remain valid manual escape hatches for cases the compiler can't or
  shouldn't handle (ties to [ch.06](../../notes/06-performance-and-react-compiler/README.md)).
- **`useEffectEvent`** — it is not "just a better `useCallback`"; it exists specifically to
  call non-reactive logic from inside an Effect without lying about the dependency array, not
  as a general performance/memoization tool (ties to
  [ch.07](../../notes/07-react-19-features/README.md)).
- **Suspense** — "Suspense fetches data" is false; Suspense coordinates rendering around
  something that suspends, the actual data source (a framework, TanStack Query, `use()`, a
  lazy import) determines how/what suspends (ties to ch.06).
- **Server Components** — `"use server"` does **not** mark a Server Component; it marks a
  Server Function. Server Components are the default in an RSC-enabled framework, not
  something opted into per-file with a directive (ties to
  [ch.17](../../notes/17-architecture-ssr-and-rsc/README.md)).
- **StrictMode + effects** — "if the dependency array is empty, the effect only runs once" is
  misleading in development, where StrictMode intentionally double-invokes effects on mount to
  surface missing cleanup; the *production* behavior differs from what you observe locally.

## Categories to also cover here (as content is added)

- JavaScript (`this`, closures, prototypes, equality) — cross-referencing ch.00
- Browser/networking (caching, CORS, cookies) — cross-referencing ch.00 and ch.12
- Security (token storage, XSS/CSRF surface) — cross-referencing ch.12
- TypeScript (narrowing, generic inference, polymorphic components) — cross-referencing ch.14
