# React 19 Mastery — App

The hands-on codebase for the [React 19 Mastery](../README.md) curriculum. Exercise and
mini-project code for each chapter lives under `src/chapters/<NN-slug>/`, created as chapters
are unlocked — see [`/CLAUDE.md`](../CLAUDE.md) for the full project context and working
rules, and [`/notes/README.md`](../notes/README.md) for the curriculum itself.

## Stack

- React 19.2 + TypeScript (strict)
- Vite (`@vitejs/plugin-react`)
- Tailwind CSS v4 (via `@tailwindcss/vite`, no separate config file needed)
- Oxlint

Dependencies are added incrementally as their chapter is unlocked (React Router, TanStack
Query, Redux Toolkit/Zustand, React Hook Form, Vitest/RTL/MSW, etc.) rather than all installed
upfront — this keeps the project honest about what's actually been learned so far.

## Commands

```bash
npm install
npm run dev        # start dev server
npm run build       # type-check (tsc -b) + production build
npm run preview     # preview the production build
npm run lint        # oxlint
```

## React Compiler

Not enabled yet — this gets turned on deliberately as part of
[Chapter 06](../notes/06-performance-and-react-compiler/README.md), so its effect on the app
can be compared directly with it off. See the
[React Compiler installation docs](https://react.dev/learn/react-compiler/installation) when
that chapter starts.

## Linting

For type-aware lint rules, install `oxlint-tsgolint` and extend `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the
full list.
