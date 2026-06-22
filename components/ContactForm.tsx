"use client";

import { useState } from "react";

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: "var(--ink-soft)",
  marginBottom: 6,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid var(--border)",
  borderRadius: 10,
  background: "var(--bg)",
  fontSize: 15,
  color: "var(--ink)",
};

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  };

  const reset = () => {
    setDone(false);
    setName("");
    setEmail("");
  };

  if (done) {
    return (
      <div
        className="fade-in"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderLeft: "4px solid var(--pos)",
          borderRadius: 16,
          padding: 30,
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ fontSize: 26, color: "var(--pos)" }}>✓</div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: 24, fontWeight: 700, marginTop: 10 }}>
          Thanks, {name.trim()} — we&apos;ve got it.
        </div>
        <p style={{ color: "var(--ink-soft)", fontSize: 15.5, marginTop: 10, lineHeight: 1.7 }}>
          We&apos;ll follow up at <strong>{email.trim()}</strong> shortly. This is a demo, so nothing
          was actually sent — but in a real build this would reach the Annco team.
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: 18,
            padding: "11px 18px",
            borderRadius: 10,
            border: "1px solid var(--border)",
            background: "var(--surface-2)",
            color: "var(--ink)",
            fontWeight: 600,
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 30,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="grid-collapse" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div>
          <label style={labelStyle} htmlFor="name">
            Name
          </label>
          <input id="name" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">
            Email
          </label>
          <input id="email" type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="biz">
          Business name
        </label>
        <input id="biz" style={inputStyle} />
      </div>

      <div>
        <label style={labelStyle} htmlFor="msg">
          How can we help?
        </label>
        <textarea id="msg" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
      </div>

      {error && (
        <div style={{ color: "var(--neg)", fontSize: 14 }}>
          Please enter your name and a valid email.
        </div>
      )}

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 10,
          border: "none",
          background: "var(--accent)",
          color: "#fff",
          fontWeight: 600,
          fontSize: 15.5,
        }}
      >
        Request my consultation
      </button>
    </form>
  );
}
