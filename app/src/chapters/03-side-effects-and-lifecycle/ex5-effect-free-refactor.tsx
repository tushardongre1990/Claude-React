// Exercise 5: EffectFreeRefactor — delete the Effects that shouldn't exist
// Problem statement: notes/03-side-effects-and-lifecycle/exercises/README.md
//
// ProductBrowser works. It also has SIX useEffect calls, and only ONE of them synchronizes with a
// system outside React. Refactor until exactly one Effect remains, with identical behaviour.
//
// For each Effect you remove, add a one-line comment naming the §8 anti-pattern it was and what
// replaced it. The render counter at the top helps you see the extra renders disappear.

import { useEffect, useRef, useState } from "react";

type Product = { id: number; name: string; category: "fruit" | "veg"; price: number };

const PRODUCTS: Product[] = [
  { id: 1, name: "Apple", category: "fruit", price: 1.2 },
  { id: 2, name: "Banana", category: "fruit", price: 0.5 },
  { id: 3, name: "Cherry", category: "fruit", price: 4.0 },
  { id: 4, name: "Carrot", category: "veg", price: 0.8 },
  { id: 5, name: "Leek", category: "veg", price: 1.5 },
  { id: 6, name: "Spinach", category: "veg", price: 2.2 },
];

function ProductBrowser({
  category,
  onSelectionChange,
}: {
  category: Product["category"];
  onSelectionChange: (product: Product | null) => void;
}) {
  const renders = useRef(0);
  renders.current++;

  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Effect 1
  useEffect(() => {
    setVisible(
      PRODUCTS.filter(
        (p) => p.category === category && p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [category, search]);

  // Effect 2
  useEffect(() => {
    setTotal(visible.reduce((sum, p) => sum + p.price, 0));
  }, [visible]);

  // Effect 3
  useEffect(() => {
    setSelected(null);
  }, [category]);

  // Effect 4
  useEffect(() => {
    onSelectionChange(selected);
  }, [selected, onSelectionChange]);

  // Effect 5
  useEffect(() => {
    if (selected !== null) setDetailsOpen(true);
  }, [selected]);

  // Effect 6
  useEffect(() => {
    document.title = selected ? `${selected.name} — Shop` : "Shop";
  }, [selected]);

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-400">ProductBrowser renders: {renders.current}</p>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="filter…"
        className="text-black"
      />
      <ul>
        {visible.map((p) => (
          <li key={p.id}>
            <button onClick={() => setSelected(p)}>
              {p.name} — ${p.price.toFixed(2)} {selected?.id === p.id ? "✓" : ""}
            </button>
          </li>
        ))}
      </ul>
      <p>Total of visible: ${total.toFixed(2)}</p>
      {detailsOpen && selected && (
        <div className="rounded border border-slate-600 p-2">
          Details: {selected.name}{" "}
          <button onClick={() => setDetailsOpen(false)}>close</button>
        </div>
      )}
    </div>
  );
}

export function EffectFreeRefactor() {
  const [category, setCategory] = useState<Product["category"]>("fruit");
  const [lastSelection, setLastSelection] = useState<string>("(none)");

  return (
    <div className="space-y-4 p-6 text-left">
      <div className="flex gap-2">
        <button onClick={() => setCategory("fruit")}>fruit</button>
        <button onClick={() => setCategory("veg")}>veg</button>
      </div>
      <p>Parent was told the selection is: {lastSelection}</p>
      <ProductBrowser
        category={category}
        onSelectionChange={(p) => setLastSelection(p ? p.name : "(none)")}
      />
    </div>
  );
}
