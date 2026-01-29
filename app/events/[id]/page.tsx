import moment from "moment";
import "moment/locale/mn";
import eventsData from "@/data/events.json";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EventHeader } from "./_components/event-header";
import { UpcomingEventView } from "./_components/upcoming-event-view";
import { PastEventView } from "./_components/past-event-view";
import { getEventParticipants } from "@/lib/services/facebook.service";

moment.locale("mn");

interface Event {
  id: string;
  title: string;
  startTime: string;
  postId: string;
  prizes: {
    diamonds: number;
    winners: string[];
  }[];
}

interface Fan {
  fullname: string;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: eventId } = await params;
  const event = (eventsData.events as Event[]).find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Эвент олдсонгүй</h1>
          <Link href="/events">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Буцах
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  let topFans: Fan[] = [];

  // Fetch participants on the server
  if (event.postId) {
    try {
      topFans = await getEventParticipants(event.postId);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
    }
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
              topFans={topFans}
              loading={false}
              eventTitle={event.title}
              totalDiamonds={totalDiamonds}
            />
          ) : (
            <PastEventView prizes={event.prizes} />
          )}
        </div>
      </div>
    </div>
  );
}
