// Exercise 2: throttle
// Problem statement: notes/00-javascript-and-browser-fundamentals/exercises/README.md
//
// Requirements:
// - `fn` runs at most once per `interval` ms, no matter how often the throttled
//   function is called.
// - Decide (and be able to justify in the revision notes) whether you fire on the
//   leading edge, trailing edge, or both. The self-check below assumes LEADING edge —
//   adjust it if you deliberately choose a different design, but be able to explain why.

import assert from "node:assert";

type AnyFn = (...args: any[]) => void;

function throttle<T extends AnyFn>(fn: T, interval: number): T {
  // TODO: implement (leading-edge behavior assumed by the check below)
  throw new Error("not implemented");
}

// --- self-check (runs when you execute this file directly) ---
async function check() {
  let calls = 0;
  const throttled = throttle(() => calls++, 50);

  throttled(); // fires immediately (leading edge) -> calls = 1
  throttled(); // within the window -> ignored
  throttled(); // within the window -> ignored
  assert.strictEqual(calls, 1, "only the first call in the window should fire immediately");

  await new Promise((r) => setTimeout(r, 60));
  throttled(); // new window -> fires again
  assert.strictEqual(calls, 2, "a call after the interval elapses should fire again");

  console.log("throttle: all checks passed");
}

check().catch((err) => {
  console.error(err);
  process.exit(1);
});
