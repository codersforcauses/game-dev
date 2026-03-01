import Image from "next/image";
import { useRouter } from "next/router";

import { EventDateDisplay } from "@/components/ui/EventDateDisplay";
import { useEvent } from "@/hooks/useEvent";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: event,
    isPending,
    error,
    isError,
  } = useEvent(router.isReady ? id : undefined);

  if (isPending) {
    return (
      <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
        <p>Loading event...</p>
      </main>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Event not found."
        : "Failed to load event.";

    return (
      <main className="mx-auto min-h-screen max-w-6xl px-6 py-16 md:px-20">
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
        <p>No event data available.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
      <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-20">
        <div className="flex-1">
          <h1 className="font-jersey10 text-4xl text-primary">{event.name}</h1>
          <div
            className="mt-4 w-full border-t border-gray-600"
            aria-hidden="true"
          />
          <p className="mt-6 text-lg">
            <EventDateDisplay date={event.date} />
          </p>
          <div className="text-primary">{event.location} </div>
          <p className="mt-4 max-w-lg text-base leading-relaxed">
            {event.description}
          </p>
          {event.workshopLink && (
            <p className="mt-4 text-base">
              Workshop link:
              <a
                href={event.workshopLink}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {event.workshopLink}
              </a>
            </p>
          )}
        </div>
        <div className="lg:w-128 relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-700 md:w-96">
          <Image
            src={event.coverImage}
            alt={`Cover image for ${event.name}`}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to default image if load fails
              e.currentTarget.src = "/game_dev_club_logo.svg";
            }}
          />
        </div>
      </div>
    </main>
  );
}
