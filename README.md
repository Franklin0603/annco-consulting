# Annco Consulting, LLC — Marketing Site + Client Financial Dashboard + AI Assistant

A polished demo web app for **Annco Consulting, LLC**, a CPA / tax-accounting firm in the Bronx, NY. Built with **Next.js (App Router) + React + TypeScript**.

Three capabilities in one app:

1. **Marketing website** — Home / Services / Resources / About / Contact, with a live IRS-deadline countdown.
2. **Client financial dashboard** (`/dashboard`) — upload a monthly balance sheet (CSV/XLSX) or load a sample client, and instantly see KPIs and charts.
3. **AI assistant on the numbers** — ask plain-English questions about the loaded financials and auto-draft the monthly client note (with print/PDF export).

> Demo on synthetic data — no real auth, persistence, or financial advice.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start   # production build
```

## Deploy to Vercel

This is a standard Next.js app — push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). No build configuration needed. If you wire up a real LLM (below), add `ANTHROPIC_API_KEY` as a Vercel Environment Variable.

## AI assistant — currently stubbed

The AI chat and monthly-note features call a server route at [`app/api/ai/route.ts`](app/api/ai/route.ts). It currently returns **deterministic, data-grounded text** so the demo works without an API key.

To go live, replace the stub branches with a server-side call to your LLM provider (e.g. the Anthropic SDK). The grounding context is already assembled via `dataSummary()` in [`lib/finance.ts`](lib/finance.ts), and the original prompts are documented in [`design/DESIGN_SPEC.md`](design/DESIGN_SPEC.md). Never expose the key client-side — keep the call in the API route.

## Project structure

```
app/                 Next.js routes
  page.tsx           Home
  services/          Services
  resources/         Resources (live deadline countdown)
  about/             About
  contact/           Contact (client-side validated form)
  dashboard/         Client dashboard (upload, KPIs, charts, AI, note)
  api/ai/route.ts    Stubbed AI endpoint (chat + monthly note)
components/           Header, Footer, Countdown panels, ServiceCard,
  charts/            Trend / Balance / Donut SVG charts
  dashboard/         KPI row, Highlights, AI assistant, Monthly note
lib/                 types, sample data, finance formulas, CSV/XLSX parsing, deadline logic
design/              Original design handoff (spec + .dc.html prototype) — reference only
```

## Notes

- **Theming** — light/dark via a `data-theme` attribute on `<html>` + CSS variables in [`app/globals.css`](app/globals.css); the choice persists to `localStorage['annco-dark']` and is applied pre-paint to avoid a flash.
- **Charts** — responsive SVG components ported from the design prototype (revenue/expense grouped bars + net-income line; stacked balance bars; expense donut).
- **File upload** — CSV is parsed manually; XLSX via [SheetJS](https://sheetjs.com). Column headers are normalized and alias-matched; the dashboard always falls back to the sample client on any failure.
