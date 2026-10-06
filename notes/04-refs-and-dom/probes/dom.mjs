// Shared setup: a headless DOM (happy-dom) plus React in development mode.
// Every probe imports this FIRST, before React, so React sees `window`/`document`.
import { Window } from "happy-dom";

process.env.NODE_ENV = "development"; // dev build: warnings + Strict Mode behaviour

const win = new Window();
globalThis.window = win;
globalThis.document = win.document;
globalThis.HTMLElement = win.HTMLElement;
globalThis.IS_REACT_ACT_ENVIRONMENT = true; // lets us use act() to flush work synchronously

export const React = await import("react");
export const ReactDOM = await import("react-dom");
export const { createRoot } = await import("react-dom/client");
export const { act, createElement: h } = React;

// NOTE: act() flushes Effects synchronously, so these probes confirm ORDER, not paint timing.
export function mount() {
  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);
  const root = createRoot(container);
  return { container, root, render: (el) => act(() => root.render(el)) };
}

// Simulate a real click (bubbles through the DOM, so React's root listener sees it).
export const click = (el) => act(() => { el.click(); });

// Short description of whatever a ref holds: a DOM node, null, or a plain value.
export function describe(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (value && typeof value === "object" && "tagName" in value) return `<${value.tagName.toLowerCase()}>`;
  return JSON.stringify(value);
}

export function header(title) {
  console.log(`\n===== ${title} =====`);
}
