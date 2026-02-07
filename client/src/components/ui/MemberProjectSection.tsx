import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useContributor } from "@/hooks/useContributor";

type MemberProjectSectionProps = {
  id: string;
};

// From useGamesShowcase
function getGameCoverUrl(
  game_cover_thumbnail: string | null | undefined,
): string {
  if (!game_cover_thumbnail) return "/game_dev_club_logo.svg";
  if (game_cover_thumbnail.startsWith("http")) return game_cover_thumbnail;
  // Use environment variable for Django backend base URL
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  return `${apiBaseUrl}${game_cover_thumbnail}`;
}

export default function MemberProjectSection(props: MemberProjectSectionProps) {
  const { data: games, isError, error } = useContributor(props.id);

  {
    /* Error handling from Games Showcase page */
  }
  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Games not found."
        : "Failed to Load Games";
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p
          className="my-10 text-center font-firaCode text-lg text-red-500"
          role="alert"
        >
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {!games || games.length === 0 ? (
        <p className="my-10 text-center font-firaCode text-lg text-[--light-3]">
          No games available.
        </p>
      ) : (
        <div className="m-auto my-5 flex flex-wrap justify-center gap-8">
          {games.map((game) => (
            <React.Fragment key={game.game_id}>
              <div className="w-fit rounded-md p-5">
                <div className="group mb-2 grid h-44 w-96 grid-cols-1 grid-rows-1 overflow-clip rounded-md">
                  <Image
                    src={getGameCoverUrl(game.game_data.thumbnail)}
                    alt={`${game.game_data.name} cover image`}
                    width={384}
                    height={176}
                    className="group-hover:brightness-75 group-hover:duration-200"
                  />
                  <Link
                    className="mt-[-165px] hidden place-self-center rounded-md bg-accent p-3 font-firaCode text-light_1 drop-shadow-md hover:underline group-hover:block group-hover:blur-0 group-hover:duration-200"
                    href={`/games/${game.game_id}`}
                  >
                    Visit Game
                  </Link>
                </div>
                <p className="max-w-96 font-firaCode text-xl font-semibold">
                  {game.game_data.name}
                </p>
                <p className="line-clamp-1 max-w-96 font-firaCode text-[--light-3]">
                  {game.game_data.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
