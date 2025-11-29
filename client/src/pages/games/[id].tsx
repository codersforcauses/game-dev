import Image from "next/image";
import React from "react";

import { ItchEmbed } from "@/components/ui/ItchEmbed";

// import navbar
// import footer

export default function IndividualGamePage() {
  return (
    <div className="min-h-screen bg-[#181a25] font-sans text-[#e3e6f3]">
      {/* <Navbar /> */}
      <section className="flex justify-center bg-[#232345] py-8">
        <div className="flex w-full max-w-4xl items-center justify-center rounded-2xl bg-[#232345] shadow-xl">
          <Image
            src="/games/Game_Cover_Sample.png"
            alt="Game Cover"
            width={768}
            height={540}
            className="rounded-2xl bg-[#232345] object-cover shadow-lg"
            priority
          />
        </div>
      </section>
      <main className="mx-auto max-w-4xl p-8">
        <h1 className="mb-4 font-jersey10 text-4xl font-bold tracking-wide text-[#7ecfff] drop-shadow-lg">
          Game Title
        </h1>
        <div className="flex items-start gap-8">
          <div className="flex-[2]">
            <p>
              Lorem ipsum dolor sit amet. Non numquam dicta nam autem dicta 33
              error molestias...
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
            <p>Ut possimus architecto eos ullam ducimus ut...</p>
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
        <section className="mb-8 flex items-center justify-center rounded-xl bg-[#232345] p-6 shadow-lg">
          {/* Replace with actual embed/card */}
          {/* <Image src="/assets/game-card-placeholder.png" alt="Game Card" style={{ width: '100%' }} /> */}
        </section>
        <section className="mt-8">
          <h2 className="mb-4 font-jersey10 text-3xl tracking-wide text-[#7ecfff]">
            GAME ART
          </h2>
          <div className="mb-6 flex gap-4">
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-[#232345] text-2xl text-[#7ecfff] shadow-md">
              <span role="img" aria-label="art">
                🖼️
              </span>
            </div>
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-[#232345] text-2xl text-[#7ecfff] shadow-md">
              <span role="img" aria-label="art">
                🖼️
              </span>
            </div>
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-[#232345] text-2xl text-[#7ecfff] shadow-md">
              <span role="img" aria-label="art">
                🖼️
              </span>
            </div>
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
