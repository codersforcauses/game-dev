import Image from "next/image";
import React from "react";

interface FeatureArtProps {
  title?: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function FeatureArt({
  title = "Featured Artwork",
  category = "Digital Art",
  imageSrc,
  imageAlt = "Featured artwork",
}: FeatureArtProps) {
  return (
    <div className="group relative flex h-[285px] w-[195px] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-neutral-800 transition-all duration-200 ease-in-out hover:rotate-[-1deg] hover:scale-[1.04]">
      {/* Image */}
      <div className="group-hover:animate-float absolute z-10 h-[30%] w-full transition-all duration-200 ease-in-out group-hover:h-[65%] group-hover:blur-[7px]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
            sizes="195px"
          />
        ) : (
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 784.37 1277.39"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer" />
              <g id="_1421394342400">
                <g>
                  <polygon
                    fill="#343434"
                    fillRule="nonzero"
                    points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54"
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33"
                  />
                  <polygon
                    fill="#3C3C3B"
                    fillRule="nonzero"
                    points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89"
                  />
                  <polygon
                    fill="#8C8C8C"
                    fillRule="nonzero"
                    points="392.07,1277.38 392.07,956.52 -0,724.89"
                  />
                  <polygon
                    fill="#141414"
                    fillRule="nonzero"
                    points="392.07,882.29 784.13,650.54 392.07,472.33"
                  />
                  <polygon
                    fill="#393939"
                    fillRule="nonzero"
                    points="0,650.54 392.07,882.29 392.07,472.33"
                  />
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>

      {/* Text Content */}
      <div className="z-20 flex flex-col items-center justify-center gap-4 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
        <p className="text-xl font-bold text-white">{title}</p>
        <span className="text-xs text-gray-300">{category}</span>
      </div>
    </div>
  );
}
