import Link from "next/link";

export function Footer() {
  return (
    <footer className="no-print" style={{ borderTop: "1px solid var(--border)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "34px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              background: "var(--navy)",
              color: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            A
          </span>
          <span style={{ color: "var(--ink-soft)", fontSize: 14.5 }}>
            Annco Consulting, LLC · Bronx, NY
          </span>
        </div>
        <div className="mono" style={{ fontSize: 13, color: "var(--muted)", display: "flex", gap: 14, alignItems: "center" }}>
          <span>Demo on synthetic data · not financial advice</span>
          <Link href="/admin" style={{ color: "var(--muted)", textDecoration: "none", borderLeft: "1px solid var(--border)", paddingLeft: 14 }}>
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
