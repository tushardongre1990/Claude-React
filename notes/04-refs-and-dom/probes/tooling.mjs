// Backs: README §1, §4, §5 (what this repo's TypeScript reports about refs) and §1 (whether this
// repo's oxlint flags reading a ref during render).
// Uses the APP's own toolchain (app/node_modules), so run `npm install` in app/ first.
// It temporarily writes probe files into app/src/__probe__/ and always deletes them afterwards.
import { execSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = join(dirname(fileURLToPath(import.meta.url)), "../../../app");
const probeDir = join(appDir, "src/__probe__");

const files = {
  // §1: useRef() with no argument
  "use-ref-no-arg.tsx": `import { useRef } from "react";
export function P() {
  const r = useRef();
  return <p>{String(r)}</p>;
}
`,
  // §1: a DOM ref is possibly null; refs initialised with null are still assignable
  "nullable.tsx": `import { useRef } from "react";
export function P() {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef<number>(null);
  function handleClick() {
    inputRef.current.focus();
    countRef.current = 1;
  }
  return <input ref={inputRef} onClick={handleClick} />;
}
`,
  // §4: an implicit return from a ref callback
  "implicit-return.tsx": `let instance: HTMLDivElement | null = null;
export function P() {
  return <div ref={(el) => (instance = el)} />;
}
export function Fixed() {
  return <div ref={(el) => { instance = el; }} />;
}
`,
  // §5: passing ref to a component that doesn't declare it vs one that does
  "ref-prop.tsx": `import { useRef, type ComponentProps } from "react";
function Plain({ label }: { label: string }) {
  return <input aria-label={label} />;
}
function MyInput(props: ComponentProps<"input">) {
  return <input {...props} />;
}
export function Form() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <Plain label="a" ref={ref} />
      <MyInput ref={ref} />
    </>
  );
}
`,
  // §1: reading and writing a ref during render (does oxlint catch it?)
  "ref-in-render.tsx": `import { useRef } from "react";
export function P({ value }: { value: number }) {
  const ref = useRef(0);
  ref.current = value;
  return <p>{ref.current}</p>;
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

  console.log("\n===== §1/§4/§5: tsc on the probe files =====");
  // Keep each probe error plus its indented continuation lines (the "not assignable" detail).
  const out = [];
  let keep = false;
  for (const line of run("npx tsc -p tsconfig.app.json --noEmit").split("\n")) {
    if (/^\S/.test(line)) keep = line.includes("__probe__");
    if (keep && line.trim()) out.push(line);
  }
  console.log(out.join("\n") || "(no errors)");

  console.log("\n===== §1: oxlint on the probe files =====");
  console.log(run("npx oxlint src/__probe__").split("\n").filter((l) => /__probe__|×|⚠|Found/.test(l)).join("\n") || "(no warnings)");
} finally {
  rmSync(probeDir, { recursive: true, force: true });
}
