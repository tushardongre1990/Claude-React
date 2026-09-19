// Backs: README §1/§5 (TypeScript rejects async Effects) and §3/§12 (what this repo's oxlint reports).
// Uses the APP's own toolchain (app/node_modules), so run `npm install` in app/ first.
// It temporarily writes probe files into app/src/__probe__/ and always deletes them afterwards.
import { execSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = join(dirname(fileURLToPath(import.meta.url)), "../../../app");
const probeDir = join(appDir, "src/__probe__");

const files = {
  // §1/§5: an async Effect must be a type error
  "async-effect.tsx": `import { useEffect } from "react";
export function P() {
  useEffect(async () => { await Promise.resolve(); }, []);
  return null;
}
`,
  // §3: missing deps are reported, a state setter is not
  "missing-deps.tsx": `import { useEffect, useState } from "react";
export function P({ id }: { id: string }) {
  const [n, setN] = useState(0);
  useEffect(() => { console.log(id, n); setN(1); }, []);
  return null;
}
`,
  // §12: an Effect Event omitted from the array is not reported
  "effect-event.tsx": `import { useEffect, useEffectEvent } from "react";
export function P({ roomId, theme }: { roomId: string; theme: string }) {
  const onConnected = useEffectEvent(() => { console.log(theme); });
  useEffect(() => { console.log(roomId); onConnected(); }, [roomId]);
  return null;
}
`,
};

function run(cmd) {
  try {
    return execSync(cmd, { cwd: appDir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    return (e.stdout ?? "") + (e.stderr ?? ""); // tsc/oxlint exit non-zero when they report
  }
}

mkdirSync(probeDir, { recursive: true });
try {
  for (const [name, src] of Object.entries(files)) writeFileSync(join(probeDir, name), src);

  console.log("\n===== §1/§5: tsc on async-effect.tsx =====");
  console.log(run("npx tsc -p tsconfig.app.json --noEmit").split("\n").filter((l) => l.includes("__probe__")).join("\n") || "(no errors)");

  console.log("\n===== §3/§12: oxlint on the probe files =====");
  console.log(run("npx oxlint src/__probe__").split("\n").filter((l) => l.includes("__probe__")).join("\n") || "(no warnings)");
  console.log("(Expected: the async Effect is flagged ('Effect callbacks are synchronous...'), missing");
  console.log(" deps 'n' and 'id' are flagged but not the setter, and nothing for effect-event.tsx.)");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}
