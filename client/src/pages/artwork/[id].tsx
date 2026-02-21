import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import ContributorsList from "@/components/ui/ContributorsList";
import GoBackButton from "@/components/ui/GoBackButton";
import ImagePlaceholder from "@/components/ui/image-placeholder";
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
    <div
      data-layer="Individual Game Page alt 9"
      className="IndividualGamePageAlt9"
    >
      <div
        data-layer="Frame 1100"
        className="Frame1100 mb-4 inline-flex flex-col items-start justify-center gap-10 bg-slate-950 p-3 md:pl-12"
      >
        <div
          data-layer="< Gallery"
          className="Gallery h-10 justify-start font-sans text-3xl font-bold leading-10 tracking-tight text-light_1"
        >
          <GoBackButton url="/artwork" label="Gallery" />
        </div>
      </div>

      <div
        data-layer="Artwork Content"
        className="ArtworkContent justify-start bg-neutral_1 md:flex"
      >
        <div
          data-layer="Artwork Image Panel"
          className="ArtworkImagePanel relative flex content-center justify-center"
        >
          {artwork.media ? (
            <Image
              src={artwork.media}
              alt="Artwork image"
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="relative block sm:h-auto sm:max-w-full md:max-h-full"
              priority={false}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        <div
          data-layer="Desktop Artwork Info"
          className="DesktopArtworkInfo relative hidden flex-auto p-10 md:flex"
        >
          <div className="flex flex-1 flex-col gap-10">
            <div
              data-layer="Art Name"
              className="ArtName text-light_3 justify-start font-jersey10 text-8xl font-normal leading-[76px] tracking-wide text-accent"
            >
              {artwork.name}
            </div>

            <div
              data-layer="Description Section"
              className="DescriptionSection flex-col items-start justify-start gap-7"
            >
              <div
                data-layer="Artwork Description"
                className="justify-start self-stretch"
              >
                <span className="mb-2 font-sans text-xl font-normal leading-8 tracking-wide text-light_1">
                  {artwork.description}
                </span>
              </div>
            </div>

            <ContributorsList contributors={artwork.contributors} />
          </div>
        </div>
      </div>

      <div className="p-10 md:hidden">
        <div
          data-layer="Art Name"
          className="ArtName text-light_3 flex justify-center font-sans text-8xl font-normal leading-[76px] tracking-wide"
        >
          {artwork.name}
        </div>

        <div
          data-layer="Description Section Mobile"
          className="DescriptionSectionMobile flex-col items-start justify-start pt-7"
        >
          <div className="justify-start self-stretch">
            <span className="font-sans text-xl font-normal leading-8 tracking-wide text-light_1">
              {artwork.description}
            </span>
          </div>
        </div>

        <ContributorsList contributors={artwork.contributors} />
      </div>

      <div
        data-layer="Frame 1101"
        className="Frame1101 bg-slate-950 py-10"
      ></div>
    </div>
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
