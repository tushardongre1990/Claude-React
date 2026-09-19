// Exercise 2: StaleClosureLab — three stale-closure bugs, three different fixes
// Problem statement: notes/03-side-effects-and-lifecycle/exercises/README.md
//
// Each component below is deliberately broken. `npm run lint` will warn about most of them —
// that warning IS the stale-closure detector (notes §3/§4). Don't silence it; fix the code.
//
// For each one, before fixing: write down in a comment WHICH render's value the stale function is
// reading, and why React never gave it a newer one.

import { useEffect, useState } from "react";

// ── Part A ─────────────────────────────────────────────────────────────────────────────────────
// Symptom: goes 0 → 1, then looks frozen, even though the interval keeps firing.
// TODO: fix it so it counts up once per second WITHOUT recreating the interval on every tick.
export function BrokenTicker() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Ticker: {count}</p>;
}

// ── Part B ─────────────────────────────────────────────────────────────────────────────────────
// The ticker should add `step` every second. Changing `step` should take effect on the NEXT tick,
// but must NOT restart the interval (i.e. must not reset the one-second rhythm).
// Symptom: changing step does nothing.
// TODO: fix it. Then fix it a second way, and note in a comment which approach you'd ship and why:
//   (1) add `step` to the dependencies (what does that do to the interval's timing?)
//   (2) useEffectEvent (React 19.2 — notes §12)
export function StepTicker() {
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setTotal((t) => t + step);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p>Total: {total}</p>
      <label>
        step:{" "}
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="w-16 text-black"
        />
      </label>
    </div>
  );
}

// ── Part C ─────────────────────────────────────────────────────────────────────────────────────
// Pressing Enter anywhere on the page should "submit" the current draft.
// Symptom: it always submits the draft from the first render (an empty string).
// TODO: fix it. Then answer: with the dependency-array fix, how many times is the keydown
// listener removed and re-added while typing "hello"? Is that a problem here?
export function EnterToSubmit() {
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        setSubmitted((s) => [...s, draft]);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="type, then press Enter"
        className="text-black"
      />
      <ul>
        {submitted.map((s, i) => (
          <li key={i}>submitted: "{s}"</li>
        ))}
      </ul>
    </div>
  );
}

export function StaleClosureLab() {
  return (
    <div className="space-y-6 p-6 text-left">
      <BrokenTicker />
      <StepTicker />
      <EnterToSubmit />
    </div>
  );
}
