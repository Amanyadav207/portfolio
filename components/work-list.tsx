import Link from "next/link";
import type { Doc } from "@/lib/content";

export function WorkList({ docs }: { docs: Doc[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {docs.map((doc, i) => (
        <li key={doc.slug}>
          <Link
            href={`/work/${doc.slug}`}
            className="card-interactive group flex h-full flex-col p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-[11px] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className="font-mono text-[13px] text-dim transition-colors duration-200 ease-ui group-hover:text-accent"
              >
                →
              </span>
            </div>

            <h3 className="mt-3 text-[17px] font-semibold text-fg transition-colors duration-200 ease-ui group-hover:text-accent">
              {doc.title}
            </h3>

            <p className="mt-1.5 font-mono text-[11.5px] text-dim">
              {doc.context}
              {doc.period ? ` · ${doc.period}` : ""}
            </p>

            <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-muted">{doc.summary}</p>

            {doc.stack && (
              <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                {doc.stack.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
