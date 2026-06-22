export interface Service {
  t: string;
  d: string;
}

export const SERVICES: Service[] = [
  {
    t: "Tax preparation",
    d: "Federal, state & local returns for businesses and owners — accurate, on time, and optimized.",
  },
  {
    t: "Bookkeeping",
    d: "Clean monthly books you can actually read, reconciled and ready for decisions.",
  },
  {
    t: "Payroll & sales tax",
    d: "Run payroll and stay current on NY sales-tax filings without the headache.",
  },
  {
    t: "Nonprofit accounting",
    d: "Fund accounting, Form 990, and board-ready statements for mission-driven orgs.",
  },
];

export interface ResourceLink {
  t: string;
  d: string;
  u: string;
}

export const RESOURCE_LINKS: ResourceLink[] = [
  {
    t: "Where's My Refund?",
    d: "Check your federal refund status on IRS.gov.",
    u: "https://www.irs.gov/refunds",
  },
  {
    t: "IRS forms & instructions",
    d: "Find and download every federal form.",
    u: "https://www.irs.gov/forms-instructions",
  },
  {
    t: "New York State tax forms",
    d: "State income, sales & business forms.",
    u: "https://www.tax.ny.gov/forms/",
  },
];

export const AI_SUGGESTIONS = [
  "How are we trending this year?",
  "Why did net income drop in January?",
  "What were our biggest expenses last month?",
  "Is our cash position healthy?",
];
