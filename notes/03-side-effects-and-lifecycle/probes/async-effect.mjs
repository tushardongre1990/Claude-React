// Backs: README §5 ("You can't pass an async function to useEffect").
import { format } from "node:util";
import { React, act, h, mount, header } from "./dom.mjs";
const { useEffect } = React;

const originalError = console.error;
const captured = [];
console.error = (...args) => captured.push(format(...args)); // expand React's %s placeholders

function AsyncEffect() {
  useEffect(async () => { await null; }, []);
  return null;
}

header("§5: useEffect(async () => ...)");
const { root, render } = mount(h(AsyncEffect));
await render();
console.log("dev warning (first lines):\n" + captured.join("\n").split("\n").slice(0, 4).join("\n"));
try {
  await act(() => root.unmount());
  console.log("unmount: no error");
} catch (e) {
  console.log(`unmount threw: ${e.constructor.name}: ${e.message}`);
}
console.error = originalError;
