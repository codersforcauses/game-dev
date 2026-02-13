// This carousel is for Artworks to be displayed in the Gameshowcase

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
//import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// import { UiEvent as EventType } from "@/hooks/useEvents";

// Artwork teams code once done replaces this
export type MockArtwork = {
  id: number;
  name: string;
  image: string;
  sourceGameId: number;
  gameName?: string;
};

type GameArtCarouselProps = {
  items: MockArtwork[];
};

const GAP = 20;

export default function GameArtCarousel({ items }: GameArtCarouselProps) {
  const firstItemRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  const maxIndex = Math.max(items.length - visibleCount, 0);

  const slideLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const translateX = -(currentIndex * (itemWidth + GAP));

  useEffect(() => {
    if (!firstItemRef.current) return;

    const observer = new ResizeObserver(() => {
      const width = firstItemRef.current?.clientWidth ?? 0;
      setItemWidth(width);
    });

    observer.observe(firstItemRef.current);

    return () => observer.disconnect();
  }, []);

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

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-jersey10 text-4xl text-white">Game Art Showcase</h2>

        <div className="flex gap-3 text-white">
          <ChevronLeft
            onClick={slideLeft}
            className={`hover:text-accent ${
              currentIndex === 0 ? "opacity-40" : "cursor-pointer"
            }`}
          />
          <ChevronRight
            onClick={slideRight}
            className={`hover:text-accent ${
              currentIndex === maxIndex ? "opacity-40" : "cursor-pointer"
            }`}
          />
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            gap: GAP,
            transform: `translateX(${translateX}px)`,
          }}
        >
          {items.map((art, index) => (
            <div
              key={art.id}
              ref={index === 0 ? firstItemRef : undefined}
              className="w-full flex-shrink-0 md:w-[calc((100%-48px)/3)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={art.image}
                  alt={art.name}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-lg text-white">{art.name}</h3>

              {art.gameName && (
                <p className="text-sm text-white/70">from {art.gameName}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
