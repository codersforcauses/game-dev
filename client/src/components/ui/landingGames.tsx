import Image from "next/image";
import Link from "next/link";

import { useGameshowcase } from "@/hooks/useGameshowcase";

export default function LandingGames() {
  const { data: showcases, isPending, isError, error } = useGameshowcase();
  if (isPending) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p>Loading games...</p>
      </main>
    );
  }

  if (!showcases || showcases.length === 0) {
    return (
      <div>
        <p> No Games Showcased Yet</p>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error?.response?.status === 404
        ? "Games not found."
        : "Failed to Load Games";
    return (
      <div>
        <p className="text-red-500" role="alert">
          {errorMessage}
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
      {showcases.slice(0, 3).map((game) => (
        <div
          key={game.game_id}
          className="rounded-xl p-6 text-background duration-200 ease-in-out hover:scale-110"
        >
          <Link key={game.game_id} href={`/games/${game.game_id}`}>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={game.gameCover}
                alt={game.game_name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mb-2 mt-4 font-jersey10 text-2xl text-white">
              {game.game_name}
            </h3>

            <p className="mb-4 truncate text-sm text-primary">
              {game.game_description}
            </p>
            <div className="h-px w-full bg-white/30" />
          </Link>
        </div>
      ))}
    </div>
  );
}
