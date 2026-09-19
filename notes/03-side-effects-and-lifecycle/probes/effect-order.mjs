// Backs: README §2 (execution order), §6 (Strict Mode sequence), §7 (layout before regular).
import { React, act, h, mount, header } from "./dom.mjs";
const { useEffect, useLayoutEffect, StrictMode } = React;

let log = [];

function Child({ dep }) {
  log.push(`render Child(${dep})`);
  useLayoutEffect(() => { log.push(`  layout setup Child(${dep})`); return () => log.push(`  layout cleanup Child(${dep})`); }, [dep]);
  useEffect(() => { log.push(`  effect setup Child(${dep})`); return () => log.push(`  effect cleanup Child(${dep})`); }, [dep]);
  return null;
}

function Parent({ dep }) {
  log.push(`render Parent(${dep})`);
  useLayoutEffect(() => { log.push(`  layout setup Parent(${dep})`); return () => log.push(`  layout cleanup Parent(${dep})`); }, [dep]);
  useEffect(() => { log.push(`  effect setup Parent(${dep})`); return () => log.push(`  effect cleanup Parent(${dep})`); }, [dep]);
  return h(Child, { dep });
}

async function run(title, strict) {
  log = [];
  const wrap = (el) => (strict ? h(StrictMode, null, el) : el);
  const { root, render } = mount();
  await render(wrap(h(Parent, { dep: "a" })));
  log.push("--- update dep a->b");
  await render(wrap(h(Parent, { dep: "b" })));
  log.push("--- unmount");
  await act(() => root.unmount());
  header(title);
  console.log(log.join("\n"));
}

await run("§2: NO STRICT MODE", false);
await run("§6: STRICT MODE", true);

// §2 rule 7: declaration order. Here useEffect is declared ABOVE useLayoutEffect.
const out = [];
function C2() { useEffect(() => { out.push("child effect"); }); useLayoutEffect(() => { out.push("child layout"); }); return null; }
function P2() { useEffect(() => { out.push("parent effect"); }); useLayoutEffect(() => { out.push("parent layout"); }); return h(C2); }
await mount(h(P2)).render();
header("§2 rule 7: useEffect declared before useLayoutEffect");
console.log(out.join(" | "));
