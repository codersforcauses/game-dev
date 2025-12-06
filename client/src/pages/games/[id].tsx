import Image from "next/image";
import React from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";

export default function IndividualGamePage() {
  // Example data variables (replace with backend data in the future)
  const gameTitle = "Minecraft";
  const gameCover =
    "https://upload.wikimedia.org/wikipedia/en/b/b6/Minecraft_2024_cover_art.png";
  const gameDescription = [
    "Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33 error molestias...",
    "Et laborum vitae est inventore obcaecati...",
    "Qui quisquam nihil non porro velit hic magni...",
    "Eum veniam quisquam et veniam distinctio.",
    "In laudantium adipisci aut molestiae consequatur.",
    "Eum itaque rerum qui enim aliquam.",
    "Id dolor consequatur ut aperiam omnis.",
    "Minecraft is a sandbox game developed and published by Mojang Studios. Formally released on 18 November 2011 for personal computers following its initial public alpha release on 17 May 2009, it has been ported to numerous platforms, including mobile devices and various video game consoles....",
  ];
  const contributors = ["Developer 1", "Developer 2", "Artist 1"];
  const devStage = "Beta";
  const hostSite = "itch.io/xxx";
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
      <section className="flex justify-center bg-[#232345] py-8">
        <div className="flex w-[832px] max-w-full items-center justify-center rounded-2xl bg-[#232345] shadow-xl">
          <Image
            src={gameCover}
            alt="Game Cover"
            width={832}
            height={540}
            className="h-auto max-h-[66vh] w-full max-w-full rounded-2xl bg-[#232345] object-contain shadow-lg"
            priority
          />
        </div>
      </section>
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="mb-4 text-center font-jersey10 text-4xl font-bold tracking-wide text-[#7ecfff] drop-shadow-lg">
          {gameTitle}
        </h1>
        <section className="mb-8 flex items-center justify-center rounded-xl bg-[#232345] p-6 shadow-lg">
          <div className="flex flex-wrap items-start gap-8">
            <div className="min-w-[260px] flex-[2]">
              {gameDescription.slice(0, 1).map((desc, i) => (
                <p key={i}>{desc}</p>
              ))}
              <ul>
                {gameDescription.slice(1, 3).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                <strong>{gameDescription[3]}</strong>
              </p>
              <p>
                <em>{gameDescription[4]}</em>
              </p>
              <p>
                <strong>{gameDescription[5]}</strong>
              </p>
              <p>
                <em>{gameDescription[6]}</em>
              </p>
              <p>{gameDescription[7]}</p>
            </div>
            <table className="w-full min-w-[220px] flex-1 border-collapse border-spacing-0">
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
        </section>
        <section className="mt-8 flex flex-col items-center">
          <ItchEmbed embedID="3" name="X-Moon by leafy" />
          <h2 className="mb-4 font-jersey10 text-3xl tracking-wide text-[#7ecfff]">
            GAME ART
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
