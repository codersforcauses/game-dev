import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

import EventCarousel from "@/components/ui/eventCarousel";
import {
  EventHighlightCard,
  eventHighlightCardType,
} from "@/components/ui/eventHighlightCard";
import { placeholderEvents, placeholderGames } from "@/placeholderData";

import { Button } from "../components/ui/button";
import { useExplosions } from "../hooks/useExplosions";
import { Explosion } from "../components/ui/Explosion";
import { DebrisBurst } from "../components/ui/DebrisBurst";

// Max concurrent debris bursts to prevent lag
const MAX_DEBRIS = 5;

export default function Landing() {
  const { explosions, triggerExplosions } = useExplosions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickDebris, setClickDebris] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const lastClickTime = useRef(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleExplosionClick = () => {
    triggerExplosions({
      count: 5,
      minDelay: 0,
      maxDelay: 300,
      duration: 1500,
      playSound: true,
    });
  };

  const handleBombClick = () => {
    // Trigger a massive explosion across the whole page
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    triggerExplosions({
      count: 10, // Lots of explosions!
      minDelay: 0,
      maxDelay: 500, // Stagger them over half a second
      duration: 2000,
      playSound: true,
    }, rect);
    
    // Trigger screen shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400); // Shake for 400ms
  };

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    // Throttle clicks - 100ms minimum between clicks
    const now = Date.now();
    if (now - lastClickTime.current < 100) return;
    lastClickTime.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Get absolute pixel position for DebrisBurst
    const absoluteX = e.clientX;
    const absoluteY = e.clientY;

    // Create explosion at click position
    triggerExplosions({
      count: 1,
      minDelay: 0,
      maxDelay: 0,
      duration: 1500,
      playSound: true,
      position: { x, y }, // Pass click position
    });

    // Add DebrisBurst for click (limit max concurrent)
    const debrisId = now;
    setClickDebris((prev) => {
      const updated = [...prev, { id: debrisId, x: absoluteX, y: absoluteY }];
      // Keep only the most recent MAX_DEBRIS
      return updated.slice(-MAX_DEBRIS);
    });
    
    // Remove after animation completes
    setTimeout(() => {
      setClickDebris((prev) => prev.filter((d) => d.id !== debrisId));
    }, 1500);
  }, [triggerExplosions]);

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
    <motion.div
      className="relative"
      ref={containerRef}
      onClick={handlePageClick}
      animate={isShaking ? {
        x: [0, -12, 12, -10, 10, -6, 6, -3, 3, 0],
        y: [0, 4, -4, 3, -3, 2, -2, 0]
      } : { x: 0, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Render explosions */}
      {explosions.map((explosion) => (
        <Explosion key={explosion.id} explosion={explosion} />
      ))}
      {/* Render DebrisBurst for clicks */}
      {clickDebris.map((debris) => (
        <DebrisBurst
          key={debris.id}
          x={debris.x}
          y={debris.y}
          count={8}
          power={450}
          spreadDeg={360}
          gravity={1200}
          bounce={0.3}
        />
      ))}
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
            <Image
              src="/bomb.png"
              width={96}
              height={156}
              alt="Bomb - click to explode!"
              className="absolute bottom-0 left-0 h-auto w-[20%] -translate-x-1/4 -translate-y-4 cursor-pointer transition-transform hover:scale-110 [image-rendering:pixelated]"
              onClick={handleBombClick}
            />
          </div>
        </div>
      </section>

      <section className="-mt-8 bg-dark_3 py-16 [clip-path:polygon(0%_0%,20%_0%,calc(20%+32px)_32px,100%_32px,100%_100%,0%_100%)] [overflow:clip]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {eventCards
              .filter((card) => card.row === 1)
              .map((card) => (
                <EventHighlightCard key={card.id} {...card} />
              ))}
          </div>

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
    </motion.div>
  );
}
