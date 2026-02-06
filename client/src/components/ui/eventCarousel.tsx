import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { UiEvent as EventType } from "@/hooks/useEvents";

type EventCarouselProps = {
  items: EventType[];
};

const GAP = 40;

export default function EventCarousel({ items }: EventCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);

  const maxIndex = Math.max(items.length - visibleCount, 0);
  const slideLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const slideRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };
  const translateX = -(currentIndex * (itemWidth + GAP));

  /* Observe item width */
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
          See More
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
            {items.map((event, index) => (
              <div
                key={event.id}
                ref={index === 0 ? firstItemRef : undefined}
                className="w-full flex-shrink-0 md:w-[calc((100%-80px)/3)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Image
                    src={event.coverImage}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 font-firaCode text-lg font-semibold tracking-wide text-white">
                  {event.name}
                </h3>

                {/* Needs proper processing and laying out */}
                <p className="text-sm tracking-wide text-white/70">
                  {event.startTime}
                </p>

                <div className="mt-3 w-full border-b border-white/20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
