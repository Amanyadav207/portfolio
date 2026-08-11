import type { Metadata } from "next";
import { getAllDocs } from "@/lib/content";
import { WorkList } from "@/components/work-list";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Engineering write-ups: problem, constraints, approach, architecture, tradeoffs, and what I would do differently.",
};

export default function WorkIndexPage() {
  const docs = getAllDocs("work");

  return (
    <div className="mx-auto max-w-shell px-6">
      <header className="py-12 md:py-16">
        <p className="label">{docs.length} write-ups</p>
        <h1 className="mt-4 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold">Work</h1>
        <span className="accent-rule" aria-hidden />
        <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
          One page per project. Each follows the same shape: the problem, the constraints it had to
          hold, the approach, an architecture diagram, the tradeoffs, and what I would do
          differently.
        </p>
      </header>

      <section className="border-t border-line pt-10">
        <WorkList docs={docs} />
      </section>
    </div>
  );
}
