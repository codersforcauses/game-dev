//import { useRouter } from "next/router";
import Image from "next/image";

export default function EventPage() {
  //const router = useRouter();
  //const { id } = router.query;

  // Temporary mock event data
  const event = {
    name: "Super Fun Event",
    description: "Yayayyayayay! This event will be awesome.",
    coverImage: "/game_dev_club_logo.svg",
    publicationDate: "2025-11-29",
    location: "Ezone",
  };

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
              {event.publicationDate} · {event.location}
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
