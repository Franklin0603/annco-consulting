# Handoff: Annco Consulting — CPA Firm Marketing Site + Client Financial Dashboard + AI Assistant

## Overview
A polished demo web app for **Annco Consulting, LLC**, a CPA / tax-accounting firm in the Bronx, NY. It demonstrates three capabilities in one continuous click-through:

1. **Marketing website** — home + Services / Resources / About / Contact tabs, with a live IRS-deadline countdown.
2. **Client financial dashboard** (`/dashboard` equivalent) — upload a monthly balance sheet (CSV/XLSX) or load a sample client, and instantly see KPIs and charts.
3. **AI assistant on the numbers** — ask questions in plain English about the loaded financials, and auto-draft the monthly client note (with print/PDF export).

This was built as a single-page app with client-side "routing" (a `route` state variable swaps full-page sections). It is a **demo on synthetic data** — no real auth, persistence, or security. Priorities were visual polish and a smooth click-through.

## About the Design Files
The file in this bundle — `Annco Demo.dc.html` — is a **design reference created in HTML** (a working prototype showing the intended look, layout, and behavior). It is **not production code to copy directly.** It is authored in a proprietary "Design Component" runtime: a single class-based component whose `renderVals()` returns data/handlers consumed by an HTML-ish template, with charts and some lists built via `React.createElement`. You will not be able to run it outside that runtime.

**Your task: recreate these designs in the target codebase's existing environment** (React, Vue, Svelte, etc.) using its established patterns, component library, and styling approach. If no codebase exists yet, **Next.js + React + Tailwind (or CSS Modules)** is a clean fit — it satisfies the original brief's "runs with `npm run dev`, deploys to Vercel" requirement. Recharts (or visx / D3) is recommended for the charts; the prototype hand-rolls SVG, which you should replace with a real chart library.

The prototype's AI calls go through a sandbox helper (`window.claude.complete`). In a real build, replace these with server-side calls to your LLM provider (e.g. an Anthropic API route) — see **Interactions & Behavior → AI** below.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, layout, and interactions are all specified. Recreate the UI to match, using the codebase's existing libraries where they map cleanly. The exact design tokens are listed at the bottom.

---

## Screens / Views

The app is one page; a `route` state value (`'home' | 'services' | 'resources' | 'about' | 'contact' | 'dashboard'`) controls which `<section>` renders. A persistent header (nav) and footer wrap all routes.

### Global — Header / Nav (persistent)
- **Layout**: `position: sticky; top: 0; z-index: 50`. Translucent bar — `background: color-mix(in srgb, var(--bg) 86%, transparent); backdrop-filter: blur(10px)`; 1px bottom border (`--border`). Inner row: `max-width: 1200px; margin: 0 auto; padding: 0 28px; height: 68px; display: flex; align-items: center; gap: 28px`.
- **Logo (left)**: 34×34 rounded-7px navy square with serif "A" in `--bg` color, next to the wordmark **"Annco"** (Georgia, 20px, 700) with a `--accent` period. Clicking returns to Home.
- **Nav links (flex:1)**: Home, Services, Resources, About, Contact. Each is a button — `padding: 8px 13px; border-radius: 8px; font-size: 14.5px`. Active link: `background: var(--accent-soft); color: var(--accent); font-weight: 600`. Inactive: `color: var(--ink-soft); font-weight: 500`.
- **Theme toggle**: 38×38 button, 1px border, `--surface` bg, shows ☾ (light mode) / ☀ (dark mode). Persists choice to `localStorage` key `annco-dark`.
- **"Client Dashboard" button**: `padding: 9px 16px; border-radius: 9px; background: var(--navy); color: var(--bg); font-weight: 600; white-space: nowrap`. Routes to dashboard.
- Phone link `(718) 555-0142` (`tel:+17185550142`) is present (hidden by default; surface on wider layouts).

### Global — Footer (persistent)
- 1px top border. Inner: `max-width: 1200px; padding: 34px 28px; display: flex; justify-content: space-between`. Left: 26px navy logo chip + "Annco Consulting, LLC · Bronx, NY". Right (mono, 13px, `--muted`): "Demo on synthetic data · not financial advice".

### 1. Home (`route: 'home'`)
- **Purpose**: Marketing landing; drive consultation bookings.
- **Hero**: Two-column grid `grid-template-columns: 1.15fr .85fr; gap: 56px; align-items: center; padding: 80px 28px 40px; max-width: 1200px`. Entrance animation `fadeUp .6s ease`.
  - Left column: a pill badge (`background: var(--accent-soft); color: var(--accent)`, mono 13px, text "★ Trusted by Bronx businesses since 2009"); H1 **"Accounting that gives you back your time."** (Georgia, 54px, 700, `line-height: 1.06; letter-spacing: -.02em; text-wrap: balance`); a 19px `--ink-soft` paragraph; a button row.
  - Primary CTA: **"Schedule a free consultation"** — `padding: 15px 26px; border-radius: 11px; background: var(--accent); color: #fff; font-weight: 600; box-shadow: 0 8px 20px rgba(184,132,47,.28)`. Routes to Contact.
  - Secondary: **"☎ (718) 555-0142"** — outline button (`--border`, `--surface`), `tel:` link.
  - Right column: a navy "live demo" mini-dashboard card (rounded 20px, `--navy` bg, `--bg` text) showing ACME BAKERY LLC, big mono `$103,000`, "▲ 13.2% revenue · May 2026", and a 6-bar mini bar chart (last bar `--accent`, rest `rgba(255,255,255,.18)`) with month labels.
- **"What we do" section**: heading row (Georgia 30px + "All services →" link to Services). 3-column grid of the first 3 service cards (see Services for card spec).
- **Deadline CTA band**: navy rounded-20px panel, `padding: 40px`, two-column (`1fr auto`). Left: mono label "Next IRS deadline" (`--accent`), Georgia 30px deadline name, `--bg`-tinted long date. Right: the **compact countdown** (see Resources).

### 2. Services (`route: 'services'`)
- **Purpose**: Full list of offerings.
- **Layout**: `max-width: 1100px; padding: 72px 28px 48px`. Mono eyebrow "Services" (`--accent`), H1 (Georgia 44px), 18px intro paragraph. Then a 2-column grid (`gap: 18px`) of service cards.
- **Service card**: `background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 26px; box-shadow: var(--shadow)`. Top: 40×40 rounded-10px `--accent-soft` chip with the service's first letter (Georgia 18px, `--accent`). Then service title (Georgia, 21px on full / 18px on preview, 700) and a `--ink-soft` description (15.5px / 14.5px).
- **Services list (4 items — Advisory/CFO was removed):**
  1. **Tax preparation** — "Federal, state & local returns for businesses and owners — accurate, on time, and optimized."
  2. **Bookkeeping** — "Clean monthly books you can actually read, reconciled and ready for decisions."
  3. **Payroll & sales tax** — "Run payroll and stay current on NY sales-tax filings without the headache."
  4. **Nonprofit accounting** — "Fund accounting, Form 990, and board-ready statements for mission-driven orgs."
  - (Home shows the first 3 of these.)

### 3. Resources (`route: 'resources'`)
- **Purpose**: Tax-deadline countdown + official links.
- **Countdown panel**: navy rounded-20px, `padding: 40px`. Mono eyebrow "Counting down to", Georgia 34px deadline name, long date, then the **big countdown**, then a 13px footnote: "Estimated-tax dates: Apr 15 · Jun 15 · Sep 15 · Oct 15 · Jan 15. Computed live in your browser."
- **Countdown component** (two sizes — `big` on Resources, `small`/compact on Home & the Home deadline band): a flex row of four cells (Days / Hrs / Min / Sec) separated by mono ":" glyphs. Each cell: a big mono number (`big`: 46px / `small`: 34px, weight 600, color `--bg`) over an uppercase letter-spaced label (`#9aa3b3`). Numbers update **every second** via a `setInterval`.
- **Deadline computation** (must be reproduced exactly): candidate dates are **Apr 15, Jun 15, Sep 15, Oct 15, Jan 15** for the current year and next year; pick the **earliest candidate strictly after `now`**. Map each to a descriptive label:
  - Apr 15 → "April 15 — Q1 estimates & individual returns"
  - Jun 15 → "June 15 — Q2 estimated taxes"
  - Sep 15 → "September 15 — Q3 estimates & S-corp/partnership ext."
  - Oct 15 → "October 15 — extended individual returns"
  - Jan 15 → "January 15 — Q4 estimated taxes"
- **Resource links**: 3-column grid of link cards (same card chrome as service cards), each an `<a target="_blank" rel="noopener">` with a Georgia 18px title, `--ink-soft` description, and a mono 13px "Open on official site ↗" affordance in `--accent`:
  1. **Where's My Refund?** → `https://www.irs.gov/refunds`
  2. **IRS forms & instructions** → `https://www.irs.gov/forms-instructions`
  3. **New York State tax forms** → `https://www.tax.ny.gov/forms/`

### 4. About (`route: 'about'`)
- `max-width: 1000px; padding: 72px 28px 48px`. Mono eyebrow, Georgia 44px H1 "A small firm that treats your books like its own." Two-column grid (`1.3fr .7fr; gap: 48px`).
- Left: two 18px `--ink-soft` paragraphs (firm description — Bronx CPA practice serving privately held businesses & nonprofits), then a 3-stat row: **15+** Years in the Bronx · **200+** Businesses served · **100%** On-time filings (numbers in mono 34px).
- Right: an "Office" card (`--surface`, 1px border, rounded 16px, `box-shadow: var(--shadow)`) with address **123 Grand Concourse, Bronx, NY 10451**, phone, `info@anncocpa.com`, and hours "Mon–Fri · 9:00–6:00 / Extended hours Jan–Apr".

### 5. Contact (`route: 'contact'`)
- **Purpose**: Free-consultation request form.
- `max-width: 760px; padding: 72px 28px 56px`. Mono eyebrow, Georgia 44px H1 "Schedule a free consultation", intro paragraph with a `tel:` link.
- **Form card** (`--surface`, 1px border, rounded 16px, `padding: 30px; display: flex; flex-direction: column; gap: 18px; box-shadow: var(--shadow)`):
  - Row 1: Name + Email (2-col grid). Row 2: Business name. Row 3: "How can we help?" textarea (4 rows, vertical resize).
  - Inputs: `padding: 12px 14px; border: 1px solid var(--border); border-radius: 10px; background: var(--bg); font-size: 15px`. Labels: 14px, 600, `--ink-soft`.
  - Validation error (red `--neg`, 14px): "Please enter your name and a valid email."
  - Submit: full-width `--accent` button, "Request my consultation".
- **On submit** (no network — demo): replace the form with a confirmation card (left border `--pos`): a "✓", Georgia 24px "Thanks, {name} — we've got it.", a paragraph confirming the email and noting nothing was actually sent, and a "Send another" button that resets the form.

### 6. Client Dashboard (`route: 'dashboard'`)
- **Purpose**: The core demo — load a monthly balance sheet, see it visualized, and use the AI assistant.
- **Header row**: mono eyebrow "Client dashboard", Georgia 34px client name (default placeholder "No client loaded"), `--muted` period label. Right side: an **"⬆ Upload .csv / .xlsx"** label-wrapped file input (dashed border) and a **"Load sample client"** navy button.
- **Upload status banner** (when present): `--accent-soft` bg, 1px `--accent` border, rounded 10px.
- **Empty state** (no data): dashed-border rounded-20px dropzone (also accepts drag-drop), large "⬗" glyph, Georgia 24px "Drop a monthly balance sheet to begin", helper text, and a big `--accent` "Load sample client (Acme Bakery LLC)" button.
- **Data state** renders, in order:
  1. **KPI row** — 4 cards (`repeat(4,1fr); gap: 14px`). Each: `--surface`, 1px border, rounded 14px, `padding: 18px 20px; box-shadow: var(--shadow)`. Contents: 13px `--muted` label; 28px mono value; a MoM delta line (mono 13px) colored `--pos` (▲) or `--neg` (▼). The four KPIs: **Revenue**, **Net income**, **Cash on hand** (all show % MoM), **Current ratio** (shows absolute change, 2 decimals).
  2. **Trend chart card** — title "Revenue, expenses & net income" + an inline legend (Revenue swatch `--chart-rev`, Expenses swatch `--chart-exp`, Net income line `--chart-net`). The chart is grouped bars (revenue + total expense) per month with a net-income **line + dots** overlaid, 4 horizontal gridlines labeled in `$k`, x-axis month + year labels.
  3. **Two-up row** (`1fr 1fr; gap: 18px`):
     - **Balance sheet check** — subtitle "{month} — assets equal liabilities plus equity". Two stacked bars of equal height: left = assets (cash / receivables / inventory / equipment), right = liabilities + equity (loans / payables / cards / equity). Legend with 8 colored swatches below.
     - **Where the money went** — subtitle "{month} expense breakdown". A **donut** (SVG, radius 70, stroke 26) of the latest month's expense categories with a center "Total exp." label, beside a legend list with each category's **% of total**.
  4. **Month-over-month highlights** — `repeat(3,1fr); gap: 14px` of small cards, each with a left border colored `--pos`/`--neg` by whether the movement is "good" (revenue/net/cash up = good; expenses/payroll/COGS down = good). Shows current value (mono 19px), ▲/▼ % change, and "from {previous value}". Six metrics: Revenue, Net income, Total expenses, Cash, Payroll, COGS.
  5. **AI assistant panel** — navy rounded-20px, `padding: 26px`. Header: 38px `--accent` chip with "✦", Georgia 21px "Ask Annco AI", subtitle. A row of 4 suggestion **chips** (pill buttons): "How are we trending this year?", "Why did net income drop in January?", "What were our biggest expenses last month?", "Is our cash position healthy?". Then the **chat transcript** (max-height 320px, scroll): user bubbles right-aligned `--accent`/white, assistant bubbles left-aligned `rgba(255,255,255,.07)`; a 3-dot blinking loader while awaiting a reply. Input row: text field (`Enter` to send) + "Ask" button.
  6. **Monthly client note panel** — `--surface` rounded-20px. Header: Georgia 21px "Monthly client note" + subtitle, with a `--accent` "Draft monthly note" / "Re-draft note" / "Drafting…" button and (once a note exists) a "⎙ Print / PDF" outline button. Body: the drafted note in a `--bg` rounded-14px card, `white-space: pre-wrap`, 15px/1.7. Empty state is a dashed placeholder.

---

## Interactions & Behavior

### Routing
- `go(route)` sets `route` state and `window.scrollTo(0,0)`. No URL changes in the prototype — **in production, use the router** (e.g. Next.js routes: `/`, `/services`, `/resources`, `/about`, `/contact`, `/dashboard`).

### Theme (dark / light)
- Toggling flips a `dark` boolean, applies a full set of CSS custom properties to the root, and persists to `localStorage['annco-dark']` (`'1'`/`'0'`). Root has `transition: background .3s, color .3s`. In production, prefer a `data-theme` attribute + CSS variables in a stylesheet (cleaner than the prototype's JS `setProperty` approach, which was a constraint of the prototype runtime).

### Live deadline countdown
- `setInterval` at 1000ms recomputes days/hours/minutes/seconds to the next deadline and writes them into the cells. Clear the interval on unmount.

### File upload & parsing (dashboard)
- Accepts `.csv` and `.xlsx`/`.xls`. CSV is parsed manually (quote-aware comma split); XLSX uses **SheetJS (`xlsx`)** — first sheet → JSON rows.
- **Column mapping** normalizes header names (lowercase, strip non-letters) and matches aliases:
  - `month` ← month/date/period/mon
  - `revenue` ← revenue/sales/income/totalrevenue/grossrevenue/totalsales
  - `cogs` ← cogs/costofgoods/costofgoodssold/cost
  - `payroll` ← payroll/wages/salaries/salary/labor
  - `rent` ← rent/lease · `marketing` ← marketing/advertising/ads/promotion · `utilities` ← utilities/utility · `supplies` ← supplies/materials · `other` ← other/otherexpense/misc/miscellaneous
  - `cash` ← cash/bank/checking · `ar` ← ar/accountsreceivable/receivables/receivable · `inventory` ← inventory/stock · `equipment` ← equipment/fixedassets/ppe/property/assetsfixed
  - `ap` ← ap/accountspayable/payables/payable · `loans` ← loans/loan/notespayable/debt/longtermdebt · `cc` ← cc/creditcard/creditcards/card
- Numbers are parsed by stripping `$`, commas, whitespace. A row is kept only if it has a `month` and `revenue > 0`.
- **Failure handling**: if a file can't be read or yields fewer than 2 valid monthly rows, **fall back to the sample client** and show a friendly banner explaining why. Always recover gracefully — the demo must never break.

### Derived financial metrics (per row)
- `totalExpense = cogs + payroll + rent + marketing + utilities + supplies + other`
- `netIncome = revenue - totalExpense`
- `totalAssets = cash + ar + inventory + equipment`
- `totalLiabilities = ap + loans + cc`
- `equity = totalAssets - totalLiabilities`
- `currentRatio = (cash + ar + inventory) / (ap + cc)` (current assets ÷ current liabilities; loans treated as long-term)
- KPI/highlight deltas compare the **latest** row to the **previous** row.

### AI (replace the sandbox calls)
The prototype calls `window.claude.complete(prompt)` (a sandbox helper, Haiku, ~1024-token cap). **In production, route these through a server endpoint** to your LLM provider — never expose an API key client-side.
- **Q&A** (`askAI(question)`): builds a compact text summary of every month (revenue, expenses, net, cash, assets, liabilities, equity) plus the latest month's expense breakdown, prepends a system instruction ("You are Annco AI, a sharp, plain-spoken CPA assistant… answer using ONLY the figures below, be concise (2–4 sentences), cite specific dollar figures/percentages, no jargon, don't invent data"), then the question. Append the user message immediately, show the loading indicator, append the assistant reply on return. Handle errors with a graceful in-chat message.
- **Monthly note** (`draftNote()`): prompt instructs a CPA to write a 140–200 word client note — opens "Dear {client} team,", covers revenue & net income vs prior month + what drove the change + cash/balance-sheet position + 1–2 things to watch, closes "Warm regards, The Annco Team"; plain prose, no markdown. Render with `white-space: pre-wrap`.
- Both prompts must pass **only the loaded data** so answers stay grounded.

### Print / PDF (monthly note)
- "⎙ Print / PDF" enters a `printing` state that renders **only** the note as a clean letterhead document (max-width 760px, white bg, navy 2px header rule with the firm name + date, the note body, and a mono footer line), then calls `window.print()`, then exits the print state. In production, prefer a dedicated print route or a print stylesheet (`@media print`).

### Contact form
- Client-side validation: name required; email must match a basic `x@y.z` pattern. Invalid → show the inline error. Valid → show the confirmation card. **No network call** — demo only.

### Animations
- Section enters use `@keyframes fadeUp` (12px rise + fade, ~.4–.7s ease) / `fadeIn`. Chat loader uses `@keyframes blink` (staggered dot opacity). Theme uses a .3s color/background transition.

---

## State Management
Single component state in the prototype; in production split across route components + a dashboard store/context:
- `route` — current view.
- `dark` — theme (persisted to localStorage).
- `data` — array of monthly rows (or null when nothing loaded), each: `{ month, revenue, cogs, payroll, rent, marketing, utilities, supplies, other, cash, ar, inventory, equipment, ap, loans, cc }`.
- `clientName`, `periodLabel`, `uploadMsg` — dashboard meta + status banner.
- `chat` (array of `{role, content}`), `chatLoading` — AI conversation.
- `note`, `noteLoading`, `printing` — monthly note.
- `contactDone`, `contactName`, `contactEmail`, `contactError` — contact form.
- A 1s interval timestamp drives the countdown (prototype writes to DOM refs; a state value works fine in production).

## Sample data — "Acme Bakery LLC" (trailing 12 months, Jun 2025 → May 2026)
Seasonal small-business numbers (holiday peak in Nov/Dec, slow January, spring/Mother's-Day lift). Fields per the data model above. Approximate revenue by month: Jun 78k · Jul 72k · Aug 70k · Sep 81k · Oct 92k · Nov 118k · Dec 142k · Jan 64k · Feb 98k · Mar 86k · Apr 91k · May 103k. The exact full table (all 16 columns × 12 months) is in `buildSample()` inside `Annco Demo.dc.html` — copy those numbers verbatim for an identical demo. Latest month (May 2026) expense split: COGS 30,900 · Payroll 33,000 · Rent 6,500 · Marketing 3,200 · Supplies 3,200 · Utilities 2,000 · Other 2,600.

---

## Design Tokens

### Colors — Light (default)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#f6f1e7` | Page background (warm off-white) |
| `--surface` | `#fffdf8` | Cards |
| `--surface-2` | `#efe7d7` | Subtle fills, secondary buttons |
| `--ink` | `#16243f` | Primary text / deep navy |
| `--ink-soft` | `#4a5468` | Body text |
| `--muted` | `#8d8775` | Captions, labels |
| `--border` | `#e7ddcb` | Borders, dividers |
| `--navy` | `#16243f` | Navy panels, primary buttons |
| `--accent` | `#b8842f` | Warm gold accent / primary CTA |
| `--accent-soft` | `rgba(184,132,47,0.12)` | Accent tint backgrounds |
| `--pos` | `#2f7d54` | Positive deltas |
| `--neg` | `#b1402f` | Negative deltas / errors |
| `--chart-rev` | `#16243f` | Revenue bars |
| `--chart-exp` | `#cdbb92` | Expense bars |
| `--chart-net` | `#b8842f` | Net-income line |
| `--shadow` | `0 1px 2px rgba(22,36,63,.06), 0 8px 24px rgba(22,36,63,.06)` | Card shadow |

### Colors — Dark
| Token | Value |
|---|---|
| `--bg` | `#0d1524` |
| `--surface` | `#15213a` |
| `--surface-2` | `#1b2840` |
| `--ink` | `#f2ece0` |
| `--ink-soft` | `#b7bfce` |
| `--muted` | `#838da0` |
| `--border` | `#27334c` |
| `--accent` | `#d2a14f` |
| `--accent-soft` | `rgba(210,161,79,0.16)` |
| `--pos` | `#5bbd86` |
| `--neg` | `#e0795f` |
| `--chart-rev` | `#9db4e0` |
| `--chart-exp` | `#cdbb92` |
| `--chart-net` | `#d2a14f` |
| `--shadow` | `0 1px 2px rgba(0,0,0,.3), 0 10px 30px rgba(0,0,0,.35)` |

### Chart category palette (fixed in both themes)
Cash/COGS `var(--chart-rev)` · Receivables/Payroll `#2f5e8f` · Inventory/Marketing `#c9a85f` · Equipment/Utilities `#7d8a6a` · Loans `#a8643c` · Payables/Rent `var(--accent)` · Cards `#c98f5f`/`#c9a85f` · Equity `--pos` · Other `#9aa0ac`.

### Typography
- **Headings**: **Georgia, serif** (700). Hero H1 54px; page H1 44px; section headings 30px; card titles 18–21px. `letter-spacing` ~ -.01 to -.02em on large sizes; `text-wrap: balance` on the hero.
- **Body / UI**: system sans — `"Helvetica Neue", Helvetica, Arial, sans-serif`. Body 16px/1.55; intro paragraphs 18–19px.
- **Numbers / mono**: **IBM Plex Mono** (Google Fonts, weights 400/500/600) — all financial figures, KPI values, countdown digits, eyebrows/labels, footer.
- Eyebrow style: mono, ~13px, `letter-spacing: .08em; text-transform: uppercase; color: var(--accent); font-weight: 600`.

### Spacing & radii
- Page gutters: `padding: 0 28px`; content max-widths 760 / 1000 / 1100 / 1200px.
- Radii: inputs/buttons 9–11px; cards 12–16px; large panels 20px; pills 100px; small swatches 2px.
- Card padding 18–26px; large panels 26–40px. Common grid gap 14–18px.
- Shadows via `--shadow`; CTA buttons add `0 8px 20px rgba(184,132,47,.25–.28)`.

### Responsive
- Layouts use fixed multi-column grids in the prototype (it targets desktop). The original brief asks for **mobile-responsive** — collapse the hero, services, two-up dashboard, and KPI/highlight grids to a single column under ~860px, allow the nav to wrap or move to a menu, and let charts scale to container width (already authored with responsive `viewBox`).

## Assets
- **No image assets.** The logo is a CSS square + serif "A" glyph; all icons are Unicode glyphs (☎ ✦ ⬆ ⬗ ⎙ ★ ☾ ☀ ▲ ▼ ✓). Replace with your icon set (e.g. Lucide/Heroicons) if desired. Charts are pure SVG — replace with your chart library. Image/logo placeholders are intentional; swap in the firm's real brand assets when available.
- **External dependency**: SheetJS (`xlsx@0.18.5`) for XLSX parsing — install from npm in the real build.
- **Fonts**: Google Fonts — IBM Plex Mono. Georgia and the system sans need no loading.

## Files
- `Annco Demo.dc.html` — the complete design reference (template + logic). Open the `renderVals()` method and the chart/`buildSample()` helpers for exact values, copy, and the full sample dataset. Treat it as the source of truth for anything not spelled out above.
