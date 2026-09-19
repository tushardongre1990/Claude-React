// Exercise 6: ExternalStoreLab — useSyncExternalStore
// Problem statement: notes/03-side-effects-and-lifecycle/exercises/README.md
//
// Part A: replace the Effect-based hooks with useSyncExternalStore versions.
// Part B: finish the tiny cart store so components can subscribe to it.
// Part C: reproduce the uncached-getSnapshot infinite loop ON PURPOSE, read the error, undo it.

import { useEffect, useState, useSyncExternalStore } from "react";

// ── Part A ────────────────────────────────────────────────────────────────────────────────────
// Reference: the Effect + useState version the notes (§11) say to replace. Don't delete it —
// keep it for comparison and say out loud what its first render gets wrong.
function useOnlineStatusWithEffect() {
  const [isOnline, setIsOnline] = useState(true); // a guess
  useEffect(() => {
    function update() {
      setIsOnline(navigator.onLine);
    }
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return isOnline;
}

// TODO: implement with useSyncExternalStore. Declare `subscribe` OUTSIDE this function.
// Provide a server snapshot too (what should it be, and why does it matter?).
function useOnlineStatus(): boolean {
  return useOnlineStatusWithEffect(); // replace me
}

// TODO: implement with useSyncExternalStore, subscribing to window "resize".
// Return a primitive (window.innerWidth) — think about why that makes getSnapshot trivially safe.
function useWindowWidth(): number {
  return 0; // replace me
}

// ── Part B ────────────────────────────────────────────────────────────────────────────────────
type CartItem = { id: string; name: string; qty: number };

let cart: CartItem[] = [];
const cartListeners = new Set<() => void>();

const cartStore = {
  add(id: string, name: string) {
    // TODO: add the item, or increment qty if it's already there.
    // Rule: produce a NEW array (and a new object for the changed item), never mutate `cart`,
    // then notify every listener. Why does mutating `cart` in place break useSyncExternalStore?
    void id;
    void name;
  },
  clear() {
    // TODO
  },
  subscribe(listener: () => void) {
    // TODO: register the listener and return an unsubscribe function.
    void listener;
    return () => {};
  },
  getSnapshot() {
    // TODO: must return the SAME reference until the cart actually changes.
    return cart;
  },
};

void cartListeners; // remove once you use it

function CartBadge() {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);
  const count = items.reduce((n, item) => n + item.qty, 0);
  return <span className="rounded bg-slate-700 px-2">🛒 {count}</span>;
}

function CartList() {
  const items = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name} × {item.qty}
        </li>
      ))}
    </ul>
  );
}

// ── Part C ────────────────────────────────────────────────────────────────────────────────────
// Uncomment <BadSnapshot /> in the lab below, open the console, and read BOTH messages React
// prints. Then comment it out again, and write the fix underneath (without changing the store).
function BadSnapshot() {
  const summary = useSyncExternalStore(cartStore.subscribe, () => ({
    lines: cart.length,
    units: cart.reduce((n, item) => n + item.qty, 0),
  }));
  return (
    <p>
      {summary.lines} lines, {summary.units} units
    </p>
  );
}
void BadSnapshot; // remove once you uncomment it below

export function ExternalStoreLab() {
  const isOnline = useOnlineStatus();
  const width = useWindowWidth();

  return (
    <div className="space-y-4 p-6 text-left">
      <p>
        {isOnline ? "✅ Online" : "❌ Offline"} · window width: {width}px
      </p>
      <p className="text-xs text-slate-400">
        Test offline with DevTools → Network → "Offline". Resize the window for the width.
      </p>
      <div className="flex items-center gap-2">
        <button onClick={() => cartStore.add("apple", "Apple")}>add apple</button>
        <button onClick={() => cartStore.add("pear", "Pear")}>add pear</button>
        <button onClick={() => cartStore.clear()}>clear</button>
        <CartBadge />
      </div>
      <CartList />
      {/* <BadSnapshot /> */}
    </div>
  );
}
