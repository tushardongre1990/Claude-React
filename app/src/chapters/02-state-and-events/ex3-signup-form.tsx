// Exercise 3: SignupForm — controlled inputs, and the uncontrolled twin
// Problem statement: notes/02-state-and-events/exercises/README.md
//
// Three parts, all in this one file so you can compare them side by side:
//   A. Fully controlled  — React state owns every value.
//   B. Uncontrolled      — the DOM owns the values; read them at submit with FormData.
//   C. The warning       — reproduce "changing an uncontrolled input to be controlled", read
//                          React's actual message in the console, then fix it two ways.

import { useState } from "react";

// --- Part A: controlled ---------------------------------------------------------------------

export function SignupFormControlled() {
  // TODO: state for email (string), plan ('free' | 'pro'), acceptedTerms (boolean).
  // All three must be controlled. Note the initial values carefully — see Part C for why.

  // TODO: derive these during render. Do NOT add state variables for them.
  // const charCount = ...
  // const isValid = ...   (email contains '@' AND terms accepted)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // TODO: prevent the default full-page reload, then log the three values.
    throw new Error("not implemented");
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-2">
      <h3 className="font-bold">A — controlled</h3>
      {/* TODO: <input value={...} onChange={...} /> for email, plus a live char count */}
      {/* TODO: <select value={...} onChange={...}> with 'free' and 'pro' options */}
      {/* TODO: <input type="checkbox" checked={...} onChange={...} /> for terms */}
      {/* TODO: submit button, disabled unless isValid */}
    </form>
  );
}

// --- Part B: uncontrolled -------------------------------------------------------------------

export function SignupFormUncontrolled() {
  // No useState in this component at all. That's the point.

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // TODO: read 'email', 'plan', and 'acceptedTerms' out of `data` and log them.
    // Note what FormData gives you for an unchecked checkbox — it's not `false`.
    throw new Error("not implemented");
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-2">
      <h3 className="font-bold">B — uncontrolled</h3>
      {/* TODO: same three fields using name= plus defaultValue / defaultChecked */}
      <button type="submit">Sign up</button>
    </form>
  );
}

// --- Part C: reproduce the warning ----------------------------------------------------------

export function ControlledWarningDemo() {
  // Deliberately wrong: no initial value, so `nickname` is `undefined` on the first render,
  // which makes `value={undefined}` — an UNCONTROLLED input. The first keystroke sets it to a
  // string, which makes it controlled. React warns about the switch.
  const [nickname, setNickname] = useState<string>();

  // TODO: open the console, type in the field, and paste React's exact warning text here:
  //   "..."
  //
  // Then fix it. Two fixes both work — write both down and say which you'd prefer and why:
  //   fix 1: ...
  //   fix 2: ...

  return (
    <div className="p-6">
      <h3 className="font-bold">C — the warning</h3>
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
    </div>
  );
}
