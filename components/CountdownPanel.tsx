"use client";

import { useEffect, useState } from "react";
import { nextDeadline, deadlineLabel, longDate } from "@/lib/deadline";
import { Countdown } from "./Countdown";

// Large navy panel used on the Resources page.
export function CountdownPanel() {
  const [info, setInfo] = useState<{ label: string; date: string } | null>(null);

  useEffect(() => {
    const d = nextDeadline();
    setInfo({ label: deadlineLabel(d), date: longDate(d) });
  }, []);

  return (
    <div style={{ background: "var(--navy)", borderRadius: 20, padding: 40, color: "#f6f1e7" }}>
      <div className="mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
        Counting down to
      </div>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: 34, fontWeight: 700, marginTop: 10 }}>
        {info?.label ?? "Loading…"}
      </div>
      <div style={{ color: "#c4cad6", fontSize: 15, marginTop: 6, marginBottom: 30 }}>
        {info?.date ?? ""}
      </div>
      <Countdown size="big" />
      <div style={{ fontSize: 13, color: "#9aa3b3", marginTop: 28 }}>
        Estimated-tax dates: Apr 15 · Jun 15 · Sep 15 · Oct 15 · Jan 15. Computed live in your
        browser.
      </div>
    </div>
  );
}
