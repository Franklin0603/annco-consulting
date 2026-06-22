import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Annco Consulting, LLC",
  description: "Schedule a free consultation with Annco Consulting, a Bronx CPA firm.",
};

export default function ContactPage() {
  return (
    <section className="fade-up" style={{ maxWidth: 760, margin: "0 auto", padding: "72px 28px 56px" }}>
      <div className="eyebrow">Contact</div>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(30px, 6.5vw, 44px)", fontWeight: 700, marginTop: 12, letterSpacing: "-.01em" }}>
        Schedule a free consultation
      </h1>
      <p style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 16, marginBottom: 32 }}>
        Tell us a little about your business and we&apos;ll be in touch. Prefer to talk now? Call{" "}
        <a href="tel:+17185550142" style={{ color: "var(--accent)", textDecoration: "none" }}>
          (718) 555-0142
        </a>
        .
      </p>
      <ContactForm />
    </section>
  );
}
