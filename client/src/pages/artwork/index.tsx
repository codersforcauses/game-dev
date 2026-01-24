import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

const PLACEHOLDER_ICON = (
  <div data-svg-wrapper data-layer="Vector" className="Vector">
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96 85.3333V10.6667C96 4.8 91.2 0 85.3333 0H10.6667C4.8 0 0 4.8 0 10.6667V85.3333C0 91.2 4.8 96 10.6667 96H85.3333C91.2 96 96 91.2 96 85.3333ZM29.3333 56L42.6667 72.0533L61.3333 48L85.3333 80H10.6667L29.3333 56Z"
        fill="var(--neutral-1, #1B1F4C)"
      />
    </svg>
  </div>
);

function renderArtworkCard(artwork: Art) {
  return (
    <ImageCard
      key={artwork.id}
      imageSrc={artwork.media || undefined}
      imageAlt={artwork.name}
      href={`/artwork/${artwork.id}`}
      backContent={
        <div className="flex h-full flex-col gap-4">
          <div>
            <h3 className="mb-2 text-center font-sans text-4xl leading-tight text-accent">
              {artwork.name}
            </h3>
            <p className="mb-3 text-center font-dmSans text-xs text-light_1">
              from GAME NAME
            </p>
            <p className="font-dmSans text-sm leading-relaxed text-light_1">
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
                    className="font-dmSans text-[15px] text-light_1"
                  >
                    <span className="pl-1">{contributor.member_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Link
            href={`/artwork/${artwork.id}`}
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
          {artworks?.results.slice(0, 3).map(renderArtworkCard)}
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ArtworksPageProps
> = async () => {
  try {
    const res = await api.get<PageResult<Art>>("arts");
    return { props: { artworks: res.data } };
    //} catch (err: unknown) {
  } catch {
    // return {
    //   props: { error: (err as Error).message || "Failed to load artworks." },
    // };

    // Fallback to mock data on error
    const mockArtworks = generateMockArtworks(3);
    return {
      props: {
        artworks: {
          results: mockArtworks,
          count: mockArtworks.length,
          next: "",
          previous: "",
        },
      },
    };
  }
};
