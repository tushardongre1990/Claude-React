// Shared setup: a headless DOM (happy-dom) plus React in development mode.
// Every probe imports this FIRST, before React, so React sees `window`/`document`.
import { Window } from "happy-dom";

process.env.NODE_ENV = "development"; // dev build: warnings + Strict Mode behaviour

const win = new Window();
globalThis.window = win;
globalThis.document = win.document;
globalThis.IS_REACT_ACT_ENVIRONMENT = true; // lets us use act() to flush work synchronously

export const React = await import("react");
export const { createRoot } = await import("react-dom/client");
export const { act, createElement: h } = React;

// NOTE: act() flushes Effects synchronously, so these probes confirm ORDER, not paint timing.
export function mount(element) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  return { container, root, render: (el) => act(() => root.render(el ?? element)) };
}

export const wait = (ms) => act(() => new Promise((r) => setTimeout(r, ms)));

export function header(title) {
  console.log(`\n===== ${title} =====`);
}
