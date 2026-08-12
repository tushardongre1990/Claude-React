# Chapter 00 — Starter Files

Framework-free TypeScript katas. See
[`notes/00-javascript-and-browser-fundamentals/exercises/README.md`](../../../../notes/00-javascript-and-browser-fundamentals/exercises/README.md)
for the full problem statements.

Run any file directly with Node's built-in TypeScript type stripping (no build step, no extra
dependency). Check `node --version` first:

```bash
# Node 22.18+ / 23.6+ / 24+ — type stripping is on by default, no flag needed
node debounce.ts

# Node 22.6-22.17 — the flag is still required
node --experimental-strip-types debounce.ts
```
(same for `throttle.ts`, `memoize.ts`, `lru-cache.ts`)

Each file has a `// TODO` implementation stub followed by a small self-check at the bottom
that runs automatically when you execute the file — get the asserts passing.

**Type stripping erases types but doesn't transform anything** — TypeScript syntax that needs
actual transformation still isn't supported, even on newer Node. In particular, **constructor
parameter properties** (`constructor(private x: number)`) aren't supported; declare the field
and assign it in the constructor body instead (see `lru-cache.ts` for the pattern). Enums and
namespaces with runtime code hit the same limitation. If you hit
`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`, this is why.
