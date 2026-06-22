"use client";

import { useEffect, useRef, useState } from "react";
import type { MonthRow, ChatMessage } from "@/lib/types";
import { AI_SUGGESTIONS } from "@/lib/content";

export function AiAssistant({ data, clientName }: { data: MonthRow[]; clientName: string }) {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [chat, loading]);

  const ask = async (question: string) => {
    if (!question || loading) return;
    setInput("");
    setChat((c) => [...c, { role: "user", content: question }]);
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "chat", question, data, clientName }),
      });
      const json = await res.json();
      setChat((c) => [
        ...c,
        { role: "assistant", content: (json.text || "").trim() || "Sorry — I had trouble with that one. Try rephrasing?" },
      ]);
    } catch {
      setChat((c) => [...c, { role: "assistant", content: "I couldn't reach the model just now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--navy)", borderRadius: 20, padding: 26, color: "#eef1f6" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "var(--accent)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          ✦
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: 21, fontWeight: 700, color: "#f6f1e7" }}>
            Ask Annco AI
          </div>
          <div style={{ fontSize: 13, color: "#9aa3b3" }}>Plain-English answers on your numbers</div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
        {AI_SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            style={{
              padding: "8px 13px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,.18)",
              background: "rgba(255,255,255,.05)",
              color: "#dfe4ee",
              fontSize: 13,
            }}
          >
            {q}
          </button>
        ))}
      </div>

      <div ref={scrollRef} style={{ maxHeight: 320, overflowY: "auto", padding: "4px 2px", marginTop: 16 }}>
        {!chat.length && !loading ? (
          <div style={{ padding: 18, borderRadius: 12, background: "rgba(255,255,255,.05)", color: "#aab2c2", fontSize: 14, lineHeight: 1.6 }}>
            Ask anything about these numbers — trends, ratios, what drove a change, or what to watch
            next month.
          </div>
        ) : (
          chat.map((m, i) => {
            const u = m.role === "user";
            return (
              <div key={i} style={{ display: "flex", justifyContent: u ? "flex-end" : "flex-start", marginBottom: 10 }}>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "11px 15px",
                    borderRadius: 14,
                    fontSize: 14,
                    lineHeight: 1.6,
                    whiteSpace: "pre-wrap",
                    background: u ? "var(--accent)" : "rgba(255,255,255,.07)",
                    color: u ? "#fff" : "#eef1f6",
                    borderTopRightRadius: u ? 4 : 14,
                    borderTopLeftRadius: u ? 14 : 4,
                  }}
                >
                  {m.content}
                </div>
              </div>
            );
          })
        )}
        {loading && (
          <div style={{ display: "flex", gap: 5, padding: "12px 4px" }}>
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  animation: `blink 1s ${d * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              ask(input.trim());
            }
          }}
          placeholder="Ask about these numbers…"
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,.18)",
            background: "rgba(255,255,255,.06)",
            color: "#f6f1e7",
            fontSize: 14,
          }}
        />
        <button
          onClick={() => ask(input.trim())}
          disabled={loading}
          style={{
            padding: "12px 22px",
            borderRadius: 10,
            border: "none",
            background: "var(--accent)",
            color: "#fff",
            fontWeight: 600,
            opacity: loading ? 0.6 : 1,
          }}
        >
          Ask
        </button>
      </div>
    </div>
  );
}
