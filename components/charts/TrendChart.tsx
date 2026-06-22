import type { MonthRow } from "@/lib/types";
import { totExp, net, usdK } from "@/lib/finance";

// Grouped bars (revenue + total expense) per month with a net-income line + dots.
// Responsive via viewBox; ported from the design prototype.
export function TrendChart({ data }: { data: MonthRow[] }) {
  const W = 920;
  const H = 320;
  const pl = 58;
  const pr = 16;
  const pt = 16;
  const pb = 44;
  const pw = W - pl - pr;
  const ph = H - pt - pb;

  const max = Math.max(...data.map((r) => Math.max(r.revenue, totExp(r))));
  const top = Math.ceil(max / 20000) * 20000 || 20000;
  const y = (v: number) => pt + ph - (v / top) * ph;
  const n = data.length;
  const slot = pw / n;
  const bw = slot * 0.26;

  const grid = [];
  for (let i = 0; i <= 4; i++) {
    const gv = (top * i) / 4;
    const gy = y(gv);
    grid.push(
      <line key={`g${i}`} x1={pl} x2={W - pr} y1={gy} y2={gy} stroke="var(--border)" strokeWidth={1} />,
    );
    grid.push(
      <text
        key={`gt${i}`}
        x={pl - 8}
        y={gy + 4}
        textAnchor="end"
        fontSize={11}
        fontFamily="var(--font-mono)"
        fill="var(--muted)"
      >
        {usdK(gv)}
      </text>,
    );
  }

  const bars: React.ReactNode[] = [];
  data.forEach((r, i) => {
    const cx = pl + slot * i + slot / 2;
    const rh = (r.revenue / top) * ph;
    const eh = (totExp(r) / top) * ph;
    bars.push(
      <rect key={`r${i}`} x={cx - bw - 2} y={pt + ph - rh} width={bw} height={rh} rx={2} fill="var(--chart-rev)" />,
    );
    bars.push(
      <rect key={`e${i}`} x={cx + 2} y={pt + ph - eh} width={bw} height={eh} rx={2} fill="var(--chart-exp)" />,
    );
    bars.push(
      <text key={`x${i}`} x={cx} y={H - 26} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--muted)">
        {r.month.split(" ")[0]}
      </text>,
    );
    bars.push(
      <text key={`xy${i}`} x={cx} y={H - 13} textAnchor="middle" fontSize={9} fontFamily="var(--font-mono)" fill="var(--muted)">
        {"'" + r.month.split(" ")[1].slice(2)}
      </text>,
    );
  });

  const pts = data.map((r, i) => `${pl + slot * i + slot / 2},${y(net(r))}`).join(" ");
  const dots = data.map((r, i) => (
    <circle
      key={`d${i}`}
      cx={pl + slot * i + slot / 2}
      cy={y(net(r))}
      r={3.5}
      fill="var(--chart-net)"
      stroke="var(--surface)"
      strokeWidth={1.5}
    />
  ));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {grid}
      {bars}
      <polyline points={pts} fill="none" stroke="var(--chart-net)" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {dots}
    </svg>
  );
}
