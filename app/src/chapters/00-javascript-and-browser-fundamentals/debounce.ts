// Exercise 1: debounce
// Problem statement: notes/00-javascript-and-browser-fundamentals/exercises/README.md
//
// Requirements:
// - `fn` only runs once no new call has arrived for `delay` ms.
// - The call that actually fires uses the arguments from the LAST call.
// - `this` is preserved when called as a method.
// - Bonus: a `.cancel()` method on the returned function.

import assert from "node:assert";

type AnyFn = (...args: any[]) => void;

function debounce<T extends AnyFn>(fn: T, delay: number): T & { cancel?: () => void } {
  // TODO: implement
  throw new Error("not implemented");
}

// --- self-check (runs when you execute this file directly) ---
async function check() {
  let calls: unknown[][] = [];
  const debounced = debounce((...args: unknown[]) => calls.push(args), 50);

  debounced(1);
  debounced(2);
  debounced(3); // only this call should eventually fire

  await new Promise((r) => setTimeout(r, 80));
  assert.deepStrictEqual(calls, [[3]], "should fire once, with the last call's args");

  console.log("debounce: all checks passed");
}

check().catch((err) => {
  console.error(err);
  process.exit(1);
});
