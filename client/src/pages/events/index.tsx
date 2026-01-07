import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { EventTypeFilter,useEvents } from "@/hooks/useEvents";

function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export default function EventsPage() {
  const router = useRouter();

  const typeParam = router.query.type;
  const type =
    typeof typeParam === "string" &&
    (typeParam === "past" || typeParam === "upcoming")
      ? (typeParam as EventTypeFilter)
      : undefined;

  const {
    data: events,
    isPending,
    isError,
  } = useEvents(router.isReady ? type : undefined);

  if (isPending) {
    return (
      <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
        <p>Loading events...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="md:20 mx-auto min-h-dvh max-w-6xl px-6 py-16">
        <p className="text-red-500" role="alert">
          Failed to load events.
        </p>
      </main>
    );
  }

  if (!events || events.length === 0) {
    return (
      <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
        <h1 className="mb-8 font-jersey10 text-4xl text-primary">Events</h1>
        <p>No events available.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
      <h1 className="mb-8 font-jersey10 text-4xl text-primary">Events</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="group overflow-hidden rounded-lg bg-gray-800 transition-colors hover:bg-gray-700"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-700">
              <Image
                src={event.coverImage}
                alt={`Cover image for ${event.name}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/game_dev_club_logo.svg";
                }}
              />
            </div>
            <div className="p-4">
              <h2 className="mb-2 font-jersey10 text-2xl text-primary">
                {event.name}
              </h2>
              <p className="mb-2 text-sm text-gray-400">
                {formatDateTime(event.date)} · {event.location}
              </p>
              <p className="line-clamp-2 text-sm text-gray-300">
                {event.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
