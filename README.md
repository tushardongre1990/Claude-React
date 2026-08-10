# React 19 Mastery

A chapter-by-chapter React 19/19.2 curriculum, coding-interview problem bank, and hands-on
codebase, built to prepare for a React interview at the **5-10 years of experience** level.

> **Full project context, working conventions, and current progress live in
> [`CLAUDE.md`](CLAUDE.md).** That file is written so a Claude Code session (on any machine)
> can pick this project back up with zero lost context — read it first.

## Structure

- [`notes/`](notes/README.md) — the 23-chapter curriculum (`00`-`22`) and progress table, one
  folder per chapter, outline-only until unlocked
- [`app/`](app/) — Vite + React 19 + TypeScript + Tailwind CSS v4 project holding all exercise
  and mini-project code, organized by chapter under `app/src/chapters/`
- [`coding-interviews/`](coding-interviews/README.md) — a React + JavaScript implementation
  problem bank, separate from the concept notes
- [`interview-questions/`](interview-questions/README.md) — "explain this output" snippets, a
  catalog of React traps/misconceptions, and open-ended debugging scenarios
- [`revision-notes/`](revision-notes/README.md) — master cheat-sheet index across all chapters
- [`improvement-tracker/weak-areas.md`](improvement-tracker/weak-areas.md) — running log of
  gaps/mistakes to review before an interview
- [`assessment/`](assessment/) — chapter scorecards, mock-interview scorecards, and a final
  readiness checklist

## How it works

Chapters (and coding-interview problems, and interview-question snippets) are unlocked one at
a time — say "next chapter" to move forward, or name a specific problem to work on it. Nothing
beyond what's been explicitly asked for has detailed content yet, by design; see `CLAUDE.md`
for the full rule.

## Running the app

```bash
cd app
npm install
npm run dev
```
