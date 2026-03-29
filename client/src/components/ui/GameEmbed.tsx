// notes:
//  - width and height don't match itch.io, making games look smaller
//  - you can just embed from itch.io, but only the developer can get the embed link as far as i can tell
//  - would need to save embed link, width and height to db
//  - this method is reliant on itch.io staying up and not changing anything
//  - would want a play button so it doesn't autoload (especially for bigger more intense games)
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "./button";

type GameEmbedProps = {
  embedID: string;
  gameWidth: number;
  gameHeight: number;
  gameImage: string;
};

export function GameEmbed({
  embedID,
  gameWidth,
  gameHeight,
  gameImage,
}: GameEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={`retroBorder flex items-center justify-center bg-background`}
      style={{ width: gameWidth + 26 * 2, height: gameHeight + 26 * 2 }}
    >
      {!isPlaying ? (
        <div>
          <Image
            src={gameImage}
            alt="Game Cover"
            width={gameWidth}
            height={gameHeight}
            className="absolute translate-x-[-50%] translate-y-[calc(-50%)] blur-sm"
            style={{ width: "auto", height: gameHeight - 52 }}
          />
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            size={"lg"}
            className="absolute translate-x-[-50%] translate-y-[calc(-50%)] text-3xl"
          >
            Play
          </Button>
        </div>
      ) : (
        <div>
          <iframe
            src={`https://itch.io/embed-upload/${embedID}?color=110e1a`}
            width={gameWidth}
            height={gameHeight}
          ></iframe>
        </div>
      )}
    </div>
  );
}
