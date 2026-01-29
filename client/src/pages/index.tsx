import Image from "next/image";
import Link from "next/link";

import EventCarousel from "@/components/ui/eventCarousel";
import {
  EventHighlightCard,
  eventHighlightCardType,
} from "@/components/ui/eventHighlightCard";
import FeatureBox from "@/components/ui/featureBox";

import { Button } from "../components/ui/button";

export default function Landing() {
  const quickLinksBtnList = [
    { name: "More about us", link: "/committee/about", type: "default" },
    { name: "Join our Discord", link: "", type: "outline" },
  ];

  const gameShowcaseBtnList = [
    { name: "See more games by our members", link: "/" },
    { name: "See other cool stuff our members have created", link: "/" },
  ];

  const gameLogoImages = [
    { url: "/godot.png", alt: "Godot Logo", position: "start" },
    { url: "/unity-logo.png", alt: "Unity Logo", position: "end" },
  ];

  const eventCards: eventHighlightCardType[] = [
    {
      id: 1,
      title: "Game Jams",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
      type: "default",
      image: {
        url: "/trophy.png",
        width: 200,
        height: 200,
        alt: "Trophy",
      },
      row: 1,
    },
    {
      id: 2,
      title: "Social Events",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      type: "default",
      image: null,
      row: 1,
    },
    {
      id: 3,
      title: "Other Events",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      type: "default",
      image: null,
      row: 2,
    },
    {
      id: 4,
      title: "Workshops",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      type: "special-border",
      image: null,
      row: 2,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Event 1",
      time: "Monday 24th Oct 11:00am–4:00pm",
      description: "",
      publicationDate: "",
      date: "",
      startTime: "2:00",
      location: "",
      coverImage: "/landing_placeholder.png",
    },
    {
      id: 2,
      name: "Event 2",
      time: "Monday 24th Oct 11:00am–4:00pm",
      description: "",
      publicationDate: "",
      date: "",
      startTime: "2:00",
      location: "",
      coverImage: "/landing_placeholder.png",
    },
    {
      id: 3,
      name: "Event 3",
      time: "Monday 24th Oct 11:00am–4:00pm",
      description: "",
      publicationDate: "",
      date: "",
      startTime: "2:00",
      location: "",
      coverImage: "/landing_placeholder.png",
    },
    {
      id: 4,
      name: "Event 4",
      time: "Monday 24th Oct 11:00am–4:00pm",
      description: "",
      publicationDate: "",
      date: "",
      startTime: "2:00",
      location: "",
      coverImage: "/landing_placeholder.png",
    },
  ];

  const gamesData = [
    {
      id: 1,
      title: "Cool Game",
      description: "Cool game is a game about being cool.",
      image: "/landing_placeholder.png",
    },
    {
      id: 2,
      title: "Cool Game 2",
      description: "Cool game 2 is a game about being cool.",
      image: "/landing_placeholder.png",
    },
    {
      id: 3,
      title: "Cool Game 3",
      description: "Cool game 3 is a game about being cool.",
      image: "/landing_placeholder.png",
    },
  ];

  return (
    <div>
      <section className="flex w-full justify-center bg-muted px-12 py-10">
        <div className="flex w-full max-w-[1440px] flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex max-w-lg flex-col gap-6">
            <h1 className="font-jersey10 text-4xl font-bold">
              Game Development UWA
            </h1>
            <p className="text-base leading-relaxed text-white/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="my-4 flex gap-4">
              {quickLinksBtnList.map((item, i) => (
                <Link href={item.link} key={i}>
                  <Button
                    variant={item.type == "default" ? "default" : "outline"}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/landing_placeholder.png"
              width={600}
              height={430}
              alt="placeholder"
              className="min-w-80 border-[26px] border-accent [clip-path:polygon(20px_20px,calc(100%-20px)_20px,100%_32px,100%_30%,calc(100%-20px)_45%,calc(100%-20px)_calc(100%-8px),80%_calc(100%-8px),75%_calc(100%-20px),20px_calc(100%-20px),0%_60%,0%_30%,20px_25%)]"
            />
            <Image
              src="/bomb.png"
              width={96}
              height={156}
              alt="placeholder"
              className="absolute bottom-0 left-0 h-auto w-[20%] -translate-x-1/4 -translate-y-4 [image-rendering:pixelated]"
            />
          </div>
        </div>
      </section>

      <section className="-mt-8 bg-dark_3 py-16 [clip-path:polygon(0%_0%,20%_0%,calc(20%+32px)_32px,100%_32px,100%_100%,0%_100%)] [overflow:clip]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {eventCards
              .filter((card) => card.row === 1)
              .map((card) => (
                <EventHighlightCard key={card.id} {...card} />
              ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[23fr_27fr_11fr]">
            {eventCards
              .filter((card) => card.row === 2)
              .map((card) => (
                <EventHighlightCard key={card.id} {...card} />
              ))}

            <div className="flex flex-row items-center justify-center gap-4 md:hidden lg:flex lg:flex-col lg:items-start">
              {gameLogoImages.map((logo, index) => (
                <Image
                  key={index}
                  src={logo.url}
                  width={135}
                  height={46}
                  alt={logo.alt}
                  className={`${index < gameLogoImages.length - 1 ? "lg:mb-5" : ""} ${
                    logo.position === "end" ? "lg:self-end" : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-10 py-10">
        <EventCarousel items={upcomingEvents} />
      </section>

      <section className="bg-background px-4 py-10 md:px-10">
        <div className="flex w-full justify-between px-4">
          <FeatureBox
            title="So... How do I get involved?"
            text="The easiest way to get involved is to come along to one of our events!"
          />
        </div>
      </section>

      <section className="relative w-full overflow-hidden bg-background px-6 py-20 lg:px-12">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mb-10 flex flex-col items-start">
              <h2 className="flex items-center gap-3 font-jersey10 text-5xl text-white">
                Featured Member Creations
                <Image src="/heart.png" alt="" width={60} height={50} />
              </h2>
            </div>

            <div className="mb-12 flex flex-col items-start gap-4">
              {gameShowcaseBtnList.map((item, i) => (
                <Link href={item.link} key={i}>
                  <Button>{item.name} &gt;</Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {gamesData.map((game) => (
              <div
                key={game.id}
                className="rounded-xl p-6 text-background shadow-lg"
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  width={340}
                  height={195}
                  className="rounded-xl"
                />

                <h3 className="mb-2 mt-4 font-jersey10 text-2xl text-white">
                  {game.title}
                </h3>

                <p className="mb-4 text-sm text-primary">{game.description}</p>

                <div className="h-px w-full bg-white/30" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
