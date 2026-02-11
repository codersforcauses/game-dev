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
          className="Contributors justify-start font-sans text-4xl font-normal tracking-wide text-light_3"
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
                className="font-sans text-[15px] text-light_1"
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
