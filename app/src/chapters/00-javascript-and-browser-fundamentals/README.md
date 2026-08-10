# Chapter 00 — Starter Files

Framework-free TypeScript katas. See
[`notes/00-javascript-and-browser-fundamentals/exercises/README.md`](../../../../notes/00-javascript-and-browser-fundamentals/exercises/README.md)
for the full problem statements.

Run any file directly with Node's built-in TypeScript type stripping (no build step, no extra
dependency):

```bash
node --experimental-strip-types debounce.ts
node --experimental-strip-types throttle.ts
node --experimental-strip-types memoize.ts
node --experimental-strip-types lru-cache.ts
```

Each file has a `// TODO` implementation stub followed by a small self-check at the bottom
that runs automatically when you execute the file — get the asserts passing.

**Node's type-stripping mode doesn't support all TypeScript syntax** — it erases types but
doesn't transform anything. In particular, **constructor parameter properties**
(`constructor(private x: number)`) aren't supported; declare the field and assign it in the
constructor body instead (see `lru-cache.ts` for the pattern). Enums and a few other
TS-specific runtime constructs hit the same limitation. If you hit
`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`, this is why.
