import type { MonthRow } from "@/lib/types";
import { forecast } from "@/lib/forecast";
import { usd } from "@/lib/finance";
import { ForecastChart } from "@/components/charts/ForecastChart";

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 20,
  padding: 24,
  boxShadow: "var(--shadow)",
};

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "pos" | "neg" }) {
  return (
    <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 600 }}>{label}</div>
      <div
        className="mono"
        style={{ fontSize: 22, fontWeight: 600, marginTop: 6, color: tone === "neg" ? "var(--neg)" : tone === "pos" ? "var(--pos)" : "var(--ink)" }}
      >
        {value}
      </div>
      {sub && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

export function Forecast({ data }: { data: MonthRow[] }) {
  const periods = 6;
  const { history, projection, costRatio, monthlyGrowth } = forecast(data, periods);
  const next = projection[0];
  const endCash = projection[projection.length - 1].cash;
  const startCash = history[history.length - 1].cash;
  const cashDelta = endCash - startCash;
  const projRevTotal = projection.reduce((s, p) => s + p.revenue, 0);

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700 }}>6-month forecast</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>
            Projected revenue, net income &amp; cash
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--ink-soft)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 3, borderRadius: 2, background: "var(--chart-rev)" }} /> Revenue
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 14, height: 3, borderRadius: 2, background: "var(--chart-net)" }} /> Net income
          </span>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <ForecastChart history={history} projection={projection} />
      </div>

      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 8 }}>
        <Stat label={`Projected revenue · ${next.month}`} value={usd(next.revenue)} sub={`${(monthlyGrowth * 100).toFixed(1)}% avg monthly trend`} />
        <Stat label={`Projected net · ${next.month}`} value={usd(next.net)} tone={next.net >= 0 ? "pos" : "neg"} sub={`${Math.round((1 - costRatio) * 100)}% projected margin`} />
        <Stat label={`Projected cash · ${projection[projection.length - 1].month}`} value={usd(endCash)} sub={`${cashDelta >= 0 ? "+" : "−"}${usd(Math.abs(cashDelta))} over ${periods} mo`} tone={cashDelta >= 0 ? "pos" : "neg"} />
        <Stat label={`Forecast revenue · ${periods} mo`} value={usd(projRevTotal)} sub="sum of projected months" />
      </div>

      {/* Projected month table */}
      <div style={{ overflowX: "auto", marginTop: 16, borderRadius: 12, border: "1px solid var(--border)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
          <thead>
            <tr>
              {["Month", "Revenue", "Expenses", "Net income", "Cash"].map((h, i) => (
                <th
                  key={h}
                  style={{
                    textAlign: i === 0 ? "left" : "right",
                    padding: "10px 12px",
                    fontSize: 12,
                    color: "var(--muted)",
                    fontWeight: 600,
                    background: "var(--bg)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projection.map((p) => (
              <tr key={p.month}>
                <td className="mono" style={{ padding: "10px 12px", fontSize: 13, fontWeight: 600, borderTop: "1px solid var(--border)" }}>
                  {p.month}
                </td>
                <td className="mono" style={{ padding: "10px 12px", fontSize: 13, textAlign: "right", borderTop: "1px solid var(--border)" }}>
                  {usd(p.revenue)}
                </td>
                <td className="mono" style={{ padding: "10px 12px", fontSize: 13, textAlign: "right", color: "var(--ink-soft)", borderTop: "1px solid var(--border)" }}>
                  {usd(p.totalExpense)}
                </td>
                <td className="mono" style={{ padding: "10px 12px", fontSize: 13, textAlign: "right", color: p.net >= 0 ? "var(--pos)" : "var(--neg)", fontWeight: 600, borderTop: "1px solid var(--border)" }}>
                  {usd(p.net)}
                </td>
                <td className="mono" style={{ padding: "10px 12px", fontSize: 13, textAlign: "right", color: "var(--ink-soft)", borderTop: "1px solid var(--border)" }}>
                  {usd(p.cash)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 12, lineHeight: 1.6 }}>
        Model: linear revenue trend × {Math.round(costRatio * 100)}% average cost ratio, with cash rolled
        forward by projected net income. Illustrative only — not financial advice.
      </div>
    </div>
  );
}
