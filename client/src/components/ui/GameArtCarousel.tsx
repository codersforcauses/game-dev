// This carousel is for Artworks to be displayed in the Gameshowcase

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
//import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { UiArtwork } from "@/hooks/useGames";

// import { UiEvent as EventType } from "@/hooks/useEvents";

type GameArtCarouselProps = {
  items: UiArtwork[];
};

const GAP = 20;
const maxItemsPerPage = 4;

export default function GameArtCarousel({ items }: GameArtCarouselProps) {
  const firstItemRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(maxItemsPerPage);

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
        setVisibleCount(maxItemsPerPage);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="relative">
        {/* LEFT ARROW */}
        <button
          onClick={slideLeft}
          disabled={currentIndex === 0}
          className="absolute left-[-50px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-dark_3 text-white shadow-md hover:bg-accent disabled:opacity-30"
        >
          <ChevronLeft size={30} />
        </button>

        {/* VIEWPORT */}
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
                className="flex-shrink-0"
                style={{
                  width: `calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
                }}
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
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={slideRight}
          disabled={currentIndex === maxIndex}
          className="absolute right-[-50px] top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-dark_3 text-white shadow-md hover:bg-accent disabled:opacity-30"
        >
          <ChevronRight size={30} />
        </button>
      </div>
    </div>
  );
}
