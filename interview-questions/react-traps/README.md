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
  didn't change.
