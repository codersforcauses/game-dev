import Image from "next/image";
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
  const { data: games, isPending, isError, error } = useContributor(props.id);

  {
    /* Error handling from Games Showcase page */
  }
  if (isPending) {
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p>Loading games...</p>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Games not found."
        : "Failed to Load Games";
    return (
      <div className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {!games || games.length === 0 ? (
        <p> No games available. </p>
      ) : (
        <div className="m-auto my-5 flex flex-wrap justify-center gap-8">
          {games.map((game) => (
            <React.Fragment key={game.game_id}>
              <div className="w-fit rounded-md p-5">
                <div className="mb-2 h-44 w-96 overflow-clip rounded-md">
                  <Image
                    src={getGameCoverUrl(game.game_data.thumbnail)}
                    alt={`${game.game_data.name} cover image`}
                    width={384}
                    height={176}
                  />
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
