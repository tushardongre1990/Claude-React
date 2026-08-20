// Exercise 1: BatchingLab — predict first, then run
// Problem statement: notes/02-state-and-events/exercises/README.md
//
// The five handlers below are ALREADY WRITTEN on purpose. Do not run this yet.
//
// Step 1: for each of A-E, write down two predictions in the PREDICTIONS block below:
//         (a) what `count` is after ONE click, (b) how many times BatchingLab runs as a result.
// Step 2: run it and compare. The render counter and log panel report both for you.
// Step 3: only then, implement handleF — increment by exactly 3 AND cause exactly one render.

import { useRef, useState } from "react";

// --- PREDICTIONS (fill in before running) ---
// A: count = ?   renders = ?
// B: count = ?   renders = ?
// C: count = ?   renders = ?
// D: count = ?   renders = ?
// E: count = ?   renders = ?
// F: count = ?   renders = ?
// --------------------------------------------

export function BatchingLab() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // A render counter that survives re-renders without causing one (refs are ch.04 — for now,
  // just know `renders.current` is a mutable box React keeps between renders).
  const renders = useRef(0);
  renders.current += 1;

  function mark(label: string) {
    // Records the render count at the moment a button was clicked, so you can see how many
    // renders each handler caused (compare consecutive rows).
    setLog((prev) => [...prev, `${label}: clicked at render #${renders.current}`]);
  }

  function handleA() {
    mark("A");
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  function handleB() {
    mark("B");
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  function handleC() {
    mark("C");
    setCount(count + 5);
    setCount((c) => c + 1);
  }

  function handleD() {
    mark("D");
    setCount(count + 5);
    setCount((c) => c + 1);
    setCount(42);
  }

  function handleE() {
    mark("E");
    setTimeout(() => {
      setCount(count + 1);
      setCount(count + 1);
      setCount(count + 1);
    }, 0);
  }

  function handleF() {
    mark("F");
    // TODO: increment count by exactly 3, causing exactly ONE re-render.
    throw new Error("not implemented");
  }

  return (
    <div className="p-6 font-mono">
      <p className="text-2xl">count = {count}</p>
      <p className="text-sm text-gray-500">
        component has run {renders.current} time(s) since mount
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={handleA}>A</button>
        <button onClick={handleB}>B</button>
        <button onClick={handleC}>C</button>
        <button onClick={handleD}>D</button>
        <button onClick={handleE}>E (setTimeout)</button>
        <button onClick={handleF}>F (yours)</button>
        <button
          onClick={() => {
            setCount(0);
            setLog([]);
          }}
        >
          reset
        </button>
      </div>

      <ul className="mt-4 text-sm">
        {log.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}

// Note: Strict Mode double-invokes the component function in development, so the raw render
// count is inflated. What matters is the DIFFERENCE between consecutive rows in the log, and
// whether that difference is the same for A and B. Think about why that is before deciding the
// numbers are "wrong."
