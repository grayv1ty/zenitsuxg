"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Fan {
  fullname: string;
}

interface RandomSelectorProps {
  topFans: Fan[];
}

export const RandomSelector = ({ topFans }: RandomSelectorProps) => {
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * topFans.length);
      setSelectedFan(topFans[randomIndex]);
      count++;

      if (count > 20) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="p-6 rounded-xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20 mb-4">
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
        disabled={isSpinning}
        className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-bold"
        size="lg"
      >
        {isSpinning ? "🎲 Сонгож байна..." : "🎲 Random сонгох"}
      </Button>
      <p className="text-xs text-center mt-2 text-gray-500">
        Нийт {topFans.length} топ фэн
      </p>
    </div>
  );
};
