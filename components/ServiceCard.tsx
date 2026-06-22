import type { Service } from "@/lib/content";

export function ServiceCard({ service, full }: { service: Service; full: boolean }) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: full ? 26 : 22,
        boxShadow: "var(--shadow)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "var(--accent-soft)",
          color: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-serif)",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        {service.t[0]}
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: full ? 21 : 18, fontWeight: 700, marginTop: 14 }}>
        {service.t}
      </div>
      <p style={{ color: "var(--ink-soft)", fontSize: full ? 15.5 : 14.5, marginTop: 7, lineHeight: 1.6 }}>
        {service.d}
      </p>
    </div>
  );
}
