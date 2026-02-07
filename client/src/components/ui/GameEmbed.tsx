// notes:
//  - width and height don't match itch.io, making games look smaller
//  - you can just embed from itch.io, but only the developer can get the embed link as far as i can tell
//  - would need to save embed link, width and height to db
//  - this method is reliant on itch.io staying up and not changing anything
//  - would want a play button so it doesn't autoload (especially for bigger more intense games)

import React, { useState } from "react";

import { Button } from "./button";

type GameEmbedProps = {
  embedID: string;
  gameWidth: number;
  gameHeight: number;
};

export function GameEmbed({ embedID, gameWidth, gameHeight }: GameEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className={
        "flex items-center justify-center border-[26px] border-accent bg-background p-2 [clip-path:polygon(20px_20px,calc(100%-20px)_20px,100%_32px,100%_30%,calc(100%-20px)_45%,calc(100%-20px)_calc(100%-8px),80%_calc(100%-8px),75%_calc(100%-20px),20px_calc(100%-20px),0%_60%,0%_30%,20px_25%)]"
      }
      style={{ width: gameWidth, height: gameHeight }}
    >
      {!isPlaying ? (
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size={"lg"}
          className="text-3xl"
        >
          Play
        </Button>
      ) : (
        <div>
          <iframe
            src={`https://itch.io/embed-upload/${embedID}?color=110e1a`}
            width={gameWidth}
            height={gameHeight}
            className="min-w-80 border-[26px] border-accent [clip-path:polygon(20px_20px,calc(100%-20px)_20px,100%_32px,100%_30%,calc(100%-20px)_45%,calc(100%-20px)_calc(100%-8px),80%_calc(100%-8px),75%_calc(100%-20px),20px_calc(100%-20px),0%_60%,0%_30%,20px_25%)]"
          ></iframe>
        </div>
      )}
    </div>
  );
}
