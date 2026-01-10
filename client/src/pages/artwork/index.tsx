import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ImageCard from "@/components/ui/image-card";
import ErrorModal from "@/components/ui/modal/error-modal";
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
    <div data-layer="Art Page General" className="ArtPageGeneral">
      <div
        data-layer="Frame 1158"
        className="Frame1158 relative flex flex-col items-center gap-2 bg-light_2 py-40"
      >
        <div
          data-layer="ALL CATEGORIES"
          className="AllCategories justify-start text-center font-jersey10 text-6xl font-normal leading-[76px] tracking-wide text-light_3"
        >
          FEATURED:
          <br />
          SOME GAME
        </div>
        <div
          data-layer="Placeholder image"
          className="PlaceholderImage inline-flex items-center justify-center gap-2.5 p-2.5"
        >
          {PLACEHOLDER_ICON}
        </div>
        <div
          data-layer="Auto Layout Horizontal"
          className="AutoLayoutHorizontal items-start justify-start gap-6"
        >
          <Button
            variant="outline"
            size="lg"
            className="rounded-[10px] font-['Jersey_10'] text-xl font-normal leading-6 tracking-wide"
          >
            More about us →
          </Button>
        </div>
      </div>

      <div data-layer="Frame 1159" className="Frame1159 relative self-stretch">
        <div className="Frame1098 aligne flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-20 bg-slate-950 py-14 pl-28 pr-24">
          {artworks!.results.map((artwork) => renderArtworkCard(artwork))}
        </div>
      </div>
      <div
        data-layer="footer"
        className="Footer relative h-72 self-stretch overflow-hidden bg-indigo-950"
      >
        TODO add footer
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ArtworksPageProps
> = async () => {
  try {
    const res = await api.get<PageResult<Art>>("arts");
    return { props: { artworks: res.data } };
  } catch (err: unknown) {
    return {
      props: { error: (err as Error).message || "Failed to load artworks." },
    };
  }
};
