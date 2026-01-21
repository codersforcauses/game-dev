import Image from "next/image";
import React from "react";

interface ImageCardProps {
  imageSrc?: string;
  imageAlt?: string;
  /** Optional content rendered on the front (over the image or placeholder). */
  children?: React.ReactNode;
  /** Optional content rendered on the back when hovering/focused. */
  backContent?: React.ReactNode;
}

const ImageCard = ({
  imageSrc,
  imageAlt = "Image",
  children,
  backContent,
}: ImageCardProps) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div className="p-4" style={{ perspective: "1200px" }}>
      <div
        className="relative h-[30rem] w-[20rem] cursor-pointer select-none rounded-[10px] shadow-[12px_17px_51px_rgba(0,0,0,0.22)] transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onMouseEnter={() => backContent && setIsFlipped(true)}
        onMouseLeave={() => backContent && setIsFlipped(false)}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[10px] border border-white bg-dark_alt backdrop-blur-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          {imageSrc ? (
            <>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={400}
                height={600}
                className="h-full w-full object-cover"
              />
              {children && (
                <div className="bg-dark_1/40 absolute inset-0 flex items-center justify-center text-light_1">
                  {children}
                </div>
              )}
            </>
          ) : (
            <div className="bg-dark_alt/60 flex h-full w-full items-center justify-center text-light_1">
              {children || <span className="font-bold">No Image</span>}
            </div>
          )}
        </div>

        {backContent && (
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto rounded-[10px] border border-white bg-dark_3 p-6 text-light_1"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {backContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
