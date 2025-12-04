import Image from "next/image";
import React from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";

export default function IndividualGamePage() {
  return (
    <div className="min-h-screen bg-[#181a25] font-sans text-[#e3e6f3]">
      <section className="flex justify-center bg-[#232345] py-8">
        <div className="flex max-w-4xl items-center justify-center rounded-2xl bg-[#232345] shadow-xl">
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/b/b6/Minecraft_2024_cover_art.png"
            alt="Game Cover"
            width={832}
            height={540}
            className="rounded-2xl bg-[#232345] object-cover shadow-lg"
            priority
          />
        </div>
      </section>
      <main className="mx-auto max-w-4xl p-8">
        <section className="mb-8 flex items-center justify-center rounded-xl bg-[#232345] p-6 shadow-lg">
          <div className="w-full">
            <h1 className="mb-4 text-center font-jersey10 text-4xl font-bold tracking-wide text-[#7ecfff] drop-shadow-lg">
              Game Title
            </h1>
            <div className="flex flex-col items-start gap-8 md:flex-row">
              <div className="flex-[2]">
                <p>
                  Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta
                  33 error molestias...
                </p>
                <ul>
                  <li>Et laborum vitae est inventore obcaecati...</li>
                  <li>Qui quisquam nihil non porro velit hic magni...</li>
                </ul>
                <p>
                  <strong>Eum veniam quisquam et veniam distinctio.</strong>
                </p>
                <p>
                  <em>In laudantium adipisci aut molestiae consequatur.</em>
                </p>
                <p>
                  <strong>Eum itaque rerum qui enim aliquam.</strong>
                </p>
                <p>
                  <em>Id dolor consequatur ut aperiam omnis.</em>
                </p>
                <p>
                  Minecraft is a sandbox game developed and published by Mojang
                  Studios. Formally released on 18 November 2011 for personal
                  computers following its initial public alpha release on 17 May
                  2009, it has been ported to numerous platforms, including
                  mobile devices and various video game consoles....
                </p>
              </div>
              <div className="min-w-[220px] flex-1">
                <table className="w-full border-collapse border-spacing-0">
                  <tbody>
                    <tr className="border-b-2 border-gray-300">
                      <td className="py-2 pr-2">Contributors</td>
                      <td className="py-2">
                        Developer 1<br />
                        Developer 2<br />
                        Artist 1
                      </td>
                    </tr>
                    <tr className="border-b-2 border-gray-300">
                      <td className="py-2 pr-2">Development Stage</td>
                      <td className="py-2">Beta</td>
                    </tr>
                    <tr className="border-b-2 border-gray-300">
                      <td className="py-2 pr-2">Host Site</td>
                      <td className="py-2">itch.io/xxx</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-2">Event</td>
                      <td className="py-2">Game Jam November 2025</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-8 flex flex-col items-center">
          <h2 className="mb-4 font-jersey10 text-3xl tracking-wide text-[#7ecfff]">
            GAME ART
          </h2>
          <div className="mx-auto mb-6 flex h-[240px] w-full max-w-4xl justify-center gap-6 overflow-hidden">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Minecraft_Zombie.png/120px-Minecraft_Zombie.png"
              alt="Minecraft Zombie"
              width={240}
              height={240}
              className="rounded-lg bg-[#232345] object-contain shadow-md"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Minecraft_Enderman.png/120px-Minecraft_Enderman.png"
              alt="Minecraft Enderman"
              width={240}
              height={240}
              className="rounded-lg bg-[#232345] object-contain shadow-md"
            />
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Minecraft_explore_landscape.png/375px-Minecraft_explore_landscape.png"
              alt="Minecraft Landscape"
              width={240}
              height={240}
              className="rounded-lg bg-[#232345] object-contain shadow-md"
            />
          </div>
          <ItchEmbed
            embedID="3"
            hostURL="https://leafo.itch.io/x-moon"
            name="X-Moon by leafy"
          />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
