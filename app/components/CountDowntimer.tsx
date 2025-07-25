"use client";
import { useEffect, useState } from "react";
import { formatRemainingTime } from "../utils/dateUtils";

interface CountdownTimerProps {
  deadline: Date;
  onComplete?: () => void;
  className?: string;
}

export default function CountdownTimer({
  deadline,
  onComplete,
  className,
}: CountdownTimerProps) {
  const [remainingTime, setRemainingTime] = useState(
    formatRemainingTime(deadline)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setRemainingTime("Due now");
        onComplete?.();
        clearInterval(interval);
        return;
      }

      setRemainingTime(formatRemainingTime(deadline));
    }, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, [deadline, onComplete]);

  const isUrgent =
    remainingTime.includes("m") || remainingTime.includes("Due now");

  return (
    <span
      className={`text-sm ${
        isUrgent ? "text-red-600 font-semibold" : "text-gray-500"
      } ${className}`}
    >
      {remainingTime}
    </span>
  );
}
