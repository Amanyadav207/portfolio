import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-shell items-center gap-x-5 gap-y-2 px-6 py-3.5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label={site.name}>
          <span
            className="grid h-7 w-7 place-items-center rounded-md border border-accent-line bg-accent-dim
              font-mono text-[11px] text-accent"
            aria-hidden
          >
            ay
          </span>
          <span className="hidden text-[14px] font-semibold tracking-[-0.015em] sm:inline">
            {site.name}
          </span>
        </Link>

        {/* Section anchors — plain links, so they work without JavaScript. */}
        <nav aria-label="Primary" className="flex min-w-0 items-center gap-0.5 overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-md px-2.5 py-1.5 font-mono text-[12.5px] text-muted
                transition-colors duration-200 ease-ui hover:bg-surface hover:text-fg"
            >
              {item.label.toLowerCase()}
            </Link>
          ))}
        </nav>

        <a href={site.resume} target="_blank" rel="noreferrer" className="chip ml-auto shrink-0">
          résumé
          <span aria-hidden>↓</span>
        </a>
      </div>
    </header>
  );
}
