import Image from "next/image";

export default function Landing() {
  return (
    <div>
      <section className="flex w-full justify-center bg-[#182150] px-12 py-10">
        <div className="flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex max-w-lg flex-col gap-6 text-white">
            <h1 className="font-jersey10 text-4xl font-bold">
              Game Development UWA
            </h1>

            <p className="font-sans text-base leading-relaxed text-white/80">
              Little eye catching intro about what the club does here. Maybe
              something about the purpose of the club, maybe something about the
              type of events that the club runs.
            </p>

            <div className="mt-4 flex gap-4">
              <button className="rounded-lg border border-[#9CA4FD] px-6 py-3 font-jersey10 font-medium text-white transition hover:bg-[#9CA4FD]">
                More about us &gt;
              </button>
              <button className="rounded-lg border border-[#9CA4FD] px-6 py-3 font-jersey10 font-medium text-white transition hover:bg-[#9CA4FD]">
                Join our Discord &gt;
              </button>
            </div>
          </div>

          <div className="relative flex h-[280px] w-[400px] items-center justify-center rounded-xl bg-[#cfc2ff] shadow-xl">
            <Image
              src="/placeholder.png"
              width={80}
              height={80}
              alt="Placeholder"
              className="opacity-60"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#0d1025] py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[702fr_513fr]">
            <div>
              <div className="rounded-md border border-purple-400 px-4 py-2 font-jersey10 font-semibold text-purple-300">
                Game Jams
              </div>

              <div className="mt-4 space-y-4 rounded-md border border-[#1B1F4C] bg-[#0f132e] p-4 text-gray-200">
                <div className="flex gap-2">
                  <span>▶</span>
                  <p>
                    Compete with a team over a short time period to develop your
                    own game! Each game jam has a different theme so be prepared
                    to think creatively.
                  </p>
                  <Image
                    src="/trophy.png"
                    width={97}
                    height={121}
                    alt="Placeholder"
                    className="opacity-60"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-md border border-purple-400 px-4 py-2 font-jersey10 font-semibold text-purple-300">
                Social Events
              </div>

              <div className="mt-4 space-y-4 rounded-md border border-[#1B1F4C] bg-[#0f132e] p-4 text-gray-200">
                <div className="flex gap-2">
                  <span>▶</span>
                  <p>
                    Meet other folks interested in game dev, play games, and
                    maybe even recruit members for your next game jam team :P
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[233fr_275fr_111fr]">
            <div className="flex flex-col">
              <div className="rounded-md border border-purple-400 px-4 py-2 font-jersey10 font-semibold text-purple-300">
                Other Event Type
              </div>

              <div className="mt-4 rounded-md border border-[#1B1F4C] bg-[#0f132e] p-4 text-gray-200">
                <div className="flex gap-2">
                  <span>▶</span>
                  <p>
                    Some other event type that the club runs! I&#39;m not sure
                    what, but this section might look better with four boxes…
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div
                style={{
                  clipPath:
                    "polygon(0% 0%, 71% 0%, 78% 8px, 100% 8px, 100% calc(100% - 8px), 0% calc(100% - 8px))",
                }}
                className="relative bg-purple-400 p-[1px]"
              >
                <div
                  style={{
                    clipPath:
                      "polygon(1px 1px, calc(71% - 1px) 1px, calc(78% - 1px) 8px, calc(100% - 1px) 8px, calc(100% - 1px) calc(100% - 8px - 1px), 1px calc(100% - 8px - 1px))",
                  }}
                  className="bg-[#0d1025] p-4 pt-3 font-jersey10 font-semibold text-purple-300"
                >
                  Workshops
                </div>
              </div>

              <div className="mt-4 rounded-md border border-[#1B1F4C] bg-[#0f132e] p-4 text-gray-200">
                <div className="flex gap-2">
                  <span>▶</span>
                  <p>
                    Learn core Game Development technologies, such as Godot,
                    Unity and more. Most workshops are presented by committee
                    members with the chance to produce your own small game.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center gap-4 lg:flex-col lg:items-start">
              <Image
                src="/godot-1.png"
                width={135}
                height={46}
                alt="Godot Logo"
                className="lg:mb-5"
              />
              <Image
                src="/unity-logo.png"
                width={135}
                height={46}
                alt="Unity Logo"
                className="lg:mb-5 lg:self-end"
              />
              <Image
                src="/godot-1.png"
                width={135}
                height={46}
                alt="Godot Logo"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
