import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";

type Game = {
  name: string;
  description: string;
  completion: number;
  active: boolean;
  hostURL: string;
  isItch: boolean;
  pathToThumbnail: string | null;
  event: number | null;
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

    fetch(`http://localhost:8000/gamesAPI/games/${id}`)
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
  const contributors = ["Developer 1", "Developer 2", "Artist 1"];
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
    <div className="min-h-screen bg-[#181a25] font-sans text-[#e3e6f3]">
      <main className="mx-auto max-w-7xl p-8">
        <section className="mb-8 flex flex-col items-center justify-center gap-8 rounded-xl bg-[#232345] p-6 shadow-lg">
          <div className="flex w-full flex-wrap items-start justify-center gap-8">
            <div className="flex w-full justify-center md:flex-1">
              <Image
                src={gameCover}
                alt="Game Cover"
                width={800}
                height={800}
                className="h-auto max-h-[60vh] w-full max-w-full rounded-2xl bg-[#232345] object-contain shadow-lg md:max-w-[60vw]"
                priority
              />
            </div>
            <div className="w-full md:w-auto">
              <table className="mt-4 w-full min-w-[220px] border-collapse border-spacing-0">
                <tbody>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-2 pr-2">Contributors</td>
                    <td className="py-2">
                      {contributors.map((c, i) => (
                        <span key={c}>
                          {c}
                          {i < contributors.length - 1 && <br />}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-2 pr-2">Development Stage</td>
                    <td className="py-2">{devStage}</td>
                  </tr>
                  <tr className="border-b-2 border-gray-300">
                    <td className="py-2 pr-2">Host Site</td>
                    <td className="py-2">{hostSite}</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-2">Event</td>
                    <td className="py-2">{event}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-8 flex w-full min-w-[260px] flex-col gap-4">
            <h1 className="mb-2 text-center font-jersey10 text-4xl font-bold tracking-wide text-[#7ecfff] drop-shadow-lg">
              {gameTitle}
            </h1>
            <ul>
              {gameDescription.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
          </div>
        </section>

        {game.isItch && (
          <section className="mt-8 flex flex-col items-center gap-6">
            <ItchEmbed embedID={game.hostURL} name={gameTitle} />
            <h2 className="font-jersey10 text-3xl text-[#7ecfff]">ARTWORK</h2>

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
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
