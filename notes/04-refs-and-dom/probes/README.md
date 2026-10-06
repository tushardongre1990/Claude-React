# Chapter 04 probes: the "verified by running" claims, re-runnable

Some claims in [`../README.md`](../README.md) aren't settled by any doc, only by running React.
Examples: exactly when a ref callback fires on a re-render, whether a native listener sees a click
inside a portal, and what this repo's TypeScript says about ref types. Each such claim is backed by
a script here, so you can re-check it yourself, or re-run it after upgrading React to see what
changed.

## Run them

```bash
cd notes/04-refs-and-dom/probes
npm install          # installs the pinned react/react-dom 19.2.8 + happy-dom (first time only)
npm run all          # every probe, in order
npm run ref-callback # ...or any single one (see package.json "scripts")

# Fragment refs are a React 19.3 feature, so that probe has its own pinned install:
cd fragment-refs-19.3
npm install && npm run all
```

`tooling.mjs` and `typecheck-examples.mjs` use the **app's** TypeScript and oxlint, so they need
`npm install` in `app/` too. They write temporary files into `app/src/__probe__/` and always delete
them afterwards.

**What these can and can't show.** The React probes run React's development build against a
headless DOM ([happy-dom](https://github.com/capricorn86/happy-dom)) inside `act()`. They confirm
**order, values and messages**. They don't show paint timing, and happy-dom's focus rules are looser
than a browser's (it lets any element take focus), so focus results are only trusted where every
candidate is a genuinely focusable element.

## What each probe backs

| Script | Backs | Expected result |
|---|---|---|
| `ref-vs-state.mjs` | [§0](../README.md#sec-0), [§1](../README.md#sec-1) | Ref clicks: no render, screen stays `clicksRef=0`. After a state click the screen shows `clicksRef=3`. The plain variable counts 1, 2, 3, then restarts at 1 after the re-render. |
| `attach-timing.mjs` | [§3](../README.md#sec-3) | `null` in the first render. The old `<input>` during render of the update that removes it. Committed node (or `null`) in layout Effects and Effects. `null` after unmount. |
| `ref-callback.mjs` | [§4](../README.md#sec-4) | Inline: `ref(null)`, `ref(<input>)` (or `cleanup`, `setup`) on every re-render. `useCallback`: nothing on re-render. Strict Mode: setup, cleanup, setup on mount. Ref callback before the same component's layout Effect. |
| `imperative-handle.mjs` | [§6](../README.md#sec-6) | Handle ready in the parent's layout Effect. `createHandle` runs on every render when deps are omitted, once with `[]`. |
| `merge-refs.mjs` | [§6](../README.md#sec-6) | Naive merge: the parent callback gets `ref(null)` on unmount, no cleanup. Cleanup-aware merge: `parent callback CLEANUP(<input>)`. Two object refs: both `<input>`, then both `null`. |
| `portal.mjs` | [§7](../README.md#sec-7) | Button rendered into `#modal-root`, reads `theme=dark`. React `onClick` on the ancestor fires, the native listener doesn't. |
| `manual-dom.mjs` | [§11](../README.md#sec-11) | `Failed to execute 'removeChild' on 'Node'` after a manual `remove()` then `setState`. |
| `attributes.mjs` | [§9](../README.md#sec-9), [§10](../README.md#sec-10) | `autoFocus` focuses `#b` with no `autofocus` attribute. `inert={true}` gives `inert=""`, and `false` omits it. On 19.2.8, `<Fragment ref>` stays `null` and logs "Invalid prop … supplied to `React.Fragment`". |
| `tooling.mjs` | [§1](../README.md#sec-1), [§4](../README.md#sec-4), [§5](../README.md#sec-5) | `tsc`: TS2554 (`useRef()`), TS18047 (unchecked DOM ref), TS2322 (implicit-return ref callback, and `ref` on a component without it). `oxlint`: nothing for a ref read/written during render. |
| `typecheck-examples.mjs` | every full `.tsx` example in the notes | All 28 examples compile with the app's `tsc`, and `oxlint` reports no warnings. |
| `fragment-refs-19.3/fragment-refs.mjs` | [§10](../README.md#sec-10) | On 19.3.0: a `FragmentInstance`, no wrapper element, `focus`→`#street`, `focusLast`→`#city`, a click on the nested button reaches the listener on the `<span>`, and 3 client rects. |

If a result ever differs from this table (for example after upgrading the app to React 19.3), the
notes section it backs needs re-checking. That's the point of keeping these.
