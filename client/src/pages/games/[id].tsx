import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { SocialIcon } from "react-social-icons";

import { GameEmbed } from "@/components/ui/GameEmbed";
import { ItchEmbed } from "@/components/ui/ItchEmbed";
import { useEvent } from "@/hooks/useEvent";
import { useGame } from "@/hooks/useGames";

export default function IndividualGamePage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: game,
    isPending,
    error,
    isError,
  } = useGame(router.isReady ? id : undefined);
  const { data: eventData } = useEvent(
    game?.event ? String(game.event) : undefined,
  );

  if (isPending) {
    return (
      <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
        <p>Loading Game...</p>
      </main>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Game not found."
        : "Failed to Load Game";

    return (
      <main className="mx-auto min-h-screen max-w-6xl px-6 py-16 md:px-20">
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
      </main>
    );
  }

  if (!game) {
    return (
      <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
        <p>No Game data available.</p>
      </main>
    );
  }

  const gameTitle = game.name;
  const gameCover = game.gameCover;
  const gameDescription = game.description.split("\n");
  const gameEmbedID = game.itchGameEmbedID;
  const gameWidth = game.itchGameWidth;
  const gameHeight = game.itchGameHeight;
  const eventID = game.event;
  const eventName = eventData?.name || "";

  const completionLabels: Record<number, string> = {
    1: "WIP",
    2: "Playable Dev",
    3: "Beta",
    4: "Completed",
  };

  const devStage = completionLabels[game.completion] ?? "Stage Unknown";

  // TODO ADD ARTIMAGES
  const artImages: { src: string; alt: string }[] = [];
  // const artImages = [
  //   {
  //     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Minecraft_Zombie.png/120px-Minecraft_Zombie.png",
  //     alt: "Minecraft Zombie",
  //   },
  //   {
  //     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Minecraft_Enderman.png/120px-Minecraft_Enderman.png",
  //     alt: "Minecraft Enderman",
  //   },
  //   {
  //     src: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Minecraft_explore_landscape.png/375px-Minecraft_explore_landscape.png",
  //     alt: "Minecraft Landscape",
  //   },
  // ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        <section className="w-full items-center justify-center bg-popover">
          <div className="mx-auto flex max-w-7xl justify-center p-0 sm:p-8">
            {gameEmbedID ? (
              <div className="m-auto flex overflow-auto">
                <GameEmbed
                  embedID={gameEmbedID}
                  gameWidth={gameWidth}
                  gameHeight={gameHeight}
                  gameImage={gameCover}
                />
              </div>
            ) : (
              <Image
                src={gameCover}
                alt="Game Cover"
                width={800}
                height={800}
                className="max-h-[60vh] w-full object-cover sm:mx-auto sm:h-auto sm:max-h-[60vh] sm:rounded-2xl sm:object-contain"
                priority
              />
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8 lg:px-24 lg:py-12">
          <h1 className="mb-6 text-center font-jersey10 text-5xl font-bold tracking-wide text-primary sm:mb-10 sm:text-6xl">
            {gameTitle}
          </h1>
          <div className="mb-6 w-full max-w-full sm:float-right sm:mb-4 sm:ml-8 sm:w-96">
            <table className="w-full min-w-[220px] border-collapse border-spacing-0 text-sm sm:text-base">
              <tbody>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-1 pr-2 text-muted-foreground sm:py-2">
                    Contributors
                  </td>
                  <td className="py-1 text-right sm:py-2">
                    <div className="flex flex-col gap-y-1">
                      {game.contributors.map((c) => (
                        <div
                          key={c.member_id}
                          className="flex items-center gap-x-2"
                        >
                          <Link
                            href={`/members/${c.member_id}`}
                            className="text-primary hover:underline"
                          >
                            {c.name}
                          </Link>
                          {Array.isArray(c.social_media) &&
                            c.social_media.map((sm) => (
                              <SocialIcon
                                key={sm.link}
                                url={sm.link}
                                style={{ height: 24, width: 24 }}
                                title={sm.socialMediaUserName}
                              />
                            ))}
                          <span className="ml-auto">{c.role}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-1 pr-2 text-muted-foreground sm:py-2">
                    Development Stage
                  </td>
                  <td className="py-1 text-right sm:py-2">{devStage}</td>
                </tr>
                {game.hostURL && (
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-1 pr-2 text-muted-foreground sm:py-2">
                      Host Site
                    </td>
                    <td className="py-1 text-right sm:py-2">
                      <a
                        href={game.hostURL}
                        className="text-primary underline hover:underline"
                      >
                        {game.hostURL}
                      </a>
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="py-1 pr-2 text-muted-foreground sm:py-2">
                    Event
                  </td>
                  <td className="py-1 text-right sm:py-2">
                    {eventID && eventName ? (
                      <Link
                        href={`/events/${eventID}`}
                        className="text-primary hover:underline"
                      >
                        {eventName}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">
                        No past/upcoming event
                      </span>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="space-y-3 text-base leading-8 sm:text-lg lg:text-xl">
            {gameDescription.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 flex w-full flex-col items-center gap-6">
          <ItchEmbed embedID={game.itchEmbedID} name={gameTitle} />

          <h2 className="font-jersey10 text-5xl text-primary">ARTWORK</h2>

          <div className="mx-auto mb-6 flex h-auto w-full max-w-4xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-center sm:gap-6 sm:px-6 md:h-60">
            {artImages.map((img) => (
              <div
                key={img.src}
                className="h-48 w-full overflow-hidden rounded-lg bg-popover shadow-md sm:h-60 sm:w-1/3"
              >
                <Image
                  key={img.alt}
                  src={img.src}
                  alt={img.alt}
                  width={240}
                  height={240}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
