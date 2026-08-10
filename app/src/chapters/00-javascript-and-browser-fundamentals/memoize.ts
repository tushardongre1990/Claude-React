// Exercise 3: memoize
// Problem statement: notes/00-javascript-and-browser-fundamentals/exercises/README.md
//
// Start with single-primitive-argument support (the check below only tests that).
// Once it passes, think through (doesn't need to be solved in code): how would you
// key the cache for multiple arguments, or for object arguments where `===` doesn't
// do what you want? Write your answer as a comment at the bottom of this file.

import assert from "node:assert";

function memoize<Arg extends string | number, Ret>(fn: (arg: Arg) => Ret): (arg: Arg) => Ret {
  // TODO: implement
  throw new Error("not implemented");
}

// --- self-check (runs when you execute this file directly) ---
function check() {
  let calls = 0;
  const slowSquare = (n: number) => {
    calls++;
    return n * n;
  };
  const memoized = memoize(slowSquare);

  assert.strictEqual(memoized(4), 16);
  assert.strictEqual(memoized(4), 16);
  assert.strictEqual(calls, 1, "second call with the same arg should hit the cache");

  assert.strictEqual(memoized(5), 25);
  assert.strictEqual(calls, 2, "a new argument should still compute");

  console.log("memoize: all checks passed");
}

check();

// Your answer on multi-arg / object-arg keying:
// TODO
