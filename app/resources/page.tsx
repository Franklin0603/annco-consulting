import type { Metadata } from "next";
import { RESOURCE_LINKS } from "@/lib/content";
import { CountdownPanel } from "@/components/CountdownPanel";

export const metadata: Metadata = {
  title: "Resources — Annco Consulting, LLC",
  description: "Live IRS tax-deadline countdown and official federal & New York State tax links.",
};

export default function ResourcesPage() {
  return (
    <section className="fade-up" style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 28px 48px" }}>
      <div className="eyebrow">Resources</div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 6.5vw, 44px)", fontWeight: 700, marginTop: 12, letterSpacing: "-.01em" }}>
        Deadlines &amp; official links.
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 16, maxWidth: 640, marginBottom: 36 }}>
        Keep the next filing date in view, and jump straight to the forms and tools you need.
      </p>

      <CountdownPanel />

      <div
        className="grid-collapse"
        style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18, marginTop: 36 }}
      >
        {RESOURCE_LINKS.map((l) => (
          <a
            key={l.t}
            href={l.u}
            target="_blank"
            rel="noopener"
            style={{
              textDecoration: "none",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 22,
              boxShadow: "var(--shadow)",
              display: "block",
              color: "var(--ink)",
            }}
          >
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 700 }}>{l.t}</div>
            <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginTop: 6 }}>{l.d}</p>
            <div className="mono" style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, marginTop: 12 }}>
              Open on official site ↗
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
