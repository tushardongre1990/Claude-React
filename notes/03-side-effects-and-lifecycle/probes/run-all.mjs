// Runs every probe in sequence, each in its own Node process (fresh React + DOM each time).
import { execFileSync } from "node:child_process";

for (const probe of [
  "effect-order.mjs",
  "stale-interval.mjs",
  "async-effect.mjs",
  "uncached-snapshot.mjs",
  "insertion-timing.mjs",
  "tooling.mjs",
]) {
  execFileSync(process.execPath, [probe], { stdio: "inherit" });
}
