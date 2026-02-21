import Link from "next/link";

import { ArtContributor } from "@/types/art-contributor";

interface ContributorsListProps {
  contributors: ArtContributor[];
}

export default function ContributorsList({
  contributors,
}: ContributorsListProps) {
  if (contributors.length === 0) {
    return null;
  }

  return (
    <div
      data-layer="Artwork Details"
      className="ArtworkDetails flex flex-col justify-start gap-2.5 py-5"
    >
      <div
        data-layer="Contributors Section"
        className="ContributorsSection relative"
      >
        <div
          data-layer="Contributors"
          className="ArtName text-light_3 justify-start font-jersey10 text-6xl font-normal leading-[76px] tracking-wide text-accent"
        >
          Contributors
        </div>
      </div>
      <div
        data-layer="Contributors List"
        className="ContributorsList relative flex flex-col gap-3 p-3"
      >
        <div className="mt-auto">
          <div className="space-y-2.5">
            {contributors.map((contributor) => (
              <div
                key={contributor.id}
                className="mb-2 font-sans text-xl font-normal leading-8 tracking-wide text-light_1"
              >
                <Link
                  href={`/members/${contributor.member_id}`}
                  className="text-accent hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {contributor.member_name}
                </Link>
                {" - "}
                <span>{contributor.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
