// Backs: README §7 (portals: where the DOM ends up, React-tree event bubbling, context).
import { React, ReactDOM, h, mount, click, header } from "./dom.mjs";
const { createContext, useContext } = React;
const { createPortal } = ReactDOM;

const log = [];
const Theme = createContext("light");

const modalRoot = document.createElement("div");
modalRoot.id = "modal-root";
document.body.appendChild(modalRoot);

function PortalButton() {
  const theme = useContext(Theme); // context crosses the portal
  return h("button", { id: "in-portal" }, `theme=${theme}`);
}

function App() {
  return h(Theme.Provider, { value: "dark" },
    h("div", {
      id: "card",
      style: { overflow: "hidden" },
      onClick: () => log.push("  React onClick on #card fired (React tree)"),
    },
      h("p", null, "inside card"),
      createPortal(h(PortalButton), modalRoot),
    ),
  );
}

const { container, render } = mount();
await render(h(App));

// A NATIVE listener on #card: only fires if the click passes through #card in the DOM tree.
container.querySelector("#card").addEventListener("click", () =>
  log.push("  native listener on #card fired (DOM tree)"));

log.push(`#root innerHTML:       ${container.innerHTML}`);
log.push(`#modal-root innerHTML: ${modalRoot.innerHTML}`);
log.push("--- click the button inside the portal");
await click(modalRoot.querySelector("#in-portal"));
if (!log.some((l) => l.includes("native"))) log.push("  (native listener on #card did NOT fire)");

header("§7: portals");
console.log(log.join("\n"));
