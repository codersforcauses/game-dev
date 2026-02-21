import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import EventCarousel from "@/components/ui/eventCarousel";
import {
  EventHighlightCard,
  eventHighlightCardType,
} from "@/components/ui/eventHighlightCard";
import Explosion from "@/components/ui/Explosion";
import { placeholderEvents, placeholderGames } from "@/placeholderData";

import { Button } from "../components/ui/button";

export default function Landing() {
  const [showExplosion, setShowExplosion] = useState(false);

  const handleExplode = () => {
    setShowExplosion(true);
    setTimeout(() => setShowExplosion(false), 1000);
  };

  const gameLogoImages = [
    { url: "/godot.png", alt: "Godot Logo", position: "start" },
    { url: "/unity-logo.png", alt: "Unity Logo", position: "end" },
  ];

  const eventCards: eventHighlightCardType[] = [
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
              <Link href="/committee/about">
                <Button>More about us</Button>
              </Link>
              <Link href="/committee/about">
                <Button variant={"outline"}>Join our Discord</Button>
              </Link>
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
            <div
              className="absolute bottom-0 left-0 h-auto w-[20%] -translate-x-1/4 -translate-y-4 cursor-pointer"
              onClick={handleExplode}
            >
              {showExplosion && (
                <Explosion colour1="#ef4444" colour2="#f59e0b" count={100} />
              )}
              <Image
                src="/bomb.png"
                width={96}
                height={156}
                alt="bomb"
                className="h-auto w-full transition-transform [image-rendering:pixelated] active:scale-90"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-8 bg-dark_3 py-16 [clip-path:polygon(0%_0%,20%_0%,calc(20%+32px)_32px,100%_32px,100%_100%,0%_100%)] [overflow:clip]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="relative">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {eventCards
                .filter((card) => card.row === 1)
                .map((card) => (
                  <EventHighlightCard key={card.id} {...card} />
                ))}
            </div>
          </div>

          <div className="relative">
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[23fr_27fr_11fr]">
              {eventCards
                .filter((card) => card.row === 2)
                .map((card) => (
                  <EventHighlightCard key={card.id} {...card} />
                ))}
              <div className="flex flex-row items-center justify-center gap-4 md:hidden lg:flex lg:flex-col lg:items-start">
                {gameLogoImages.map((logo, index) => (
                  <Image
                    key={index}
                    src={logo.url}
                    width={135}
                    height={46}
                    alt={logo.alt}
                    className={`${index < gameLogoImages.length - 1 ? "lg:mb-5" : ""} ${
                      logo.position === "end" ? "lg:self-end" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-10 py-20">
        <EventCarousel items={placeholderEvents} />
      </section>
      {/* Leaving commented out until styling/design is confirmed. */}
      {/* <section className="bg-background px-4 py-10 md:px-10">
        <div className="flex w-full px-4">
          <FeatureBox
            title="So... How do I get involved?"
            text="The easiest way to get involved is to come along to one of our events!"
          />
        </div>
      </section> */}

      <section className="relative w-full overflow-hidden bg-dark_3 px-6 py-20 lg:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col items-start">
              <h2 className="flex items-center gap-3 font-jersey10 text-4xl text-white">
                Featured Member Creations
                <Image src="/heart.png" alt="" width={60} height={50} />
              </h2>
            </div>

            <div className="flex flex-col items-end gap-4">
              <Link href="/">
                <Button>See more games by our members</Button>
              </Link>
              <Link href="/">
                <Button variant={"outline"}>
                  See other cool stuff our members have created
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {placeholderGames.map((game) => (
              <div
                key={game.id}
                className="rounded-xl p-6 text-background shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Image
                    src={game.thumbnail}
                    alt={game.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-2 mt-4 font-jersey10 text-2xl text-white">
                  {game.name}
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
