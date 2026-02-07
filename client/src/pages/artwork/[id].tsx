import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

import GoBackButton from "@/components/ui/go-back-button";
import ImagePlaceholder from "@/components/ui/image-placeholder";
import ErrorModal from "@/components/ui/modal/error-modal";
import api from "@/lib/api";
import { Art } from "@/types/art";

interface ArtworkPageProps {
  artwork?: Art;
  error?: string;
}

function displayContributors(artwork: Art) {
  return (
    <div>
      <div
        data-layer="Artwork Details"
        className="ArtworkDetails flex flex-col justify-start gap-2.5 py-5"
      >
        <div
          data-layer="Contributors Section"
          className="ContributorsSection relative"
        >
          <div
            data-layer="Contributors"
            className="Contributors justify-start font-sans text-4xl font-normal tracking-wide text-light_3"
          >
            Contributors
          </div>
        </div>
        <div
          data-layer="Contributors List"
          className="ContributorsList relative flex flex-col gap-3 p-3"
        >
          {artwork.contributors.length > 0 && (
            <div className="mt-auto">
              <div className="space-y-2.5">
                {artwork.contributors.map((contributor) => (
                  <div
                    key={contributor.id}
                    className="font-sans text-[15px] text-light_1"
                  >
                    <a
                      href={`/members/${contributor.member_id}`}
                      className="text-accent hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {contributor.member_name}
                    </a>
                    {" - "}
                    <span>{contributor.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
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
              className="relative block sm:h-auto sm:max-w-full md:max-h-full"
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
              className="ArtName justify-start font-sans text-8xl font-normal leading-[76px] tracking-wide text-light_3"
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
                <span className="font-sans text-xl font-normal leading-8 tracking-wide text-light_1">
                  {artwork.description}
                </span>
              </div>
            </div>

            {displayContributors(artwork)}
          </div>
        </div>
      </div>

      <div className="p-10 md:hidden">
        <div
          data-layer="Art Name"
          className="ArtName flex justify-center font-sans text-8xl font-normal leading-[76px] tracking-wide text-light_3"
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

        {displayContributors(artwork)}
      </div>

      <div data-layer="Frame 1101" className="Frame1101 bg-slate-950 py-10">
        <div
          data-layer="Game Page"
          className="GamePage flex items-center justify-center bg-dark_2"
        >
          <Image
            alt="Game Image"
            data-layer="image 15"
            src="/placeholder1293x405.svg"
            width="1293"
            height="405"
            className="relative block p-5 sm:h-auto sm:max-w-full md:max-h-full md:w-auto"
          />
        </div>
      </div>
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
