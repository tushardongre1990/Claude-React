// Exercise 4: LRU Cache
// Problem statement: notes/00-javascript-and-browser-fundamentals/exercises/README.md
//
// get(key) and put(key, value), both expected O(1). Fixed capacity; putting past
// capacity evicts the least-recently-used entry. Both get AND put count as "use".
//
// Hint: start with just Map — its keys iterate in insertion order, which gets you
// most of the way to O(1) LRU tracking without a manual doubly-linked list.

import assert from "node:assert";

class LRUCache<K, V> {
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    // TODO: implement
  }

  get(key: K): V | undefined {
    // TODO: implement — a `get` counts as a "use", so it should refresh recency
    throw new Error("not implemented");
  }

  put(key: K, value: V): void {
    // TODO: implement — evict the least-recently-used entry if over capacity
    throw new Error("not implemented");
  }
}

// --- self-check (runs when you execute this file directly) ---
function check() {
  const cache = new LRUCache<string, number>(2);

  cache.put("a", 1);
  cache.put("b", 2);
  assert.strictEqual(cache.get("a"), 1); // "a" is now most-recently-used

  cache.put("c", 3); // capacity exceeded -> evicts "b" (least recently used)
  assert.strictEqual(cache.get("b"), undefined, "b should have been evicted");
  assert.strictEqual(cache.get("a"), 1, "a should still be present");
  assert.strictEqual(cache.get("c"), 3, "c should still be present");

  console.log("lru-cache: all checks passed");
}

check();
