export interface LinePoint {
  label: string; // e.g. "May 2026" — first token used for x-axis
  value: number;
}

// Reusable responsive single-series line chart with gridlines + optional area fill.
export function LineChart({
  points,
  color = "var(--accent)",
  format,
  area = false,
}: {
  points: LinePoint[];
  color?: string;
  format: (n: number) => string;
  area?: boolean;
}) {
  const W = 920;
  const H = 280;
  const pl = 58;
  const pr = 16;
  const pt = 16;
  const pb = 40;
  const pw = W - pl - pr;
  const ph = H - pt - pb;

  const values = points.map((p) => p.value);
  const rawMax = Math.max(...values, 0);
  const rawMin = Math.min(...values, 0);
  const top = rawMax === 0 ? 1 : Math.ceil(rawMax / niceStep(rawMax)) * niceStep(rawMax);
  const bottom = rawMin >= 0 ? 0 : Math.floor(rawMin / niceStep(Math.abs(rawMin))) * niceStep(Math.abs(rawMin));
  const span = top - bottom || 1;

  const x = (i: number) => pl + (points.length === 1 ? pw / 2 : (pw * i) / (points.length - 1));
  const y = (v: number) => pt + ph - ((v - bottom) / span) * ph;

  const grid = [];
  for (let i = 0; i <= 4; i++) {
    const gv = bottom + (span * i) / 4;
    const gy = y(gv);
    grid.push(<line key={`g${i}`} x1={pl} x2={W - pr} y1={gy} y2={gy} stroke="var(--border)" strokeWidth={1} />);
    grid.push(
      <text key={`gt${i}`} x={pl - 8} y={gy + 4} textAnchor="end" fontSize={11} fontFamily="var(--font-mono)" fill="var(--muted)">
        {format(gv)}
      </text>,
    );
  }

  const linePts = points.map((p, i) => `${x(i)},${y(p.value)}`).join(" ");
  const areaPts = `${x(0)},${y(bottom)} ${linePts} ${x(points.length - 1)},${y(bottom)}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {grid}
      {area && <polygon points={areaPts} fill={color} opacity={0.12} />}
      <polyline points={linePts} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={`d${i}`} cx={x(i)} cy={y(p.value)} r={3.5} fill={color} stroke="var(--surface)" strokeWidth={1.5} />
      ))}
      {points.map((p, i) => (
        <text key={`x${i}`} x={x(i)} y={H - 14} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--muted)">
          {p.label.split(" ")[0]}
        </text>
      ))}
    </svg>
  );
}

function niceStep(max: number): number {
  const mag = Math.pow(10, Math.floor(Math.log10(max || 1)));
  return mag / 2 || 1;
}
