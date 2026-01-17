import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ImageCard from "@/components/ui/image-card";
import ErrorModal from "@/components/ui/modal/error-modal";
import { generateMockArtworks } from "@/hooks/use-artwork-data";
import api from "@/lib/api";
import { Art } from "@/types/art";
import { PageResult } from "@/types/page-response";

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
    <Link
      href={`/artwork/${artwork.id}`}
      key={artwork.id}
      data-layer="Frame 1120"
      className="Frame1120"
      title={artwork.name}
    >
      <ImageCard imageSrc={artwork.media || undefined} imageAlt={artwork.name}>
        {!artwork.media && PLACEHOLDER_ICON}
      </ImageCard>
    </Link>
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
        <h1 className="text-gamedev-medium-purple mb-12 text-center font-jersey10 text-5xl leading-tight tracking-wide md:mb-16 md:text-6xl lg:text-[64px]">
          FEATURED
        </h1>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {artworks?.results.map(renderArtworkCard)}
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
    const mockArtworks = generateMockArtworks(12);
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
