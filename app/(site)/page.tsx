import Link from "next/link";
import { getAllDocs } from "@/lib/content";
import { bio, experience, metrics, principles, site } from "@/lib/site";
import { repoGroups } from "@/lib/repos";
import { SystemMonitor } from "@/components/system-monitor";
import { RotatingHeadline } from "@/components/rotating-headline";
import { Reveal } from "@/components/reveal";

const STACK = [
  "Go", "Python", "TypeScript", "Java", "Next.js", "FastAPI", "Gin",
  "PostgreSQL", "ClickHouse", "MongoDB", "Redis", "Docker", "WebSockets", "CRDTs",
  "Reinforcement Learning", "OpenAI API", "CrewAI", "Agent tooling",
];

function SectionHead({
  index,
  id,
  title,
  action,
}: {
  index: string;
  id: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
      <div>
        <p className="comment label">
          {index} — {id}
        </p>
        <h2 className="mt-3 text-[clamp(1.5rem,3.4vw,2.1rem)] font-medium">{title}</h2>
      </div>
      {action && (
        <a href={action.href} target="_blank" rel="noreferrer" className="chip">
          {action.label} <span aria-hidden>↗</span>
        </a>
      )}
    </div>
  );
}

export default function HomePage() {
  const work = getAllDocs("work");
  // Each role owns the write-ups produced during it; everything else is a
  // personal project.
  const byRole = experience.map((role) => ({
    role,
    docs: work.filter((d) => d.context === role.context),
  }));
  const projects = work.filter((d) => !experience.some((r) => r.context === d.context));

  return (
    <>
      <Reveal />

      {/* ================= hero ================= */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--line)" }}>
        <div className="grid-bg" aria-hidden />
        <div
          className="glow"
          style={{
            top: "-16rem",
            left: "8%",
            width: "34rem",
            height: "34rem",
            background: "radial-gradient(circle, rgba(0,229,160,0.16), transparent 65%)",
          }}
          aria-hidden
        />
        <div
          className="glow"
          style={{
            top: "-10rem",
            right: "2%",
            width: "30rem",
            height: "30rem",
            background: "radial-gradient(circle, rgba(56,189,248,0.14), transparent 65%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[12.5px]">
              <span style={{ color: "var(--a1)" }}>aman@localhost</span>
              <span style={{ color: "var(--dim)" }}>:~$</span>{" "}
              <span style={{ color: "var(--muted)" }}>whoami</span>
            </p>

            <RotatingHeadline />

            <p
              className="mt-5 text-[14px]"
              style={{ color: "var(--a1)" }}
            >
              backend · distributed systems · ai infrastructure
            </p>

            {/* A brief, not a status line — this stays true when the job
                changes. Depth lives in the About section. */}
            <p
              className="reading mt-5 max-w-[54ch] text-[16px] leading-[1.7]"
              style={{ color: "var(--muted)" }}
            >
              I care about the parts of a system that decide whether it holds up: how work gets
              distributed, how state stays correct, and where the bottleneck actually is.
            </p>


            <div
              className="mt-8 flex flex-wrap items-center gap-2.5"
              
            >
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-primary">
                resume.pdf <span aria-hidden>↓</span>
              </a>
              <a href={`mailto:${site.email}`} className="btn-ghost">
                get in touch <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {site.links.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="chip">
                  {l.label.toLowerCase()}
                  <span aria-hidden className="opacity-50">↗</span>
                </a>
              ))}
            </div>
          </div>

          <div
            className="panel panel-brackets p-5"
            
          >
            <div
              className="mb-4 flex items-center justify-between border-b pb-3"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="label">system.monitor</span>
              <span className="text-[11px]" style={{ color: "var(--a1)" }}>
                ● live
              </span>
            </div>
            <SystemMonitor />
          </div>
        </div>

        {/* stack marquee */}
        <div className="relative border-t" style={{ borderColor: "var(--line)" }}>
          <div className="flex overflow-hidden py-3">
            <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
              {[...STACK, ...STACK].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="whitespace-nowrap text-[12.5px]"
                  style={{ color: "var(--dim)" }}
                >
                  {tech}
                  <span className="ml-8 opacity-50" style={{ color: "var(--a1)" }}>
                    ::
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= metrics ================= */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="panel panel-hover p-5"
              data-reveal
              style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <p className="label mb-3">{String(i + 1).padStart(2, "0")}</p>
              <p
                className="text-[clamp(1.4rem,2.6vw,1.85rem)] font-medium tracking-[-0.04em]"
                style={{ color: i % 2 ? "var(--a2)" : "var(--a1)" }}
              >
                {m.value}
              </p>
              <p className="mt-2 text-[13px]" style={{ color: "var(--fg)" }}>
                {m.label}
              </p>
              <p className="mt-0.5 text-[11px]" style={{ color: "var(--dim)" }}>
                {m.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= about ================= */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHead index="01" id="about" title="How I work" />

        <div className="mt-9 grid gap-3 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="panel panel-brackets p-6 lg:p-8" data-reveal>
            <div className="reading max-w-[68ch] space-y-5 text-[15.5px] leading-[1.75]" style={{ color: "var(--muted)" }}>
              {bio.map((para, i) => (
                <p key={i} className={i === 0 ? "text-[17px]" : undefined} style={i === 0 ? { color: "var(--fg)" } : undefined}>
                  {para}
                </p>
              ))}
            </div>

            <p className="mt-7 border-t pt-5 text-[12px]" style={{ borderColor: "var(--line)", color: "var(--dim)" }}>
              Third year · {site.education.map((e) => e.school).join(" + ")}
            </p>
          </div>

          <div
            className="panel p-6"
            data-reveal
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            <p className="label">principles</p>
            <dl className="mt-5 space-y-5">
              {principles.map((pr) => (
                <div key={pr.k}>
                  <dt className="text-[13px]" style={{ color: "var(--a1)" }}>
                    {pr.k}
                  </dt>
                  <dd className="reading mt-1 text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {pr.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ================= experience ================= */}
      <section id="experience" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHead index="02" id="experience" title="Where I've shipped" />

        <div className="mt-9 space-y-3">
          {byRole.map(({ role, docs }, ri) => (
            <div
              key={role.company}
              className="panel panel-brackets p-6 lg:p-7"
              data-reveal
              style={{ "--delay": `${ri * 70}ms` } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[clamp(1.15rem,2.4vw,1.45rem)] font-medium transition-colors duration-300 hover:text-[color:var(--a1)]"
                    >
                      {role.company}
                      <span className="ml-1.5 text-[12px] opacity-40" aria-hidden>
                        ↗
                      </span>
                    </a>
                    {role.current && (
                      <span
                        className="rounded-[3px] border px-2 py-0.5 text-[11px]"
                        style={{ borderColor: "var(--accent-line)", color: "var(--a1)" }}
                      >
                        [current]
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[14px]" style={{ color: "var(--muted)" }}>
                    {role.role}
                  </p>
                </div>

                <div className="text-right text-[12px]">
                  <p style={{ color: "var(--fg)" }}>{role.period}</p>
                  <p style={{ color: "var(--dim)" }}>{role.location}</p>
                </div>
              </div>

              <p
                className="reading mt-5 max-w-[76ch] text-[15px] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {role.blurb}
              </p>

              {docs.length > 0 && (
                <div className="mt-6 border-t pt-5" style={{ borderColor: "var(--line)" }}>
                  <p className="label mb-3.5">
                    ls ./deep-dives — {docs.length} {docs.length === 1 ? "entry" : "entries"}
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {docs.map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/work/${doc.slug}`}
                        className="group rounded-[5px] border p-4 transition-all duration-300 hover:-translate-y-0.5"
                        style={{ borderColor: "var(--line)", background: "var(--bg-2)" }}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-[14px] font-medium leading-snug transition-colors duration-300 group-hover:text-[color:var(--a1)]">
                            {doc.title}
                          </span>
                          <span
                            className="shrink-0 text-[12px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            style={{ color: "var(--dim)" }}
                            aria-hidden
                          >
                            ↗
                          </span>
                        </span>
                        <span
                          className="reading mt-2 block text-[13.5px] leading-relaxed"
                          style={{ color: "var(--muted)" }}
                        >
                          {doc.summary}
                        </span>
                        <span className="mt-3 block text-[10.5px]" style={{ color: "var(--dim)" }}>
                          ~/work/{doc.slug}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= projects ================= */}
      <section id="projects" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHead index="03" id="projects" title="Built on my own time" />

        <div className="mt-9 grid gap-3 md:grid-cols-2">
          {projects.map((doc, i) => (
            <Link
              key={doc.slug}
              href={`/work/${doc.slug}`}
              className="panel panel-brackets panel-hover group flex flex-col p-6"
              data-reveal
              style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className="text-[13px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: "var(--dim)" }}
                  aria-hidden
                >
                  ↗
                </span>
              </div>

              <h3 className="mt-4 text-[17px] font-medium transition-colors duration-300 group-hover:text-[color:var(--a1)]">
                {doc.title}
              </h3>

              <p
                className="reading mt-3 max-w-[62ch] flex-1 text-[14.5px] leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {doc.summary}
              </p>

              {doc.stack && (
                <div className="mt-5 flex flex-wrap gap-1.5">
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
      </section>

      {/* ================= open source ================= */}
      <section id="open-source" className="mx-auto max-w-6xl px-6 py-14">
        <SectionHead
          index="04"
          id="open-source"
          title="Things I build to learn"
          action={{ href: site.links[0].href, label: "all repositories" }}
        />

        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {repoGroups.map((g, gi) => (
            <div
              key={g.group}
              className="panel p-5"
              data-reveal
              style={{ "--delay": `${gi * 70}ms` } as React.CSSProperties}
            >
              <p className="label" style={{ color: "var(--a2)" }}>
                {g.group}
              </p>
              <ul className="mt-4 space-y-4">
                {g.repos.map((r) => (
                  <li key={r.name}>
                    <a href={r.url} target="_blank" rel="noreferrer" className="group block">
                      <span className="flex items-baseline gap-1.5">
                        <span style={{ color: "var(--dim)" }}>/</span>
                        <span className="text-[13px] transition-colors duration-300 group-hover:text-[color:var(--a1)]">
                          {r.name}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[10.5px]" style={{ color: "var(--dim)" }}>
                        {r.language}
                      </span>
                      {r.note && (
                        <span
                          className="reading mt-1.5 block text-[13px] leading-snug"
                          style={{ color: "var(--muted)" }}
                        >
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
      <section id="contact" className="mx-auto max-w-6xl px-6 py-14">
        <div className="panel panel-brackets relative overflow-hidden p-8 lg:p-12" data-reveal>
          <div className="grid-bg opacity-40" aria-hidden />
          <div className="relative">
            <p className="prompt text-[12.5px]" style={{ color: "var(--muted)" }}>
              cat contact.json
            </p>
            <pre
              className="mt-4 overflow-x-auto text-[13px] leading-[1.9]"
              style={{ color: "var(--muted)" }}
            >
              {`{\n  "email":    `}
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4"
                style={{ color: "var(--a1)" }}
              >{`"${site.email}"`}</a>
              {`,\n  "open_to":  "backend · systems · infrastructure",\n  "location": "${site.location}",\n  "resume":   `}
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
                style={{ color: "var(--a2)" }}
              >{`"${site.resume}"`}</a>
              {`\n}`}
            </pre>

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a href={`mailto:${site.email}`} className="btn-primary">
                send mail <span aria-hidden>→</span>
              </a>
              <a href={site.resume} target="_blank" rel="noreferrer" className="btn-ghost">
                resume.pdf <span aria-hidden>↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
