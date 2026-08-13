const W = 440;
const H = 292;

interface Tier {
  y: number;
  n: number;
}

const TIERS: Tier[] = [
  { y: 38, n: 1 },
  { y: 116, n: 3 },
  { y: 194, n: 9 },
  { y: 250, n: 18 },
];

const GUTTER = 52;

function xs(n: number, inset: number) {
  const left = GUTTER + inset;
  const right = W - inset;
  if (n === 1) return [(left + right) / 2];
  const span = right - left;
  return Array.from({ length: n }, (_, i) => left + (i * span) / (n - 1));
}

const INSETS = [0, 96, 30, 8];

/**
 * The hierarchical fan-out, animated: the manifest propagates tier by tier,
 * each layer lighting up after the one above it. Signature work as hero art.
 */
export function FanoutHero() {
  const positions = TIERS.map((t, i) => xs(t.n, INSETS[i]));

  return (
    <div className="relative">
      <style>{`
        .fan-edge {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: sweep 5.5s ease-in-out infinite;
        }
        .fan-node { animation: pulse-node 5.5s ease-in-out infinite; }
      `}</style>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Animated diagram: a manifest propagating from one source through successive tiers of workers, each tier seeding the next."
      >
        <defs>
          <linearGradient id="fan-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5a0" />
            <stop offset="55%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <filter id="fan-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* edges */}
        {TIERS.slice(0, -1).map((tier, ti) => {
          const parents = positions[ti];
          const children = positions[ti + 1];
          const per = children.length / parents.length;
          return parents.flatMap((px, pi) =>
            children.slice(pi * per, (pi + 1) * per).map((cx, ci) => (
              <line
                key={`${ti}-${pi}-${ci}`}
                className="fan-edge"
                x1={px}
                y1={tier.y}
                x2={cx}
                y2={TIERS[ti + 1].y}
                stroke="url(#fan-grad)"
                strokeWidth={ti === 0 ? 1.5 : ti === 1 ? 1.1 : 0.75}
                strokeOpacity={ti === 0 ? 0.75 : ti === 1 ? 0.5 : 0.28}
                style={{ animationDelay: `${ti * 0.55}s` }}
              />
            ))
          );
        })}

        {/* nodes */}
        {TIERS.map((tier, ti) =>
          positions[ti].map((x, i) => (
            <circle
              key={`${ti}-${i}`}
              className="fan-node"
              cx={x}
              cy={tier.y}
              r={ti === 0 ? 8.5 : ti === 1 ? 5 : ti === 2 ? 3 : 2}
              fill={ti === 0 ? "#00e5a0" : ti === 1 ? "#2fd8b4" : ti === 2 ? "#38bdf8" : "#38bdf8"}
              filter={ti < 2 ? "url(#fan-glow)" : undefined}
              style={{ animationDelay: `${ti * 0.55 + i * 0.02}s` }}
            />
          ))
        )}

        {/* tier labels */}
        {["1", "×10", "×100", "×1,000"].map((t, i) => (
          <text
            key={t}
            x={6}
            y={TIERS[i].y + 3.5}
            textAnchor="start"
            className="font-mono"
            fontSize="10"
            fill="rgba(255,255,255,0.3)"
          >
            {t}
          </text>
        ))}
      </svg>

      <p className="mt-3 text-center text-[11px] text-[color:var(--dim)]">
        each tier seeds the next — 800 → 8,000 workers
      </p>
    </div>
  );
}
