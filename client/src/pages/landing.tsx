import Image from "next/image";

export default function Landing() {
  const pageTitle = "Game Development UWA";
  const description =
    "Little eye catching intro about what the club does here. Maybe " +
    "something about the purpose of the club, maybe something about the " +
    "type of events that the club runs.";
  const btnList = [
    { name: "More about us", link: "" },
    { name: "Join our Discord", link: "" },
  ];
  const mainPic = {
    url: "/placeholder.png",
    alt: "placeholder",
  };

  type cardImage = {
    url: string;
    width: number;
    height: number;
    alt: string;
  };

  type cardType = {
    id: number;
    title: string;
    description: string;
    type: string;
    image: cardImage | null;
    row: number;
    gridColumn: string;
  };
  const eventCards = [
    {
      id: 1,
      title: "Game Jams",
      description:
        "Compete with a team over a short time period to develop your own game! Each game jam has a different theme so be prepared to think creatively.",
      type: "default",
      image: {
        url: "/trophy.png",
        width: 97,
        height: 121,
        alt: "Trophy",
      },
      row: 1,
      gridColumn: "702fr",
    },
    {
      id: 2,
      title: "Social Events",
      description:
        "Meet other folks interested in game dev, play games, and maybe even recruit members for your next game jam team :P",
      type: "default",
      image: null,
      row: 1,
      gridColumn: "513fr",
    },
    {
      id: 3,
      title: "Other Event Type",
      description:
        "Some other event type that the club runs! I'm not sure what, but this section might look better with four boxes…",
      type: "default",
      image: null,
      row: 2,
      gridColumn: "233fr",
    },
    {
      id: 4,
      title: "Workshops",
      description:
        "Learn core Game Development technologies, such as Godot, Unity and more. Most workshops are presented by committee members with the chance to produce your own small game.",
      type: "special-border",
      image: null,
      row: 2,
      gridColumn: "275fr",
    },
  ];

  const logoImages = [
    { url: "/godot-1.png", alt: "Godot Logo", position: "start" },
    { url: "/unity-logo.png", alt: "Unity Logo", position: "end" },
    { url: "/godot-1.png", alt: "Godot Logo", position: "start" },
  ];

  const row1Cards = eventCards.filter((card) => card.row === 1);
  const row2Cards = eventCards.filter((card) => card.row === 2);

  const renderCardHeader = (card: cardType) => {
    if (card.type === "special-border") {
      return (
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
            {card.title}
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-md border border-purple-400 px-4 py-2 font-jersey10 font-semibold text-purple-300">
        {card.title}
      </div>
    );
  };

  const renderCard = (card: cardType) => (
    <div key={card.id} className="flex flex-col">
      {renderCardHeader(card)}

      <div className="mt-4 rounded-md border border-[#1B1F4C] bg-[#0f132e] p-4 text-gray-200">
        <div className="flex gap-2">
          <span>▶</span>
          <p>{card.description}</p>
          {card.image && (
            <Image
              src={card.image.url}
              width={card.image.width}
              height={card.image.height}
              alt={card.image.alt}
              className="opacity-60"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <section className="flex w-full justify-center bg-[#182150] px-12 py-10">
        <div className="flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex max-w-lg flex-col gap-6 text-white">
            <h1 className="font-jersey10 text-4xl font-bold">{pageTitle}</h1>
            <p className="font-sans text-base leading-relaxed text-white/80">
              {description}
            </p>
            <div className="mt-4 flex gap-4">
              {btnList.map((item, i) => (
                <button
                  key={i}
                  className="rounded-lg border border-[#9CA4FD] px-6 py-3 font-jersey10 font-medium text-white transition hover:bg-[#9CA4FD]"
                >
                  {item.name} &gt;
                </button>
              ))}
            </div>
          </div>

          <div className="flex h-[280px] w-[400px] items-center justify-center rounded-xl bg-[#cfc2ff]">
            <Image src={mainPic.url} width={80} height={80} alt={mainPic.alt} />
          </div>
        </div>
      </section>

      <section className="bg-[#0d1025] py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {row1Cards.map(renderCard)}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[233fr_275fr_111fr]">
            {row2Cards.map(renderCard)}

            <div className="flex flex-row items-center justify-center gap-4 md:hidden lg:flex lg:flex-col lg:items-start">
              {logoImages.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.url}
                  width={135}
                  height={46}
                  alt={logo.alt}
                  className={`${index < logoImages.length - 1 ? "lg:mb-5" : ""} ${logo.position === "end" ? "lg:self-end" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
