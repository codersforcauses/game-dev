import Image from "next/image";

import { Button } from "./button";

type CustomEmbedProps = {
  gameTitle: string;
  description: string;
  hostURL: string;
  pathToThumbnail: string;
  contributors: string[];
};

export function CustomEmbed({
  gameTitle,
  description,
  hostURL,
  pathToThumbnail,
  contributors,
}: CustomEmbedProps) {
  return (
    <div className="mb-6 w-full max-w-[552px] px-4 shadow-[0_12px_40px_-16px_hsl(var(--secondary)_/_0.45)] sm:aspect-[552/167] sm:px-0">
      <div className="flex h-[165px] w-[550px]">
        <div className="relative flex h-[165px] w-[205px] items-center justify-center">
          <Image
            src={pathToThumbnail}
            alt={gameTitle}
            width={180}
            height={143}
            className="h-[143px] w-[180px] rounded-[2px] object-cover"
          />
        </div>
        <div className="flex h-[165px] w-[345px] flex-col justify-center pl-[12px] pr-[5px]">
          <div className="mb-[5px] flex h-[32px] items-center">{gameTitle}</div>
          <div className="mb-[5px] flex h-[16px] items-center">
            {contributors}
          </div>
          <div className="mb-[5px] flex h-[16px] items-center">
            <p>{description}</p>
          </div>
          <div className="mb-[6px] mt-[8px] flex h-[35px] items-center">
            <Button
              onClick={() => {
                window.open(hostURL, "_blank", "noopener,noreferrer");
              }}
            >
              View Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
