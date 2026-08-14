// Exercise 2: StatusPanel — conditional rendering patterns, and the `&&` footgun
// Problem statement: notes/01-foundations/exercises/README.md
//
// Requirements:
// - Prop `status: 'idle' | 'loading' | 'error' | 'success'` — render a distinct output for
//   each (your choice of pattern: ternary chain, early returns, or an assigned variable).
// - Prop `resultCount: number` — when status is 'success', render "${resultCount} results".
//   Must render correctly (not a stray "0") when resultCount is 0.
//
// Step 1: write the broken version first using `{resultCount && <span>...}` and confirm in the
// browser that resultCount = 0 renders a literal "0". Step 2: fix it (e.g. `resultCount > 0 &&`,
// or a ternary) and confirm the bug is gone.

import type { ReactElement } from "react";

type StatusPanelProps = {
  status: "idle" | "loading" | "error" | "success";
  resultCount: number;
};

export function StatusPanel(props: StatusPanelProps): ReactElement {
  // TODO: implement
  throw new Error("not implemented");
}

// --- try it out ---
// <StatusPanel status="success" resultCount={0} />   ← the case that exposes the && bug
// <StatusPanel status="success" resultCount={5} />
// <StatusPanel status="loading" resultCount={0} />
// <StatusPanel status="error" resultCount={0} />
