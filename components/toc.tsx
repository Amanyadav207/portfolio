import type { Heading } from "@/lib/content";

/**
 * On-page nav. Plain anchors, so it works with JavaScript disabled.
 */
export function Toc({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;

  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="label">On this page</p>
      <ol className="mt-3 space-y-1 border-l border-line">
        {headings.map((heading, i) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="-ml-px flex gap-2 border-l border-transparent py-1 pl-3 text-[13px] leading-snug
                text-muted transition-colors duration-200 ease-ui hover:border-accent hover:text-accent"
            >
              <span className="font-mono text-[10.5px] text-dim">
                {String(i + 1).padStart(2, "0")}
              </span>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
