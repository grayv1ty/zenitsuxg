"use client";

import { WinnerList } from "./winner-list";

interface Prize {
  diamonds: number;
  winners: string[];
}

interface PastEventViewProps {
  prizes: Prize[];
}

export const PastEventView = ({ prizes }: PastEventViewProps) => {
  return (
    <div className="p-8 rounded-2xl bg-yellow-50/50 dark:bg-yellow-900/10 border border-yellow-200/50 dark:border-yellow-700/30">
      <WinnerList prizes={prizes} />
    </div>
  );
};
