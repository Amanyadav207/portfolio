import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDocs, getDoc, getHeadings, getSlugs } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import { Toc } from "@/components/toc";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getSlugs("work").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  if (!getSlugs("work").includes(params.slug)) return {};
  const doc = getDoc("work", params.slug);
  return { title: doc.title, description: doc.summary };
}

export default function WorkPage({ params }: Params) {
  if (!getSlugs("work").includes(params.slug)) notFound();

  const doc = getDoc("work", params.slug);
  const headings = getHeadings(doc.body);
  const all = getAllDocs("work");
  const next = all[all.findIndex((d) => d.slug === doc.slug) + 1];

  return (
    <article className="mx-auto max-w-shell px-6">
      <header className="py-12 md:py-16">
        <Link
          href="/#work"
          className="font-mono text-[12px] text-dim transition-colors duration-200 ease-ui hover:text-accent"
        >
          ← work
        </Link>

        <h1 className="mt-6 max-w-[30ch] text-[clamp(1.6rem,3.6vw,2.375rem)] font-semibold leading-[1.12]">
          {doc.title}
        </h1>
        <span className="accent-rule" aria-hidden />

        <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">{doc.summary}</p>

        <dl className="mt-7 flex flex-wrap gap-2">
          {doc.context && (
            <div className="rounded-md border border-line bg-surface px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">context</dt>
              <dd className="mt-0.5 font-mono text-[12px] text-fg">{doc.context}</dd>
            </div>
          )}
          {doc.period && (
            <div className="rounded-md border border-line bg-surface px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">period</dt>
              <dd className="mt-0.5 font-mono text-[12px] text-fg">{doc.period}</dd>
            </div>
          )}
          {doc.stack && (
            <div className="rounded-md border border-line bg-surface px-3 py-2">
              <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-dim">stack</dt>
              <dd className="mt-0.5 font-mono text-[12px] text-fg">{doc.stack.join(" · ")}</dd>
            </div>
          )}
        </dl>
      </header>

      <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_15rem]">
        <div className="min-w-0">
          <Mdx source={doc.body} />
        </div>

        <aside className="hidden lg:block">
          <Toc headings={headings} />
        </aside>
      </div>

      {next && (
        <nav className="mt-16 border-t border-line pt-8">
          <p className="label mb-3">Next</p>
          <Link href={`/work/${next.slug}`} className="card-interactive group block p-5">
            <span className="text-[16px] font-semibold text-fg transition-colors duration-200 ease-ui group-hover:text-accent">
              {next.title}
            </span>
            <span className="mt-1.5 block max-w-prose text-[14px] leading-relaxed text-muted">
              {next.summary}
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
