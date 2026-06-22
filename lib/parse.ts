import * as XLSX from "xlsx";
import type { MonthRow } from "./types";
import { sampleDashboard } from "./sample";
import type { DashboardData } from "./types";

const DICT: Record<keyof Omit<MonthRow, "month">, string[]> = {
  revenue: ["revenue", "sales", "income", "totalrevenue", "grossrevenue", "totalsales"],
  cogs: ["cogs", "costofgoods", "costofgoodssold", "cost"],
  payroll: ["payroll", "wages", "salaries", "salary", "labor"],
  rent: ["rent", "lease"],
  marketing: ["marketing", "advertising", "ads", "promotion"],
  utilities: ["utilities", "utility"],
  supplies: ["supplies", "materials"],
  other: ["other", "otherexpense", "misc", "miscellaneous"],
  cash: ["cash", "bank", "checking"],
  ar: ["ar", "accountsreceivable", "receivables", "receivable"],
  inventory: ["inventory", "stock"],
  equipment: ["equipment", "fixedassets", "ppe", "property", "assetsfixed"],
  ap: ["ap", "accountspayable", "payables", "payable"],
  loans: ["loans", "loan", "notespayable", "debt", "longtermdebt"],
  cc: ["cc", "creditcard", "creditcards", "card"],
};

const MONTH_ALIASES = ["month", "date", "period", "mon"];

const num = (v: unknown): number => {
  if (v == null) return 0;
  const n = parseFloat(String(v).replace(/[$,\s]/g, ""));
  return isNaN(n) ? 0 : n;
};

const norm = (s: string) => String(s).toLowerCase().replace(/[^a-z]/g, "");

function mapRows(objs: Record<string, unknown>[]): MonthRow[] {
  return objs
    .map((o) => {
      const keys: Record<string, unknown> = {};
      Object.keys(o).forEach((k) => (keys[norm(k)] = o[k]));
      const get = (aliases: string[]) => {
        for (const a of aliases) if (a in keys) return keys[a];
        return undefined;
      };
      const monthVal = get(MONTH_ALIASES);
      const r = {
        month: monthVal != null ? String(monthVal) : null,
      } as Record<string, unknown>;
      (Object.keys(DICT) as (keyof typeof DICT)[]).forEach((fld) => {
        r[fld] = num(get(DICT[fld]));
      });
      return r as unknown as MonthRow & { month: string | null };
    })
    .filter((r): r is MonthRow => !!r.month && r.revenue > 0);
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length);
  if (!lines.length) throw new Error("empty");
  const split = (l: string): string[] => {
    const out: string[] = [];
    let cur = "";
    let q = false;
    for (let i = 0; i < l.length; i++) {
      const c = l[i];
      if (c === '"') q = !q;
      else if (c === "," && !q) {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
    out.push(cur);
    return out.map((s) => s.trim().replace(/^"|"$/g, ""));
  };
  const head = split(lines[0]);
  return lines.slice(1).map((l) => {
    const cells = split(l);
    const o: Record<string, string> = {};
    head.forEach((h, i) => (o[h] = cells[i]));
    return o;
  });
}

function fallback(uploadMsg: string): DashboardData {
  return { ...sampleDashboard(), uploadMsg };
}

/**
 * Parse an uploaded balance-sheet file into dashboard data.
 * Always recovers gracefully — on any failure or too-few rows, falls back
 * to the sample client with a friendly banner message.
 */
export async function parseFile(file: File): Promise<DashboardData> {
  const name = file.name.toLowerCase();
  const cleanName = file.name.replace(/\.(csv|xlsx|xls)$/i, "");
  try {
    let rows: Record<string, unknown>[];
    if (name.endsWith(".csv")) {
      rows = parseCSV(await file.text());
    } else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
      const buf = new Uint8Array(await file.arrayBuffer());
      const wb = XLSX.read(buf, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      rows = XLSX.utils.sheet_to_json(ws, { defval: "" });
    } else {
      return fallback(
        "Couldn't read that file, so we loaded the sample client instead. Expected monthly rows with a Month and Revenue column.",
      );
    }

    const data = mapRows(rows);
    if (data.length < 2) {
      return fallback(
        `We couldn't find monthly rows with Revenue in "${file.name}", so we loaded the sample client.`,
      );
    }
    return {
      data,
      clientName: cleanName,
      periodLabel: `${data[0].month} – ${data[data.length - 1].month} · ${data.length} months`,
      uploadMsg: `Loaded ${data.length} months from ${file.name}`,
      source: "upload" as const,
    };
  } catch {
    return fallback(
      "Couldn't read that file, so we loaded the sample client instead. Expected monthly rows with a Month and Revenue column.",
    );
  }
}
