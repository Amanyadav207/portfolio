import Link from "next/link";
import { getAllDocs } from "@/lib/content";
import { metrics, site } from "@/lib/site";
import { repoGroups } from "@/lib/repos";
import { FanoutHero } from "@/components/fanout-hero";
import { Reveal } from "@/components/reveal";

const STACK = [
  "Go", "Python", "TypeScript", "Java", "Next.js", "FastAPI", "Gin",
  "PostgreSQL", "ClickHouse", "MongoDB", "Redis", "Docker", "WebSockets", "CRDTs",
];

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="aurora-blob"
        style={{
          top: "-14rem",
          left: "-8rem",
          width: "38rem",
          height: "38rem",
          background: "radial-gradient(circle, rgba(124,92,255,0.45), transparent 62%)",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "-6rem",
          right: "-10rem",
          width: "34rem",
          height: "34rem",
          background: "radial-gradient(circle, rgba(34,211,238,0.32), transparent 62%)",
          animationDelay: "-7s",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          top: "22rem",
          left: "34%",
          width: "30rem",
          height: "30rem",
          background: "radial-gradient(circle, rgba(74,222,128,0.18), transparent 65%)",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div data-reveal>
      <p className="label">{kicker}</p>
      <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold">{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const work = getAllDocs("work");
  const featured = work.filter((d) => d.featured);
  const rest = work.filter((d) => !d.featured);

  return (
    <>
      <Reveal />

      {/* ================= hero ================= */}
      <section className="relative overflow-hidden">
        <Aurora />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28">
          <div>
            <p className="eyebrow" data-reveal>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--a3)", boxShadow: "0 0 10px var(--a3)" }}
              />
              Available for roles · {site.location}
            </p>

            <h1
              className="mt-7 text-[clamp(2.6rem,7vw,4.5rem)] font-semibold leading-[1.02]"
              data-reveal
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              <span className="grad-text">Backend &amp; distributed</span>
              <br />
              <span className="grad-text">systems engineer</span>
            </h1>

            <p
              className="mt-7 max-w-[54ch] text-[17.5px] leading-[1.7] text-[color:var(--muted)]"
              data-reveal
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              I make slow systems fast. Right now that means computer-use RL environments and the
              pipelines behind them at{" "}
              <span className="font-medium text-[color:var(--fg)]">Scaler AI Labs</span> — before
              that, founding engineer on an AI stock-research platform.
            </p>

            <div
              className="mt-9 flex flex-wrap items-center gap-3"
              data-reveal
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-grad">
                Résumé <span aria-hidden>↓</span>
              </a>
              <a href={`mailto:${site.email}`} className="btn-ghost">
                Get in touch <span aria-hidden>→</span>
              </a>
            </div>

            <div
              className="mt-8 flex flex-wrap gap-2"
              data-reveal
              style={{ "--delay": "300ms" } as React.CSSProperties}
            >
              {site.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="chip">
                  {l.label}
                  <span aria-hidden className="opacity-60">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div
            className="glass p-6 lg:p-7"
            data-reveal
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <p className="label mb-4">Hierarchical fan-out</p>
            <FanoutHero />
          </div>
        </div>

        {/* stack marquee */}
        <div className="relative border-y" style={{ borderColor: "var(--line)" }}>
          <div className="flex overflow-hidden py-4">
            <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
              {[...STACK, ...STACK].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="whitespace-nowrap font-mono text-[13px] text-[color:var(--dim)]"
                >
                  {tech}
                  <span className="ml-10 opacity-40" style={{ color: "var(--a2)" }}>
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= metrics ================= */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="glass glass-hover p-6"
              data-reveal
              style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <p
                className="text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.03em]"
                style={{
                  background: "linear-gradient(100deg, #c4b5fd, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {m.value}
              </p>
              <p className="mt-2 text-[14px] text-[color:var(--fg)]">{m.label}</p>
              <p className="mt-1 font-mono text-[11px] text-[color:var(--dim)]">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= work ================= */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-16">
        <SectionTitle kicker="01 — Selected work" title="Problems worth writing up" />

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featured.map((doc, i) => (
            <Link
              key={doc.slug}
              href={`/work/${doc.slug}`}
              className={`glass glass-hover group relative flex flex-col overflow-hidden p-7 ${
                i === 0 ? "md:col-span-2" : ""
              }`}
              data-reveal
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <span
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "rgba(124,92,255,0.5)" }}
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-4">
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[11px]"
                  style={{ background: "var(--accent-dim)", color: "#c4b5fd" }}
                >
                  {doc.context}
                </span>
                <span
                  className="text-[15px] text-[color:var(--dim)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  ↗
                </span>
              </div>

              <h3
                className={`relative mt-5 font-semibold ${
                  i === 0 ? "text-[clamp(1.4rem,3vw,1.9rem)]" : "text-[19px]"
                }`}
              >
                {doc.title}
              </h3>

              <p className="relative mt-3 max-w-[62ch] flex-1 text-[15px] leading-relaxed text-[color:var(--muted)]">
                {doc.summary}
              </p>

              {doc.stack && (
                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {doc.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* remaining write-ups */}
        <div className="glass mt-4 overflow-hidden" data-reveal>
          {rest.map((doc, i) => (
            <Link
              key={doc.slug}
              href={`/work/${doc.slug}`}
              className="group flex flex-wrap items-center gap-x-4 gap-y-1 px-7 py-5 transition-colors duration-300 hover:bg-[color:var(--surface-2)]"
              style={{ borderTop: i > 0 ? "1px solid var(--line)" : "none" }}
            >
              <span
                className="font-mono text-[12px]"
                style={{ color: "var(--a2)" }}
              >
                {String(featured.length + i + 1).padStart(2, "0")}
              </span>
              <span className="text-[16px] font-medium">{doc.title}</span>
              <span className="font-mono text-[11.5px] text-[color:var(--dim)]">{doc.context}</span>
              <span
                className="ml-auto text-[14px] text-[color:var(--dim)] transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= open source ================= */}
      <section id="open-source" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle kicker="02 — Open source" title="Things I build to learn" />
          <a
            href={site.links[0].href}
            target="_blank"
            rel="noreferrer"
            className="chip"
            data-reveal
          >
            All repositories <span aria-hidden>↗</span>
          </a>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {repoGroups.map((g, gi) => (
            <div
              key={g.group}
              className="glass p-6"
              data-reveal
              style={{ "--delay": `${gi * 80}ms` } as React.CSSProperties}
            >
              <p className="label" style={{ color: "var(--a2)" }}>
                {g.group}
              </p>
              <ul className="mt-5 space-y-5">
                {g.repos.map((r) => (
                  <li key={r.name}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="group block">
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-[13.5px] transition-colors duration-300 group-hover:text-[color:var(--a2)]">
                          {r.name}
                        </span>
                        <span className="text-[11px] text-[color:var(--dim)]" aria-hidden>
                          ↗
                        </span>
                      </span>
                      <span className="mt-1 block font-mono text-[10.5px] text-[color:var(--dim)]">
                        {r.language}
                      </span>
                      {r.note && (
                        <span className="mt-1.5 block text-[13px] leading-snug text-[color:var(--muted)]">
                          {r.note}
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

      {/* ================= contact ================= */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="glass relative overflow-hidden px-8 py-16 text-center" data-reveal>
          <span
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-[38rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(124,92,255,0.35), transparent 66%)" }}
            aria-hidden
          />
          <h2 className="relative text-[clamp(1.9rem,5vw,3rem)] font-semibold">
            <span className="grad-text">Let&rsquo;s build something fast</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-[54ch] text-[16px] leading-relaxed text-[color:var(--muted)]">
            Open to backend, systems and infrastructure roles — and always happy to talk about a
            pipeline that is slower than it should be.
          </p>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={`mailto:${site.email}`} className="btn-grad">
              {site.email}
            </a>
            <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
              Résumé <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
