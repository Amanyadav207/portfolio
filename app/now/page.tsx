import type { Metadata } from "next";
import { Todo } from "@/components/callouts";

export const metadata: Metadata = {
  title: "Now",
  description: "What I am working on and learning at the moment.",
};

export default function NowPage() {
  return (
    <div className="mx-auto max-w-shell px-6">
      <header className="py-12 md:py-16">
        <p className="label">Current focus</p>
        <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold">Now</h1>
        <span className="accent-rule" aria-hidden />
        <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
          What I am working on and learning at the moment.
        </p>
        {/* A stale /now page is worse than no /now page. */}
        <p className="mt-5 inline-block rounded-md border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-dim">
          Last updated: <span className="text-accent">TODO(aman) — set on first edit</span>
        </p>
      </header>

      <div className="prose border-t border-line pt-12">
        <h2>Working on</h2>
        <Todo>
          Two or three lines on your current focus at Scaler AI Labs — kept at the level you are
          comfortable stating publicly. Remember the disclosure line you set: employer named,
          technique generic, no customer names.
        </Todo>

        <h2>Learning</h2>
        <Todo>
          What you are deliberately going deeper on right now, and why. Concrete beats aspirational —
          &ldquo;reading the Yjs internals to understand how state vectors bound sync payload
          size&rdquo; is worth more than &ldquo;learning distributed systems&rdquo;.
        </Todo>

        <h2>Reading</h2>
        <Todo>Papers, books, or codebases currently open. Two or three, with a line each on why.</Todo>

        <h2>Open to</h2>
        <Todo>
          Whether you are looking for roles or internships, what kind, and the best way to reach you.
          Your email is already in the footer, so this is about intent, not contact details.
        </Todo>
      </div>
    </div>
  );
}
