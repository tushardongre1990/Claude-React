// Exercise 4: EventLab — propagation, delegation, and the two `e.` methods
// Problem statement: notes/02-state-and-events/exercises/README.md
//
// Work through the six numbered steps in the exercises README, in order, predicting the output
// before each run. The log panel keeps the firing order visible.

import { useEffect, useState } from "react";

export function EventLab() {
  const [log, setLog] = useState<string[]>([]);
  const add = (line: string) => setLog((prev) => [...prev, line]);

  // Step 5: a plain (non-React) listener on `document`. Does it fire before or after the React
  // handlers below? Does the button's stopPropagation() stop it? Explain the answer in terms of
  // where React actually attaches its own listener (React 17+: the root container).
  useEffect(() => {
    function nativeHandler() {
      add("document (native addEventListener)");
    }
    document.addEventListener("click", nativeHandler);
    return () => document.removeEventListener("click", nativeHandler);
  }, []);

  return (
    <div className="p-6">
      {/* Step 2: add onClickCapture here and predict where it lands in the order. */}
      <div
        className="border p-4"
        onClick={(e) => add(`outer div — target=${e.target} currentTarget=${e.currentTarget}`)}
      >
        outer div
        <div className="border p-4" onClick={() => add("inner div")}>
          inner div
          {/* Step 3: add e.stopPropagation() to this handler and re-run steps 1 and 2. */}
          <button className="border p-2" onClick={() => add("button")}>
            <span onClick={() => add("span")}>click me (span)</span>
          </button>
        </div>
      </div>

      {/* Step 6: run this WITHOUT preventDefault first — watch the page reload and the log
          wipe itself — then add it. */}
      <form
        className="mt-4"
        onSubmit={() => {
          add("form submitted");
        }}
      >
        <input name="q" defaultValue="hello" />
        <button type="submit">submit</button>
      </form>

      <button className="mt-4" onClick={() => setLog([])}>
        clear log
      </button>

      <ol className="mt-4 font-mono text-sm">
        {log.map((line, i) => (
          <li key={i}>
            {i + 1}. {line}
          </li>
        ))}
      </ol>
    </div>
  );
}

// Step 4 hint: `e.target` and `e.currentTarget` are DOM nodes, so logging them directly is
// noisy. Log `e.target.tagName` / `e.currentTarget.tagName` instead (TypeScript will want a
// cast or a narrowing check — deal with it however you like; the typing of event targets is a
// ch.14 topic).
