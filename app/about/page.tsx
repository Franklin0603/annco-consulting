import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Annco Consulting, LLC",
  description:
    "A small Bronx CPA practice serving privately held businesses and nonprofits since 2009.",
};

const STATS: [string, string][] = [
  ["15+", "Years in the Bronx"],
  ["200+", "Businesses served"],
  ["100%", "On-time filings"],
];

export default function AboutPage() {
  return (
    <section className="fade-up" style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 28px 48px" }}>
      <div className="eyebrow">About</div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 44, fontWeight: 700, marginTop: 12, letterSpacing: "-.01em" }}>
        A small firm that treats your books like its own.
      </h1>

      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: 48, marginTop: 36 }}>
        <div>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7 }}>
            Annco Consulting, LLC is a Bronx-based CPA practice serving privately held businesses and
            nonprofits across New York. We pair the responsiveness of a small firm with the rigor of a
            much larger one — you work directly with the people doing the work.
          </p>
          <p style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.7, marginTop: 18 }}>
            From bookkeeping and payroll to tax planning and year-end filings, we keep your numbers
            clean and your deadlines met, and we translate the figures into decisions you can actually
            make.
          </p>

          <div style={{ display: "flex", gap: 40, marginTop: 40, flexWrap: "wrap" }}>
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="mono" style={{ fontSize: 34, fontWeight: 600, color: "var(--ink)" }}>
                  {n}
                </div>
                <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 26,
            boxShadow: "var(--shadow)",
            height: "fit-content",
          }}
        >
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 700 }}>Office</div>
          <div style={{ color: "var(--ink-soft)", fontSize: 15, marginTop: 14, lineHeight: 1.8 }}>
            123 Grand Concourse
            <br />
            Bronx, NY 10451
          </div>
          <div className="mono" style={{ fontSize: 14, marginTop: 16, lineHeight: 1.9 }}>
            <a href="tel:+17185550142" style={{ textDecoration: "none", color: "var(--ink-soft)", display: "block" }}>
              (718) 555-0142
            </a>
            <a href="mailto:info@anncocpa.com" style={{ textDecoration: "none", color: "var(--accent)", display: "block" }}>
              info@anncocpa.com
            </a>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 16, lineHeight: 1.6 }}>
            Mon–Fri · 9:00–6:00
            <br />
            Extended hours Jan–Apr
          </div>
        </div>
      </div>
    </section>
  );
}
