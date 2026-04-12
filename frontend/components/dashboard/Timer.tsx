"use client";

import { useEffect, useRef, useState } from "react";
import { computeTimerEnd, formatTimeRemaining } from "@/lib/certification";

interface TimerProps {
  firstLoginAt: string;
  onElapsed: () => void;
}

export function Timer({ firstLoginAt, onElapsed }: TimerProps) {
  const targetDate = computeTimerEnd(firstLoginAt);
  const initialRemaining = formatTimeRemaining(targetDate);
  const [remaining, setRemaining] = useState(initialRemaining);
  const onElapsedRef = useRef(onElapsed);
  const calledRef = useRef(false);

  useEffect(() => {
    onElapsedRef.current = onElapsed;
  });

  useEffect(() => {
    if (calledRef.current) return;

    const targetTime = computeTimerEnd(firstLoginAt).getTime();

    const tick = () => {
      const now = Date.now();
      const total = Math.max(0, targetTime - now);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
      setRemaining({ days, hours, minutes, total });

      if (total === 0 && !calledRef.current) {
        calledRef.current = true;
        clearInterval(interval);
        onElapsedRef.current();
      }
    };

    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstLoginAt]);

  if (remaining.total === 0) return null;

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
