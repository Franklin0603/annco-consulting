"use client";

import { useRef, useState } from "react";
import type { DashboardData } from "@/lib/types";
import { sampleDashboard } from "@/lib/sample";
import { parseFile } from "@/lib/parse";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { Highlights } from "@/components/dashboard/Highlights";
import { DataTable } from "@/components/dashboard/DataTable";
import { Forecast } from "@/components/dashboard/Forecast";
import { TrendChart } from "@/components/charts/TrendChart";
import { BalanceChart } from "@/components/charts/BalanceChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { LineChart } from "@/components/charts/LineChart";
import { AiAssistant } from "@/components/dashboard/AiAssistant";
import { MonthlyNote } from "@/components/dashboard/MonthlyNote";
import { net, usdK } from "@/lib/finance";

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 18,
  padding: 24,
  boxShadow: "var(--shadow)",
};

type TabId = "overview" | "analysis" | "forecast" | "data" | "assistant";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "analysis", label: "Analysis" },
  { id: "forecast", label: "Forecast" },
  { id: "data", label: "Data" },
  { id: "assistant", label: "Assistant" },
];

function CardHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700 }}>{title}</div>
      {sub && <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const [dash, setDash] = useState<DashboardData | null>(null);
  const [tab, setTab] = useState<TabId>("overview");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadSample = () => {
    setDash(sampleDashboard());
    setTab("overview");
  };

  const onFile = async (file?: File | null) => {
    if (!file) return;
    setDash(await parseFile(file));
    setTab("overview");
  };

  const data = dash?.data ?? null;
  const snap = data ? data[data.length - 1] : null;
  const sessionKey = dash ? `${dash.clientName}|${dash.periodLabel}` : "none";

  return (
    <div className="fade-up" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px 72px" }}>
      {/* ---------- Toolbar ---------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 20,
          flexWrap: "wrap",
          paddingBottom: 22,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div>
          <div className="eyebrow">Client dashboard</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(26px, 5vw, 34px)", fontWeight: 700, marginTop: 8 }}>
            {dash?.clientName ?? "No client loaded"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
            {dash && (
              <span
                className="mono"
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: "3px 9px",
                  borderRadius: 100,
                  background: dash.source === "upload" ? "var(--accent-soft)" : "var(--surface-2)",
                  color: dash.source === "upload" ? "var(--accent)" : "var(--muted)",
                }}
              >
                {dash.source === "upload" ? "Uploaded file" : "Sample data"}
              </span>
            )}
            <span style={{ color: "var(--muted)", fontSize: 14 }}>
              {dash?.periodLabel ?? "Upload a balance sheet or load the sample to begin"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
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
          <a href="/sample-balance-sheet.csv" download className="mono" style={{ color: "var(--accent)", fontSize: 12.5, textDecoration: "none" }}>
            template ↓
          </a>
        </div>
      </div>

      {dash?.uploadMsg && (
        <div
          style={{
            marginTop: 18,
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

      {/* ---------- Empty state ---------- */}
      {!data && (
        <div
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
            See the dashboard in action
          </div>
          <p style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 8, maxWidth: 460, marginInline: "auto", lineHeight: 1.6 }}>
            New here? Load our sample client to instantly explore the full dashboard — KPIs, charts, a
            6-month forecast, and the AI assistant. No file needed.
          </p>

          <div className="mono" style={{ marginTop: 22, fontSize: 13, color: "var(--accent)", fontWeight: 600, letterSpacing: ".04em" }}>
            👇 Click here to view the insights
          </div>
          <button
            onClick={loadSample}
            className="pulse-cta"
            style={{
              marginTop: 10,
              padding: "16px 28px",
              borderRadius: 12,
              border: "none",
              background: "var(--accent)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              boxShadow: "0 8px 20px rgba(184,132,47,.28)",
            }}
          >
            ▶ Load sample client (Acme Bakery LLC)
          </button>

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--border)", maxWidth: 460, marginInline: "auto" }}>
            <p style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.6 }}>
              Want to try your own numbers? Use <strong>Upload .csv / .xlsx</strong> above, or{" "}
              <a href="/sample-balance-sheet.csv" download className="mono" style={{ color: "var(--accent)", textDecoration: "none" }}>
                download a sample template ↓
              </a>
            </p>
          </div>
        </div>
      )}

      {/* ---------- Loaded state ---------- */}
      {data && snap && (
        <>
          {/* Persistent summary bar */}
          <div style={{ marginTop: 24 }}>
            <KpiRow data={data} />
          </div>

          {/* Tab bar */}
          <div style={{ marginTop: 28, overflowX: "auto" }}>
            <div
              style={{
                display: "inline-flex",
                gap: 4,
                padding: 4,
                borderRadius: 12,
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: 9,
                      border: "none",
                      fontSize: 14,
                      fontWeight: active ? 600 : 500,
                      whiteSpace: "nowrap",
                      background: active ? "var(--surface)" : "transparent",
                      color: active ? "var(--ink)" : "var(--ink-soft)",
                      boxShadow: active ? "var(--shadow)" : "none",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panels (kept mounted to preserve AI/note state) */}
          <div style={{ marginTop: 20 }}>
            {/* Overview */}
            <Panel active={tab === "overview"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div style={cardStyle}>
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
                <div>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>Month over month</div>
                  <Highlights data={data} />
                </div>
              </div>
            </Panel>

            {/* Analysis */}
            <Panel active={tab === "analysis"}>
              <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                <div style={cardStyle}>
                  <CardHeading title="Balance sheet check" sub={`${snap.month} — assets equal liabilities plus equity`} />
                  <BalanceChart row={snap} />
                </div>
                <div style={cardStyle}>
                  <CardHeading title="Where the money went" sub={`${snap.month} expense breakdown`} />
                  <DonutChart row={snap} />
                </div>
                <div style={cardStyle}>
                  <CardHeading title="Cash position" sub="Cash on hand by month" />
                  <LineChart points={data.map((r) => ({ label: r.month, value: r.cash }))} color="var(--chart-rev)" format={usdK} area />
                </div>
                <div style={cardStyle}>
                  <CardHeading title="Net profit margin" sub="Net income as a share of revenue" />
                  <LineChart points={data.map((r) => ({ label: r.month, value: r.revenue ? (net(r) / r.revenue) * 100 : 0 }))} color="var(--accent)" format={(n) => `${Math.round(n)}%`} />
                </div>
              </div>
            </Panel>

            {/* Forecast */}
            <Panel active={tab === "forecast"}>
              <Forecast data={data} />
            </Panel>

            {/* Data */}
            <Panel active={tab === "data"}>
              <div style={cardStyle}>
                <CardHeading title="Monthly detail" sub="Every month in the loaded period — most recent first" />
                <DataTable data={data} />
              </div>
            </Panel>

            {/* Assistant */}
            <Panel active={tab === "assistant"}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <AiAssistant key={`ai-${sessionKey}`} data={data} clientName={dash!.clientName} />
                <MonthlyNote key={`note-${sessionKey}`} data={data} clientName={dash!.clientName} />
              </div>
            </Panel>
          </div>
        </>
      )}
    </div>
  );
}

function Panel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return <div className={active ? "fade-in" : undefined} style={{ display: active ? "block" : "none" }}>{children}</div>;
}

function Legend({ color, label, line }: { color: string; label: string; line?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: line ? 14 : 11, height: line ? 3 : 11, borderRadius: 2, background: color }} />
      {label}
    </span>
  );
}
