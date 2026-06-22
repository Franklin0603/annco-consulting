// Synthetic back-office data for the demo admin view. No real records.

export type ClientStatus = "Current" | "Needs review" | "Onboarding";

export interface AdminClient {
  name: string;
  industry: string;
  mrr: number; // latest monthly revenue
  net: number; // latest net income
  status: ClientStatus;
  lastNote: string; // month label
  owner: string;
}

export const CLIENTS: AdminClient[] = [
  { name: "Acme Bakery LLC", industry: "Food & beverage", mrr: 103000, net: 21600, status: "Current", lastNote: "May 2026", owner: "R. Nunez" },
  { name: "Concourse Dental PC", industry: "Healthcare", mrr: 86500, net: 24800, status: "Current", lastNote: "May 2026", owner: "R. Nunez" },
  { name: "Bronx Bridge Nonprofit", industry: "Nonprofit", mrr: 41200, net: 3100, status: "Needs review", lastNote: "Apr 2026", owner: "T. Okafor" },
  { name: "Grand Ave Auto Group", industry: "Automotive", mrr: 158000, net: 19400, status: "Current", lastNote: "May 2026", owner: "T. Okafor" },
  { name: "Riverdale Realty Partners", industry: "Real estate", mrr: 64500, net: 28900, status: "Current", lastNote: "May 2026", owner: "R. Nunez" },
  { name: "Kingsbridge Coffee Co.", industry: "Food & beverage", mrr: 38900, net: 4200, status: "Onboarding", lastNote: "—", owner: "T. Okafor" },
  { name: "Hub Print & Sign", industry: "Manufacturing", mrr: 52300, net: 9800, status: "Needs review", lastNote: "Mar 2026", owner: "R. Nunez" },
  { name: "Fordham Fitness Studio", industry: "Fitness", mrr: 29700, net: 6100, status: "Current", lastNote: "May 2026", owner: "T. Okafor" },
];

export type LeadStatus = "New" | "Contacted" | "Scheduled";

export interface AdminLead {
  name: string;
  business: string;
  email: string;
  message: string;
  received: string;
  status: LeadStatus;
}

export const LEADS: AdminLead[] = [
  { name: "Marcus Webb", business: "Webb & Sons Plumbing", email: "marcus@webbsons.com", message: "Need help catching up on two years of bookkeeping before filing.", received: "Jun 21, 2026", status: "New" },
  { name: "Priya Shah", business: "Lumen Yoga", email: "priya@lumenyoga.com", message: "Switching from QuickBooks self-serve — want monthly support.", received: "Jun 20, 2026", status: "New" },
  { name: "Daniel Ortiz", business: "Ortiz Catering", email: "dan@ortizcatering.com", message: "Payroll and NY sales-tax filings are getting away from us.", received: "Jun 18, 2026", status: "Contacted" },
  { name: "Aisha Bello", business: "Bright Start Childcare", email: "aisha@brightstart.org", message: "Nonprofit — need Form 990 help and board-ready statements.", received: "Jun 16, 2026", status: "Scheduled" },
  { name: "Tom Reilly", business: "Reilly HVAC", email: "tom@reillyhvac.com", message: "Looking for tax planning ahead of a strong year.", received: "Jun 14, 2026", status: "Contacted" },
];

export function firmStats() {
  const active = CLIENTS.filter((c) => c.status !== "Onboarding").length;
  const book = CLIENTS.reduce((s, c) => s + c.mrr, 0);
  const openLeads = LEADS.filter((l) => l.status !== "Scheduled").length;
  return {
    activeClients: active,
    onboarding: CLIENTS.length - active,
    monthlyBook: book,
    openLeads,
    returnsYTD: 142,
  };
}
