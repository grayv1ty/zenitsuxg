"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/mn";
import eventsData from "@/data/events.json";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

moment.locale("mn");

interface Event {
  id: string;
  title: string;
  startTime: string;
  prizes: {
    diamonds: number;
    winners: string[];
  }[];
}

interface Fan {
  fullname: string;
}

// Top fans list - you can modify this list
const TOP_FANS: Fan[] = [
  { fullname: "Давааабаяр Баярaa" },
  { fullname: "E.O. Delgermurun" },
  { fullname: "Ðełĝėřmoroņ Tuvshintogs" },
  { fullname: "И. Өсөхбаяр" },
  { fullname: "Misheel Bymbadorj" },
  { fullname: "Галбадрах Отгонсүх" },
  { fullname: "Г. Хүсэл Баяр" },
  { fullname: "Amarkhuu Enkhamar" },
];

// Last updated date for the top fans list
const TOP_FANS_LAST_UPDATED = "2026-01-03";

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const target = moment(targetDate);
      const duration = moment.duration(target.diff(now));

      if (duration.asMilliseconds() <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
      {[
        { label: "Өдөр", value: timeLeft.days },
        { label: "Цаг", value: timeLeft.hours },
        { label: "Минут", value: timeLeft.minutes },
        { label: "Секунд", value: timeLeft.seconds },
      ].map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white"
        >
          <span className="text-3xl font-bold">{item.value}</span>
          <span className="text-xs opacity-80">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const RandomSelector = () => {
  const [selectedFan, setSelectedFan] = useState<Fan | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = () => {
    setIsSpinning(true);
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TOP_FANS.length);
      setSelectedFan(TOP_FANS[randomIndex]);
      count++;

      if (count > 20) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 dark:border-purple-500/20 mb-4">
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
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        size="lg"
      >
        {isSpinning ? "🎲 Сонгож байна..." : "🎲 Random сонгох"}
      </Button>
      <p className="text-xs text-center mt-2 text-gray-500">
        Нийт {TOP_FANS.length} топ фэн
      </p>
    </div>
  );
};

const TopFansList = () => {
  const lastUpdated = moment(TOP_FANS_LAST_UPDATED).format("YYYY-MM-DD");
  const timeAgo = moment(TOP_FANS_LAST_UPDATED).fromNow();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">👑 Топ Фэнүүд</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>Шинэчлэгдсэн: {lastUpdated}</p>
          <p className="text-right">{timeAgo}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TOP_FANS.map((fan, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-pink-500/20"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
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

const WinnerList = ({ prizes }: { prizes: Event["prizes"] }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Азтанууд</h2>
      {prizes.map((prize, index) => (
        <div
          key={index}
          className="p-6 rounded-xl border bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20 dark:border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold">
              Шагнал #{index + 1}
            </span>
            <span className="text-lg font-bold text-pink-500">
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

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  
  const event = (eventsData.events as Event[]).find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Эвэнт олдсонгүй</h1>
          <Link href="/events">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const eventMoment = moment(event.startTime);
  const isUpcoming = eventMoment.isAfter(moment());
  const totalDiamonds = event.prizes.reduce((sum, prize) => sum + prize.diamonds, 0);

  return (
    <div className="min-h-screen w-full relative overflow-hidden p-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/events">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Button>
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>📅 {eventMoment.format("YYYY-MM-DD HH:mm")}</span>
            <span>💎 {totalDiamonds} Diamonds</span>
            <span>🎁 {event.prizes.length} шагнал</span>
          </div>
          <div className="mt-4">
            <span
              className={cn(
                "text-sm px-3 py-1 rounded-full font-medium",
                isUpcoming
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              )}
            >
              {isUpcoming ? "Удахгүй" : "Дууссан"}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {isUpcoming ? (
            <>
              <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 dark:border-purple-500/20">
                <h2 className="text-2xl font-bold text-center mb-6">⏰ Эхлэх хүртэл</h2>
                <Countdown targetDate={event.startTime} />
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20">
                <h2 className="text-2xl font-bold text-center mb-6">🎲 Random Сонголт</h2>
                <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Топ фэнүүдээс random хүн сонгох
                </p>
                <RandomSelector />
              </div>

              <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-center mb-4">🏆 Шагналууд</h2>
                <div className="space-y-3">
                  {event.prizes.map((prize, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10"
                    >
                      <span className="font-medium">
                        Шагнал #{index + 1}
                      </span>
                      <span className="font-bold text-pink-500">💎 {prize.diamonds}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <TopFansList />
              </div>
            </>
          ) : (
            <div className="p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <WinnerList prizes={event.prizes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
