// IRS estimated-tax / filing deadline countdown logic.
// Candidates: Apr 15, Jun 15, Sep 15, Oct 15, Jan 15 — current & next year.
// Pick the earliest candidate strictly after `now`.

const DEADLINE_MD: [number, number][] = [
  [3, 15], // Apr 15
  [5, 15], // Jun 15
  [8, 15], // Sep 15
  [9, 15], // Oct 15
  [0, 15], // Jan 15
];

const DEADLINE_NAMES: Record<string, string> = {
  "3-15": "April 15 — Q1 estimates & individual returns",
  "5-15": "June 15 — Q2 estimated taxes",
  "8-15": "September 15 — Q3 estimates & S-corp/partnership ext.",
  "9-15": "October 15 — extended individual returns",
  "0-15": "January 15 — Q4 estimated taxes",
};

export function nextDeadline(now: Date = new Date()): Date {
  const cands: Date[] = [];
  [now.getFullYear(), now.getFullYear() + 1].forEach((y) =>
    DEADLINE_MD.forEach(([m, d]) => cands.push(new Date(y, m, d, 0, 0, 0))),
  );
  cands.sort((a, b) => a.getTime() - b.getTime());
  return cands.find((d) => d > now) ?? cands[cands.length - 1];
}

export function deadlineLabel(d: Date): string {
  const key = `${d.getMonth()}-${d.getDate()}`;
  return DEADLINE_NAMES[key] ?? "Upcoming filing deadline";
}

export function longDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export interface Remaining {
  D: string;
  H: string;
  M: string;
  S: string;
}

export function remaining(target: Date, now: Date = new Date()): Remaining {
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const min = Math.floor((diff % 3600000) / 60000);
  const sec = Math.floor((diff % 60000) / 1000);
  return {
    D: String(days),
    H: String(hrs).padStart(2, "0"),
    M: String(min).padStart(2, "0"),
    S: String(sec).padStart(2, "0"),
  };
}
