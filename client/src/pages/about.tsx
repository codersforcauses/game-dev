import Image from "next/image";
import { ImageIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-dvh max-w-6xl px-6 py-16 md:px-20">
      <div className="flex flex-col justify-between gap-12 md:flex-row md:gap-20">
        <div className="flex-1">
          <h1 className="font-jersey10 text-5xl md:text-6xl text-primary mb-4">
            About Us
          </h1>
          <div
            className="mb-6 w-full border-t border-white"
            aria-hidden="true"
          />
          <div className="space-y-4 text-base md:text-lg leading-relaxed font-jersey10 text-foreground">
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
        <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-lg bg-light-alt md:w-96 lg:w-[512px]">
          <div className="flex h-full w-full items-center justify-center">
            <ImageIcon className="h-24 w-24 text-neutral-3" />
          </div>
        </div>
      </div>
    </main>
  );
}

