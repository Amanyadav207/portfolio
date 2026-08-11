import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { previewData } from "@/lib/preview-data";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"], display: "swap" });

export const metadata = { title: "Preview — Editorial" };

const C = {
  paper: "#faf8f4",
  card: "#ffffff",
  ink: "#15140f",
  body: "#4a4740",
  faint: "#8a857a",
  rule: "#ddd8cd",
  accent: "#b3421a",
};

export default function EditorialPreview() {
  const { site, metrics, featured, rest, repoGroups } = previewData();

  return (
    <div className="min-h-screen" style={{ background: C.paper, color: C.ink, ["--fg" as string]: C.ink } as React.CSSProperties}>
      <style>{`
        .e-link { color:${C.accent}; text-decoration:none; border-bottom:1px solid ${C.accent}40; }
        .e-link:hover { border-bottom-color:${C.accent}; }
        .e-row:hover .e-title { color:${C.accent}; }
        .e-row:hover .e-num { color:${C.accent}; }
      `}</style>

      {/* masthead */}
      <header style={{ borderBottom: `2px solid ${C.ink}` }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-baseline gap-x-6 gap-y-2 px-6 py-5">
          <span className={`${display.className} text-[22px]`}>Aman Yadav</span>
          <span
            className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
            style={{ color: C.faint }}
          >
            Backend &amp; distributed systems
          </span>
          <nav className="ml-auto flex gap-5 font-mono text-[11px] uppercase tracking-[0.14em]">
            <a href="#work" style={{ color: C.body }}>
              Work
            </a>
            <a href="#repos" style={{ color: C.body }}>
              Code
            </a>
            <a href={site.resume} target="_blank" rel="noreferrer" style={{ color: C.accent }}>
              Résumé
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6">
        {/* lede */}
        <section className="grid gap-10 py-14 md:grid-cols-[1.6fr_1fr]">
          <div>
            <p
              className="font-mono text-[10.5px] uppercase tracking-[0.2em]"
              style={{ color: C.accent }}
            >
              {site.location} · Third year
            </p>
            <h1
              className={`${display.className} mt-5 text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.04]`}
            >
              Backend and distributed systems engineer.
            </h1>
            <p className="mt-7 max-w-[52ch] text-[17px] leading-[1.7]" style={{ color: C.body }}>
              I work on data pipelines, concurrency, and the infrastructure that keeps them fast.
              Currently building computer-use RL environments and the pipelines behind them at{" "}
              <span style={{ color: C.ink }}>Scaler AI Labs</span>; previously the founding engineer
              on an AI stock-research platform.
            </p>
          </div>

          <aside className="md:border-l md:pl-8" style={{ borderColor: C.rule }}>
            <p
              className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
              style={{ color: C.faint }}
            >
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2.5">
              {site.links.map((l) => (
                <li key={l.label} className="text-[14px]">
                  <a href={l.href} target="_blank" rel="noreferrer" className="e-link">
                    {l.label}
                  </a>
                  <span className="ml-2 font-mono text-[11px]" style={{ color: C.faint }}>
                    {l.handle}
                  </span>
                </li>
              ))}
              <li className="text-[14px]">
                <a href={`mailto:${site.email}`} className="e-link">
                  Email
                </a>
              </li>
            </ul>
            <p className="mt-6 text-[13px] leading-relaxed" style={{ color: C.faint }}>
              {site.education.map((e) => e.school).join(" · ")}
            </p>
          </aside>
        </section>

        {/* figures */}
        <section
          className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4"
          style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}
        >
          {metrics.map((m) => (
            <div key={m.label} className="px-2">
              <p className={`${display.className} text-[clamp(1.6rem,3vw,2.2rem)]`}>{m.value}</p>
              <p className="mt-1 text-[13.5px]" style={{ color: C.ink }}>
                {m.label}
              </p>
              <p className="mt-0.5 font-mono text-[10.5px]" style={{ color: C.faint }}>
                {m.detail}
              </p>
            </div>
          ))}
        </section>

        {/* work */}
        <section id="work" className="py-14">
          <div className="mb-9 flex items-baseline gap-4">
            <h2 className={`${display.className} text-[26px]`}>Selected work</h2>
            <span className="h-px flex-1" style={{ background: C.rule }} />
            <span className="font-mono text-[11px]" style={{ color: C.faint }}>
              {featured.length + rest.length} write-ups
            </span>
          </div>

          {/* lead pieces */}
          {featured.map((doc, i) => (
            <Link
              key={doc.slug}
              href={`/work/${doc.slug}`}
              className="e-row grid gap-6 py-8 md:grid-cols-[4rem_1fr]"
              style={{ borderTop: i === 0 ? `1px solid ${C.rule}` : "none", borderBottom: `1px solid ${C.rule}` }}
            >
              <span
                className={`${display.className} e-num text-[34px] leading-none`}
                style={{ color: "#c9c2b2" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={`${display.className} e-title text-[clamp(1.3rem,2.6vw,1.75rem)] leading-snug`}>
                  {doc.title}
                </h3>
                <p
                  className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: C.accent }}
                >
                  {doc.context}
                  {doc.period ? ` — ${doc.period}` : ""}
                </p>
                <p className="mt-4 max-w-[64ch] text-[15.5px] leading-[1.7]" style={{ color: C.body }}>
                  {doc.summary}
                </p>
                {doc.stack && (
                  <p className="mt-4 font-mono text-[11px]" style={{ color: C.faint }}>
                    {doc.stack.join(" / ")}
                  </p>
                )}
              </div>
            </Link>
          ))}

          {/* the rest, as an index */}
          <ul className="mt-10">
            {rest.map((doc, i) => (
              <li key={doc.slug} style={{ borderBottom: `1px solid ${C.rule}` }}>
                <Link
                  href={`/work/${doc.slug}`}
                  className="e-row flex flex-wrap items-baseline gap-x-4 gap-y-1 py-4"
                >
                  <span className="font-mono text-[11px]" style={{ color: C.faint }}>
                    {String(featured.length + i + 1).padStart(2, "0")}
                  </span>
                  <span className="e-title text-[16px]">{doc.title}</span>
                  <span
                    className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: C.faint }}
                  >
                    {doc.context}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* repos */}
        <section id="repos" className="py-14" style={{ borderTop: `1px solid ${C.rule}` }}>
          <div className="mb-8 flex items-baseline gap-4">
            <h2 className={`${display.className} text-[26px]`}>Open source</h2>
            <span className="h-px flex-1" style={{ background: C.rule }} />
            <a href={site.links[0].href} target="_blank" rel="noreferrer" className="e-link font-mono text-[11px]">
              github
            </a>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {repoGroups.map((g) => (
              <div key={g.group} className="rounded-sm p-5" style={{ background: C.card, border: `1px solid ${C.rule}` }}>
                <p
                  className="font-mono text-[10.5px] uppercase tracking-[0.18em]"
                  style={{ color: C.accent }}
                >
                  {g.group}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.repos.map((r) => (
                    <li key={r.name}>
                      <a href={r.url} target="_blank" rel="noreferrer" className="e-link font-mono text-[12.5px]">
                        {r.name}
                      </a>
                      <span className="ml-2 font-mono text-[10.5px]" style={{ color: C.faint }}>
                        {r.language}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* colophon */}
        <footer
          className="flex flex-wrap items-baseline justify-between gap-4 py-10"
          style={{ borderTop: `2px solid ${C.ink}` }}
        >
          <p className={`${display.className} text-[18px]`}>
            Open to backend, systems and infrastructure roles.
          </p>
          <a href={`mailto:${site.email}`} className="e-link font-mono text-[14px]">
            {site.email}
          </a>
        </footer>
      </div>
    </div>
  );
}
