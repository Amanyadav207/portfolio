import type { ReactNode } from "react";

/**
 * A gap the author must fill in. Deliberately conspicuous — these are not
 * meant to survive to a published page.
 */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 max-w-[54rem] overflow-hidden rounded-lg border border-dashed border-line-2 bg-surface">
      <p className="border-b border-dashed border-line-2 bg-accent-dim px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        TODO(aman)
      </p>
      <div className="px-4 py-3.5 text-[14px] leading-relaxed text-muted [&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.72em] [&_li]:before:h-px [&_li]:before:w-2 [&_li]:before:bg-accent-line [&_ul]:mt-2 [&_ul]:space-y-1.5 [&>*+*]:mt-2.5">
        {children}
      </div>
    </div>
  );
}

/**
 * Marks a page describing employer-internal work, recording exactly which
 * specifics were softened so they can be restored if cleared.
 */
export function NdaNote({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 max-w-prose rounded-lg border border-line bg-surface px-4 py-3.5">
      <p className="mb-1.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
        <span aria-hidden className="h-1 w-1 rounded-full bg-dim" />
        Disclosure note
      </p>
      <div className="text-[13px] leading-relaxed text-dim [&>*+*]:mt-2">{children}</div>
    </aside>
  );
}

/** A placeholder where a diagram is needed but I have no verified detail. */
export function DiagramSlot({ label }: { label: string }) {
  return (
    <div className="my-6 grid max-w-[54rem] place-items-center rounded-lg border border-dashed border-line-2 bg-surface px-5 py-11 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        Diagram needed
      </p>
      <p className="mt-2 max-w-[52ch] text-[13px] leading-relaxed text-muted">{label}</p>
    </div>
  );
}

/** Key/value strip for problem-framing metadata. */
export function Facts({ items }: { items: { k: string; v: string }[] }) {
  return (
    <dl className="my-6 max-w-[54rem] overflow-hidden rounded-lg border border-line bg-surface">
      {items.map((item, i) => (
        <div
          key={item.k}
          className={`grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4 ${
            i > 0 ? "border-t border-line" : ""
          }`}
        >
          <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">{item.k}</dt>
          <dd className="text-[14px] text-muted">{item.v}</dd>
        </div>
      ))}
    </dl>
  );
}
