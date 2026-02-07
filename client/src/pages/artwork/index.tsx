import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"; // ✅ pages router (not next/navigation)

import ImageCard from "@/components/ui/image-card";
import ErrorModal from "@/components/ui/modal/error-modal";
import { generateMockArtworks } from "@/hooks/use-artwork-data";
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

const PLACEHOLDER_ICON = (
  <div data-svg-wrapper data-layer="Vector" className="Vector">
    <Image
      src="/placeholder-icon.svg"
      alt="Placeholder icon"
      width={96}
      height={96}
    />
  </div>
);

function renderArtworkCard(artwork: Art) {
  return (
    <ImageCard
      key={artwork.art_id}
      imageSrc={artwork.media || undefined}
      imageAlt={artwork.name}
      href={`/artwork/${artwork.art_id}`}
      backContent={
        <div className="flex h-full flex-col gap-4">
          <div>
            <h3 className="mb-2 text-center font-sans text-4xl leading-tight text-accent">
              {artwork.name}
            </h3>
            <p className="mb-3 text-center font-sans text-xs text-light_1">
              {artwork.source_game_name ? (
                <>
                  from{" "}
                  <a
                    href={`/games/${artwork.source_game_id}`}
                    className="text-accent hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {artwork.source_game_name}
                  </a>
                </>
              ) : (
                "No associated game"
              )}
            </p>
            <p className="font-sans text-sm leading-relaxed text-light_1">
              {artwork.description || "No description available."}
            </p>
          </div>

          {artwork.contributors.length > 0 && (
            <div className="mt-auto">
              <h4 className="mb-3 font-sans text-[28px] leading-tight text-accent">
                Contributors
              </h4>
              <div className="space-y-2.5">
                {artwork.contributors.map((contributor) => (
                  <div
                    key={contributor.id}
                    className="font-sans text-[15px] text-light_1"
                  >
                    <Link
                      href={`/members/${contributor.member_id}`}
                      className="pl-1 text-accent hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contributor.member_name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/artwork/${artwork.art_id}`}
            className="mt-4 rounded-md border border-accent bg-accent/10 px-4 py-2 text-center font-sans text-lg text-accent transition-colors hover:bg-accent hover:text-dark_3"
            onClick={(e) => e.stopPropagation()}
          >
            VIEW FULL DETAILS
          </Link>
        </div>
      }
    >
      {!artwork.media && PLACEHOLDER_ICON}
    </ImageCard>
  );
}

export default function ArtworksPage({ artworks, error }: ArtworksPageProps) {
  const router = useRouter();
  if (error) {
    return <ErrorModal message={error} onClose={() => router.back()} />;
  }

  const featuredArtworks = artworks?.results?.slice(0, 3) ?? [];

  return (
    <div className="bg-gamedev-dark min-h-screen">
      <section className="px-6 py-10 md:px-24 md:py-14">
        <h1
          data-layer="ALL CATEGORIES"
          className="AllCategories justify-start text-center font-sans text-6xl font-bold leading-[76px] tracking-wide text-light_3"
        >
          FEATURED
        </h1>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {featuredArtworks.map(renderArtworkCard)}
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
    // Fallback to mock data on any error (network, 500, invalid shape, etc.)
    const mockArtworks = generateMockArtworks(3);
    return {
      props: {
        artworks: {
          results: mockArtworks,
          count: mockArtworks.length,
          next: "",
          previous: "",
        },
        error: err instanceof Error ? err.message : undefined,
      },
    };
  }
};
