import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";

type Contributor = {
  member_id: number;
  name: string;
  role: string;
};

type Game = {
  name: string;
  description: string;
  completion: number;
  active: boolean;
  hostURL: string;
  isItch: boolean;
  pathToThumbnail: string | null;
  event: number | null;
  contributors: Contributor[];
};

export default function IndividualGamePage() {
  const router = useRouter();
  const { id } = router.query;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [hostSite, setHostSite] = useState<string>("");

  // Fetch itch.io host URL through backend proxy
  async function fetchItchGameUrlProxy(
    embedID: string,
  ): Promise<string | null> {
    try {
      const res = await fetch(
        `http://localhost:8000/gamesAPI/itch-embed/${embedID}/`,
      );
      const data = await res.json();
      const html = data.html;
      const match = html.match(
        /href="(https:\/\/[a-zA-Z0-9\-]+\.itch\.io\/[a-zA-Z0-9\-]+)"/,
      );
      if (match) return match[1];
      return null;
    } catch {
      return null;
    }
  }

  // Fetch game data from backend
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8000/gamesAPI/games/${id}/`)
      .then((res) => res.json())
      .then((data: Game) => {
        setGame(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Set host site URL
  useEffect(() => {
    if (!game) return;

    if (game.isItch && game.hostURL) {
      fetchItchGameUrlProxy(game.hostURL).then((url) => {
        setHostSite(url || "");
      });
    } else if (game) {
      setHostSite(game.hostURL);
    }
  }, [game]);

  if (loading) return <div>Loading...</div>;
  if (!game) return <div>Game not found</div>;

  // Example data variables (replace with backend data in the future)
  const gameTitle = game.name;
  const gameCover = game.pathToThumbnail || ""; // can have placeholder of just GDUWA Logo as default placeholder
  const gameDescription = game.description.split("\n");
  const completionLabels: { [key: number]: string } = {
    1: "WIP",
    2: "Playable Dev",
    3: "Beta",
    4: "Completed",
  };
  const devStage = completionLabels[game.completion] || `Stage Unknown`;
  // TODO ADD EVENT
  const event = "Game Jam November 2025";
  // TODO ADD ARTIMAGES
  const artImages = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Minecraft_Zombie.png/120px-Minecraft_Zombie.png",
      alt: "Minecraft Zombie",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Minecraft_Enderman.png/120px-Minecraft_Enderman.png",
      alt: "Minecraft Enderman",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Minecraft_explore_landscape.png/375px-Minecraft_explore_landscape.png",
      alt: "Minecraft Landscape",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main>
        <section className="w-full bg-popover">
          <div className="mx-auto max-w-7xl p-0 sm:p-8">
            <Image
              src={gameCover}
              alt="Game Cover"
              width={800}
              height={800}
              className="max-h-[60vh] w-full object-cover sm:mx-auto sm:h-auto sm:max-h-[60vh] sm:rounded-2xl sm:object-contain"
              priority
            />
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
                    <div className="grid grid-cols-[auto_auto] gap-x-1 gap-y-1">
                      {game.contributors.map((c) => (
                        <React.Fragment key={c.member_id}>
                          <a
                            href={`/member/${c.member_id}`}
                            className="text-primary hover:underline"
                          >
                            {c.name}
                          </a>
                          <span>{c.role}</span>
                        </React.Fragment>
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
                <tr className="border-b-2 border-gray-300">
                  <td className="py-1 pr-2 text-muted-foreground sm:py-2">
                    Host Site
                  </td>
                  <td className="py-1 text-right sm:py-2">
                    <a
                      href={hostSite}
                      className="text-primary underline hover:underline"
                    >
                      {hostSite}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-1 pr-2 text-muted-foreground sm:py-2">
                    Event
                  </td>
                  <td className="py-1 text-right sm:py-2">{event}</td>
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
          {game.isItch && <ItchEmbed embedID={game.hostURL} name={gameTitle} />}
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
