import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-10 border-t" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-[16px] font-semibold">{site.name}</p>
          <p className="mt-2 max-w-[40ch] text-[14px] leading-relaxed text-[color:var(--muted)]">
            {site.role} · {site.location}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-block font-mono text-[13px]"
            style={{ color: "var(--a2)" }}
          >
            {site.email}
          </a>
        </div>

        <div>
          <p className="label">Sections</p>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13.5px] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Elsewhere</p>
          <ul className="mt-4 space-y-2.5">
            {site.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13.5px] text-[color:var(--muted)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="mx-auto max-w-6xl border-t px-6 py-6"
        style={{ borderColor: "var(--line)" }}
      >
        <p className="font-mono text-[11.5px] text-[color:var(--dim)]">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
