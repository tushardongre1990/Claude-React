// Backs: README §6 (merging refs). Compares a naive mergeRefs (assigns, never propagates cleanups)
// with one that propagates React 19 ref-callback cleanups.
import { React, act, h, mount, describe, header } from "./dom.mjs";
const { useMemo, useRef } = React;

let log = [];

// ❌ Naive: calls each ref with the node, and with null on detach. Ignores returned cleanups.
function naiveMergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

// ✅ React 19-aware: keeps each ref's own cleanup and runs them all on detach.
function mergeRefs(...refs) {
  return (node) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") {
        const cleanup = ref(node);
        return typeof cleanup === "function" ? cleanup : () => ref(null);
      }
      if (ref) {
        ref.current = node;
        return () => { ref.current = null; };
      }
      return () => {};
    });
    return () => cleanups.forEach((c) => c());
  };
}

let parentObjectRef;
function Input({ ref, merge }) {
  const innerRef = useRef(null);
  const merged = useMemo(() => merge(innerRef, ref), [ref, merge]);
  return h("input", { ref: merged, onFocus: () => innerRef.current.select() });
}

// The parent passes a React-19-style callback ref (returns a cleanup, expects never to get null).
const parentCallback = (node) => {
  log.push(`  parent callback ref(${describe(node)})`);
  return () => log.push(`  parent callback CLEANUP(${describe(node)})`);
};

for (const [title, merge] of [["naive mergeRefs", naiveMergeRefs], ["cleanup-aware mergeRefs", mergeRefs]]) {
  log = [];
  const { root, render } = mount();
  log.push("--- mount");
  await render(h(Input, { ref: parentCallback, merge }));
  log.push("--- unmount");
  await act(() => root.unmount());
  header(`§6: ${title}, parent passes a callback ref with cleanup`);
  console.log(log.join("\n"));
}

// Object refs: both inner and parent object refs get the node, then null.
{
  log = [];
  parentObjectRef = { current: null };
  let inner;
  function Probe() {
    const innerRef = useRef(null);
    inner = innerRef;
    const merged = useMemo(() => mergeRefs(innerRef, parentObjectRef), []);
    return h("input", { ref: merged });
  }
  const { root, render } = mount();
  await render(h(Probe));
  log.push(`after mount:   inner=${describe(inner.current)}, parent=${describe(parentObjectRef.current)}`);
  await act(() => root.unmount());
  log.push(`after unmount: inner=${describe(inner.current)}, parent=${describe(parentObjectRef.current)}`);
  header("§6: cleanup-aware mergeRefs with two object refs");
  console.log(log.join("\n"));
}
