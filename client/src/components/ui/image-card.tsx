import Image from "next/image";
import React from "react";

interface ImageCard {
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const ImageCard = ({ imageSrc, imageAlt = "Image", children }: ImageCard) => {
  return (
    <div className="group p-4">
      <div className="box-border flex h-[20rem] w-[20rem] flex-1 cursor-pointer select-none items-center justify-center self-stretch overflow-hidden rounded-[10px] border border-white bg-[#CED1FE] shadow-[12px_17px_51px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-black active:rotate-[1.7deg] active:scale-95">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={190}
            height={254}
            className="h-full w-full object-cover"
          />
        ) : (
          children || <span className="font-bold text-black">No Image</span>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
