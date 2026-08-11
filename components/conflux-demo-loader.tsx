"use client";

import dynamic from "next/dynamic";

/**
 * Monaco is a large dependency and only one page needs it. Loading the demo
 * dynamically keeps it out of the chunk shared by every other work page.
 */
export const ConfluxDemo = dynamic(
  () => import("./conflux-demo").then((m) => m.ConfluxDemo),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 rounded-md border border-line bg-surface px-3 py-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">live crdt demo</p>
        <p className="mt-2 font-mono text-[12px] text-muted">loading editors…</p>
      </div>
    ),
  }
);
