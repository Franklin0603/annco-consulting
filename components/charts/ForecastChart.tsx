import type { ForecastPoint } from "@/lib/forecast";
import { usdK } from "@/lib/finance";

// Historical (solid) + projected (dashed) revenue & net-income lines,
// with a shaded forecast region and a divider.
export function ForecastChart({
  history,
  projection,
}: {
  history: ForecastPoint[];
  projection: ForecastPoint[];
}) {
  const all = [...history, ...projection];
  const W = 920;
  const H = 300;
  const pl = 58;
  const pr = 16;
  const pt = 16;
  const pb = 40;
  const pw = W - pl - pr;
  const ph = H - pt - pb;

  const vals = all.flatMap((p) => [p.revenue, p.net]);
  const rawMax = Math.max(...vals);
  const rawMin = Math.min(...vals, 0);
  const top = Math.ceil(rawMax / 20000) * 20000 || 20000;
  const bottom = rawMin >= 0 ? 0 : Math.floor(rawMin / 20000) * 20000;
  const span = top - bottom || 1;

  const x = (i: number) => pl + (pw * i) / (all.length - 1);
  const y = (v: number) => pt + ph - ((v - bottom) / span) * ph;

  const grid = [];
  for (let i = 0; i <= 4; i++) {
    const gv = bottom + (span * i) / 4;
    const gy = y(gv);
    grid.push(<line key={`g${i}`} x1={pl} x2={W - pr} y1={gy} y2={gy} stroke="var(--border)" strokeWidth={1} />);
    grid.push(
      <text key={`gt${i}`} x={pl - 8} y={gy + 4} textAnchor="end" fontSize={11} fontFamily="var(--font-mono)" fill="var(--muted)">
        {usdK(gv)}
      </text>,
    );
  }

  const hi = history.length - 1; // last historical index
  const divX = x(hi);

  // Build solid (historical incl. join point) + dashed (projected) segments.
  const seg = (sel: (p: ForecastPoint) => number, color: string) => {
    const solid = all.slice(0, hi + 1).map((p, i) => `${x(i)},${y(sel(p))}`).join(" ");
    const dashed = all.slice(hi).map((p, j) => `${x(hi + j)},${y(sel(p))}`).join(" ");
    return (
      <g key={color}>
        <polyline points={solid} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={dashed} fill="none" stroke={color} strokeWidth={2.5} strokeDasharray="5 5" strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
      </g>
    );
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {/* forecast region */}
      <rect x={divX} y={pt} width={W - pr - divX} height={ph} fill="var(--accent)" opacity={0.06} />
      <line x1={divX} x2={divX} y1={pt} y2={pt + ph} stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
      <text x={divX + 6} y={pt + 12} fontSize={10} fontFamily="var(--font-mono)" fill="var(--accent)">
        forecast →
      </text>
      {grid}
      {seg((p) => p.revenue, "var(--chart-rev)")}
      {seg((p) => p.net, "var(--chart-net)")}
      {all.map((p, i) =>
        i % 2 === 0 || i === all.length - 1 ? (
          <text key={`x${i}`} x={x(i)} y={H - 14} textAnchor="middle" fontSize={10} fontFamily="var(--font-mono)" fill="var(--muted)">
            {p.month.split(" ")[0]}
          </text>
        ) : null,
      )}
    </svg>
  );
}
