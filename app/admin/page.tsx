import type { Metadata } from "next";
import Link from "next/link";
import { CLIENTS, LEADS, firmStats, type ClientStatus, type LeadStatus } from "@/lib/adminData";
import { usd } from "@/lib/finance";

export const metadata: Metadata = {
  title: "Admin — Annco Consulting, LLC",
  robots: { index: false, follow: false },
};

const cardStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: 24,
  boxShadow: "var(--shadow)",
};

function statusColors(s: ClientStatus | LeadStatus): { bg: string; fg: string } {
  switch (s) {
    case "Current":
    case "Scheduled":
      return { bg: "color-mix(in srgb, var(--pos) 16%, transparent)", fg: "var(--pos)" };
    case "Needs review":
    case "New":
      return { bg: "var(--accent-soft)", fg: "var(--accent)" };
    default:
      return { bg: "var(--surface-2)", fg: "var(--muted)" };
  }
}

function Badge({ status }: { status: ClientStatus | LeadStatus }) {
  const { bg, fg } = statusColors(status);
  return (
    <span className="mono" style={{ background: bg, color: fg, fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 100, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

const th: React.CSSProperties = { textAlign: "left", padding: "10px 12px", fontSize: 12, color: "var(--muted)", fontWeight: 600, whiteSpace: "nowrap" };
const td: React.CSSProperties = { padding: "12px", fontSize: 13.5, borderTop: "1px solid var(--border)", whiteSpace: "nowrap" };

export default function AdminPage() {
  const stats = firmStats();
  const statCards: [string, string, string?][] = [
    ["Active clients", String(stats.activeClients), `${stats.onboarding} onboarding`],
    ["Monthly book", usd(stats.monthlyBook), "across active clients"],
    ["Open leads", String(stats.openLeads), "awaiting follow-up"],
    ["Returns filed YTD", String(stats.returnsYTD), "2026 to date"],
  ];

  return (
    <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 28px 72px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div className="eyebrow">Admin</div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(28px, 5vw, 34px)", fontWeight: 700, marginTop: 8 }}>
            Firm overview
          </h1>
        </div>
        <Link href="/dashboard" className="mono" style={{ color: "var(--accent)", fontSize: 13.5, textDecoration: "none" }}>
          Open client dashboard →
        </Link>
      </div>

      <div
        style={{
          marginTop: 16,
          background: "var(--accent-soft)",
          border: "1px solid var(--accent)",
          borderRadius: 10,
          padding: "10px 14px",
          fontSize: 13,
          color: "var(--ink)",
        }}
      >
        Demo admin view — synthetic data, no authentication. In production this would sit behind staff login.
      </div>

      {/* Stat row */}
      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginTop: 24 }}>
        {statCards.map(([label, value, sub]) => (
          <div key={label} style={cardStyle}>
            <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{label}</div>
            <div className="mono" style={{ fontSize: 28, fontWeight: 600, marginTop: 6, letterSpacing: "-.02em" }}>{value}</div>
            {sub && <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>{sub}</div>}
          </div>
        ))}
      </div>

      {/* Clients */}
      <div style={{ ...cardStyle, marginTop: 24, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 8px" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700 }}>Clients</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>{CLIENTS.length} accounts</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Client</th>
                <th style={th}>Industry</th>
                <th style={{ ...th, textAlign: "right" }}>Monthly rev.</th>
                <th style={{ ...th, textAlign: "right" }}>Net income</th>
                <th style={th}>Status</th>
                <th style={th}>Last note</th>
                <th style={th}>Owner</th>
              </tr>
            </thead>
            <tbody>
              {CLIENTS.map((c) => (
                <tr key={c.name}>
                  <td style={{ ...td, fontWeight: 600 }}>{c.name}</td>
                  <td style={{ ...td, color: "var(--ink-soft)" }}>{c.industry}</td>
                  <td className="mono" style={{ ...td, textAlign: "right" }}>{usd(c.mrr)}</td>
                  <td className="mono" style={{ ...td, textAlign: "right", color: c.net >= 0 ? "var(--pos)" : "var(--neg)", fontWeight: 600 }}>{usd(c.net)}</td>
                  <td style={td}><Badge status={c.status} /></td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{c.lastNote}</td>
                  <td style={{ ...td, color: "var(--ink-soft)" }}>{c.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leads */}
      <div style={{ ...cardStyle, marginTop: 24, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 8px" }}>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700 }}>Consultation requests</div>
          <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2 }}>From the contact form</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
            <thead>
              <tr>
                <th style={th}>Name</th>
                <th style={th}>Business</th>
                <th style={th}>Message</th>
                <th style={th}>Received</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {LEADS.map((l) => (
                <tr key={l.email}>
                  <td style={{ ...td, fontWeight: 600 }}>
                    {l.name}
                    <div className="mono" style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 400 }}>{l.email}</div>
                  </td>
                  <td style={{ ...td, color: "var(--ink-soft)" }}>{l.business}</td>
                  <td style={{ ...td, color: "var(--ink-soft)", whiteSpace: "normal", maxWidth: 320 }}>{l.message}</td>
                  <td className="mono" style={{ ...td, color: "var(--ink-soft)" }}>{l.received}</td>
                  <td style={td}><Badge status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
