import type { MonthRow } from "@/lib/types";
import { net, totExp, usd } from "@/lib/finance";

export function Highlights({ data }: { data: MonthRow[] }) {
  const cur = data[data.length - 1];
  const prev = data[data.length - 2] ?? cur;

  const items = [
    { l: "Revenue", a: cur.revenue, b: prev.revenue, good: cur.revenue >= prev.revenue },
    { l: "Net income", a: net(cur), b: net(prev), good: net(cur) >= net(prev) },
    { l: "Total expenses", a: totExp(cur), b: totExp(prev), good: totExp(cur) <= totExp(prev) },
    { l: "Cash", a: cur.cash, b: prev.cash, good: cur.cash >= prev.cash },
    { l: "Payroll", a: cur.payroll, b: prev.payroll, good: cur.payroll <= prev.payroll },
    { l: "COGS", a: cur.cogs, b: prev.cogs, good: cur.cogs <= prev.cogs },
  ];

  return (
    <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
      {items.map((it) => {
        const dpct = it.b ? ((it.a - it.b) / Math.abs(it.b)) * 100 : 0;
        const upRaw = it.a >= it.b;
        return (
          <div
            key={it.l}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${it.good ? "var(--pos)" : "var(--neg)"}`,
              borderRadius: 12,
              padding: "14px 16px",
              boxShadow: "var(--shadow)",
            }}
          >
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{it.l}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
              <span className="mono" style={{ fontSize: 19, fontWeight: 600, color: "var(--ink)" }}>
                {usd(it.a)}
              </span>
              <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: it.good ? "var(--pos)" : "var(--neg)" }}>
                {(upRaw ? "▲" : "▼") + " " + Math.abs(dpct).toFixed(1) + "%"}
              </span>
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
              from {usd(it.b)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
