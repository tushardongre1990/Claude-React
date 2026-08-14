// Exercise 3: KeyedList — keys, reordering, and the index-as-key bug
// Problem statement: notes/01-foundations/exercises/README.md
//
// Requirements:
// - Rows shaped { id: string, text: string }, each rendered as an UNCONTROLLED
//   <input defaultValue={text} /> (controlled inputs are ch.02 — don't wire up onChange here)
//   plus a "Delete" button.
// - First implement with `key={index}`, reproduce the bug described in the exercise README
//   (type into two inputs, delete the first row, watch the typed text end up on the wrong row).
// - Then switch to `key={item.id}` and confirm the bug is gone.
// - Keep both key expressions visible (one commented out) so the difference is easy to point to
//   later during revision.

import type { ReactElement } from "react";

type Item = { id: string; text: string };

const initialItems: Item[] = [
  { id: "a", text: "Buy milk" },
  { id: "b", text: "Walk the dog" },
  { id: "c", text: "Write React notes" },
];

export function KeyedList(): ReactElement {
  // TODO: implement
  // - useState<Item[]>(initialItems)
  // - a delete handler that filters the deleted id out of state
  // - render each row's <input> with key={index} first (to see the bug), then key={item.id}
  throw new Error("not implemented");
}
