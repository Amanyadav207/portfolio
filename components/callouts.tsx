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
