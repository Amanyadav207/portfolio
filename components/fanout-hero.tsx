const W = 460;
const H = 250;
const GUTTER = 54;

interface Tier {
  y: number;
  n: number;
  inset: number;
}

const TIERS: Tier[] = [
  { y: 30, n: 1, inset: 0 },
  { y: 100, n: 3, inset: 92 },
  { y: 170, n: 9, inset: 26 },
  { y: 222, n: 18, inset: 6 },
];

function xs({ n, inset }: Tier) {
  const left = GUTTER + inset;
  const right = W - inset;
  if (n === 1) return [(left + right) / 2];
  return Array.from({ length: n }, (_, i) => left + (i * (right - left)) / (n - 1));
}

interface Edge {
  d: string;
  tier: number;
  index: number;
}

/**
 * Live view of the hierarchical fan-out: packets leave the source, and each
 * tier that receives one starts seeding the tier below it. The motion carries
 * the idea — every receiver becomes a sender — better than a static tree does.
 */
export function FanoutHero() {
  const positions = TIERS.map(xs);

  const edges: Edge[] = [];
  TIERS.slice(0, -1).forEach((tier, ti) => {
    const parents = positions[ti];
    const children = positions[ti + 1];
    const per = children.length / parents.length;
    parents.forEach((px, pi) => {
      children.slice(pi * per, (pi + 1) * per).forEach((cx, ci) => {
        edges.push({
          d: `M ${px} ${tier.y} L ${cx} ${TIERS[ti + 1].y}`,
          tier: ti,
          index: pi * per + ci,
        });
      });
    });
  });

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Live diagram: packets leaving a single source and propagating through tiers of workers, each tier seeding the next until a thousand are reached."
      >
        <defs>
          <linearGradient id="fan-edge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.28" />
          </linearGradient>
          <filter id="fan-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* static skeleton */}
        {edges.map((e, i) => (
          <path
            key={`e${i}`}
            d={e.d}
            stroke="url(#fan-edge)"
            strokeWidth={e.tier === 0 ? 1.2 : 0.8}
            fill="none"
          />
        ))}

        {/* packets in flight — each tier fires after the one above it */}
        {edges.map((e, i) => (
          <circle
            key={`p${i}`}
            r={e.tier === 0 ? 2.8 : 2}
            fill={e.tier === 0 ? "#00e5a0" : "#38bdf8"}
            filter="url(#fan-glow)"
            className="packet"
            style={{
              offsetPath: `path("${e.d}")`,
              animationDelay: `${e.tier * 1.15 + e.index * 0.045}s`,
            }}
          />
        ))}

        {/* nodes light up as their tier receives */}
        {TIERS.map((tier, ti) =>
          positions[ti].map((x, i) => (
            <circle
              key={`n${ti}-${i}`}
              className="fan-node"
              cx={x}
              cy={tier.y}
              r={ti === 0 ? 7 : ti === 1 ? 4.5 : ti === 2 ? 2.8 : 1.9}
              fill={ti === 0 ? "#00e5a0" : ti === 1 ? "#20d8b8" : "#38bdf8"}
              filter={ti < 2 ? "url(#fan-glow)" : undefined}
              style={{ animationDelay: `${ti * 1.15 + i * 0.03}s` }}
            />
          ))
        )}

        {/* tier gutter */}
        {["src", "×10", "×100", "×1k"].map((t, i) => (
          <text
            key={t}
            x={8}
            y={TIERS[i].y + 3.5}
            className="font-mono"
            fontSize="9.5"
            fill="rgba(255,255,255,0.28)"
          >
            {t}
          </text>
        ))}
      </svg>

      {/* readout strip */}
      <dl
        className="mt-4 grid grid-cols-3 border-t pt-4 text-center"
        style={{ borderColor: "var(--line)" }}
      >
        {[
          ["workers", "8,000"],
          ["tiers", "4"],
          ["runtime", "<3h"],
        ].map(([k, v]) => (
          <div key={k}>
            <dd className="text-[15px]" style={{ color: "var(--a1)" }}>
              {v}
            </dd>
            <dt
              className="mt-0.5 text-[10px] uppercase tracking-[0.14em]"
              style={{ color: "var(--dim)" }}
            >
              {k}
            </dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
