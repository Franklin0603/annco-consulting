import { NextResponse } from "next/server";
import type { MonthRow } from "@/lib/types";
import { totExp, net, usd, pct, currentRatio, dataSummary } from "@/lib/finance";

/**
 * Stubbed AI endpoint.
 *
 * This returns deterministic, data-grounded text so the demo works without an
 * LLM key. To go live, replace the stub branches below with a server-side call
 * to your provider (e.g. the Anthropic SDK) using the same `prompt` strings —
 * the data summary is already assembled for you via `dataSummary()`.
 *
 *   const { default: Anthropic } = await import("@anthropic-ai/sdk");
 *   const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *   const msg = await client.messages.create({
 *     model: "claude-haiku-4-5-20251001",
 *     max_tokens: 1024,
 *     messages: [{ role: "user", content: prompt }],
 *   });
 *   return NextResponse.json({ text: msg.content[0].text });
 */

interface AiRequest {
  type: "chat" | "note";
  question?: string;
  data: MonthRow[];
  clientName: string;
}

function chatAnswer(data: MonthRow[], question: string): string {
  const cur = data[data.length - 1];
  const prev = data[data.length - 2] ?? cur;
  const q = question.toLowerCase();

  if (q.includes("cash")) {
    return `Cash on hand is ${usd(cur.cash)} as of ${cur.month}, up from ${usd(prev.cash)} the month before (${pct(cur.cash, prev.cash)}). With a current ratio of ${currentRatio(cur).toFixed(2)}, the position looks healthy and comfortably covers near-term obligations.`;
  }
  if (q.includes("expense") || q.includes("biggest") || q.includes("spent")) {
    return `In ${cur.month}, total expenses were ${usd(totExp(cur))}. The largest line was payroll at ${usd(cur.payroll)}, followed by COGS at ${usd(cur.cogs)} and rent at ${usd(cur.rent)}. Together payroll and COGS account for most of the month's spending.`;
  }
  if (q.includes("net income") || q.includes("drop") || q.includes("profit")) {
    return `Net income for ${cur.month} was ${usd(net(cur))}, versus ${usd(net(prev))} in ${prev.month} (${pct(net(cur), net(prev))}). The move was driven mainly by the change in revenue (${usd(cur.revenue)} vs ${usd(prev.revenue)}) against a relatively stable expense base.`;
  }
  if (q.includes("trend") || q.includes("year") || q.includes("trending")) {
    const first = data[0];
    return `Revenue has moved from ${usd(first.revenue)} in ${first.month} to ${usd(cur.revenue)} in ${cur.month}, with the seasonal holiday peak in Nov–Dec and the usual January slowdown. Net income in the latest month is ${usd(net(cur))} on ${usd(cur.revenue)} of revenue.`;
  }
  return `For ${cur.month}: revenue ${usd(cur.revenue)} (${pct(cur.revenue, prev.revenue)} vs prior month), net income ${usd(net(cur))}, and cash ${usd(cur.cash)}. Ask about trends, expenses, cash, or net income for a closer look. (Demo response — wire up a live model to answer freely.)`;
}

function draftNote(data: MonthRow[], clientName: string): string {
  const cur = data[data.length - 1];
  const prev = data[data.length - 2] ?? cur;
  const revLine =
    cur.revenue >= prev.revenue
      ? `revenue rose to ${usd(cur.revenue)} from ${usd(prev.revenue)}`
      : `revenue eased to ${usd(cur.revenue)} from ${usd(prev.revenue)}`;
  const netLine =
    net(cur) >= net(prev)
      ? `net income improved to ${usd(net(cur))}`
      : `net income came in at ${usd(net(cur))}, down from ${usd(net(prev))}`;

  return `Dear ${clientName} team,

Here is your summary for ${cur.month}. This month ${revLine} (${pct(cur.revenue, prev.revenue)}), and ${netLine}. The change was driven largely by top-line movement against a steady expense base, with payroll (${usd(cur.payroll)}) and cost of goods (${usd(cur.cogs)}) remaining the two biggest outflows.

On the balance sheet, cash stands at ${usd(cur.cash)} and your current ratio is ${currentRatio(cur).toFixed(2)}, which gives you a comfortable cushion against short-term obligations. Receivables and inventory remain in a normal range for the season.

Looking ahead, two things worth watching: keep an eye on margin as COGS tracks revenue, and continue building cash through the slower months so you stay ahead of quarterly estimates. We are happy to walk through any of these figures with you.

Warm regards,
The Annco Team`;
}

export async function POST(req: Request) {
  let body: AiRequest;
  try {
    body = (await req.json()) as AiRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { type, question, data, clientName } = body;
  if (!data || !data.length) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }

  // Assemble the same grounding context a live model would receive.
  void dataSummary(data, clientName);

  // Small delay so the loading UI is visible (demo nicety).
  await new Promise((r) => setTimeout(r, 500));

  if (type === "note") {
    return NextResponse.json({ text: draftNote(data, clientName) });
  }
  return NextResponse.json({ text: chatAnswer(data, question ?? "") });
}
