import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { EventTypeFilter, useEvents } from "@/hooks/useEvents";

function formatTimeOnly(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-AU", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "";
  }
}

function formatMonthShort(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-AU", { month: "short" }).format(date);
  } catch {
    return "";
  }
}

function formatDay2(dateString: string): string {
  try {
    const date = new Date(dateString);
    return String(date.getDate()).padStart(2, "0");
  } catch {
    return "";
  }
}

function formatYear(dateString: string): string {
  try {
    const date = new Date(dateString);
    return String(date.getFullYear());
  } catch {
    return "";
  }
}

type EventsByYear<T> = Record<number, T[]>;

function groupEventsByYear<T extends { date: string }>(
  events: T[],
): EventsByYear<T> {
  return events.reduce((acc, event) => {
    const year = new Date(event.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as EventsByYear<T>);
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

  const eventsByYear = groupEventsByYear(events);
  const sortedYears = Object.keys(eventsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
      <h1 className="mb-8 font-jersey10 text-4xl text-primary">Events</h1>

      <div className="mb-10 flex w-fit overflow-hidden rounded-md border border-gray-600">
        <button
          type="button"
          onClick={() => router.push("/events?type=past")}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            type === "past"
              ? "bg-white text-black"
              : "bg-transparent text-gray-300 hover:bg-gray-700"
          }`}
        >
          Past
        </button>
        <button
          type="button"
          onClick={() => router.push("/events?type=upcoming")}
          className={`px-6 py-2 text-sm font-medium transition-colors ${
            type === "upcoming"
              ? "bg-white text-black"
              : "bg-transparent text-gray-300 hover:bg-gray-700"
          }`}
        >
          Upcoming
        </button>
      </div>

      {sortedYears.map((year) => (
        <section key={year} className="mb-14">
          <h2 className="mb-6 text-2xl tracking-wide text-gray-200">{year}</h2>

          <div className="flex flex-col gap-6">
            {eventsByYear[year].map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group block overflow-hidden rounded-lg border border-gray-700 bg-gray-800 transition-colors hover:bg-gray-700"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex items-stretch md:w-28 md:flex-col md:justify-center md:border-r md:border-gray-700">
                    <div className="flex w-full items-center justify-between px-4 py-3 md:flex-col md:gap-1 md:py-6">
                      <span className="text-sm text-gray-400">
                        {formatMonthShort(event.date)}
                      </span>
                      <span className="font-jersey10 text-3xl text-primary">
                        {formatDay2(event.date)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatYear(event.date)}
                      </span>
                    </div>
                  </div>

                  <div className="relative h-56 w-full overflow-hidden bg-gray-700 md:h-auto md:w-[360px] md:flex-shrink-0">
                    <Image
                      src={event.coverImage}
                      alt={`Cover image for ${event.name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/game_dev_club_logo.svg";
                      }}
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-jersey10 text-3xl text-primary">
                      {event.name}
                    </h3>

                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-gray-200">Time:</span>{" "}
                      {formatTimeOnly(event.date)}
                    </p>

                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-gray-200">
                        Location:
                      </span>{" "}
                      {event.location}
                    </p>

                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-200">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
