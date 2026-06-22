import type { Metadata } from "next";
import { SERVICES } from "@/lib/content";
import { ServiceCard } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Services — Annco Consulting, LLC",
  description:
    "Tax preparation, bookkeeping, payroll & sales tax, and nonprofit accounting for Bronx businesses.",
};

export default function ServicesPage() {
  return (
    <section className="fade-up" style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 28px 48px" }}>
      <div className="eyebrow">Services</div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 44, fontWeight: 700, marginTop: 12, letterSpacing: "-.01em" }}>
        Everything your books need, in one place.
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 16, maxWidth: 640 }}>
        From day-to-day bookkeeping to year-end filings, we keep your finances accurate, current, and
        easy to act on.
      </p>
      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18, marginTop: 36 }}>
        {SERVICES.map((s) => (
          <ServiceCard key={s.t} service={s} full />
        ))}
      </div>
    </section>
  );
}
