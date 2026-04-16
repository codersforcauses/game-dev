import { ArrowUpRight , Gamepad2,Palette } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { ArtData,GameData } from "@/hooks/useContributor";

export default function MemberProjectSection(props: {
  games: GameData[];
  art: ArtData[];
}) {
  const { games, art } = props;
  return (
    <>
      <h2 className="mt-7 flex justify-center text-center font-jersey10 text-5xl">
        Games
        <Gamepad2 size={32} className="ml-2 self-center text-yellow-300" />
      </h2>
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
                      src={game.game_data.thumbnail || "/placeholder-icon.svg"}
                      alt={`${game.game_data.name} cover image`}
                      width={384}
                      height={176}
                      className="group-hover:brightness-75 group-hover:duration-200"
                    />
                    <Link
                      className="mb-16 hidden justify-self-center rounded-md bg-accent p-3 font-firaCode text-light_1 drop-shadow-md hover:underline group-hover:flex group-hover:blur-0 group-hover:duration-200"
                      href="#"
                      onClick={() => window.open(`/games/${game.game_id}`)}
                    >
                      Visit work <ArrowUpRight className="ml-1" />
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
      <h2 className="mt-7 flex justify-center text-center font-jersey10 text-5xl">
        Artwork
        <Palette size={32} className="ml-2 self-center text-yellow-300" />
      </h2>
      <div className="mb-12">
        {!art || art.length === 0 ? (
          <p className="my-10 text-center font-firaCode text-lg text-[--light-3]">
            No games available.
          </p>
        ) : (
          <div className="m-auto my-5 flex flex-wrap justify-center gap-8">
            {art.map((artwork) => (
              <React.Fragment key={artwork.art_id}>
                <div className="w-fit rounded-md p-5">
                  <div className="group mb-2 grid h-44 w-96 grid-cols-1 grid-rows-1 overflow-clip rounded-md">
                    <Image
                      src={
                        artwork.artwork_data.media || "/placeholder-icon.svg"
                      }
                      alt={`${artwork.artwork_data.name} cover image`}
                      width={384}
                      height={176}
                      className="group-hover:brightness-75 group-hover:duration-200"
                    />
                    <Link
                      className="mb-16 hidden justify-self-center rounded-md bg-accent p-3 font-firaCode text-light_1 drop-shadow-md hover:underline group-hover:flex group-hover:blur-0 group-hover:duration-200"
                      href="#"
                      onClick={() => window.open(`/artwork/${artwork.art_id}`)}
                    >
                      Visit work <ArrowUpRight className="ml-1" />
                    </Link>
                  </div>
                  <p className="max-w-96 font-firaCode text-xl font-semibold">
                    {artwork.artwork_data.name}
                  </p>
                  <p className="line-clamp-1 max-w-96 font-firaCode text-[--light-3]">
                    {artwork.artwork_data.description}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
