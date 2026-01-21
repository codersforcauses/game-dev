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
  const hasBack = Boolean(backContent);
  const cardFlipClass = hasBack
    ? " group-hover:[transform:rotateY(180deg)]"
    : "";

  return (
    <div className="group p-4 [perspective:1200px]">
      <div
        className={`relative h-[30rem] w-[20rem] cursor-pointer select-none rounded-[10px] shadow-[12px_17px_51px_rgba(0,0,0,0.22)] transition-transform duration-500 hover:scale-105 active:rotate-1 active:scale-95 [transform-style:preserve-3d]${cardFlipClass}`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[10px] border border-white bg-dark_alt backdrop-blur-md [backface-visibility:hidden]">
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

        {hasBack && (
          <div className="absolute inset-0 flex flex-col overflow-y-auto rounded-[10px] border border-white bg-dark_3 p-6 text-light_1 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            {backContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
