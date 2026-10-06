// Backs: README §11 (manually removing a node React manages, then letting React update it).
// This is react.dev's own example from learn/manipulating-the-dom-with-refs.
import { React, h, mount, click, header } from "./dom.mjs";
const { useRef, useState } = React;

const log = [];

function Counter() {
  const [show, setShow] = useState(true);
  const ref = useRef(null);
  return h("div", null,
    h("button", { id: "toggle", onClick: () => setShow(!show) }, "Toggle with setState"),
    h("button", { id: "remove", onClick: () => ref.current.remove() }, "Remove from the DOM"),
    show && h("p", { ref }, "Hello world"),
  );
}

const { container, render } = mount();
await render(h(Counter));
const $ = (id) => container.querySelector(`#${id}`);

log.push(`start:                ${container.innerHTML}`);
await click($("remove"));
log.push(`after manual remove:  ${container.innerHTML}`);
try {
  await click($("toggle"));
  log.push(`after toggle:         ${container.innerHTML}`);
} catch (e) {
  log.push(`toggle threw: ${e.name}: ${e.message.split("\n")[0]}`);
}

header("§11: changing the DOM behind React's back");
console.log(log.join("\n"));
