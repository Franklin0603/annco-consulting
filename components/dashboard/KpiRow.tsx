import type { MonthRow } from "@/lib/types";
import { net, currentRatio, usd, pct } from "@/lib/finance";

export function KpiRow({ data }: { data: MonthRow[] }) {
  const cur = data[data.length - 1];
  const prev = data[data.length - 2] ?? cur;

  const cards = [
    { l: "Revenue", v: usd(cur.revenue), pa: cur.revenue, pb: prev.revenue, fmt: "pct" as const },
    { l: "Net income", v: usd(net(cur)), pa: net(cur), pb: net(prev), fmt: "pct" as const },
    { l: "Cash on hand", v: usd(cur.cash), pa: cur.cash, pb: prev.cash, fmt: "pct" as const },
    {
      l: "Current ratio",
      v: currentRatio(cur).toFixed(2),
      pa: currentRatio(cur),
      pb: currentRatio(prev),
      fmt: "abs" as const,
    },
  ];

  return (
    <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
      {cards.map((c) => {
        const up = c.pa >= c.pb;
        const delta =
          c.fmt === "pct"
            ? pct(c.pa, c.pb)
            : (c.pa - c.pb >= 0 ? "+" : "−") + Math.abs(c.pa - c.pb).toFixed(2);
        return (
          <div
            key={c.l}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: "18px 20px",
              boxShadow: "var(--shadow)",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{c.l}</div>
            <div
              className="mono"
              style={{ fontSize: 28, fontWeight: 600, color: "var(--ink)", marginTop: 6, letterSpacing: "-.02em" }}
            >
              {c.v}
            </div>
            <div
              className="mono"
              style={{ fontSize: 13, marginTop: 6, fontWeight: 600, color: up ? "var(--pos)" : "var(--neg)" }}
            >
              {(up ? "▲ " : "▼ ") + delta + " MoM"}
            </div>
          </div>
        );
      })}
    </div>
  );
}
