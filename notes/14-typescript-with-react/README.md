# Chapter 14: TypeScript with React

**Status:** Not Started
**Folder:** `notes/14-typescript-with-react/`

## Why this chapter matters for a 5-10 YOE interview
TS fluency is close to mandatory at 5-10 YOE — expect live typing exercises that go well beyond typing a single prop.

## Topics to cover

- Typing props, children, and event handlers
- Generic components and generic custom hooks
- Discriminated unions for variant props/state — e.g. a Result<T> = success | error | loading type that components must correctly narrow
- Precisely typing useState / useReducer / useContext
- Advanced TS: conditional types, mapped types, indexed access types, template literal types, `infer`
- Generic constraints, function overloads, branded types, type predicates, exhaustiveness checking with `never`
- React-specific typing: polymorphic components (`as` prop), ComponentProps / ComponentPropsWithoutRef, strongly typed context and reducers
- The satisfies operator and common strict-mode gotchas
- Typing untyped third-party libraries

## What you'll build
Re-typing a JS component library from earlier chapters with strict TypeScript, including a polymorphic Button and a discriminated-union async-state component.

---
*Detailed notes, explanations, and code examples get added here when this chapter is unlocked. Say "next chapter" (or name this chapter) to begin it.*
