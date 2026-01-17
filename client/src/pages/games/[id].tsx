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
  const gameCover = game.pathToThumbnail || "/game_dev_club_logo.svg"; // can have placeholder of just GDUWA Logo as default placeholder
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
    <div className="min-h-screen bg-[#090a19] font-sans text-[#e3e6f3]">
      <main>
        <section className="w-full bg-[#1b1f4c]">
          <div className="mx-auto max-w-7xl p-8">
            <Image
              src={gameCover}
              alt="Game Cover"
              width={800}
              height={800}
              className="mx-auto h-auto max-h-[60vh] w-full max-w-full rounded-2xl object-contain"
              priority
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-24 py-12">
          <h1 className="mb-10 text-center font-jersey10 text-6xl font-bold tracking-wide text-primary">
            {gameTitle}
          </h1>
          <div className="w-full max-w-full sm:float-right sm:mb-4 sm:ml-8 sm:w-96">
            <table className="w-full min-w-[220px] border-collapse border-spacing-0">
              <tbody>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-2 pr-2 text-muted-foreground">
                    Contributors
                  </td>
                  <td className="py-2 text-right">
                    <div className="grid grid-cols-[auto_auto] gap-x-1 gap-y-1">
                      {game.contributors.map((c) => (
                        <React.Fragment key={c.member_id}>
                          <a
                            href={`/member/${c.member_id}`}
                            className="whitespace-nowrap text-primary hover:underline"
                          >
                            {c.name}
                          </a>
                          <span className="text-gray-300">{c.role}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-2 pr-2 text-muted-foreground">
                    Development Stage
                  </td>
                  <td className="py-2 text-right">{devStage}</td>
                </tr>
                <tr className="border-b-2 border-gray-300">
                  <td className="py-2 pr-2 text-muted-foreground">Host Site</td>
                  <td className="py-2 text-right">
                    <a
                      href={hostSite}
                      className="whitespace-nowrap text-primary underline hover:underline"
                    >
                      {hostSite}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-2 text-muted-foreground">Event</td>
                  <td className="py-2 text-right">{event}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="space-y-3 text-xl leading-8">
            {gameDescription.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 flex flex-col items-center gap-6">
          {game.isItch && <ItchEmbed embedID={game.hostURL} name={gameTitle} />}
          <h2 className="font-jersey10 text-5xl text-primary">ARTWORK</h2>

          <div className="mx-auto mb-6 flex h-[240px] w-full max-w-4xl justify-center gap-6 overflow-hidden">
            {artImages.map((img) => (
              <Image
                key={img.alt}
                src={img.src}
                alt={img.alt}
                width={240}
                height={240}
                className="rounded-lg bg-[#232345] object-contain shadow-md"
              />
            ))}
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
