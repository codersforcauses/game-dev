import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import FeatureBox from "@/components/ui/featureBox";
import { useEvent } from "@/hooks/useEvent";

import { Button } from "../components/ui/button";

export default function Landing() {
  const btnList = [
    { name: "More about us", link: "/committee/about", type: "default" },
    { name: "Join our Discord", link: "", type: "outline" },
  ];

  type cardImage = {
    url: string;
    width: number;
    height: number;
    alt: string;
  };

  type cardType = {
    id: number;
    title: string;
    description: string;
    type: string;
    image: cardImage | null;
    row: number;
  };

  const eventCards: cardType[] = [
    {
      id: 1,
      title: "Game Jams",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
      type: "default",
      image: {
        url: "/trophy.png",
        width: 200,
        height: 200,
        alt: "Trophy",
      },
      row: 1,
    },
    {
      id: 2,
      title: "Social Events",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      type: "default",
      image: null,
      row: 1,
    },
    {
      id: 3,
      title: "Other Events",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "default",
      image: null,
      row: 2,
    },
    {
      id: 4,
      title: "Workshops",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      type: "special-border",
      image: null,
      row: 2,
    },
  ];

  const logoImages = [
    { url: "/godot.png", alt: "Godot Logo", position: "start" },
    { url: "/unity-logo.png", alt: "Unity Logo", position: "end" },
  ];

  const row1Cards = eventCards.filter((card) => card.row === 1);
  const row2Cards = eventCards.filter((card) => card.row === 2);

  const renderCardHeader = (card: cardType) => {
    if (card.type === "special-border") {
      return (
        <div
          style={{
            clipPath:
              "polygon(0% 0%, 71% 0%, 78% 7px, 100% 7px, 100% calc(100% - 8px), 0% calc(100% - 8px))",
          }}
          className="relative bg-accent"
        >
          <div
            style={{
              clipPath:
                "polygon(1px 1px, calc(71% - 1px) 1px, calc(78% - 1px) 8px, calc(100% - 1px) 8px, calc(100% - 1px) calc(100% - 8px - 1px), 1px calc(100% - 8px - 1px))",
            }}
            className="bg-dark_alt p-4 pt-3 font-jersey10 text-2xl font-semibold"
          >
            {card.title}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-md border border-accent bg-dark_alt px-4 py-2 font-jersey10 text-2xl font-semibold">
        {card.title}
      </div>
    );
  };

  const renderCard = (card: cardType) => (
    <div key={card.id} className="flex flex-col">
      {renderCardHeader(card)}

      <div className="mt-4 rounded-md border border-muted bg-landingCard p-4 text-gray-200">
        <div className="flex gap-2">
          <span>▶</span>
          <p>{card.description}</p>
          {card.image && (
            <Image
              src={card.image.url}
              width={card.image.width}
              height={card.image.height}
              alt={card.image.alt}
              className="m-3 size-20 [image-rendering:pixelated]"
            />
          )}
        </div>
      </div>
    </div>
  );

  const gameShowcaseBtnList = [
    { name: "See more games by our members", link: "/" },
    { name: "See other cool stuff our members have created", link: "/" },
  ];

  const router = useRouter();
  const { id } = router.query;

  const { data: event } = useEvent(router.isReady ? id : undefined);

  console.log("event", event);

  const upcomingEvents = [
    {
      id: 1,
      title: "Summer 2026 Game Jam",
      time: "Monday 24th Oct 11:00am–4:00pm",
      image: "/landing_placeholder.png",
    },
    {
      id: 2,
      title: "Godot Workshop",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/landing_placeholder.png",
    },
    {
      id: 3,
      title: "World domination",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/landing_placeholder.png",
    },
    {
      id: 4,
      title: "World domination",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/landing_placeholder.png",
    },
  ];

  const gamesData = [
    {
      id: 1,
      title: "Cool Game",
      description: "Cool game is a game about being cool.",
      image: "/landing_placeholder.png",
    },
    {
      id: 2,
      title: "Cool Game 2",
      description: "Cool game 2 is a game about being cool.",
      image: "/landing_placeholder.png",
    },
    {
      id: 3,
      title: "Cool Game 3",
      description: "Cool game 3 is a game about being cool.",
      image: "/landing_placeholder.png",
    },
  ];

  const GAP = 40; // gap-10 = 40px

  const viewportRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);

  /**
   * ✅ Responsive visible count
   */
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  /** Observe item width */
  useEffect(() => {
    if (!firstItemRef.current) return;

    const observer = new ResizeObserver(() => {
      const width = firstItemRef.current?.clientWidth ?? 0;
      setItemWidth(width);
    });

    observer.observe(firstItemRef.current);
    return () => observer.disconnect();
  }, []);

  const maxIndex = Math.max(upcomingEvents.length - visibleCount, 0);

  const slideLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const translateX = -(currentIndex * (itemWidth + GAP));

  return (
    <div>
      <section className="flex w-full justify-center bg-muted px-12 py-10">
        <div className="flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex max-w-lg flex-col gap-6">
            <h1 className="font-jersey10 text-4xl font-bold">
              Game Development UWA
            </h1>
            <p className="text-base leading-relaxed text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="my-4 flex gap-4">
              {btnList.map((item, i) => (
                <Link href={item.link} key={i}>
                  <Button
                    variant={item.type == "default" ? "default" : "outline"}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/landing_placeholder.png"
              width={600}
              height={430}
              alt="placeholder"
              className="min-w-80 border-[26px] border-accent [clip-path:polygon(20px_20px,calc(100%-20px)_20px,100%_32px,100%_30%,calc(100%-20px)_45%,calc(100%-20px)_calc(100%-8px),80%_calc(100%-8px),75%_calc(100%-20px),20px_calc(100%-20px),0%_60%,0%_30%,20px_25%)]"
            />
            <Image
              src="/bomb.png"
              width={96}
              height={156}
              alt="placeholder"
              className="absolute bottom-0 left-0 h-auto w-[20%] -translate-x-1/4 -translate-y-4 [image-rendering:pixelated]"
            />
          </div>
        </div>
      </section>

      <section className="-mt-8 bg-dark_3 py-16 [clip-path:polygon(0%_0%,20%_0%,calc(20%+32px)_32px,100%_32px,100%_100%,0%_100%)] [overflow:clip]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {row1Cards.map(renderCard)}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[23fr_27fr_11fr]">
            {row2Cards.map(renderCard)}

            <div className="flex flex-row items-center justify-center gap-4 md:hidden lg:flex lg:flex-col lg:items-start">
              {logoImages.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.url}
                  width={135}
                  height={46}
                  alt={logo.alt}
                  className={`${index < logoImages.length - 1 ? "lg:mb-5" : ""} ${
                    logo.position === "end" ? "lg:self-end" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-10 py-10">
        <div className="container mx-auto rounded-lg bg-primary-foreground px-4 py-8 lg:px-12">
          <div className="flex items-center justify-between px-10">
            <div className="flex items-center">
              <h2 className="font-jersey10 text-4xl tracking-wide text-white">
                Upcoming Events
              </h2>

              <div className="ml-5 flex gap-3 text-lg text-white/60">
                <ChevronLeft
                  className={`hover:text-white ${
                    currentIndex === 0 ? "opacity-40" : "cursor-pointer"
                  }`}
                  onClick={slideLeft}
                />
                <ChevronRight
                  className={`hover:text-white ${
                    currentIndex === maxIndex ? "opacity-40" : "cursor-pointer"
                  }`}
                  onClick={slideRight}
                />
              </div>
            </div>

            <Link href="/events" className="font-jersey10">
              See More &gt;
            </Link>
          </div>

          <div className="mt-10 px-10">
            <div ref={viewportRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  gap: GAP,
                  transform: `translateX(${translateX}px)`,
                }}
              >
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    ref={index === 0 ? firstItemRef : undefined}
                    className="w-full flex-shrink-0 md:w-[calc((100%-80px)/3)]"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold tracking-wide text-white">
                      {event.title}
                    </h3>

                    <p className="text-sm tracking-wide text-white/70">
                      {event.time}
                    </p>

                    <div className="mt-3 w-full border-b border-white/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-10 md:px-10">
        <div className="flex w-full justify-between px-4">
          <FeatureBox
            title="So... How do I get involved?"
            text="The easiest way to get involved is to come along to one of our events!"
          />
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-background px-6 py-20 lg:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mb-10 flex flex-col items-start">
              <h2 className="flex items-center gap-3 font-jersey10 text-5xl text-white">
                Featured Member Creations
                <Image src="/heart.png" alt="" width={60} height={50} />
              </h2>
            </div>

            <div className="mb-12 flex flex-col items-start gap-4">
              {gameShowcaseBtnList.map((item, i) => (
                <Link href={item.link} key={i}>
                  <Button>{item.name} &gt;</Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {gamesData.map((game) => (
              <div
                key={game.id}
                className="rounded-xl p-6 text-background shadow-lg"
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  width={340}
                  height={195}
                  className="rounded-xl"
                />

                <h3 className="mb-2 mt-4 font-jersey10 text-2xl text-white">
                  {game.title}
                </h3>

                <p className="mb-4 text-sm text-primary">{game.description}</p>

                <div className="h-px w-full bg-white/30" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
