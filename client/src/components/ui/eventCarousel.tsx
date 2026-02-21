import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { UiEvent as EventType } from "@/hooks/useEvents";

import { Button } from "./button";
import { EventDateDisplay } from "./EventDateDisplay";

type EventCarouselProps = {
  items: EventType[];
};

const GAP = 40;

export default function EventCarousel({ items }: EventCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [itemWidth, setItemWidth] = useState(0);

  const isEmpty = items.length === 0;

  const maxIndex = Math.max(items.length - visibleCount, 0);
  const slideLeft = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  const slideRight = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };
  const translateX = -(currentIndex * (itemWidth + GAP));

  /* Observe item width – re-run when items change so we measure after first item mounts */
  useEffect(() => {
    const el = firstItemRef.current;
    if (!el || items.length === 0) return;
    const readWidth = () => {
      requestAnimationFrame(() => {
        const w = firstItemRef.current?.clientWidth ?? 0;
        setItemWidth(w);
      });
    };
    readWidth();
    const observer = new ResizeObserver(readWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items.length]);

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
          {!isEmpty && (
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
          )}
        </div>

        {!isEmpty && (
          <Link href="/events" className="font-jersey10">
            <Button>See More</Button>
          </Link>
        )}
      </div>

      {isEmpty && (
        <p className="mt-10 px-10 text-sm text-primary">No events available.</p>
      )}

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
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                ref={index === 0 ? firstItemRef : undefined}
                className={`block w-full flex-shrink-0 rounded-xl transition-transform duration-200 ease-in-out hover:scale-110 md:w-[calc((100%-80px)/3)] ${index === 0 ? "origin-left" : ""}`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                  <Image
                    src={event.coverImage}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mb-2 mt-4 font-jersey10 text-2xl text-white">
                  {event.name}
                </h3>

                <p className="mb-4 text-base text-primary">
                  <EventDateDisplay date={event.date} />
                </p>

                <div className="mt-3 w-full border-b border-white/20" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
