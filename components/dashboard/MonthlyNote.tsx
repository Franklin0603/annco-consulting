"use client";

import { useState } from "react";
import type { MonthRow } from "@/lib/types";
import { longDate } from "@/lib/deadline";

export function MonthlyNote({ data, clientName }: { data: MonthRow[]; clientName: string }) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const cur = data[data.length - 1];

  const draft = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "note", data, clientName }),
      });
      const json = await res.json();
      setNote((json.text || "").trim());
    } catch {
      alert("Could not draft the note right now — please try again.");
    } finally {
      setLoading(false);
    }
  };

  const print = () => {
    window.print();
  };

  const btnLabel = loading ? "Drafting…" : note ? "Re-draft note" : "Draft monthly note";

  return (
    <>
      <div className="no-print" style={{ background: "var(--surface)", borderRadius: 20, padding: 26, border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 700 }}>Monthly client note</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>
              Auto-drafted from {cur.month} — review before sending
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {note && !loading && (
              <button
                onClick={print}
                style={{
                  padding: "10px 16px",
                  borderRadius: 9,
                  border: "1px solid var(--border)",
                  background: "var(--surface-2)",
                  color: "var(--ink)",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                ⎙ Print / PDF
              </button>
            )}
            <button
              onClick={draft}
              disabled={loading}
              style={{
                padding: "10px 16px",
                borderRadius: 9,
                border: "none",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                opacity: loading ? 0.6 : 1,
              }}
            >
              {btnLabel}
            </button>
          </div>
        </div>

        {note && !loading ? (
          <div
            style={{
              background: "var(--bg)",
              borderRadius: 14,
              padding: 22,
              marginTop: 18,
              whiteSpace: "pre-wrap",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--ink)",
            }}
          >
            {note}
          </div>
        ) : (
          !loading && (
            <div
              style={{
                border: "1px dashed var(--border)",
                borderRadius: 14,
                padding: 30,
                marginTop: 18,
                textAlign: "center",
                color: "var(--muted)",
                fontSize: 14.5,
              }}
            >
              No note yet — click “Draft monthly note” to generate one from the latest figures.
            </div>
          )
        )}
      </div>

      {/* Print-only letterhead document */}
      {note && (
        <div
          aria-hidden
          style={{ display: "none" }}
          className="print-only"
        >
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 48px", background: "#fff", color: "#16243f", fontSize: 15, lineHeight: 1.7 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #16243f", paddingBottom: 18, marginBottom: 28 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700 }}>
                Annco Consulting, LLC
              </div>
              <div style={{ fontFamily: "monospace", fontSize: 13, color: "#555" }}>{longDate(new Date())}</div>
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}>{note}</div>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "#888", marginTop: 40, borderTop: "1px solid #ddd", paddingTop: 14 }}>
              123 Grand Concourse, Bronx, NY 10451 · (718) 555-0142 · info@anncocpa.com · Demo on synthetic data
            </div>
          </div>
        </div>
      )}
    </>
  );
}
