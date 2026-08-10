# Chapter 02: State & Events

**Status:** Not Started
**Folder:** `notes/02-state-and-events/`

## Why this chapter matters for a 5-10 YOE interview
State batching and update semantics are a favorite 'explain what happens' interview trap for senior candidates.

## Topics to cover

- useState: lazy initial state, functional updates
- The correct mental model (avoid the misleading "state updates are asynchronous" shorthand):
  state setters *schedule* an update, state is a snapshot fixed for the render that read it,
  and React batches updates before committing the next render — walk through
  `setCount(count + 1)` three times vs `setCount(c => c + 1)` three times to show why they
  differ. Automatic batching in React 18/19 (incl. inside promises/timeouts)
- Controlled vs uncontrolled inputs
- Event handling: SyntheticEvent, delegation model, passing arguments to handlers
- Derived state vs state duplication anti-pattern
- State-lifting patterns and when to lift
- Immutability rules for objects/arrays held in state

## What you'll build
A counter + form playground that demonstrates batching quirks and controlled inputs.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
