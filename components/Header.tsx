"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV: [string, string][] = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/resources", "Resources"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function Header() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try {
      localStorage.setItem("annco-dark", next ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--bg) 86%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 28px",
          height: 68,
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          aria-label="Annco home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 7,
              background: "var(--navy)",
              color: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontWeight: 700,
              fontSize: 19,
            }}
          >
            A
          </span>
          <span style={{ fontFamily: "var(--font-serif)", fontSize: 20, fontWeight: 700 }}>
            Annco<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </Link>

        <nav style={{ flex: 1, display: "flex", gap: 4, flexWrap: "wrap" }}>
          {NAV.map(([href, label]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  textDecoration: "none",
                  padding: "8px 13px",
                  borderRadius: 8,
                  fontSize: 14.5,
                  fontWeight: active ? 600 : 500,
                  background: active ? "var(--accent-soft)" : "none",
                  color: active ? "var(--accent)" : "var(--ink-soft)",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <a
          href="tel:+17185550142"
          className="mono"
          style={{
            fontSize: 13.5,
            color: "var(--ink-soft)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          (718) 555-0142
        </a>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: "var(--ink)",
            fontSize: 16,
          }}
        >
          {dark ? "☀" : "☾"}
        </button>

        <Link
          href="/dashboard"
          style={{
            textDecoration: "none",
            padding: "9px 16px",
            borderRadius: 9,
            background: "var(--navy)",
            color: "var(--bg)",
            fontWeight: 600,
            fontSize: 14.5,
            whiteSpace: "nowrap",
          }}
        >
          Client Dashboard
        </Link>
      </div>
    </header>
  );
}
