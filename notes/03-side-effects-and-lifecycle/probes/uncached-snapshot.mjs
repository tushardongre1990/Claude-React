// Backs: README §11 (trap 1: getSnapshot returning a new object every call).
import { React, h, mount, header } from "./dom.mjs";
const { useSyncExternalStore } = React;

const originalError = console.error;
const captured = [];
console.error = (...args) => captured.push(String(args[0]));

const store = { x: 1 };
function BadSnapshot() {
  const snap = useSyncExternalStore(() => () => {}, () => ({ x: store.x })); // new object every call
  return h("span", null, snap.x);
}

header("§11: uncached getSnapshot");
try {
  await mount(h(BadSnapshot)).render();
  console.log("render: no error");
} catch (e) {
  console.log(`render threw: ${e.message.split(".")[0]}.`);
}
console.log("console.error: " + [...new Set(captured)].join(" | "));
console.error = originalError;
