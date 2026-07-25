import { GetServerSideProps } from "next";

import ContinuousCarousel from "@/components/ui/ContinuousCarousel";
import api from "@/lib/api";
import { Art } from "@/types/art";

export interface PageResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
interface ArtworksPageProps {
  carousels?: Art[][];
  error?: string;
}

function hasResultsArray<T>(value: unknown): value is { results: T[] } {
  if (typeof value !== "object" || value === null) return false;

  const v = value as Record<string, unknown>;
  return Array.isArray(v.results);
}

// Durstenfeld shuffle
function shuffleArray<T>(arr: T[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export default function FeaturedArtwork({ carousels = [] }: ArtworksPageProps) {
  return (
    <div className="bg-gamedev-dark min-h-screen overflow-x-hidden">
      <section className="flex flex-col items-center bg-muted px-12 pb-16 pt-12 sm:pb-12 md:px-24">
        <h1 className="text-center font-jersey10 text-6xl font-bold leading-[76px] tracking-wide text-primary">
          Featured Artwork
        </h1>
        <p className="max-w-xl text-center text-base leading-relaxed text-white/80">
          Some of our favourite art from our members&apos; games!
          <br />
          Click on an artwork to see more...
        </p>
      </section>

      <section className="-mt-8 bg-gradient-to-b from-dark_3 to-dark_alt py-8 [clip-path:polygon(0%_0%,20%_0%,calc(20%+32px)_32px,100%_32px,100%_100%,0%_100%)] [overflow:clip]">
        {carousels.map((items, i) => ContinuousCarousel(items, i % 2 === 0))}
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

    const carousels = [0, 1, 2].map(() => {
      const copy = structuredClone(results);
      shuffleArray(copy);
      return copy;
    });

    return { props: { carousels } };
  } catch (err) {
    return {
      props: {
        carousels: [],
        error: err instanceof Error ? err.message : undefined,
      },
    };
  }
};
