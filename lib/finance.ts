import type { MonthRow } from "./types";

// ---------- derived metrics ----------
export const totExp = (r: MonthRow) =>
  r.cogs + r.payroll + r.rent + r.marketing + r.utilities + r.supplies + r.other;
export const net = (r: MonthRow) => r.revenue - totExp(r);
export const assets = (r: MonthRow) => r.cash + r.ar + r.inventory + r.equipment;
export const liab = (r: MonthRow) => r.ap + r.loans + r.cc;
export const equity = (r: MonthRow) => assets(r) - liab(r);
export const currentRatio = (r: MonthRow) => {
  const cl = r.ap + r.cc;
  return cl > 0 ? (r.cash + r.ar + r.inventory) / cl : 0;
};

// ---------- formatting ----------
export const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const usdK = (n: number) => {
  const k = n / 1000;
  return "$" + (Math.abs(k) >= 100 ? Math.round(k) : k.toFixed(0)) + "k";
};
export const pct = (a: number, b: number) => {
  if (!b) return "0.0%";
  return (((a - b) / Math.abs(b)) * 100).toFixed(1) + "%";
};

// ---------- AI prompt context ----------
export function dataSummary(data: MonthRow[], clientName: string): string {
  const rows = data
    .map(
      (r) =>
        `${r.month}: revenue ${usd(r.revenue)}, expenses ${usd(totExp(r))}, net ${usd(
          net(r),
        )}, cash ${usd(r.cash)}, assets ${usd(assets(r))}, liabilities ${usd(
          liab(r),
        )}, equity ${usd(equity(r))}`,
    )
    .join("\n");
  const cur = data[data.length - 1];
  const exp = `${cur.month} expense breakdown — COGS ${usd(cur.cogs)}, payroll ${usd(
    cur.payroll,
  )}, rent ${usd(cur.rent)}, marketing ${usd(cur.marketing)}, utilities ${usd(
    cur.utilities,
  )}, supplies ${usd(cur.supplies)}, other ${usd(cur.other)}`;
  return `Client: ${clientName}\nMonthly financials:\n${rows}\n\n${exp}`;
}
