// Exercise 2: TodoEditor — immutable updates for objects and arrays
// Problem statement: notes/02-state-and-events/exercises/README.md
//
// Implement all six operations immutably. Forbidden anywhere in this file:
//   push, pop, shift, unshift, splice, reverse, sort (on state), and `arr[i] = ...`
//
// The identity inspector at the bottom shows which todo objects kept their previous reference
// after each update. Target behavior: toggling ONE todo creates exactly ONE new object.

import { useRef, useState } from "react";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
  tags: string[];
};

const initialTodos: Todo[] = [
  { id: "a", text: "Read ch.02 notes", done: false, tags: ["react"] },
  { id: "b", text: "Do the batching lab", done: false, tags: ["react", "state"] },
  { id: "c", text: "Explain snapshots out loud", done: false, tags: [] },
];

let nextId = 0;

export function TodoEditor() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Snapshot of the previous render's todo objects, for the identity inspector.
  const prevTodos = useRef<Todo[]>(todos);
  const previous = prevTodos.current;
  prevTodos.current = todos;

  function addTodo(text: string) {
    // TODO: append a new todo. New array, new object.
    throw new Error("not implemented");
  }

  function removeTodo(id: string) {
    // TODO
    throw new Error("not implemented");
  }

  function toggleDone(id: string) {
    // TODO: flip `done` on exactly one todo. Every OTHER todo object must keep its identity —
    // the inspector below will tell you whether you got this right.
    throw new Error("not implemented");
  }

  function renameTodo(id: string, text: string) {
    // TODO
    throw new Error("not implemented");
  }

  function addTag(id: string, tag: string) {
    // TODO: the nested one — a new array inside a new object inside a new array.
    throw new Error("not implemented");
  }

  function sortByText() {
    // TODO: alphabetical by `text`, without mutating state.
    throw new Error("not implemented");
  }

  // Deliberately broken, for step 2 of the exercise. Click it, watch nothing happen, then click
  // any other button and watch the change appear "one click late". That delayed appearance is
  // the whole reason mutation bugs are hard to find.
  function toggleDoneBroken(id: string) {
    const todo = todos.find((t) => t.id === id);
    if (todo) todo.done = !todo.done;
    setTodos(todos);
  }

  return (
    <div className="p-6">
      <button onClick={() => addTodo(`New todo ${++nextId}`)}>+ add</button>
      <button onClick={sortByText}>sort by text</button>

      <ul className="mt-4 space-y-1">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleDone(todo.id)}
            />
            <input
              value={todo.text}
              onChange={(e) => renameTodo(todo.id, e.target.value)}
            />
            <span> [{todo.tags.join(", ")}] </span>
            <button onClick={() => addTag(todo.id, "urgent")}>+tag</button>
            <button onClick={() => removeTodo(todo.id)}>x</button>
            <button onClick={() => toggleDoneBroken(todo.id)}>toggle (broken)</button>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 font-bold">identity inspector</h3>
      <p className="text-sm text-gray-500">
        "same" = this todo object is reference-identical to the one from the previous render.
      </p>
      <ul className="text-sm font-mono">
        {todos.map((todo, i) => (
          <li key={todo.id}>
            {todo.id}: {previous[i] === todo ? "same" : "NEW OBJECT"}
          </li>
        ))}
      </ul>
    </div>
  );
}
