export function computeTimerEnd(firstLoginAt: string): Date {
  const loginDate = new Date(firstLoginAt);
  const end = new Date(loginDate);
  end.setDate(end.getDate() + 5);
  return end;
}

export function isTimerElapsed(firstLoginAt: string): boolean {
  return new Date() >= computeTimerEnd(firstLoginAt);
}

export function formatTimeRemaining(targetDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  total: number;
} {
  const now = new Date();
  const total = Math.max(0, targetDate.getTime() - now.getTime());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, minutes, seconds: Math.floor((total % (1000 * 60)) / 1000), total };
}
