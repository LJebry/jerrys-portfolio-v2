"use client";

import { useEffect, useState } from "react";

const graduationTime = new Date("2026-05-28T09:00:00-04:00").getTime();

function getTimeLeft() {
  const difference = graduationTime - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isComplete: false,
  };
}

export function GraduationCountdown() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<
    typeof getTimeLeft
  > | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTimeLeft(getTimeLeft());
    }, 0);
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  const values = timeLeft
    ? [
        ["Days", timeLeft.days],
        ["Hours", timeLeft.hours],
        ["Min", timeLeft.minutes],
        ["Sec", timeLeft.seconds],
      ]
    : [
        ["Days", "--"],
        ["Hour", "--"],
        ["Min", "--"],
        ["Sec", "--"],
      ];

  if (timeLeft?.isComplete) {
    return <span className="text-accent">Graduated</span>;
  }

  return (
    <span className="block">
      <span className="grid grid-cols-4 gap-2">
      {values.map(([label, value]) => (
        <span
          key={label}
          className="flex min-w-0 flex-col items-center justify-center border border-secondary/25 px-2 py-2 text-center"
        >
          <span className="block font-display text-lg leading-none text-foreground">
            {value}
          </span>
          <span className="mt-1 block w-full text-center font-display text-[10px] uppercase tracking-[0.14em] text-secondary">
            {label}
          </span>
        </span>
      ))}
      </span>
    </span>
  );
}
