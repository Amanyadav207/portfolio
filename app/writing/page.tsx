import type { Metadata } from "next";
import Link from "next/link";
import { getAllDocs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Engineering deep-dives.",
};

export default function WritingIndexPage() {
  const docs = getAllDocs("writing");

  return (
    <div className="mx-auto max-w-shell px-6">
      <header className="py-12 md:py-16">
        <p className="label">Deep-dives</p>
        <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold">Writing</h1>
        <span className="accent-rule" aria-hidden />
        <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
          Things I had to understand properly rather than work around.
        </p>
      </header>

      <section className="border-t border-line pt-10">
        {docs.length === 0 ? (
          <p className="text-[15px] text-muted">Nothing published yet.</p>
        ) : (
          <ul className="grid gap-4 md:grid-cols-2">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/writing/${doc.slug}`}
                  className="card-interactive group flex h-full flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    {doc.status === "draft" && (
                      <span className="rounded border border-line-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
                        draft
                      </span>
                    )}
                    <span
                      aria-hidden
                      className="ml-auto font-mono text-[13px] text-dim transition-colors duration-200 ease-ui group-hover:text-accent"
                    >
                      →
                    </span>
                  </div>

                  <h2 className="mt-3 text-[17px] font-semibold text-fg transition-colors duration-200 ease-ui group-hover:text-accent">
                    {doc.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{doc.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
