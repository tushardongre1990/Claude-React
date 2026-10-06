// Backs: README's claim that every full .tsx example compiles as written.
// Extracts each ```tsx block whose first line is a `// Name.tsx` comment from ../README.md, writes it
// to app/src/__probe__/, and type-checks it with the APP's own tsc (strict settings, React 19.2 types).
// Always deletes the temporary files afterwards.
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appDir = join(here, "../../../app");
const probeDir = join(appDir, "src/__probe__");
const readme = readFileSync(join(here, "../README.md"), "utf8");

const blocks = [...readme.matchAll(/```tsx\n(\/\/ (\w+)\.tsx[^\n]*\n[\s\S]*?)```/g)];

mkdirSync(probeDir, { recursive: true });
try {
  for (const [, code, name] of blocks) writeFileSync(join(probeDir, `${name}.tsx`), code);
  let out;
  try {
    out = execSync("npx tsc -p tsconfig.app.json --noEmit", { cwd: appDir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    out = (e.stdout ?? "") + (e.stderr ?? "");
  }
  const errors = out.split("\n").filter((l) => l.includes("__probe__"));
  console.log(`\n===== type-checking ${blocks.length} full examples from README.md =====`);
  console.log(blocks.map(([, , n]) => n).join(", "));
  console.log(errors.length ? errors.join("\n") : "(no errors)");

  let lint;
  try {
    lint = execSync("npx oxlint src/__probe__", { cwd: appDir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    lint = (e.stdout ?? "") + (e.stderr ?? "");
  }
  console.log("\n===== oxlint on the same examples =====");
  console.log(lint.split("\n").filter((l) => /__probe__|Found/.test(l)).join("\n") || "(no warnings)");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}
