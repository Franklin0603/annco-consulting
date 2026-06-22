"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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

  const linkStyle = (href: string): React.CSSProperties => {
    const active = pathname === href;
    return {
      fontWeight: active ? 600 : 500,
      background: active ? "var(--accent-soft)" : "none",
      color: active ? "var(--accent)" : "var(--ink-soft)",
    };
  };

  return (
    <header className={`${styles.bar} no-print`}>
      <div className={styles.inner}>
        <Link href="/" aria-label="Annco home" className={styles.logo}>
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

        <nav className={styles.nav}>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={styles.link} style={linkStyle(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <span className={styles.spacer} />

        <a href="tel:+17185550142" className={`${styles.phone} mono`}>
          (718) 555-0142
        </a>

        <button onClick={toggle} aria-label="Toggle theme" className={styles.iconBtn}>
          {dark ? "☀" : "☾"}
        </button>

        <Link href="/admin" className={styles.adminBtn}>
          Admin
        </Link>

        <Link href="/dashboard" className={styles.cta}>
          Client Dashboard
        </Link>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className={styles.menuBtn}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className={styles.link} style={linkStyle(href)}>
              {label}
            </Link>
          ))}
          <Link href="/dashboard" className={`${styles.cta} ${styles.mobileCta}`}>
            Client Dashboard
          </Link>
          <Link href="/admin" className={styles.link} style={{ color: "var(--ink-soft)" }}>
            Admin
          </Link>
          <a href="tel:+17185550142" className={`${styles.mobilePhone} mono`}>
            ☎ (718) 555-0142
          </a>
        </div>
      )}
    </header>
  );
}
