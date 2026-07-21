import {
  animate,
  AnimationPlaybackControls,
  motion,
  useMotionValue,
} from "framer-motion";
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
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

export default function Shartwork({ artworks }: ArtworksPageProps) {
  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  const gap = 16; // px
  const FAST = 90;

  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const [speed] = useState(1); // multiplier

  useEffect(() => {
    const finalPosition = -(width + gap) / 3;

    const controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: FAST,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    controlsRef.current = controls;
    return controls.stop;
  }, [xTranslation, width]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.speed = speed;
    }
  }, [speed]);

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
            ref={ref}
            style={{ x: xTranslation }}
            onHoverStart={() => {
              // setSpeed(0.1);
              controlsRef.current?.pause();
            }}
            onHoverEnd={() => {
              controlsRef.current?.play();
              // console.log("hoverend");
              // setSpeed(1);
            }}
            onWheel={(e) => {
              xTranslation.set(xTranslation.get() - e.deltaY);
            }}
          >
            {/* we need two copies to make sure it doesn't randomly snap incorrectly  */}
            {[...items, ...items, ...items].map((item: Art, i: number) => (
              <div
                key={`${item.art_id} - ${i}`}
                style={{ transform: "translateZ(0)" }}
              >
                <ImageCard
                  imageSrc={item.media || undefined}
                  imageAlt={item.name}
                  href={`/artwork/${item.art_id}`}
                  backContent={<p> Hi </p>}
                />
              </div>
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
