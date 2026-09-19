// Backs: README §4 (the canonical stale closure).
import { React, act, h, mount, wait, header } from "./dom.mjs";
const { useEffect, useState } = React;

const seen = new Set();
let setOuter;

function Ticker() {
  const [count, setCount] = useState(0);
  setOuter = setCount;
  useEffect(() => {
    const id = setInterval(() => seen.add(`interval sees count=${count}`), 10);
    return () => clearInterval(id);
  }, []); // reads `count` but doesn't list it
  return h("span", null, `rendered count=${count}`);
}

const { root, container, render } = mount(h(Ticker));
await render();
await act(() => setOuter(5));
await wait(40);
header("§4: stale interval (state set to 5 before the interval fires)");
console.log(container.textContent);
console.log([...seen].join("\n"));
await act(() => root.unmount());
