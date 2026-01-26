"use client";

import moment from "moment";
import { cn } from "@/lib/utils";

interface EventHeaderProps {
  title: string;
  startTime: string;
  totalDiamonds: number;
  prizesCount: number;
  isUpcoming: boolean;
}

export const EventHeader = ({
  title,
  startTime,
  totalDiamonds,
  prizesCount,
  isUpcoming,
}: EventHeaderProps) => {
  const eventMoment = moment(startTime);

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <span>📅 {eventMoment.format("YYYY-MM-DD HH:mm")}</span>
        <span>💎 {totalDiamonds} Diamonds</span>
        <span>🎁 {prizesCount} шагнал</span>
      </div>
      <div className="mt-4">
        <span
          className={cn(
            "text-sm px-3 py-1 rounded-full font-medium",
            isUpcoming
              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          )}
        >
          {isUpcoming ? "Удахгүй" : "Дууссан"}
        </span>
      </div>
    </div>
  );
};
