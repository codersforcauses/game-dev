import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { EventDateDisplay } from "@/components/ui/EventDateDisplay";
import { EventTypeFilter, UiEvent, useEvents } from "@/hooks/useEvents";

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
  const [page, setPage] = useState(1);

  const pageSize = 20;

  const rawType = useMemo(() => {
    const t = router.query.type;
    return typeof t === "string" && (t === "past" || t === "upcoming")
      ? t
      : null;
  }, [router.query.type]);

  const type: EventTypeFilter = rawType ?? "upcoming";

  useEffect(() => {
    if (!router.isReady) return;
    if (rawType === null) {
      router.replace(
        { pathname: "/events", query: { type: "upcoming" } },
        undefined,
        { shallow: true },
      );
    }
  }, [router.isReady, rawType, router]);

  useEffect(() => {
    setPage(1);
  }, [type]);

  const { data, isPending, isError, isFetching } = useEvents({
    type,
    page,
    pageSize,
  });

  const events: UiEvent[] | undefined = data?.items;
  const count = data?.count ?? 0;

  const hasNext = Boolean(data?.next);
  const hasPrev = Boolean(data?.previous);

  const shouldShowPagination = !isPending && !isError && count > pageSize;

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
          onClick={() =>
            router.push(
              { pathname: "/events", query: { type: "past" } },
              undefined,
              { shallow: true },
            )
          }
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
          onClick={() =>
            router.push(
              { pathname: "/events", query: { type: "upcoming" } },
              undefined,
              { shallow: true },
            )
          }
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

      {shouldShowPagination && (
        <div className="mb-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!hasPrev || isPending || isFetching}
            className={`rounded-md border px-4 py-2 text-sm transition-colors ${
              !hasPrev || isPending || isFetching
                ? "border-gray-700 text-gray-500"
                : "border-gray-600 text-gray-200 hover:bg-gray-800"
            }`}
          >
            Prev
          </button>

          <div className="text-sm text-gray-300">
            Page <span className="font-semibold text-gray-100">{page}</span>
            <span className="text-gray-400"> ・ {count} total</span>
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext || isPending || isFetching}
            className={`rounded-md border px-4 py-2 text-sm transition-colors ${
              !hasNext || isPending || isFetching
                ? "border-gray-700 text-gray-500"
                : "border-gray-600 text-gray-200 hover:bg-gray-800"
            }`}
          >
            Next
          </button>

          {isFetching && !isPending && (
            <span className="text-sm text-gray-400">Loading...</span>
          )}
        </div>
      )}

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
                            <p className="text-base text-primary">
                              <EventDateDisplay date={event.date} />
                            </p>
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
