// Exercise 1: ProfileCard — props, defaults, and composition over configuration
// Problem statement: notes/01-foundations/exercises/README.md
//
// Requirements:
// - Required props: `name: string`, `role: string`.
// - Optional `avatarUrl?: string` — when absent, render a fallback (e.g. initials in a circle)
//   instead of a broken <img>.
// - Optional `variant?: 'compact' | 'full'`, defaulting to 'full' via a JS default parameter
//   (not defaultProps — removed for function components in React 19).
// - `children` renders as a "bio" section — composition, not a `bio: string` prop.

import type { ReactElement, ReactNode } from "react";

type ProfileCardProps = {
  name: string;
  role: string;
  avatarUrl?: string;
  variant?: "compact" | "full";
  children?: ReactNode;
};

export function ProfileCard(props: ProfileCardProps): ReactElement {
  // TODO: implement
  throw new Error("not implemented");
}

// --- try it out ---
// Temporarily render this in App.tsx while you work on it, e.g.:
//
// <ProfileCard name="Ada Lovelace" role="Mathematician" variant="full">
//   Wrote the first published algorithm intended for a machine, in <em>1843</em>.
// </ProfileCard>
//
// <ProfileCard name="Alan Turing" role="Computer Scientist" variant="compact" />
