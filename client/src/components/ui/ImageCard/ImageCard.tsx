import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface ImageCardProps {
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  backContent?: React.ReactNode;
  href?: string;
  disableFlip?: boolean;
  placeholder?: React.ReactNode;
}

const ImageCard = ({
  imageSrc,
  imageAlt = "Game Artwork",
  children,
  backContent,
  href,
  disableFlip = false,
  placeholder,
}: ImageCardProps) => {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [hasImageError, setHasImageError] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    // On mobile, navigate directly if href is provided
    if (isMobile && href) {
      router.push(href);
    } else if (backContent && !disableFlip && !hasImageError) {
      // On desktop, toggle flip state
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="h-80 w-80 p-4" style={{ perspective: "1200px" }}>
      <div
        className={`] border-muted relative h-full w-full max-w-2xl rounded-md border shadow-xl transition-transform duration-500 select-none ${
          (isMobile && href) || (backContent && !disableFlip && !hasImageError)
            ? "cursor-pointer"
            : "cursor-default"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        onClick={handleClick}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <div className="bg-dark-alt h-full w-full overflow-hidden rounded-xl backdrop-blur-md">
            {imageSrc && !hasImageError ? (
              <>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={400}
                  height={600}
                  draggable={false}
                  className="h-full w-full object-cover"
                  onError={() => {
                    setHasImageError(true);
                    setIsFlipped(false);
                  }}
                />
                {children && (
                  <div className="bg-dark-1/40 text-light-1 absolute inset-0 flex items-center justify-center">
                    {children}
                  </div>
                )}
              </>
            ) : (
              <div className="bg-dark-alt/60 text-light-1 flex h-full w-full items-center justify-center">
                {placeholder || children || (
                  <span className="font-bold">No Image</span>
                )}
              </div>
            )}
          </div>
        </div>

        {backContent && (
          <div
            className="bg-dark-3 text-light-1 absolute inset-0 flex flex-col overflow-y-auto rounded-xl p-6 ring-1 ring-white"
            style={{
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
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
