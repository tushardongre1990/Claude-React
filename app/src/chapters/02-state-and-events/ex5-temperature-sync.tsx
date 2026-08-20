// Exercise 5: TemperatureSync — lifting state up, and resetting with `key`
// Problem statement: notes/02-state-and-events/exercises/README.md
//
// The version below is DELIBERATELY BROKEN: each TemperatureInput owns its own state, so the
// two boxes never agree. Run it, confirm the problem, then follow the docs' three steps:
//   1. remove state from the children
//   2. pass hardcoded data down from the parent (actually do this step)
//   3. add state to the parent and pass the handlers down
//
// Constraint for step 3: the parent holds exactly TWO state variables — the typed value, and
// which scale it was typed in — and DERIVES the other scale during render. Storing both
// temperatures is the duplication anti-pattern from §8.

import { useState } from "react";

type Scale = "c" | "f";

export function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

export function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9;
}

// --- the broken starting point ---------------------------------------------------------------

function TemperatureInput({ scale }: { scale: Scale }) {
  // TODO (step 1): delete this state; take `value` and `onChange` as props instead.
  const [value, setValue] = useState("");

  return (
    <label className="block">
      Temperature in {scale === "c" ? "Celsius" : "Fahrenheit"}:{" "}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </label>
  );
}

export function TemperatureSync() {
  // TODO (step 3): lift the state here.
  //   const [value, setValue] = useState('');
  //   const [scale, setScale] = useState<Scale>('c');
  // ...then derive the OTHER scale's displayed value during render.

  return (
    <div className="p-6 space-y-4">
      <TemperatureInput scale="c" />
      <TemperatureInput scale="f" />
      {/* TODO: render a "the water would boil / would not boil" message derived from the
          Celsius value. Derived during render — no state for it. */}

      <MeasurementSession />
    </div>
  );
}

// --- step 4: resetting child state with `key` -------------------------------------------------

function Notes() {
  // Local scratchpad state. This is what must get wiped when the session changes — and it must
  // be wiped via `key`, NOT by mirroring the session prop into state and clearing it.
  const [text, setText] = useState("");
  return (
    <textarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="session notes..."
    />
  );
}

function MeasurementSession() {
  const [sessionId, setSessionId] = useState("morning");

  return (
    <div>
      <select value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
        <option value="morning">morning</option>
        <option value="afternoon">afternoon</option>
        <option value="evening">evening</option>
      </select>

      {/* TODO: make switching sessions reset the scratchpad. One prop. */}
      <Notes />
    </div>
  );
}
