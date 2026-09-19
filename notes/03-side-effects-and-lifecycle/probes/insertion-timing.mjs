// Backs: README §7 (useInsertionEffect: DOM timing is unspecified; cleanup/setup interleave).
import { React, h, mount, header } from "./dom.mjs";
const { useInsertionEffect, useLayoutEffect } = React;

const out = [];
let container;

function Item({ label }) {
  useInsertionEffect(() => {
    out.push(`  insertion setup ${label}  (DOM text now: "${container.textContent}")`);
    return () => out.push(`  insertion cleanup ${label}`);
  }, [label]);
  useLayoutEffect(() => {
    out.push(`  layout setup ${label}  (DOM text now: "${container.textContent}")`);
    return () => out.push(`  layout cleanup ${label}`);
  }, [label]);
  return h("span", null, label);
}

function App({ v }) {
  return h("div", null, h(Item, { label: "A" + v }), h(Item, { label: "B" + v }));
}

const m = mount();
container = m.container;
await m.render(h(App, { v: 1 }));
out.push("--- update v1 -> v2");
await m.render(h(App, { v: 2 }));
header("§7: useInsertionEffect timing");
console.log(out.join("\n"));
