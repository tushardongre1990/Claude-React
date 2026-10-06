// Backs: README §4 (ref callbacks: inline vs stable, cleanup vs legacy null call, Strict Mode,
// order relative to layout Effects).
import { React, act, h, mount, describe, header } from "./dom.mjs";
const { useState, useCallback, useLayoutEffect, StrictMode } = React;

let log = [];
let bump; // lets the driver trigger an unrelated re-render

function useForceRender() {
  const [, set] = useState(0);
  bump = () => set((n) => n + 1);
}

// A. Inline callback, NO cleanup returned (pre-React-19 style).
function InlineNoCleanup() {
  useForceRender();
  log.push("render");
  return h("input", { ref: (node) => { log.push(`  ref(${describe(node)})`); } });
}

// B. Inline callback that RETURNS a cleanup (React 19 style).
function InlineWithCleanup() {
  useForceRender();
  log.push("render");
  return h("input", {
    ref: (node) => {
      log.push(`  setup(${describe(node)})`);
      return () => log.push(`  cleanup(${describe(node)})`);
    },
  });
}

// C. Stable callback (same function every render, via useCallback).
function StableWithCleanup() {
  useForceRender();
  log.push("render");
  const refCb = useCallback((node) => {
    log.push(`  setup(${describe(node)})`);
    return () => log.push(`  cleanup(${describe(node)})`);
  }, []);
  return h("input", { ref: refCb });
}

// D. Order: ref callback vs the same component's useLayoutEffect.
function Order() {
  useLayoutEffect(() => { log.push("  layout Effect runs"); }, []);
  return h("input", { ref: (node) => { log.push(`  ref callback(${describe(node)})`); return () => {}; } });
}

async function run(title, Comp, { strict = false } = {}) {
  log = [];
  const { root, render } = mount();
  log.push("--- mount");
  await render(strict ? h(StrictMode, null, h(Comp)) : h(Comp));
  if (!strict) {
    log.push("--- unrelated re-render");
    await act(() => bump());
  }
  log.push("--- unmount");
  await act(() => root.unmount());
  header(title);
  console.log(log.join("\n"));
}

await run("§4 A: inline callback, no cleanup", InlineNoCleanup);
await run("§4 B: inline callback with cleanup", InlineWithCleanup);
await run("§4 C: stable (useCallback) callback with cleanup", StableWithCleanup);
await run("§4 Strict Mode: stable callback with cleanup, mount only", StableWithCleanup, { strict: true });

log = [];
const m = mount();
await m.render(h(Order));
header("§4 D: ref callback vs layout Effect in the same component");
console.log(log.join("\n"));
