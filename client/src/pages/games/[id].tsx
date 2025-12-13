import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";

export default function IndividualGamePage() {
  const router = useRouter();
  const { id } = router.query;
  type Game = {
    id: number;
    name: string;
    description: string;
    completion: number;
    active: boolean;
    hostURL: string;
    isItch: boolean;
    pathToThumbnail: string;
    event: string | null;
  };
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://127.0.0.1:8000/gamesAPI/games/${id}/`)
      .then((res) => res.json())
      .then(setGame);
  }, [id]);
  // Example data variables (replace with backend data in the future)

  if (!game) return <div>Loading...</div>;
  const gameTitle = game.name;
  const gameCover = game.pathToThumbnail;
  const gameDescription = game.description.split("\n"); // or split as needed
  // Map completion number to label
  const completionLabels: { [key: number]: string } = {
    1: "WIP",
    2: "Playable Dev",
    3: "Beta",
    4: "Completed",
  };
  const devStage = completionLabels[game.completion] || `Stage Unknown`;
  const hostSite = game.isItch
    ? `https://itch.io/${game.hostURL}`
    : game.hostURL;

  // const event = game.event;
  // TODO: Map contributors and artImages if available in API
  // const contributors = ["Unknown"];
  // const artImages = [];

  // const gameTitle = "Minecraft";
  // const gameCover =
  //   "https://upload.wikimedia.org/wikipedia/en/b/b6/Minecraft_2024_cover_art.png";
  // const gameDescription = [
  //   "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles....",
  //   "In Minecraft, players explore a procedurally generated, three-dimensional world with virtually infinite terrain made up of voxels (cubes). Players can discover and extract raw materials, craft tools and items, and build structures, earthworks, and machines. Depending on the game mode, players can fight hostile mobs, as well as cooperate with or compete against other players in multiplayer. The game's large community offers a wide variety of user-generated content, such as modifications, servers, player skins, texture packs, and custom maps, which add new game mechanics and possibilities.",
  //   "The game has several modes, including Survival mode, where players must acquire resources to build the world and maintain health; Creative mode, where players have unlimited resources to build with and the ability to fly; Adventure mode, where players can play custom maps created by other players with certain restrictions; and Spectator mode, where players can freely move throughout a world without being affected by gravity or world interactions.",
  //   "Minecraft has been praised for its creativity and freedom, allowing players to build complex structures and mechanisms using redstone circuits. It has also been used in educational settings to teach subjects such as mathematics, history, and computer programming.",
  //   "The game has received numerous updates since its release, adding new features, blocks, mobs, and gameplay mechanics. Notable updates include the 'Nether Update,' which revamped the Nether dimension; the 'Caves & Cliffs Update,' which introduced new cave generation and mountain biomes; and the 'Wild Update,' which added new mobs like the Warden and new biomes such as the Deep Dark.",
  //   "Minecraft has become one of the best-selling video games of all time, with over 200 million copies sold across all platforms by 2021. It has a large and active player base, with millions of players logging in daily to explore, build, and create in its expansive worlds.",
  //   "The game's success has led to various spin-offs and merchandise, including books, toys, and an upcoming feature film. Minecraft's impact on gaming culture is significant, influencing many other games and inspiring a generation of gamers and developers.",
  //   "Overall, Minecraft's combination of creativity, exploration, and community-driven content has solidified its place as a beloved and enduring title in the gaming industry.",
  // ];
  const contributors = ["Developer 1", "Developer 2", "Artist 1"];
  // const devStage = "Beta";
  // const hostSite = "itch.io/xxx";
  const event = "Game Jam November 2025";
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
        <section className="mt-8 flex flex-col items-center">
          <ItchEmbed embedID="3" name="X-Moon by leafy" />
          <h2 className="mb-4 font-jersey10 text-3xl tracking-wide text-[#7ecfff]">
            ARTWORK
          </h2>

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
