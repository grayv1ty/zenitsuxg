"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import eventsData from "@/data/events.json";
import moment from "moment";
import "moment/locale/mn";
import Link from "next/link";

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

const EventCard = ({ event }: { event: Event }) => {
  const totalDiamonds = event.prizes.reduce((sum, prize) => sum + prize.diamonds, 0);
  const eventMoment = moment(event.startTime);
  const now = moment();
  const isUpcoming = eventMoment.isAfter(now);
  const timeText = eventMoment.fromNow();
  const dateText = eventMoment.format("YYYY-MM-DD HH:mm");
  const statusText = isUpcoming ? "Удахгүй" : "Дууссан";
  
  return (
    <Link href={`/events/${event.id}`}>
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: isUpcoming ? "#facc15" : "#22c55e",
            }}
          >
            <span className="text-lg">🎁</span>
          </div>
          <div className="flex flex-col overflow-hidden flex-1">
            <figcaption className="flex flex-row items-center text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg">{event.title}</span>
            </figcaption>
            <p className="text-sm font-normal dark:text-white/60">
              💎 {totalDiamonds} Diamonds • {event.prizes.length} шагнал
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span 
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  isUpcoming ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                )}
              >
                {statusText}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">📅 {dateText}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-gray-500">{timeText}</span>
            </div>
          </div>
        </div>
      </figure>
    </Link>
  );
};

export default function EventsPage() {
  const events = eventsData.events as Event[];

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">Эвэнтүүд</h1>
        <div
          className={cn(
            "relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg p-2"
          )}
        >
          <AnimatedList>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </AnimatedList>
          <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
        </div>
      </div>
    </div>
  );
}
