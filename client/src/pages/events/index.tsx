import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { EventTypeFilter, useEvents } from "@/hooks/useEvents";

function formatDateTimeLine(dateString: string): string {
  try {
    const date = new Date(dateString);

    const d = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);

    const t = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .replace("AM", "am")
      .replace("PM", "pm");

    return `${d} ・ ${t}`;
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

  const isEmpty = !isPending && !isError && (!events || events.length === 0);

  const eventsByYear =
    events && events.length > 0 ? groupEventsByYear(events) : {};
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
          aria-pressed={type === "past"}
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
          aria-pressed={type === "upcoming"}
        >
          Upcoming
        </button>
      </div>

      {isPending && <p>Loading events...</p>}

      {isError && (
        <p className="text-red-500" role="alert">
          Failed to load events.
        </p>
      )}

      {isEmpty && <p>No events available.</p>}

      {!isPending && !isError && events && events.length > 0 && (
        <div className="flex flex-col gap-14">
          {sortedYears.map((year) => (
            <section key={year}>
              <div className="flex gap-6 md:gap-10">
                <div className="relative w-14 flex-shrink-0 md:w-20">
                  <div className="font-mono text-2xl font-semibold text-gray-200 md:text-3xl">
                    {year}
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute bottom-0 left-2 top-12 w-px bg-gray-600/60 md:left-4"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-6">
                  {eventsByYear[year].map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="group block overflow-hidden rounded-xl border border-indigo-300/30 bg-gray-950/30 shadow-[0_0_0_1px_rgba(99,102,241,0.10)] transition-colors hover:bg-gray-950/45"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="flex min-w-0 flex-1 flex-col gap-4 px-8 py-7">
                          <h3 className="min-w-0 font-jersey10 text-4xl text-white md:text-5xl">
                            <span className="block truncate">{event.name}</span>
                          </h3>

                          <div className="space-y-1 text-sm md:text-base">
                            <div className="text-primary">
                              {formatDateTimeLine(event.date)}
                            </div>
                            <div className="text-primary">{event.location}</div>
                          </div>

                          <p className="max-w-3xl text-sm leading-relaxed text-gray-200/90 md:text-base">
                            {event.description}
                          </p>
                        </div>

                        <div className="relative h-56 w-full flex-shrink-0 border-t border-indigo-300/20 md:h-auto md:w-80 md:border-l md:border-t-0">
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
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
