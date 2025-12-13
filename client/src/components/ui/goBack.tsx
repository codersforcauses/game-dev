import Link from "next/link";

const ButtonGallery = () => {
  return (
    <Link href="/artwork" aria-label="Go back to gallery">
      <button
        className="bg-neutral-1 text-light-3 group relative mb-10 h-14 w-48 rounded-2xl text-center text-xl font-semibold"
        type="button"
      >
        <div className="bg-light-2 absolute left-1 top-[4px] z-10 flex h-12 w-1/4 items-center justify-center rounded-xl duration-500 group-hover:w-[184px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
            aria-hidden="true"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            />
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            />
          </svg>
        </div>
        <p className="translate-x-2">Gallery</p>
      </button>
    </Link>
  );
};

export default ButtonGallery;
