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
