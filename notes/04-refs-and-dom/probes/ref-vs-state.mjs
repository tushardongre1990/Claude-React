// Backs: README §0 (plain variable vs ref vs state) and §1 (reading ref.current in JSX goes stale).
import { React, h, mount, click, header } from "./dom.mjs";
const { useRef, useState } = React;

const log = [];

function Demo() {
  const [count, setCount] = useState(0); // state: survives renders AND triggers one
  const clicksRef = useRef(0);           // ref: survives renders, does NOT trigger one
  let plain = 0;                         // plain variable: re-created as 0 on every render
  log.push(`render (count=${count})`);

  return h("div", null,
    h("button", {
      id: "bump-ref",
      onClick: () => {
        clicksRef.current += 1;
        plain += 1;
        log.push(`  ref click: clicksRef.current=${clicksRef.current}, plain=${plain}`);
      },
    }, "ref +1"),
    h("button", { id: "bump-state", onClick: () => setCount((c) => c + 1) }, "state +1"),
    // Reading a ref during render: the anti-pattern this probe demonstrates.
    h("p", { id: "out" }, `count=${count} clicksRef=${clicksRef.current}`),
  );
}

const { container, render } = mount();
await render(h(Demo));
const $ = (id) => container.querySelector(`#${id}`);
const screen = () => log.push(`  screen: "${$("out").textContent}"`);

screen();
for (let i = 0; i < 3; i++) await click($("bump-ref"));
screen();
await click($("bump-state"));
screen();
await click($("bump-ref"));
screen();

header("§0/§1: plain variable vs ref vs state");
console.log(log.join("\n"));
