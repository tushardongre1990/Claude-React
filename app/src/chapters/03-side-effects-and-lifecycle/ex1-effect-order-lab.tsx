// Exercise 1: EffectOrderLab — predict first, then run
// Problem statement: notes/03-side-effects-and-lifecycle/exercises/README.md
//
// Nothing to implement here. The lab is fully wired: a Parent renders a Child, and each has one
// useLayoutEffect and one useEffect that log their setup and cleanup (with the `dep` value they
// closed over) into the log panel.
//
// BEFORE clicking anything, write your predictions for these three actions in the comment block
// at the bottom of this file:
//   1. The initial mount (remember main.tsx wraps the app in <StrictMode>).
//   2. Clicking "change dep".
//   3. Clicking "toggle mount" (unmount).
// Then run it and compare. The expected production order is in notes §2, the Strict Mode order in §6.
// Afterwards, sort what you saw into "documented guarantee" vs "observed in this React version"
// (notes §2 draws that line; don't treat child-first order as a contract).

import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";

// ── A tiny external log store (this is §11's pattern — you don't need to edit it) ──────────────
let lines: string[] = [];
const listeners = new Set<() => void>();
let notifyScheduled = false;

function notify() {
  listeners.forEach((listener) => listener());
}

function log(line: string) {
  lines = [...lines, line]; // new array → new snapshot
  // Components log during render too, and one component must not trigger another component's
  // update in the middle of rendering. So subscribers are notified in a microtask, after React
  // has finished the current synchronous work.
  if (!notifyScheduled) {
    notifyScheduled = true;
    queueMicrotask(() => {
      notifyScheduled = false;
      notify();
    });
  }
}

function clearLog() {
  lines = [];
  notify();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return lines;
}

// ── The components under test ───────────────────────────────────────────────────────────────
function Child({ dep }: { dep: string }) {
  log(`render Child(${dep})`);

  useLayoutEffect(() => {
    log(`  layout setup Child(${dep})`);
    return () => log(`  layout cleanup Child(${dep})`);
  }, [dep]);

  useEffect(() => {
    log(`  effect setup Child(${dep})`);
    return () => log(`  effect cleanup Child(${dep})`);
  }, [dep]);

  return <div className="ml-4 rounded border border-slate-600 p-2">Child (dep = {dep})</div>;
}

function Parent({ dep }: { dep: string }) {
  log(`render Parent(${dep})`);

  useLayoutEffect(() => {
    log(`  layout setup Parent(${dep})`);
    return () => log(`  layout cleanup Parent(${dep})`);
  }, [dep]);

  useEffect(() => {
    log(`  effect setup Parent(${dep})`);
    return () => log(`  effect cleanup Parent(${dep})`);
  }, [dep]);

  return (
    <div className="rounded border border-slate-500 p-2">
      Parent (dep = {dep})
      <Child dep={dep} />
    </div>
  );
}

// The log display subscribes on its own. If EffectOrderLab subscribed instead, every log line
// would re-render EffectOrderLab → re-render Parent → log "render Parent" → notify → re-render...
// an infinite loop. Keeping the subscriber a sibling means only this panel re-renders.
function LogPanel() {
  const logLines = useSyncExternalStore(subscribe, getSnapshot);
  return (
    <pre className="max-h-[32rem] overflow-auto rounded bg-slate-900 p-3 text-xs">
      {logLines.join("\n")}
    </pre>
  );
}

const DEPS = ["a", "b", "c", "d", "e"];

export function EffectOrderLab() {
  const [depIndex, setDepIndex] = useState(0);
  const [mounted, setMounted] = useState(true);

  const dep = DEPS[depIndex % DEPS.length];

  return (
    <div className="space-y-4 p-6 text-left">
      <div className="flex gap-2">
        <button onClick={() => { log(`--- change dep → ${DEPS[(depIndex + 1) % DEPS.length]}`); setDepIndex((i) => i + 1); }}>
          change dep
        </button>
        <button onClick={() => { log(mounted ? "--- unmount" : "--- mount"); setMounted((m) => !m); }}>
          toggle mount
        </button>
        <button onClick={clearLog}>clear log</button>
      </div>

      {mounted && <Parent dep={dep} />}

      <LogPanel />
    </div>
  );
}

/*
  ── YOUR PREDICTIONS (write these BEFORE running) ──

  1. Initial mount, in Strict Mode:


  2. "change dep" (a → b):


  3. "toggle mount" (unmount):


  ── AFTER RUNNING: what surprised you? ──

*/
