"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";

interface Fan {
  fullname: string;
}

interface RandomSelectorProps {
  topFans: Fan[];
}

export const RandomSelector = ({ topFans }: RandomSelectorProps) => {
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedFans, setSelectedFans] = useState<Fan[]>([]);
  const [availableFans, setAvailableFans] = useState<Fan[]>(topFans);
  const confettiRef = useRef<ConfettiRef>(null);

  const pickRandom = () => {
    if (availableFans.length === 0) {
      return;
    }

    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableFans.length);
      setSelectedFan(availableFans[randomIndex]);
      count++;

      if (count > 20) {
        clearInterval(interval);
        setIsSpinning(false);
        
        // Add to selected list and remove from available
        const finalIndex = Math.floor(Math.random() * availableFans.length);
        const finalSelection = availableFans[finalIndex];
        setSelectedFan(finalSelection);
        setSelectedFans(prev => [...prev, finalSelection]);
        setAvailableFans(prev => prev.filter((_, index) => index !== finalIndex));
        
        // Fire confetti effect
        setTimeout(() => {
          confettiRef.current?.fire({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ["#facc15", "#fbbf24", "#f59e0b", "#d97706", "#b45309"],
          });
        }, 100);
      }
    }, 100);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 relative">
      <Confetti
        ref={confettiRef}
        className="pointer-events-none absolute inset-0 z-50 w-full"
        manualstart
      />
      <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20">
        {selectedFan ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">{selectedFan.fullname}</h3>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Товч дарж random сонгох</p>
          </div>
        )}
      </div>
      
      <Button
        onClick={pickRandom}
        disabled={isSpinning || availableFans.length === 0}
        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold"
        size="lg"
      >
        {isSpinning ? "🎲 Сонгож байна..." : availableFans.length === 0 ? "🎲 Бүх фэн сонгогдсон" : "🎲 Random сонгох"}
      </Button>
      
      <p className="text-xs text-center text-gray-500">
        Үлдсэн: {availableFans.length} / {topFans.length}
      </p>

      {selectedFans.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Сонгогдсон фэнүүд:
          </h4>
          <div className="space-y-2">
            {selectedFans.map((fan, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-gradient-to-r from-green-400/10 to-emerald-500/10 border border-green-400/20 dark:border-emerald-500/20"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{fan.fullname}</span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
