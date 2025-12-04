import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ApiEvent = {
  id: number;
  name: string;
  description: string;
  publicationDate: string;
  date: string;
  startTime: string | null;
  location: string;
  cover_image: string | null;
};

type UiEvent = {
  name: string;
  description: string;
  publicationDate: string;
  date: string;
  startTime?: string | null;
  location: string;
  coverImage: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<UiEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // for testing
  useEffect(() => {
    if (event) {
      console.log("Event state updated:", event);
    }
  }, [event]);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function fetchEvent() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/events/${id}/`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError("Event not found.");
          } else {
            setError("Failed to load event.");
          }
          return;
        }

        const data: ApiEvent = await res.json();

        // for testing
        console.log("Fetched event data:", data);

        setEvent({
          name: data.name,
          description: data.description,
          publicationDate: data.publicationDate,
          location: data.location,
          coverImage: data.cover_image ?? "/game_dev_club_logo.svg",
          date: data.date,
          startTime: data.startTime,
        });
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError("Failed to load event.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16 md:px-20">
        <div className="mx-auto max-w-6xl">
          <p>Loading event...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-6 py-16 md:px-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="min-h-screen px-6 py-16 md:px-20">
        <div className="mx-auto max-w-6xl">
          <p>No event data available.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16 md:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-20">
          <div className="flex-1">
            <h1 className="font-jersey10 text-4xl text-primary">
              {event.name}
            </h1>
            <div className="mt-4 w-full border-t border-gray-600"></div>

            <p className="mt-6 text-lg">
              {event.date} {event.startTime && `· ${event.startTime}`} ·{" "}
              {event.location}
            </p>

            <p className="mt-4 max-w-lg text-base leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="w-full flex-shrink-0 md:w-[380px] lg:w-[500px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-700">
              <Image
                src={event.coverImage}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
