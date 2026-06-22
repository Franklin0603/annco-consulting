"use client";

import { useEffect, useState } from "react";
import { nextDeadline, deadlineLabel, longDate } from "@/lib/deadline";
import { Countdown } from "./Countdown";

// Navy band used on the Home page: deadline name + long date + compact countdown.
export function DeadlineBand() {
  const [info, setInfo] = useState<{ label: string; date: string } | null>(null);

  useEffect(() => {
    const d = nextDeadline();
    setInfo({ label: deadlineLabel(d), date: longDate(d) });
  }, []);

  return (
    <div
      className="grid-collapse"
      style={{
        background: "var(--navy)",
        borderRadius: 20,
        padding: 40,
        color: "#f6f1e7",
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: 32,
        alignItems: "center",
      }}
    >
      <div>
        <div className="mono" style={{ color: "var(--accent)", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
          Next IRS deadline
        </div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 700, marginTop: 10 }}>
          {info?.label ?? "Loading…"}
        </div>
        <div style={{ color: "#c4cad6", fontSize: 15, marginTop: 6 }}>{info?.date ?? ""}</div>
      </div>
      <Countdown size="small" />
    </div>
  );
}
