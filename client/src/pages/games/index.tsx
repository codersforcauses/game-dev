import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SocialIcon } from "react-social-icons";

import GameArtCarousel from "@/components/ui/GameArtCarousel";
import { useGameshowcase } from "@/hooks/useGameshowcase";
import { mockGameArtworks } from "@/placeholderDataArtGame"; // Mock data

export default function HomePage() {
  const { data: showcases, isPending, isError, error } = useGameshowcase();

  if (isPending) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p>Loading games...</p>
      </main>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Games not found."
        : "Failed to Load Games";
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
      </main>
    );
  }

  // Create a lookup table: { gameId: artwork[] }
  // O( Art + Game ) complexity
  const artworksByGame = mockGameArtworks.reduce<
    Record<number, typeof mockGameArtworks>
  >((acc, art) => {
    if (!acc[art.sourceGameId]) {
      acc[art.sourceGameId] = [];
    }
    acc[art.sourceGameId].push(art);
    return acc;
  }, {});

  return (
    <>
      <div
        className="mb-10 w-screen px-4 py-6"
        style={{
          background: "#23255A",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <h1
          className="text-left font-jersey10 text-4xl font-bold text-primary"
          style={{ marginLeft: "10%" }}
        >
          Game Showcase
        </h1>
      </div>
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        {!showcases || showcases.length === 0 ? (
          <p>No games available.</p>
        ) : (
          <div className="flex flex-col gap-32">
            {showcases.map((showcase, idx) => (
              <React.Fragment key={showcase.game_name + idx}>
                <div className="flex flex-col gap-8">
                  {/* Game CoverImage + Gameshowcase Detail */}
                  <div
                    className={`flex flex-col gap-8 rounded-xl p-8 ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Left: Cover Image */}
                    <div className="bg-logo-blue-1 flex min-h-[200] min-w-[200] max-w-[600] flex-1 items-center justify-center overflow-hidden rounded-xl">
                      {showcase.gameCover ? (
                        <Image
                          src={showcase.gameCover}
                          alt={showcase.game_name + " cover"}
                          width={600}
                          height={350}
                          className="h-full w-full object-cover"
                          priority
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center">
                          <Image
                            src="/game_dev_club_logo.svg"
                            alt="Default game cover"
                            className="h-20 w-20 object-contain"
                            priority
                          />
                        </div>
                      )}
                    </div>
                    {/* Right: Details */}
                    <div className="flex flex-1 flex-col justify-between rounded-lg border-2 border-solid border-neutral_3 p-8 shadow-lg">
                      <div>
                        {/* Title of the game */}
                        <h2 className="mb-4 font-jersey10 text-3xl font-bold tracking-wide text-primary">
                          <Link
                            href={
                              showcase.game_id
                                ? `/games/${showcase.game_id}`
                                : "#"
                            }
                          >
                            <span className="cursor-pointer hover:underline">
                              {showcase.game_name}
                            </span>
                          </Link>
                        </h2>
                        {/* Comments from committes */}
                        <p className="relative mb-6 pl-10 pr-10 text-lg text-foreground">
                          {/* double quotes from comments */}
                          <span
                            className="absolute left-0 top-0 select-none text-4xl text-primary"
                            aria-hidden="true"
                          >
                            “
                          </span>
                          {showcase.description}
                          <span
                            className="absolute bottom-0 right-0 select-none text-4xl text-primary"
                            aria-hidden="true"
                          >
                            ”
                          </span>
                        </p>
                        <h3 className="mb-2 text-xl font-bold text-primary">
                          Contributors
                        </h3>
                        <ul className="mb-4">
                          {showcase.contributors.map((contributor, cidx) => (
                            <li
                              key={contributor.name + cidx}
                              className="mb-2 flex items-center gap-4"
                            >
                              <span className="font-semibold text-foreground">
                                {contributor.name}
                              </span>
                              <span
                                className="text-foreground"
                                style={{ marginLeft: 20 }}
                              >
                                - {contributor.role}
                              </span>
                              {/* Social icons placeholder */}
                              {/* TODO: Add actual links */}
                              <span className="flex gap-2 text-primary">
                                {/* Social icons using react-social-icons */}
                                <SocialIcon
                                  url="https://facebook.com/"
                                  style={{ height: 24, width: 24 }}
                                />
                                <SocialIcon
                                  url="https://instagram.com/"
                                  style={{ height: 24, width: 24 }}
                                />
                                <SocialIcon
                                  url="https://github.com/"
                                  style={{ height: 24, width: 24 }}
                                />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Game Art Carousel */}
                  {(artworksByGame[showcase.game_id] || []).length > 0 && (
                    <GameArtCarousel
                      items={artworksByGame[showcase.game_id] || []}
                    />
                  )}

                  {/* Description */}
                  <div className="mx-auto w-full max-w-6xl px-8 text-base text-light_2">
                    {showcase.game_description}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
