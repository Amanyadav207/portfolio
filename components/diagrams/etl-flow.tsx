import { Figure } from "./figure";

function Stage({
  x,
  label,
  sub,
}: {
  x: number;
  label: string;
  sub: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={54}
        width={132}
        height={52}
        rx={5}
        fill="var(--bg)"
        stroke="var(--line-2)"
        strokeWidth={1.25}
      />
      <text x={x + 12} y={76} className="font-mono text-[12px]" fill="var(--fg)">
        {label}
      </text>
      <text x={x + 12} y={93} className="font-mono text-[10px]" fill="var(--dim)">
        {sub}
      </text>
    </g>
  );
}

/** Four stages, one quarantine branch, two observability sinks. */
export function EtlFlow() {
  const stages = [
    { x: 14, label: "extract", sub: "sheets api" },
    { x: 186, label: "transform", sub: "normalise" },
    { x: 358, label: "validate", sub: "field rules" },
    { x: 530, label: "load", sub: "on conflict" },
  ];

  return (
    <Figure
      caption="Each stage owns one job, so a failure is attributable rather than generic. Rows that fail validation branch into a dead-letter table with their reason attached instead of being dropped, and every run appends its totals to a metrics table."
      width={796}
      height={228}
      label="Pipeline: extract from Google Sheets, transform, validate, then load into PostgreSQL with ON CONFLICT DO NOTHING. Invalid rows branch off to a dead-letter table; each run records metrics."
    >
      <defs>
        <marker id="etl-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--line-2)" />
        </marker>
      </defs>

      {stages.map((s) => (
        <Stage key={s.label} {...s} />
      ))}

      {/* happy path */}
      {[146, 318, 490].map((x) => (
        <line
          key={x}
          x1={x}
          y1={80}
          x2={x + 38}
          y2={80}
          stroke="var(--line-2)"
          strokeWidth={1.25}
          markerEnd="url(#etl-arrow)"
        />
      ))}

      {/* target store */}
      <rect
        x={662}
        y={54}
        width={120}
        height={52}
        rx={5}
        fill="var(--bg)"
        stroke="var(--a1)"
        strokeWidth={1.25}
      />
      <text x={674} y={76} className="font-mono text-[12px]" fill="var(--a1)">
        postgres
      </text>
      <text x={674} y={93} className="font-mono text-[10px]" fill="var(--dim)">
        students
      </text>
      <line
        x1={662}
        y1={80}
        x2={648}
        y2={80}
        stroke="var(--line-2)"
        strokeWidth={1.25}
        transform="translate(14,0)"
        markerEnd="url(#etl-arrow)"
      />

      {/* dead-letter branch */}
      <path
        d="M424 106 L424 168"
        stroke="var(--a3)"
        strokeWidth={1.25}
        strokeDasharray="4 3"
        fill="none"
        markerEnd="url(#etl-arrow)"
      />
      <text x={432} y={140} className="font-mono text-[10px]" fill="var(--a3)">
        invalid
      </text>
      <rect
        x={330}
        y={174}
        width={188}
        height={40}
        rx={5}
        fill="var(--bg)"
        stroke="var(--a3)"
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      <text x={342} y={193} className="font-mono text-[11px]" fill="var(--a3)">
        invalid_rows
      </text>
      <text x={430} y={193} className="font-mono text-[9.5px]" fill="var(--dim)">
        dead-letter queue
      </text>
      <text x={342} y={207} className="font-mono text-[9.5px]" fill="var(--dim)">
        json payload + reason
      </text>

      {/* metrics sink */}
      <path
        d="M596 106 L596 168"
        stroke="var(--line)"
        strokeWidth={1.25}
        strokeDasharray="4 3"
        fill="none"
        markerEnd="url(#etl-arrow)"
      />
      <rect
        x={548}
        y={174}
        width={188}
        height={40}
        rx={5}
        fill="var(--bg)"
        stroke="var(--line)"
        strokeWidth={1}
      />
      <text x={560} y={193} className="font-mono text-[11px]" fill="var(--muted)">
        etl_runs
      </text>
      <text x={560} y={207} className="font-mono text-[9.5px]" fill="var(--dim)">
        total · valid · invalid · inserted
      </text>

      <text x={14} y={26} className="font-mono text-[10.5px]" fill="var(--dim)">
        untrusted source
      </text>
      <text x={662} y={26} className="font-mono text-[10.5px]" fill="var(--dim)">
        idempotent sink
      </text>
    </Figure>
  );
}
