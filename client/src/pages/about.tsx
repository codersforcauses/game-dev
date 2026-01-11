import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function AboutPage() {
  const topRow = [
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
  ];

  const bottomRow = [
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
    { name: "FirstName LastName", pronouns: "(he/him)", role: "President" },
  ];

  return (
    <main className="min-h-screen bg-[#090A19]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-20 space-y-20">
        <section className="flex flex-col justify-between gap-12 md:flex-row md:gap-20">
          <div className="flex-1">
            <h1 className="font-jersey10 text-5xl md:text-6xl text-[#9B9BDE] mb-4">
              About Us
            </h1>
            <div
              className="mb-6 w-full border-t border-[#5E5ECC]"
              aria-hidden="true"
            />
            <div className="space-y-4 text-base md:text-lg leading-relaxed font-jersey10 text-white">
              <p>
                Description of the clubs aims, why it exists, its mission, etc etc.
                Second paragraph here, a second paragraph would be pretty cool. The
                more info the better yippee!!
              </p>
              <p>
                Lorem ipsum dolor such and such I can't remember the rest.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-2xl bg-[#C5C5E8] md:w-96 lg:w-[512px]">
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-32 w-32 text-white/40" />
            </div>
          </div>
        </section>
      </div>

      {/* Our Committee Title Section - LIGHT - Full Width */}
      <section className="w-full bg-[#1B1F4C] px-6 py-6 md:px-10 md:py-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-jersey10 text-3xl text-white">Our Committee</h2>
        </div>
      </section>

      {/* Portraits Section - DARK - Full Width */}
      <section className="w-full bg-[#090A19] px-6 py-10 md:px-10 pt-16">
        <div className="mx-auto max-w-6xl">
          {/* Top row - 4 Presidents */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {topRow.map((member, idx) => (
              <div key={`top-${idx}`} className="flex flex-col items-start gap-0">
                <div
                  className="relative flex items-center justify-center bg-contain bg-center bg-no-repeat"
                  style={{
                    width: "180px",
                    height: "185px",
                    backgroundImage: "url('/frame.png')",
                  }}
                >
                  <ImageIcon className="h-16 w-16 text-white/60" />
                </div>
                <div className="text-left font-firaCode text-[9px] leading-tight w-[180px]">
                  <p className="text-white bg-[#1B1F4C] px-2 py-1 inline-block">{member.name} {member.pronouns}</p>
                  <p className="text-[#9ca4fd] bg-[#1B1F4C] px-2 py-1 inline-block">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 3 other roles */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 md:gap-10">
            {bottomRow.map((member, idx) => (
              <div key={`bottom-${idx}`} className="flex flex-col items-start gap-0">
                <div
                  className="relative flex items-center justify-center bg-contain bg-center bg-no-repeat"
                  style={{
                    width: "180px",
                    height: "185px",
                    backgroundImage: "url('/frame.png')",
                  }}
                >
                  <ImageIcon className="h-16 w-16 text-white/60" />
                </div>
                <div className="text-left font-firaCode text-[9px] leading-tight w-[180px]">
                  <p className="text-white bg-[#1B1F4C] px-2 py-1 inline-block">{member.name} {member.pronouns}</p>
                  <p className="text-[#9ca4fd] bg-[#1B1F4C] px-2 py-1 inline-block">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}