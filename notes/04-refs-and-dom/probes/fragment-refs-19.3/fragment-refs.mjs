// Backs: README §10 (Fragment refs, React 19.3). Pinned to react/react-dom 19.3.0.
import { Window } from "happy-dom";

process.env.NODE_ENV = "development";
const win = new Window();
globalThis.window = win;
globalThis.document = win.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const React = await import("react");
const { createRoot } = await import("react-dom/client");
const { act, createElement: h, Fragment, useRef, useEffect } = React;

const log = [];
let fragRef;

function Fields() {
  const ref = useRef(null);
  fragRef = ref;
  useEffect(() => {
    const onClick = (e) => log.push(`  fragment listener: click on <${e.currentTarget.tagName.toLowerCase()} id=${e.currentTarget.id}>`);
    ref.current.addEventListener("click", onClick);
    return () => ref.current?.removeEventListener("click", onClick);
  }, []);
  // No wrapper element: the Fragment's children sit directly inside #root.
  // (Only inputs/buttons here: happy-dom lets ANY element take focus, unlike a browser, so a
  // <p> or <span> as first/last child would make focus()/focusLast() results meaningless.)
  return h(Fragment, { ref },
    h("input", { id: "street" }),
    h("span", { id: "actions" }, h("button", { id: "save" }, "Save")),
    h("input", { id: "city" }),
  );
}

const container = document.createElement("div");
container.id = "root";
document.body.appendChild(container);
await act(() => createRoot(container).render(h(Fields)));

const inst = fragRef.current;
log.push(`React ${React.version}: ref.current is a ${inst.constructor.name}`);
log.push(`DOM: ${container.innerHTML}`);
await act(() => inst.focus());
log.push(`focus():     activeElement = #${document.activeElement.id}`);
await act(() => inst.focusLast());
log.push(`focusLast(): activeElement = #${document.activeElement.id}`);
await act(() => inst.blur());
log.push(`blur():      activeElement = <${document.activeElement.tagName.toLowerCase()}>`);
log.push("--- click #save (nested inside a <span>, not a first-level child)");
await act(() => container.querySelector("#save").click());
log.push(`getClientRects(): returns ${inst.getClientRects().length} rects (one per first-level child)`);

console.log("\n===== §10: Fragment refs on React 19.3.0 =====");
console.log(log.join("\n"));
