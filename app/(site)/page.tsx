import Link from "next/link";
import { getAllDocs } from "@/lib/content";
import { metrics, site } from "@/lib/site";
import { repoGroups } from "@/lib/repos";

function SectionHead({
  index,
  title,
  action,
}: {
  index: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="rule-head mb-8">
      <span className="font-mono text-[11px] text-accent">{index}</span>
      <h2 className="label whitespace-nowrap !text-fg">{title}</h2>
      <span className="rule-line" aria-hidden />
      {action && (
        <a
          href={action.href}
          target={action.href.startsWith("http") ? "_blank" : undefined}
          rel={action.href.startsWith("http") ? "noreferrer" : undefined}
          className="whitespace-nowrap font-mono text-[12px] text-muted transition-colors duration-200 ease-ui hover:text-accent"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}

export default function HomePage() {
  const work = getAllDocs("work");
  const featured = work.filter((d) => d.featured);
  const rest = work.filter((d) => !d.featured);

  return (
    <div className="mx-auto max-w-shell px-6">
      {/* ============ intro ============ */}
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

      {/* ============ metrics ============ */}
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

      {/* ============ work ============ */}
      <section id="work" className="pt-16 md:pt-20">
        <SectionHead index="01" title="Work" />
        <p className="mb-8 max-w-prose text-[15px] leading-relaxed text-muted">
          Each write-up follows the same shape: the problem, the constraints, the approach, an
          architecture diagram, the tradeoffs, and what I would do differently.
        </p>

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

                <p className="mt-4 max-w-prose flex-1 text-[14.5px] leading-relaxed text-muted">
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

        {/* remaining write-ups, denser */}
        <ul className="mt-4 overflow-hidden rounded-lg border border-line bg-surface">
          {rest.map((doc, i) => (
            <li key={doc.slug} className={i > 0 ? "border-t border-line" : ""}>
              <Link
                href={`/work/${doc.slug}`}
                className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 px-5 py-4 transition-colors duration-200 ease-ui hover:bg-surface-2"
              >
                <span className="font-mono text-[11px] text-dim">
                  {String(featured.length + i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium text-fg transition-colors duration-200 ease-ui group-hover:text-accent">
                  {doc.title}
                </span>
                <span className="font-mono text-[11px] text-dim">{doc.context}</span>
                <span
                  aria-hidden
                  className="ml-auto font-mono text-[12px] text-dim transition-colors duration-200 ease-ui group-hover:text-accent"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ============ open source ============ */}
      <section id="open-source" className="pt-16 md:pt-20">
        <SectionHead
          index="02"
          title="Open source"
          action={{ href: site.links[0].href, label: "all repositories →" }}
        />
        <p className="mb-8 max-w-prose text-[15px] leading-relaxed text-muted">
          Smaller things I have built, kept public. Selected for backend, systems, and design
          signal rather than completeness.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {repoGroups.map((group) => (
            <div key={group.group} className="card p-5">
              <h3 className="label !text-accent">{group.group}</h3>
              <ul className="mt-4 space-y-3">
                {group.repos.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group block transition-colors duration-200 ease-ui"
                    >
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-[13px] text-fg group-hover:text-accent">
                          {repo.name}
                        </span>
                        <span aria-hidden className="text-[11px] text-dim group-hover:text-accent">
                          ↗
                        </span>
                      </span>
                      <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.08em] text-dim">
                        {repo.language}
                      </span>
                      {repo.note && (
                        <span className="mt-1 block text-[13px] leading-snug text-muted">
                          {repo.note}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </section>



      {/* ============ contact ============ */}
      <section id="contact" className="pt-16 md:pt-20">
        <SectionHead index="03" title="Get in touch" />
        <div className="card p-8">
          <p className="max-w-prose text-[16px] leading-relaxed text-muted">
            Open to backend, systems, and infrastructure roles — and always happy to talk about a
            pipeline that is slower than it should be.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block font-mono text-[clamp(1rem,2.4vw,1.35rem)] text-accent hover:underline"
          >
            {site.email}
          </a>
        </div>
      </section>
    </div>
  );
}
