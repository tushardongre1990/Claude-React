# Chapter 03 probes — the "verified by running" claims, re-runnable

Some claims in [`../README.md`](../README.md) aren't settled by any doc, only by running React.
Examples are cross-component Effect order, React's exact warning text, and what this repo's
linter reports. Each such claim is backed by a script here, so you can re-check it yourself, or
re-run it after upgrading React to see what changed.

## Run them

```bash
cd notes/03-side-effects-and-lifecycle/probes
npm install          # installs the pinned react/react-dom 19.2.8 + happy-dom (first time only)
npm run all          # every probe, in order
npm run effect-order # ...or any single one (see package.json "scripts")
```

`tooling.mjs` uses the **app's** TypeScript and oxlint, so it needs `npm install` in `app/` too.
It writes temporary files into `app/src/__probe__/` and always deletes them afterwards.

**What these can and can't show.** The React probes run React's development build against a
headless DOM ([happy-dom](https://github.com/capricorn86/happy-dom)) inside `act()`. `act()` flushes
Effects synchronously, so these confirm **order and messages**, not paint timing. For order in a
real browser, run exercise 1
([`ex1-effect-order-lab.tsx`](../../../app/src/chapters/03-side-effects-and-lifecycle/ex1-effect-order-lab.tsx)).

## What each probe backs

| Script | Backs | Expected result on React 19.2.8 |
|---|---|---|
| `effect-order.mjs` | [§2](../README.md#sec-2), [§6](../README.md#sec-6), [§7](../README.md#sec-7) | Setups child-first, layout before regular, all cleanups before any setups on update, parent-first unmount. The Strict Mode run adds mount → simulated unmount → remount. Declaring `useEffect` above `useLayoutEffect` doesn't change layout-first. |
| `stale-interval.mjs` | [§4](../README.md#sec-4) | The screen shows `count=5` while the interval logs only `count=0`. |
| `async-effect.mjs` | [§5](../README.md#sec-5) | The "must not return anything besides a function" warning, then `TypeError: destroy is not a function` on unmount. |
| `uncached-snapshot.mjs` | [§11](../README.md#sec-11) | "The result of getSnapshot should be cached…" then "Maximum update depth exceeded". |
| `insertion-timing.mjs` | [§7](../README.md#sec-7) | Insertion setup sees an empty DOM on mount but its own updated text on update. Cleanup/setup interleave per component. |
| `tooling.mjs` | [§1](../README.md#sec-1), [§3](../README.md#sec-3), [§5](../README.md#sec-5), [§12](../README.md#sec-12) | `tsc`: TS2345 for the async Effect. `oxlint`: flags the async Effect and the missing `n`/`id` deps, not the setter, and nothing for an omitted Effect Event. |

If a result ever differs from this table (for example after upgrading React to 19.3), the notes
section it backs needs re-checking. That's the point of keeping these.
