# Debugging Scenarios

Open-ended, verbal-answer production scenarios — these test investigation process, not API (Application Programming Interface)
recall. Status: index only, filled in alongside
[ch.16](../../notes/16-error-handling-debugging-and-observability/README.md).

## Scenarios planned

- "Users report the page is slow, but it's fast on your machine — how do you investigate?"
- "A bug only reproduces in production, never in dev or staging."
- "An Error Boundary isn't catching an error you expected it to catch."
- "Memory usage climbs the longer a user stays on a page."
- "A form submission occasionally double-submits."
- "A list re-renders far more often than it should — how do you find out why, from cold?"
- "A hydration mismatch warning appears in production only."
- "An API endpoint occasionally returns stale data even though the server has the latest —
  where do you even start looking?" (forces reasoning across browser cache, HTTP (HyperText Transfer Protocol) caching,
  TanStack Query cache, request races, abort/cancellation, and query invalidation — ties to
  [ch.11](../../notes/11-data-fetching-and-server-state/README.md) and
  [ch.12](../../notes/12-api-integration-auth-and-security/README.md))
