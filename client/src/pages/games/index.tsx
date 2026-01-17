import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Game = {
  id: number;
  name: string;
  description: string;
  completion: number;
  active: boolean;
  isItch: boolean;
  pathToThumbnail: string | null;
};

const completionLabels: Record<number, string> = {
  1: "WIP",
  2: "Playable Dev",
  3: "Beta",
  4: "Completed",
};

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/gamesAPI/games/")
      .then((res) => res.json())
      .then((data: Game[]) => {
        setGames(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <p>Loading games...</p>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-16">
        <h1 className="mb-10 font-jersey10 text-4xl font-bold">
          Games Showcase
        </h1>

        {games.length === 0 ? (
          <p>No games available.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="rounded-lg bg-[#232345] p-6 hover:bg-[#2d2f55]"
              >
                <Image
                  src={game.pathToThumbnail || "/game_dev_club_logo.svg"}
                  alt="Game Cover"
                  width={500}
                  height={500}
                  className="mx-auto mb-4 h-auto max-h-[40vh] w-full rounded-2xl object-contain"
                  priority
                />

                <Link href={`/games/${game.id}`}>
                  <h2 className="font-jersey10 text-xl font-bold tracking-wide text-[#9ca4fd] hover:underline">
                    {game.name}
                  </h2>
                </Link>

                <p className="mt-2 line-clamp-3 text-gray-300">
                  {game.description}
                </p>

                <p className="mt-4 text-sm text-gray-400">
                  {completionLabels[game.completion] ?? "Unknown"}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
