// Runs every probe in sequence, each in its own Node process (fresh React + DOM each time).
import { execFileSync } from "node:child_process";

for (const probe of [
  "ref-vs-state.mjs",
  "attach-timing.mjs",
  "ref-callback.mjs",
  "imperative-handle.mjs",
  "merge-refs.mjs",
  "portal.mjs",
  "manual-dom.mjs",
  "attributes.mjs",
  "tooling.mjs",
  "typecheck-examples.mjs",
]) {
  execFileSync(process.execPath, [probe], { stdio: "inherit" });
}
