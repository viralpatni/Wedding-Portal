import { useState, useEffect } from "react";
import { weddingConfig } from "@/config/weddingConfig";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

/**
 * Custom hook to calculate the live countdown to the wedding date
 * Target date: 26 January 2027 (Asia/Kolkata timezone: UTC+05:30)
 */
export function useCountdown(targetDateStr = weddingConfig.weddingDate): CountdownTime {
  const getTargetTimestamp = (): number => {
    // 2027-01-26 00:00:00 in Asia/Kolkata (IST = UTC+05:30)
    // 2027-01-25T18:30:00.000Z
    if (targetDateStr.includes("T")) {
      return new Date(targetDateStr).getTime();
    }
    return new Date(`${targetDateStr}T00:00:00+05:30`).getTime();
  };

  const calculateRemaining = (): CountdownTime => {
    const target = getTargetTimestamp();
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isComplete: false };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateRemaining);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  return timeLeft;
}

