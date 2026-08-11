import { Figure } from "./figure";

function Box({
  x,
  y,
  w,
  h,
  title,
  lines,
  accent,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill="var(--bg)"
        stroke={accent ? "var(--accent)" : "var(--line-2)"}
        strokeWidth={1.25}
      />
      <text
        x={x + 10}
        y={y + 18}
        className={`font-mono text-[11px] ${accent ? "fill-[var(--accent)]" : "fill-[var(--fg)]"}`}
      >
        {title}
      </text>
      {lines?.map((line, i) => (
        <text
          key={i}
          x={x + 10}
          y={y + 36 + i * 14}
          className="fill-[var(--dim)] font-mono text-[10px]"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  both,
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  both?: boolean;
  dashed?: boolean;
}) {
  return (
    <g stroke="var(--line-2)" strokeWidth={1}>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        markerEnd="url(#arrowhead)"
        markerStart={both ? "url(#arrowhead-start)" : undefined}
        strokeDasharray={dashed ? "3 3" : undefined}
      />
    </g>
  );
}

/** Conflux: room-based relay of CRDT updates, plus a separate execution path. */
export function ConfluxArch() {
  return (
    <Figure
      caption="Each client holds its own replica of the document. The server relays CRDT updates within a room rather than arbitrating edits, so convergence is a property of the data structure, not of server ordering. Code execution is a separate request path and does not touch the document state."
      label="Architecture: two browser clients each holding a Monaco editor bound to a local CRDT replica, exchanging updates through a room-scoped WebSocket relay; a separate path sends code to a sandboxed execution API."
      width={796}
      height={268}
    >
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--line-2)" />
        </marker>
        <marker
          id="arrowhead-start"
          markerWidth="6"
          markerHeight="6"
          refX="1"
          refY="3"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--line-2)" />
        </marker>
      </defs>

      <Box
        x={16}
        y={24}
        w={178}
        h={72}
        title="client A"
        lines={["Monaco editor", "local CRDT replica"]}
      />
      <Box
        x={16}
        y={140}
        w={178}
        h={72}
        title="client B"
        lines={["Monaco editor", "local CRDT replica"]}
      />

      <Box
        x={300}
        y={82}
        w={196}
        h={72}
        title="room relay"
        lines={["WebSocket, room-scoped", "broadcasts updates"]}
        accent
      />

      <Box
        x={602}
        y={24}
        w={178}
        h={72}
        title="execution API"
        lines={["sandboxed runtime", "multi-language"]}
      />

      <Arrow x1={194} y1={60} x2={300} y2={104} both />
      <Arrow x1={194} y1={176} x2={300} y2={134} both />
      <Arrow x1={194} y1={40} x2={602} y2={40} both dashed />

      <text x={330} y={196} className="fill-[var(--dim)] font-mono text-[10px]">
        updates are commutative — arrival order does not change the result
      </text>
      <text x={214} y={30} className="fill-[var(--dim)] font-mono text-[10px]">
        run request (separate path)
      </text>
      <text x={206} y={244} className="fill-[var(--dim)] font-mono text-[10px]">
        no server-side document authority
      </text>
    </Figure>
  );
}
