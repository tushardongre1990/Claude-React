// Backs: README §9 (autoFocus, inert) and the React 19.3 version note (Fragment ref on 19.2.8).
import { React, h, mount, describe, header } from "./dom.mjs";
const { Fragment, useRef, useEffect } = React;

const log = [];
const errors = [];
const origError = console.error;
console.error = (...args) => errors.push(String(args[0]).split("\n")[0]);

// autoFocus: does React focus the element on mount, and does it write the attribute?
{
  const { container, render } = mount();
  await render(h("div", null, h("input", { id: "a" }), h("input", { id: "b", autoFocus: true })));
  const b = container.querySelector("#b");
  log.push(`autoFocus: activeElement is #${document.activeElement?.id}; outerHTML = ${b.outerHTML}`);
}

// inert as a boolean (React 19 treats it as a boolean attribute).
{
  const { container, render } = mount();
  await render(h("div", null, h("section", { id: "t", inert: true }), h("section", { id: "f", inert: false })));
  log.push(`inert={true}:  ${container.querySelector("#t").outerHTML}`);
  log.push(`inert={false}: ${container.querySelector("#f").outerHTML}`);
}

// A ref on <Fragment> in React 19.2.8 (Fragment refs are a 19.3 feature).
{
  let seen = "never set";
  function C() {
    const ref = useRef(null);
    useEffect(() => { seen = describe(ref.current); });
    return h(Fragment, { ref }, h("button", null, "A"), h("button", null, "B"));
  }
  const { render } = mount();
  await render(h(C));
  log.push(`Fragment ref on ${React.version}: ref.current after commit = ${seen}`);
}

console.error = origError;
header("§9 + version note: autoFocus, inert, Fragment ref");
console.log(log.join("\n"));
console.log(errors.length ? `console.error: ${errors.join(" | ")}` : "(no console.error)");
