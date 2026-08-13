const W = 460;

/** Deterministic waveform — no Math.random, so SSR and client agree. */
const BARS = [
  9, 14, 11, 18, 24, 19, 27, 22, 31, 26, 34, 29, 38, 33, 41, 36, 44, 39, 47, 42,
  52, 45, 58, 49, 63, 54, 57, 61, 55, 66, 59, 71, 64, 76, 68, 80, 73, 69, 62, 55,
];

const COLS = 20;
const ROWS = 5;

/**
 * A general view of the work rather than one project's diagram: throughput
 * climbing as a worker pool saturates, and the pool itself filling in waves.
 */
export function SystemMonitor() {
  const barW = 6;
  const gap = 3.4;
  const chartH = 92;
  const chartTop = 16;

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} 232`}
        className="h-auto w-full"
        role="img"
        aria-label="System monitor: a throughput graph rising as a pool of workers fills in successive waves."
      >
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00e5a0" stopOpacity="0.95" />
          </linearGradient>
          <clipPath id="chart-clip">
            <rect x={44} y={chartTop - 4} width={W - 52} height={chartH + 8} />
          </clipPath>
        </defs>

        {/* ---- throughput chart ---- */}
        <text x={2} y={chartTop + 8} fontSize="9" fill="rgba(255,255,255,0.3)">
          tput
        </text>

        {/* gridlines */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={44}
            y1={chartTop + (i * chartH) / 3}
            x2={W - 8}
            y2={chartTop + (i * chartH) / 3}
            stroke="var(--line)"
            strokeWidth={1}
          />
        ))}

        <g clipPath="url(#chart-clip)">
          <g className="chart-scroll">
            {[0, 1].map((copy) =>
              BARS.map((h, i) => {
                const x = 46 + (copy * BARS.length + i) * (barW + gap);
                const height = (h / 88) * chartH;
                return (
                  <rect
                    key={`${copy}-${i}`}
                    x={x}
                    y={chartTop + chartH - height}
                    width={barW}
                    height={height}
                    rx={1.5}
                    fill="url(#bar-grad)"
                  />
                );
              })
            )}
          </g>
        </g>

        {/* ---- worker pool ---- */}
        <text x={2} y={148} fontSize="9" fill="rgba(255,255,255,0.3)">
          pool
        </text>

        {Array.from({ length: ROWS }).map((_, r) =>
          Array.from({ length: COLS }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              className="cell"
              x={46 + c * 20.4}
              y={132 + r * 19}
              width={15}
              height={12}
              rx={2}
              fill={(r + c) % 7 === 0 ? "#38bdf8" : "#00e5a0"}
              style={{ animationDelay: `${c * 0.09 + r * 0.16}s` }}
            />
          ))
        )}
      </svg>

      {/* A legend, not statistics: the graphic is illustrative, and the real
          figures already live in the metric cards below the hero. */}
      <div
        className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-[11px]"
        style={{ borderColor: "var(--line)", color: "var(--dim)" }}
      >
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-[2px]"
            style={{ background: "#00e5a0" }}
            aria-hidden
          />
          throughput
        </span>
        <span className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-[2px]"
            style={{ background: "#38bdf8" }}
            aria-hidden
          />
          worker picking up
        </span>
        <span className="ml-auto">throughput climbs as the pool saturates</span>
      </div>
    </div>
  );
}
