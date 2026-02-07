import Image from "next/image";
import React from "react";

const ImagePlaceholder = () => {
  return (
    <div
      data-layer="Placeholder image"
      className="PlaceholderImage bg-light-2 flex h-[500px] w-[500px] items-center justify-center rounded-[10px]"
    >
      <div data-svg-wrapper data-layer="Vector" className="Vector">
        <Image
          src="/placeholder-icon.svg"
          alt="Placeholder icon"
          width={96}
          height={96}
        />
      </div>
    </div>
  );
};
export default ImagePlaceholder;
