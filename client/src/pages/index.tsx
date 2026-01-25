import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "../components/ui/button";
import { useExplosions } from "../hooks/useExplosions";
import { Explosion } from "../components/ui/Explosion";

export default function Landing() {
  const { explosions, triggerExplosions } = useExplosions();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExplosionClick = () => {
    triggerExplosions({
      count: 5,
      minDelay: 0,
      maxDelay: 300,
      duration: 1500,
      playSound: true,
    });
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Create explosion at click position
    triggerExplosions({
      count: 1,
      minDelay: 0,
      maxDelay: 0,
      duration: 1500,
      playSound: true,
    });

    // Manually create explosion with crater at click position
    if (containerRef.current) {
      // Create the crater
      const crater = document.createElement("div");
      crater.className = "pointer-events-none absolute z-40";
      crater.style.left = `${x}%`;
      crater.style.top = `${y}%`;
      crater.style.transform = "translate(-50%, -50%)";
      crater.style.width = "100px";
      crater.style.height = "100px";
      crater.style.borderRadius = "50%";
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
    { name: "More about us", link: "/committee/about" },
    { name: "Join our Discord", link: "" },
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
              className="size-20 px-3"
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
            <div className="mt-4 flex gap-4">
              {btnList.map((item, i) => (
                <Link href={item.link} key={i}>
                  <Button>{item.name}</Button>
                </Link>
              ))}
              <Button onClick={handleExplosionClick}>Press Me!</Button>
            </div>
          </div>

          <Image
            src="/landing_placeholder.png"
            width={600}
            height={430}
            alt="placeholder"
            className="rounded-md"
          />
        </div>
      </section>

      <section className="bg-dark_3 py-16">
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
