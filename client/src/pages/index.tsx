import Image from "next/image";

export default function Landing() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Summer 2026 Game Jam",
      time: "Monday 24th Oct 11:00am–4:00pm",
      image: "/placeholder.png",
    },
    {
      id: 2,
      title: "Godot Workshop",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/placeholder.png",
    },
    {
      id: 3,
      title: "World domination",
      time: "Thursday 2nd Nov 2:00–4:00pm",
      image: "/placeholder.png",
    },
  ];

  const gamesData = [
    {
      id: 1,
      title: "Cool Game",
      description: "Cool game is a game about being cool.",
      image: "/placeholder.png",
    },
    {
      id: 2,
      title: "Cool Game 2",
      description: "Cool game 2 is a game about being cool.",
      image: "/placeholder.png",
    },
    {
      id: 3,
      title: "Cool Game 3",
      description: "Cool game 3 is a game about being cool.",
      image: "/placeholder.png",
    },
  ];

  return (
    <div>
      <section className="bg-[#0d1025] px-10">
        <div className="container mx-auto rounded-[10px] bg-[#1B1F4C] px-4 py-8 lg:px-12">
          {/* Title Row */}
          <div className="flex items-center justify-between px-10">
            <div className="flex items-center justify-between">
              <h2 className="font-jersey10 text-4xl tracking-wide text-white">
                Upcoming Events
              </h2>

              {/* Arrow controls */}
              <div className="ml-[20] flex gap-3 text-lg text-white/60">
                <span className="cursor-pointer hover:text-white">&lt;</span>
                <span className="cursor-pointer hover:text-white">&gt;</span>
              </div>
            </div>
            <div>
              <span className="font-jersey10">See More </span>
              <span className="cursor-pointer font-jersey10 hover:text-white">
                &gt;
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-10">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex flex-col">
                {/* Image */}
                <div className="flex h-[180px] w-full items-center justify-center rounded-[10px] bg-[#d6d1ff]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={60}
                    height={60}
                  />
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-wide text-white">
                  {event.title}
                </h3>

                <p className="text-sm tracking-wide text-white/70">
                  {event.time}
                </p>

                <div className="mt-3 w-full border-b border-white/20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d1025] px-10 py-10">
        <div className="flex w-full justify-between px-4">
          <div>
            <div className="flex w-[200px] justify-around">
              <Image
                src="/placeholder.png"
                width={27}
                height={20}
                alt="Placeholder"
              />
              <div className="font-jersey10">Join our Discord </div>
            </div>
            <div className="flex w-[200px] justify-around">
              <Image
                src="/placeholder.png"
                width={27}
                height={20}
                alt="Placeholder"
              />
              <div className="font-jersey10">Join our Discord </div>
            </div>
          </div>

          <div
            style={{
              clipPath:
                "polygon(0% 0%, 27% 0%, 31% 1rem, 100% 1rem, 100% calc(100% - 1rem), 97% 100%, 70% 100%, 67% calc(100% - 1rem), 0% calc(100% - 1rem))",
            }}
            className="relative w-[60vw] bg-secondary p-[1px]"
          >
            <div
              style={{
                clipPath:
                  "polygon(1px 1px, calc(27% - 1px) 1px, calc(31% - 1px) 1rem, calc(100% - 1px) 1rem, calc(100% - 1px) calc(100% - 1rem - 1px), calc(97% - 1px) calc(100% - 1px), calc(70% + 1px) calc(100% - 1px), calc(67% + 1px) calc(100% - 1rem - 1px), 1px calc(100% - 1rem - 1px))",
              }}
              className="h-full bg-[#0d1025] p-10"
            >
              <h3 className="mb-[15px] font-jersey10 text-4xl">
                So... How do I get involved?
              </h3>
              <p>
                {
                  "The easiest way to get involved is to come along to one of our events! Most events don't need registration- just check the event description to make sure. If you aren't feeling up to an event, just join our discord. React out to our friendly committee members if you need any help!"
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-[#0d1025] px-6 py-20 lg:px-12">
        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="flex w-full flex-row items-start justify-between">
            {/* --- Title & Intro Text --- */}
            <div className="mb-10 flex flex-col items-start">
              <h2 className="flex items-center gap-3 font-jersey10 text-5xl text-white">
                Featured Member Creations
                <span className="text-4xl text-red-400">❤️</span>
              </h2>

              <div className="inline-block">
                <p className="mt-3 text-lg text-white/70">
                  Some of our favourite games made by our members
                </p>

                <div className="mt-8 h-[2px] bg-white/30"></div>
              </div>
            </div>

            {/* --- Buttons Row --- */}
            <div className="mb-12 flex flex-col items-start gap-4">
              <button className="rounded-md border border-purple-300 bg-[#090A19] px-6 py-3 text-white transition hover:bg-purple-300 hover:text-black">
                See more games by our members &gt;
              </button>
              <button className="rounded-md border border-purple-300 bg-[#090A19] px-6 py-3 text-white transition hover:bg-purple-300 hover:text-black">
                See other cool stuff our members have created &gt;
              </button>
            </div>
          </div>

          {/* --- Card Container --- */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {gamesData.map((game) => (
              <div
                key={game.id}
                className="rounded-xl p-6 text-[#0d1025] shadow-lg"
              >
                <div className="mb-6 flex h-[180px] items-center justify-center rounded-xl bg-[#d0c5ff]">
                  <Image
                    src={game.image}
                    alt={game.title}
                    width={80}
                    height={80}
                  />
                </div>

                <h3 className="mb-2 text-2xl text-white">{game.title}</h3>

                <p className="mb-4 text-sm text-[#9CA4FD]">
                  {game.description}
                </p>

                <div className="h-[2px] w-full bg-white/30"></div>
              </div>
            ))}
          </div>
        </div>
        <Image
          src="/fire1.png"
          alt=""
          width={400}
          height={400}
          className="absolute left-[-250px] top-1/2 z-10 -translate-y-1/2"
        />
        <Image
          src="/fire2.png"
          alt=""
          width={400}
          height={400}
          className="absolute right-[-200px] top-1/2 z-10 -translate-y-1/2"
        />
        <Image
          src="/fire3.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-[-150px] left-1/2 z-10 -translate-x-1/2"
        />
      </section>
    </div>
  );
}
