import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { GetServerSideProps } from "next";
import { useCallback, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";

import ImageCard from "@/components/ui/ImageCard";
import api from "@/lib/api";
import { Art } from "@/types/art";

export interface PageResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
interface ArtworksPageProps {
  artworks?: PageResult<Art>;
  error?: string;
}

function hasResultsArray<T>(value: unknown): value is { results: T[] } {
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;
  return Array.isArray(v.results);
}

const GAP = 16;
const DURATION = 90;

export default function FeaturedArtwork({ artworks }: ArtworksPageProps) {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
  const scrollX = useMotionValue(0);
  const isHoveredMV = useMotionValue(0);

  // switch x source to scrollX on hover
  const displayX = useTransform(
    [xTranslation, scrollX, isHoveredMV],
    ([t, s, h]: number[]) => (h === 0 ? t : s),
  );

  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const hasScrolledRef = useRef(false);

  const startAnimation = useCallback(
    (from: number) => {
      const finalPosition = -(width + GAP) / 3;
      const rangeSize = -finalPosition;

      controlsRef.current?.stop();

      // Normalize `from` into [finalPosition, 0) so the loop restarts cleanly
      const normalizedFrom = -(((-from % rangeSize) + rangeSize) % rangeSize);
      xTranslation.set(normalizedFrom);

      const startFullLoop = () => {
        const controls = animate(xTranslation, [0, finalPosition], {
          ease: "linear",
          duration: DURATION,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
        controlsRef.current = controls;
      };

      // if we've scrolled beyond finalPosition, jump back to start
      const remaining = Math.abs(finalPosition - normalizedFrom);
      if (remaining < 0.5) {
        xTranslation.set(0);
        startFullLoop();
        return;
      }

      // animate the rest of the cycle, then resume
      const partialDuration = DURATION * (remaining / rangeSize);
      const controls = animate(xTranslation, finalPosition, {
        ease: "linear",
        duration: partialDuration,
        onComplete: startFullLoop,
      });
      controlsRef.current = controls;
    },
    [xTranslation, width],
  );

  useEffect(() => {
    startAnimation(0);
    return () => {
      controlsRef.current?.stop();
    };
  }, [startAnimation]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (!isHoveredRef.current) return;
      e.preventDefault();
      if (!hasScrolledRef.current) {
        scrollX.set(xTranslation.get());
        isHoveredMV.set(1);
        controlsRef.current?.pause();
        hasScrolledRef.current = true;
      }
      const rangeSize = (width + GAP) / 3;
      const next = scrollX.get() - e.deltaY;
      const normalized = -(((-next % rangeSize) + rangeSize) % rangeSize);
      scrollX.set(normalized);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [isHoveredMV, scrollX, xTranslation, width]);

  const items = artworks?.results ?? [];
  return (
    <div className="bg-gamedev-dark min-h-screen overflow-x-hidden">
      <section className="flex flex-col items-center px-6 py-10 md:px-24 md:py-14">
        <h1 className="text-center font-jersey10 text-6xl font-bold leading-[76px] tracking-wide text-primary">
          Featured Artwork
        </h1>
        <div className="overflow-hidden py-8">
          <motion.div
            className={`flex gap-[16px] overflow-hidden`}
            ref={(el) => {
              ref(el);
              containerRef.current = el;
            }}
            style={{ x: displayX }}
            onHoverStart={() => {
              isHoveredRef.current = true;
              hasScrolledRef.current = false;
            }}
            onHoverEnd={() => {
              isHoveredRef.current = false;
              if (hasScrolledRef.current) {
                const current = scrollX.get();
                xTranslation.set(current);
                isHoveredMV.set(0);
                startAnimation(current);
              }
              hasScrolledRef.current = false;
            }}
          >
            {/* we need three copies to make sure it doesn't randomly snap incorrectly  */}
            {[...items, ...items, ...items].map((item: Art, i: number) => (
              <motion.div
                key={`${item.art_id} - ${i}`}
                style={{ transform: "translateZ(0)" }}
                whileHover={{ scale: 1.05, zIndex: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <ImageCard
                  imageSrc={item.media || undefined}
                  imageAlt={item.name}
                  href={`/artwork/${item.art_id}`}
                  backContent={<p> Hi </p>}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ArtworksPageProps
> = async () => {
  try {
    const res = await api.get("arts/featured");
    const data = res.data as unknown;

    // Accept either: PageResult<Art> OR Art[]
    const results: Art[] | null = Array.isArray(data)
      ? (data as Art[])
      : hasResultsArray<Art>(data)
        ? data.results
        : null;

    // If API didn't throw but returned an unexpected shape, trigger fallback
    if (!results) throw new Error("Invalid arts/featured response shape");

    return {
      props: {
        artworks: {
          results,
          count: results.length,
          next: "",
          previous: "",
        },
      },
    };
  } catch (err) {
    return {
      props: {
        artworks: {
          results: [],
          count: 0,
          next: "",
          previous: "",
        },
        error: err instanceof Error ? err.message : undefined,
      },
    };
  }
};
