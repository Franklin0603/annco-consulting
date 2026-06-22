"use client";

import { useRef, useState } from "react";
import type { DashboardData } from "@/lib/types";
import { sampleDashboard } from "@/lib/sample";
import { parseFile } from "@/lib/parse";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { Highlights } from "@/components/dashboard/Highlights";
import { TrendChart } from "@/components/charts/TrendChart";
import { BalanceChart } from "@/components/charts/BalanceChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { AiAssistant } from "@/components/dashboard/AiAssistant";
import { MonthlyNote } from "@/components/dashboard/MonthlyNote";

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 20,
  padding: 24,
  boxShadow: "var(--shadow)",
};

export default function DashboardPage() {
  const [dash, setDash] = useState<DashboardData | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadSample = () => setDash({ ...sampleDashboard(), uploadMsg: "" });

  const onFile = async (file?: File | null) => {
    if (!file) return;
    setDash(await parseFile(file));
  };

  const data = dash?.data ?? null;
  const snap = data ? data[data.length - 1] : null;
  // Key resets AI/note panels when a new client is loaded.
  const sessionKey = dash ? `${dash.clientName}|${dash.periodLabel}` : "none";

  return (
    <div className="fade-up" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 28px 72px" }}>
      {/* Header row */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow">Client dashboard</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 34, fontWeight: 700, marginTop: 8 }}>
            {dash?.clientName ?? "No client loaded"}
          </h1>
          <div style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 4 }}>
            {dash?.periodLabel ?? "Upload a balance sheet or load the sample"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px dashed var(--border)",
              background: "var(--surface)",
              color: "var(--ink-soft)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ⬆ Upload .csv / .xlsx
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              style={{ display: "none" }}
              onChange={(e) => {
                onFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
          <button
            onClick={loadSample}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              background: "var(--navy)",
              color: "var(--bg)",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Load sample client
          </button>
          <a
            href="/sample-balance-sheet.csv"
            download
            className="mono"
            style={{ alignSelf: "center", color: "var(--accent)", fontSize: 12.5, textDecoration: "none" }}
          >
            template ↓
          </a>
        </div>
      </div>

      {dash?.uploadMsg && (
        <div
          className="no-print"
          style={{
            marginTop: 20,
            background: "var(--accent-soft)",
            border: "1px solid var(--accent)",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            color: "var(--ink)",
          }}
        >
          {dash.uploadMsg}
        </div>
      )}

      {/* Empty state */}
      {!data && (
        <div
          className="no-print"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files?.[0]);
          }}
          style={{
            marginTop: 40,
            border: "2px dashed var(--border)",
            borderRadius: 20,
            padding: "64px 28px",
            textAlign: "center",
            background: "var(--surface)",
          }}
        >
          <div style={{ fontSize: 52, color: "var(--accent)" }}>⬗</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, marginTop: 12 }}>
            Drop a monthly balance sheet to begin
          </div>
          <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 8, maxWidth: 420, marginInline: "auto" }}>
            Upload a CSV or XLSX with monthly rows (Month + Revenue and any balance-sheet columns), or
            explore with our sample client.
          </p>
          <button
            onClick={loadSample}
            style={{
              marginTop: 24,
              padding: "14px 24px",
              borderRadius: 11,
              border: "none",
              background: "var(--accent)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            Load sample client (Acme Bakery LLC)
          </button>
          <div style={{ marginTop: 16 }}>
            <a
              href="/sample-balance-sheet.csv"
              download
              className="mono"
              style={{ color: "var(--accent)", fontSize: 13, textDecoration: "none" }}
            >
              ⬇ Download a sample template (.csv) to try the upload
            </a>
          </div>
        </div>
      )}

      {/* Data state */}
      {data && snap && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 28 }}>
          <div className="no-print">
            <KpiRow data={data} />
          </div>

          <div className="no-print" style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700 }}>
                Revenue, expenses &amp; net income
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--ink-soft)" }}>
                <Legend color="var(--chart-rev)" label="Revenue" />
                <Legend color="var(--chart-exp)" label="Expenses" />
                <Legend color="var(--chart-net)" label="Net income" line />
              </div>
            </div>
            <TrendChart data={data} />
          </div>

          <div className="no-print grid-collapse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700 }}>Balance sheet check</div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4, marginBottom: 12 }}>
                {snap.month} — assets equal liabilities plus equity
              </div>
              <BalanceChart row={snap} />
            </div>
            <div style={cardStyle}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700 }}>Where the money went</div>
              <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4, marginBottom: 12 }}>
                {snap.month} expense breakdown
              </div>
              <DonutChart row={snap} />
            </div>
          </div>

          <div className="no-print">
            <Highlights data={data} />
          </div>

          <div className="no-print">
            <AiAssistant key={`ai-${sessionKey}`} data={data} clientName={dash!.clientName} />
          </div>

          <MonthlyNote key={`note-${sessionKey}`} data={data} clientName={dash!.clientName} />
        </div>
      )}
    </div>
  );
}

function Legend({ color, label, line }: { color: string; label: string; line?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: line ? 14 : 11, height: line ? 3 : 11, borderRadius: line ? 2 : 2, background: color }} />
      {label}
    </span>
  );
}
