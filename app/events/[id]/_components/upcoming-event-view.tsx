"use client";

import { Countdown } from "./countdown";
import { RandomSelector } from "./random-selector";
import { TopFansList } from "./top-fans-list";

interface Fan {
  fullname: string;
}

interface Prize {
  diamonds: number;
  winners: string[];
}

interface UpcomingEventViewProps {
  startTime: string;
  prizes: Prize[];
  topFans: Fan[];
  lastUpdated: string;
}

export const UpcomingEventView = ({
  startTime,
  prizes,
  topFans,
  lastUpdated,
}: UpcomingEventViewProps) => {
  return (
    <>
      <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20">
        <h2 className="text-2xl font-bold text-center mb-6">⏰ Эхлэх хүртэл</h2>
        <Countdown targetDate={startTime} />
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20">
        <h2 className="text-2xl font-bold text-center mb-6">🎲 Random Сонголт</h2>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Топ фэнүүдээс random хүн сонгох
        </p>
        <RandomSelector topFans={topFans} />
      </div>

      <div className="p-8 rounded-2xl bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-700/30">
        <h2 className="text-xl font-bold text-center mb-4">🏆 Шагналууд</h2>
        <div className="space-y-3">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-yellow-400/10 to-amber-500/10"
            >
              <span className="font-medium">Шагнал #{index + 1}</span>
              <span className="font-bold text-yellow-500">
                💎 {prize.diamonds}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-700/30">
        <TopFansList topFans={topFans} lastUpdated={lastUpdated} />
      </div>
    </>
  );
};
