import Link from "next/link";
import { getFeatured } from "@/lib/content";
import { metrics, site } from "@/lib/site";

export default function HomePage() {
  const featured = getFeatured();

  return (
    <div className="mx-auto max-w-shell px-6">
      {/* ---------------- positioning ---------------- */}
      <section className="py-16 md:py-20">
        <p className="label">{site.location}</p>

        <h1 className="mt-4 max-w-[26ch] text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08]">
          Backend and distributed systems engineer.
        </h1>
        <span className="accent-rule" aria-hidden />

        <p className="mt-7 max-w-[58ch] text-[17px] leading-[1.65] text-muted">
          I work on data pipelines, concurrency, and the infrastructure that keeps them fast.
          Currently building computer-use RL environments and the pipelines behind them at{" "}
          <span className="font-medium text-fg">Scaler AI Labs</span>; previously the founding
          engineer on an AI stock-research platform.
        </p>

        <p className="mt-4 max-w-[58ch] font-mono text-[12px] leading-relaxed text-dim">
          Third year · {site.education.map((e) => e.school).join(" + ")}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2">
          {site.links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noreferrer" className="chip">
                {link.label}
                <span aria-hidden className="text-dim">
                  ↗
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="chip border-accent-line bg-accent-dim text-accent"
            >
              Résumé
              <span aria-hidden>↓</span>
            </a>
          </li>
        </ul>
      </section>

      {/* ---------------- metric band ---------------- */}
      <section aria-label="Selected figures" className="card overflow-hidden">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`px-5 py-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i < 2 ? "border-b border-line lg:border-b-0" : ""
              } ${i === 2 ? "lg:border-l" : ""} lg:border-line`}
            >
              <dd className="font-mono text-[clamp(1.15rem,2.2vw,1.5rem)] font-medium tracking-[-0.02em] text-accent">
                {metric.value}
              </dd>
              <dt className="mt-1.5 text-[13.5px] text-fg">{metric.label}</dt>
              <p className="mt-0.5 font-mono text-[11px] text-dim">{metric.detail}</p>
            </div>
          ))}
        </dl>
      </section>

      {/* ---------------- featured work ---------------- */}
      <section className="pb-4 pt-16 md:pt-20">
        <div className="rule-head mb-8">
          <h2 className="label whitespace-nowrap">Selected work</h2>
          <span className="rule-line" aria-hidden />
          <Link
            href="/work"
            className="whitespace-nowrap font-mono text-[12px] text-muted transition-colors duration-200 ease-ui hover:text-accent"
          >
            all work →
          </Link>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {featured.map((doc, i) => (
            <li key={doc.slug} className={i === 0 ? "md:col-span-2" : ""}>
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

                <h3
                  className={`mt-3 font-semibold text-fg transition-colors duration-200 ease-ui group-hover:text-accent ${
                    i === 0 ? "text-[20px] md:text-[22px]" : "text-[17px]"
                  }`}
                >
                  {doc.title}
                </h3>

                <p className="mt-1.5 font-mono text-[11.5px] text-dim">
                  {doc.context}
                  {doc.period ? ` · ${doc.period}` : ""}
                </p>

                <p className="mt-4 max-w-prose text-[14.5px] leading-relaxed text-muted">
                  {doc.summary}
                </p>

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
      </section>
    </div>
  );
}
