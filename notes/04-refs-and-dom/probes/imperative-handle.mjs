// Backs: README §6 (useImperativeHandle: what the parent's ref holds, when it's available,
// and how often createHandle re-runs with and without a dependency array).
import { React, act, h, mount, describe, header } from "./dom.mjs";
const { useRef, useState, useEffect, useLayoutEffect, useImperativeHandle } = React;

const log = [];
let bump;

function FancyInput({ ref, withDeps }) {
  const inputRef = useRef(null);
  const [, set] = useState(0);
  bump = () => set((n) => n + 1);
  useImperativeHandle(
    ref,
    () => {
      log.push("  createHandle runs");
      return { focus: () => inputRef.current.focus() };
    },
    withDeps ? [] : undefined,
  );
  return h("input", { ref: inputRef });
}

function Parent({ withDeps }) {
  const fancyRef = useRef(null);
  useLayoutEffect(() => {
    const v = fancyRef.current;
    log.push(`  parent layout Effect: keys = ${v ? JSON.stringify(Object.keys(v)) : "null"}`);
  }, []);
  useEffect(() => {
    fancyRef.current.focus();
    log.push(`  parent Effect: called focus(); activeElement = ${describe(document.activeElement)}`);
  }, []);
  return h(FancyInput, { ref: fancyRef, withDeps });
}

for (const withDeps of [false, true]) {
  const { root, render } = mount();
  log.push(`=== deps ${withDeps ? "[]" : "omitted"} ===`);
  log.push("--- mount");
  await render(h(Parent, { withDeps }));
  log.push("--- child re-renders twice");
  await act(() => bump());
  await act(() => bump());
  await act(() => root.unmount());
}

header("§6: useImperativeHandle");
console.log(log.join("\n"));
