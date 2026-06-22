import type { MonthRow } from "@/lib/types";
import { assets, liab, equity, usdK } from "@/lib/finance";

const LEGEND: [string, string][] = [
  ["Cash", "var(--chart-rev)"],
  ["Receivables", "#2f5e8f"],
  ["Inventory", "#c9a85f"],
  ["Equipment", "#7d8a6a"],
  ["Loans", "#a8643c"],
  ["Payables", "var(--accent)"],
  ["Cards", "#c98f5f"],
  ["Equity", "var(--pos)"],
];

// Two stacked bars of equal height: assets vs. liabilities + equity.
export function BalanceChart({ row }: { row: MonthRow }) {
  const W = 320;
  const H = 300;
  const A = assets(row);
  const L = liab(row);
  const E = equity(row);
  const tot = Math.max(A, L + E) || 1;
  const bx = 70;
  const bw = 70;
  const gap = 110;
  const top = 24;
  const bh = H - top - 44;

  const seg = (x: number, segs: { v: number; c: string }[], prefix: string) => {
    let acc = 0;
    return segs
      .filter((s) => s.v > 0)
      .map((s, i) => {
        const hgt = (s.v / tot) * bh;
        const yy = top + bh - acc - hgt;
        acc += hgt;
        return <rect key={`${prefix}${i}`} x={x} y={yy} width={bw} height={Math.max(hgt, 0)} fill={s.c} />;
      });
  };

  const assetSegs = [
    { v: row.equipment, c: "#7d8a6a" },
    { v: row.inventory, c: "#c9a85f" },
    { v: row.ar, c: "#2f5e8f" },
    { v: row.cash, c: "var(--chart-rev)" },
  ];
  const claimSegs = [
    { v: E, c: "var(--pos)" },
    { v: row.cc, c: "#c98f5f" },
    { v: row.ap, c: "var(--accent)" },
    { v: row.loans, c: "#a8643c" },
  ];

  const lbl = (x: number, t: string, v: number, prefix: string) => [
    <text key={`l${prefix}`} x={x + bw / 2} y={H - 22} textAnchor="middle" fontSize={12} fontWeight={600} fill="var(--ink-soft)">
      {t}
    </text>,
    <text key={`v${prefix}`} x={x + bw / 2} y={H - 7} textAnchor="middle" fontSize={11} fontFamily="var(--font-mono)" fill="var(--muted)">
      {usdK(v)}
    </text>,
  ];

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 300, height: "auto", display: "block", margin: "0 auto" }}>
        {seg(bx, assetSegs, "a")}
        {seg(bx + gap, claimSegs, "c")}
        {lbl(bx, "Assets", A, "A")}
        {lbl(bx + gap, "Liab.+Equity", L + E, "C")}
      </svg>
      <div
        className="mono"
        style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px", marginTop: 12, fontSize: 12, color: "var(--ink-soft)" }}
      >
        {LEGEND.map(([label, color]) => (
          <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
