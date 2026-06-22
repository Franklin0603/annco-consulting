import type { MonthRow } from "./types";
import { totExp, net } from "./finance";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Advance a "MMM YYYY" label by n months; falls back to "+n" if unparseable.
export function addMonths(label: string, n: number): string {
  const [mon, year] = label.split(" ");
  const idx = MONTHS.indexOf(mon);
  const yr = parseInt(year, 10);
  if (idx < 0 || isNaN(yr)) return `+${n}`;
  const total = idx + n;
  return `${MONTHS[((total % 12) + 12) % 12]} ${yr + Math.floor(total / 12)}`;
}

export interface ForecastPoint {
  month: string;
  revenue: number;
  totalExpense: number;
  net: number;
  cash: number;
  projected: boolean;
}

// Ordinary least-squares slope/intercept for y over x = 0..n-1.
function linreg(ys: number[]): { a: number; b: number } {
  const n = ys.length;
  const sx = ((n - 1) * n) / 2;
  const sxx = ((n - 1) * n * (2 * n - 1)) / 6;
  const sy = ys.reduce((s, y) => s + y, 0);
  const sxy = ys.reduce((s, y, i) => s + i * y, 0);
  const denom = n * sxx - sx * sx || 1;
  const b = (n * sxy - sx * sy) / denom;
  const a = (sy - b * sx) / n;
  return { a, b };
}

/**
 * Lightweight financial projection:
 *  - revenue follows a linear trend fit to the historical series
 *  - expenses scale with revenue at the historical average cost ratio
 *  - cash rolls forward by adding each projected month's net income
 *
 * Illustrative only — not a substitute for a real forecast.
 */
export function forecast(data: MonthRow[], periods = 6): {
  history: ForecastPoint[];
  projection: ForecastPoint[];
  costRatio: number;
  monthlyGrowth: number;
} {
  const history: ForecastPoint[] = data.map((r) => ({
    month: r.month,
    revenue: r.revenue,
    totalExpense: totExp(r),
    net: net(r),
    cash: r.cash,
    projected: false,
  }));

  const { a, b } = linreg(data.map((r) => r.revenue));
  const ratios = data.map((r) => totExp(r) / (r.revenue || 1));
  const costRatio = ratios.reduce((s, x) => s + x, 0) / ratios.length;
  const avgRev = data.reduce((s, r) => s + r.revenue, 0) / data.length;
  const monthlyGrowth = avgRev ? b / avgRev : 0;

  const n = data.length;
  const last = data[n - 1];
  const lastLabel = last.month;
  let runningCash = last.cash;

  const projection: ForecastPoint[] = [];
  for (let k = 1; k <= periods; k++) {
    const i = n - 1 + k;
    const revenue = Math.max(0, a + b * i);
    const totalExpense = revenue * costRatio;
    const monthNet = revenue - totalExpense;
    runningCash += monthNet;
    projection.push({
      month: addMonths(lastLabel, k),
      revenue,
      totalExpense,
      net: monthNet,
      cash: runningCash,
      projected: true,
    });
  }

  return { history, projection, costRatio, monthlyGrowth };
}
