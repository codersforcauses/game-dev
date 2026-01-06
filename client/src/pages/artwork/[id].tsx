import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SocialIcon } from "react-social-icons";

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
        data-layer="Right Panel"
        className="RightPanel flex flex-col justify-start gap-2.5 py-5"
      >
        <div data-layer="Frame 1163" className="Frame1163 relative">
          <div
            data-layer="Contributors"
            className="Contributors text-light-3 justify-start font-['Jersey_10'] text-4xl font-normal tracking-wide"
          >
            Contributors
          </div>
        </div>
        <div
          data-layer="Frame 1164"
          className="Frame1164 relative flex flex-col gap-3 p-3"
        >
          {artwork.contributors?.map((contributor) => (
            <div className="flex flex-row justify-between" key={contributor.id}>
              <div className="text-light-1 justify-center font-['DM_Sans'] text-xl font-normal leading-8 tracking-wide [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">
                {contributor.member_name}
              </div>
              <div className="flex gap-2">
                {contributor.discord_url && (
                  <SocialIcon
                    url={contributor.discord_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ height: 30, width: 30 }}
                    bgColor="#9CA4FD"
                  />
                )}
                {contributor.instagram_url && (
                  <SocialIcon
                    url={contributor.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ height: 30, width: 30 }}
                    bgColor="#9CA4FD"
                  />
                )}
              </div>
            </div>
          ))}
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
          className="Gallery text-light-1 h-10 justify-start font-['DM_Sans'] text-3xl font-bold leading-10 tracking-tight"
        >
          <GoBackButton url="/artwork" label="Gallery" />
        </div>
      </div>
      <div
        data-layer="Frame 1099"
        className="Frame1099 bg-neutral-1 justify-start md:flex"
      >
        <div className="relative flex content-center justify-center">
          {artwork!.media ? (
            <Image
              src={artwork!.media}
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
          data-layer="Frame 1162"
          className="Frame1162 relative hidden flex-auto p-10 md:flex"
        >
          <div className="flex flex-1 flex-col gap-10">
            <div
              data-layer="Art Name"
              className="ArtName text-light-3 justify-start font-['Jersey_10'] text-8xl font-normal leading-[76px] tracking-wide"
            >
              {artwork!.name}
            </div>
            <div
              data-layer="Frame 1153"
              className="Frame1153 flex-col items-start justify-start gap-7"
            >
              <div
                data-layer="Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33 error molestias et repellat consequatur eum iste expedita est dolorem libero et quas provident! Eos placeat sunt nam expedita ratione sed quia voluptatem. Et laborum vitae est inventore obcaecati qui velit assumenda ab placeat voluptatem? Qui quisquam nihil non porro velit hic magni voluptatem nam porro voluptatem."
                className="justify-start self-stretch"
              >
                <span className="text-light-1 font-['DM_Sans'] text-xl font-normal leading-8 tracking-wide">
                  {artwork!.description}
                </span>
              </div>
            </div>
            {displayContributors(artwork!)}
          </div>
        </div>
      </div>
      <div className="p-10 md:hidden">
        <div
          data-layer="Art Name"
          className="ArtName text-light-3 flex justify-center font-['Jersey_10'] text-8xl font-normal leading-[76px] tracking-wide"
        >
          {artwork!.name}
        </div>
        <div
          data-layer="Frame 1153"
          className="Frame1153 flex-col items-start justify-start pt-7"
        >
          <div className="justify-start self-stretch">
            <span className="text-light-1 font-['DM_Sans'] text-xl font-normal leading-8 tracking-wide">
              {artwork!.description}
            </span>
          </div>
        </div>
        {displayContributors(artwork!)}
      </div>

      <div data-layer="Frame 1101" className="Frame1101 bg-slate-950 py-10">
        <div
          data-layer="Game Page"
          className="GamePage bg-dark-2 flex items-center justify-center"
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
      <div
        data-layer="footer"
        className="Footer h-72 overflow-hidden bg-indigo-950"
      >
        TODO add footer
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ArtworkPageProps> = async (
  context,
) => {
  const { id } = context.params as { id: string };
  try {
    const artResponse = await api.get<Art>(`arts/${id}`);
    const artwork = artResponse.data;
    return { props: { artwork } };
  } catch (err: unknown) {
    return {
      props: { error: (err as Error).message || "Failed to load artwork." },
    };
  }
};
