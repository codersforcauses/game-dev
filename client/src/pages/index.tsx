import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "../components/ui/button";
import { useExplosions } from "../hooks/useExplosions";
import { Explosion } from "../components/ui/Explosion";
import { DebrisBurst } from "../components/ui/DebrisBurst";

export default function Landing() {
  const { explosions, triggerExplosions } = useExplosions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickDebris, setClickDebris] = useState<Array<{ id: number; x: number; y: number }>>([]);

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
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

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
    });

    // Add DebrisBurst for click
    const debrisId = Date.now();
    setClickDebris((prev) => [...prev, { id: debrisId, x: absoluteX, y: absoluteY }]);
    
    // Remove after animation completes
    setTimeout(() => {
      setClickDebris((prev) => prev.filter((d) => d.id !== debrisId));
    }, 3000);

    // Manually create explosion with crater at click position
    if (containerRef.current) {
      // Generate irregular crater path
      const points = 12;
      const path: string[] = [];
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const randomRadius = 0.7 + Math.random() * 0.3;
        const px = 50 + Math.cos(angle) * randomRadius * 50;
        const py = 50 + Math.sin(angle) * randomRadius * 50;
        path.push(`${px}% ${py}%`);
      }
      const craterPath = `polygon(${path.join(", ")})`;

      // Create the crater
      const crater = document.createElement("div");
      crater.className = "pointer-events-none absolute z-40";
      crater.style.left = `${x}%`;
      crater.style.top = `${y}%`;
      crater.style.transform = "translate(-50%, -50%)";
      crater.style.width = "100px";
      crater.style.height = "100px";
      crater.style.clipPath = craterPath;
      crater.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
      crater.style.animation = "crater-fade 3s ease-out forwards";
      
      // Create the explosion GIF
      const newExplosion = document.createElement("div");
      newExplosion.className = "pointer-events-none absolute z-50";
      newExplosion.style.left = `${x}%`;
      newExplosion.style.top = `${y}%`;
      newExplosion.style.transform = "translate(-50%, -50%)";
      
      const img = document.createElement("img");
      img.src = "/explosions/samj_cartoon_explosion.gif";
      img.alt = "Explosion";
      img.width = 150;
      img.height = 150;
      
      newExplosion.appendChild(img);
      containerRef.current.appendChild(crater);
      containerRef.current.appendChild(newExplosion);
      
      setTimeout(() => {
        crater.remove();
        newExplosion.remove();
      }, 3000);
    }
  };
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
  const eventCards = [
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

  return (
    <div className="relative" ref={containerRef} onClick={handlePageClick}>
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
          count={26}
          power={520}
          spreadDeg={360}
          gravity={1500}
          bounce={0.28}
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
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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
                  className={`${index < logoImages.length - 1 ? "lg:mb-5" : ""} ${logo.position === "end" ? "lg:self-end" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
