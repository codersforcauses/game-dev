import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { UiEvent as EventType } from "@/hooks/useEvents";

import { Button } from "./button";

type EventCarouselProps = {
  items: EventType[];
};

const GAP = 40;

function formatEventDateDisplay(dateString: string): string {
  try {
    const date = new Date(dateString);
    const weekday = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(date);
    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
      date,
    );
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date,
    );
    const time = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .replace("AM", "am")
      .replace("PM", "pm");
    return `${weekday} ${day} ${month} ${time}`;
  } catch {
    return "";
  }
}

export default function EventCarousel({ items }: EventCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLAnchorElement>(null);

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
          <Button>See More {`>`}</Button>
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
              <Link
                href={`/events/${event.id}`}
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

                <h3 className="mb-2 mt-4 font-jersey10 text-2xl text-white">
                  {event.name}
                </h3>

                {/* Needs proper processing and laying out */}
                <p className="mb-4 text-sm text-primary">
                  {formatEventDateDisplay(event.date)}
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
