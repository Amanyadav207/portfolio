import type { ReactNode } from "react";

interface FigureProps {
  children: ReactNode;
  /** Visible explanation beneath the drawing. */
  caption: string;
  /** Text alternative for screen readers. */
  label: string;
  width: number;
  height: number;
}

/**
 * Wrapper for inline SVG diagrams: scales down responsively, scrolls rather
 * than squashing on narrow screens, and always carries a text alternative.
 */
export function Figure({ children, caption, label, width, height }: FigureProps) {
  return (
    // Diagrams are allowed to run wider than the prose column — squeezing a
    // tree into 68ch makes the labels unreadable.
    <figure className="my-8 max-w-[54rem]">
      <div className="overflow-x-auto rounded-md border border-line bg-surface">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          role="img"
          aria-label={label}
          className="h-auto w-full min-w-[560px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 max-w-prose text-[13px] leading-relaxed text-dim">
        {caption}
      </figcaption>
    </figure>
  );
}
