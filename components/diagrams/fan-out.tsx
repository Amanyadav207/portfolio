import { Figure } from "./figure";

const LEFT = 150;
const RIGHT = 646;

function xs(count: number): number[] {
  if (count === 1) return [(LEFT + RIGHT) / 2];
  const span = RIGHT - LEFT;
  return Array.from({ length: count }, (_, i) => LEFT + (i * span) / (count - 1));
}

interface Tier {
  y: number;
  count: number;
  tier: string;
  note: string;
  faded?: boolean;
}

const TIERS: Tier[] = [
  { y: 44, count: 1, tier: "tier 0", note: "1 source" },
  { y: 116, count: 4, tier: "tier 1", note: "×10" },
  { y: 188, count: 8, tier: "tier 2", note: "×100" },
  { y: 254, count: 16, tier: "tier 3", note: "×1,000 …", faded: true },
];

/**
 * The hierarchical fan-out: every tier that receives the manifest becomes a
 * source for the next tier, so serving capacity grows with the worker pool.
 */
export function FanOutTree() {
  return (
    <Figure
      caption="Hierarchical fan-out. Each tier that finishes receiving the manifest becomes a source for the next, so total serving capacity grows with the pool instead of staying pinned to one host."
      label="Tree diagram: one source seeds ten nodes, which seed one hundred, which seed one thousand, each tier becoming a source for the next."
      width={796}
      height={300}
    >
      {/* connectors */}
      {TIERS.slice(0, -1).map((tier, ti) => {
        const next = TIERS[ti + 1];
        const parents = xs(tier.count);
        const children = xs(next.count);
        const perParent = children.length / parents.length;

        return parents.flatMap((px, pi) =>
          children
            .slice(pi * perParent, (pi + 1) * perParent)
            .map((cx, ci) => (
              <line
                key={`${ti}-${pi}-${ci}`}
                x1={px}
                y1={tier.y + 9}
                x2={cx}
                y2={next.y - 9}
                stroke={next.faded ? "var(--line)" : "var(--line-2)"}
                strokeWidth={1}
                strokeDasharray={next.faded ? "3 3" : undefined}
              />
            ))
        );
      })}

      {/* tiers */}
      {TIERS.map((tier) => {
        const positions = xs(tier.count);
        const isSource = tier.y === TIERS[0].y;

        return (
          <g key={tier.tier} opacity={tier.faded ? 0.45 : 1}>
            <text x={16} y={tier.y + 4} className="fill-[var(--dim)] font-mono text-[11px]">
              {tier.tier}
            </text>
            <text
              x={780}
              y={tier.y + 4}
              textAnchor="end"
              className="fill-[var(--muted)] font-mono text-[11px]"
            >
              {tier.note}
            </text>

            {positions.map((x, i) =>
              isSource ? (
                <rect
                  key={i}
                  x={x - 34}
                  y={tier.y - 11}
                  width={68}
                  height={22}
                  rx={3}
                  fill="var(--surface)"
                  stroke="var(--accent)"
                  strokeWidth={1.25}
                />
              ) : (
                <circle
                  key={i}
                  cx={x}
                  cy={tier.y}
                  r={7}
                  fill="var(--surface)"
                  stroke="var(--line-2)"
                  strokeWidth={1.25}
                />
              )
            )}

            {isSource && (
              <text
                x={positions[0]}
                y={tier.y + 4}
                textAnchor="middle"
                className="fill-[var(--accent)] font-mono text-[11px]"
              >
                manifest
              </text>
            )}
          </g>
        );
      })}
    </Figure>
  );
}

/**
 * Why more workers stopped helping: a single source divides one fixed egress
 * budget across every consumer.
 */
export function FlatVsTree() {
  const workers = Array.from({ length: 9 }, (_, i) => 60 + i * 34);

  return (
    <Figure
      caption="Flat distribution divides one fixed egress budget across every consumer, so per-worker throughput falls as the pool grows. Tree distribution adds a serving host with every tier."
      label="Comparison: a single source feeding many workers directly, versus a tiered tree where each tier serves the next."
      width={796}
      height={224}
    >
      {/* ---- left panel: flat ---- */}
      <text x={16} y={20} className="fill-[var(--muted)] font-mono text-[11px]">
        flat — one source
      </text>

      <rect
        x={122}
        y={40}
        width={68}
        height={22}
        rx={3}
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth={1.25}
      />
      <text x={156} y={55} textAnchor="middle" className="fill-[var(--accent)] font-mono text-[11px]">
        source
      </text>

      {workers.map((x, i) => (
        <g key={i}>
          <line
            x1={156}
            y1={62}
            x2={x - 260 + 190}
            y2={132}
            stroke="var(--line)"
            strokeWidth={1}
          />
          <circle
            cx={x - 260 + 190}
            cy={140}
            r={6}
            fill="var(--surface)"
            stroke="var(--line-2)"
            strokeWidth={1.25}
          />
        </g>
      ))}

      <text x={16} y={182} className="fill-[var(--dim)] font-mono text-[11px]">
        egress ÷ N
      </text>
      <line x1={90} y1={178} x2={330} y2={178} stroke="var(--line-2)" strokeWidth={1} />
      <text x={186} y={200} className="fill-[var(--dim)] font-mono text-[11px]">
        per-worker share shrinks as N grows
      </text>

      {/* divider */}
      <line x1={398} y1={16} x2={398} y2={208} stroke="var(--line)" strokeWidth={1} />

      {/* ---- right panel: tree ---- */}
      <text x={432} y={20} className="fill-[var(--muted)] font-mono text-[11px]">
        tree — every tier serves
      </text>

      <rect
        x={556}
        y={40}
        width={68}
        height={22}
        rx={3}
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth={1.25}
      />
      <text x={590} y={55} textAnchor="middle" className="fill-[var(--accent)] font-mono text-[11px]">
        source
      </text>

      {[500, 590, 680].map((x, i) => (
        <g key={i}>
          <line x1={590} y1={62} x2={x} y2={92} stroke="var(--line-2)" strokeWidth={1} />
          <circle cx={x} cy={100} r={7} fill="var(--surface)" stroke="var(--line-2)" strokeWidth={1.25} />
          {[x - 26, x, x + 26].map((cx, ci) => (
            <g key={ci}>
              <line x1={x} y1={107} x2={cx} y2={132} stroke="var(--line)" strokeWidth={1} />
              <circle cx={cx} cy={140} r={6} fill="var(--surface)" stroke="var(--line)" strokeWidth={1.25} />
            </g>
          ))}
        </g>
      ))}

      <text x={432} y={182} className="fill-[var(--dim)] font-mono text-[11px]">
        capacity ∝ tiers
      </text>
      <line x1={556} y1={178} x2={764} y2={178} stroke="var(--line-2)" strokeWidth={1} />
      <text x={432} y={200} className="fill-[var(--dim)] font-mono text-[11px]">
        each receiver becomes a sender
      </text>
    </Figure>
  );
}
