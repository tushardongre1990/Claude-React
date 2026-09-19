// Exercise 3: CleanupAudit — five Effects, five different cleanup bugs
// Problem statement: notes/03-side-effects-and-lifecycle/exercises/README.md
//
// The `tracked*` helpers below do the real thing (they call window.addEventListener, setInterval,
// etc.) AND keep live counts, which the stats panel shows. With every component fixed, the panel
// should read 2 listeners / 1 interval / 1 connection / 1 widget while mounted (in Strict Mode
// too), and all zeros after "toggle mount". Toggle a few times: a leak is a number that only grows.
// Also click "switch room": exactly one connection should be open, for the CURRENT room.
//
// Rules: fix each component WITHOUT touching the tracked* helpers, and without adding a
// "has this run already?" ref guard anywhere (notes §6 explains why that's the wrong fix).

import { useEffect, useRef, useState } from "react";

// ── Instrumentation (don't edit) ──────────────────────────────────────────────────────────────
const liveListeners = new Map<string, Set<EventListener>>();
const liveIntervals = new Set<number>();
const openConnections = new Set<string>();
let widgetsAlive = 0;

function trackedAddListener(type: string, fn: EventListener) {
  window.addEventListener(type, fn);
  if (!liveListeners.has(type)) liveListeners.set(type, new Set());
  liveListeners.get(type)!.add(fn); // keyed by function identity, exactly like the real DOM
}

function trackedRemoveListener(type: string, fn: EventListener) {
  window.removeEventListener(type, fn);
  liveListeners.get(type)?.delete(fn); // a different function object removes nothing
}

function trackedSetInterval(fn: () => void, ms: number) {
  const id = window.setInterval(fn, ms);
  liveIntervals.add(id);
  return id;
}

function trackedClearInterval(id: number) {
  window.clearInterval(id);
  liveIntervals.delete(id);
}
void trackedClearInterval; // you'll need this for Bug 2 — delete this line once you do

let nextConnectionId = 0;
function connect(room: string) {
  const id = `${room}#${++nextConnectionId}`;
  openConnections.add(id);
  return {
    disconnect() {
      openConnections.delete(id);
    },
  };
}

// A pretend third-party widget that must be destroyed with the same instance it was created with.
class FakeWidget {
  destroyed = false;
  node: HTMLElement;
  constructor(node: HTMLElement) {
    this.node = node;
    widgetsAlive++;
  }
  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      widgetsAlive--;
    }
  }
}

// ── Bug 1: no cleanup ─────────────────────────────────────────────────────────────────────────
function ResizeWatcher() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
    }
    trackedAddListener("resize", onResize);
    // TODO
  }, []);

  return <p>1. width: {width}px</p>;
}

// ── Bug 2: interval never cleared ─────────────────────────────────────────────────────────────
function Countdown() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    trackedSetInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    // TODO
  }, []);

  return <p>2. countdown: {seconds}s</p>;
}

// ── Bug 3: the cleanup LOOKS right ────────────────────────────────────────────────────────────
function ScrollLogger() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    trackedAddListener("scroll", () => setScrollY(window.scrollY));
    return () => trackedRemoveListener("scroll", () => setScrollY(window.scrollY));
  }, []);

  return <p>3. scrollY: {scrollY}</p>;
}

// ── Bug 4: ref read at cleanup time ───────────────────────────────────────────────────────────
// Hint: read notes §5, "React 17: cleanup became asynchronous". React clears a DOM ref (nodeRef)
// when the element is removed — does it ever clear a ref you assign yourself (widgetRef)?
// Check the widget count after toggling off.
function WidgetHost() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<FakeWidget | null>(null);

  useEffect(() => {
    widgetRef.current = new FakeWidget(nodeRef.current!);
    return () => {
      widgetRef.current?.destroy();
    };
  }, []);

  return <div ref={nodeRef}>4. widget host</div>;
}
// ^ This one is subtle: it may already work. Explain precisely WHY it works (or doesn't), then
//   rewrite it in the pattern the React 17 release notes recommend so it doesn't depend on a
//   mutable ref still holding the right instance when cleanup runs.

// ── Bug 5: the "Strict Mode fix" ──────────────────────────────────────────────────────────────
function ChatConnection({ room }: { room: string }) {
  const didConnect = useRef(false);

  useEffect(() => {
    if (didConnect.current) return;
    didConnect.current = true;
    connect(room);
  }, [room]);

  return <p>5. chat: {room}</p>;
}

// ── Harness (don't edit) ─────────────────────────────────────────────────────────────────────
function StatsPanel() {
  const [, forceRender] = useState(0);

  // A correctly cleaned-up Effect, for reference: poll the counts twice a second.
  useEffect(() => {
    const id = window.setInterval(() => forceRender((n) => n + 1), 500);
    return () => window.clearInterval(id);
  }, []);

  const listenerCount = [...liveListeners.values()].reduce((sum, set) => sum + set.size, 0);
  return (
    <pre className="rounded bg-slate-900 p-3 text-xs">
      {`window listeners: ${listenerCount}   (resize + scroll → expect 2)
intervals:        ${liveIntervals.size}
connections:      ${openConnections.size}   ${[...openConnections].join(", ")}
widgets alive:    ${widgetsAlive}`}
    </pre>
  );
}

export function CleanupAudit() {
  const [mounted, setMounted] = useState(true);
  const [room, setRoom] = useState("general");

  return (
    <div className="space-y-3 p-6 text-left">
      <div className="flex gap-2">
        <button onClick={() => setMounted((m) => !m)}>toggle mount</button>
        <button onClick={() => setRoom((r) => (r === "general" ? "travel" : "general"))}>
          switch room (now {room})
        </button>
      </div>
      {mounted && (
        <>
          <ResizeWatcher />
          <Countdown />
          <ScrollLogger />
          <WidgetHost />
          <ChatConnection room={room} />
        </>
      )}
      <StatsPanel />
    </div>
  );
}
