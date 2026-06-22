export interface MonthRow {
  month: string;
  revenue: number;
  cogs: number;
  payroll: number;
  rent: number;
  marketing: number;
  utilities: number;
  supplies: number;
  other: number;
  cash: number;
  ar: number;
  inventory: number;
  equipment: number;
  ap: number;
  loans: number;
  cc: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface DashboardData {
  data: MonthRow[];
  clientName: string;
  periodLabel: string;
  uploadMsg?: string;
}
