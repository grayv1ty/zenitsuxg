"use client";

import { useEffect, useRef } from "react";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";

interface Prize {
  diamonds: number;
  winners: string[];
}

interface WinnerListProps {
  prizes: Prize[];
}

export const WinnerList = ({ prizes }: WinnerListProps) => {
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    // Fire confetti when the winner list is displayed
    const timer = setTimeout(() => {
      confettiRef.current?.fire({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#facc15", "#fbbf24", "#f59e0b", "#d97706", "#b45309"],
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-4 relative">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Азтанууд</h2>
      <Confetti
        ref={confettiRef}
        className="pointer-events-none absolute inset-0 z-50 w-full"
        manualstart
      />
      {prizes.map((prize, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border-yellow-400/20 dark:border-amber-500/20"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">Шагнал #{index + 1}</span>
            <span className="text-lg font-bold text-yellow-500">
              💎 {prize.diamonds} Diamonds
            </span>
          </div>
          <div className="space-y-2">
            {prize.winners.length > 0 ? (
              prize.winners.map((winner, winnerIndex) => (
                <div key={winnerIndex} className="flex items-center gap-2">
                  <span className="font-medium">{winner}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Ялагч тодорхойгүй</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
