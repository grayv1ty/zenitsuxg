"use client";

import moment from "moment";

interface Fan {
  fullname: string;
}

interface TopFansListProps {
  topFans: Fan[];
  lastUpdated: string;
}

export const TopFansList = ({ topFans, lastUpdated }: TopFansListProps) => {
  const lastUpdatedFormatted = moment(lastUpdated).format("YYYY-MM-DD");
  const timeAgo = moment(lastUpdated).fromNow();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">👑 Топ Фэнүүд</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Шинэчлэгдсэн: {lastUpdatedFormatted}</p>
          <p className="text-right">{timeAgo}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {topFans.map((fan, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gradient-to-br from-yellow-400/10 to-amber-500/10 border border-yellow-400/20 dark:border-amber-500/20"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                #{index + 1}
              </span>
              <p className="font-medium text-sm">{fan.fullname}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
