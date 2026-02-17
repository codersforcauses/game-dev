import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";

import { parseOpenStreetMapUrl } from "@/components/map/osm";
import { useEvent } from "@/hooks/useEvent";

const EventMap = dynamic(() => import("@/components/map/EventMap"), {
  ssr: false,
});

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
    return dateString; // Fallback to original string if parsing fails
  }
}

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  // Wait for router to be ready before fetching (router.query is empty on initial SSR)
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
  const coords = event.openstreetmap_url
    ? parseOpenStreetMapUrl(event.openstreetmap_url)
    : null;

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
            {formatDateTime(event.date)} · {event.location}
          </p>
          <p className="mt-4 max-w-lg text-base leading-relaxed">
            {event.description}
          </p>
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
      {coords && (
        <div className="mt-6 flex flex-col gap-12 md:flex-row md:gap-20">
          <div className="flex-1">
            <EventMap lat={coords.lat} lon={coords.lon} name={event.name} />
          </div>
          <div className="lg:w-128 md:w-96" aria-hidden="true" />
        </div>
      )}
    </main>
  );
}
