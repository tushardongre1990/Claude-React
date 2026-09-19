// Exercise 4: LiveSearch — the chapter build
// Problem statement: notes/03-side-effects-and-lifecycle/exercises/README.md
//
// `fakeSearch` is a stand-in for a real API. It takes 200–1500ms at RANDOM, so responses come
// back out of order, and it honours an AbortSignal exactly the way fetch() does (it rejects with a
// DOMException named "AbortError"). Put a "!" in the query to make the server fail.
//
// NaiveSearch is finished and buggy — leave it alone and use it to SEE the race condition.
// LiveSearch starts as a copy of it. Your job is to fix LiveSearch (requirements in the README).

import { useEffect, useState, useSyncExternalStore } from "react";

// ── Fake API + request stats (don't edit) ─────────────────────────────────────────────────────
const LIBRARIES = [
  "react", "react-dom", "react-router", "react-hook-form", "react-query", "redux", "redux-toolkit",
  "reselect", "recoil", "relay", "remix", "zustand", "jotai", "valtio", "swr", "tanstack-query",
  "tanstack-table", "tanstack-router", "next", "vite", "vitest", "testing-library", "immer",
  "zod", "yup", "formik", "framer-motion", "radix-ui", "headless-ui", "tailwindcss",
];

type RequestStats = { started: number; completed: number; aborted: number; failed: number };
let stats: RequestStats = { started: 0, completed: 0, aborted: 0, failed: 0 };
const statsListeners = new Set<() => void>();

function bump(key: keyof RequestStats) {
  stats = { ...stats, [key]: stats[key] + 1 };
  statsListeners.forEach((l) => l());
}

function fakeSearch(query: string, signal?: AbortSignal): Promise<string[]> {
  bump("started");
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      bump("aborted");
      reject(new DOMException("The operation was aborted.", "AbortError"));
      return;
    }
    const delay = 200 + Math.random() * 1300;
    const timer = setTimeout(() => {
      if (query.includes("!")) {
        bump("failed");
        reject(new Error(`Server error for "${query}"`));
        return;
      }
      bump("completed");
      resolve(LIBRARIES.filter((name) => name.includes(query.toLowerCase())));
    }, delay);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        bump("aborted");
        reject(new DOMException("The operation was aborted.", "AbortError"));
      },
      { once: true },
    );
  });
}

// Declared outside the component so React never re-subscribes (notes §11, trap 2).
function subscribeStats(listener: () => void) {
  statsListeners.add(listener);
  return () => {
    statsListeners.delete(listener);
  };
}

function getStats() {
  return stats; // replaced (never mutated) on change, so it's a valid cached snapshot
}

function RequestStatsPanel() {
  const s = useSyncExternalStore(subscribeStats, getStats);
  return (
    <p className="font-mono text-xs text-slate-400">
      requests — started: {s.started} · completed: {s.completed} · aborted: {s.aborted} · failed:{" "}
      {s.failed}
    </p>
  );
}

// ── NaiveSearch: the bug, on purpose (don't edit) ─────────────────────────────────────────────
// Type "re" quickly, then "red". Watch "results for" disagree with the input.
function NaiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [resultsFor, setResultsFor] = useState("");

  useEffect(() => {
    fakeSearch(query).then((data) => {
      setResults(data);
      setResultsFor(query);
    });
  }, [query]);

  return (
    <section className="space-y-2">
      <h3 className="font-bold">Naive (buggy)</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} className="text-black" />
      <p className={resultsFor === query ? "text-green-400" : "text-red-400"}>
        results for: "{resultsFor}" {resultsFor === query ? "" : "← STALE"}
      </p>
      <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>
    </section>
  );
}

// ── LiveSearch: your implementation ───────────────────────────────────────────────────────────
// Starts as a copy of NaiveSearch. Change whatever you need.
function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [resultsFor, setResultsFor] = useState("");

  // TODO: see the README's requirements list. At minimum:
  //   - debounce 300ms (clearTimeout in cleanup)
  //   - AbortController: pass the signal to fakeSearch, abort in cleanup, ignore AbortError
  //   - a status union ('idle' | 'loading' | 'success' | 'error') instead of guessing from data
  //   - an error message when the query contains "!"
  //   - no request at all for an empty/whitespace query
  useEffect(() => {
    fakeSearch(query).then((data) => {
      setResults(data);
      setResultsFor(query);
    });
  }, [query]);

  return (
    <section className="space-y-2">
      <h3 className="font-bold">Live (yours)</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} className="text-black" />
      <p className={resultsFor === query ? "text-green-400" : "text-red-400"}>
        results for: "{resultsFor}" {resultsFor === query ? "" : "← STALE"}
      </p>
      <ul>{results.map((r) => <li key={r}>{r}</li>)}</ul>
    </section>
  );
}

export function LiveSearchLab() {
  return (
    <div className="space-y-6 p-6 text-left">
      <RequestStatsPanel />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <NaiveSearch />
        <LiveSearch />
      </div>
    </div>
  );
}
