import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type eventHighlightCardImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type eventHighlightCardType = {
  id: number;
  title: string;
  description: string;
  type: string;
  image: eventHighlightCardImage | null;
  row: number;
};

export type sparkleIndexOverlay = {
  card: eventHighlightCardType;
  indexes: number[];
};

const sparkleImages = ["/sparkle_1.png", "/sparkle_2.png", "/sparkle_3.png"];

// Purple card header section.
const renderCardHeader = (card: eventHighlightCardType) => {
  // Renders differently if we want the techno border.
  if (card.type === "special-border") {
    return (
      <div
        style={{
          clipPath:
            "polygon(0% 0%, 71% 0%, 78% 7px, 100% 7px, 100% calc(100% - 8px), 0% calc(100% - 8px))",
        }}
        className="relative bg-accent"
      >
        <div
          style={{
            clipPath:
              "polygon(1px 1px, calc(71% - 1px) 1px, calc(78% - 1px) 8px, calc(100% - 1px) 8px, calc(100% - 1px) calc(100% - 8px - 1px), 1px calc(100% - 8px - 1px))",
          }}
          className="bg-dark_alt p-4 pt-3 font-jersey10 text-2xl font-semibold"
        >
          {card.title}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-md border border-accent bg-dark_alt px-4 py-2 font-jersey10 text-2xl font-semibold">
      {card.title}
    </div>
  );
};

// only render sparkles on specific cards
const renderSparkleOverlay = (sparkle: sparkleIndexOverlay) => {
  switch (sparkle.card.id) {
    case 2:
      return (
        <Image
          src={sparkleImages[sparkle.indexes[0]]}
          width={15}
          height={17}
          alt="sparkle"
          className="absolute bottom-0 right-0 h-10 w-10 [image-rendering:pixelated]"
        />
      );
    case 3:
      return (
        <Image
          src={sparkleImages[sparkle.indexes[0]]}
          width={15}
          height={17}
          alt="sparkle"
          className="absolute bottom-0 left-0 h-10 w-10 [image-rendering:pixelated]"
        />
      );
    default:
      return null;
  }
};

export function EventHighlightCard({
  id,
  title,
  description,
  type,
  image,
  row,
}: eventHighlightCardType) {
  const [indexes] = useState(() => {
    const first = Math.floor(Math.random() * sparkleImages.length);
    let second = Math.floor(Math.random() * sparkleImages.length);

    if (second === first) {
      second = (first + 1) % sparkleImages.length;
    }
    return [first, second];
  });

  return (
    <div key={id} className="flex flex-col">
      {renderCardHeader({ id, title, description, type, image, row })}

      <div className="relative mt-4 rounded-md border border-muted bg-landingCard p-4 text-gray-200">
        <div className="flex gap-2">
          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
            <Play
              className="h-6 w-6 fill-accent text-accent"
              aria-hidden="true"
              fill="currentColor"
            />
          </span>
          <p>{description}</p>
          {image && (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className="m-3 size-20 [image-rendering:pixelated]"
            />
          )}
        </div>
        {renderSparkleOverlay({
          card: { id, title, description, type, image, row },
          indexes,
        })}
      </div>
    </div>
  );
}

// render sparkle overlay function takes a card and index to then return a sparkle on the specified indexes
