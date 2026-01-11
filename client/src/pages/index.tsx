import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef,useState } from "react";

import FeatureBox from "@/components/ui/featureBox";
import { useEvent } from "@/hooks/useEvent";

import { Button } from "../components/ui/button";

// function formatDateTime(dateString: string): string {
//     try {
//         const date = new Date(dateString);
//         return new Intl.DateTimeFormat("en-AU", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//         }).format(date);
//     } catch {
//         return dateString;
//     }
//   }

export default function Landing() {
  const btnList2 = [
    { name: "See more games by our members", link: "/" },
    { name: "See other cool stuff our members have created", link: "/" },
  ];

  const router = useRouter();
  const { id } = router.query;

  const {
    data: event,
    // isPending,
    // error,
    // isError,
  } = useEvent(router.isReady ? id : undefined);

  console.log("event", event);

  const upcomingEvents = [
    {
      id: 1,
      title: "Summer 2026 Game Jam",
      time: "Monday 24th Oct 11:00am–4:00pm",
      image: "/placeholder.png",
    },
    {
      id: 2,
      title: "Godot Workshop",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/placeholder.png",
    },
    {
      id: 3,
      title: "World domination",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/placeholder.png",
    },
  ];

  const gamesData = [
    {
      id: 1,
      title: "Cool Game",
      description: "Cool game is a game about being cool.",
      image: "/placeholder.png",
    },
    {
      id: 2,
      title: "Cool Game 2",
      description: "Cool game 2 is a game about being cool.",
      image: "/placeholder.png",
    },
    {
      id: 3,
      title: "Cool Game 3",
      description: "Cool game 3 is a game about being cool.",
      image: "/placeholder.png",
    },
  ];

  const VISIBLE_COUNT = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(upcomingEvents.length - VISIBLE_COUNT, 0);
  const slideLeft = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const slideRight = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <div>
      <section className="bg-background px-10">
        <div className="container mx-auto rounded-lg bg-primary-foreground px-4 py-8 lg:px-12">
          {/* Title Row */}
          <div className="flex items-center justify-between px-10">
            <div className="flex items-center justify-between">
              <h2 className="font-jersey10 text-4xl tracking-wide text-white">
                Upcoming Events
              </h2>

              {/* Arrow controls */}
              <div className="ml-5 flex gap-3 text-lg text-white/60">
                <ChevronLeft
                  className={`hover:text-white ${currentIndex === 0 ? "opacity-40" : "cursor-pointer"}`}
                  onClick={slideLeft}
                />
                <ChevronRight
                  className={`hover:text-white ${currentIndex === maxIndex ? "opacity-40" : "cursor-pointer"}`}
                  onClick={slideRight}
                />
              </div>
            </div>
            <div>
              <Link href="/events">
                <span className="font-jersey10">See More </span>
              </Link>
              <span className="cursor-pointer font-jersey10 hover:text-white">
                &gt;
              </span>
            </div>
          </div>

          <div className="mt-10 px-10">
            <div ref={containerRef} className="mt-10 overflow-hidden">
              <div
                className="flex gap-10 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(calc(-${currentIndex} * (33.333% + 2.5rem)))`,
                }}
              >
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex-shrink-0 basis-[calc((100%-5rem)/3)]"
                  >
                    <div className="flex h-44 w-full items-center justify-center rounded-lg bg-muted-foreground">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={60}
                        height={60}
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold tracking-wide text-white">
                      {event.title}
                    </h3>

                    <p className="text-sm tracking-wide text-white/70">
                      {event.time}
                    </p>

                    <div className="mt-3 w-full border-b border-white/20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-10 py-10">
        <div className="flex w-full justify-between px-4">
          <div>
            <div className="flex w-52 justify-around">
              <Image
                src="/placeholder.png"
                width={27}
                height={20}
                alt="Placeholder"
              />
              <div className="font-jersey10">Join our Discord </div>
            </div>
            <div className="flex w-52 justify-around">
              <Image
                src="/placeholder.png"
                width={27}
                height={20}
                alt="Placeholder"
              />
              <div className="font-jersey10">Join our Discord </div>
            </div>
          </div>

          <FeatureBox
            title="So... How do I get involved?"
            text="The easiest way to get involved is to come along to one of our events! Most events don't need registration- just check the event description to make sure. If you aren't feeling up to an event, just join our discord. React out to our friendly committee members if you need any help!"
          />
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-background px-6 py-20 lg:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex w-full flex-row items-start justify-between">
            {/* --- Title & Intro Text --- */}
            <div className="mb-10 flex flex-col items-start">
              <h2 className="flex items-center gap-3 font-jersey10 text-5xl text-white">
                Featured Member Creations
                <Image src="/heart.png" alt="" width={60} height={50} />
              </h2>

              <div className="inline-block">
                <p className="mt-3 text-lg text-white/70">
                  Some of our favourite games made by our members
                </p>

                <div className="mt-8 h-px bg-white/30"></div>
              </div>
            </div>

            {/* --- Buttons Row --- */}
            <div className="mb-12 flex flex-col items-start gap-4">
              {btnList2.map((item, i) => (
                <Link href={item.link} key={i}>
                  <Button>{item.name} &gt;</Button>
                </Link>
              ))}
            </div>
          </div>

          {/* --- Card Container --- */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {gamesData.map((game) => (
              <div
                key={game.id}
                className="rounded-xl p-6 text-background shadow-lg"
              >
                <div className="mb-6 flex h-44 items-center justify-center rounded-xl">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={340}
                    height={195}
                  />
                </div>

                <h3 className="mb-2 text-2xl text-white">{game.title}</h3>

                <p className="mb-4 text-sm text-primary">{game.description}</p>

                <div className="h-px w-full bg-white/30"></div>
              </div>
            ))}
          </div>
        </div>
        <Image
          src="/fire.png"
          alt=""
          width={400}
          height={400}
          className="absolute -left-64 top-1/2 z-10 -translate-y-1/2"
        />
        <Image
          src="/fire.png"
          alt=""
          width={400}
          height={400}
          className="absolute -right-52 top-1/2 z-10 -translate-y-1/2"
        />
        <Image
          src="/fire.png"
          alt=""
          width={300}
          height={300}
          className="absolute -bottom-36 left-1/2 z-10 -translate-x-1/2"
        />
      </section>
    </div>
  );
}
