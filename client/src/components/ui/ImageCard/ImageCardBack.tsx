import Link from "next/link";

import { Art } from "@/types/art";

export default function ImageCardBack({ artwork }: { artwork: Art }) {
  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <h3 className="mb-2 text-center font-jersey10 text-4xl leading-tight text-accent">
          {artwork.name}
        </h3>
        <p className="mb-3 text-center font-sans text-base leading-relaxed text-light-1">
          {artwork.source_game_name ? (
            <>
              from{" "}
              <Link
                href={`/games/${artwork.source_game_id}`}
                className="text-accent hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {artwork.source_game_name}
              </Link>
            </>
          ) : (
            "No associated game"
          )}
        </p>
        {/* <p className="mb-3 text-base leading-relaxed text-light-1"> */}
        {/*   {artwork.description || "No description available."} */}
        {/* </p> */}
      </div>

      {artwork.contributors.length > 0 && (
        <div className="mt-auto">
          <h4 className="mb-2 text-center font-jersey10 text-2xl leading-tight text-accent">
            Contributed by:
          </h4>
          <div className="flex flex-col items-center space-y-2.5">
            {artwork.contributors.map((contributor) => (
              <div
                key={contributor.id}
                className="mb-2 text-base leading-relaxed text-light-1"
              >
                <Link
                  href={`/members/${contributor.member_id}`}
                  className="pl-1 text-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {contributor.member_name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/artwork/${artwork.art_id}`}
        className="mt-4 rounded-md border border-accent bg-accent/10 px-4 py-2 text-center font-jersey10 text-2xl leading-relaxed text-accent transition-colors hover:bg-accent hover:text-dark-3"
        onClick={(e) => e.stopPropagation()}
      >
        View full details
      </Link>
    </div>
  );
}
