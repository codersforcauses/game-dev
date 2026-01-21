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
      <ImageCard
        imageSrc={artwork.media || undefined}
        imageAlt={artwork.name}
        backContent={
          <div className="flex h-full flex-col gap-4">
            <div>
              <h3 className="mb-2 text-center font-jersey10 text-4xl leading-tight text-accent">
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
                <h4 className="mb-3 font-jersey10 text-[28px] leading-tight text-accent">
                  Contributors
                </h4>
                <div className="space-y-2.5">
                  {artwork.contributors.map((contributor) => (
                    <div
                      key={contributor.id}
                      className="flex items-center justify-between font-dmSans text-[15px] text-light_1"
                    >
                      <span className="pl-1">{contributor.member_name}</span>
                      <div className="flex items-center gap-2.5">
                        {contributor.instagram_url && (
                          <a
                            href={contributor.instagram_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent transition-colors hover:text-light_3"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${contributor.member_name} Instagram`}
                          >
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 34 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="shrink-0"
                            >
                              <path
                                d="M24.3708 9.05202H24.3847M9.74827 2.78522H23.6745C27.5201 2.78522 30.6376 5.90271 30.6376 9.74833V23.6746C30.6376 27.5202 27.5201 30.6377 23.6745 30.6377H9.74827C5.90265 30.6377 2.78516 27.5202 2.78516 23.6746V9.74833C2.78516 5.90271 5.90265 2.78522 9.74827 2.78522ZM22.2819 15.8341C22.4537 16.9931 22.2558 18.1768 21.7161 19.2168C21.1765 20.2568 20.3227 21.1002 19.2761 21.6269C18.2295 22.1537 17.0434 22.3371 15.8866 22.1509C14.7299 21.9648 13.6612 21.4186 12.8327 20.5901C12.0042 19.7616 11.458 18.693 11.2719 17.5362C11.0857 16.3794 11.2691 15.1933 11.7959 14.1468C12.3227 13.1002 13.166 12.2463 14.206 11.7067C15.246 11.1671 16.4297 10.9691 17.5887 11.141C18.771 11.3163 19.8655 11.8672 20.7106 12.7123C21.5557 13.5574 22.1066 14.6519 22.2819 15.8341Z"
                                stroke="currentColor"
                                strokeWidth="3.34229"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        )}
                        {contributor.discord_url && (
                          <a
                            href={contributor.discord_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent transition-colors hover:text-light_3"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${contributor.member_name} Discord`}
                          >
                            <svg
                              width="20"
                              height="16"
                              viewBox="0 0 42 31"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="shrink-0"
                            >
                              <path
                                d="M36.0299 3.42845C32.4106 0.515938 26.685 0.0222315 26.44 0.00447161C26.0599 -0.0274948 25.6976 0.185617 25.5413 0.53725C25.5271 0.55856 25.4028 0.846261 25.2643 1.29379C27.6582 1.6987 30.5992 2.51208 33.2595 4.16369C33.6857 4.42652 33.8172 4.98772 33.5543 5.41394C33.3803 5.69453 33.0855 5.84726 32.78 5.84726C32.6166 5.84726 32.4497 5.80109 32.3005 5.70874C27.7257 2.87081 22.0144 2.72874 20.9133 2.72874C19.8122 2.72874 14.0973 2.87081 9.52606 5.70874C9.09984 5.97513 8.53864 5.84371 8.27581 5.41749C8.00942 4.98772 8.14084 4.43008 8.56706 4.16369C11.2274 2.51563 14.1683 1.6987 16.5623 1.29734C16.4237 0.846261 16.2994 0.562113 16.2888 0.53725C16.1289 0.185617 15.7702 -0.034598 15.3866 0.00447161C15.1415 0.0222315 9.41595 0.515938 5.74689 3.46752C3.83245 5.2399 0 15.5971 0 24.5513C0 24.7111 0.0426222 24.8639 0.120763 25.0024C2.76334 29.6482 9.97714 30.8629 11.6216 30.9162C11.6288 30.9162 11.6394 30.9162 11.6501 30.9162C11.9413 30.9162 12.2148 30.7777 12.3853 30.5433L14.0476 28.2559C9.56158 27.098 7.27063 25.1303 7.13922 25.013C6.76272 24.6827 6.7272 24.1073 7.06107 23.7308C7.3914 23.3543 7.9668 23.3188 8.34329 23.6491C8.39657 23.6989 12.6162 27.2791 20.9133 27.2791C29.2246 27.2791 33.4442 23.6846 33.4868 23.6491C33.8633 23.3224 34.4352 23.3543 34.769 23.7344C35.0994 24.1109 35.0638 24.6827 34.6874 25.013C34.5559 25.1303 32.265 27.098 27.779 28.2559L29.4413 30.5433C29.6118 30.7777 29.8853 30.9162 30.1765 30.9162C30.1872 30.9162 30.1978 30.9162 30.2049 30.9162C31.8494 30.8629 39.0632 29.6482 41.7058 25.0024C41.7839 24.8639 41.8266 24.7111 41.8266 24.5513C41.8266 15.5971 37.9941 5.2399 36.0299 3.42845ZM15.003 20.9142C13.2448 20.9142 11.8206 19.2875 11.8206 17.2771C11.8206 15.2668 13.2448 13.64 15.003 13.64C16.7612 13.64 18.1855 15.2668 18.1855 17.2771C18.1855 19.2875 16.7612 20.9142 15.003 20.9142ZM26.8236 20.9142C25.0654 20.9142 23.6411 19.2875 23.6411 17.2771C23.6411 15.2668 25.0654 13.64 26.8236 13.64C28.5817 13.64 30.006 15.2668 30.006 17.2771C30.006 19.2875 28.5817 20.9142 26.8236 20.9142Z"
                                fill="currentColor"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        }
      >
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
        <h1
          data-layer="ALL CATEGORIES"
          className="AllCategories justify-start text-center font-jersey10 text-6xl font-bold leading-[76px] tracking-wide text-light_3"
        >
          FEATURED
        </h1>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
