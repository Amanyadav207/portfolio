import Link from "next/link";
import { previewData } from "@/lib/preview-data";

export const metadata = { title: "Preview — Terminal" };

const C = {
  bg: "#0a0c0a",
  panel: "#0f120f",
  line: "#1e241e",
  fg: "#d8e0d5",
  dim: "#6d7a6b",
  accent: "#7ee787",
  amber: "#e3b341",
};

function Prompt({ cmd }: { cmd: string }) {
  return (
    <div className="flex items-baseline gap-2 text-[13px]">
      <span style={{ color: C.accent }}>aman@sst</span>
      <span style={{ color: C.dim }}>:~$</span>
      <span style={{ color: C.fg }}>{cmd}</span>
    </div>
  );
}

export default function TerminalPreview() {
  const { site, metrics, work, repoGroups } = previewData();

  return (
    <div
      className="min-h-screen font-mono"
      style={{ background: C.bg, color: C.fg, fontSize: 14, lineHeight: 1.7, ["--fg" as string]: C.fg } as React.CSSProperties}
    >
      <style>{`
        .t-row:hover { background:${C.panel}; }
        .t-row:hover .t-name { color:${C.accent}; }
        .t-link:hover { color:${C.accent}; }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .t-cursor { animation: blink 1.1s step-end infinite; }
      `}</style>

      {/* window chrome */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-2.5 backdrop-blur"
        style={{ borderColor: C.line, background: `${C.bg}e6` }}
      >
        <span className="flex gap-1.5" aria-hidden>
          {["#e35d5d", "#e3b341", "#7ee787"].map((c) => (
            <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="text-[12px]" style={{ color: C.dim }}>
          aman-yadav — backend &amp; distributed systems — 80×24
        </span>
        <a
          href={site.resume}
          target="_blank"
          rel="noreferrer"
          className="t-link ml-auto text-[12px]"
          style={{ color: C.dim }}
        >
          ./resume.pdf
        </a>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        {/* whoami */}
        <Prompt cmd="whoami" />
        <div className="mb-2 mt-3 pl-4" style={{ borderLeft: `1px solid ${C.line}` }}>
          <h1 className="text-[clamp(1.5rem,4vw,2.1rem)] font-medium leading-tight" style={{ color: C.fg }}>
            Aman Yadav
            <span className="t-cursor ml-1" style={{ color: C.accent }}>
              ▊
            </span>
          </h1>
          <p className="mt-1 text-[13px]" style={{ color: C.accent }}>
            backend &amp; distributed systems engineer
          </p>
          <p className="mt-4 max-w-[70ch] text-[13.5px]" style={{ color: C.fg }}>
            I work on data pipelines, concurrency, and the infrastructure that keeps them fast.
            Currently building computer-use RL environments and the pipelines behind them at Scaler
            AI Labs; previously founding engineer on an AI stock-research platform.
          </p>
          <p className="mt-3 text-[12.5px]" style={{ color: C.dim }}>
            location: {site.location} &nbsp;·&nbsp; edu:{" "}
            {site.education.map((e) => e.school).join(" + ")} &nbsp;·&nbsp; year: 3
          </p>
        </div>

        {/* metrics */}
        <div className="mt-10">
          <Prompt cmd="cat impact.txt" />
          <table className="mt-3 w-full border-collapse text-[13px]">
            <tbody>
              {metrics.map((m) => (
                <tr key={m.label} style={{ borderBottom: `1px solid ${C.line}` }}>
                  <td className="w-[9rem] py-2 pr-4 align-top" style={{ color: C.amber }}>
                    {m.value}
                  </td>
                  <td className="py-2 pr-4 align-top" style={{ color: C.fg }}>
                    {m.label}
                  </td>
                  <td className="py-2 text-right align-top text-[12px]" style={{ color: C.dim }}>
                    {m.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* work */}
        <div className="mt-10">
          <Prompt cmd="ls -l work/" />
          <p className="mt-2 text-[12px]" style={{ color: C.dim }}>
            total {work.length}
          </p>
          <div className="mt-2" style={{ borderTop: `1px solid ${C.line}` }}>
            {work.map((doc, i) => (
              <Link
                key={doc.slug}
                href={`/work/${doc.slug}`}
                className="t-row grid grid-cols-[2.5rem_1fr] gap-x-3 px-2 py-3 md:grid-cols-[2.5rem_1fr_12rem]"
                style={{ borderBottom: `1px solid ${C.line}` }}
              >
                <span className="text-[12px]" style={{ color: C.dim }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="t-name block text-[14px]" style={{ color: C.fg }}>
                    {doc.title}
                    {doc.featured && (
                      <span className="ml-2 text-[11px]" style={{ color: C.amber }}>
                        ★
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block max-w-[74ch] text-[12.5px]" style={{ color: C.dim }}>
                    {doc.summary}
                  </span>
                  {doc.stack && (
                    <span className="mt-1.5 block text-[11.5px]" style={{ color: C.accent }}>
                      {doc.stack.map((s) => s.toLowerCase()).join(" ")}
                    </span>
                  )}
                </span>
                <span
                  className="hidden text-right text-[11.5px] md:block"
                  style={{ color: C.dim }}
                >
                  {doc.context}
                  <br />
                  {doc.period}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* open source */}
        <div className="mt-10">
          <Prompt cmd="git remote -v" />
          <div className="mt-3 grid gap-x-8 gap-y-6 md:grid-cols-3">
            {repoGroups.map((g) => (
              <div key={g.group}>
                <p className="text-[12px] uppercase tracking-widest" style={{ color: C.amber }}>
                  {g.group}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {g.repos.map((r) => (
                    <li key={r.name}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noreferrer"
                        className="t-link text-[12.5px]"
                        style={{ color: C.fg }}
                      >
                        {r.name}
                      </a>
                      <span className="ml-2 text-[11px]" style={{ color: C.dim }}>
                        {r.language}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* contact */}
        <div className="mt-10">
          <Prompt cmd="cat contact.json" />
          <pre
            className="mt-3 overflow-x-auto rounded border p-4 text-[12.5px]"
            style={{ borderColor: C.line, background: C.panel, color: C.fg }}
          >
{`{
  "email":  `}<a href={`mailto:${site.email}`} className="t-link" style={{ color: C.accent }}>{`"${site.email}"`}</a>{`,
`}{site.links.map((l) => (
  <span key={l.label}>{`  "${l.label.toLowerCase()}":`.padEnd(15)}<a href={l.href} target="_blank" rel="noreferrer" className="t-link" style={{ color: C.accent }}>{`"${l.handle}"`}</a>{`,\n`}</span>
))}{`  "open_to": "backend · systems · infrastructure roles"
}`}
          </pre>
        </div>

        <p className="mt-10 text-[12px]" style={{ color: C.dim }}>
          <span style={{ color: C.accent }}>aman@sst</span>
          <span>:~$ </span>
          <span className="t-cursor">▊</span>
        </p>
      </div>
    </div>
  );
}
