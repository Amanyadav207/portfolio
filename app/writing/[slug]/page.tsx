import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDoc, getHeadings, getSlugs } from "@/lib/content";
import { Mdx } from "@/components/mdx";
import { Toc } from "@/components/toc";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getSlugs("writing").map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  if (!getSlugs("writing").includes(params.slug)) return {};
  const doc = getDoc("writing", params.slug);
  return { title: doc.title, description: doc.summary };
}

export default function WritingPage({ params }: Params) {
  if (!getSlugs("writing").includes(params.slug)) notFound();

  const doc = getDoc("writing", params.slug);
  const headings = getHeadings(doc.body);

  return (
    <article className="mx-auto max-w-shell px-6">
      <header className="py-12 md:py-16">
        <Link
          href="/writing"
          className="font-mono text-[12px] text-dim transition-colors duration-200 ease-ui hover:text-accent"
        >
          ← writing
        </Link>

        <h1 className="mt-6 max-w-[32ch] text-[clamp(1.6rem,3.6vw,2.375rem)] font-semibold leading-[1.12]">
          {doc.title}
        </h1>
        <span className="accent-rule" aria-hidden />

        <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">{doc.summary}</p>

        {doc.status === "draft" && (
          <p className="mt-6 inline-block rounded-md border border-line-2 bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
            draft — not finished
          </p>
        )}
      </header>

      <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_15rem]">
        <div className="min-w-0">
          <Mdx source={doc.body} />
        </div>
        <aside className="hidden lg:block">
          <Toc headings={headings} />
        </aside>
      </div>
    </article>
  );
}
