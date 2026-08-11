import Link from "next/link";
import { previewData } from "@/lib/preview-data";

export const metadata = { title: "Preview — Bento" };

const C = {
  bg: "#08080c",
  tile: "#111117",
  tile2: "#16161f",
  line: "#22222e",
  fg: "#f2f2f7",
  body: "#a1a1b0",
  faint: "#6c6c7d",
  accent: "#7c5cff",
  accent2: "#00d4a0",
};

function Tile({
  children,
  className = "",
  interactive,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`${interactive ? "b-tile" : ""} relative overflow-hidden rounded-2xl p-6 ${className}`}
      style={{ background: C.tile, border: `1px solid ${C.line}` }}
    >
      {children}
    </div>
  );
}

export default function BentoPreview() {
  const { site, metrics, featured, rest, repoGroups } = previewData();

  return (
    <div className="min-h-screen" style={{ background: C.bg, color: C.fg, ["--fg" as string]: C.fg } as React.CSSProperties}>
      <style>{`
        .b-tile { transition: transform .22s cubic-bezier(.22,.61,.36,1), border-color .22s, background .22s; }
        .b-tile:hover { transform: translateY(-3px); border-color:${C.accent}66 !important; background:${C.tile2} !important; }
        .b-tile:hover .b-arrow { color:${C.accent}; transform: translate(2px,-2px); }
        .b-arrow { transition: transform .22s, color .22s; display:inline-block; }
        .b-link:hover { color:${C.accent}; }
        .b-chip:hover { border-color:${C.accent}66; color:${C.fg}; }
      `}</style>

      {/* nav */}
      <header
        className="sticky top-0 z-20 backdrop-blur-xl"
        style={{ background: `${C.bg}d9`, borderBottom: `1px solid ${C.line}` }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-xl text-[12px] font-semibold"
            style={{ background: C.accent, color: "#fff" }}
          >
            AY
          </span>
          <span className="text-[14px] font-semibold">Aman Yadav</span>
          <nav className="ml-auto flex items-center gap-1 text-[13px]">
            <a href="#work" className="b-link rounded-lg px-3 py-1.5" style={{ color: C.body }}>
              Work
            </a>
            <a href="#code" className="b-link rounded-lg px-3 py-1.5" style={{ color: C.body }}>
              Code
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              className="ml-1 rounded-lg px-3.5 py-1.5 text-[13px] font-medium"
              style={{ background: C.accent, color: "#fff" }}
            >
              Résumé
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        {/* ---- hero grid ---- */}
        <div className="grid gap-3 md:grid-cols-3">
          {/* intro, spans 2 */}
          <Tile className="md:col-span-2">
            <div
              className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full opacity-[0.13] blur-3xl"
              style={{ background: C.accent }}
              aria-hidden
            />
            <p
              className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11.5px]"
              style={{ background: `${C.accent2}1a`, color: C.accent2 }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.accent2 }} />
              Available for roles
            </p>
            <h1 className="mt-5 max-w-[22ch] text-[clamp(1.9rem,4.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
              Backend &amp; distributed systems engineer
            </h1>
            <p className="mt-5 max-w-[54ch] text-[15.5px] leading-relaxed" style={{ color: C.body }}>
              I work on data pipelines, concurrency, and the infrastructure that keeps them fast.
              Currently at <span style={{ color: C.fg }}>Scaler AI Labs</span>; previously founding
              engineer on an AI stock-research platform.
            </p>
            <p className="mt-5 text-[12.5px]" style={{ color: C.faint }}>
              {site.location} · Third year, {site.education.map((e) => e.school).join(" + ")}
            </p>
          </Tile>

          {/* links tile */}
          <Tile>
            <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: C.faint }}>
              Find me
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {site.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="b-chip flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13.5px] transition-colors"
                  style={{ border: `1px solid ${C.line}`, color: C.body }}
                >
                  {l.label}
                  <span className="b-arrow" aria-hidden>
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </Tile>

        </div>

        {/* ---- metrics, own row of four ---- */}
        <div className="mt-3 grid gap-3 grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Tile key={m.label}>
              <p
                className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em]"
                style={{ color: i % 2 ? C.accent2 : C.accent }}
              >
                {m.value}
              </p>
              <p className="mt-1.5 text-[13.5px]">{m.label}</p>
              <p className="mt-0.5 text-[11.5px]" style={{ color: C.faint }}>
                {m.detail}
              </p>
            </Tile>
          ))}
        </div>

        {/* ---- work ---- */}
        <section id="work" className="mt-14 scroll-mt-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Work</h2>
              <p className="mt-1 text-[14px]" style={{ color: C.body }}>
                Problem, constraints, approach, tradeoffs — written up properly.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {featured.map((doc, i) => (
              <Link
                key={doc.slug}
                href={`/work/${doc.slug}`}
                className={i === 0 ? "md:col-span-2" : ""}
              >
                <Tile interactive className="h-full">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="rounded-lg px-2 py-0.5 text-[11px] font-medium"
                      style={{ background: `${C.accent}1f`, color: C.accent }}
                    >
                      {doc.context}
                    </span>
                    <span className="b-arrow text-[15px]" style={{ color: C.faint }} aria-hidden>
                      ↗
                    </span>
                  </div>
                  <h3
                    className={`mt-4 font-semibold leading-snug tracking-[-0.02em] ${
                      i === 0 ? "text-[clamp(1.25rem,2.6vw,1.6rem)]" : "text-[17px]"
                    }`}
                  >
                    {doc.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed" style={{ color: C.body }}>
                    {doc.summary}
                  </p>
                  {doc.stack && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {doc.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-md px-2 py-0.5 text-[11px]"
                          style={{ background: C.tile2, color: C.faint, border: `1px solid ${C.line}` }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </Tile>
              </Link>
            ))}

            {/* remaining, compact list tile */}
            <Tile className="md:col-span-2 !p-0">
              {rest.map((doc, i) => (
                <Link
                  key={doc.slug}
                  href={`/work/${doc.slug}`}
                  className="b-link flex flex-wrap items-center gap-x-4 gap-y-1 px-6 py-4"
                  style={{ borderTop: i > 0 ? `1px solid ${C.line}` : "none", color: C.fg }}
                >
                  <span className="text-[15px] font-medium">{doc.title}</span>
                  <span className="text-[12px]" style={{ color: C.faint }}>
                    {doc.context}
                  </span>
                  <span className="ml-auto text-[13px]" style={{ color: C.faint }} aria-hidden>
                    →
                  </span>
                </Link>
              ))}
            </Tile>
          </div>
        </section>

        {/* ---- code ---- */}
        <section id="code" className="mt-14 scroll-mt-20">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-semibold tracking-[-0.02em]">Open source</h2>
              <p className="mt-1 text-[14px]" style={{ color: C.body }}>
                Selected repositories.
              </p>
            </div>
            <a
              href={site.links[0].href}
              target="_blank"
              rel="noreferrer"
              className="b-link text-[13px]"
              style={{ color: C.body }}
            >
              All on GitHub ↗
            </a>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {repoGroups.map((g) => (
              <Tile key={g.group}>
                <p className="text-[11px] uppercase tracking-[0.16em]" style={{ color: C.accent2 }}>
                  {g.group}
                </p>
                <ul className="mt-4 space-y-3">
                  {g.repos.map((r) => (
                    <li key={r.name}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="b-link block text-[13.5px]"
                        style={{ color: C.fg }}
                      >
                        {r.name}
                      </a>
                      <span className="text-[11px]" style={{ color: C.faint }}>
                        {r.language}
                      </span>
                    </li>
                  ))}
                </ul>
              </Tile>
            ))}
          </div>
        </section>

        {/* ---- contact ---- */}
        <section className="mt-14">
          <Tile className="text-center">
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-[28rem] -translate-x-1/2 rounded-full opacity-[0.14] blur-3xl"
              style={{ background: C.accent }}
              aria-hidden
            />
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-[-0.02em]">
              Let&rsquo;s talk
            </h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-[15px]" style={{ color: C.body }}>
              Open to backend, systems and infrastructure roles — and always happy to talk about a
              pipeline that is slower than it should be.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block rounded-xl px-5 py-2.5 text-[14px] font-medium"
              style={{ background: C.accent, color: "#fff" }}
            >
              {site.email}
            </a>
          </Tile>
        </section>

        <footer className="py-10 text-center text-[12px]" style={{ color: C.faint }}>
          © {new Date().getFullYear()} Aman Yadav
        </footer>
      </div>
    </div>
  );
}
