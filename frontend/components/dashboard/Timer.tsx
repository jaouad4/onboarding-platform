"use client";

import { useEffect, useState } from "react";
import { computeTimerEnd, formatTimeRemaining } from "@/lib/certification";

interface TimerProps {
  firstLoginAt: string;
  onElapsed: () => void;
}

export function Timer({ firstLoginAt, onElapsed }: TimerProps) {
  const targetDate = computeTimerEnd(firstLoginAt);
  const [remaining, setRemaining] = useState(formatTimeRemaining(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = formatTimeRemaining(targetDate);
      setRemaining(updated);
      if (updated.total === 0) {
        clearInterval(interval);
        onElapsed();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [targetDate, onElapsed]);

  if (remaining.total === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-muted/40 p-6">
      <p className="mb-1 text-sm font-medium text-muted-foreground">
        Temps restant avant de pouvoir soumettre votre certificat
      </p>
      <div className="mt-3 flex gap-6 text-center">
        <div className="flex flex-col">
          <span className="text-3xl font-bold tabular-nums">
            {String(remaining.days).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">jours</span>
        </div>
        <div className="flex items-center text-2xl font-bold text-muted-foreground">
          :
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tabular-nums">
            {String(remaining.hours).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">heures</span>
        </div>
        <div className="flex items-center text-2xl font-bold text-muted-foreground">
          :
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold tabular-nums">
            {String(remaining.minutes).padStart(2, "0")}
          </span>
          <span className="text-xs text-muted-foreground">minutes</span>
        </div>
      </div>
    </div>
  );
}
