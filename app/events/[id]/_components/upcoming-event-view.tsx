"use client";

import { useState, useRef } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Countdown } from "./countdown";
import { RandomSelector } from "./random-selector";
import { TopFansList } from "./top-fans-list";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

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
  loading?: boolean;
  eventTitle?: string;
  totalDiamonds?: number;
}

export const UpcomingEventView = ({
  startTime,
  prizes,
  topFans,
  loading = false,
  eventTitle,
  totalDiamonds,
}: UpcomingEventViewProps) => {
  const [isCountdownFullscreen, setIsCountdownFullscreen] = useState(false);
  const [isRandomFullscreen, setIsRandomFullscreen] = useState(false);
  const countdownRef = useRef<HTMLDivElement>(null);
  const randomRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async (
    ref: React.RefObject<HTMLDivElement | null>,
    setFullscreen: (value: boolean) => void,
    currentState: boolean
  ) => {
    if (!ref.current) return;

    try {
      if (!currentState) {
        await ref.current.requestFullscreen();
        setFullscreen(true);
      } else {
        await document.exitFullscreen();
        setFullscreen(false);
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <>
      <div 
        ref={countdownRef}
        className={`p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20 relative ${
          isCountdownFullscreen ? 'flex items-center justify-center min-h-screen' : ''
        }`}
      >
        {isCountdownFullscreen && (
          <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
            <DotPattern
              glow={true}
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
              )}
            />
          </div>
        )}
        <button
          onClick={() => toggleFullscreen(countdownRef, setIsCountdownFullscreen, isCountdownFullscreen)}
          className="absolute top-4 right-4 p-2 rounded-lg z-10"
          title={isCountdownFullscreen ? "Гарах" : "Бүтэн дэлгэц"}
        >
          {isCountdownFullscreen ? (
            <Minimize className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
          ) : (
            <Maximize className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
          )}
        </button>
        <div className={isCountdownFullscreen ? 'w-full max-w-2xl' : 'w-full'}>
          {isCountdownFullscreen && eventTitle && (
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-3xl font-bold mb-4">{eventTitle}</h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  📅 {new Date(startTime).toLocaleString('mn-MN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                {totalDiamonds && (
                  <span className="flex items-center gap-1">
                    💎 {totalDiamonds} Diamonds
                  </span>
                )}
                <span className="flex items-center gap-1">
                  🎁 {prizes.length} шагнал
                </span>
              </div>
            </div>
          )}
          <h2 className="text-2xl font-bold text-center mb-6">⏰ Эхлэх хүртэл</h2>
          <Countdown targetDate={startTime} />
        </div>
      </div>

      <div 
        ref={randomRef}
        className={`p-8 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20 relative ${
          isRandomFullscreen ? 'flex items-center justify-center min-h-screen' : ''
        }`}
      >
        {isRandomFullscreen && (
          <div className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden">
            <DotPattern
              glow={true}
              className={cn(
                "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
              )}
            />
          </div>
        )}
        <button
          onClick={() => toggleFullscreen(randomRef, setIsRandomFullscreen, isRandomFullscreen)}
          className="absolute top-4 right-4 p-2 rounded-lg z-10"
          title={isRandomFullscreen ? "Гарах" : "Бүтэн дэлгэц"}
        >
          {isRandomFullscreen ? (
            <Minimize className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
          ) : (
            <Maximize className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
          )}
        </button>
        <div className={isRandomFullscreen ? 'w-full max-w-2xl' : 'w-full'}>
          <h2 className="text-2xl font-bold text-center mb-6">🎲 Random Сонголт</h2>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            Топ фэнүүдээс random хүн сонгох
          </p>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Ачааллаж байна...</p>
            </div>
          ) : (
            <RandomSelector topFans={topFans} prizes={prizes} />
          )}
        </div>
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
        {loading ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-bold mb-4">👑 Топ Фэнүүд</h2>
            <p className="text-gray-500">Ачааллаж байна...</p>
          </div>
        ) : (
          <TopFansList topFans={topFans} />
        )}
      </div>
    </>
  );
};

