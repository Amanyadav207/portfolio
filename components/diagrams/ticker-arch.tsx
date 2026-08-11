import { Figure } from "./figure";

function Node({
  x,
  y,
  w,
  title,
  sub,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  title: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={sub ? 44 : 28}
        rx={4}
        fill="var(--bg)"
        stroke={accent ? "var(--accent)" : "var(--line-strong)"}
        strokeWidth={1.25}
      />
      <text
        x={x + 9}
        y={y + 18}
        className={`font-mono text-[11px] ${accent ? "fill-[var(--accent)]" : "fill-[var(--fg)]"}`}
      >
        {title}
      </text>
      {sub && (
        <text x={x + 9} y={y + 34} className="fill-[var(--dim)] font-mono text-[10px]">
          {sub}
        </text>
      )}
    </g>
  );
}

/** Ticker360, as described on my résumé: Next.js front end, Go API, Python AI service. */
export function TickerArch() {
  return (
    <Figure
      caption="Three services with distinct jobs: a Next.js front end rendering mostly pre-built routes, a Go API serving market data assembled from two vendors, and a Python service handling streamed chat and tool-calling against the same database. Ingestion runs on a schedule rather than in the request path."
      label="Architecture: Next.js front end talking to a Go API and a Python AI service; the Go API reads MongoDB, which is populated by cron-scheduled ingestion from two market-data vendors."
      width={796}
      height={288}
    >
      <defs>
        <marker id="t-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--line-strong)" />
        </marker>
      </defs>

      <Node x={16} y={112} w={150} title="Next.js" sub="ISR / SSG routes" accent />

      <Node x={266} y={56} w={168} title="Go API (Gin)" sub="goroutine worker pools" />
      <Node x={266} y={168} w={168} title="Python AI service" sub="streamed chat, tools" />

      <Node x={534} y={112} w={150} title="MongoDB" sub="indexed for read patterns" />

      <Node x={534} y={16} w={246} title="market-data vendors ×2" sub="prices · fundamentals · news" />
      <Node x={266} y={244} w={168} title="cron ingestion" />

      {/* front end → services */}
      <line x1={166} y1={122} x2={266} y2={78} stroke="var(--line-strong)" strokeWidth={1} markerEnd="url(#t-arrow)" />
      <line x1={166} y1={140} x2={266} y2={186} stroke="var(--line-strong)" strokeWidth={1} markerEnd="url(#t-arrow)" />

      {/* services → db */}
      <line x1={434} y1={78} x2={534} y2={124} stroke="var(--line-strong)" strokeWidth={1} markerEnd="url(#t-arrow)" />
      <line x1={434} y1={186} x2={534} y2={142} stroke="var(--line-strong)" strokeWidth={1} markerEnd="url(#t-arrow)" />

      {/* ingestion path */}
      <line x1={434} y1={252} x2={609} y2={252} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 3" />
      <line x1={609} y1={252} x2={609} y2={158} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 3" markerEnd="url(#t-arrow)" />
      <line x1={657} y1={44} x2={657} y2={110} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 3" markerEnd="url(#t-arrow)" />

      <text x={16} y={176} className="fill-[var(--dim)] font-mono text-[10px]">
        access / refresh
      </text>
      <text x={16} y={190} className="fill-[var(--dim)] font-mono text-[10px]">
        token auth
      </text>
      <text x={16} y={266} className="fill-[var(--dim)] font-mono text-[10px]">
        dashed = scheduled, off the request path
      </text>
    </Figure>
  );
}
