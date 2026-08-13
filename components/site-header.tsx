import Link from "next/link";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ borderColor: "var(--line)", background: "rgba(5,6,10,0.72)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-x-5 px-6 py-3.5">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label={site.name}>
          <span
            className="grid h-8 w-8 place-items-center rounded-xl font-mono text-[12px] font-medium text-white"
            style={{
              background: "linear-gradient(135deg, var(--a1), var(--a2))",
              boxShadow: "0 6px 20px -8px rgba(124,92,255,0.9)",
            }}
            aria-hidden
          >
            ay
          </span>
          <span className="hidden text-[14.5px] font-semibold sm:inline">{site.name}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto sm:gap-1
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-2 py-1.5 text-[12.5px] text-[color:var(--muted)] transition-colors duration-300 hover:bg-[color:var(--surface)] hover:text-[color:var(--fg)] sm:px-3 sm:text-[13.5px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.resume}
          target="_blank"
          rel="noreferrer"
          className="btn-grad ml-1 shrink-0 !px-3.5 !py-2 !text-[12.5px] sm:!px-4 sm:!text-[13px]"
        >
          Résumé
        </a>
      </div>
    </header>
  );
}
