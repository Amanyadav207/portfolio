import { Figure } from "./figure";

interface NodeSpec {
  x: number;
  y: number;
  name: string;
  attrs: number;
  /** Children the platform did not surface on its own. */
  missing?: boolean;
}

function Tree({
  ox,
  nodes,
  edges,
}: {
  ox: number;
  nodes: NodeSpec[];
  edges: [number, number][];
}) {
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={ox + nodes[a].x}
          y1={nodes[a].y + 13}
          x2={ox + nodes[b].x}
          y2={nodes[b].y - 5}
          stroke={nodes[b].missing ? "var(--line)" : "var(--line-strong)"}
          strokeWidth={1}
          strokeDasharray={nodes[b].missing ? "3 3" : undefined}
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i} opacity={n.missing ? 0.4 : 1}>
          <rect
            x={ox + n.x - 52}
            y={n.y - 5}
            width={104}
            height={18}
            rx={3}
            fill="var(--bg)"
            stroke={n.missing ? "var(--line)" : "var(--line-strong)"}
            strokeWidth={1}
            strokeDasharray={n.missing ? "3 3" : undefined}
          />
          <text
            x={ox + n.x - 46}
            y={n.y + 8}
            className="fill-[var(--muted)] font-mono text-[10px]"
          >
            {n.name}
          </text>
          {/* attribute richness, one tick per surfaced property */}
          {Array.from({ length: n.attrs }, (_, k) => (
            <rect
              key={k}
              x={ox + n.x + 44 - k * 5}
              y={n.y - 1}
              width={3}
              height={10}
              rx={1}
              fill="var(--accent)"
            />
          ))}
        </g>
      ))}
    </g>
  );
}

const LAYOUT: NodeSpec[] = [
  { x: 88, y: 44, name: "window", attrs: 5 },
  { x: 42, y: 92, name: "toolbar", attrs: 4 },
  { x: 150, y: 92, name: "grid", attrs: 5 },
  { x: 110, y: 140, name: "row", attrs: 4 },
  { x: 200, y: 140, name: "cell", attrs: 5 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [2, 3],
  [2, 4],
];

/**
 * Same UI, two accessibility backends. Windows UI Automation surfaced fewer
 * properties per node and did not expose parts of the subtree by default.
 */
export function AxParity() {
  const sparse = LAYOUT.map((n, i) => ({
    ...n,
    attrs: i === 0 ? 2 : 1,
    missing: i === 3 || i === 4,
  }));

  return (
    <Figure
      caption="The same interface as reported by each platform. Ticks mark properties surfaced per node; dashed nodes were not returned by a default traversal. Restoring parity meant issuing extra property and child-traversal queries per node until the Windows tree carried the same context the classifier already relied on."
      label="Comparison of accessibility trees: the macOS AX API returns five nodes with several properties each, while Windows UI Automation returns fewer properties and omits two child nodes."
      width={796}
      height={220}
    >
      <text x={16} y={20} className="fill-[var(--muted)] font-mono text-[11px]">
        macOS · AX API
      </text>
      <Tree ox={60} nodes={LAYOUT} edges={EDGES} />

      <line x1={398} y1={14} x2={398} y2={206} stroke="var(--line)" strokeWidth={1} />

      <text x={432} y={20} className="fill-[var(--muted)] font-mono text-[11px]">
        Windows · UI Automation
      </text>
      <Tree ox={476} nodes={sparse} edges={EDGES} />

      <g>
        <rect
          x={16}
          y={182}
          width={9}
          height={9}
          rx={1}
          fill="var(--accent)"
        />
        <text x={32} y={191} className="fill-[var(--dim)] font-mono text-[10px]">
          property surfaced
        </text>
        <rect
          x={172}
          y={182}
          width={9}
          height={9}
          rx={1}
          fill="none"
          stroke="var(--line)"
          strokeDasharray="2 2"
        />
        <text x={188} y={191} className="fill-[var(--dim)] font-mono text-[10px]">
          node absent from default traversal
        </text>
      </g>
    </Figure>
  );
}
