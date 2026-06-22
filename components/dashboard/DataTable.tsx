import type { MonthRow } from "@/lib/types";
import { totExp, net, currentRatio, usd } from "@/lib/finance";

const th: React.CSSProperties = {
  textAlign: "right",
  padding: "10px 12px",
  fontSize: 12,
  color: "var(--muted)",
  fontWeight: 600,
  whiteSpace: "nowrap",
  position: "sticky",
  top: 0,
  background: "var(--surface)",
};

const td: React.CSSProperties = {
  textAlign: "right",
  padding: "10px 12px",
  fontSize: 13,
  whiteSpace: "nowrap",
  borderTop: "1px solid var(--border)",
};

export function DataTable({ data }: { data: MonthRow[] }) {
  return (
    <div style={{ overflowX: "auto", maxHeight: 360, overflowY: "auto", borderRadius: 12, border: "1px solid var(--border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
        <thead>
          <tr>
            <th style={{ ...th, textAlign: "left" }}>Month</th>
            <th style={th}>Revenue</th>
            <th style={th}>Expenses</th>
            <th style={th}>Net income</th>
            <th style={th}>Cash</th>
            <th style={th}>Payroll</th>
            <th style={th}>COGS</th>
            <th style={th}>Current ratio</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice()
            .reverse()
            .map((r) => {
              const n = net(r);
              return (
                <tr key={r.month}>
                  <td className="mono" style={{ ...td, textAlign: "left", color: "var(--ink)", fontWeight: 600 }}>
                    {r.month}
                  </td>
                  <td className="mono" style={{ ...td, color: "var(--ink)" }}>{usd(r.revenue)}</td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{usd(totExp(r))}</td>
                  <td className="mono" style={{ ...td, color: n >= 0 ? "var(--pos)" : "var(--neg)", fontWeight: 600 }}>
                    {usd(n)}
                  </td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{usd(r.cash)}</td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{usd(r.payroll)}</td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{usd(r.cogs)}</td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{currentRatio(r).toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
