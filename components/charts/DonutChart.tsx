import type { MonthRow } from "@/lib/types";
import { usdK } from "@/lib/finance";

// Donut of the latest month's expense categories with a center total + legend.
export function DonutChart({ row }: { row: MonthRow }) {
  const cats = [
    { l: "COGS", v: row.cogs, c: "var(--chart-rev)" },
    { l: "Payroll", v: row.payroll, c: "#2f5e8f" },
    { l: "Rent", v: row.rent, c: "var(--accent)" },
    { l: "Marketing", v: row.marketing, c: "#c9a85f" },
    { l: "Supplies", v: row.supplies, c: "#a8643c" },
    { l: "Utilities", v: row.utilities, c: "#7d8a6a" },
    { l: "Other", v: row.other, c: "#9aa0ac" },
  ].filter((c) => c.v > 0);

  const tot = cats.reduce((s, c) => s + c.v, 0) || 1;
  const R = 70;
  const SW = 26;
  const C = 2 * Math.PI * R;
  let off = 0;
  const rings = cats.map((c, i) => {
    const frac = c.v / tot;
    const len = frac * C;
    const el = (
      <circle
        key={i}
        cx={100}
        cy={100}
        r={R}
        fill="none"
        stroke={c.c}
        strokeWidth={SW}
        strokeDasharray={`${len} ${C - len}`}
        strokeDashoffset={-off}
        transform="rotate(-90 100 100)"
      />
    );
    off += len;
    return el;
  });

  return (
    <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
      <svg viewBox="0 0 200 200" style={{ width: 170, height: 170, flexShrink: 0 }}>
        {rings}
        <text x={100} y={94} textAnchor="middle" fontSize={13} fill="var(--muted)">
          Total exp.
        </text>
        <text x={100} y={116} textAnchor="middle" fontSize={18} fontWeight={600} fontFamily="var(--font-mono)" fill="var(--ink)">
          {usdK(tot)}
        </text>
      </svg>
      <div style={{ flex: 1, minWidth: 140, display: "flex", flexDirection: "column", gap: 7 }}>
        {cats.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
            <span style={{ width: 11, height: 11, borderRadius: 2, background: c.c, flexShrink: 0 }} />
            <span style={{ flex: 1, color: "var(--ink-soft)" }}>{c.l}</span>
            <span className="mono" style={{ color: "var(--ink)", fontWeight: 500 }}>
              {Math.round((c.v / tot) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
