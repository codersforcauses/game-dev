import { ArrowLeft } from "lucide-react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import ContributorsList from "@/components/ui/ContributorsList";
import ErrorModal from "@/components/ui/modal/error-modal";
import api from "@/lib/api";
import { Art } from "@/types/art";

interface ArtworkPageProps {
  artwork?: Art;
  error?: string;
}

export default function ArtworkPage({ artwork, error }: ArtworkPageProps) {
  const router = useRouter();

  if (error) {
    return <ErrorModal message={error} onClose={() => router.back()} />;
  }

  if (!artwork) {
    return (
      <ErrorModal
        message="Artwork not found."
        onClose={() => router.push("/artwork")}
      />
    );
  }

  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
      <Link href="/artwork">
        <Button size="leftIcon" className="mb-5">
          <ArrowLeft /> Back to Showcase
        </Button>
      </Link>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-shrink-0">
          <Image
            src={artwork.media ?? "/game_dev_club_logo.svg"}
            alt="Artwork image"
            width={500}
            height={500}
            className="h-auto w-auto object-contain"
            priority={false}
          />
        </div>

        <div className="flex flex-col justify-start rounded-sm bg-neutral_1 px-10 py-6">
          <p className="justify-start font-jersey10 text-5xl text-accent">
            {artwork.name}
          </p>
          <p className="mb-6">{artwork.description}</p>

          <ContributorsList contributors={artwork.contributors} />
        </div>
      </div>
    </main>
  );
}

type FeaturedResponse = Art[] | { results: Art[] };

export const getServerSideProps: GetServerSideProps<ArtworkPageProps> = async (
  context,
) => {
  const { id } = context.params as { id: string };

  try {
    // We only have this endpoint, so reuse it and pick the item by art_id
    const res = await api.get<FeaturedResponse>("arts/featured");
    const data = res.data;

    const list: Art[] = Array.isArray(data) ? data : (data?.results ?? []);
    const artwork = list.find((a) => String(a.art_id) === String(id));

    if (!artwork) return { notFound: true };

    return { props: { artwork } };
  } catch (err: unknown) {
    return {
      props: { error: (err as Error).message || "Failed to load artwork." },
    };
  }
};
