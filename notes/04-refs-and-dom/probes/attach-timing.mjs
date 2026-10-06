// Backs: README §3 (when React sets ref.current for a DOM ref: render vs layout Effect vs Effect,
// conditional rendering, unmount).
import { React, act, h, mount, describe, header } from "./dom.mjs";
const { useRef, useEffect, useLayoutEffect } = React;

const log = [];
let outsideRef; // lets the driver read the ref after unmount

function App({ show, label }) {
  const inputRef = useRef(null);
  outsideRef = inputRef;
  log.push(`render(${label}): inputRef.current = ${describe(inputRef.current)}`);

  useLayoutEffect(() => {
    log.push(`  layout Effect: inputRef.current = ${describe(inputRef.current)}`);
  });
  useEffect(() => {
    log.push(`  Effect:        inputRef.current = ${describe(inputRef.current)}`);
  });

  return show ? h("input", { ref: inputRef }) : h("p", null, "no input");
}

const { root, render } = mount();
log.push("--- mount with show=true");
await render(h(App, { show: true, label: "1" }));
log.push("--- re-render, show still true");
await render(h(App, { show: true, label: "2" }));
log.push("--- show=false (input removed)");
await render(h(App, { show: false, label: "3" }));
log.push("--- show=true again (new input created)");
await render(h(App, { show: true, label: "4" }));
log.push("--- unmount");
await act(() => root.unmount());
log.push(`  after unmount: inputRef.current = ${describe(outsideRef.current)}`);

header("§3: when a DOM ref is attached");
console.log(log.join("\n"));
