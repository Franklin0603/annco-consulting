import Link from "next/link";
import { buildSample } from "@/lib/sample";
import { SERVICES } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";
import { DeadlineBand } from "@/components/DeadlineBand";

function HeroCard() {
  const last = buildSample().slice(-6);
  const mx = Math.max(...last.map((r) => r.revenue));
  return (
    <div
      style={{
        background: "var(--navy)",
        borderRadius: 20,
        padding: 26,
        color: "#f6f1e7",
        boxShadow: "0 30px 60px -20px rgba(22,36,63,.4)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="mono" style={{ fontSize: 13, color: "#9aa3b3" }}>
          ACME BAKERY LLC
        </div>
        <div style={{ fontSize: 12, background: "rgba(255,255,255,.1)", padding: "4px 10px", borderRadius: 100 }}>
          Live demo
        </div>
      </div>
      <div className="mono" style={{ fontSize: 34, fontWeight: 600, marginTop: 10 }}>
        $103,000
      </div>
      <div className="mono" style={{ fontSize: 13, color: "#7fbf9b" }}>
        ▲ 13.2% revenue · May 2026
      </div>
      <div style={{ display: "flex", gap: 7, alignItems: "flex-end", height: 90, marginTop: 20 }}>
        {last.map((r, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${(r.revenue / mx) * 100}%`,
              background: i === last.length - 1 ? "var(--accent)" : "rgba(255,255,255,.18)",
              borderRadius: 4,
            }}
          />
        ))}
      </div>
      <div className="mono" style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6d7790", marginTop: 8 }}>
        {last.map((r, i) => (
          <span key={i}>{r.month.split(" ")[0]}</span>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="fade-up">
      {/* Hero */}
      <section
        className="grid-collapse"
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr .85fr",
          gap: 56,
          alignItems: "center",
          padding: "80px 28px 40px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div>
          <span
            className="mono"
            style={{
              display: "inline-block",
              background: "var(--accent-soft)",
              color: "var(--accent)",
              fontSize: 13,
              padding: "6px 12px",
              borderRadius: 100,
            }}
          >
            ★ Trusted by Bronx businesses since 2009
          </span>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-.02em",
              textWrap: "balance",
              marginTop: 18,
            }}
          >
            Accounting that gives you back your time.
          </h1>
          <p style={{ fontSize: 19, color: "var(--ink-soft)", marginTop: 18, maxWidth: 540 }}>
            Annco Consulting is a Bronx CPA firm handling the books, taxes, and payroll for privately
            held businesses and nonprofits — so you can get back to running yours.
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                textDecoration: "none",
                padding: "15px 26px",
                borderRadius: 11,
                background: "var(--accent)",
                color: "#fff",
                fontWeight: 600,
                boxShadow: "0 8px 20px rgba(184,132,47,.28)",
              }}
            >
              Schedule a free consultation
            </Link>
            <a
              href="tel:+17185550142"
              style={{
                textDecoration: "none",
                padding: "15px 26px",
                borderRadius: 11,
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--ink)",
                fontWeight: 600,
              }}
            >
              ☎ (718) 555-0142
            </a>
          </div>
        </div>
        <HeroCard />
      </section>

      {/* What we do */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 700 }}>What we do</h2>
          <Link href="/services" className="mono" style={{ color: "var(--accent)", fontSize: 14, textDecoration: "none", fontWeight: 600 }}>
            All services →
          </Link>
        </div>
        <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
          {SERVICES.slice(0, 3).map((s) => (
            <ServiceCard key={s.t} service={s} full={false} />
          ))}
        </div>
      </section>

      {/* Deadline CTA band */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 28px 80px" }}>
        <DeadlineBand />
      </section>
    </div>
  );
}
