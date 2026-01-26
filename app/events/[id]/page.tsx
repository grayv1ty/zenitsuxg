"use client";

import { useParams } from "next/navigation";
import moment from "moment";
import "moment/locale/mn";
import eventsData from "@/data/events.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventHeader } from "./_components/event-header";
import { UpcomingEventView } from "./_components/upcoming-event-view";
import { PastEventView } from "./_components/past-event-view";

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
  const totalDiamonds = event.prizes.reduce(
    (sum, prize) => sum + prize.diamonds,
    0
  );

  return (
    <div className="min-h-screen w-full relative overflow-hidden p-4 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/events">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
          </Button>
        </Link>

        <EventHeader
          title={event.title}
          startTime={event.startTime}
          totalDiamonds={totalDiamonds}
          prizesCount={event.prizes.length}
          isUpcoming={isUpcoming}
        />

        <div className="space-y-8">
          {isUpcoming ? (
            <UpcomingEventView
              startTime={event.startTime}
              prizes={event.prizes}
              topFans={TOP_FANS}
              lastUpdated={TOP_FANS_LAST_UPDATED}
            />
          ) : (
            <PastEventView prizes={event.prizes} />
          )}
        </div>
      </div>
    </div>
  );
}
