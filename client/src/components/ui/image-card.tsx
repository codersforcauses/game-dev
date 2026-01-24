import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface ImageCardProps {
  imageSrc?: string;
  imageAlt?: string;
  /** Optional content rendered on the front (over the image or placeholder). */
  children?: React.ReactNode;
  /** Optional content rendered on the back when hovering/focused. */
  backContent?: React.ReactNode;
  /** Optional href for navigation when clicking the front face */
  href?: string;
}

const ImageCard = ({
  imageSrc,
  imageAlt = "Image",
  children,
  backContent,
  href,
}: ImageCardProps) => {
  const router = useRouter();
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

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
    } else if (backContent) {
      // On desktop, toggle flip state
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="p-4" style={{ perspective: "1200px" }}>
      <div
        className="relative h-[30rem] w-full max-w-[20rem] cursor-pointer select-none rounded-[10px] shadow-[12px_17px_51px_rgba(0,0,0,0.22)] transition-transform duration-500"
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
