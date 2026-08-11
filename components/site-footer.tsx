import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-shell gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-[15px] font-semibold">{site.name}</p>
          <p className="mt-1.5 max-w-[38ch] text-[13.5px] leading-relaxed text-muted">
            {site.role} · {site.location}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-block font-mono text-[12.5px] text-accent hover:underline"
          >
            {site.email}
          </a>
        </div>

        <div>
          <p className="label">Pages</p>
          <ul className="mt-3 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[12.5px] text-muted transition-colors duration-200 ease-ui hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label">Elsewhere</p>
          <ul className="mt-3 space-y-2">
            {site.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[12.5px] text-muted transition-colors duration-200 ease-ui hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-shell border-t border-line px-6 py-5">
        <p className="font-mono text-[11.5px] text-dim">
          Built with Next.js · statically exported
        </p>
      </div>
    </footer>
  );
}
