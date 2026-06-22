"use client";

import { useEffect, useState } from "react";
import { nextDeadline, remaining, type Remaining } from "@/lib/deadline";

const CELLS: [keyof Remaining, string][] = [
  ["D", "Days"],
  ["H", "Hrs"],
  ["M", "Min"],
  ["S", "Sec"],
];

export function Countdown({ size = "big" }: { size?: "big" | "small" }) {
  const big = size === "big";
  const [r, setR] = useState<Remaining | null>(null);

  useEffect(() => {
    const tick = () => setR(remaining(nextDeadline()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const sep = (
    <div
      className="mono"
      style={{
        fontSize: big ? 40 : 30,
        color: "#4a5876",
        lineHeight: big ? 1.1 : 1,
      }}
    >
      :
    </div>
  );

  return (
    <div style={{ display: "flex", gap: big ? 22 : 16, alignItems: "flex-start" }}>
      {CELLS.map(([u, lab], i) => (
        <div key={u} style={{ display: "contents" }}>
          {i > 0 && sep}
          <div style={{ textAlign: "center" }}>
            <div
              className="mono"
              style={{
                fontWeight: 600,
                fontSize: big ? 46 : 34,
                lineHeight: 1,
                color: "#f6f1e7",
                minWidth: big ? 74 : 54,
              }}
            >
              {r ? r[u] : "—"}
            </div>
            <div
              style={{
                fontSize: big ? 12 : 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9aa3b3",
                marginTop: 8,
              }}
            >
              {lab}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
