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
  imageAlt = "Image",
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
    <div className="p-4" style={{ perspective: "1200px" }}>
      <div
        className={`relative h-[30rem] w-full max-w-[20rem] select-none rounded-[10px] shadow-[12px_17px_51px_rgba(0,0,0,0.22)] transition-transform duration-500 ${
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
          className="absolute inset-0 overflow-hidden rounded-[10px] border border-white bg-dark_alt backdrop-blur-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          {imageSrc && !hasImageError ? (
            <>
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={400}
                height={600}
                className="h-full w-full object-cover"
                onError={() => {
                  setHasImageError(true);
                  setIsFlipped(false);
                }}
              />
              {children && (
                <div className="bg-dark_1/40 absolute inset-0 flex items-center justify-center text-light_1">
                  {children}
                </div>
              )}
            </>
          ) : (
            <div className="bg-dark_alt/60 flex h-full w-full items-center justify-center text-light_1">
              {placeholder || children || (
                <span className="font-bold">No Image</span>
              )}
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
